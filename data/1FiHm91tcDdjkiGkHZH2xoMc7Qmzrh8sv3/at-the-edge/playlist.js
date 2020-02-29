var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-intro",
	title: "intro"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-the-future-was-changed",
	title: "the future was changed"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-through",
	title: "through"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-bells-underground",
	title: "bells underground"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-the-sudden-end",
	title: "the sudden end"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-inside-the-loop",
	title: "inside the loop"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-broken-piano",
	title: "broken piano"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-does-it-really-matter",
	title: "does it really matter"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-silence",
	title: "silence"
    },
    {
	id: "track-010",
	next: "track-011",
	fname: "010-this-is-all",
	title: "this is all"
    },
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
