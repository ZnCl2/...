grapesjs.plugins.add('grapesjs-plugin-zeronet', function (editor, opts) {
    page = new ZeroFrame()
    page.cmd("wrapperPermissionAdd", "NOSANDBOX", function(res) {
        if (!res.error) page.cmd("wrapperReload")
    })


    editor.Commands.add('publish', {
        run: function (editor, sender) {
            sender.set('active')
            page.cmd("sitePublish")
            sender.set('active', false)
        }
    })


    editor.Panels.addButton('options',{
        id: 'publish',
        className: 'fa fa-save icon-save',
        attributes: { title: 'Sign & Publish', innerText: "Sign & Publish"},
        command: "publish",
        active: false
    });
    editor.Panels.render()


    editor.StorageManager.add('zeronet', {
        load: async function(keys, cb) {
            console.log("GET", keys)
            threads = {}
            if (keys.indexOf("gjs-html") >= 0)
                threads["gjs-html"] = page.cmdp("fileGet", "pages/index.html")

            if (keys.indexOf("gjs-css") >= 0)
                threads["gjs-css"] = page.cmdp("fileGet", "pages/index.css")

            back = {}
            for (key in threads)
                back[key] = await threads[key]

            cb(back);
        },
        store: async function(data, cb) {
            try {
                if (data["gjs-html"])
                    await page.cmdp("fileWrite", ["pages/index.html", btoa(unescape(encodeURIComponent(data["gjs-html"])))])
                if (data["gjs-css"])
                    await page.cmdp("fileWrite", ["pages/index.css", btoa(unescape(encodeURIComponent(data["gjs-css"])))])
            } catch (err) {
                page.cmd("wrapperNotification", ["error", err])
            }

            cb();
        }
    })
});
