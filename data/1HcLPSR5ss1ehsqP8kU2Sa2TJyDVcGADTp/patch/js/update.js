function update() {
	document.getElementById("update").classList.add("patching");
	connectToSite(ZEROHELLO, zhWs => {
		window.zhWs = zhWs;
		downloadZeroUpdate(() => {
			updateZeroUpdate();
		});
	});
}