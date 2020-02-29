var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-waking-up-in-a-strange-place",
	title: "waking up in a strange place"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-slightly-nervous",
	title: "slightly nervous"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-disconnect",
	title: "disconnect"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-again-in-the-room",
	title: "again in the room"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
