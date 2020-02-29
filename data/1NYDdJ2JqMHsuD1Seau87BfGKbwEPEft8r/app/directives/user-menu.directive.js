app.directive('userMenu', ['User','$rootScope','Post',
	function(User,$rootScope,Post) {

		// controller
		var controller = function($scope,$element) {

			$scope.init = function(){
				if ($scope.page.site_info.cert_user_id){
					$scope.getUser();
				}
			};

			// get user
			$scope.getUser = function(){
				var query = User.generateGetUserQuery($scope.page.site_info.auth_address);
				Page.cmd("dbQuery",[query],function(user){
					$scope.$apply(function(){
						if (user.length > 0){
							$scope.user = user[0];
							$scope.checkUserIndexedSites();
						} else {
							$scope.registerUser();
						}
					});
				});
			};
			
			// register user
			$scope.registerUser = function(){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + $scope.config.cluster + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					// render data
					if (data){ 
						data = JSON.parse(data);
						if (!data.users){
							data.users = [];
						}
					} else { 
						data = { 
							users:[] 
						}; 
					}
					// new user
					var user = {
						user_id:$scope.page.site_info.auth_address,
						user_name:$scope.page.site_info.cert_user_id,
						user_date_added:+(new Date)
					};

					// add user to user's json
					data.users.push(user);
					
					// write to file
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "User Registered!", 10000]);
								$scope.user = user;
								$scope.checkUserIndexedSites();
								$scope.updateContentJson();
								$rootScope.$broadcast("followNewPosts");
							});
						});
					});
				});
			};

			// check user indexed sites
			$scope.checkUserIndexedSites = function(){
				/*var query = "SELECT * FROM posts";
				Page.cmd("dbQuery",[query],function(posts){
					$scope.$apply(function(){
						$scope.u_new_posts = Post.findNonCatalogSites(posts,$scope.u_sites);
						$scope.posts_bulk = [];
						$scope.u_new_posts.forEach(function(new_post,index){
							if (!new_post.content.merged_type && !new_post.content.merger_name){
								var post = {
									post_title:new_post.content.title,
									post_description:new_post.content.description,
									post_url:new_post.content.address,
									post_category:'1C1gnFcVv9J9kUjF4odDMRYcEWVPJbbqFp_cat_17',
									post_date_added:+(new Date),
									post_user_id:$scope.page.site_info.auth_address
								}
								$scope.posts_bulk.push(post);
							}
						});
						if ($scope.posts_bulk.length > 0){
							console.log($scope.posts_bulk);
							var query = User.generateGetUserJsonQuery($scope.page.site_info.auth_address);
							Page.cmd("dbQuery",[query],function(jsons){
								$scope.$apply(function(){
									var cluster_id = User.getUserClusterId(jsons,$scope.config.clusters);
									console.log(cluster_id);
									$scope.createPostsBulk(cluster_id);
								});
							});
						}
					});
				});*/
			};

			// create posts bulk
			$scope.createPostsBulk = function(cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					$scope.$apply(function(){

						// render data
						if (data){ 
							data = JSON.parse(data);
							if (!data.posts){
								data.posts = [];
								data.next_post_id = 1;
							}
						} else { 
							data = { 
								posts:[],
								next_post_id:1
							}; 
						}
						console.log(data.posts);
						// add bulk posts
						$scope.posts_bulk.forEach(function(p,index){
							p.post_id = $scope.page.site_info.auth_address + '_post_' + data.next_post_id;
							data.posts.push(p);
							data.next_post_id += 1;
						});
						console.log(data.posts);
						// update data.json
						var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
						Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
							console.log(res);
							// sign & publish site
							Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
								console.log(res);
								// apply to scope
								$scope.$apply(function() {
									Page.cmd("wrapperNotification", ["done", "User Sites Indexed!", 10000]);
								});
							});
						});

					});
				});
			};

			// new user select
			$rootScope.$on('newUserSelected',function(event,mass){
				$scope.page = mass;
				$scope.init();
			});

		};

		var template =  '<div id="user-menu" ng-init="init()">' +
							'<ul ng-if="user && page.site_info.cert_user_id">' +
								'<li class="add-new"><a href="index.html?view:new+section=posts">+ Add Site</a></li>' +
								/*'<li class="notifications"><a href="index.html?view:account+section=notifications"><i class="icon social"></i></a></li>' +
								'<li class="messages"><a href="index.html?view:account+section=messages"><i class="icon private"></i></a></li>' +*/
								'<li feed-follow ng-init="initMainFollow()" class="follow-feed">' +
									'<a ng-if="!is_main_follow" ng-click="followNewPosts()"><i class="icon news"></i> follow</i></a>' +
									'<a ng-if="is_main_follow" ng-click="unfollowNewPosts()"><i class="icon news"></i> unfollow</a>' +
								'</li>' +
								'<li>' + 
									'<a ng-click="toggleUserSubMenu()">{{user.user_name}}</a>' +
									'<ul id="user-submenu">' +
										'<li><a href="index.html?view:account+section=posts">Addes Sites</a></li>' +
										'<li><a ng-click="selectUser()">Change</a></li>' +
										'<li><a ng-href="index.html?view:account+section=settings">Settings</a></li>' +
									'</ul>' +
								'</li>' +
							'</ul>' +
							'<ul ng-if="!page.site_info.cert_user_id">' +
								'<li>' +
									'<a ng-click="selectUser()">Login</a>' +
								'</li>' +
								'<li>' +
									'<a ng-click="createCertificate()">Register</a>' +
								'</li>' 
							'</ul>'
						'</div>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);