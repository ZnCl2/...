function countdown(d) {
    var target = document.getElementById('countdown');
    var diff, dd, dh, dm, ds;
    function full_update() {
        diff = (new Date(Date.parse(d))-new Date())/1000;
        update_target();
    }
    function update() {
        diff -= 1;
        update_target();
    }
    function update_target() {
        var diff1, diff2;
        if (diff <= 0) {
            target.innerHTML = 'countdown finished';
            target.parentNode.setAttribute('href', "");
            return;
        }
        dd = parseInt(diff / (60*60*24)),
        diff1 = diff % (60*60*24),
        dh = parseInt(diff1 / (60*60)),
        diff2 = diff1 % (60*60),
        dm = parseInt(diff2 / 60),
        ds = parseInt(diff2 % 60);
        day_s = dd ? dd+'-' : '';
        target.innerHTML = day_s+a0(dh)+':'+a0(dm)+':'+a0(ds);
    }
    function a0(n) {
        if (n < 10) return '0'+n;
        return n;
    }
    full_update();
    setInterval(update, 1000);
}
