// check for missing media files and warn to download

$(function() {

	$.ajax({
		url: 'http://localhost:5001/ipfs/QmU3o9bvfenhTKhxUakbYrLDnZU7HezAVxPM6Ehjw9Xjqy/',
		success: function() {},
		error: function(e) {
				    document.getElementById("info").innerHTML = '<div style="margin: 20px; padding: 10px; color: #fff; background: #ff4444; font-family: Helvetica, sanserif;">Your system doesn\'t seem to be running IPFS. But that\'s ok. <a style="color:#fff;font-weight:bold" href="https://ipfs.io/">You can get IPFS here</a>. It\'s free.</div>';
		}
	});

});