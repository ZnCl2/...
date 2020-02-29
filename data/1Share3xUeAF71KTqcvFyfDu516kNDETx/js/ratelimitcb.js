
(function () {
    var call_after_interval, calling, last_time,
            slice = [].slice;

    last_time = {};

    calling = {};

    call_after_interval = {};

    window.RateLimitCb = function (interval, fn, args) {
        var cb;
        if (args == null) {
            args = [];
        }
        cb = function () {
            var left;
            left = interval - (Date.now() - last_time[fn]);
            if (left <= 0) {
                delete last_time[fn];
                if (calling[fn]) {
                    RateLimitCb(interval, fn, calling[fn]);
                }
                return delete calling[fn];
            } else {
                return setTimeout((function () {
                    delete last_time[fn];
                    if (calling[fn]) {
                        RateLimitCb(interval, fn, calling[fn]);
                    }
                    return delete calling[fn];
                }), left);
            }
        };
        if (last_time[fn]) {
            return calling[fn] = args;
        } else {
            last_time[fn] = Date.now();
            return fn.apply(this, [cb].concat(slice.call(args)));
        }
    };

    window.RateLimit = function (interval, fn) {
        if (!calling[fn]) {
            call_after_interval[fn] = false;
            fn();
            return calling[fn] = setTimeout((function () {
                if (call_after_interval[fn]) {
                    fn();
                }
                delete calling[fn];
                return delete call_after_interval[fn];
            }), interval);
        } else {
            return call_after_interval[fn] = true;
        }
    };


    /*
     window.s = Date.now()
     window.load = (done, num) ->
     console.log "Loading #{num}...", Date.now()-window.s
     setTimeout (-> done()), 1000
     
     RateLimit 500, window.load, [0] # Called instantly
     RateLimit 500, window.load, [1]
     setTimeout (-> RateLimit 500, window.load, [300]), 300
     setTimeout (-> RateLimit 500, window.load, [600]), 600 # Called after 1000ms
     setTimeout (-> RateLimit 500, window.load, [1000]), 1000
     setTimeout (-> RateLimit 500, window.load, [1200]), 1200  # Called after 2000ms
     setTimeout (-> RateLimit 500, window.load, [3000]), 3000  # Called after 3000ms
     */

}).call(this);