client = new WebTorrent()

// https://github.com/mikolalysenko/drag-and-drop-files

function handleDrop(callback, event) {
	event.stopPropagation()
	event.preventDefault()
	callback(Array.prototype.slice.call(event.dataTransfer.files))
}

function killEvent(e) {
	e.stopPropagation()
	e.preventDefault()
	return false
}

function addDragDropListener(element, callback) {
	element.addEventListener("dragenter", killEvent, false)
	element.addEventListener("dragover", killEvent, false)
	element.addEventListener("drop", handleDrop.bind(undefined, callback), false)
}

addDragDropListener(document, function (files) {
	if (torrentId) {
		// If something is already streaming, do not allow drag and drop seeding. Only seed the file currently being streamed (for UX and ease-of-use reasons. If something different is being seeded while something is being streamed, the UI elements for pausing the currently streaming item disappear and potentially cause confusion.)
	} else {
		// Seed the files that were dragged and dropped onto the page
		client.seed(files, function (torrent){
			console.log('Client is seeding ' + torrent.infoHash);
			$track.innerHTML = '<li id=\"track\" style=\"color: #000;\">We\'re now seeding it, please don\'t close this page.</li><li id=\"track\" style=\"color: #000;\">Your infoHash is: ' + torrent.infoHash + '</li><li id=\"track\" style=\"color: #000;\"><a target=\"_blank\" href=\"' + window.location + '?ID=' + torrent.infoHash + '\">Share link</a></li>';
			// Autoplay checkbox, doesn't hook into the share link yet.
			//$track.innerHTML += '<li id=\"track\" style=\"color: #000;\"><input name="shareLinkAutoplay" type="checkbox" checked>Autoplay</input> </li>';
			$filename.innerHTML = 'NinjaBeats uploader v2.3';
			document.title = 'NinjaBeats uploader v2.3';
		});
	};
});