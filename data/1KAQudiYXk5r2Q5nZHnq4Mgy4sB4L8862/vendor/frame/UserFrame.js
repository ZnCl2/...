
class UserFrame extends ZeroFrame {

  TAG = "UserFrame";

  /**
   * @type {Boolean}
   */
  debug;

  /**
   * @type {LilFrame}
   */
  lilframe;



  // JSON ARRAY
  LOCAL_PLAYLISTS = "localPlaylists";


  /**
   * @constructor
   * @param {LilFrame} lilframe
   * @param {boolean} debug
   */
  constructor (lilframe, debug = false) {
    super();
    let self = this;

    self.lilframe = lilframe;
    self.debug = debug;

    if (debug) {
      console.log("["+self.TAG+"] init(debug="+debug+")");
    }
  }

  getLocalPlaylists (callback) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    self.lilframe.getSettings((settings) => {
      if (settings[self.LOCAL_PLAYLISTS] === undefined) {
        callback([]);
      } else {
        callback(settings[self.LOCAL_PLAYLISTS]);
      }
    });
  }

  addLocalPlaylist (playlistName, playlistDescription, callback = null) {
    let self = this;

    self.lilframe.getSettings((settings) => {
      if (settings[self.LOCAL_PLAYLISTS] === undefined) {
        settings[self.LOCAL_PLAYLISTS] = [];
      }

      let newId = (settings[self.LOCAL_PLAYLISTS].length === 0 ? 0 : parseInt(settings[self.LOCAL_PLAYLISTS].last().id)) +1;
      let playlistObj = {
        // like auto increment
        id: newId,
        name: playlistName,
        description: playlistDescription,
        songs: []
      };

      settings[self.LOCAL_PLAYLISTS].push(playlistObj);

      self.lilframe.setSettings(settings, (res) => {
        if (res === "ok") {
          if (callback != null) {
            callback(playlistObj);
          }
        }
      });
    });
  }

  updateLocalPlaylist (playlistObj, callback = null) {
    let self = this;

    self.lilframe.getSettings((settings) => {
      if (settings[self.LOCAL_PLAYLISTS] === undefined) {
        settings[self.LOCAL_PLAYLISTS] = [];
      }

      let elem = settings[self.LOCAL_PLAYLISTS].find(x => x.id == playlistObj.id);
      elem.name = playlistObj.name;
      elem.description = playlistObj.description;
      elem.songs = playlistObj.songs;

      self.lilframe.setSettings(settings, (res) => {
        if (res === "ok") {
          if (callback != null) {
            callback();
          }
        }
      });
    });
  }

  getLocalPlaylistById (playlistId, callback) {
    let self = this;

    if (callback === undefined || callback == null) {
      throw "callback has to be defined";
    }

    self.getLocalPlaylists((lst) => {
      let elem = lst.find(x => x.id == playlistId);
      callback(elem);
    });
  }

  removeLocalPlaylistById (playlistId, callback = null) {
    let self = this;

    self.lilframe.getSettings((settings) => {
      if (settings[self.LOCAL_PLAYLISTS] === undefined) {
        settings[self.LOCAL_PLAYLISTS] = [];
      }

      settings[self.LOCAL_PLAYLISTS] = settings[self.LOCAL_PLAYLISTS].filter(x => x.id != playlistId);

      self.lilframe.setSettings(settings, (res) => {
        if (res === "ok") {
          if (callback != null) {
            callback();
          }
        }
      });
    });
  }

  addMusicToLocalPlaylist (playlistId, musicFilePath, callback = null) {
    let self = this;

    // convert that file path to id located in song-list.txt
    lilframe.getFileOnce("song-list.txt", (data) => {
      let musicId = -1;

      for (let line of data.split("\n")) {
        if (line.indexOf(musicFilePath) !== -1) {
          musicId = line.split("\t")[0];
          break;
        }
      }

      if (musicId === -1) {
        throw "musicFilePath: '" + musicFilePath + "' can't be found";
      }

      self.lilframe.getSettings((settings) => {
        let elem = settings[self.LOCAL_PLAYLISTS].find(x => x.id == playlistId);
        elem.songs.push({
          id: musicId
        });

        self.lilframe.setSettings(settings, (res) => {
          if (res === "ok") {
            if (callback != null) {
              callback();
            }
          }
        });
      });

    });
  }

  removeMusicFromLocalPlaylist (playlistId, musicFilePath, callback = null) {
    let self = this;

    // convert that file path to id located in song-list.txt
    lilframe.getFileOnce("song-list.txt", (data) => {
      let musicId = -1;

      for (let line of data.split("\n")) {
        if (line.indexOf(musicFilePath) !== -1) {
          musicId = line.split("\t")[0];
          break;
        }
      }

      if (musicId === -1) {
        throw "musicFilePath: '" + musicFilePath + "' can't be found";
      }

      self.lilframe.getSettings((settings) => {
        let elem = settings[self.LOCAL_PLAYLISTS].find(x => x.id == playlistId);
        elem.songs = elem.songs.filter(x => x.id != musicId);

        self.lilframe.setSettings(settings, (res) => {
          if (res === "ok") {
            if (callback != null) {
              callback();
            }
          }
        });
      });

    });
  }

}