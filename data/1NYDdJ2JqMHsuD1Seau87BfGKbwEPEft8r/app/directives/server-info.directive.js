app.directive('serverInfo', [
	function() {

		// controller
		var controller = function($scope,$element) {

			$scope.init = function(){
				$scope.tor_status = $scope.page.server_info.tor_status.split(' ')[0];
			};

		};

		var template =  '<div class="server-info" ng-init="init()">' +
						    '<span class="peer-count"><b>{{page.site_info.peers}} peers</b></span>' +
						    '<span class="port-info">Port: ' +
						    	'<span ng-if="page.server_info.ip_external" class="port opened">opened</span>' +
						    	'<span ng-if="!page.server_info.ip_external" class="port closed">closed</span>' + 
						    '</span>' +
						    '<span class="tor-info">Tor: {{tor_status}}</span>' +
						'</div>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);