app.factory('Comment', [
	function() {
		var Comment = {};

		Comment.generateGetItemCommentsQuery = function(item,item_type){
			var q = "SELECT c.*, u.*";
			q += " FROM comments AS c";
			q += " LEFT JOIN users AS u ON u.user_id=c.comment_user_id";
			q += " WHERE c.comment_item_id='"+item[item_type+'_id']+"' AND c.comment_item_type='"+item_type+"'";
			q += " ORDER BY -c.comment_date_added";
			return q;
		};

		return Comment;
	}
]);