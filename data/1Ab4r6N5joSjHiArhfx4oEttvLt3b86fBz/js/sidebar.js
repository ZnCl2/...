var sidnav = document.getElementById("posts");

var catlink = [];
catlink[0] = "<a href='linux.html'>Win to Linux - my experience</a>";
catlink[1] = "<a href='games.html'>Games - Open Source</a>";
catlink[2] = "<a href='memes.html'>Memes - because f*ck you E.U.</a>";


for (i = 0; i < catlink.length; i++) {
	var catli = document.createElement('div');
	catli.innerHTML = catlink[i];
	
	sidnav.appendChild(catli);
}

 
