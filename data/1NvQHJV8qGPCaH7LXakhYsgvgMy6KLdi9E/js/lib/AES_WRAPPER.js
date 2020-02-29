/*
Just a little hack
*/

function bytesToB64(buffer) {
	var binary = ''
	var bytes = new Uint8Array(buffer)
	var len = bytes.byteLength
	for (var i=0;i<len;++i) {
		binary += String.fromCharCode(bytes[i])
	}
	return btoa(binary)
}
function B64toBytes(encoded) {
	var decoded = atob(encoded)
	var array = new Uint8Array(new ArrayBuffer(decoded.length))
	for(var i=0;i<decoded.length;++i) {
		array[i] = decoded.charCodeAt(i)
	}
	return array
}

// ENCRYPT
function AESW_encrypt(key, data) {
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(data);

	return bytesToB64(encryptedBytes)
}
function AESW_encrypt_STRING(key, str) {
	return AESW_encrypt(key, aesjs.utils.utf8.toBytes(str))
}

// DECRYPT
function AESW_decrypt(key, data) {
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var decryptedBytes = aesCtr.decrypt(data);
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

	return decryptedText
}
function AESW_decrypt_B64(key, encoded) {
	return AESW_decrypt(key, B64toBytes(encoded))
}