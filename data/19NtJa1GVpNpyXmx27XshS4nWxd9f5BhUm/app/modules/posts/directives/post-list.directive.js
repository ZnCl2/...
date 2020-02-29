angular.module('ngZeroBlog').directive('postList', ['$location',
	function($location) {

		var controller = function($scope,$element) {

			// init post list
			$scope.initPostList = function(){

				// pagination object
				$scope.pagination = {
					itemsPerPage:$scope.config.postsPerPage,
					order_by:$scope.config.postsOrderBy,
					order_dir:$scope.config.postsOrderDir,
					page:1,
				};

				var countQuery;

				if ($location.$$absUrl.indexOf('?Category') > -1) {
					var categoryId = $location.$$absUrl.split('?Category:')[1].split('&')[0];
					var query = "SELECT * FROM category WHERE category_id="+categoryId+" LIMIT 1";
					Page.cmd("dbQuery", [query],function(category) {
						$scope.category = category[0];
						countQuery = "SELECT COUNT(*) AS postCount FROM post WHERE post.category_id="+$scope.category.category_id+"";
						$scope.countPosts(countQuery);
						$scope.$apply();
					});
				} else {
					countQuery = "SELECT COUNT(*) AS postCount FROM post";
					$scope.countPosts(countQuery);
				}

			};

			// count posts
			$scope.countPosts = function(countQuery){
				Page.cmd("dbQuery", [countQuery], function(postCount) {
					$scope.pagination.total = postCount[0].postCount;
					$scope.getPosts();
				});		
			};

			// get posts
			$scope.getPosts = function(){

				if ($scope.pagination){
					// offset
					if ($scope.pagination.page === 1){
						$scope.pagination.offset = 0;
					} else {
						$scope.pagination.offset = ($scope.pagination.page * $scope.pagination.itemsPerPage) - $scope.pagination.itemsPerPage;
					}
					
					// where
					var query;
					if ($scope.category){
						query = "SELECT * FROM post INNER JOIN category ON post.category_id=category.category_id WHERE post.category_id="+$scope.category.category_id+" ORDER BY "+$scope.pagination.order_by+" "+$scope.pagination.order_dir+" LIMIT "+$scope.pagination.itemsPerPage+" OFFSET "+$scope.pagination.offset;
					} else {
						query = "SELECT * FROM post INNER JOIN category ON post.category_id=category.category_id ORDER BY "+$scope.pagination.order_by+" "+$scope.pagination.order_dir+" LIMIT "+$scope.pagination.itemsPerPage+" OFFSET "+$scope.pagination.offset;
					}
				} else {
					var query = "SELECT * FROM post";
				}

				Page.cmd("dbQuery", [query], function(posts) {
					$scope.posts = posts;
					$scope.finishLoading();
					$scope.$apply();
				});
			};

			// page changed
			$scope.pageChanged = function(page){
				$scope.pagination.page = page;
				$scope.getPosts();
			};

			// edit post
			$scope.deletePost = function(post){

				// inner path
				var inner_path = "data/post.json";

				// get file
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
			        	
					data = JSON.parse(data); 
		        	var postIndex;
		        	data.post.forEach(function(p,index){
		        		if (p.post_id === post.post_id)
		        		postIndex = index;
		        	});

		        	data.post.splice(postIndex,1);
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) { 

						Page.cmd("wrapperNotification", ["done", "Post unliked!", 10000]);
						$scope.posts.splice(postIndex,1);
						$scope.$apply();
					
					});
			    
			    });	
			};

			// delete post
			$scope.editPost = function(post){
				console.log('edit post')
			}

		};

		return {
			restrict: 'AE',
			replace:false,
			controller: controller
		}

	}
]);