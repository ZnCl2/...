var now = new Date;
var millisTill10 =  Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000; // it's after 12pm, try 12pm tomorrow.
}
setTimeout(function(){
/*alert("It's time to vote!")*/
}, millisTill10);



function getTimeRemaining(endtime) {
  var loc = new Date();
  var now = Date.UTC(loc.getFullYear(),loc.getMonth(), loc.getDate() ,loc.getHours(), loc.getMinutes(), loc.getSeconds(), loc.getMilliseconds());
  var t = Date.parse(endtime) - now;
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var veadline = new Date(Date.parse(new Date()) + 1 * 24 * 60 * 60 * 1000); 
var deadline = new Date("Jan 3, 2020 12:00:00");
initializeClock('clockdiv', deadline);
initializeClock('votediv', deadline);
