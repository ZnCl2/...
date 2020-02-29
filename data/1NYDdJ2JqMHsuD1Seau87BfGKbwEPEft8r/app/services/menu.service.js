app.factory('Menu', [
	function() {
		var Menu = {};

		// get main menu
		Menu.getTopMenu = function(){

			// top array
			var m = [{
				label:'New',
				url:'index.html?view:new'
			},{
				label:'Help',
				url:'index.html?view:content+section=help'
			}];

			return m;
		};


		// get main menu
		Menu.getPostCacheMenu = function(){

			// top array
			var m = [{
				label:'all',
				state:'active'
			},{
				label:'cached',
				state:''
			},{
				label:'non-cached',
				state:''
			},{
				label:'proxy',
				state:''
			},{
				label:'favorited',
				state:''
			}];

			return m;
		};

		// get sort options menu
		Menu.getSortOptionsMenu = function(){

			// top array
			var m = [{
				label:'latest',
				value:'-p.post_date_added'
			},{
				label:'most commented',
				value:'-comments_total'
			},{
				label:'top voted',
				value:'v.diff desc, p.post_id'
			},{
				label:'most favorited',
				value:'-favorites_total'
			},{
				label:'peers',
				value:'-peers'
			}];

			return m;
		};

		return Menu;
	}
]);