angular.module('ngZeroBlog').controller('AdminCtrl', ['$scope','$sce',
	function($scope,$sce) {

		// init admin panel
		$scope.init = function(){

			// admin menu
			$scope.adminMenu = [
				{label:'overview',section:'overview'},
				{label:'general',section:'general'},
				{label:'menus',section:'menus'},
				{label:'categories',section:'categories'},
				{label:'posts',section:'posts'},
				{label:'comments',section:'comments'}
			];

			// starting admin section
			$scope.adminSection = 'general';
			
			// menu item type
			$scope.menuItemViewTypes = [
				{key:'post',value:'post'},
				{key:'category',value:'category'}
			];

			// posts order
			$scope.postsOrderByOptions = [{
				key:"post id",
				value:"post_id"
			},{
				key:"date added",
				value:"date_added"
			},{
				key:"alphabetically",
				value:"title"
			}];

			// posts order direction
			$scope.postsOrderDirOptions = [{
				key:"ascending",
				value:"ASC"
			},{
				key:"descending",
				value:"DESC"
			}];

			// finish loading
			$scope.finishLoading();

		};

		// admin secion
		$scope.goToSection = function(section){
			console.log(section);
			$scope.adminSection = section;
		};

	    // save settings
	    $scope.saveSettings = function(config){
			// check user account
			if (!Page.site_info.cert_user_id) {
				Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
				$scope.selectUser();
			}
			// inner path
			var inner_path = "data/config.json";
			// data json
			var data = {"config":[]};
        	data.config.push(config);
			var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));		        
			// write to file
			Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
				Page.cmd("wrapperNotification", ["done", "Settings Saved!", 10000]);
				$scope.$apply();
			});
	    };

	}
]);