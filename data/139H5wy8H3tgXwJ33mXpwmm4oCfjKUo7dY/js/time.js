CountDownTimer('11/10/2022 06:0 AM', 'countdown');

function CountDownTimer(dt, id)
{

  function format(v) {
    return v.toString().length == 1 ? '0' + v : v;
  }

  var now = new Date(dt);

  var currentDate = Date.now();
  var endDateString = now.toISOString();
  var endDateTime = Date.parse(endDateString);
  var endDate = new Date(endDateTime);

  var $days = $('.days');
  var $hours = $('.hours');
  var $mins = $('.minutes');
  var $secs = $('.seconds');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;


  setInterval(function () {

    currentDate = Date.now();
    if (currentDate < endDate) {

      var distance = endDate - currentDate;


        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

      $secs.text(format(seconds));
      $mins.text(format(minutes));
      $hours.text(format(hours));
      $days.text(days);
    }
  }, 100);
};
