app.directive('commentForm', ['User',
	function(User) {

		// comments controller
		var controller = function($scope,$element) {

			$scope.initPostCommentForm = function(post){
				$scope.item = post;
				$scope.item_type = 'post';
				$scope.comment = {};
			};

			$scope.onSubmitComment = function(comment,item){
				// config user cluster
				var query = User.generateGetUserJsonQuery($scope.page.site_info.auth_address);
				Page.cmd("dbQuery",[query],function(jsons){
					$scope.$apply(function(){
						var cluster_id = User.getUserClusterId(jsons,$scope.config.clusters);
						console.log(cluster_id);
						$scope.submitComment(comment,item,cluster_id);
					});
				});
			};

			$scope.submitComment = function(c,item,cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					// render data
					if (data){ 
						data = JSON.parse(data);
						if (!data.comments){
							data.comments = [];
							data.next_comment_id = 1;
						}
					} else { 
						data = { 
							comments:[],
							next_comment_id:1
						}; 
					}

					// new file
					var comment = {
						comment_id:$scope.page.site_info.auth_address + '_comment_' + data.next_comment_id,
						comment_body:c.comment_body,
						comment_item_type:$scope.item_type,
						comment_item_id:$scope.item[$scope.item_type + '_id'],
						comment_user_id:$scope.page.site_info.auth_address,
						comment_date_added:+(new Date)
					};

					if ($scope.comment_parent) comment.comment_parent_id = $scope.comment_parent.comment_id;

					// add user to user's json
					data.comments.push(comment);
					// next comment id
					data.next_comment_id += 1;
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", $scope.item_type + " commentd!", 10000]);
								if (!$scope.item.comments) $scope.item.comments = [];
								comment.user_name = $scope.page.site_info.cert_user_id;
								c.comment_body = '';
								$scope.item.comments.push(comment);
							});
						});
					});
				});
			};

		};

		var template =  '<div class="comment-form">' +
							'<form name="commentForm" id="comment-form">' +
								'<textarea placeholder="comment as {{page.site_info.cert_user_id}}" ng-model="comment.comment_body"></textarea>' +
								'<button ng-click="onSubmitComment(comment,item)">submit</button>' +
							'</form>' +
						'</div>';

		return {
			restrict: 'AE',
			replace:false,
			template:template,
			controller: controller
		}

	}
]);