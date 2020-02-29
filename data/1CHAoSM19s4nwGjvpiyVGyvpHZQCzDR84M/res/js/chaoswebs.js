/* Copyright 2017 Kevin Froman. MIT License

 I don't like scripts on static sites either. This just does a few minor things like select text boxes and redirect to other networks if you have them */

for (x in document.getElementsByTagName('input')){ 

	document.getElementsByTagName('input')[x].onclick = function(){

		this.select();

	}

}

document.getElementById('m').innerHTML = 'beardog' + '@' + 'firemail.cc';

if (window.opener) { window.opener.location = '/hacked.html' }
