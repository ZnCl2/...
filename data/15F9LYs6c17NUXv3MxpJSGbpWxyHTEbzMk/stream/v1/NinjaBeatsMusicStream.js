var torrentId = getQueryString('audioFile'); // returns the torrent file of the audio to be streamed
console.log(torrentId);

var client = new WebTorrent()

// HTML elements
var $body = document.body
var $progressBar = document.querySelector('#progressBar')
var $numPeers = document.querySelector('#numPeers')
var $downloaded = document.querySelector('#downloaded')
var $total = document.querySelector('#total')
var $remaining = document.querySelector('#remaining')
var $uploadSpeed = document.querySelector('#uploadSpeed')
var $downloadSpeed = document.querySelector('#downloadSpeed');
var $invalidAudioFileInfo = document.querySelector('#invalidAudioFile')

// Download the torrent
client.add(torrentId, function (torrent) {

  // Stream the file in the browser if it is a supported audio file
  var musicfileextension = torrent.files[0].name.split('.').pop();
  console.log("music file extension: " + musicfileextension);
  if (musicfileextension == "m4a" || musicfileextension == "wav" || musicfileextension == "mp3" || musicfileextension == "ogg" || musicfileextension == "opus" || musicfileextension == "wma" || musicfileextension == "flac" || musicfileextension == "ape" || musicfileextension == "wv" || musicfileextension == "aiff" || musicfileextension == "m4b" ) {
	torrent.files[0].appendTo('#playercontainer');
  } else {
	torrent.pause()
	$body.innerHTML = 'Invalid input: the first file in the torrent from the inputted magnet link is not a supported audio file. This player works ideally with m4a audio files, but you can try any of the following: m4a, wav, mp3, ogg, opus, wma, flac, ape, wv, aiff and m4b.'
  }

  // Trigger statistics refresh
  torrent.on('done', onDone)
  setInterval(onProgress, 500)
  onProgress()

  // Statistics
  function onProgress () {
    // Peers
    $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers') + ' on the NinjaBeats network'
	if (torrent.numPeers >= 1) {
	  document.querySelector('body').classList.remove(' no-peers');
	}

    // Progress
    var percent = Math.round(torrent.progress * 100 * 100) / 100
    $progressBar.style.width = percent + '%'
    //$downloaded.innerHTML = prettyBytes(torrent.downloaded)
    //$total.innerHTML = prettyBytes(torrent.length)

    // Remaining time
    var remaining
    if (torrent.done) {
      remaining = 'Done.'
    } else {
      remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
      remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
    }
    //$remaining.innerHTML = remaining

    // Speed rates
    $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
    $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
  }
  function onDone () {
    $body.className += ' is-seed'
    onProgress()
  }
  
  function noPeers () {
	$body.className += ' no-peers'
  }
  
  function peersFound () {
	$body.className -= ' no-peers'
  }
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
