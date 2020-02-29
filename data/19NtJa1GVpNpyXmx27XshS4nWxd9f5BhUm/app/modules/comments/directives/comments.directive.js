angular.module('ngZeroBlog').directive('comments', ['$rootScope','$location',
	function($rootScope,$location) {

		var controller = function($scope,$element) {
			
			// get post comments
			$scope.getComments = function(){
				var postId = $location.$$absUrl.split('?Post:')[1].split('&')[0];
				var query = ["SELECT * FROM comment WHERE post_id="+postId+" ORDER BY date_added"];
				Page.cmd("dbQuery", query, function(comments) {
					$scope.post.comments = comments;
					$scope.$apply();
				});
			};

			// get latest comments
			$scope.getLatestComments = function(){
				var query = ["SELECT * FROM comment INNER JOIN post ON comment.post_id=post.post_id ORDER BY date_added LIMIT 5"];
				Page.cmd("dbQuery", query, (function(_this) {
					return function(comments) {
						$scope.comments = comments;
						$scope.$apply();
					};
				})(Page));
			};

			// get all comments
			$scope.getAllComments = function(){
				var query = ["SELECT * FROM comment INNER JOIN post ON comment.post_id=post.post_id ORDER BY date_added"];
				Page.cmd("dbQuery", query, (function(_this) {
					return function(comments) {
						$scope.comments = comments;
						$scope.$apply();
					};
				})(Page));
			};

			// delete comment
			$scope.deleteComment = function(comment){
				console.log(comment);
			};

		};

		return {
			restrict: 'AE',
			replace:false,
			controller: controller
		}

	}
]);