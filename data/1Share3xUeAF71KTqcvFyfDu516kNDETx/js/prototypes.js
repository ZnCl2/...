(function () {
    String.prototype.startsWith = function (s) {
        return this.slice(0, s.length) === s;
    };

    String.prototype.endsWith = function (s) {
        return s === '' || this.slice(-s.length) === s;
    };

    String.prototype.repeat = function (count) {
        return new Array(count + 1).join(this);
    };

    window.isEmpty = function (obj) {
        var key;
        for (key in obj) {
            return false;
        }
        return true;
    };

}).call(this);
