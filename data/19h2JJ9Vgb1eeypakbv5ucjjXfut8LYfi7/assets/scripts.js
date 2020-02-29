
function zeroPad(x) {
    var val = '' + x;
    if (val.length < 2) {
        val = '0' + val;
    }
    return val;
}

function showTime() {
    var time = new Date();
    var hours = zeroPad(time.getHours());
    var minutes = zeroPad(time.getMinutes());
    var seconds = zeroPad(time.getSeconds());

    var html = hours + ':' + minutes + '<small>:'+seconds + '</small>';
    $('#time').html(html)
}

function updateLayout() {
    var time = $('#time');
    var windowW = $(window).width();
    var position = {
        left: (windowW - time.width()) / 2 + 'px',
        top: ($(window).height() - time.height()) / 2 + 'px'
    };
    console.log('pos', position);
    time.css(position);
}

showTime();
updateLayout();
$(window).bind('resize', updateLayout);

setInterval(showTime, 1000);
