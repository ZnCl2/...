angular.module('zerovidz').directive('videoList', [
	function() {

		var controller = function($scope,$element) {

		};

		return {
			restrict: 'AE',
			templateUrl:'app/views/video-list.view.html',
			replace:true,
			controller: controller
		}

	}
]);