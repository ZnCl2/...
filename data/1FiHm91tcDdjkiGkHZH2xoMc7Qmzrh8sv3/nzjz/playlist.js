var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-nzjz",
	title: "nzjz"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
