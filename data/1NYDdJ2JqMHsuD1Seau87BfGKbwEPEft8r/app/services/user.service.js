app.factory('User', [
	function() {
		var User = {};
		// generate get user query
		User.generateGetUserQuery = function(userId){
			var q = "SELECT u.*";
			q += " FROM users AS u";
			q += " WHERE u.user_id='"+userId+"'";
			q += " LIMIT 1";
			return q;
		};
		// generate get user json query
		User.generateGetUserJsonQuery = function(userId){
			var q = "SELECT j.*";
			q += " FROM json AS j";
			q += " WHERE j.directory LIKE '%"+userId+"%'";
			return q;
		};	
		// get user cluster id
		User.getUserClusterId = function(jsons,clusters){
			var cid;
			jsons.forEach(function(json,jIndex){
				clusters.forEach(function(cluster,cIndex){
					if (cluster.cluster_id === json.directory.split('/')[0]){
						cid = json.directory.split('/')[0];
					}
				});
			});
			return cid;
		};

		// generate random strings
		User.generateRandomString = function(numLength){
			function randomString(length, chars) {
			    var result = '';
			    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			    return result;
			}
			var rString = randomString(numLength, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
			return rString;
		};
		
		return User;
	}
]);