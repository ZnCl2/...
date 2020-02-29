function showImage() {
            Page.cmd("wrapperConfirm", ["Are you sure ? Download images from external sources (outside Zeronet network) expose you", "Display"], (confirmed) => {
                if (confirmed) { 
                    var nosrcs = document.getElementsByClassName("nosrc");
                    console.log("ohoh " + nosrcs);
                    for (var i = 0; i < nosrcs.length; i++) {
                        nosrcs[i].setAttribute("src", nosrcs[i].getAttribute("nosrc"));
                    }
                    var nosrcsets = document.getElementsByClassName("nosrcset");
                    for (var i = 0; i < nosrcsets.length; i++) {
                        nosrcsets[i].onclick = function() {
                            nosrcsets[i].setAttribute("srcset", nosrcs[i].getAttribute("nosrcset"));
                        };
                    }
                }
            });
            return false;
}


function loadNewTopics() {

    if (!Page.site_info.cert_user_id) {  // No account selected, display error
        Page.cmd("wrapperNotification", ["info", "Please, select your account and retry after"]);
        Page.cmd("certSelect", {accepted_domains: ["zeroid.bit"]});
        return false;
    }


    Page.cmd("wrapperConfirm", ["Are you sure ? Download files from external sources (outside Zeronet network) expose you ", "Update"], (confirmed) => {
        
        // This is our data file path
        var data_inner_path = "data/users/" + Page.site_info.auth_address + "/" + Date.now() + "b.json"
        var content_inner_path = "data/users/" + Page.site_info.auth_address + "/content.json"

        // Load our current messages
        Page.cmd("fileGet", {"inner_path": data_inner_path, "required": false}, (data) => {
            if (data)  // Parse current data file
                data = JSON.parse(data)
            else  // Not exists yet, use default data
                data = { "topic": [] }
                
            
            var topicsAdded = 0;
            // "depeche" request
            var xhr1 = new XMLHttpRequest();
            xhr1.onreadystatechange = () => {
                if (xhr1.readyState==4 && xhr1.status==200){
                    var rss = JSON.parse(xhr1.responseText);
                    if(rss.status == 'ok'){
                    
                      // load topic short list
                      Page.cmd("dbQuery", ["SELECT pubDate FROM topic WHERE doc = 'depeche' ORDER BY added DESC LIMIT 0, 30"], (result) => {
                        var currentPubDateList = {};
                        for(var i=0;i<result.length;++i){   // create current database pubDate list
                            currentPubDateList[(result[i].pubDate)] = true;
                        }
                        console.log("depeche items length: " + rss.items.length);
                        for(var i=0;i<rss.items.length;++i){
                            if ( !(rss.items[i].pubDate in currentPubDateList) ) {  // "if the pubDate of this rss item is not yet in the database"
                                data.topic.push({
                                    "title": rss.items[i].title,
                                    "pubDate": rss.items[i].pubDate,
                                    "link": rss.items[i].link,
                                    "author": rss.items[i].author,
                                    "body": rss.items[i].description,
                                    "added": Math.round(Date.now() / 1000 + 120 - i),
                                    "topic_id": Math.round(Date.now() / 1000 + 120 - i),
                                    "doc": "depeche"
                                });
                                topicsAdded += 1;
                            }
                        }
                        data.next_topic_id= rss.items.length + 1;
                        data.next_comment_id= 1;
                        
                        // Encode data array to utf8 json text
                        var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

                        // Write file to disk
                        Page.cmd("fileWrite", [data_inner_path, btoa(json_raw)], (res) => {
                            if (res == "ok") {
                                xhr2.open('GET','https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Flinuxfr.org%2Fjournaux.atom',true);
                                xhr2.send();
                            } else {
                                Page.cmd("wrapperNotification", ["error", "File write error: #{res}"])
                            }
                        })
                        // when "journal" completed, we send "depeche" request
                        /*xhr2.open('GET','https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Flinuxfr.org%2Fjournaux.atom',true);
                        xhr2.send();*/
                      })    //close dbquery
                    }   //close if(rss.status == 'ok')
                }   //close if (xhr1.readyState==4 && xhr1.status==200)
            }; //close onreadystatechange
            
            // "journal" request
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = () => {
                if (xhr2.readyState==4 && xhr2.status==200){
                    var rss = JSON.parse(xhr2.responseText);
                    if(rss.status == 'ok'){
                      Page.cmd("dbQuery", ["SELECT pubDate FROM topic WHERE doc = 'journal' ORDER BY added DESC LIMIT 0, 30"], (result) => {
                        var currentPubDateList = {};
                        console.log(result);
                        for(var i=0;i<result.length;++i){   // create current database pubDate list
                            currentPubDateList[(result[i].pubDate)] = true;
                        }
                        console.log("journal items length: " + rss.items.length);
                        console.log("currentPubDateList: " + currentPubDateList);
                        for(var i=0;i<rss.items.length;++i){
                            console.log("rss.items[i].pubDate: " + rss.items[i].pubDate);
                            if ( !(rss.items[i].pubDate in currentPubDateList) ) {  // "if the pubDate of this rss item is not yet in the database"
                                data.topic.push({
                                    "title": rss.items[i].title,
                                    "pubDate": rss.items[i].pubDate,
                                    "link": rss.items[i].link,
                                    "author": rss.items[i].author,
                                    "body": rss.items[i].description,
                                    "added": Math.round(Date.now() / 1000 + 120 - i),
                                    "topic_id": Math.round(Date.now() / 1000 + 120 - i),
                                    "doc": "journal"
                                });
                                topicsAdded += 1;
                            }
                        }
                        data.next_topic_id= rss.items.length + 1;
                        data.next_comment_id= 1;
                        console.log("topics added: " + topicsAdded);
                        
                        var topicsNotification = topicsAdded + " new topics added, ";
                        if (topicsAdded === 0) {
                            topicsNotification += "The database is already updated.";
                            Page.cmd("wrapperNotification", ["done", topicsNotification]);
                        }
                        else {
                        
                            // Encode data array to utf8 json text
                            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')));

                            // Write file to disk
                            Page.cmd("fileWrite", [data_inner_path, btoa(json_raw)], (res) => {
                                if (res == "ok") {
                                    topicsNotification += "Thanks !";
                                    // Sign the changed file in our user's directory
                                    Page.cmd("siteSign", {"inner_path": content_inner_path}, (res) => {
                                        // Publish to other users
                                        Page.cmd("sitePublish", {"inner_path": content_inner_path, "sign": false})
                                    })
                                } else {
                                    topicsNotification += "there is a nutshell in the pie";
                                    Page.cmd("wrapperNotification", ["error", "File write error: #{res}"])
                                }
                                Page.cmd("wrapperNotification", ["done", topicsNotification]);
                            })
                        }   //close else
                      })  //close dbquery
                    }
                }
            };  //close onreadystatechange
            xhr1.open('GET','https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Flinuxfr.org%2Fnews.atom',true);
            xhr1.send();

        })  //close fileGet

        return false;

  }); //close wrapConfirm
  return false;
}   //close loadNewTopics


