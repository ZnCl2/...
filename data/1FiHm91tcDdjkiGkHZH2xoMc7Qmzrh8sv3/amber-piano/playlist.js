var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-amber-piano",
	title: "amber piano"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
