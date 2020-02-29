var client = new WebTorrent()

// HTML elements
var $body = document.body
var $progressBar = document.querySelector('#progressBar')
var $numPeers = document.querySelector('#numPeers')
var $downloaded = document.querySelector('#downloaded')
var $total = document.querySelector('#total')
var $remaining = document.querySelector('#remaining')
var $uploadSpeed = document.querySelector('#uploadSpeed')
var $downloadSpeed = document.querySelector('#downloadSpeed')

      document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault() // Prevent page refresh

        var torrentId = document.querySelector('form input[name=torrentId]').value
	
	if (navigator.userAgent.indexOf("Firefox") > 0) {
        	client.add(torrentId, onTorrent)
	} else {
		document.getElementById("loadingspan").style.display = 'none'
		document.getElementById("warningspan").style.display = 'block'
		initializeMinutes()

    		function startTimer(duration, display) {
        		var timer = duration, minutes, seconds;
        		var end = setInterval(function () {
            			minutes = parseInt(timer / 60, 10)
            			seconds = parseInt(timer % 60, 10);

			        minutes = minutes < 10 ? "0" + minutes : minutes;
        	    		seconds = seconds < 10 ? "0" + seconds : seconds;

		                display.textContent = minutes + ":" + seconds;

	                if (--timer < 0) {
				magnetLinker = document.querySelector('#magnetlink').href;
        	                window.top.location = "https://www.kittyseedbox.tk/player/#" + magnetLinker;
                	        clearInterval(end);
            		}

			var clear_timer = document.getElementById("clear-timer");
			clear_timer.addEventListener("click", clearAllInterval);

			function clearAllInterval() {
    				clearInterval(end);
			} 

            	}, 1000);
    		}

    		function initializeMinutes() {
        		var fiveMinutes = 5;
            	display = document.querySelector('#time');
        		startTimer(fiveMinutes, display);
    		};
	}
	})

function onTorrent (torrent) {
  // Stream the file in the browser
  torrent.files[0].appendTo('#output')
  document.getElementById("loadingspan").style.display = 'none'
  document.getElementById("warning-message").style.display = 'block'
  
  // Trigger statistics refresh
  torrent.on('done', onDone)
  setInterval(onProgress, 500)
  onProgress()

  // Statistics
  function onProgress () {
    // Peers
    $numPeers.innerHTML = torrent.numPeers

    // Progress
    var percent = Math.round(torrent.progress * 100 * 100) / 100
    $progressBar.style.width = percent + '%'
    $downloaded.innerHTML = prettyBytes(torrent.downloaded)
    $total.innerHTML = prettyBytes(torrent.length)

    // Remaining time
    var remaining
    if (torrent.done) {
      remaining = 'Done.'
    } else {
      remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
      remaining = remaining[0].toUpperCase() + remaining.substring(1)
    }
    $remaining.innerHTML = remaining

    // Speed rates
    $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
    $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
  }
  function onDone () {
    $body.className += ' is-seed'
    onProgress()
  }
}


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

