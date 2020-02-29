import logging

from Plugin import PluginManager

@PluginManager.registerTo("UiWebsocket")
class UiWebsocketPlugin(object):
    def __init__(self, *args, **kwargs):
        res = super(UiWebsocketPlugin, self).__init__(*args, **kwargs)

        # self.log = logging.getLogger("Plugin: Superuser:")
        #
        # self.log.debug("UiWebsocket registered!")

        return res

    # Create a new action that can be called using zeroframe api
    def actionSudo(self, to):
        self.response(to, { 'message': 'With great power comes great responsibility!' })

    def actionSudoGetSite(self, to):
        self.response(to, { 'message': self.site.address })

    def actionSudoGetUser(self, to):
        self.response(to, { 'message': self.user.sites })

    # Create a new action that can be called using zeroframe api
    def actionSudoChallenge(self, to, pkg):
        challenge, publickey = pkg.split(':')

        print('\n\nChallenge', challenge)
        print('\nPublic Key', publickey)

        # aes_key, encrypted = CryptMessage.eciesEncrypt(challenge.encode("utf8"), publickey)

        # self.response(to, base64.b64encode(encrypted).decode("utf8"))
