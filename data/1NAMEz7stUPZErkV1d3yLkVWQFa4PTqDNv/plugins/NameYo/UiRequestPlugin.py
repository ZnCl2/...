import re

from Plugin import PluginManager
from .config import tlds


@PluginManager.registerTo("UiRequest")
class UiRequestPlugin(object):

    def __init__(self, *args, **kwargs):
        from Site import SiteManager
        self.site_manager = SiteManager.site_manager
        super(UiRequestPlugin, self).__init__(*args, **kwargs)

    # Media request
    def actionSiteMedia(self, path, **kwargs):
        tlds_r = "|".join(tlds)
        match = re.match(rf"/media/(?P<address>(?:[a-z0-9-]+\.)+(?:{tlds}))(?P<inner_path>/.*|$)", path)
        if match:  # Its a valid domain, resolve first
            domain = match.group("address")
            address = self.site_manager.resolveDomain(domain)
            if address:
                path = "/media/" + address + match.group("inner_path")
        return super(UiRequestPlugin, self).actionSiteMedia(path, **kwargs)  # Get the wrapper frame output

@PluginManager.registerTo("ConfigPlugin")
class ConfigPlugin(object):
    def createArguments(self):
        group = self.parser.add_argument_group("Zeroname plugin")
        group.add_argument('--nameyo_resolver', help='ZeroNet site to resolve Name.YO domains', default="1NAMEz7stUPZErkV1d3yLkVWQFa4PTqDNv", metavar="address")

        return super(ConfigPlugin, self).createArguments()
