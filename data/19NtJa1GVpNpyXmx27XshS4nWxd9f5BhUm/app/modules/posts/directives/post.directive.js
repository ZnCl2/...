angular.module('ngZeroBlog').directive('post', ['$sce','$rootScope','$location',
	function($sce,$rootScope,$location) {

		var controller = function($scope,$element) {

			// init post view
			$scope.initPostView = function(){

				var postId = $location.$$absUrl.split('?Post:')[1].split('&')[0];
				var query = "SELECT * FROM post INNER JOIN category ON post.category_id=category.category_id WHERE post_id="+postId+" LIMIT 1";

				Page.cmd("dbQuery", [query],function(posts) {
					$scope.post = posts[0];
					$scope.post.voted = false;
					$scope.post.content = $sce.trustAsHtml($scope.post.body);
					$scope.getPostVotes();
					$scope.countPostComments();
					$scope.finishLoading();
					$scope.$apply();
				});

			};

			// init post list item
			$scope.initPostItem = function(post){
				$scope.post = post;
				$scope.post.voted = false;
				$scope.getPostVotes();
				$scope.countPostComments();
			};

			// get post votes
			$scope.getPostVotes = function(){
				var query = "SELECT * FROM post_vote WHERE post_id = "+$scope.post.post_id+" ORDER BY date_added";
				Page.cmd("dbQuery", [query],function(votes) {
					if (votes.length > 0){
						votes.forEach(function(vote,index){
							if (vote.user_id === $scope.user){
								$scope.post.voted = true;
							}
						});
						$scope.post.votes = votes
						$scope.$apply();
					}
				});
			};

			// count post comments
			$scope.countPostComments = function(){
				var query = "SELECT COUNT(*) AS commentCount FROM comment WHERE post_id="+$scope.post.post_id+"";
				Page.cmd("dbQuery", [query],function(data) {
					if (data.length > 0){
						$scope.post.commentCount = data[0].commentCount;
						$scope.$apply();
					}
				});				
			};


		    // create Post
		    $scope.createPost = function(post){

				// check user account
				if (!Page.site_info.cert_user_id) {
					Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
					return false;
				}

				// inner path
				var inner_path = "data/post.json";

				// get file
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
		        	// data
					if (data) { 
						data = JSON.parse(data); 
					} else { 
						data = { 
							"next_post_id":1,
							"post": [] 
						}; 
					}

			    	// new post
					post = {
						"post_id":data.next_post_id,
						"category_id":post.category_id,
						"user_id":Page.site_info.cert_user_id,
						"title":post.title,
						"image":post.image,
						"body": post.body,
						"date_added": +(new Date)
					};

					data.next_post_id += 1;
					data.post.push(post);
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));

					// write to file
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						Page.cmd("wrapperNotification", ["done", "Post Created!", 10000]);
						$rootScope.$broadcast('postListView');
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