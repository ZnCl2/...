var playlist = [
    {
	id: "i-cannot-stand-this-anymore",
	next: "nothing",
	fname: "i-cannot-stand-this-anymore",
	title: "i cannot stand this anymore"
    },
    {
	id: "unfunny-jokes-king",
	next: "nothing",
	fname: "unfunny-jokes-king",
	title: "unfunny jokes' king"
    },
    {
	id: "variation-on-a-theme-ost-a",
	next: "nothing",
	fname: "voat-ost-a",
	title: "variation on a theme ost a (wip)"
    },
    {
	id: "collage-a",
	next: "nothing",
	fname: "collage-a-2",
	title: "sonic collage a (wip)"
    },
    {
	id: "broken-piano",
	next: "nothing",
	fname: "broken-piano",
	title: "broken piano"
    },
    {
	id: "tryad-cn",
	next: "nothing",
	fname: "tryad-cn",
	title: "tryad meets complex numbers (beta)"
    },
    {
	id: "slow-untitled",
	next: "nothing",
	fname: "not-pigeons",
	title: "slow untitled 1"
    },
    {
	id: "nois-tar-x",
	next: "nothing",
	fname: "depra",
	title: "nois tar x"
    },
    {
	id: "no-energy",
	next: "nothing",
	fname: "no-energy",
	title: "no energy (beta)"
    },
    {
	id: "broken-piano-2",
	next: "nothing",
	fname: "broken-piano-2",
	title: "broken piano 2"
    },
    {
	id: "drill",
	next: "nothing",
	fname: "drill",
	title: "drill"
    },
    {
	id: "tru-1",
	next: "nothing",
	fname: "something-trumpet-1",
	title: "trumpet impro 1"
    },
    {
	id: "nois-tar-ki",
	next: "nothing",
	fname: "nois-tar-ki",
	title: "nois tar ki"
    },
    {
	id: "broken-piano-3",
	next: "nothing",
	fname: "broken-piano-3",
	title: "broken piano 3"
    },
    {
	id: "eyes-glow",
	next: "nothing",
	fname: "eyes-glow-through-static",
	title: "eyes glow through static"
    },
    {
	id: "moonless-dog",
	next: "nothing",
	fname: "moonless-dog",
	title: "on a moonless night a dog barks to where the moon should be"
    },
    {
	id: "gbt",
	next: "nothing",
	fname: "gbt",
	title: "gbt (working title)"
    },
    {
	id: "microt",
	next: "nothing",
	fname: "microt",
	title: "microt (working title)"
    },
    {
        id: "ki-nerv",
	next: "nothing",
	fname: "ki-nerv",
	title: "ki-nerv (working title)"
    }
];

function loadFlac() {
    loadPlayList(playlist, "flac", "flac");
}

function loadVorbis() {
    loadPlayList(playlist, "vorbis", "ogg");
}
