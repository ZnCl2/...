window._zeroFrame = new ZeroFrame();
window._zeroPage = new ZeroPage(_zeroFrame);
window._zeroFS = new ZeroFS(_zeroPage);
window._includes = new Includes(document.getElementById("main_container"), _zeroPage);
window._router = new Router(_zeroPage);
window._zeroAuth = new ZeroAuth(_zeroPage);
window._zeroDB = new ZeroDB(_zeroPage);

window._isAdmin = _zeroPage.isSignable("data/content.json");

_includes.on("loaded", () => {
	document.getElementById("loading_cover").style.display = "none";
});