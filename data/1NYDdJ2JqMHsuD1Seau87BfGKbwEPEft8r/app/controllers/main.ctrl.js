app.controller('MainCtrl', ['$scope','$rootScope','$location','$window','Cluster','User','Post',
	function($scope,$rootScope,$location,$window,Cluster,User,Post) {

		// init site
		$scope.init = function(){
			$scope.loading_site = true;			
			// get server info
			Page.cmd("serverInfo",{},function(server_info){
				// apply server info to page obj
				Page.server_info = server_info;
				// get site info
				Page.cmd("siteInfo",{},function(site_info){
					// apply site info to page obj
					Page.site_info = site_info;
					// get feed list follow
  					Page.cmd("feedListFollow", [], function(feed) {
						// apply feed info to page obj
						Page.feed = feed;
						// attach to scope
						$scope.page = Page;
						// apply to scope
						Page.cmd("siteList", {}, function(sites) {
							$scope.$apply(function(){
								// apply sites to scope
								$scope.u_sites = sites;
								// route view
								$scope.getConfig();								
							});
						});
					});
				});
			});
		};

		// get config
		$scope.getConfig = function(){
			Page.cmd("fileGet",{"inner_path":"content/config.json"},function(config) {
				// apply config
				$scope.config = JSON.parse(config);
				// apply clusters
				$scope.clusters = $scope.config.clusters;
				// apply to scope
				$scope.$apply(function() {
					// get merger permission
					$scope.getMergerPermission();
				});
			})
		};

		// get merger site permission
		$scope.getMergerPermission = function(){
			// if user allready has permission for merger type
	    	if (Page.site_info.settings.permissions.indexOf("Merger:"+$scope.page.site_info.content.merger_name) > -1){
    			// get merged sites
    			$scope.getAdminPermission();
	    	} else {
	    		// if not, ask user for permission
				Page.cmd("wrapperPermissionAdd", "Merger:"+$scope.page.site_info.content.merger_name, function() {
	    			// get merged sites
	    			$scope.getAdminPermission();
				});
	    	}
		};

		// get admin permission
		$scope.getAdminPermission = function(){
			// request admin permission
	    	if (Page.site_info.settings.permissions.indexOf("ADMIN") > -1){
    			// get merged sites
    			$scope.getMergerSites();
	    	} else {
	    		// if not, ask user for permission
				Page.cmd("wrapperPermissionAdd", "ADMIN", function() {
	    			// get merged sites
	    			$scope.getMergerSites();
				});
	    	}
		};

		// get merged sites
		$scope.getMergerSites = function(){
			Page.cmd("mergerSiteList", {query_site_info: true}, function(sites) {
				$scope.$apply(function(){
					// for each site in merger site list
					for (var site in sites) {
						if (!$scope.sites) {
						 $scope.sites = [];
						 $scope.sites_id = [];	
						}
						$scope.sites.push(sites[site]);
						$scope.sites_id.push(site);
					}
					$scope.getClusters();
				});
			});	
		};

	    // get clusters
	    $scope.getClusters = function(){
			// loading
			$scope.cl_id = [];
			$scope.clusters.forEach(function(cl,index){
				$scope.cl_id.push(cl.cluster_id);
			});
			$scope.clIndex = 0;
			$scope.varifyClusters();
	    };

	    // varify cluster
	    $scope.varifyClusters = function(){
	    	if ($scope.clIndex < $scope.clusters.length){
	    		if ($scope.sites){
					if ($scope.sites_id.indexOf($scope.clusters[$scope.clIndex].cluster_id) > -1){
						// get optional file list
						Page.cmd("optionalFileList", { address: $scope.clusters[$scope.clIndex].cluster_id, limit:2000 }, function(site_files){
							$scope.$apply(function(){
								if (!$scope.site_files) $scope.site_files = [];
								$scope.site_files = $scope.site_files.concat(site_files);
								$scope.clusters[$scope.clIndex] = Cluster.findClusterInMergerSiteList($scope.clusters[$scope.clIndex],$scope.sites);						
								$scope.clusters[$scope.clIndex].files = site_files;
								$scope.clIndex += 1;
								$scope.varifyClusters();
							});
						});
					} else {
						console.log('cluster '+$scope.clusters[$scope.clIndex].cluster_id+' doesnt exist!');
						$scope.addCluster();
					}
	    		} else {
					console.log('no merged sites!');
	    			$scope.addCluster();
	    		}
	    	} else {
				$scope.routeView();
	    	}
	    };

	    // add cluster to merger sites
	    $scope.addCluster = function() {
			Page.cmd("mergerSiteAdd",{"addresses":$scope.cl_id},function(data){
				Page.cmd("wrapperNotification", ["info", "refresh this site to view new content", 10000]);
			});
	    };

		// route view
		$scope.routeView = function(){
			var path = $location.$$absUrl.split($scope.page.site_info.address + '/')[1];
			if (path.indexOf('&wrapper') > -1){
				path = path.split('&wrapper')[0].split('?')[1].split('view:')[1];
				if (path.indexOf('+') > -1){
					$scope.view = path.split('+')[0];
					$scope.path = path.split($scope.view + '+')[1];
				} else {
					$scope.view = path;
				}
			} else {
				$scope.view = 'main';
			}

			if ($scope.view === 'account' || $scope.view === 'content' || $scope.view === 'new'){
				$scope.section = $scope.path.split('=')[1];
			} else if ($scope.view === 'category'){
				$scope.categoryId = $scope.path.split('=')[1];
			} else if ($scope.view === 'edit'){
				$scope.section =  $scope.path.split('=')[1].split('+')[0];
				$scope.itemId = $scope.path.split('=')[2];
			}

			if ($scope.path && $scope.path.indexOf('keyword') > -1){
				$scope.keyword = $scope.path.split('=')[1];
			}

			console.log('view - ' + $scope.view);
			if ($scope.section) console.log('section - ' + $scope.section);
			if ($scope.categoryId) console.log('category id - ' + $scope.categoryId);
			if ($scope.itemId) console.log('item id - ' + $scope.itemId);
			if ($scope.keyword) console.log('keyword - ' + $scope.keyword);
			$scope.finishLoadingSite();
		};

		// finish loading site
		$scope.finishLoadingSite = function(){			
			$scope.loading_site = false;
		};

	    // update content json
	    $scope.updateContentJson = function(){
			// get content.json
			var inner_path = 'merged-'+$scope.page.site_info.content.merger_name + '/' + $scope.config.cluster + '/data/users/' + $scope.page.site_info.auth_address + '/content.json';
			Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(content_json) {
				content_json = JSON.parse(content_json);
				if (content_json) {
					content_json.optional = ".*(.gif|.jpeg|.jpg|.png)";
					// update content.json
					var json_raw = unescape(encodeURIComponent(JSON.stringify(content_json, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {

						});
					});
				}
			});
	    };

	    // select user
	    $scope.selectUser = function(){
	    	Page.selectUser();
			Page.onRequest = function(cmd, message) {
			    if (cmd == "setSiteInfo") {
					// site info
					$scope.page.site_info.auth_address = message.auth_address;
					$scope.page.site_info.cert_user_id = message.cert_user_id;
					// broadcast
					$rootScope.$broadcast('newUserSelected',$scope.page);
					// update site
					$scope.$apply();
				}
			};
	    };

    	// create certificate
    	$scope.createCertificate = function(argument) {
	    	var name = User.generateRandomString(13);
	        var certname = "znc.anonymous";
	        var genkey = "5Jzm9kt4vTjSGVRdo9pS5WqhzrR3UmAXJ6uwyvDUEup2A8ntd69";
    		var genid =  bitcoin.ECPair.fromWIF(genkey);
			var cert = bitcoin.message.sign(genid, ($scope.page.site_info.auth_address + "#web/") + name.slice(0,13)).toString("base64");
			Page.cmd("certAdd", [certname, "web", name, cert], function(res){
				$scope.selectUser();
			});
    	}

	}
]);