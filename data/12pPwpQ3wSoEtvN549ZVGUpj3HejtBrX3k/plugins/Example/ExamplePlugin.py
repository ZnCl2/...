import re
from Plugin import PluginManager

print("Hello from ExamplePlugin rev5")

@PluginManager.registerTo("UiRequest")
class UiRequestPlugin(object):
    # Inject a donation message to every page top right corner
    def render(self, *args, **kwargs):
        body = super(UiRequestPlugin, self).render(*args, **kwargs)  # Get the wrapper frame output

        inject_html = """
            <style>
             #example_message { position: absolute; bottom: 0px; right: 20px; padding: 7px; font-family: Arial; font-size: 11px }
            </style>
            <a id='example_message' href='/Plugins' target='_blank'>Example plugin rev5 installed</a>
            </body>
            </html>
        """

        # return body
        return re.sub(r"</body>\s*</html>\s*$", inject_html, body.decode("utf8")).encode("utf8")
