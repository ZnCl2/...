var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-moskva-petushki",
	title: "moskva-petushki"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-take-shower",
	title: "take shower"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-battle-with-the-fence",
	title: "battle with the fence"
    },
    {
	id: "track-004",
	next: "track-005",
	fname: "004-waiting-for-teapot",
	title: "waiting for teapot"
    },
    {
	id: "track-005",
	next: "track-006",
	fname: "005-good-old-fridge",
	title: "good old fridge"
    },
    {
	id: "track-006",
	next: "track-007",
	fname: "006-another-cup-of-coffee-wouldnt-kill-me",
	title: "another cup of coffee (wouldn't kill me)"
    },
    {
	id: "track-007",
	next: "track-008",
	fname: "007-just-a-beginning-of-journey",
	title: "just a beginning of journey"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
