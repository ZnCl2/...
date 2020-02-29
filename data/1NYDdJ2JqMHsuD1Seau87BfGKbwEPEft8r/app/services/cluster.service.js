app.factory('Cluster', [
	function() {
		var Cluster = {};

		// find cluster in merger sites list
		Cluster.findClusterInMergerSiteList = function(cluster,sites){
			for (var site in sites) {
			    if (sites[site].address === cluster.cluster_id){
			    	for (var attr in sites[site]){
			    		cluster[attr] = sites[site][attr]
			    	}
			    }
			}
			return cluster;
		};

		return Cluster;
	}
]);