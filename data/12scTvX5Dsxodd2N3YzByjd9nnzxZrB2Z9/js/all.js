class Page extends ZeroFrame {
	selectUser(){
		this.cmd("certSelect", [["zeroid.bit", "kaffie.bit"]]);
	
	}
	sendMessage(){
		var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json";
		var content_inner_path = "data/users/"+ this.site_info.auth_address + "/content.json";
		
		this.cmd("fileGet", {"inner_path": data_inner_path, "required": false}, (data) => {
            if (data)  // Parse current data file
                data = JSON.parse(data)
            else  // Not exists yet, use default data
                data = { "test": [] }

            // Add the new message to data
            data.test.push({
                "name": document.getElementById("testo").value
              
            })

            // Encode data array to utf8 json text
            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

            // Write file to disk
            this.cmd("fileWrite", [data_inner_path, btoa(json_raw)], (res) => {
                if (res == "ok") {
                    // Reset the message input
                    document.getElementById("testo").value = ""
                    // Sign the changed file in our user's directory
                    this.cmd("siteSign", {"inner_path": content_inner_path}, (res) => {
                        // Publish to other users
                        this.cmd("sitePublish", {"inner_path": content_inner_path, "sign": false})
                    })
                } else {
                    this.cmd("wrapperNotification", ["error", "File write error: #{res}"])
                }
            })
        })

		
	}//konec funkcji
	
	onRequest(cmd,message){
		//zdarzenie aktualizujące dane o zalogowanym uztkowniku.
		if(cmd=="setSiteInfo"){
			if(message.params.cert_user_id)
				document.getElementById("select_user").innerHTML=message.params.cert_user_id;
			else 
				document.getElementById("select_user").innerHTML="Login";
			this.site_info=message.params;
		}
	}

}

Page= new Page();