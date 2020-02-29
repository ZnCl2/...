var cwsites = document.getElementById("cweb");

var cli = [];
cli[0] = "<a href='https://www.winehq.org/'>WineHQ</a>";
cli[1] = "<a href='https://www.minetest.net/'>Minetest</a>";
cli[2] = "<a href='https://www.minds.com'>Minds</a>";
cli[3] = "<a href='https://duckduckgo.com'>DuckDuckGo</a>";
cli[4] = "<a href='https://d.tube'>DTube</a>";
cli[5] = "<a href='https://bit.tube'>BitTube</a>";

for (i = 0; i < cli.length; i++) {
 
    var newbtn = document.createElement('div');
    newbtn.innerHTML = cli[i];
    
    cwsites.appendChild(newbtn);
    
}
 
