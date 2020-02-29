import logging
import re

from Config import config
from Plugin import PluginManager
from .config import tlds

allow_reload = False  # No reload supported


@PluginManager.registerTo("SiteManager")
class SiteManagerPlugin(object):
    site_nameyo = None

    def load(self, *args, **kwargs):
        super(SiteManagerPlugin, self).load(*args, **kwargs)
        if not self.get(config.nameyo_resolver):
            self.need(config.nameyo_resolver)

    # Return: True if the address is Name.YO domain
    def isNameYoDomain(self, address):
        tlds_r = "|".join(tlds)
        return re.match(rf"([a-z0-9-]+\.)*({tlds_r})$", address.lower())

    # Resolve domain
    # Return: The address or None
    def resolveNameYoDomain(self, domain):
        if not self.isNameYoDomain(domain):
            # A small optimization
            return None

        if not self.site_nameyo:
            self.site_nameyo = self.need(config.nameyo_resolver)
        if not self.site_nameyo.storage.db:
            self.site_nameyo.storage.rebuildDb()

        domain = domain.lower()

        def query(domain):
            responses = list(self.site_nameyo.storage.db.execute("""
                SELECT *
                FROM responses
                WHERE (
                    responses.domain = :domain AND
                    responses.result > 0
                )
                ORDER BY responses.date_added DESC
                LIMIT 1
            """, {"domain": domain}))
            if responses:
                return responses[0]["address"]
            else:
                return None

        # Is the domain itself registered?
        address = query(domain)
        if address:
            return address

        # Look for wildcard domains then
        parts = domain.split(".")[1:]
        while len(parts) > 1:
            # Is the domain registered?
            address = query("*." + ".".join(parts))
            if address:
                return address
            # Is such a wildcard domain registered?
            del parts[0]

        return None

    # Turn domain into address
    def resolveDomain(self, domain):
        return self.resolveNameYoDomain(domain) or super(SiteManagerPlugin, self).resolveDomain(domain)

    # Return: True if the address is domain
    def isDomain(self, address):
        return self.isNameYoDomain(address) or super(SiteManagerPlugin, self).isDomain(address)
