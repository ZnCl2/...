app.directive('sidebar', ['Menu',
	function(Menu) {

		// site header controller
		var controller = function($scope,$element) {

			$scope.getAllCategoryListItemStyle = function(){
				var css_class;
				if (!$scope.categoryId) {
					css_class = 'active';
				}
				return css_class;
			};

			$scope.getCategoryListItemStyle = function(cat){
				var css_class;
				if ($scope.categoryId) {
					if (cat.category_id === $scope.categoryId){
						css_class = 'active';
					}
				}
				return css_class;
			};

		};

		var template =  '<ul class="category-menu" categories ng-init="getCategories()">' +
							'<li ng-class="getAllCategoryListItemStyle()" ng-show="categories"><a href="/{{page.site_info.address}}/index.html">all</a>' +
							'<li ng-repeat="cat in categories" ng-class="getCategoryListItemStyle(cat)">' + 
								'<a href="/{{page.site_info.address}}/index.html?view:category+id={{cat.category_id}}">{{cat.category_title}}</a>' +
							'</li>' +
						'</ul>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);