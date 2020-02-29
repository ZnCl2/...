from Plugin import PluginManager

@PluginManager.registerTo("Site")
class SitePlugin(object):
    def __init__(self, *args, **kwags):
        super(SitePlugin, self).__init__(*args, **kwags)

        # print('Hi there PRINT! I AM SitePlugin CONSTRUCTOR.')

        # self.log.debug('Hi there LOG.DEBUG! I AM SitePlugin CONSTRUCTOR.')
