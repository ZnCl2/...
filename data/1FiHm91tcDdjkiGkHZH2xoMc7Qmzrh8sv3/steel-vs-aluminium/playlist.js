var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-steel-vs-aluminium",
	title: "steel vs aluminium"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
