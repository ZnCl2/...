app.directive('siteHeader', ['Menu',
	function(Menu) {

		// site header controller
		var controller = function($scope,$element) {

			$scope.init = function(){
				// get menus
				$scope.top_menu = Menu.getTopMenu();
			};

		};

		var template =  '<header class="header" ng-init="init()">' +
							'<div class="row" ng-if="page">' +
								'<div class="col-sm-2" id="logo-container">' +
									'<h1><a href="/{{page.site_info.address}}">{{page.site_info.content.title}}</a></h1>' +
								'</div>' +
								'<div class="col-sm-3" id="site-search">' +
									'<search-form></search-form>' +
								'</div>' +
								'<div class="col-sm-5">' +
									'<user-menu ng-if="config"></user-menu>' +
								'</div>' +
								'<div class="col-sm-2" id="main-menu">' +
									'<ul>' +
										'<li><a href="index.html?view:content+section=help">Help</a></li>' +
									'</ul>' +
								'</div>' +
 							'</div>' +
						'</header>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);