(function () {
    window.$ = function (selector) {
        if (selector.startsWith("#")) {
            return document.getElementById(selector.replace("#", ""));
        }
    };

}).call(this);
