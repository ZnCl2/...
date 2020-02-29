function setContent() {
	if (window.name == "")
	{
		window.name = "default";
	}

	s = window.name + ".json";

	$.getJSON( "posts/" + s, function( data ) {

		document.getElementById('pageDate').innerHTML = data.date;
		document.getElementById('pageTitle').innerHTML = data.title;
		document.getElementById('pageContent').innerHTML = data.body;

	});

	$.getJSON( "posts/" + "0.json", function( data ) {
		document.getElementById('pageMenu').innerHTML = data.body;
	});
}

function goToPage(id) {
	window.name = id;
	setContent();
}

function home() {
	window.name = "0";
	setContent();
}

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}
