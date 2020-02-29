app.directive('files', ['File','User','$rootScope',
	function(File,User,$rootScope) {

		// files controller
		var controller = function($scope,$element) {

			// init file upload
			$scope.initFileUpload = function(item){
				// file upload config
				$scope.fileUploadConfig = {
					// ignore
				    'options': { // passed into the Dropzone constructor
				      'url': 'upload.php'
				    },
					'eventHandlers': {
						'sending': function (file, xhr, formData) {
							// hide file input
							$scope.hide_file_input = true;							
							// function to be triggerd upon file add
							$scope.readFile(item,file);
						}
					}
				};
			};

			// read file
			$scope.readFile = function(item,file){
				// reader instance
				$scope.reader = new FileReader();
				// reader onload
				$scope.reader.onload = function(){
					// render file object on read
					item.file = File.renderFileObjectOnRead(this.result,file);
					// apply to scope
					$scope.$apply(function(){
						console.log(item);
					});
				};
				// reader read file
				$scope.reader.readAsDataURL(file);
			};

			// on create item
			$scope.onCreateItem = function(item,item_type){
				if (item.file){
					// create file
					$scope.onCreateFile(item.file,item,item_type);
				} else {
					// route post
					$scope.routeItem(item,item_type);
				}
			};

			// on update item
			$scope.onUpdateItem = function(item,item_type){
				if (item.file){
					// create file
					$scope.onCreateFile(item.file,item,item_type);
				} else {
					// route post
					$scope.routeItem(item,item_type);
				}
			};

			// on create File
			$scope.onCreateFile = function(file,item,item_type){
				// config user cluster
				var query = User.generateGetUserJsonQuery($scope.page.site_info.auth_address);
				Page.cmd("dbQuery",[query],function(jsons){
					$scope.$apply(function(){
						var cluster_id = User.getUserClusterId(jsons,$scope.config.clusters);
						$scope.createFile(file,item,item_type,cluster_id);
					});
				});
			};
			// create item
			$scope.createFile = function(f,item,item_type,cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					// render data
					if (data){ 
						data = JSON.parse(data);
						if (!data.files){
							data.files = [];
							data.next_file_id = 1;
						}
					} else { 
						data = { 
							files:[],
							next_file_id:1
						}; 
					}
					// get item id
					var item_id = File.getFilesItemId(data,item_type,$scope.page.site_info.auth_address);
					// new file
					var file = {
						file_id:$scope.page.site_info.auth_address + '_file_' + data.next_file_id,
						file_name:f.name,
						file_type:f.file_type,
						file_cluster:cluster_id,
						file_user_id:$scope.page.site_info.auth_address,
						item_type:item_type,
						item_id:item_id,
						file_date_added:+(new Date)
					};

					// add user to user's json
					data.files.push(file);
					// next file id
					data.next_file_id += 1;
					// write to file
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					var file_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/' + file.file_name;
					Page.cmd("fileWrite", [file_path, f.data_uri.split(';base64,')[1]], function(res) {
						console.log(res);
						// update data.json
						var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
						Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
							console.log(res);
							// sign & publish site
							Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
								console.log(res);
								// apply to scope
								$scope.$apply(function() {
									Page.cmd("wrapperNotification", ["done", "File Uploaded!", 10000]);
									$scope.routeItem(item,item_type,cluster_id);
								});
							});
						});
					});
				});
			};

			// route item
			$scope.routeItem = function(item,item_type){
				if (item_type === 'post'){
					// $rootScope.$broadcast('createPost',item);
					if ($scope.view === 'new'){
						$scope.onCreatePost(item);
					} else if ($scope.view === 'edit'){
						$scope.onUpdatePost(item);
					}
				}
			};

		};

		return {
			restrict: 'AE',
			replace:false,
			controller: controller
		}

	}
]);