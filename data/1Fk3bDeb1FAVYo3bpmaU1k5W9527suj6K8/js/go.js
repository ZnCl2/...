        class Syzygy extends ZeroFrame{}
	api = new Syzygy;
        var seed = "a";
        api.cmd("serverInfo", {}, (info) => {
		console.log("hello!");
		seed = info.auth_address;
	});
        var g = 1;
	for(c = seed.length - 1; c >= 0; c--){
                g += seed.charCodeAt(c);
	}
	//it's not like this is securing bitcoins
	var d = new Date();
	g *= d.getTime()*g/1899042;
	g = Math.floor(g);
        var a = g % 7;
        var b = g % 4;
        var cre = ["apoptosis", "conclusion", "residue", "not", "inaccessability", "deduction", "audit"];
        var nom = ["danger to self and others", "prophetic", "lacking intellectual rigor", "apostolic"];
        document.getElementById("mid").innerHTML = cre[a].toUpperCase() + ":<br />" + nom[b].toUpperCase();
