var playlist = [
    {
	id: "track-001",
	next: "track-002",
	fname: "001-like-a-yesterday-rain",
	title: "like a yesterday rain"
    },
    {
	id: "track-002",
	next: "track-003",
	fname: "002-slow-and-selfish",
	title: "slow and selfish"
    },
    {
	id: "track-003",
	next: "track-004",
	fname: "003-bigger-picture",
	title: "bigger picture"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
