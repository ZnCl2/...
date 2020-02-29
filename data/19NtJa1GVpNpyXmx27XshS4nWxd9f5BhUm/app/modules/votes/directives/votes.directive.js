angular.module('ngZeroBlog').directive('votes', [
	function() {

		var controller = function($scope,$element) {


			// get post votes
			$scope.getPostVotes = function(){
				var query = "SELECT * FROM post_vote WHERE post_id = "+$scope.post.post_id+" ORDER BY date_added";
				Page.cmd("dbQuery", [query],function(votes) {
					if (votes.length > 0){
						votes.forEach(function(vote,index){
							if (vote.user_id === $scope.user){
								$scope.post.voted = true;
							}
						});
						$scope.post.votes = votes
						$scope.$apply();
					}
				});
			};


			// like
			$scope.likePost = function(post){
				if (post.voted === true) {
					var postVoteId;
					post.votes.forEach(function(vote,index){
						if (vote.user_id === $scope.user){
							postVoteId = vote.post_vote_id;
						}
					});
					$scope.deleteVote(postVoteId);
				} else if (post.voted === false) {
					$scope.createVote($scope.post);
				}
			};


			// delete category
			$scope.deleteVote = function(postVoteId){
				// inner path
				var inner_path = "data/users/"+Page.site_info.auth_address+"/post_vote.json";

				// get file
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
   	
					data = JSON.parse(data); 
		        	var voteIndex;
		        	data.post_vote.forEach(function(pv,index){
		        		if (pv.post_vote_id === postVoteId)
		        		voteIndex = index;
		        	});

		        	data.post_vote.splice(voteIndex,1);
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) { 

						Page.cmd("wrapperNotification", ["done", "Post unliked!", 10000]);
						$scope.post.votes.splice(voteIndex,1);
						$scope.post.votes.length -= 1;
						$scope.post.voted = false;
						$scope.$apply();
					
					});
			    
			    });				
			};

			// get posts
			$scope.createVote = function(post){

				// check user account
				if (!Page.site_info.cert_user_id) {
					Page.cmd("wrapperNotification", ["info", "Please, select your account."]);
					$scope.selectUser();
					return false;
				}

				// inner path
				var inner_path = "data/users/"+Page.site_info.auth_address+"/post_vote.json";

				// get file
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {

					if (data) { data = JSON.parse(data); } 
					else { data = { "next_id":1,"post_vote": [] }; }

			    	// new vote
					var post_vote = {
						"post_vote_id":data.next_id,
						"post_id":post.post_id,
						"user_id":Page.site_info.cert_user_id,
						"vote":1,
						"date_added": +(new Date)
					};

					// next item id
					data.next_id += 1;

					data.post_vote.push(post_vote);
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) { 

						Page.cmd("wrapperNotification", ["done", "Post liked!", 10000]);
						if (!post.votes)$scope.post.votes = [];
						$scope.post.votes.push(post_vote);
						$scope.post.voted = true;
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