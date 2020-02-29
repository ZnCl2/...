var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-gray-winter-morning-in-a-big-city",
	title: "gray winter morning in a big city"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-count-misfortune",
	title: "count misfortune"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-smoke-in-the-night",
	title: "smoke in the night"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-drilling-earth",
	title: "drilling earth"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-march-is-coming",
	title: "march is coming"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-on-a-moonless-night-a-dog-barks-to-where-the-moon-should-be",
	title: "on a moonless night a dog barks to where the moon should be"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-history-museum",
	title: "history museum"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-office-is-not-necessarily-a-boring-place",
	title: "office is not necessarily a boring place"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-stable-and-rocking",
	title: "stable and rocking"
    },
    {
	id: "track-010",
	next: "track-011",
	fname: "010-grand-organ",
	title: "grand organ"
    },
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
