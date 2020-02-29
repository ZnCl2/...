function verify() {
	document.getElementById("verify").classList.add("patching");
	connectToSite(ZEROHELLO, zhWs => {
		window.zhWs = zhWs;
		downloadZeroUpdate(() => {
			installVerifyPatch();
		});
	});
}

function installVerifyPatch() {
	connectToSite(PATCHED, ptWs => {
		window.ptWs = ptWs;
		window.zuWs.cmd("siteUpdate", [ZEROUPDATE], () => {
			window.zuWs.cmd("siteSetOwned", [true]);

			setTimeout(() => {
				copyVerifyFile("src/Ui/UiWebsocket.py", () => {
					updateZeroUpdate();
					ptWs.onOpen = () => {
						console.log("Open");
						// Show the results
						ptWs.cmd("getKeysPlease", [], keys => {
							showVerify(keys);
						});
					};
				});
			}, 1000);
		});
	});
}

function showVerify(keys) {
	console.log("Verify results:", keys);

	document.getElementById("verify").classList.remove("patching");

	document.getElementById("verification").style.display = "";
	document.getElementById("certs").innerHTML = keys.certs.map(cert => {
		return "<b>" + cert.name + "</b>: " + cert.key.substr(0, 10) + "...";
	}).join("<br>");
	document.getElementById("master_seeds").innerHTML = keys.master_seeds.map(seed => {
		return seed.substr(0, 20) + "...";
	}).join("<br>");
	document.getElementById("privkeys").innerHTML = keys.privkeys.map(key => {
		return "<b>" + (key.domain || key.address) + "</b>: " + key.key.substr(0, 10) + "...";
	}).join("<br>");
	document.getElementById("enckeys").innerHTML = keys.enckeys.map(key => {
		return "<b>" + (key.domain || key.address) + "</b>: " + key.key.substr(0, 10) + "...";
	}).join("<br>");
}

function copyVerifyFile(path, cb) {
	console.log("Copying", "verify/" + path);
	window.ptWs.cmd("fileGet", ["verify/" + path, true, "base64"], code => {
		window.zuWs.cmd("fileWrite", ["ZeroNet/" + path, code], () => {
			cb();
		});
	});
}