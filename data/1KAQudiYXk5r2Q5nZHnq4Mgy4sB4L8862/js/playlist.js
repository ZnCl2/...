

class Playlist {
  TAG = "Playlist";

  parent;
  lang;

  clickedOnInput = false;
  editing = false;

  playlistObj;

  constructor(parent, playlistId, onRenderedCallback = null) {
    let self = this;

    self.parent = parent;
    self.lang = parent.lang;

    userframe.getLocalPlaylistById(playlistId, (obj) => {
      self.playlistObj = obj;

      console.log("songs", obj.songs);

      lavatube.renderArea("container", "templates/playlist/playlist.html", {
        lang: self.lang,
        playlistObj: self.playlistObj,
        present: "present-fast"
      }, () => {

        // load songs in background
        self.loadSongs();

        if (onRenderedCallback != null) {
          onRenderedCallback();
        }

      });

      // also reload main left panel playlists
      userframe.getLocalPlaylists((playlists) => {
        lavatube.updateArea("playlists", {
          lang: self.lang,
          playlists: playlists,
          selectedPlaylistId: self.playlistObj.id
        });
      });

    });

    document.addEventListener("click", () => {
      if (self.editing) {
        if (self.clickedOnInput === false) {
          self.reload();
        }

        self.clickedOnInput = false;
      }
    });

    lavatube.onMethod({
      onChangePlaylistTitle: (elem) => {

        if (self.editing === false) {
          lavatube.renderArea("playlist-title", "templates/playlist/playlist-edit-title.html", {
            lang: self.lang,
            playlistObj: self.playlistObj
          }, () => {
            self.editing = true;
          });
        }

        self.clickedOnInput = true;
      },

      onChangePlaylistDescription: (elem) => {
        if (self.editing === false) {
          lavatube.renderArea("playlist-description", "templates/playlist/playlist-edit-description.html", {
            lang: self.lang,
            playlistObj: self.playlistObj
          }, () => {
            self.editing = true;
          });
        }

        self.clickedOnInput = true;
      },

      onInputPlaylist: (event, inputElem) => {
        // if enter is clicked
        if (event.keyCode === 13) {
          self.reload();
        }
      },

      onKeyUpPlaylistTitle: (event, inputElem) => {
        if (event.keyCode === 13) {
          return;
        }

        if (inputElem.value == "") {
          self.playlistObj.name = self.lang['emptyPlaylistTitle'];
        } else {
          self.playlistObj.name = inputElem.value;
        }

        userframe.updateLocalPlaylist(self.playlistObj);
      },

      onKeyUpPlaylistDescription: (event, inputElem) => {
        if (event.keyCode === 13) {
          return;
        }

        if (inputElem.value == "") {
          self.playlistObj.description = self.lang['emptyPlaylistDescription'];
        } else {
          self.playlistObj.description = inputElem.value;
        }

        userframe.updateLocalPlaylist(self.playlistObj);
      },

      onPlaylistSongMore: (songPath, clickedElem)  => {
        songPath = decodeArg(songPath);

        let menu = [
          [
            self.lang['addToPlaylist'],
            { [self.lang['newPlaylist']]: "new playlist id" },
            Menus.SEPARATOR
          ],
          Menus.SEPARATOR,
          { [self.lang['download']]: "download" },
          { [self.lang['removeFromPlaylist']]: "remove" }
        ];

        userframe.getLocalPlaylists((playlists) => {
          // add playlists to menu excluding selected playlist
          menu[0] = menu[0].concat(playlists.filter(x => x.id != self.playlistObj.id).map(x => [{ [x.name]: `addToPlaylist:${x.id}` }][0] ));

          Menus.dropDown(clickedElem, menu, (id) => {
            switch (id) {

              case "download": {
                break;
              }

              case "remove": {
                console.log("remove " + songPath + " from " + self.playlistObj.id);
                userframe.removeMusicFromLocalPlaylist(self.playlistObj.id, songPath, () => {
                  self.reloadSongs();
                });

                break;
              }

              default: {
                if (id.startsWith("addToPlaylist:")) {
                  let playlistId = id.substr(14);

                  console.log("add " + songPath + " to " + playlistId);
                  userframe.addMusicToLocalPlaylist(playlistId, songPath);
                }

                break;
              }
            }
          });
        });


      },

    });

  } // constructor

  loadSongs () {
    let self = this;

    // convert to set to remove duplicates
    let songsIdSet = Array.from(new Set(self.playlistObj.songs.map(x => x.id)));

    let loadFun = (i) => {
      lilframe.getSongFilePathById(songsIdSet[i], (filePath) => {
        let splits = filePath.split("/");
        let folder = filePath.substr(0, filePath.length - (splits.last().length +1));

        lavatube.addToArea("playlist-songs", "templates/playlist/playlist-song.html", {
          song: splits[2].replaceAll("-", " ").replace(/\.[^/.]+$/, ""),
          artist: splits[0].replaceAll("-", " "),
          album: splits[1].replaceAll("-", " "),
          imagePath: "optional/music/" + folder + "/cover-smoll.jpg",
          filePath: filePath,
          playing: self.parent.playing,
          playlistObj: self.playlistObj
        }, () => {
          if (i +1 < songsIdSet.length) {
            loadFun(i +1);
          }
        });
      });
    };

    if (songsIdSet.length > 0) {
      loadFun(0);
    }
  }

  reloadSongs () {
    let self = this;

    // simple clear way :p
    document.querySelector("*[lavatube-area='playlist-songs']").innerHTML = '';

    userframe.getLocalPlaylistById(self.playlistObj.id, (obj) => {
      self.playlistObj = obj;

      self.loadSongs();
    });
  }

  reload () {
    let self = this;

    lavatube.renderArea("container", "templates/playlist/playlist.html", {
      lang: self.lang,
      playlistObj: self.playlistObj,
      present: ""
    }, () => {
      self.editing = false;
      self.loadSongs();
    });

    // also reload main left panel playlists
    userframe.getLocalPlaylists((playlists) => {
      lavatube.updateArea("playlists", {
        lang: self.lang,
        playlists: playlists,
        selectedPlaylistId: self.playlistObj.id
      });
    });
  }

}