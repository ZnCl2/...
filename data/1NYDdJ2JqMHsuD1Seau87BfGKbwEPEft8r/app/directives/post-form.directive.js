app.directive('postForm', ['Post','User',
	function(Post,User) {

		// site header controller
		var controller = function($scope,$element) {

			// init post form
			$scope.init = function(){
				console.log('hi');
				// init post item
				$scope.item_type = 'post';
				if ($scope.itemId){
					var query = Post.generateGetPostQuery($scope.itemId);
					Page.cmd("dbQuery",[query],function(post){
						console.log(post);
						$scope.$apply(function(){
							$scope.post = post[0];
						});
					});		
				} else {
					$scope.post = {};
				}
			};

			// on create post 
			$scope.onCreatePost = function(post){
				// config user cluster
				var query = User.generateGetUserJsonQuery($scope.page.site_info.auth_address);
				Page.cmd("dbQuery",[query],function(jsons){
					$scope.$apply(function(){
						var cluster_id = User.getUserClusterId(jsons,$scope.config.clusters);
						$scope.createPost(post,cluster_id);
					});
				});				
			};

			// create post
			$scope.createPost = function(p,cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
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
					// new post
					var post = {
						post_id:$scope.page.site_info.auth_address + '_post_' + data.next_post_id,
						post_title:p.post_title,
						post_description:p.post_description,
						post_url:p.post_url,
						post_category:p.post_category,
						post_user_id:$scope.page.site_info.auth_address,						
						post_date_added:+(new Date)
					};

					// add post to user's json
					data.posts.push(post);
					// next post id
					data.next_post_id += 1;
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "Post Created!", 10000]);
								window.location = '/' + $scope.page.site_info.address + '/index.html'; 
							});
						});
					});
				});
			};

			// on create post 
			$scope.onUpdatePost = function(post){
				// config user cluster
				var query = User.generateGetUserJsonQuery($scope.page.site_info.auth_address);
				Page.cmd("dbQuery",[query],function(jsons){
					$scope.$apply(function(){
						var cluster_id = User.getUserClusterId(jsons,$scope.config.clusters);
						$scope.updatePost(post,cluster_id);
					});
				});				
			};

			$scope.updatePost = function(p,cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					
					data = JSON.parse(data);

					// get post index
					var postIndex;
					data.posts.forEach(function(post,index){
						if (post.post_id === p.post_id) postIndex = index;
					});

					// update post
					var post = {
						post_id:p.post_id,
						post_title:p.post_title,
						post_description:p.post_description,
						post_url:p.post_url,
						post_category:p.post_category,
						post_user_id:$scope.page.site_info.auth_address,						
						post_date_added:p.post_date_added
					};

					data.posts.splice(postIndex,1);
					// add post to user's json
					data.posts.push(post);
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "Post Created!", 10000]);
								window.location = '/' + $scope.page.site_info.address + '/index.html'; 
							});
						});
					});
				});
			};

		};

		var template =  '<section ng-if="config" class="post-form-container section" ng-init="init()">' +
							'<form class="form" ng-if="post" name="newPostForm" files ng-init="initFileUpload(post)">' +
								'<div class="form-row-container">' +
									'<label>Title</label>' +
									'<input class="form-control" type="text" ng-model="post.post_title" />' +
								'</div>' +
								'<div class="form-row-container">' +
									'<label>Url</label>' +
									'<input class="form-control" type="text" ng-model="post.post_url" />' +
								'</div>' +
								'<div class="form-row-container" categories ng-init="getCategories()">' +
									'<label>Category</label>' +
									'<select class="form-control" ng-model="post.post_category">' + 
										'<option ng-selected="category.category_id === post.post_category" ng-repeat="category in categories" value="{{category.category_id}}">{{category.category_title}}</option>' +
									'</select>' +
								'</div>' +
								'<div class="form-row-container">' +
									'<label>Description</label>' +
									'<textarea class="form-control" ng-model="post.post_description"></textarea>' +
								'</div>' +
								'<div class="form-row-container">' +
									'<label>Image</label>' +
								    '<button ng-hide="hide_file_input" class="form-control input-file" ng-model="topic.file" dropzone="fileUploadConfig">click or drag file here</button>' +
								    '<img ng-if="post.file" ng-src="{{post.file.data_uri}}">' +
                                    '<img ng-if="post.file_name && !post.file" src="merged-{{page.site_info.content.merger_name}}/{{post.file_cluster}}/data/users/{{post.file_user_id}}/{{post.file_name}}"/>' +
								'</div>' +
								'<div class="form-row-container">' +
									'<label></label>' +
									'<button ng-if="view === \'new\'" ng-click="onCreateItem(post,item_type)" class="btn">Submit</button>' +
									'<button ng-if="view === \'edit\'" ng-click="onUpdateItem(post,item_type)" class="btn">Update</button>' +
								'</div>' +
							'</form>' +
						'</section>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);