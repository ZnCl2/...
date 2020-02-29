function timeStamp() {
    var now = new Date();
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }
    return time.join(":");
}
document.getElementById("time").innerHTML = timeStamp();

