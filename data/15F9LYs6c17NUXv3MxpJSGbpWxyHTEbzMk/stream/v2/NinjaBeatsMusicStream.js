// HTML elements
var $body = document.body
var $albumArt = document.querySelector('#albumArt')
var $progressBar = document.querySelector('#progressBar')

var $numPeers = document.querySelector('#numPeers')

var $downloaded = document.querySelector('#downloaded')
var $total = document.querySelector('#total')
var $timeRemaining = document.querySelector('#timeRemaining')
var $timeRemainingGroup = document.querySelector('#timeRemainingGroup')

var $downloadSpeed = document.querySelector('#downloadSpeed')
var $downloadSpeedGroup = document.querySelector('#downloadSpeedGroup')
var $uploadSpeed = document.querySelector('#uploadSpeed')
var $uploadSpeedGroup = document.querySelector('#uploadSpeedGroup')

var $player = document.querySelector('#player')

var $filename = document.querySelector('#filename')
var $track = document.querySelector('#track');

var $loadingMsg = document.querySelector('#loadingMsg');

// URL query elements
var torrentId = getQueryString('audioFile'); // returns the torrent file of the audio to be streamed
var torrentIdShort = getQueryString('audioFileID'); // returns the torrent ID of the audio to be streamed

if (torrentIdShort !== null) {
	var torrentId = 'magnet:?xt=urn:btih:' + torrentIdShort + '&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io' // Convert a torrent ID into a magnet link to a torrent file, and store that in the variable "torrentId".
	
	if (torrentIdShort.length < 40) {
	  $track.innerHTML += '<li id=\"track\" style=\"color: #000;\">The specified audioFileID is invalid. The length of an audioFileID should be 40 characters long. (e.g. like <a href=\"' + window.location + '?audioFileID=e795562093b4044fb0852e26cb0426fc0bd7cbb8\">this</a>)</li>'
    } // Check if the torrent ID is too short, and if so, display a helpful error message to the user

}
console.log(torrentId);

// Check if WebRTC is enabled and notify the user if it is not.
if (WebTorrent.WEBRTC_SUPPORT) {
  // WebRTC is supported
  var client = new WebTorrent()
  } else {
  $player.innerHTML = '<h1 style=\"margin: 1rem; font-weight: 200; font-family: \"Segoe UI\", sans-serif;\">Please enable WebRTC.</h1><p style=\"margin: 0.5rem 1rem;\">This music streamer uses <a href=\"https://webtorrent.io/\">WebTorrent</a> in order to facilitate the streaming of large files from any location (even outside this zite) with automated file splitting and torrent-like functionality.</p><p style=\"margin: 0 1rem;\">If you are concerned about your public IP being leaked and you\'re using Chrome, try <a href=\"https://chrome.google.com/webstore/detail/webrtc-network-limiter/npeicpdbkakmehahjeeohfdhnlpdklia\" alt="WebRTC Network Limiter">this Chrome extension</a> which prevents that and re-enable WebRTC. Alternatively, if you use Firefox, it <a href=\"https://ipfs.pics/QmbBuiNr6mS5E4V8XJXwgwxHXDJFwYKWq6Xf8JHkPejGMq\">does <i>not</i> reliably leak your public IP by default</a>, but we recommend enabling <code>media.peerconnection.ice.default_address_only</code> so that WebRTC on Firefox *always* goes through any proxy, Tor or VPN you have setup, at the cost of much slower streaming speeds (a technical explanation can be found <a href=\"https://wiki.mozilla.org/Media/WebRTC/Privacy\">here</a>).</p>'
  // WebRTC is not supported or disabled
}

// Check if an audio file has been specified. If not, let the user know
if (torrentId == null) {
  $track.innerHTML += '<li id=\"track\" style=\"color: #000;\">Please specify an audioFile or audioFileID in the URL. (e.g. like <a href=\"' + window.location + '?audioFile=magnet:?xt=urn:btih:e795562093b4044fb0852e26cb0426fc0bd7cbb8&dn=cover.jpg&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io\">this</a> or <a href=\"' + window.location + '?audioFileID=e795562093b4044fb0852e26cb0426fc0bd7cbb8\">this</a>)</li>'
}

setTimeout('$loadingMsg.innerHTML = "Waiting for WebTorrent metadata to download, please wait...<br>It appears to be taking longer than usual. It\'s possible nobody is seeding the requested track at the moment."', 10000)

// Download the torrent
client.add(torrentId, function (torrent) {

  // Cycle through each file in the torrent until a compatible image file is found for use as the album art display. If no compatible images are found, skip album art display.
  var trackCount = 0;
  torrent.files.forEach(function(file) {
	  var fileExt = file.name.split('.').pop();
	  //if (file.name == "cover.jpg".toLowerCase() || file.name == "cover.png".toLowerCase() || file.name == "front.jpg".toLowerCase() || file.name == "front.png".toLowerCase() || file.name == "coverart.jpg".toLowerCase() || file.name == "coverart.png".toLowerCase() || file.name == "albumart.jpg".toLowerCase() || file.name == "albumart.png".toLowerCase()) { }
	  if (fileExt == 'jpg' || fileExt == 'png') {
		  file.renderTo('#albumArt'); // render the image as album art
	  } else if (fileExt == 'm4a' || fileExt == 'flac' || fileExt == 'mp3' || fileExt == 'wav' || fileExt == 'ogg' || fileExt == 'oga' || fileExt == 'opus' || fileExt == 'aac' || fileExt == 'm4b' ) {
		  trackCount = trackCount + 1;
		  var trackID = '#track' + trackCount;
		  var filenameText = file.name.split('.').shift().split('-')[1]
		  if (filenameText == undefined) {
			  var filenameText = file.name.split('.').shift()
		  }
		  $filename.innerHTML = '<h2 id="filename">' + filenameText + '</h2>' // Change the player title to the track's filename
		  $track.innerHTML += '<li id=\"track' + trackCount + '\"></li>'
		  file.appendTo('#track' + trackCount, {autoplay: true}); // Add the track to the tracks list
	  } else {
		  $track.innerHTML += '<li id=\"track\" style=\"color: #000;\">An unsupported audio file has been included in the magnet link, but we\'ll try to play it anyway without scrobbing support or controls. We currently only support the following file extensions: png, jpg, m4a, m4b, aac, wav, ogg, oga and opus.</li>'
	  }
  });

  // Trigger statistics refresh
  torrent.on('done', onDone)
  setInterval(onProgress, 500)
  onProgress()

  // Statistics
  function onProgress () {
	
	// Hide the loading message as we have started streaming
    $loadingMsg.style.display = 'none';
	
    // Peers
    $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer is' : ' peers are') + ' seeding this on the NinjaBeats network'

    // Progress
    var percent = Math.round(torrent.progress * 100 * 100) / 100
    $progressBar.style.width = percent + '%'
    $downloaded.innerHTML = 'Downloaded ' + prettyBytes(torrent.downloaded)
    $total.innerHTML = ' of ' + prettyBytes(torrent.length)

    // Remaining time
    var remaining
    if (torrent.done) {
      remaining = 'Done.'
	  $downloaded.innerHTML = 'Done downloading ' + prettyBytes(torrent.length) // Once finished downloading everything, say "Done downloading (total size)" rather than "Downloaded (total size)"
    } else {
      remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
      remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
    }
    $timeRemaining.innerHTML = remaining

    // Speed rates
    $downloadSpeed.innerHTML = 'Current download speed: ' + prettyBytes(torrent.downloadSpeed) + '/s'
    $uploadSpeed.innerHTML = 'Current upload speed: ' + prettyBytes(torrent.uploadSpeed) + '/s'
  }
  
  // When done downloading everything, hide the progress bar and signal that seeding has started
  function onDone () {
    $body.className += ' is-seed'
	$progressBar.style.display = 'none';

	$total.style.display = 'none';
	$timeRemainingGroup.style.display = 'none';
    onProgress()
  }
  
  function noPeers () {
	$body.className += ' no-peers'
	$track.innerHTML += '<li id=\"track\" style=\"color: #000;\">Unfortunately, we could not find any peers seeding the requested audio file.</li>'
  }
  
  function peersFound () {
	$body.className -= ' no-peers'
	$track.innerHTML -= '<li id=\"track\" style=\"color: #000;\">Unfortunately, we could not find any peers seeding the requested audio file.</li>'
  }
  
  torrent.on('upload', function (bytes) {
	  $uploadSpeedGroup.style.visibility = "visible";
  })
})

// Human readable bytes util
function prettyBytes(num) {
  var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (neg) num = -num
  if (num < 1) return (neg ? '-' : '') + num + ' B'
  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
  num = Number((num / Math.pow(1000, exponent)).toFixed(2))
  unit = units[exponent]
  return (neg ? '-' : '') + num + ' ' + unit
}
