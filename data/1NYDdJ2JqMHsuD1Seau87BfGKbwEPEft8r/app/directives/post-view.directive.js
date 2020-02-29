app.directive('postView', ['Post','$location',
	function(Post,$location) {

		// site header controller
		var controller = function($scope,$element) {
			
			$scope.initPostView = function(post){
				$scope.post = Post.renderPostUrl(post,$location,$scope.page.site_info.address);
			};

			$scope.openSiteLink = function(post_full_url){
				Page.cmd("wrapperOpenWindow", [post_full_url, "_blank", ""]);
			};
		};

		var template =	'<div class="modal-view post-modal-view" ng-init="initPostView(post)">' +
							'<div class="modal-header">' +
								'<h2>{{post.post_title}}</h2>' +
								'<a class="close" ng-click="close()">x</a>' +
							'</div>' +
							'<div class="modal-body">' +
								'<ul class="post-sub-header">' +
									'<li>posted <b><span am-time-ago="post.post_date_added"></span></b></li>' +
									'<li class="post-category">in <span><i class="icon {{post.category_title}}"></i> <b>{{post.category_title}}</b></span></li>' +
									'<li>by <b>{{post.user_name}}</b></li>' +												
									'<li ng-if="post.site" class="post-site-peers"><i class="icon users"></i><b>{{post.site.peers}}</b></li>' +
									'<li class="post-votes" votes ng-init="getPostVotes(post)">' +
										'<a ng-click="upVotePost(post)"><i class="icon2 thumbs-up" aria-hidden="true"></i><span ng-if="post.votes_up">{{post.votes_up.length}}</span><span ng-if="!post.votes_up">0</span></a>' +
										'<a ng-click="downVotePost(post)"><i class="icon2 thumbs-down" aria-hidden="true"></i><span ng-if="post.votes_down">{{post.votes_down.length}}</span><span ng-if="!post.votes_down">0</span></a>' +
									'</li>' +
									'<li class="post-favorites" favorites ng-init="getUserPostFavorite(post)">' +
										'<a ng-click="favoritePost(post)">' +
											'<span ng-if="post.user_favorite"><i class="icon2 favorite" aria-hidden="true"></i><span>{{post.favorites_total}}</span></span>' +
											'<span ng-if="!post.user_favorite"><i class="icon2 non-favorite" aria-hidden="true"></i><span>{{post.favorites_total}}</span></span>' +
										'</a>' +
									'</li>' +												
								'</ul>' +
								'<div class="post-body">' +
									'<span class="post-url">URL: <a href="javascript:void(0);" ng-click="openSiteLink(post.post_full_url)">{{post.post_url}}</a></span>' +
									'<article>' +
										'<img src="merged-{{page.site_info.content.merger_name}}/{{post.file_cluster}}/data/users/{{post.file_user_id}}/{{post.file_name}}"/>' +
										'<p ng-bind="post.post_description"></span>' +
									'</article>' +
								'</div>' +
								'<div class="post-comments" comments ng-init="getPostComments(post)">' +
									'<comment-form ng-init="initPostCommentForm(post)"></comment-form>' +
									'<comment-list ng-init="initPostComments(post)"></comment-list>'
								'</div>' +
							'</div>' +
						'</div>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);