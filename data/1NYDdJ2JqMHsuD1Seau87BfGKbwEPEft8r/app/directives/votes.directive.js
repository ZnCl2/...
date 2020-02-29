app.directive('votes', ['Vote','User',
	function(Vote,User) {

		// votes controller
		var controller = function($scope,$element) {

			// get post votes
			$scope.getPostVotes = function(post){
				$scope.item_type = 'post';
				$scope.item = post;
				$scope.getVotes($scope.item);
			};

			// get comment votes
			$scope.getCommentVotes = function(comment){
				$scope.item_type = 'comment';
				$scope.item = comment;
				$scope.getVotes($scope.item);
			};

			// get votes 
			$scope.getVotes = function(item){
				var query = Vote.generateGetPostVotesQuery($scope.item,$scope.item_type);
				Page.cmd("dbQuery",[query],function(votes){
					$scope.$apply(function(){
						if (votes.length > 0){
							item = Vote.renderItemVotes(item,votes);
						}
					});
				});
			};

			// up vote post
			$scope.upVotePost = function(post){
				$scope.item_type = 'post';
				$scope.item = post;
				$scope.vote_type = 'up';
				$scope.voteItem();
			};

			// down vote post
			$scope.downVotePost = function(post){
				$scope.item_type = 'post';
				$scope.item = post;
				$scope.vote_type = 'down';
				$scope.voteItem();
			};

			// up vote comment
			$scope.upVoteComment = function(comment){
				$scope.item_type = 'comment';
				$scope.item = comment;
				$scope.vote_type = 'up';
				$scope.voteItem();
			};

			// down vote post
			$scope.downVoteComment = function(comment){
				$scope.item_type = 'comment';
				$scope.item = comment;
				$scope.vote_type = 'down';
				$scope.voteItem();
			};

			// vote item
			$scope.voteItem = function(){
				// config user cluster
				var query = User.generateGetUserJsonQuery($scope.page.site_info.auth_address);
				Page.cmd("dbQuery",[query],function(jsons){
					$scope.$apply(function(){
						var cluster_id = User.getUserClusterId(jsons,$scope.config.clusters);
						$scope.routeVote(cluster_id);
					});
				});
			};

			// route vote
			$scope.routeVote = function(cluster_id){
				$scope.user_item_vote = Vote.itemVotedByUser($scope.item,$scope.page.site_info.auth_address);
				if ($scope.user_item_vote){
					if ($scope.user_item_vote.vote_type === $scope.vote_type){
						console.log('delete vote');
						$scope.deleteVote(cluster_id);
					} else {
						console.log('change vote');
						$scope.changeVote(cluster_id);
					}
				} else {
					if ($scope.vote_type === 'up'){
						console.log('up vote');
						$scope.createUpVote(cluster_id);
					} else if ($scope.vote_type === 'down'){
						console.log('down vote');
						$scope.createDownVote(cluster_id);
					}
				}
			};

			// create vote
			$scope.createUpVote = function(cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					// render data
					if (data){ 
						data = JSON.parse(data);
						if (!data.votes){
							data.votes = [];
							data.next_vote_id = 1;
						}
					} else { 
						data = { 
							votes:[],
							next_vote_id:1
						}; 
					}
					// new file
					var vote = {
						vote_id:$scope.page.site_info.auth_address + '_vote_' + data.next_vote_id,
						vote_type:'up',
						vote_item_type:$scope.item_type,
						vote_item_id:$scope.item[$scope.item_type + '_id'],
						vote_user_id:$scope.page.site_info.auth_address,
						vote_date_added:+(new Date)
					};

					// add user to user's json
					data.votes.push(vote);
					// next vote id
					data.next_vote_id += 1;
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", $scope.item_type + " voted!", 10000]);
								$scope.getVotes($scope.item);
							});
						});
					});
				});
			};

			// create vote
			$scope.createDownVote = function(cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					// render data
					if (data){ 
						data = JSON.parse(data);
						if (!data.votes){
							data.votes = [];
							data.next_vote_id = 1;
						}
					} else { 
						data = { 
							votes:[],
							next_vote_id:1
						}; 
					}
					// new file
					var vote = {
						vote_id:$scope.page.site_info.auth_address + '_vote_' + data.next_vote_id,
						vote_type:'down',
						vote_item_type:$scope.item_type,
						vote_item_id:$scope.item[$scope.item_type + '_id'],
						vote_user_id:$scope.page.site_info.auth_address,
						vote_date_added:+(new Date)
					};

					// add user to user's json
					data.votes.push(vote);
					// next vote id
					data.next_vote_id += 1;
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", $scope.item_type + " voted!", 10000]);
								$scope.getVotes($scope.item);
							});
						});
					});
				});
			};

			// change vote
			$scope.changeVote = function(cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					data = JSON.parse(data);
					var voteIndex;
					var changedVote;
					data.votes.forEach(function(vote,index){
						if (vote.vote_id === $scope.user_item_vote.vote_id){
							voteIndex = index;
							changedVote = vote;
						}
					});
					data.votes.splice(voteIndex,1);
					if (changedVote.vote_type === 'up') { changedVote.vote_type = 'down'}
					else if (changedVote.vote_type === 'down') {changedVote.vote_type = 'up'}
					data.votes.push(changedVote);
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "vote deleted!", 10000]);
								$scope.getVotes($scope.item);
							});
						});
					});
				});
			};

			// delete vote
			$scope.deleteVote = function(cluster_id){
				// inner path to user's json files
				var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + cluster_id + '/data/users/' + $scope.page.site_info.auth_address + '/data.json';
				// get data.json
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					data = JSON.parse(data);
					var voteIndex;
					data.votes.forEach(function(vote,index){
						if (vote.vote_id === $scope.user_item_vote.vote_id){
							voteIndex = index;
						}
					});
					data.votes.splice(voteIndex,1);
					// update data.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						console.log(res);
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							console.log(res);
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "vote deleted!", 10000]);
								$scope.getVotes($scope.item);
							});
						});
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