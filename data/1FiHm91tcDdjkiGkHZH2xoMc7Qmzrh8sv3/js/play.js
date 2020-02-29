function playEl(id) {
    var el = document.getElementById(id);
    el.currentTime = 0;
    el.play();
}
function muteBut(id) {
    var els = document.getElementsByTagName("audio");
    for (var i = 0; i < els.length; ++i) {
	var el = els[i];
        if (el.id != id) {
            el.pause();
	    el.currentTime = 0;
	}
    }
}
function clearPlayList() {
    var tracks = document.getElementById("tracks");
    while (tracks.firstChild) {
	tracks.removeChild(tracks.firstChild);
    }
}
function loadPlayList(pl, dir, ext) {
    clearPlayList();
    var tracks = document.getElementById("tracks");
    var tmplt = document.getElementsByTagName("template")[0];
    var item = tmplt.content.querySelector("div");
    for (var i = 0; i < pl.length; ++i) {
	let track = pl[i];
	var path = dir+"/"+track.fname+"."+ext;
	var el = document.importNode(item, true);

	var audio = el.getElementsByTagName("audio")[0];
	audio.id = track.id;
	audio.getElementsByTagName("source")[0].src = path;
	audio.addEventListener("play",
			       function() { muteBut(track.id) });
	audio.addEventListener("ended",
			       function() { playEl(track.next) });
	var trackName = el.getElementsByClassName("track-name")[0];
	trackName.innerHTML = track.title;
	tracks.appendChild(el);
    }
}
