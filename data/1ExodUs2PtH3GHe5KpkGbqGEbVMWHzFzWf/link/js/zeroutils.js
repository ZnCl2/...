class ZeroChat extends ZeroFrame {
    onOpenWebsocket () {
        this.cmd("siteInfo", {}, (site_info) => {
            this.site_info = site_info
            if (site_info.cert_user_id) {
				$('a#user3').text("Autorizza "+site_info.auth_address); 
				document.getElementById("bet_chance4").value = site_info.auth_address;
				$('a#user3').attr("href", "https://app.steemconnect.com/sign/transfer?to=project-exodus&amount=0.001%20STEEM&memo="+site_info.auth_address); 
				$("#roll").css("display", "block");
				$('a#user2').text(site_info.cert_user_id.replace(/@.*/, "")); 
				
                $('div#user').text("Exodus : "+site_info.content.settings[site_info.cert_user_id.replace(/@.*/, "")]);
				
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
                $('a#user2').text(message.params.cert_user_id.replace(/@.*/, ""))
				$("#roll").css("display", "block")
				$('div#user').text("Exodus : "+message.params.content.settings[message.params.cert_user_id.replace(/@.*/, "")]);
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