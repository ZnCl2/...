app.directive('favorites', ['User',
	function(User) {

		// favorites controller
		var controller = function($scope,$element) {

			// get user post favorite
			$scope.getUserPostFavorite = function(post){
				$scope.item_type = 'post';
				$scope.item = post;
				$scope.getUserItemFavorite($scope.item);
			};

			// get user item favorite
			$scope.getUserItemFavorite = function(item){
				var query = "SELECT f.* FROM favorites AS f WHERE f.favorite_item_id='"+$scope.item[$scope.item_type + '_id']+"' AND f.favorite_user_id='"+$scope.page.site_info.auth_address+"'";
				Page.cmd("dbQuery",[query],function(favorite){
					$scope.$apply(function(){
						if (favorite.length > 0) item.user_favorite = favorite[0];
					});
				});			
			};

			//
			$scope.getUserPostFavoriteClass = function(post){
				var css_class = 'favs2';
				if (post.user_favorite){
					css_class = 'favs'
				}
				return css_class;
			};

			// favorite post
			$scope.favoritePost = function(post){
				$scope.item_type = 'post';
				$scope.item = post;
				$scope.onFavoriteItem();
			};

			// on favorite item
			$scope.onFavoriteItem = function(){
				// config user cluster
				var query = User.generateGetUserJsonQuery($scope.page.site_info.auth_address);
				Page.cmd("dbQuery",[query],function(jsons){
					$scope.$apply(function(){
						var cluster_id = User.getUserClusterId(jsons,$scope.config.clusters);
						$scope.routefavorite(cluster_id);
					});
				});
			};

			// route favorite
			$scope.routefavorite = function(cluster_id){
				if ($scope.item.user_favorite){
					$scope.unfavoriteItem(cluster_id);
				} else {
					$scope.favoriteItem(cluster_id);
				}
			};

			// favorite item
			$scope.favoriteItem = function(cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					// render data
					if (data){ 
						data = JSON.parse(data);
						if (!data.favorites){
							data.favorites = [];
							data.next_favorite_id = 1;
						}
					} else { 
						data = { 
							favorites:[],
							next_favorite_id:1
						}; 
					}
					// new file
					var favorite = {
						favorite_id:$scope.page.site_info.auth_address + '_favorite_' + data.next_favorite_id,
						favorite_item_type:$scope.item_type,
						favorite_item_id:$scope.item[$scope.item_type + '_id'],
						favorite_user_id:$scope.page.site_info.auth_address,
						favorite_date_added:+(new Date)
					};

					// add user to user's json
					data.favorites.push(favorite);
					// next favorite id
					data.next_favorite_id += 1;
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", $scope.item_type + " favorited!", 10000]);
								$scope.item.user_favorite = favorite;
								$scope.item.favorites_total += 1;								
							});
						});
					});
				});
			};

			// unfavorite item
			$scope.unfavoriteItem = function(cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					data = JSON.parse(data);
					var favoriteIndex;
					data.favorites.forEach(function(favorite,index){
						if (favorite.favorite_id === $scope.item.user_favorite.favorite_id){
							favoriteIndex = index;
						}
					});
					data.favorites.splice(favoriteIndex,1);
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "item unfavorited!", 10000]);
								delete $scope.item.user_favorite;
								$scope.item.favorites_total -= 1;
							});
						});
					});
				});
			};

		};

		return {
			restrict: 'AE',
			replace:false,
			controller: controller
		}

	}
]);