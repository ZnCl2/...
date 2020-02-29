var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-whimsical-waterdrops",
	title: "whimsical waterdrops"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-uncertain-day-after",
	title: "uncertain day after"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-whimsical-light",
	title: "whimsical light"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-shabby",
	title: "shabby"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-shabby-desert",
	title: "shabby desert"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-chess-vagabond",
	title: "chess vagabond"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-technodesert",
	title: "technodesert"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-sad-endspiel",
	title: "sad endspiel"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-chess-drum",
	title: "chess drum"
    },
    {
	id: "track-010",
	next: "track-011",
	fname: "010-smoking-combat",
	title: "smoking combat"
    },
    {
	id: "track-011",
	next: "track-012",
	fname: "011-whimsical-darkness",
	title: "whimsical darkness"
    },
    {
	id: "track-012",
	next: "track-013",
	fname: "012-whimsical-march",
	title: "whimsical march"
    },
    {
	id: "track-013",
	next: "track-014",
	fname: "013-smoking-killed",
	title: "smoking killed"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
