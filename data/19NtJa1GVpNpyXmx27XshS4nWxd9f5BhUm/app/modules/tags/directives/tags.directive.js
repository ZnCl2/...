angular.module('ngZeroBlog').directive('tags', [
	function() {

		var controller = function($scope,$element) {

			// get posts
			$scope.getTags = function(){
				Page.cmd("dbQuery", ["SELECT * FROM tag ORDER BY date_added"], function(tags) {
					console.log(tags);
					$scope.tags = tags;
					$scope.$apply();
				});
			};

			$scope.tagSelected = function(tag){
				if (!$scope.selectedTags) $scope.selectedTags = [];
				$scope.selectedTags.push(tag);
				$scope.post.tag = '';
			};

		};

		return {
			restrict: 'AE',
			replace:false,
			controller: controller
		}

	}
]);