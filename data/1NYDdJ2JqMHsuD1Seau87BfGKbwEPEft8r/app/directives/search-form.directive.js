app.directive('searchForm', ['$rootScope',
	function($rootScope) {

		// site search controller
		var controller = function($scope,$element) {

			$scope.searchSites = function(keyword){
				console.log(keyword);
				console.log($scope.view);
				if ($scope.view === 'main'){
					$rootScope.$broadcast('searchSites',keyword);
				} else {
					window.location.href = 'index.html?view:main+keyword='+keyword;
				}
			};

		};

		var template =  '<form id="search">' +
							'<input type="text" placeholder="Search Site" ng-model="keyword" />' +
							'<a class="subm" ng-click="searchSites(keyword)"></a>' +
						'</form>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);