var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-reading-in-cafe",
	title: "reading in cafe"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-idling-on-a-bench",
	title: "idling on a bench"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
