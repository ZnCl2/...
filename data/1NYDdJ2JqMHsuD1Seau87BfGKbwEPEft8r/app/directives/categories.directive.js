app.directive('categories', [
	function() {

		// categories controller
		var controller = function($scope,$element) {

			$scope.getCategories = function(){
				// get categories
				var query = "SELECT c.* FROM categories AS c ORDER BY c.category_title";
				Page.cmd("dbQuery",[query],function(categories){
					$scope.$apply(function(){
						$scope.categories = categories;
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