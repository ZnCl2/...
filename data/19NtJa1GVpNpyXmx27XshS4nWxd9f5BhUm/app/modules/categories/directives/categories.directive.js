angular.module('ngZeroBlog').directive('categories', [
	function() {

		var controller = function($scope,$element) {

			// get categories
			$scope.getCategories = function(){
				Page.cmd("dbQuery", ["SELECT * FROM category"],function(categories) {
					$scope.categories = categories;
					$scope.$apply();
				});
			};

			// delete category
			$scope.deleteCategory = function(catId,scopeIndex){
				// inner path
				var inner_path = "data/category.json";

				// get file
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
			        	
					data = JSON.parse(data); 
		        	var catIndex;
		        	data.category.forEach(function(cat,index){
		        		if (cat.category_id === catId)
		        		catIndex = index;
		        	});

		        	data.category.splice(catIndex,1);
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) { 

						Page.cmd("wrapperNotification", ["done", "Category deleted!", 10000]);
						$scope.categories.splice(scopeIndex,1);
						$scope.$apply();
					
					});
			    
			    });				
			};

			// create category
			$scope.createCategory = function(category){

				// check user account
				if (!Page.site_info.cert_user_id) {
					Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
					$scope.selectUser();
					return false;
				}

				// inner path
				var inner_path = "data/category.json";

				// get file
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
			        	
					if (data) { data = JSON.parse(data); } 
					else { data = { "next_category_id":1,"category": [] }; }

			    	// new vote
					category = {
						"category_id":data.next_category_id,
						"title":category.title
					};

					// next item id
					data.next_category_id += 1;

					data.category.push(category);
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) { 

						Page.cmd("wrapperNotification", ["done", "Category "+category.title+" created!", 10000]);
						$scope.category = {};
						$scope.categories.push(category);
						$scope.$apply();
					
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