// LOAD THE VIDEO REGARDLESS IF THE USER IS USING IPFS

$.ajax({
	url: 'http://localhost:5001/ipfs/QmU3o9bvfenhTKhxUakbYrLDnZU7HezAVxPM6Ehjw9Xjqy/',
	success: function() {
			VideoJS.setupAllWhenReady();
},
	error: function(e) {
			document.getElementById("videoPostContent").innerHTML = document.getElementById("videoPostContent").innerHTML.replace('http://localhost:8080', 'https://ipfs.io');
			VideoJS.setupAllWhenReady();
			// document.getElementById("videoPostContent").innerHTML = '<div style="margin: 20px; padding: 10px; color: #fff; background: #ff4444; font-family: Helvetica, sanserif;">Your system doesn\'t seem to be running IPFS. But that\'s ok. <a style="color:#fff;font-weight:bold" href="https://ipfs.io/">You can get IPFS here</a>. It\'s free.</div>';
	}
});