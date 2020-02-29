import logging

from lib.BitcoinECC import BitcoinECC
from lib.pybitcointools import bitcoin as btctools

# Try to load openssl
try:
	from lib.opensslVerify import opensslVerify
	logging.info("OpenSSL loaded, version: %s" % opensslVerify.openssl_version)
except Exception, err:
	logging.info("OpenSSL load failed: %s, falling back to slow bitcoin verify" % err)
	opensslVerify = None


def newPrivatekey(uncompressed=True):  # Return new private key
	privatekey = btctools.encode_privkey(btctools.random_key(), "wif")
	return privatekey


def newSeed():
	return btctools.random_key()


def hdPrivatekey(seed, child):
	masterkey = btctools.bip32_master_key(seed)
	childkey = btctools.bip32_ckd(masterkey, child % 100000000)  # Too large child id could cause problems
	key = btctools.bip32_extract_key(childkey)
	return btctools.encode_privkey(key, "wif")


def privatekeyToAddress(privatekey):  # Return address from private key
	if privatekey.startswith("23") and len(privatekey) > 52:  # Backward compatibility to broken lib
		bitcoin = BitcoinECC.Bitcoin()
		bitcoin.BitcoinAddressFromPrivate(privatekey)
		return bitcoin.BitcoinAddresFromPublicKey()
	else:
		try:
			return btctools.privkey_to_address(privatekey)
		except Exception:  # Invalid privatekey
			return False


def sign(data, privatekey):  # Return sign to data using private key
	if str(privatekey).startswith("23") and len(privatekey) > 52:
		return None  # Old style private key not supported
	sign = btctools.ecdsa_sign(data, privatekey)
	return sign


def signOld(data, privatekey):  # Return sign to data using private key (backward compatible old style)
	bitcoin = BitcoinECC.Bitcoin()
	bitcoin.BitcoinAddressFromPrivate(privatekey)
	sign = bitcoin.SignECDSA(data)
	return sign


def verify(data, address, sign):  # Verify data using address and sign
	if hasattr(sign, "endswith"):
		if opensslVerify:  # Use the faster method if avalible
			pub = opensslVerify.getMessagePubkey(data, sign)
			sign_address = btctools.pubtoaddr(pub)
		else:  # Use pure-python
			pub = btctools.ecdsa_recover(data, sign)
			sign_address = btctools.pubtoaddr(pub)

		if type(address) is list:  # Any address in the list
			return sign_address in address
		else:  # One possible address
			return sign_address == address
	else:  # Backward compatible old style
		bitcoin = BitcoinECC.Bitcoin()
		return bitcoin.VerifyMessageFromBitcoinAddress(address, data, sign)


# user_id integer are too long, have to use string, compress to save space
# https://stackoverflow.com/a/24763277
def str_base(number, base='!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~'):
	(d, m) = divmod(number, len(base))
	if d > 0:
		return str_base(d, base) + base[m]
	return base[m]


"""
Validate bitcoin/altcoin addresses
Copied from:
https://github.com/nederhoed/python-bitcoinaddress/blob/master/bitcoinaddress/validation.py
http://rosettacode.org/wiki/Bitcoin/address_validation#Python
"""

import string
from hashlib import sha256

digits58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

def _bytes_to_long(bytestring, byteorder):
	"""Convert a bytestring to a long
	For use in python version prior to 3.2
	"""
	result = []
	if byteorder == 'little':
		result = (v << i * 8 for (i, v) in enumerate(bytestring))
	else:
		result = (v << i * 8 for (i, v) in enumerate(reversed(bytestring)))
	return sum(result)

def _long_to_bytes(n, length, byteorder):
	"""Convert a long to a bytestring
	For use in python version prior to 3.2
	Source:
	http://bugs.python.org/issue16580#msg177208
	"""
	if byteorder == 'little':
		indexes = range(length)
	else:
		indexes = reversed(range(length))
	return bytearray((n >> i * 8) & 0xff for i in indexes)

def decode_base58(bitcoin_address, length):
	"""Decode a base58 encoded address
	This form of base58 decoding is bitcoind specific. Be careful outside of
	bitcoind context.
	"""
	n = 0
	for char in bitcoin_address:
		try:
			n = n * 58 + digits58.index(char)
		except:
			msg = u"Character not part of Bitcoin's base58: '%s'"
			raise ValueError(msg % (char,))
	try:
		return n.to_bytes(length, 'big')
	except AttributeError:
		# Python version < 3.2
		return _long_to_bytes(n, length, 'big')

def encode_base58(bytestring):
	"""Encode a bytestring to a base58 encoded string
	"""
	# Count zero's
	zeros = 0
	for i in range(len(bytestring)):
		if bytestring[i] == 0:
			zeros += 1
		else:
			break
	try:
		n = int.from_bytes(bytestring, 'big')
	except AttributeError:
		# Python version < 3.2
		n = _bytes_to_long(bytestring, 'big')
	result = ''
	(n, rest) = divmod(n, 58)
	while n or rest:
		result += digits58[rest]
		(n, rest) = divmod(n, 58)
	return zeros * '1' + result[::-1]  # reverse string

def validate(bitcoin_address, magicbyte=0):
	"""Check the integrity of a bitcoin address
	Returns False if the address is invalid.
	>>> validate('1AGNa15ZQXAZUgFiqJ2i7Z2DPU2J6hW62i')
	True
	>>> validate('')
	False
	"""
	if isinstance(magicbyte, int):
		magicbyte = (magicbyte,)
	clen = len(bitcoin_address)
	if clen < 27 or clen > 35: # XXX or 34?
		return False
	allowed_first = tuple(string.digits)
	try:
		bcbytes = decode_base58(bitcoin_address, 25)
	except ValueError:
		return False
	# Check magic byte (for other altcoins, fix by Frederico Reiven)
	for mb in magicbyte:
		if bcbytes.startswith(chr(int(mb))):
			break
	else:
		return False
	# Compare checksum
	checksum = sha256(sha256(bcbytes[:-4]).digest()).digest()[:4]
	if bcbytes[-4:] != checksum:
		return False
	# Encoded bytestring should be equal to the original address,
	# for example '14oLvT2' has a valid checksum, but is not a valid btc
	# address
	return bitcoin_address == encode_base58(bcbytes)
