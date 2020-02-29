import base64
import os

from Crypt import CryptBitcoin, CryptHash
from Plugin import PluginManager
import lib.pybitcointools as btctools

@PluginManager.registerTo("UiWebsocket")
class UiWebsocketPlugin(object):

    # Create a new action that can be called using zeroframe api
    def actionBlockchainInfo(self, to):

        # Set BITCOIN (BTC) address.
        #
        # NOTE: User's `master_seed` is OBVIOUSLY a very security sensitive,
        #       and is treated as such.
        btc_address = CryptBitcoin.privatekeyToAddress(self.user.master_seed)

        pkg = {
            'message': 'Blockchain is BACKKK ALIVE!',
            'btc_address': btc_address
        }

        self.response(to, pkg)
