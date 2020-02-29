
class LilFrame extends ZeroFrame {

  TAG = "LilFrame";

  debug;
  siteInfo;
  currentUser;

  loginCallback;

  DEFAULT_USER_DESCRIPTION = "Random Dream Station user";
  DEFAULT_USER_PROFILE_IMAGE = "default/profile.jpg";
  SONG_LIST_TXT = "song-list.txt";

  fileBuffer = {};

  //
  // settings variables
  //

  // BOOLEAN
  DISMISS_USER = "dismissUser";
  // STRING
  PROFILE_IMAGE = "profileImage";
  PROFILE_IMAGE_FILE = "profile.image";


  /**
   * @constructor
   * @param {boolean} debug
   */
  constructor (debug = false) {
    super();
    let self = this;

    self.debug = debug;

    if (debug) {
      console.log("["+self.TAG+"] init(debug="+debug+")")
    }

    // somehow this will get called out plenty
    self.cmd("siteInfo", {}, (res) => {
      if (self.siteInfo === undefined) {
        self.siteInfo = res;

        if (self.debug) {
          console.log("["+self.TAG+"] ready")
        }
      }

    }); // self.cmd("siteInfo"
  }


  //
  // get user 'data.json' location by its id(address)
  //

  getDataJsonByUserAddress (userAddress) {
    return "data/users/"+userAddress+"/data.json";
  }


  //
  // get user 'content.json' location by its id(address)
  //

  getContentJsonByUserAddress (userAddress) {
    return "data/users/"+userAddress+"/content.json";
  }


  //
  // get user 'content.json' location by its id(address)
  //

  getContactsJsonByUserAddress (userAddress) {
    return "data/users/"+userAddress+"/ignore/contacts.json";
  }


  //
  // get current user optional file path
  //

  getOptionalPathByUserAddress (userAddress) {
    return "data/users/"+userAddress+"/optional";
  }


  //
  // if site is ready to handle zeronet specific requests
  //

  onReady (callback) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    let calledBackAlready = false;
    let checkSiteInfoInterval = setInterval(() => {
      if (self.siteInfo !== undefined && self.siteInfo != null) {
        if (calledBackAlready === false) {
          calledBackAlready = false;
          clearInterval(checkSiteInfoInterval);
          callback();
        }
      }
    }, 100);

  } // onReady


  //
  // callback will fire if user selects certificate to use
  //

  onLogin (callback) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    self.loginCallback = callback;

  } // onLogin


  //
  // on open websocket
  //

  onOpenWebsocket () {
    // sucessfully connected
  }

  //
  // on request
  //

  onRequest (cmd, message) {
    let self = this;

    if (cmd === "setSiteInfo") {

      // if login is success
      if (message.params.auth_address && message.params.cert_user_id) {

        // login is success

        self.getSettings((settings) => {
          settings[self.DISMISS_USER] = false;

          self.setSettings(settings, () => {
            if (self.loginCallback !== undefined && self.loginCallback != null) {
              self.loginCallback();
            }
          }); // self.setSettings

        }); // self.getSettings

      } // if (message.params.auth_address && message.params.cert_user_id)

      // Save site info data to allow access it later
      self.siteInfo = message.params;
    }

  } // onRequest



  //
  // select user to log in with
  //

  selectUser () {
    let self = this;

    self.cmd("certSelect", {accepted_domains: ["zeroid.bit"]});
  }



  //
  // get current user
  //

  getCurrentUser (callback) {
    let self = this;
    let user = {};

    if (self.siteInfo === undefined || self.siteInfo == null) {
      throw "siteInfo is not set";
    }

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    let dataInnerPath = self.getDataJsonByUserAddress(self.siteInfo.auth_address);

    if (self.currentUser == null) {
      if (self.siteInfo.auth_address && self.siteInfo.cert_user_id) {
        self.getFileOnce(dataInnerPath, (data) => {
          if (data) {
            user = JSON.parse(data);
            console.log(user);

            user["id"] = self.siteInfo.auth_address;
            user["name"] = self.siteInfo.cert_user_id.split("@")[0];

            let keysNeeded = {
              description: self.DEFAULT_USER_DESCRIPTION,
              profileImage: self.DEFAULT_USER_PROFILE_IMAGE
            };

            let allExists = true;

            for (let key of Object.keys(keysNeeded)) {
              if (user[key] === undefined || user[key] === "") {
                allExists = false;
              }
            }

            if (!allExists) {
              // will sign user data
              self.checkCurrentUserData(user, keysNeeded, (user) => {
                self.currentUser = user;
                callback(user);
              });
            } else {
              self.currentUser = user;
              callback(user);
            }

          } // if (data)
          else {
            // user does not exists in our system yet
            // then just create empty user and recall this function to later fill missings
            self.editCurrentUserData(null, null, false, (user) => {
              self.getCurrentUser(callback);
            }); // self.saveUserData("description"
          }
        }); // self.getFileOnce
      } // if (self.siteInfo && self.siteInfo.auth_address && self.siteInfo.cert_user_id)
      else {
        callback(null)
      }
    } // if (self.currentUser === undefined)
    else {
      callback(self.currentUser);
    }

  } // getCurrentUser


  //
  // check for attributes and add default if it doesnt exists
  //

  checkCurrentUserData (user, data, callback = null) {
    let self = this;

    if (user === undefined || user == null) {
      throw "user(1st arg) is not set";
    }

    if (data === undefined || data == null) {
      throw "data(2nd arg) is not set";
    }


    let allExists = true;

    for (let key of Object.keys(data)) {
      if (user[key] === undefined) {

        console.log(key + " is undefined");
        self.editCurrentUserData(key, data[key], false, (isSuccess) => {
          // TODO: error check if not success
          user[key] = data[key];
          self.checkCurrentUserData(user, data, callback);
        });

        allExists = false;
        break;

      }
    }

    if (allExists) {
      self.editCurrentUserData(null, null, true, (isSuccess) => {
        // TODO: error check if not success
        if (callback != null) {
          callback(user);
        }
      });
    } // if (allExists)

  } // checkCurrentUserData


  //
  // edit user data
  //

  editCurrentUserData (key, value, publish = true, callback = null) {
    let self = this;
    let user = {};

    if (self.siteInfo === undefined || self.siteInfo == null) {
      throw "siteInfo is not set";
    }

    let dataInnerPath = self.getDataJsonByUserAddress(self.siteInfo.auth_address);

    self.getFileOnce(dataInnerPath, (data) => {
      if (data) {
        user = JSON.parse(data);
      }

      if (key != null) {
        user[key] = value;
      }

      let jsonRaw = unescape(encodeURIComponent(JSON.stringify(user, undefined, '\t')));

      // Write file to disk
      self.cmd("fileWrite", [dataInnerPath, btoa(jsonRaw)], (res) => {
        if (res === "ok") {
          if (publish) {
            self.currentUserSignContent(() => {
              if (callback != null) {
                callback(true);
              } // if (callback != null)
            }); // self.userSign
          } // if (publish)
          else {
            if (callback != null) {
              callback(true);
            } // if (callback != null)
          }
        } // if (res === "ok")
        else {
          self.cmd("wrapperNotification", ["error", "File write error: #{res}"]);

          if (callback != null) {
            callback(false);
          } // if (callback != null)
        }
      }); // self.cmd("fileWrite"
    }); // self.getFileOnce

  } // saveCurrentUserData


  //
  // save current user content.json
  //

  currentUserSignContent (callback = null) {
    let self = this;

    if (self.siteInfo === undefined || self.siteInfo == null) {
      throw "siteInfo is not set";
    }

    let contentInnerPath = self.getContentJsonByUserAddress(self.siteInfo.auth_address);

    // sign the changed file in our user's directory
    self.cmd("siteSign", {"inner_path": contentInnerPath}, (res) => {

      // clear current user from buffer to read it again
      self.currentUser = null;

      // publish to other users
      self.cmd("sitePublish", {"inner_path": contentInnerPath, "sign": false}, function(res) {

      }); // self.cmd("sitePublish"

      if (callback != null) {
        callback();
      } // if (callback != null)
    }); // self.cmd("siteSign"

  } // currentUserSignContent


  //
  // fix current user content by editing it manually
  // returns boolean if function was success
  //

  fixCurrentUserContent (callback) {
    let self = this;

    if (self.siteInfo === undefined || self.siteInfo == null) {
      throw "siteInfo is not set";
    }

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    let contentInnerPath = self.getContentJsonByUserAddress(self.siteInfo.auth_address);

    self.getFileOnce(contentInnerPath, (data) => {

      if (data) {

        let content = JSON.parse(data);
        let changed = false;

        if (content["optional"] === undefined) {
          content["optional"] = "(optional/.*)";
          changed = true;
        }

        if (content["ignore"] === undefined) {
          content["ignore"] = "(ignore/.*)";
          changed = true;
        }

        if (changed) {
          let jsonRaw = unescape(encodeURIComponent(JSON.stringify(content)));
          self.cmd("fileWrite", [contentInnerPath, btoa(jsonRaw)], (res) => {
            if (res === "ok") {
              console.log("["+self.TAG+"] OK: fixUserContent - fileWrite: " + contentInnerPath);

              self.currentUserSignContent(callback);
            } else {
              console.error("["+self.TAG+"] ERROR: fixUserContent - fileWrite: failed " + contentInnerPath);
              callback();
            }

          });
        } else {
          callback();
        }
      } else {
        callback();
      }
    }); // self.getFileOnce

  } // fixCurrentUserContent



  //
  // get language file as json object
  //

  getLanguageFileAsJsonObject (filePath, callback) {
    let self = this;

    if (filePath === undefined || filePath === "") {
      throw "filePath can't be undefined or empty";
    }

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    self.getFileOnce(filePath, (data) => {
      if (data) {
        callback(JSON.parse(data));
      } else {
        console.error("["+self.TAG+"] ERROR: getLanguageFileAsJsonObject - fileGet file doesnt exists: " + filePath);
        callback([]);
      }
    }); // self.getFileOnce
  }



  //
  // get settings
  //

  getSettings (callback) {
    let self = this;
    let returned = false;

    self.cmd("userGetSettings", [], (res) => {
      // dunny why but this 'userGetSettings' causes many times to respond
      if (returned === false) {
        returned = true;
        callback(res);
      }
    }); // self.cmd("userGetSettings"

  } // getSettings


  //
  // save/set site settings
  //

  setSettings (settings, callback = null) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    self.cmd("userSetSettings", [settings], (res) => {
      if (callback != null) {
        callback(res);
      }
    }); // self.cmd("userSetSettings"

  } // setSettings


  //
  // log out current user, zero out selected certificate
  //

  logoutCurrentUser (callback = null) {
    let self = this;

    self.getSettings((settings) => {
      settings[self.DISMISS_USER] = true;
      self.setSettings(settings, callback);
    }); // self.getSettings

  } // logoutCurrentUser


  //
  // is current user logged in
  //

  isLoggedIn (callback) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    self.getCurrentUser((user) => {
      if (user == null) {
        callback(false);
      } else {
        self.getSettings((settings) => {
          if (settings[self.DISMISS_USER] === true) {
            callback(false);
          } else {
            // fix user content.json
            self.fixCurrentUserContent(() => {
              console.log("["+self.TAG+"] WARNING: isLoggedIn - fixCurrentUserContent: done");
              callback(true);
            }); // self.fixCurrentUserContent
          }
        }); // self.getSettings
      }
    }); // self.getCurrentUser
  }


  //
  // set(upload) profile image
  //

  setProfileImage (file, callback = null) {
    let self = this;

    if (self.siteInfo === undefined || self.siteInfo == null) {
      throw "siteInfo is not set";
    }

    let optionalInnerPath = self.getOptionalPathByUserAddress(self.siteInfo.auth_address);

    self.cmd("bigfileUploadInit", [optionalInnerPath + "/" + self.PROFILE_IMAGE_FILE, file.size], (initRes) => {
      let formData = new FormData();
      formData.append(file.name, file);

      let req = new XMLHttpRequest();
      req.upload.addEventListener("progress", console.log);
      req.upload.addEventListener("loadend", () => {
        self.editCurrentUserData(self.PROFILE_IMAGE, initRes.inner_path, true, (isSuccess) => {
          if (callback != null) {
            callback(isSuccess);
          }
        });
      });
      req.withCredentials = true;
      req.open("POST", initRes.url);
      req.send(formData)
    })
  }



  //
  // get audio file path name close to search result
  // will return array of search results, even empty arr if file fails to open
  //

  getSongListBySearch (searchX, callback, limit = undefined) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    searchX = searchX.toLowerCase();

    self.getFileOnce(self.SONG_LIST_TXT, (data) => {
      if (data) {
        let lines = data.split("\n");
        let ret = [];

        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i].length === 0) continue;

          // tab char
          let tabs = lines[i].split('\t');
          // tabs[0] is index, tabs[1] actual name with album, tabs[2] is file location

          if (tabs[1].toLowerCase().indexOf(searchX) !== -1) {
            let splits = tabs[1].split("/");

            let folder = tabs[1].substr(0, tabs[1].length - (splits[2].length +1));
            if (tabs.length === 3) {
              folder = tabs[2].substr(0, tabs[2].length - (tabs[2].split("/")[2].length +1));
            }

            ret.push({
              path: tabs.length === 3 ? tabs[2] : tabs[1],
              artist: splits[0].replaceAll("-", " "),
              album: splits[1].replaceAll("-", " "),
              song: splits[2].replaceAll("-", " ").replace(/\.[^/.]+$/, ""),
              folder: folder
            });
          }

          if (limit !== undefined && ret.length >= limit) {
            break;
          }
        }

        callback(ret);

      } else {
        console.error("["+self.TAG+"] ERROR: getSongListBySearch - fileGet file doesnt exists: " + self.USERS_TXT);
        callback([]);
      }
    }); // self.getFileOnce
  } // getSongListBySearch



  //
  // get song file path by its id
  //

  getSongFilePathById (songId, callback) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    self.getFileOnce(self.SONG_LIST_TXT, (data) => {
      if (data) {
        let lines = data.split("\n");
        let filePath = "";

        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i].length === 0) continue;

          // tab char
          let tabs = lines[i].split('\t');
          if (tabs[0] == songId) {
            filePath = tabs.length === 3 ? tabs[2] : tabs[1];
            break;
          }
        }

        callback(filePath);

      } else {
        console.error("["+self.TAG+"] ERROR: getSongFilePathById - fileGet file doesnt exists: " + self.USERS_TXT);
        callback([]);
      }
    }); // self.getFileOnce
  }


  // TODO:
  //getSongOriginalNameByPath (filePath)



  //
  // get file with buffer
  //

  // TODO: clear buffer if site has updated
  getFileWithBuffer (filePath, callback) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    if (self.fileBuffer[filePath] !== undefined) {
      callback(self.fileBuffer[filePath]);
    } else {
      self.getFileOnce(filePath, (data) => {
        self.fileBuffer[filePath] = data;
        callback(data);
      });
    }
  }


  //
  // for some weird reson we get file many times,
  // maybe when file is modified it gets refiered
  //

  getFileOnce (filePath, callback, { format = "text" } = {}) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    let gotFile = false;

    self.cmd("fileGet", {inner_path: filePath, required: false, format: format}, (data) => {

      // for some weird way this gets back called many times :P
      if (gotFile) {
        return;
      }

      gotFile = true;

      callback(data);

      return false;
    });
  }





  //
  // display zero frame error message
  //

  logError (message, milliseconds = null) {
    let self = this;

    if (milliseconds == null) {
      self.cmd("wrapperNotification", ["error", message])
    } else {
      self.cmd("wrapperNotification", ["error", message, milliseconds])
    }
  }

}