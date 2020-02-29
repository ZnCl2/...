app.directive('commentList', ['User',
	function(User) {

		// comment list controller
		var controller = function($scope,$element) {

			$scope.initPostComments = function(post){
				$scope.item = post;
				$scope.item_type = 'post';
			};

		};

		var template =  '<ul ng-if="item.comments" class="comment-list">' +
							'<li ng-repeat="comment in item.comments" class="comment-list-item row">' +
								'<figure class="col-sm-1 identicon-container">' +
							        '<identicon username="comment.comment_user_id" size="40"></identicon>' +								
								'</figure>' +
								'<div class="col-sm-11">' +
									'<ul class="comment-header">' +
										'<li><b>{{comment.user_name}}</b></li>' +
										'<li am-time-ago="comment.comment_date_added"></li>' +
										'<li votes ng-init="getCommentVotes(comment)">' +
											'<a ng-click="upVoteComment(comment)"><i class="fa fa-thumbs-up" aria-hidden="true"></i> (<span ng-if="comment.votes_up">{{comment.votes_up.length}}</span><span ng-if="!comment.votes_up">0</span>)</a>' +
											'<a ng-click="downVoteComment(comment)"><i class="fa fa-thumbs-down" aria-hidden="true"></i> (<span ng-if="comment.votes_down">{{comment.votes_down.length}}</span><span ng-if="!comment.votes_down">0</span>)</a>' +
										'</li>' +
									'</ul>' +
									'<div class="comment-body">' +
										'{{comment.comment_body}}' +
									'</div>' +
								'</div>' +
							'</li>' +
						'</ul>';

		return {
			restrict: 'AE',
			replace:false,
			template:template,
			controller: controller
		}

	}
]);