app.directive('siteModal', ['$rootScope','$timeout','Post',
	function($rootScope,$timeout,Post) {

		// site header controller
		var controller = function($scope,$element) {

			// init site modal
			$scope.initSiteModal = function(){
				console.log('what');
				if ($scope.view === 'post'){
					var postId = $scope.path.split('=')[1];
					var query = Post.generateGetPostQuery(postId);
					Page.cmd("dbQuery",[query],function(post){
						$scope.$apply(function(){
							$scope.item_type = 'post';
							$scope.post = post[0];
							$scope.openPostModal();
						});
					});
				}
			};

			// open post modal
			$scope.openPostModal = function(){
				$scope.active = true;
				$timeout(function () {
					$scope.wrapper_class = 'active';
				});
			};

			// rootscope open post modal
			$rootScope.$on('openPostModal',function(event,mass){
				$scope.item_type = 'post';
				$scope.post = mass;
				$scope.openPostModal();
			});

			$scope.close = function(){
				$scope.active = false;
				$scope.wrapper_class = '';
			};

		};

		var template =  '<section id="modal-container" ng-init="initSiteModal()">' +
							'<div ng-if="active" class="wrapper {{wrapper_class}}">' +
								'<div id="modal-overlay" ng-click="close()"></div>' +
								'<div id="modal-dialog">' +
									'<section class="dialog-container section">' +
										'<post-view ng-if="post"></post-view>' +
									'</section>' +
								'</div>' +
							'</div>' +
						'</section>';

		return {
			restrict: 'AE',
			replace:true,
			controller: controller,
			template:template
		}

	}
]);