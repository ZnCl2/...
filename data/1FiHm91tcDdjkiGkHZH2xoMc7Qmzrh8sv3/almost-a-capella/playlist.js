var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-almost-a-capella-is",
	title: "almost a capella is"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-we-make-noise",
	title: "we make noise"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-typing-on-the-mountain",
	title: "typing on the mountain"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-varganing-comments",
	title: "varganing / comments"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-there-is-nothing-i-want",
	title: "there is nothing i want to say / a capella"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-tired-man-ambience",
	title: "tired man / ambience"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-varganing-on-the-noise",
	title: "varganing on the noise / communication"
    },
    {
	id: "track-008",
	next: "track-009",
	fname: "008-if-you-consider-whistling",
	title: "if you consider / whistling"
    },
    {
	id: "track-009",
	next: "track-010",
	fname: "009-maybe-sometimes-i-have",
	title: "maybe sometimes / i have little idea / ambience"
    },
    {
	id: "track-010",
	next: "track-011",
	fname: "010-socialize",
	title: "socialize"
    },
    {
	id: "track-011",
	next: "track-012",
	fname: "011-nicely-digital",
	title: "nicely digital"
    },
    {
	id: "track-012",
	next: "track-013",
	fname: "012-end-asterisk",
	title: "end / asterisk"
    },
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
