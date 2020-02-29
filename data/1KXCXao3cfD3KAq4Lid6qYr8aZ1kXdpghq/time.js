var unitime = 0;
function uniCal(s,ts)
{
	//2992 leap days from 0HE (Holocene/Human Era) to 1970
	//4372000 days
	s = s+27 ; //Add in leap seconds that were missed due to unix
	//s += 43200; //Shift new day to noon
	//var hedays = 2902+(11970*365); //Days between 0HE and 1970
	var hedays = 2440587 //Julian Day for jan 1 1970
	s = s/0.864; //uni seconds since 1970

	s += hedays*100000; //true time

	if(ts)
		unitime = s;

	var d = Math.floor(s/100000);
	var q = Math.floor(d/100);
	var y = Math.floor(q/10);
	s -= d*100000;
	d -= q*100;
	q -= y*10;
	w = Math.floor(d/10);
	d -= w*10;
	var h = Math.floor(s/10000); //Get whole hours
    s -= h*10000;
    var m = Math.floor(s/100); //Get remaining minutes
    s -= m*100;
    s = Math.floor(s)
	return y+"/"+q+"/"+w+"w"+d+"."+h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s);
}

function display()
{
var date = new Date()
var nowdt = date.getTime();
var offset = -(date.getTimezoneOffset() / 60);
var newoff = Math.floor((offset*3600)/0.864);
var o = Math.floor((offset*3600)/0.864)*0.864;
var now = (nowdt/1000) + o;
var disp = document.getElementById("time");
disp.innerHTML = uniCal(nowdt/1000,1)+"<br>";
}

setInterval(function(){
				display();
			}, 100);