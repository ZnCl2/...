

/* ---- /1MusicXkuN2pk5hRdmroeyaCLDJtzTicpB/js/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.onRequest = bind(this.onRequest, this);
      this.onMessage = bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      return this.cmd("innerReady");
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return this.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.cmd("innerReady");
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else {
        return this.onRequest(cmd, message);
      }
    };

    ZeroFrame.prototype.onRequest = function(cmd, message) {
      return this.log("Unknown request", message);
    };

    ZeroFrame.prototype.response = function(to, result) {
      return this.send({
        "cmd": "response",
        "to": to,
        "result": result
      });
    };

    ZeroFrame.prototype.cmd = function(cmd, params, cb) {
      if (params == null) {
        params = {};
      }
      if (cb == null) {
        cb = null;
      }
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
    };

    ZeroFrame.prototype.send = function(message, cb) {
      if (cb == null) {
        cb = null;
      }
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[ZeroFrame]"].concat(slice.call(args)));
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })();

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- /1MusicXkuN2pk5hRdmroeyaCLDJtzTicpB/js/ZeroMusic.coffee ---- */


(function() {
  var ZeroMusic,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ZeroMusic = (function(superClass) {
    extend(ZeroMusic, superClass);

    function ZeroMusic() {
      this.uploadSong = bind(this.uploadSong, this);
      this.getMetadata = bind(this.getMetadata, this);
      this.updateMetadata = bind(this.updateMetadata, this);
      this.resetSongList = bind(this.resetSongList, this);
      this.updateLists = bind(this.updateLists, this);
      this.resetFilter = bind(this.resetFilter, this);
      this.updateSongsList = bind(this.updateSongsList, this);
      this.updateArtistsList = bind(this.updateArtistsList, this);
      this.addSong = bind(this.addSong, this);
      this.playSong = bind(this.playSong, this);
      this.removeSong = bind(this.removeSong, this);
      this.onRequest = bind(this.onRequest, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.selectUser = bind(this.selectUser, this);
      return ZeroMusic.__super__.constructor.apply(this, arguments);
    }

    ZeroMusic.prototype.selectUser = function() {
      this.cmd("certSelect", {
        accepted_domains: ["zeroid.bit"]
      });
      return false;
    };

    ZeroMusic.prototype.onOpenWebsocket = function() {
      this.player = document.getElementById("player");
      this.artistsList = [];
      this.songsList = [];
      this.currentFilter = null;
      this.cmd("site_info", {}, (function(_this) {
        return function(site_info) {
          _this.siteInfo = site_info;
          if (_this.siteInfo.cert_user_id) {
            return document.getElementById("select_user").innerText = _this.siteInfo.cert_user_id;
          }
        };
      })(this));
      return this.cmd("dbQuery", ["SELECT * FROM songs ORDER BY artist COLLATE NOCASE ASC, title COLLATE NOCASE ASC"], (function(_this) {
        return function(res) {
          var file, i, len;
          for (i = 0, len = res.length; i < len; i++) {
            file = res[i];
            _this.addSong(file);
          }
          return _this.updateLists();
        };
      })(this));
    };

    ZeroMusic.prototype.onRequest = function(cmd, message) {
      if (cmd === "setSiteInfo") {
        this.siteInfo = message.params;
        if (message.params.cert_user_id) {
          document.getElementById("select_user").innerHTML = this.siteInfo.cert_user_id;
          return this.cmd("fileGet", ["data/users/" + this.siteInfo.auth_address + "/content.json", false], (function(_this) {
            return function(data) {
              var jsonRaw;
              data = data ? JSON.parse(data) : {};
              data.optional = ".+mp3";
              data.modified = Date.now() / 1000;
              jsonRaw = unescape(encodeURIComponent(JSON.stringify(data, void 0, 1)));
              return _this.cmd("fileWrite", ["data/users/" + _this.siteInfo.auth_address + "/content.json", btoa(jsonRaw)], function(res) {});
            };
          })(this));
        } else {
          return document.getElementById("select_user").innerHTML = "Select user";
        }
      }
    };

    ZeroMusic.prototype.removeSong = function(file) {
      return this.cmd("optionalFileDelete", file);
    };

    ZeroMusic.prototype.playSong = function(file) {
      this.player.innerHTML = '<source src="' + file + '" />';
      this.player.load();
      return this.player.play();
    };

    ZeroMusic.prototype.addSong = function(song) {
      if ((this.artistsList.findIndex((function(_this) {
        return function(e) {
          return e === song.artist;
        };
      })(this))) === -1) {
        this.artistsList.push(song.artist);
      }
      return this.songsList.push(song);
    };

    ZeroMusic.prototype.updateArtistsList = function() {
      var artist, i, len, lis, ref;
      this.artistsList = this.artistsList.sort((function(_this) {
        return function(a, b) {
          return a.toLowerCase() > b.toLowerCase();
        };
      })(this));
      lis = '';
      ref = this.artistsList;
      for (i = 0, len = ref.length; i < len; i++) {
        artist = ref[i];
        lis += '<li><span onclick="page.updateSongsList(\'' + artist.replace(/\'/g, "\\'\\'") + '\')">' + artist + '</span></li>';
      }
      return document.querySelector('div#artists > ul').innerHTML = lis;
    };

    ZeroMusic.prototype.updateSongsList = function(filterArtist) {
      var lis;
      if (filterArtist) {
        this.currentFilter = filterArtist;
      }
      this.songsList = this.songsList.sort((function(_this) {
        return function(a, b) {
          return a.artist.toLowerCase() > b.artist.toLowerCase() && a.title.toLowerCase() > b.title.toLowerCase();
        };
      })(this));
      lis = '';
      return this.cmd("optionalFileList", [void 0, 'time_downloaded DESC', 999999999], (function(_this) {
        return function(res) {
          var file, i, j, len, len1, metadata, ref, song;
          metadata = {};
          for (i = 0, len = res.length; i < len; i++) {
            file = res[i];
            metadata[file.inner_path] = file;
          }
          ref = _this.songsList;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            song = ref[j];
            if (_this.currentFilter && song.artist !== _this.currentFilter) {
              continue;
            }
            lis += '<li';
            if (!metadata[song.path] || metadata[song.path].is_downloaded !== 1) {
              lis += ' class="remote"';
            }
            lis += '><span class="songButtons"><svg class="removeButton" width="15" height="15" onclick="page.removeSong(\'' + song.path + '\')" xmlns="http://www.w3.org/2000/svg"><path d="M1 15L15 1M1 1l14 14" stroke="#fff" stroke-width="4"/></svg> ';
            lis += '<svg class="playButton" width="15" height="15" onclick="page.playSong(\'' + song.path + '\')" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l12 8-12 8z"/></svg></span><strong>' + song.artist + '</strong> - ' + song.title + '</li>';
          }
          return document.querySelector('div#songs > ul').innerHTML = lis;
        };
      })(this));
    };

    ZeroMusic.prototype.resetFilter = function() {
      this.currentFilter = null;
      return this.updateSongsList();
    };

    ZeroMusic.prototype.updateLists = function() {
      this.updateArtistsList();
      return this.updateSongsList();
    };

    ZeroMusic.prototype.resetSongList = function() {
      return document.querySelector('div#songs > ul').innerHTML = '';
    };

    ZeroMusic.prototype.updateMetadata = function(files) {
      var artist, filename, title, track;
      filename = files.files[0].name.replace(/(_|\.mp3$)/g, ' ').trim();
      if (filename.match(/^\d+/)) {
        track = parseInt(filename);
        filename = filename.split(/^\d+\s*([-.]\s*)?/)[2];
      } else {
        track = "unknown";
      }
      if (filename.match(/-/)) {
        artist = filename.split('-')[0].trim();
        title = filename.split('-').slice(1).join('-').trim();
      } else {
        artist = "unknown";
        title = filename.trim();
      }
      document.getElementById('artistField').value = artist;
      document.getElementById('titleField').value = title;
      return document.getElementById('trackField').value = track;
    };

    ZeroMusic.prototype.getMetadata = function(filename) {
      var metadata;
      metadata = {};
      metadata.artist = document.getElementById('artistField').value;
      metadata.title = document.getElementById('titleField').value;
      metadata.track = document.getElementById('trackField').value;
      if (metadata.track !== "unknown") {
        metadata.track = parseInt(metadata.track);
      }
      return metadata;
    };

    ZeroMusic.prototype.uploadSong = function(e) {
      var name;
      if (!this.siteInfo.cert_user_id) {
        return this.selectUser();
      }
      name = e.files[0].name;
      if (!name.match(/\.mp3$/)) {
        return this.cmd("wrapperNotification", ["error", "Only mp3 files are allowed for now.", 5000]);
      }
      return this.cmd("dbQuery", ["SELECT MAX(id) + 1 as next_id FROM songs"], (function(_this) {
        return function(res) {
          var id, metadata, path, reader;
          id = res[0] && id !== null ? res[0].next_id : 1;
          path = "data/users/" + _this.siteInfo.auth_address + '/' + id + '.mp3';
          metadata = _this.getMetadata(name);
          metadata.path = path;
          metadata.id = id;
          reader = new FileReader();
          reader.onload = function(e) {
            return _this.cmd("fileWrite", [path, btoa(reader.result)], function(res) {
              if (res === "ok") {
                return _this.cmd("fileGet", ["data/users/" + _this.siteInfo.auth_address + "/data.json", false], function(data) {
                  var json_raw;
                  data = data ? JSON.parse(data) : {
                    songs: []
                  };
                  data.songs.push(metadata);
                  json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, 1)));
                  return _this.cmd("fileWrite", ["data/users/" + _this.siteInfo.auth_address + "/data.json", btoa(json_raw)], function(res) {
                    return _this.cmd("sitePublish", {
                      inner_path: "data/users/" + _this.siteInfo.auth_address + "/content.json",
                      sign: true
                    }, function(res) {
                      _this.addSong(metadata);
                      _this.updateLists();
                      return _this.playSong(path);
                    });
                  });
                });
              } else {
                return console.error(res);
              }
            });
          };
          return reader.readAsBinaryString(e.files[0]);
        };
      })(this));
    };

    return ZeroMusic;

  })(ZeroFrame);

  window.page = new ZeroMusic;

}).call(this);
