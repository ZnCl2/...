var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-episodes",
	title: "episodes"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-autumn",
	title: "autumn"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-in-search-for-the-freedom-of-will",
	title: "in search for the freedom of will"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-winter-in-cosmos",
	title: "winter in cosmos"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-nervous-chaos",
	title: "nervous chaos"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-will-the-spring-come",
	title: "will the spring come"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-near-the-rain",
	title: "near the rain"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-questions-without-answers",
	title: "questions without answers"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-time-goes-on",
	title: "time goes on"
    },
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
