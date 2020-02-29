class Page extends ZeroFrame {
	setSiteInfo(site_info) {
		var out = document.getElementById("out")
		out.innerHTML =
			"Page address: " + site_info.address +
			"<br>- Peers: " + site_info.peers +
			"<br>- Size: " + site_info.settings.size +
			"<br>- Modified: " + (new Date(site_info.content.modified*1000))
	}

	onOpenWebsocket() {
		this.cmd("siteInfo", [], function(site_info) {
			page.setSiteInfo(site_info)
		})

		this.cmd("siteInfo", {}, (site_info) => {
				if (site_info.cert_user_id)
					console.log(site_info.cert_user_id)

				this.site_info = site_info
		})

		//this.loadMovies('street')
	}
	loadMovies (search_term, callback) {
		var sql = "SELECT DISTINCT(movie.name), movie.year, movie.trakt_id, watched.trakt_id AS watched, watchlist.trakt_id AS watch FROM movie LEFT JOIN json USING (json_id) LEFT JOIN watched USING (trakt_id) LEFT JOIN watchlist USING (trakt_id) WHERE movie.name like '%"+search_term+"%' ORDER BY movie.date_added DESC"
		this.cmd("dbQuery", [sql], (movies) => {
			console.log(movies)
			console.log(sql)

			var data = []
			for (var i=0; i < movies.length; i++) {
				if (movies[i].imdb == 'tt4651520' || movies[i].imdb == 'tt1878870' || movies[i].imdb == 'tt3381008')
					continue

				data.push({
					id: i,
					description: movies[i].name+' ('+movies[i].year+')',
					cover_src: 'data/cover/'+movies[i].trakt_id+'.jpg',
					trailer_src: 'data/mp4/'+movies[i].trakt_id+'.mp4',
					watched: movies[i].watched ? true : false,
					watch: movies[i].watch ? true : false,
					imdb: movies[i].imdb,
					trakt_id: movies[i].trakt_id,
				})
			}
			console.log(data)
			callback(data)
		})
  }
  onRequest (cmd, message) {
    if (cmd == "setSiteInfo") {
      if (message.params.cert_user_id)
				console.log(message.params.cert_user_id)
      else
          document.getElementById("select_user").innerHTML = "Select user"
      this.site_info = message.params  // Save site info data to allow access it later
    }
  }
  selectUser () {
      this.cmd("certSelect", {accepted_domains: ["zeroid.bit"]})
      return false
  }

 	markMovieList (list, trakt_id, value) {
		console.log(list, trakt_id, value)
		console.log(this)

		var lists = {
			watched: 'watched',
			watch: 'watchlist',
		}

		if (value)
		{
			this.markMovie (lists[list], trakt_id)
		}
		else
		{
			this.unmarkMovie (lists[list], trakt_id)
		}
	}

  markMovie (list, trakt_id) {
      if (!this.site_info.cert_user_id) {  // No account selected, display error
          this.cmd("wrapperNotification", ["info", "Please, select your account."])
          return false
      }

      // This is our data file path
      var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
      var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

      // Load our current messages
      this.cmd("fileGet", {"inner_path": data_inner_path, "required": false}, (data) => {
          if (data)  // Parse current data file
              data = JSON.parse(data)
          else  // Not exists yet, use default data
              data = { "movie": [], "watched": [], "watchlist": [] }

          // Add the new message to data
          data[list].push({
              "trakt_id": trakt_id,
              "date_added": Date.now()
          })

          // Encode data array to utf8 json text
          var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

          // Write file to disk
          this.cmd("fileWrite", [data_inner_path, btoa(json_raw)], (res) => {
              if (res == "ok") {
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

      return false
  }
	unmarkMovie (list, trakt_id) {
      if (!this.site_info.cert_user_id) {  // No account selected, display error
          this.cmd("wrapperNotification", ["info", "Please, select your account."])
          return false
      }

      // This is our data file path
      var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
      var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

      // Load our current messages
      this.cmd("fileGet", {"inner_path": data_inner_path, "required": false}, (data) => {
          if (data)  // Parse current data file
              data = JSON.parse(data)
          else  // Not exists yet, use default data
              data = { "movie": [], "watched": [], "watchlist": [] }

					for(var i = 0; i < data[list].length; i++) {
		    		var obj = data[list][i];

		    		console.log(obj);
		    		console.log(data[list][i]);

						if (data[list][i].trakt_id == trakt_id)
							{
								console.log("found")
								data[list][i] = {}
							}

						console.log(obj);
						console.log(data[list][i]);
					}

          // Encode data array to utf8 json text
          var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

          // Write file to disk
          this.cmd("fileWrite", [data_inner_path, btoa(json_raw)], (res) => {
              if (res == "ok") {
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

      return false
  }
}
page = new Page()

Vue.component('movie-item', {
	props: ['movie_item'],
	template: '<a v-bind:href="movie_item.trailer_src"><figure><div><img v-bind:src="movie_item.cover_src" alt=""></div><figcaption>{{ movie_item.description }}</figcaption></figure><label><input type="checkbox" v-model="movie_item.watched">Watched</label><label><input v-on:change="clicked" v-bind:data-trakt_id="movie_item.trakt_id" data-list="watch" type="checkbox" v-model="movie_item.watch">Watch</label><label><input type="checkbox" v-model="movie_item.hide">Hide</label></a>',
	methods: {
		clicked: function(el) {
			console.log(el);

			console.log(this);
			console.log(this.watch);
			console.log(this.trakt_id);

			// console.log(el.data);
			// console.log(el.data.movies);
			// console.log(el.data.movie_item);
			// console.log(el.data.movie_item.trakt_id);
			console.log(el.target);
			console.log(el.target.checked);
			console.log(el.target.getAttribute('data-trakt_id'));
			console.log(el.parent);

			var list = el.target.getAttribute('data-list')
			var trakt_id = el.target.getAttribute('data-trakt_id')
			var value = el.target.checked

			page.markMovieList(list, trakt_id, value)
		}
	}
})

var movies = new Vue({
	el: '#movies',
	data: {
		movies: []
	}
})

search_term.onkeyup = function(e) {
	page.loadMovies(search_term.value, function(data) {
		movies.movies = data
	})
}

// on init
page.loadMovies('', function(data) {
	console.log(data)
	movies.movies = data
})
