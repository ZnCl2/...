class Page extends ZeroFrame {
    setSiteInfo(site_info) {
        var out = document.getElementById("out")
        out.innerHTML =
            "- People sharing the torrents <3 : " + site_info.peers +
            "<br>- Last time changed: " + (new Date(site_info.content.modified * 1000))
    }

    onOpenWebsocket() {
        this.cmd("siteInfo", [], function (site_info) {
            page.setSiteInfo(site_info)
        })
    }

    onRequest(cmd, message) {
        if (cmd == "setSiteInfo")
            this.setSiteInfo(message.params)
        else
            this.log("Unknown incoming message:", cmd)
    }
}
page = new Page()