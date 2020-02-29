var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-construct",
	title: "construct"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-destruct",
	title: "destruct"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
