app.factory('Post', [
	function() {
		
		var Post = {};

		// generate post list query
		Post.generatePostListQuery = function(category,sortVal,section,userId,keyword){
			var q = "SELECT p.*, c.*, f.*, u.*, ufv.*"
			q += ", (SELECT count(*) FROM comments AS cm WHERE cm.comment_item_id=p.post_id) as comments_total";			
			q += ", (SELECT count(*) FROM favorites AS fv WHERE fv.favorite_item_id=p.post_id) as favorites_total";			
			q += ", (SELECT count(*) FROM votes AS vt WHERE vt.vote_item_id=p.post_id AND vt.vote_type='up') as votes_up_total";
			q += ", (SELECT count(*) FROM votes AS vt WHERE vt.vote_item_id=p.post_id AND vt.vote_type='down') as votes_down_total";
			q += " FROM posts AS p";
			q += " LEFT JOIN categories AS c ON p.post_category=c.category_id";
			q += " LEFT JOIN files AS f ON f.item_id=p.post_id";
			q += " LEFT JOIN users AS u ON u.user_id=p.post_user_id";
			q += " LEFT JOIN favorites AS ufv ON ufv.favorite_item_id=p.post_id AND ufv.favorite_user_id='"+userId+"'";
			// when sorting by total votes
			if (sortVal === 'v.diff desc, p.post_id') q += " LEFT JOIN ( SELECT vote_item_id, sum(case when vote_type = 'up' then 1 else 0 end) - sum(case when vote_type = 'down' then 1 else 0 end) diff FROM votes GROUP BY vote_item_id ) v on p.post_id = v.vote_item_id";
			q += " WHERE p.post_id IS NOT NULL";
			if (category){
				q += " AND p.post_category='"+category.category_id+"'";
			}
			if (section === 'favorites'){
				q += " AND ufv.favorite_user_id='"+userId+"'";
			} else if (section === 'posts'){
				q += " AND p.post_user_id='"+userId+"'";
			}
			if (keyword){
				q += " AND p.post_title LIKE '%"+keyword+"%' OR p.post_description LIKE '%"+keyword+"%'";
			}
			q += " ORDER BY "+sortVal;
			return q;
		};

		//  generate get post query
		Post.generateGetPostQuery = function(postId){
			var q = "SELECT p.*, c.*, f.*, u.*";
			q += ", (SELECT count(*) FROM comments AS cm WHERE cm.comment_item_id=p.post_id) as comments_total";			
			q += ", (SELECT count(*) FROM favorites AS fv WHERE fv.favorite_item_id=p.post_id) as favorites_total";			
			q += ", (SELECT count(*) FROM votes AS vt WHERE vt.vote_item_id=p.post_id AND vt.vote_type='up') as votes_up_total";
			q += ", (SELECT count(*) FROM votes AS vt WHERE vt.vote_item_id=p.post_id AND vt.vote_type='down') as votes_down_total";			
			q += " FROM posts AS p";
			q += " LEFT JOIN categories AS c ON p.post_category=c.category_id";
			q += " LEFT JOIN files AS f ON f.item_id=p.post_id";
			q += " LEFT JOIN users AS u ON u.user_id=p.post_user_id";
			q += " WHERE p.post_id='"+postId+"'";
			return q;
		};
		
		// render post with sites
		Post.renderPostWithSites = function(posts,sites){
			posts.forEach(function(post,pIndex){
				post.peers = 0;
				sites.forEach(function(site,sIndex){
					if (site.address === post.post_url.split('43110/')[1] && post.category_title !== 'proxy'){
						post.peers = site.peers
						post.site = site;
					}
				});
			});
			return posts;
		};

		// find non catalog sites 
		Post.findNonCatalogSites = function(posts,sites){
			var non_user_sites = [];
			sites.forEach(function(site,sIndex){
				site.exists = false;
				posts.forEach(function(post,pIndex){
					if (site.address === post.post_url.split('43110/')[1] && post.category_title !== 'proxy' ||
						site.address === post.post_url && post.category_title !== 'proxy'){
						site.exists = true
					}
				});
				if (!site.exists){
					non_user_sites.push(site);
				}
			});
			return non_user_sites;
		};

		// render post url
		Post.renderPostUrl = function(post,location,address){
			if (post.category_title !== 'proxy'){
				// 1. get base url of host
				var base_url = location.$$absUrl.split(address)[0];
				var post_url = post.post_url;
				if (post_url.indexOf('/') > -1){
					var pieces = post_url.split('/');
					console.log(pieces);
					post_url = pieces[pieces.length - 1];
					if (post_url.length === 0) post_url = pieces[pieces.length -2];
				}
				post.post_full_url = base_url + post_url;
				post.post_url = post_url;
			} else {
				post.post_full_url = post.post_url;
			}
			return post;
		};

		return Post;
	}
]);