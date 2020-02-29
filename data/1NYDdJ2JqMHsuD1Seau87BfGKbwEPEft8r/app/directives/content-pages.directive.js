app.directive('contentPages', ['$rootScope',
	function($rootScope) {

		// site search controller
		var controller = function($scope,$element) {

			$scope.init = function(){
				console.log('content pages');
			};

		};

		var template =  '<div class="section-port" ng-if="section === \'help\'">' +
							'<section class="section">' +
	        					'<h2>Help</h2>' +
	        					'<hr/>' +
	        					'<article>coming soon...</article>' +
        					'</section>' +
 						'</div>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);