var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-taking-out-the-trash",
	title: "taking out the trash"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-nostalgic-fugue",
	title: "nostalgic fugue"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-trio-improvisations-i-lead",
	title: "trio improvisations i - lead"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-trio-improvisations-ii-bass",
	title: "trio improvisations ii - bass"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-trio-improvisations-iii-drums",
	title: "trio improvisations iii - drums"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-requiem-for-a-broken-chair",
	title: "requiem for a broken chair"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-weird-canon",
	title: "weird canon"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-chromatic-journey",
	title: "chromatic journey"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-music-box-the-end",
	title: "music box - the end"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
