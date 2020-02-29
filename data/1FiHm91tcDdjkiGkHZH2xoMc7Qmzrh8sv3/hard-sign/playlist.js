var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-sea-alarm",
	title: "sea alarm"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-undernoises",
	title: "undernoises"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-dn",
	title: "dn"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-break-the-bottle-and-then-what",
	title: "break the bottle and then what"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-broken-mic",
	title: "broken mic"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-not-a-metronome",
	title: "not a metronome"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-repeat-and-annoy",
	title: "repeat and annoy"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-more-than-a-year",
	title: "more than a year"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-just-a-plan",
	title: "just a plan"
    },
    {
	id: "track-010",
	next: "track-011",
	fname: "010-will-it-take-off",
	title: "will it take off"
    },
    {
	id: "track-011",
	next: "track-012",
	fname: "011-plate",
	title: "plate"
    },
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
