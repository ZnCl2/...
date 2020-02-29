app.directive('postList', ['Post','Menu','$rootScope',
	function(Post,Menu,$rootScope) {

		// site header controller
		var controller = function($scope,$element) {

			// init post list
			$scope.init = function(){

				// init vars
				$scope.loading_posts = true;
				$scope.cache_menu = Menu.getPostCacheMenu();
				$scope.sort_options = Menu.getSortOptionsMenu();
				$scope.sortVal = '-p.post_date_added';
				$scope.orderBy = $scope.sortVal;
				
				if ($scope.view === 'category'){
					$scope.getCategory();
				} else {
					$scope.getPosts();
				}
			};

			// get category
			$scope.getCategory = function(){
				var query = "SELECT * FROM categories WHERE category_id='"+$scope.path.split('=')[1]+"'";
				Page.cmd("dbQuery",[query],function(category){
					$scope.$apply(function(){
						if (category.length > 0){
							$scope.category = category[0];
							$scope.getPosts();
						}
					});
				});				
			};

			// get posts
			$scope.getPosts = function(){
				// posts query
				var query = Post.generatePostListQuery($scope.category,$scope.sortVal,$scope.section,$scope.page.site_info.auth_address,$scope.keyword);
				// get posts
				Page.cmd("dbQuery",[query],function(posts){
					$scope.$apply(function(){
						if (posts.length > 0){
							$scope.posts = Post.renderPostWithSites(posts,$scope.u_sites);
						}
						$scope.loading_posts = false;
					});
				});	
			};

			// render post item style
			$scope.renderPostItemStyle = function(post){

				var css_class = '';

				if (post.site){
					css_class += 'cached';
				} else if (post.category_title === 'proxy'){
					css_class += 'proxy';
				}

				if (post.favorite_user_id){
					css_class += ' favorited';
				}
				
				return css_class;
			};

			$scope.filterCache = function(item){
				$scope.cache_class = item.label;
				$scope.cache_menu.forEach(function(i,index){
					if (i.label !== item.label){
						i.state = '';
					} else {
						i.state = 'active';
					}
				});
			};

			$scope.sortBy = function(option){
				
				if (option.label === 'peers'){
					$scope.sortVal = 'p.post_date_added';
				} else {
					$scope.sortVal = option.value;
				}

				if (option.label === 'top voted'){
					$scope.orderBy = '';
				} else {
					$scope.orderBy = option.value;
				}
				$scope.loading_posts = true;
				$scope.getPosts();
			};

			$rootScope.$on('searchSites',function(event,mass){
				$scope.keyword = mass;
				$scope.loading_posts = true;
				$scope.getPosts();
			});

		};

		var template =  '<section class="post-list section" ng-init="init()">' +
							'<div class="loading" ng-show="loading_posts"><span></span></div>' +
							'<div ng-hide="loading_posts">' +
								'<h2 style="margin-bottom:10px;" ng-if="keyword"><b>search results for "{{keyword}}"</b></h2>' +
								'<ul ng-if="posts" class="posts-top-menu" ng-if="cache_menu">' +
									'<li ng-repeat="item in cache_menu" class="{{item.state}}"><a ng-click="filterCache(item)">{{item.label}}</a></li>' +
								'</ul>' +
								'<div ng-if="posts" class="sort-options">' +
									'<span>sort by:</span>' +
									'<ul>' +
										'<li ng-repeat="option in sort_options">' +
											'<a ng-click="sortBy(option)">{{option.label}}</a>' +
										'</li>' +
									'</ul>' +
								'</div>' +
								'<div ng-if="posts" class="list-items-container {{cache_class}}">' +
									'<div ng-repeat="post in posts | orderBy:orderBy" class="post-item col-lg-2 col-md-2 col-sm-2 col-xs-3" ng-class="renderPostItemStyle(post)">' +
										'<post-list-item></post-list-item>' +
									'</div>' +
								'</div>' +
								'<span ng-if="!posts"><span ng-if="category">no posts in this category</span><span ng-if="!category">no posts</span></span>' +
							'</div>' +
						'</section>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);