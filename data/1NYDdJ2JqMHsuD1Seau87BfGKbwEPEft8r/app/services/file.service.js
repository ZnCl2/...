app.factory('File', [
	function() {
		var File = {};

		// render file object on read
		File.renderFileObjectOnRead = function(data,file){
			// file name
			var file_name = file.name.split(' ').join('_').normalize('NFKD').replace(/[\u0300-\u036F]/g, '').replace(/ß/g,"ss");
			// get file type
			var splitByLastDot = function(text) {
			    var index = text.lastIndexOf('.');
			    return [text.slice(0, index), text.slice(index + 1)]
			}
			// file object
			var f = {
				data_uri:data,
				file_type:splitByLastDot(file.name)[1],
				name:file_name
			};
			return f;
		};

		// get file's item id
		File.getFilesItemId = function(data,item_type,userId){
			var item_id;
			if (data['next_'+item_type+'_id']){
				item_id = userId + '_' + item_type + '_' + data['next_'+item_type+'_id'];
			} else {
				item_id = userId + '_' + item_type + '_1';				
			}
			return item_id;
		};

		return File;
	}
]);