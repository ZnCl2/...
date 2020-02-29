var title = document.getElementById('title');
var video = document.getElementById('video');
var player = document.getElementById('player');
var caption = document.getElementById('cap');
var epsum = document.getElementById('epsum');
var vidbutpre = document.getElementById('vidbutpre');
var vidbutnex = document.getElementById('vidbutnex');
var pinurl;

$(document).ready(function () {
    gethash();
});
	  
$(window).bind('hashchange', function () {
    sethash();
    loadhash();
});

function gethash() {
	location.hash = loadvideo;
}

function sethash() {
	loadvideo = location.hash.substring(1);
}
	
function loadhash() {
  var hash = window.location.hash.substring(1);
  if (hash.length > 0) {
    console.log('New Hash: ' + hash);
    videolookup(hash);  
  }
}

function drawhash(videoinfo) {
	title.innerHTML = videoinfo[0];
	player.pause();
	video.src = "http://localhost:8080/ipfs/" + videoinfo[1];
	player.poster = "http://localhost:8080/ipfs/" + videoinfo[2];
	player.load();
	epsum.innerHTML = videoinfo[3];
	if (0 != videoinfo[4].length) {
		vidbutpre.style.visibility = "visible"
		vidbutpre.href = "#" + videoinfo[4];
	} else {
		vidbutpre.style.visibility = "hidden";
	}
	if (0 != videoinfo[5].length) {
		vidbutnex.style.visibility = "visible"
		vidbutnex.href = "#" + videoinfo[5]
	} else {
		vidbutnex.style.visibility = "hidden";
	}
	sethash();
	openpin();
	pinurl = 'http://localhost:5001/api/v0/pin/add?arg=' + videoinfo[1] + '&arg=' + videoinfo[2] + '&recursive=true';

}
function pin() {
  var win = window.open(pinurl, '_blank');
}
function pincollection() {
  var url = 'http://localhost:5001/api/v0/pin/add?arg=' + collection;
  var win = window.open(url, '_blank');
}
function closepin() {
  caption.style.display = "none";
  console.log('pin menu closed');
}
function openpin() {
  caption.style.display = "inherit";
  console.log('pin menu openned');
}
function resolve() {
  var url = 'http://localhost:5001/api/v0/swarm/connect?arg=/ip4/149.56.14.160/tcp/4001/ipfs/QmU33iCTrgMhurhEvLG25j4AMz82r8P3wqBPwUAtKmBHXX'
  var win = window.open(url, '_blank');
}
function tab() {
  player.pause();
  var url = video.src;
  var win = window.open(url, '_blank');
}

