var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-misc-d",
	title: "misc d"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-broke-in-coffee",
	title: "broke in coffee"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-s-storm",
	title: "s storm"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-pines",
	title: "pines"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-boring-drone",
	title: "boring drone"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-messing-around",
	title: "messing around"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-bottles",
	title: "bottles"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-leaving-night-park",
	title: "leaving night park"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-morning-birds",
	title: "morning birds"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
