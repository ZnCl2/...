(function() {
var emulator; // assume one global emulator (not the cleanest way, but it's a demo)

window.addEventListener("load", loadRom);
romselector.addEventListener("change", loadRom);

/**
 * Pause emulator when clicking on canvas.
 */
nesnes.addEventListener("click", function() {
	if ( emulator ) {
		emulator.toggle();

		nesnes.classList.toggle("paused", emulator.paused);
	}
});

/**
 * Load the currently selected ROM.
 */
function loadRom() {
	if ( !emulator ) {
		emulator = new NesNes(nesnes);
	}

	var romPath = "./assets/roms/" + romselector.value + ".nes";
	emulator.load(romPath, true);
}
}());