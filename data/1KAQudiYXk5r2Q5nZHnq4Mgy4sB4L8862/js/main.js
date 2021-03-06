

//
// TODO: fix error: NotAllowedError: The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
// TODO: container has its own class
//

class Main {
  TAG = "Main";

  lang;

  music;

  // object that hold currently playing path, artist, album, song, folder
  // when audio is paused this is also empty
  playing = {};
  playingPlaylistId = undefined;

  playerControlPlay;
  playerProgress;

  currentContainerView;
  currentContainerViewClass;

  CONTAINER_VIEW_SEARCHING = "continer.view.searching";
  CONTAINER_VIEW_PLAYLIST = "continer.view.playlist";

  searchWord;
  searchItemsLst;

  playlists;

  constructor() {
    let self = this;

    lilframe.getLanguageFileAsJsonObject("langs/en-main.json", (lang) => {
      self.lang = lang;

      userframe.getLocalPlaylists((playlists) => {

        self.playlists = playlists;

        lavatube.render("templates/main.html", {
          lang: self.lang,
          /*playing: self.playing*/
          playlists: self.playlists
        }, () => {

          self.playerControlPlay = document.querySelector("#player-controls-play");

          self.music = document.getElementById('test-audio');
          self.playerProgress = document.querySelector(".progress-bar .progress");


          self.music.ontimeupdate = () => {
            let percent = self.music.currentTime / self.music.duration * 100;

            self.playerProgress.style.width = percent + "%";
            // move slider also, to fix clicking on smae position to feed record
            $( ".top-panel .playing .progress-bar" ).slider('value', percent);
          };

          self.music.onended = () => {

            console.log("music ended");

            self.playerProgress.style.width = "0%";
            self.playerControlPlay.className = "fa fa-play bigger";

            self.removeAnyPlayingSong();

            // if we have playlist playing then select next song

            if (self.playingPlaylistId) {

              // get index wut song was playing
              userframe.getLocalPlaylistById(self.playingPlaylistId, (obj) => {

                let songsIdSet = Array.from(new Set(obj.songs.map(x => x.id)));

                for (let i = 0; i < songsIdSet.length; i++) {
                    (() => {
                    lilframe.getSongFilePathById(songsIdSet[i], (filePath) => {

                      // javascript weirdnedd and cant use ===
                      if (filePath == self.playing.path) {
                        let nextSongId = i +1 < songsIdSet.length ? songsIdSet[i +1] : songsIdSet.first();

                        lilframe.getSongFilePathById(nextSongId, (nextSongFilePath) => {
                          console.log("next song (id: "+nextSongId+") to play", nextSongFilePath);

                          self.playSongByPath(nextSongFilePath);
                          self.reloadSubView();
                        });
                      }
                    });
                  })();
                }
              });

            } else {
              // clear currently playing object
              self.playing = {}
            }


          };

          let volumeSlider = document.querySelector(".top-panel .volume .volume-bar");
          $( volumeSlider ).slider({
            min: 0,
            max: 100,
            step: 0.1,
            value: 100,
            slide: function( event, ui ) {
              self.music.volume = ui.value / 100;
              volumeSlider.style.background = "linear-gradient(90deg, rgba(108, 108, 108, 1) "+(ui.value - 1)+"%, rgba(217, 217, 217, 1) "+ui.value+"%, rgba(217, 217, 217, 1) 100%)";
            }
          });

          // disable ondrop event locating to this file
          $('body').on("dragenter dragstart dragend dragleave dragover drag drop", (e) => {
            e.preventDefault();
          });

          document.ondragenter = () => {
            document.querySelector(".drag-container").className = "drag-container show";
            //console.log("drag enter");
          };

          document.ondragexit = () => {
            document.querySelector(".drag-container").className = "drag-container";
            //console.log("drag exit");
          };

          document.ondrop = (e) => {
            document.querySelector(".drag-container").className = "drag-container";
            //console.log("dropped");

            /* code to actually enum these files to upload and later use
            if (e.dataTransfer.items) {
              // Use DataTransferItemList interface to access the file(s)

              for (let item of e.dataTransfer.items) {
                if (item.kind === "file") {
                  let file = item.getAsFile();
                  console.log('... file[].name = ' + file.name);
                }
              }
            } else {
              for (let file of e.dataTransfer.items) {
                console.log('... file[].name = ' + file.name);
              }
            }
            */

            lilframe.logError(self.lang['notLoggedInError']);
          };
        });
      });
    });

    lavatube.onMethod({
      onToggleAudio: () => {
        if (self.music.paused) {
          self.music.play();
          self.playerControlPlay.className = "fa fa-pause bigger";
          self.reloadSubView();
        } else {
          self.music.pause();
          self.playerControlPlay.className = "fa fa-play bigger";
          self.removeAnyPlayingSong();
        }
      },

      onPlayingMore: (event, clickedElem) => {

        let menu = [
          [
            self.lang['addToPlaylist'],
            { [self.lang['newPlaylist']]: "new playlist id" },
            Menus.SEPARATOR
          ],
          Menus.SEPARATOR,
          { [self.lang['download']]: "download" }
        ];

        // add playlists to menu
        menu[0] = menu[0].concat(self.playlists.map(x => [{ [x.name]: `addToPlaylist:${x.id}` }][0] ));

        Menus.dropDown(clickedElem, menu, (id) => {
          switch (id) {

            case "download": {
              break;
            }

            default: {
              if (id.startsWith("addToPlaylist:")) {
                let playlistId = id.substr(14);

                if (self.playing.path === undefined) {
                  console.log("nothing is playing");
                } else {
                  console.log("add " + self.playing.path + " to " + playlistId);
                  userframe.addMusicToLocalPlaylist(playlistId, self.playing.path);
                }

              }

              break;
            }
          }
        });
      },

      onVolumeMin: () => {
        let volumeSlider = document.querySelector(".top-panel .volume .volume-bar");
        let music = document.getElementById('test-audio');

        music.volume = 0;
        volumeSlider.style.background = "linear-gradient(90deg, rgba(108, 108, 108, 1) "+(0 - 1)+"%, rgba(217, 217, 217, 1) "+0+"%, rgba(217, 217, 217, 1) 100%)";
        $( volumeSlider ).slider('value', 0);
      },

      onVolumeMax: () => {
        let volumeSlider = document.querySelector(".top-panel .volume .volume-bar");
        let music = document.getElementById('test-audio');

        music.volume = 1;
        volumeSlider.style.background = "linear-gradient(90deg, rgba(108, 108, 108, 1) "+(100 - 1)+"%, rgba(217, 217, 217, 1) "+100+"%, rgba(217, 217, 217, 1) 100%)";
        $( volumeSlider ).slider('value', 100);
      },

      onAddNewPlaylist: () => {
        userframe.addLocalPlaylist(self.lang['defaultPlaylistTitle'], self.lang['defaultPlaylistDescription'], (playlist) => {
          userframe.getLocalPlaylists((playlists) => {

            self.playlists = playlists;

            lavatube.updateArea("playlists", {
              lang: self.lang,
              playlists: self.playlists
            });

            // to update add to playlist menu list
            self.updateCurrentlyPlaying();
          });

          self.currentContainerViewClass = new Playlist(self, playlist.id, () => {
            self.currentContainerView = self.CONTAINER_VIEW_PLAYLIST;
          });
        });
      },

      onSelectPlaylist: (playlistId) => {
        self.currentContainerViewClass = new Playlist(self, playlistId,() => {
          self.currentContainerView = self.CONTAINER_VIEW_PLAYLIST;
        });
      },

      onRemovePlaylist: (event, playlistId) => {
        userframe.removeLocalPlaylistById(playlistId, () => {
          if (self.currentContainerView === self.CONTAINER_VIEW_PLAYLIST) {
            if (self.currentContainerViewClass.playlistObj.id == playlistId) {
              self.currentContainerView = undefined;
            }
          }

          self.reloadMainView();
        });

        event.stopPropagation();
      },


      onBrowse: () => {
        /*
        lavatube.renderArea("container", "templates/search.html", {
          lang: self.lang
        });
        */

      },

      onSearch: (input) => {
        
        self.clearLeftPanelSelection();

        // make update case new always presents fast (animating)
        if (self.currentContainerView === self.CONTAINER_VIEW_SEARCHING) {
          self.currentContainerViewClass.reload(input.value);
        } else {
          self.currentContainerViewClass = new Search(self.lang, input.value, () => {
            self.currentContainerView = self.CONTAINER_VIEW_SEARCHING;
            self.currentContainerViewClass.playing = self.playing;
          });
        }
      },

      onClearSearch: () => {
        self.clearLeftPanelSelection();

        self.currentContainerViewClass = new Search(self.lang, "", () => {
          self.currentContainerView = self.CONTAINER_VIEW_SEARCHING;
          self.currentContainerViewClass.playing = self.playing;
        });
      },

      onSearchClick: (input) => {
        self.clearLeftPanelSelection();

        if (self.currentContainerView !== self.CONTAINER_VIEW_SEARCHING) {
          self.currentContainerViewClass = new Search(self.lang, input.value, () => {
            self.currentContainerView = self.CONTAINER_VIEW_SEARCHING;
            self.currentContainerViewClass.playing = self.playing;
          });
        }
      },

      onSelectSong: (songElem, path) => {
        path = decodeArg(path);
        console.log("songPath", path);

        // null playing playlist on playing single song
        self.playingPlaylistId = undefined;

        self.togglePlayingSong(songElem, path);
      },

      onPlayPlaylist: (playlistId, songElem, songPath) => {
        console.log("playing playlist", playlistId);

        self.playingPlaylistId = playlistId;

        if (songElem) {
          songPath = decodeArg(songPath);
          self.togglePlayingSong(songElem, songPath);
        } else {
          // select first song and play it

          userframe.getLocalPlaylistById(self.playingPlaylistId, (obj) => {

            if (obj.songs.length == 0) {
              console.log("playlist " + self.playingPlaylistId + " is empty");
            } else {
              lilframe.getSongFilePathById(obj.songs.first().id, (filePath) => {
                self.playSongByPath(filePath);
                self.reloadSubView();
              });
            }
          });
        }


      },

      onToggleLanguages: (event, clickedElem) => {
        Menus.dropUp(clickedElem, [{ "English": "en" }, { "?????????": "jp" }], (id) => {
          switch (id) {
            case "en": {
              lilframe.getLanguageFileAsJsonObject("langs/en-main.json", (lang) => {
                self.lang = lang;
                self.reloadMainView();
              });

              break;
            }

            case "jp": {
              lilframe.getLanguageFileAsJsonObject("langs/jp-main.json", (lang) => {
                self.lang = lang;
                self.reloadMainView();
              });

              break;
            }
          }
        });
      },


    });

  } // constructor

  togglePlayingSong (songElem, path) {
    let self = this;

    if (songElem.getAttribute("playing") === "true") {
      songElem.setAttribute("playing", "false");

      self.music.pause();
      self.playerControlPlay.className = "fa fa-play bigger";

    } else {

      self.removeAnyPlayingSong();

      songElem.setAttribute("playing", "true");

      self.playSongByPath(path);
    }
  }

  playSongByPath (path) {
    let self = this;

    // if we rnt playing selected song then select it
    if (!decodeURI(self.music.src).endsWith("optional/music/" + path)) {
      let splits = path.split("/");

      self.playing = {
        path: path,
        artist: splits[0].replaceAll("-", " "),
        album: splits[1].replaceAll("-", " "),
        song: splits[2].replaceAll("-", " ").replace(/\.[^/.]+$/, ""),
        folder: path.substr(0, path.length - (splits[2].length + 1)),
      };

      if (self.currentContainerView === self.CONTAINER_VIEW_SEARCHING) {
        self.currentContainerViewClass.playing = self.playing;
      }

      self.music.src = "optional/music/" + path;

      self.updateCurrentlyPlaying();
    }

    // and activate play button
    self.music.play();
    self.playerControlPlay.className = "fa fa-pause bigger";
  }


  updateCurrentlyPlaying () {
    let self = this;


    lavatube.updateArea("top-panel-playing", {
      lang: self.lang,
      playing: self.playing,
      playlists: self.playlists
    });

    self.playerProgress = document.querySelector(".progress-bar .progress");


    $( ".top-panel .playing .progress-bar" ).slider({
      min: 0,
      max: 100,
      step: 0.1,
      slide: function( event, ui ) {
        self.playerProgress.style.width = (ui.value) + "%";
        self.music.currentTime = ui.value * self.music.duration / 100;
      }
    });


  }

  removeAnyPlayingSong () {
    let self = this;

    // remove any playing song elem
    let songElem = document.querySelector(".song[playing='true']");
    if (songElem) {
      songElem.setAttribute("playing", "false");
    }
  }

  clearSearch () {
    let self = this;

    let searchElem = document.querySelector("input[type='search']");
    if (searchElem) {

    }
  }

  clearLeftPanelSelection () {
    let self = this;

    for (let li of document.querySelectorAll('.left-panel li.selected')) {
      li.classList.remove('selected');
    }
  }

  reloadMainView () {
    let self = this;

    userframe.getLocalPlaylists((playlists) => {

      self.playlists = playlists;

      console.log("selectedPlaylistId", selectedPlaylistId);

      lavatube.updateArea("main", {
        lang: self.lang,
        playlists: self.playlists
      });

      let volumeSlider = document.querySelector(".top-panel .volume .volume-bar");
      $( volumeSlider ).slider({
        min: 0,
        max: 100,
        step: 0.1,
        value: 100,
        slide: function( event, ui ) {
          self.music.volume = ui.value / 100;
          volumeSlider.style.background = "linear-gradient(90deg, rgba(108, 108, 108, 1) "+(ui.value - 1)+"%, rgba(217, 217, 217, 1) "+ui.value+"%, rgba(217, 217, 217, 1) 100%)";
        }
      });

      self.reloadSubView();
    });
  }

  reloadSubView () {
    let self = this;

    //let scrollTop = document.body.scrollTop;
    //console.log("scrollTop", scrollTop);

    switch (self.currentContainerView) {

      case self.CONTAINER_VIEW_SEARCHING: {
        self.currentContainerViewClass.reload();
        break;
      }

      case self.CONTAINER_VIEW_PLAYLIST: {
        if (self.currentContainerViewClass) {

          // update language for this view
          self.currentContainerViewClass.lang = self.lang;
          // and reload it
          self.currentContainerViewClass.reload();

        }

        break;
      }

      default: {
        break;
      }

    }

    //document.body.scrollTop = scrollTop;
  }

}