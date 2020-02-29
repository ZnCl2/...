Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  //return hours+':'+minutes+':'+seconds;
  // no need hours right now
  return minutes+':'+seconds;
};

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function(){
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});

var animeFiles = [];

class ZeroChat extends ZeroFrame {
  onOpenWebsocket () {
    // sucessfully connected
  }

  onRequest (cmd, message) {
    if (cmd === "setSiteInfo") {
      var selectUserElem = document.getElementById("select_user")

      if (message.params.cert_user_id) {
        if (selectUserElem) {
          selectUserElem.innerHTML = message.params.cert_user_id
        }
      } else {
        if (selectUserElem) {
          document.getElementById("select_user").innerHTML = "Select user"
        }
      }

      // Save site info data to allow access it later
      this.siteInfo = message.params
    }
  }

  selectUser () {
    this.cmd("certSelect", {accepted_domains: ["zeroid.bit"]});
    return false;
  }

  loadFiles (callback) {
    // remove this debug cause it prints every 10 second
    //console.log("lilFrame.js - loadFiles(callback)");

    var self = this;

    self.cmd("fileQuery", ["anime/list.json", ""], (files) => {
      files = files[0]["files"];
      // check if files count have changed to call got new files event or function
      if (animeFiles.length < files.length) {
        var newFiles = files.filter(function (el) {
          var i = 0;
          for (; i < animeFiles.length; i++) {
            if (el["name"] === animeFiles[i]["name"]) {
              break;
            }
          }
          return i === animeFiles.length;
        });

        animeFiles = files;
        if (callback != null) {
          callback(animeFiles);
        }
      } else {
        animeFiles = files;
      }
    });

    setTimeout(function() {
      // infinity call every 10 seconds to check new animes
      self.loadFiles(null);
    }, 10000);
  }

  searchFiles (search, genre, callback) {
    var self = this;

    if (animeFiles.length == 0) {
      self.loadFiles(function(files) {
        var files = animeFiles.slice();

        if ((search != null && search != "") || genre != null) {
          files = files.filter(function (el) {
            if (search != null && search != "" && genre != null) {
              return el["name"].toLowerCase().indexOf(search.toLowerCase()) != -1 && el["genres"].includes(genre);
            } else if (search != null && search != "") {
              return el["name"].toLowerCase().indexOf(search.toLowerCase()) != -1;
            } else if (genre != null) {
              console.log(el["genres"].includes(genre));
              return el["genres"].includes(genre);
            }
          });
        }

        self.gotNewFiles(files);
        if (callback != null) {
          callback(files);
        }
      });
    } else {
      var files = animeFiles.slice();
      if ((search != null && search != "") || genre != null) {
        files = files.filter(function (el) {
          if (search != null && search != "" && genre != null) {
            return el["name"].toLowerCase().indexOf(search.toLowerCase()) != -1 && el["genres"].includes(genre);
          } else if (search != null && search != "") {
            return el["name"].toLowerCase().indexOf(search.toLowerCase()) != -1;
          } else if (genre != null) {
            return el["genres"].includes(genre);
          }

        });
      }

      self.gotNewFiles(files);
      if (callback != null) {
        callback(files);
      }
    }
  }

  /*
  * function that eats up data.json location e.g: anime/3D-Kanojo-Real-Girl-dubbed/data.json
  * and return its data as json object
  */
  getAnimeByDataJson (dataJsonLocation, callback) {
    console.log("lilFrame.js - getAnimeByDataJson("+dataJsonLocation+")");

    this.cmd("fileQuery", [dataJsonLocation, ""], (files) => {
      callback(files[0]);
    });
  }

  loadAnimes (search = null, genre = null, callback = null) {
    console.log("lilFrame.js - loadAnimes("+search+", "+genre+", callback)");

    var self = this;

    self.searchFiles(search, genre, callback);
  }

  loadCurrentAnimeInfo (callback) {
    console.log("lilFrame.js - loadCurrentAnimeInfo(callback)");

    var self = this;

    var anime = getURLParameter("data");

    self.cmd("fileGet", [anime + "/data.json", ""], (data) => {
      var file = JSON.parse(data);

      var bgElem = document.querySelector(".details .details__bg");
      var titleElem = document.querySelector(".details .details__title");
      var coverElem = document.querySelector(".details .card__cover");
      var tagsElem = document.querySelector(".details .card__list");
      var infoElem = document.querySelector(".details .card__meta");
      var descriptionElem = document.querySelector(".details .card__description");

      if (bgElem) {
        if (file["cover"] != undefined) {
          bgElem.setAttribute("data-bg", anime + "/" + file["cover"]);
          bgElem.style.background = "rgba(0, 0, 0, 0) url('"+anime+"/"+file["cover"]+"') no-repeat scroll center center / cover";
        }
      }

      if (titleElem) {
        titleElem.innerHTML = file["name"];
      }

      if (coverElem) {
        coverElem.innerHTML = `<img src="`+(anime + "/" + file["thumb"])+`" alt="">`;
      }

      if (tagsElem) {
        tagsElem.innerHTML = `<li>`+file["flag"]+`</li>`;
        if (file["age"] != undefined) {
          tagsElem.innerHTML += `<li>`+file["age"]+`</li>`;
        }

      }

      if (infoElem) {
        var genres = "";

        file["genres"].forEach(function (genre) {
          genres += `<a href="#">`+genre+`</a>`;
        });

        infoElem.innerHTML = `
                  <li><span>Genre:</span>
                    `+genres+`
                  </li>
                  <li><span>Episode duration:</span> `+file["duration"]+`</li>
                  <li><span>Status:</span> `+file["status"]+`</li>
                  `;
      }

      if (descriptionElem) {
        if (file["story"] != undefined) {
          descriptionElem.innerHTML = file["story"];
        }
      }

      // tell with callback we finished it
      callback();
    });
  }

  loadCurrentEpisodeVideo (callback) {
    console.log("lilFrame.js - loadCurrentEpisodeVideo(callback)");

    var self = this;

    var ep = getURLParameter("ep");
    var anime = getURLParameter("data");

    var elem = document.querySelector("#player");
    if (elem) {
      self.cmd("fileGet", [anime + "/data.json", ""], (data) => {
        var file = JSON.parse(data);

        var currentEpisode = file["episodes"][parseInt(ep)];
        var wideThumbPath = anime  + "/" + currentEpisode["wide-thumb"];

        var sources = {};
        var fallbackSource = "";

        if (currentEpisode["optional"] != undefined) {
          sources["480"] = anime  + "/" + currentEpisode["optional"];
          fallbackSource = `<a href="`+(anime  + "/" + currentEpisode["optional"])+`" download>Download</a>`;
        } else if (currentEpisode["optionals"] != undefined) {
          currentEpisode["optionals"].forEach(function(episodeOptional) {
            sources[episodeOptional["res"].replace("p", "")] = anime  + "/" + episodeOptional["path"];

            if (fallbackSource === "") {
              fallbackSource = `<a href="`+(anime  + "/" + episodeOptional["path"])+`" download>Download</a>`;
            }
          });
        }

        elem.poster = wideThumbPath;

        // adding sources
        
        if (sources["720"] != undefined) {
          elem.querySelector("#player720").src = sources["720"];
        } else {
          elem.querySelector("#player720").remove();
        }
        
        if (sources["480"] != undefined) {
          elem.querySelector("#player480").src = sources["480"];
        } else {
          elem.querySelector("#player480").remove();
        }
        
        
        elem.querySelector("#playerFallback").href = fallbackSource;
        //elem.src = sources["720"];
        

        // tell with callback we finsihed this function
        callback();
      });
    }
  }

  loadCurrentEpisodes (callback) {
    console.log("lilFrame.js - loadCurrentEpisodes(callback)");

    var self = this;

    var ep = getURLParameter("ep");
    var anime = getURLParameter("data");

    var elem = document.querySelector(".catalog .row");
    if (elem) {
      self.cmd("fileGet", [anime + "/data.json", ""], (data) => {
        var file = JSON.parse(data);

        for (var i = 0; i < file["episodes"].length; i++) {
          var wideThumbPath = anime  + "/" + file["episodes"][i]["wide-thumb"];
          var viewUrl = "view.html?ep=" + (i) + "&data=" + anime;

          elem.innerHTML += `
              <!-- card -->
              <div class="col-6 col-sm-4 col-lg-3 col-xl-2">
                <a href="`+viewUrl+`">
                  <div class="card">
                    <div class="card__cover" `+(ep == i ? 'style="box-shadow: 0 0 20px 0 rgba(255,88,96,0.5)"' : '')+`>
                        <img src="`+wideThumbPath+`" alt="">
                        <span class="card__play">
                        <i class="icon ion-ios-play"></i>
                        </span>
                    </div>
                    <div class="card__content">
                        <h3 class="card__title"><a href="`+viewUrl+`">`+(ep == i ? "「選択した」Ep"+(i +1) : "Episode "+(i +1))+`</a></h3>
                        <p><a href="`+viewUrl+`">`+file["episodes"][i]["name"]+`</a></p>
                    </div>
                  </div>
                </a>
              </div>
              <!-- end card -->`;
        }

        // tell with callback we finshied this function
        callback();
      });
    }
  }

  gotNewFiles (newFiles) {
    // no need to spam
    //console.log("lilFrame.js - gotNewFiles("+newFiles+")");

    var elem = document.querySelector("#tab-1 .row");
    if (elem) {

      // sort all files including new ones by date
      var dateSorted = newFiles.sort(function(a, b) {
        if (a["date"] < b["date"]) return 1;
        if (a["date"]  > b["date"]) return -1;
        return 0;
      });


      // empty animes grid
      elem.innerHTML = "";

      dateSorted.forEach(function (anime) {
        var viewUrl = "view.html?ep=0&data=anime/" + anime["inner_path"];
        var imgPath = "anime/" + anime["inner_path"] + "/thumb.jpg";

        var category = "";
        anime["genres"].forEach(function (genre) {
          category += `<a href="search.html?q=&g=`+genre+`">`+genre+`</a>
                        `;
        });

        elem.innerHTML += `
          <!-- card -->
          <div class="col-6 col-sm-12 col-lg-6">
            <div class="card card--list">
              <div class="row">
                <div class="col-12 col-sm-4">
                  <div class="card__cover">
                    <img src="`+imgPath+`" alt="">
                    <a href="`+viewUrl+`" class="card__play">
                      <i class="icon ion-ios-play"></i>
                    </a>
                  </div>
                </div>

                <div class="col-12 col-sm-8">
                  <div class="card__content">
                    <h3 class="card__title"><a href="`+viewUrl+`">`+anime["name"]+`</a></h3>
                    <span class="card__category">
                      `+category+`
                    </span>

                    <div class="card__wrap">
                      <ul class="card__list">
                        <li>`+anime["flag"]+`</li>
                        `+(anime["age"] != undefined ? "<li>"+anime["age"]+"</li>" : "")+`
                      </ul>
                    </div>

                    <div class="card__description">
                      <p>`+(anime["story"] != undefined ? anime["story"] : "")+`</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end card -->
          `;
      });
    }
  }

}

page = new ZeroChat();
