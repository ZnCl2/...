class ZeroChat extends ZeroFrame {
    onOpenWebsocket () {
        this.cmd("siteInfo", {}, (site_info) => {
            this.site_info = site_info
            if (site_info.cert_user_id) {
                $('a#user').text(site_info.cert_user_id)
            }
        })
    }

    selectUser() {
    	this.cmd('certSelect', {accepted_domains: ['zeroid.bit']})
    	return false
    }

    onRequest (cmd, message) {
        if (cmd == "setSiteInfo") {
            if (message.params.cert_user_id) {
                $('a#user').text(message.params.cert_user_id)
            } else {
                $('a#user').text('Select user')
            }
            this.site_info = message.params
        }
    }

    upload(URL, CODE) {
        if (!this.site_info.cert_user_id) {  // No account selected
            this.cmd("wrapperNotification", ["info", "Please, log in first."])
            return false
        }

        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        this.cmd("fileGet", {"inner_path": data_inner_path, "required": false}, (data) => {
            if (data) {
                data = JSON.parse(data)
            } else {
                data = { "shortened": [] }
            }

            data.shortened.push({
                "CODE": CODE,
                "URL": URL
            })

            // Encode data array to utf8 json text
            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

            // Write file to disk
            this.cmd("fileWrite", [data_inner_path, btoa(json_raw)], (res) => {
                if (res == "ok") {
                    this.cmd("siteSign", {"inner_path": content_inner_path}, (res) => {
                        this.cmd("sitePublish", {"inner_path": content_inner_path, "sign": false}, (res) => {
                            showShortenedURL(CODE)
                        })
                    })
                } else {
                    this.cmd("wrapperNotification", ["error", "File write error: #{res}"])
                }
            })
        })

        return false
    }

    getURL(CODE, callback, _legacy_) {
        this.cmd("dbQuery", ["SELECT URL FROM shortened LEFT JOIN json USING (json_id) WHERE CODE='"+CODE+"'"], (result) => {
            if(result.length == 0) {
                callback(false, CODE, _legacy_)
            } else {
                callback(result[0], CODE, _legacy_)
            }
        })
    }
}

page = new ZeroChat()