angular.module('ngZeroBlog').directive('comment', ['$rootScope',
	function($rootScope) {

		var controller = function($scope,$element) {
			
			// create comment
			$scope.createComment = function(post,comment){
				console.log('what');
				// check user account
				if (!Page.site_info.cert_user_id) {
					Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
					$scope.selectUser();
					return false;
				}

				// inner path
				var inner_path = "data/users/"+Page.site_info.auth_address+"/comment.json";

				// get file
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {

					if (data) { data = JSON.parse(data); } 
					else { data = { "next_comment_id" : 1,"comment": [] }; }

			    	// new comment
					comment = {
						"comment_id":data.next_comment_id,
						"post_id":post.post_id,
						"user_id":Page.site_info.cert_user_id,
						"body": comment,
						"date_added": +(new Date)
					};

					data.next_comment_id += 1;
					data.comment.push(comment);
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));

					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], (function (_this) {
						return function(res){
							return Page.cmd("sitePublish",{"inner_path": inner_path}, function(res){
								Page.cmd("wrapperNotification", ["done", "Post Commented!", 1000]);
								if (post.comments.length === 0) { post.comments = [comment]; }
								else { post.comments.push(comment); }
								$scope.comment = '';
								$scope.$apply();
							});
						};
					})(this));
					return false;
			    
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