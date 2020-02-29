var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-awakening-of",
	title: "awakening of"
    },{
	id: "track-002",
	next: "track-003",
	fname: "002-invasion-into-a-silent-place",
	title: "invasion into a silent place"
    },{
	id: "track-003",
	next: "track-004",
	fname: "003-two-sides",
	title: "two sides"
    },{
	id: "track-004",
	next: "track-005",
	fname: "004-do-it-again",
	title: "do it again"
    },{
	id: "track-005",
	next: "track-006",
	fname: "005-organ-punk",
	title: "organ punk"
    },{
	id: "track-006",
	next: "track-007",
	fname: "006-slow-fun",
	title: "slow fun"
    },{
	id: "track-007",
	next: "track-008",
	fname: "007-magical-swing",
	title: "magical swing"
    },{
	id: "track-008",
	next: "track-009",
	fname: "008-into-the-desert",
	title: "into the desert"
    },{
	id: "track-009",
	next: "track-010",
	fname: "009-tbb-in-b-dim",
	title: "tbb in b dim"
    },{
	id: "track-010",
	next: "track-011",
	fname: "010-troll-overdose",
	title: "troll overdose"
    },{
	id: "track-011",
	next: "track-012",
	fname: "011-they-came-to-you",
	title: "they came to you"
    },{
	id: "track-012",
	next: "track-013",
	fname: "012-end-of-night",
	title: "end of night"
    },{
	id: "track-013",
	next: "track-014",
	fname: "013-awakening-of-solo-organ",
	title: "awakening of solo organ"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
