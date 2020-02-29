app.factory('Vote', [
	function() {
		var Vote = {};

		// generate Vote list query
		Vote.generateGetPostVotesQuery = function(item,item_type){
			var q = "SELECT v.*";
			q += " FROM votes AS v";
			q += " WHERE v.vote_item_id='"+ item[item_type + '_id'] + "'";
			q += " AND v.vote_item_type='"+ item_type + "'";
			return q;
		};
	
		// item voted by user
		Vote.itemVotedByUser = function(item,userId){
			var uvote;
			if (item.votes_up){
				item.votes_up.forEach(function(vote,index){
					if (vote.vote_user_id === userId){
						uvote = vote;
					}
				});
			}
			if (item.votes_down){
				item.votes_down.forEach(function(vote,index){
					if (vote.vote_user_id === userId){
						uvote = vote;
					}
				});
			}
			return uvote;
		};

		// render item votes
		Vote.renderItemVotes = function(item,votes){
			item.votes_up = [];
			item.votes_down = [];
			votes.forEach(function(vote,index){
				console.log(vote);
				if (vote.vote_type === 'up'){
					item.votes_up.push(vote);
				} else if (vote.vote_type === 'down'){
					item.votes_down.push(vote)
				}
			});
			return item;
		};

		return Vote;
	}
]);