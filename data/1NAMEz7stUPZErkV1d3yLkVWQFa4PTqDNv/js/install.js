let si;

function install() {
	if(!si.plugins_rev || si.rev < 4191) {
		if(si.rev < 4000) {
			zf.cmd("wrapperNotification", ["error", "Your ZeroNet is outdated, please reinstall from zeronet.io"]);
		} else {
			zf.cmd("wrapperNotification", ["error", "Please update ZeroNet to (at least) v0.7.0, rev4191"]);
		}
	} else if(!si.plugins_rev.NameYo) {
		zf.cmd("pluginAddRequest", ["plugins/NameYo"]);
	} else if(si.plugins_rev.NameYo < 6) {
		zf.cmd("wrapperNotification", ["info", `Please update Name.YO plugin via <b>ZeroNet Plugin Manager</b><br><small>(${location.protocol}//${location.host}/Plugins/)</small>`]);
	} else {
		zf.cmd("wrapperNotification", ["info", "You have already activated Name.YO!"])
	}
}

(async () => {
	si = await zf.cmdp("serverInfo");
	if(si.rev >= 4191 && si.plugins_rev && si.plugins_rev.NameYo && si.plugins_rev.NameYo >= 6) {
		document.querySelector("#part_install").style.display = "none";
		return;
	}
})();