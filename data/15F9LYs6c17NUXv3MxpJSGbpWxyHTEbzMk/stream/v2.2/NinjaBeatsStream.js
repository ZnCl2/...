// HTML elements
var $body = document.body;
var $albumArt = document.querySelector('#albumArt');
var $albumArtContainer = document.querySelector('#albumArtContainer');
var $video = document.querySelector('#video');
var $progressBar = document.querySelector('#progressBar');

var $info = document.querySelector('#info');

var $numPeers = document.querySelector('#numPeers');

var $downloaded = document.querySelector('#downloaded');
var $total = document.querySelector('#total');
var $timeRemaining = document.querySelector('#timeRemaining');
var $timeRemainingGroup = document.querySelector('#timeRemainingGroup');

var $downloadSpeed = document.querySelector('#downloadSpeed');
var $downloadSpeedGroup = document.querySelector('#downloadSpeedGroup');
var $uploadSpeed = document.querySelector('#uploadSpeed');
var $uploadSpeedGroup = document.querySelector('#uploadSpeedGroup');

var $player = document.querySelector('#player');

var $filename = document.querySelector('#filename');
var $track = document.querySelector('#track');

var $loadingMsg = document.querySelector('#loadingMsg');

var $pageImgBackgroundEffect = document.querySelector('#pageImgBackgroundEffect');
var $pageVidBackgroundEffect = document.querySelector('#pageVidBackgroundEffect');

// URL query elements
//var torrentId = getQueryString('audioFile'); // returns the torrent file of the audio to be streamed. No longer supported
var torrentIdShort = getQueryString('audioFileID'); // returns the torrent ID of the audio to be streamed
//if (getQueryString('file') !== null) { // alias for audioFile
//	var torrentId = getQueryString('file');
//}
if (getQueryString('fileID') !== null) { // alias for audioFileID
	var torrentIdShort = getQueryString('fileID');
}
if (getQueryString('ID') !== null) { // alias for audioFileID
	var torrentIdShort = getQueryString('ID');
}

if (torrentIdShort !== null) {
	var torrentId = 'magnet:?xt=urn:btih:' + torrentIdShort + '&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io'; // Convert a torrent ID into a magnet link to a torrent file, and store that in the variable "torrentId".
	
	if (torrentIdShort.length < 40) {
	  $track.innerHTML += '<li id=\"track\" style=\"color: #000;\">The specified ID is invalid. The length of an ID should be 40 characters long and be a WebTorrent infohash. (e.g. like <a href=\"' + window.location + '?ID=e795562093b4044fb0852e26cb0426fc0bd7cbb8\">this</a>)</li>'
    } // Check if the torrent ID is too short, and if so, display a helpful error message to the user

}
console.log(torrentId);

// Optional URL query elements
var autoplay = getQueryString('autoplay');
if (autoplay == null) { // Autoplay by default if no value is specified
	var autoplay = 'yes'
}
console.log('Autoplay: ' + autoplay)

// Check if WebRTC is enabled and notify the user if it is not.
if (WebTorrent.WEBRTC_SUPPORT) {
  // WebRTC is supported
  var client = new WebTorrent();
  
  // Set the cursor to background progress indicator while the torrent is loading
  $body.style.cursor = 'progress';
  } else {
  $player.innerHTML = '<h1 style=\"margin: 1rem; font-weight: 200; font-family: \"Segoe UI\", sans-serif;\">Please enable WebRTC.</h1><p style=\"margin: 0.5rem 1rem;\">This music streamer uses <a href=\"https://webtorrent.io/\">WebTorrent</a> in order to facilitate the streaming of large files from any location (even outside this zite) with automated file splitting and torrent-like functionality.</p><p style=\"margin: 0 1rem;\">If you are concerned about your public IP being leaked and you\'re using Chrome, try <a href=\"https://chrome.google.com/webstore/detail/webrtc-network-limiter/npeicpdbkakmehahjeeohfdhnlpdklia\" alt="WebRTC Network Limiter">this Chrome extension</a> which prevents that and re-enable WebRTC. Alternatively, if you use Firefox, it <a href=\"https://ipfs.pics/QmbBuiNr6mS5E4V8XJXwgwxHXDJFwYKWq6Xf8JHkPejGMq\">does <i>not</i> reliably leak your public IP by default</a>, but we recommend enabling <code>media.peerconnection.ice.default_address_only</code> so that WebRTC on Firefox *always* goes through any proxy, Tor or VPN you have setup, at the cost of much slower streaming speeds (a technical explanation can be found <a href=\"https://wiki.mozilla.org/Media/WebRTC/Privacy\">here</a>).</p>';
  // WebRTC is not supported or disabled
}

// Check if an audio file has been specified. If not, let the user know
if (torrentId == null) {
  $track.innerHTML += '<li id=\"track\" style=\"color: #000;\">Please specify an ID in the URL. (e.g. like <a href=\"' + window.location + '?audioFileID=e795562093b4044fb0852e26cb0426fc0bd7cbb8\">this</a>)</li><li id\"track\" style=\"color: #000;\">Or visit <a href=\"http://127.0.0.1:43110/Me.ZeroNetwork.bit/?Profile/1RedkCkVaXuVXrqCMpoXQS29bwaqsuFdL/12EgeG4vgNHzuPJYZqVJQwy2W9vkywbQQu/paintninja@zeroid.bit\">my ZeroMe profile</a> for demos, news and status updates</li>'
  $body.style.cursor = 'auto'; // set the cursor back to normal as no background progress is happening
  $loadingMsg.style.display = 'none'; // hide the loading message as nothing's loading
}

setTimeout('$loadingMsg.innerHTML = "Waiting for WebTorrent metadata to download, please wait...<br>It appears to be taking longer than usual. It\'s possible nobody is seeding the requested track at the moment."', 10000);

// Download the torrent
client.add(torrentId, function (torrent) {

  // Cycle through each file in the torrent until a compatible image file is found for use as the album art display. If no compatible images are found, skip album art display.
  var areThereTracks = false;
  var areTherePics = false;
  var areThereVids = false;
  var areThereUnknownFiles = false;
  var iterations = 0;
  console.log("Torrent files: " + torrent.files.length);
  torrent.files.some(function(file) {
	  iterations = iterations + 1;
	  var fileExt = file.name.split('.').pop();
	  //if (file.name == "cover.jpg".toLowerCase() || file.name == "cover.png".toLowerCase() || file.name == "front.jpg".toLowerCase() || file.name == "front.png".toLowerCase() || file.name == "coverart.jpg".toLowerCase() || file.name == "coverart.png".toLowerCase() || file.name == "albumart.jpg".toLowerCase() || file.name == "albumart.png".toLowerCase()) { }
	  
	  // First we populate a count of the total amount of images, audio tracks and videos in the torrent
	  if (fileExt == 'jpg' || fileExt == 'png') { // if the torrent contains any supported image files
		  areTherePics = true; // add one to the image count
	  } else if (fileExt == 'm4a' || fileExt == 'mp3' || fileExt == 'wav' || fileExt == 'ogg' || fileExt == 'oga' || fileExt == 'opus' || fileExt == 'aac' || fileExt == 'm4b' || fileExt == 'flac') { // if the torrent contains any support audio files
		  areThereTracks = true;
	  } else if (fileExt == 'mp4' || fileExt == 'ogg' || fileExt == 'ogv' || fileExt == 'webm') { // if the torrent contains any supported video files
		  areThereVids = true;
	  } else {
		  areThereUnknownFiles = true;
	  }
 		  console.log('areThereVids: ' + areThereVids);
		  console.log('areTherePics: ' + areTherePics);

	  
	  
	  // Images
	  if (fileExt == 'jpg' || fileExt == 'png') { // if the torrent contains any supported image files
		  file.renderTo('#albumArt'); // render the image as album art
		  file.renderTo('#pageImgBackgroundEffect'); // also render it to the page background
		  $pageImgBackgroundEffect.style.opacity = '1'; // show the image page background
		  
		    // If there are no music and/or video tracks but one photo, switch to pic viewing mode
			if (iterations == torrent.files.length && areThereTracks == false && areThereVids == false && areTherePics == true) {
				
				var picFilenameText = file.name.split('.').shift().split('-')[1];
				if (picFilenameText == undefined) {
					var picFilenameText = file.name.split('.').shift()
				}
				
				$filename.innerHTML = '<h2 id="filename">' + picFilenameText + '</h2>'; // Change the player title to the photo's filename
			    document.title = picFilenameText + ' streaming on NinjaBeats' // Set the page's title to the photo's filename
				setTimeout(function() {switchToPicView()}, 2000); // Pause for a couple of seconds before switching to pic view				
			}
	  
	  // Audio
	  } else if (fileExt == 'm4a' || fileExt == 'mp3' || fileExt == 'wav' || fileExt == 'ogg' || fileExt == 'oga' || fileExt == 'opus' || fileExt == 'aac' || fileExt == 'm4b' || fileExt == 'flac') { // if the torrent contains any support audio files
		  var trackID = '#track' + areThereTracks;
		  var filenameText = file.name.split('.').shift().split('-')[1];
		  if (filenameText == undefined) {
			  var filenameText = file.name.split('.').shift()
		  }
		  $filename.innerHTML = '<h2 id="filename">' + filenameText + '</h2>'; // Change the player title to the track's filename
		  $track.innerHTML += '<li id=\"track' + areThereTracks + '\"></li>';
  		  document.title = filenameText + ' streaming on NinjaBeats' // Set the page's title to the track's filename

		  
		  if (autoplay == 'no') {
			  file.appendTo('#track' + areThereTracks, {autoplay: false}); // Add the track to the tracks list, without starting to play it automatically
		  } else {
			  file.appendTo('#track' + areThereTracks, {autoplay: true}); // Add the track to the tracks list and start to play it automatically
		  }
	  
	  // Videos
	  } else if (fileExt == 'mp4' || fileExt == 'ogg' || fileExt == 'ogv' || fileExt == 'webm') { // if the torrent contains any supported video files
		  //file.renderTo('#video');
		  //file.renderTo('#pageVidBackgroundEffect');
  		  $pageImgBackgroundEffect.style.transition = 'transition: opacity 0s ease-out;'; // remove the image fade out transition
		  $pageImgBackgroundEffect.style.opacity = '0';
		  $pageVidBackgroundEffect.style.opacity = '1';
		  
		  var vidFilenameText = file.name.split('.').shift().split('-')[1];
		  if (vidFilenameText == undefined) {
			  var vidFilenameText = file.name.split('.').shift()
		  }
		  $filename.innerHTML = '<h2 id="filename">' + vidFilenameText + '</h2>'; // Change the player title to the video's filename
		  document.title = vidFilenameText + ' streaming on NinjaBeats' // Set the page's title to the video's filename
		  
		    // If only a video has been provided, switch to video viewing mode and render the video in the #video tagged element
			if (iterations == torrent.files.length && areThereTracks == false && areThereVids == true && areTherePics == false) {
				setTimeout(function() {switchToVidView()}, 500);
				if (autoplay == 'no') {
					file.renderTo('#video', {autoplay: false}); // if the optional URL arg autoplay is "no", don't autoplay
				} else {
					file.renderTo('#video'); // You do not need to manually specify {autoplay: true} as the WebTorrent library's default is true.
				}

			} else {
				if (autoplay == 'no') {
					file.renderTo('#pageVidBackgroundEffect', {autoplay: false}); // otherwise, render it as the page's background effect without autoplay
				} else {
					file.renderTo('#pageVidBackgroundEffect'); // otherwise, render it as the page's background effect with autoplay
				}
			}
	  
	  } else {
		  $track.innerHTML += '<li id=\"track\" style=\"color: #000;\">An unsupported audio file has been included in the magnet link, but we\'re trying to play it anyway without scrobbing support or controls. We currently only support the following file extensions: png, jpg, m4a, m4b, aac, wav, ogg, oga, opus, flac, mp4, ogv and webm.</li>'
	  }
	  
	    // If there is a video track and a photo, stay in the default music view but...
		if (iterations == torrent.files.length && areThereTracks == false && areThereVids == true && areTherePics == true) {
			//$player.style.boxShadow = '0px 0px 10px 1px rgba(204,204,204,0.5)';
			$player.style.boxShadow = 'inset 0px 0px 10px 1px rgba(204,204,204,0.5)'; // ...flip the player's box shadow from outwards to inwards for better appearance
			// TODO: and show the controls so the music can still be paused and skipped through
			// $pageVidBackgroundEffect.controls = 'true'; // Known bug in Firefox: The entire video element (including video controls) are blurred by the CSS filter rather than just the video

			// A workaround for the blurred video controls bug until custom video hooks are made (e.g. custom pause/play button element) is to show a message about right clicking the background.
			//$track.innerHTML += '<li id=\"track\" style=\"color: #000;\">To pause and play the music, right click the background.</li>'
			
			// Hide the photo background effect so that the video background effect is visible
			$pageImgBackgroundEffect.style.opacity = '0';
			
			// Show custom music controls
			if (autoplay == 'no') {
				$track.innerHTML += '<li id=\"track\" style=\"color: blue; cursor: pointer; height: 1rem; list-style-type: none;\"><img id="playState" src="play-ring.png" alt=\"Pause/Play\" onclick=\"togglePause();\"><p id=\"trackTime\" style=\"color: #000; display: initial; cursor: auto; vertical-align: 24px; margin: 1rem;\"></p></li>'
			} else {
				$track.innerHTML += '<li id=\"track\" style=\"color: blue; cursor: pointer; height: 1rem; list-style-type: none;\"><img id="playState" src="pause-ring.png" alt=\"Pause/Play\" onclick=\"togglePause();\"><p id=\"trackTime\" style=\"color: #000; display: initial; cursor: auto; vertical-align: 24px; margin: 1rem;\"></p></li>'
			}
			
			$trackTime = document.querySelector('#trackTime')
			
			$pageVidBackgroundEffect.addEventListener('timeupdate',function(){ // add an event listener that fires whenever a timeupdate event occurs on the page's video bg player
				var currentTimeSecs = Math.round($pageVidBackgroundEffect.currentTime); // get the current time in seconds of the player, rounded from the decimal place
				var currentTimeMins = parseInt(currentTimeSecs / 60, 10);
				var currentTimeSecsMinusMins = ("00" + (currentTimeSecs - currentTimeMins * 60)).slice(-2) // We want a padding of up to 2 characters so it displays as 1:01 on current time rather than 1:1. We first add the string "00" to the start, then the amount of seconds minus the amount of minutes currently elapsed times 60. We then slice off the padding when it is not necessary.
				
				var currentTime = currentTimeMins + ':' + currentTimeSecsMinusMins;
				
				
				var totalDurationSecs = Math.round($pageVidBackgroundEffect.duration); // get total duration time in seconds of the player, rounded from the decimal place
				var totalDurationMins = parseInt(totalDurationSecs / 60, 10);
				var totalDurationSecsMinusMins = ("00" + (totalDurationSecs - totalDurationMins * 60)).slice(-2) // Same as currentTimeSecsMinusMins, but with the track's duration rather than current time.
				
				var totalDuration = totalDurationMins + ':' + totalDurationSecsMinusMins;
				
				$trackTime.innerHTML = currentTime + ' / ' + totalDuration;
			},false);
		}
  });
  
  // Trigger statistics refresh
  torrent.on('done', onDone);
  setInterval(onProgress, 500);
  onProgress();

  // Statistics
  function onProgress () {
	
	// Hide the loading message as we have started streaming
    $loadingMsg.style.display = 'none';
	
	// Set the cursor back to auto
	$body.style.cursor = 'auto';
	
    // Peers
    $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer is' : ' peers are') + ' seeding this on the NinjaBeats network';
	if (torrent.numPeers == 0) {
		$numPeers.innerHTML = 'Nobody else is seeding this at the moment. :(';
	}

    // Progress
    var percent = Math.round(torrent.progress * 100 * 100) / 100;
    $progressBar.style.width = percent + '%';
    $downloaded.innerHTML = 'Downloaded ' + prettyBytes(torrent.downloaded);
    $total.innerHTML = ' of ' + prettyBytes(torrent.length);

    // Remaining time
    var remaining;
    if (torrent.done) {
      remaining = 'Done.';
	  $downloaded.innerHTML = 'Done downloading ' + prettyBytes(torrent.length); // Once finished downloading everything, say "Done downloading (total size)" rather than "Downloaded (total size)"
    } else {
      remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize();
      remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
    }
    $timeRemaining.innerHTML = remaining;

    // Speed rates
    $downloadSpeed.innerHTML = 'Current download speed: ' + prettyBytes(torrent.downloadSpeed) + '/s';
    $uploadSpeed.innerHTML = 'Current upload speed: ' + prettyBytes(torrent.uploadSpeed) + '/s'
	if (torrent.downloadSpeed == 0) {
		$downloadSpeedGroup.style.visibility = "hidden"; // Hide the download speed indicator if no data is being downloaded
	} else if (torrent.uploadSpeed == 0) {
		  $uploadSpeedGroup.style.visibility = "hidden"; // Hide the upload speed indicator if no data is being uploaded
	} // we don't specify an else statement here as we check if data is being downloaded/uploaded through a WebTorrent event rather than through a loop to improve efficiency
  }
  
  // When done downloading everything, hide the progress bar and signal that seeding has started
  function onDone () {
    $body.className += ' is-seed';
	$progressBar.style.display = 'none';

	$total.style.display = 'none';
	$timeRemainingGroup.style.display = 'none';
	
	$albumArtContainer.style.background = 'url(\'noalbumartprovided.png\') no-repeat' // Show the "No album art found" placeholder if none is found after downloading everything
	$albumArtContainer.removeAttribute("logoVisible"); // Indicate that the logo is no longer visible and has been replaced by the "No album art found" placeholder
	$albumArtContainer.style.cursor = 'auto'; // Stop indicating that the element is a link
	
    onProgress()
  }
  
  function noPeers () {
	$body.className += ' no-peers';
	$track.innerHTML += '<li id=\"track\" style=\"color: #000;\">Unfortunately, we could not find any peers seeding the requested audio file.</li>'
  }
  
  function peersFound () {
	$body.className -= ' no-peers';
	$track.innerHTML -= '<li id=\"track\" style=\"color: #000;\">Unfortunately, we could not find any peers seeding the requested audio file.</li>'
  }
  
  torrent.on('upload', function (bytes) {
	  $uploadSpeedGroup.style.visibility = "visible"; // Show the upload indicator when uploading data
  })
  torrent.on('download', function (bytes) {
	  $downloadSpeedGroup.style.visibility = "visible";
  })
});

// Switch from music streaming to image viewing mode
function switchToPicView() {
	var $tracks = document.querySelector('#tracks');
	
	$player.style.transition = 'all 1s ease-out';
	$albumArt.style.transition = 'all 1s ease-out';
	$player.style.height = 'auto';
	$player.style.width = '-moz-min-content'; // Firefox
	$player.style.width = '-webkit-min-content'; // Safari and Chrome
	$player.style.width = 'min-content'; // Non-prefixed standard
	$player.style.padding = '1rem';
	$player.style.paddingBottom = '0rem';
	$albumArt.removeAttribute("height");
	$albumArt.style.height = 'calc(100% - 3rem)';
	$albumArt.style.width = '100%';
	$albumArtContainer.style.height = 'calc(100% - 3rem)';
	$albumArtContainer.style.width = '100%';
	$tracks.style.padding = '0';
	$tracks.style.height = '3rem';
	$filename.style.padding = '0';
	$filename.style.paddingLeft = '0';
	$filename.style.marginLeft = '-1rem';
	$info.style.padding = '0';
	$info.style.width = '100%';
	$info.style.paddingTop = '0.5rem';
}

function switchToVidView() {
	// first, switch to pic view
	switchToPicView();
	
	$albumArt.style.display = 'none';
	$video.style.display = 'inline';
	
	$video.style.transition = 'all 1s ease-out'; // enable a smooth resize transition
	$video.style.width = '100%'; // resize the video player so that it is visible
	$filename.style.marginLeft = '0'; // fix the alignment of the file name heading
	$player.style.width = '50%'; // resize the whole player so that it doesn't fill the screen too much
}

function togglePause() {
	var $playState = document.querySelector('#playState');
	if ($pageVidBackgroundEffect.paused) { // if the page video background is currently paused when this function is called...
        $pageVidBackgroundEffect.play(); // ...play it
		$playState.src = 'pause-ring.png';
    } else { // otherwise, pause it
        $pageVidBackgroundEffect.pause();
		$playState.src = 'play-ring.png';
    }
}

function checkPauseState() { // currently unused function. Could be used for fixing the play/pause button when the audio/video track ends in the future
	var $playState = document.querySelector('#playState');
	if ($pageVidBackgroundEffect.paused) { // if the page video background is currently paused when this function is called...
		$playState.src = 'play-ring.png'; // ...show the play button
    } else { // otherwise, show the pause button
		$playState.src = 'pause-ring.png';
    }
}

function goHomeIfIClickedTheLogo() { // Only turn the container into a link to the homepage if the logo is currently displayed there
	if ($albumArtContainer.hasAttribute("logovisible")) { // Check if the container has an attribute called "logovisible". This attribute gets removed when the logo gets replaced
		window.location.assign('../index.html'); // go to the homepage
		console.log("Logo visible and clicked"); // for debugging purposes
	}
}

// Human readable bytes util
function prettyBytes(num) {
  var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (neg) num = -num;
  if (num < 1) return (neg ? '-' : '') + num + ' B';
  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = Number((num / Math.pow(1000, exponent)).toFixed(2));
  unit = units[exponent];
  return (neg ? '-' : '') + num + ' ' + unit
}
