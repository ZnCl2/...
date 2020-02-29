var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-bottles",
	title: "bottles"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-under-the-bed",
	title: "under the bed"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-screeching",
	title: "screeching"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-bath-exists",
	title: "bath exists"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-sticky-freight-train",
	title: "sticky freight train"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-summer-steps",
	title: "summer steps"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-another-view-of-kitchen",
	title: "another view of kitchen"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-sharping-knife",
	title: "sharping knife"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-rhythm-of-tubes",
	title: "rhythm of tubes"
    },
    {
	id: "track-010",
	next: "track-011",
	fname: "010-abstracting-away",
	title: "abstracting away"
    },
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
