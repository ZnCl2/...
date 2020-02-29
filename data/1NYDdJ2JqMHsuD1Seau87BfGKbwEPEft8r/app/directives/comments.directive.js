app.directive('comments', ['Comment',
	function(Comment) {

		// comments controller
		var controller = function($scope,$element) {

			// get post comments
			$scope.getPostComments = function(post){
				$scope.item = post;
				$scope.item_type = 'post';
				$scope.getComments();
			};			

			// get comments
			$scope.getComments = function(){
				var query = Comment.generateGetItemCommentsQuery($scope.item,$scope.item_type);
				Page.cmd("dbQuery",[query],function(comments){
					$scope.$apply(function(){
						if (comments.length > 0) $scope.item.comments = comments;
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