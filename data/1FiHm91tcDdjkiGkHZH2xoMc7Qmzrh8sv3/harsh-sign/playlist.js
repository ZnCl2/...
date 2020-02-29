var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-rolling",
	title: "rolling"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-and-attack",
	title: "..and attack"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-keep-doing",
	title: "keep doing"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-grinding-voice",
	title: "grinding voice"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-nice-bubbles",
	title: "nice bubbles"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-harmony",
	title: "harmony"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-zone-out",
	title: "zone out"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
