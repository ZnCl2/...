// replaces all whitespace with '-' and removes
// all non-url friendly characters
(function () {
var whitespace = /\s+/g;

function slugger(string, opts) {
    opts || (opts = {});
    //var allowedCharacters = "\00000\fffffA-Za-z0-9_ -";
    //if (opts.alsoAllow) allowedCharacters = opts.alsoAllow + allowedCharacters;
    //var re = new RegExp('[^' + allowedCharacters + ']', 'g');
    var maintainCase = opts.maintainCase || false;
    var replacement = opts.replacement || '-';
    var smartTrim = opts.smartTrim;
    var decode = (opts.decode !== false);
    var result;
    var lucky;

    if (typeof string !== 'string') return '';
    if (!maintainCase) string = string.toLowerCase();
    if (decode) string = decodeURIComponent(string);
    result = string.trim().replace(whitespace, replacement);//.replace(re, '')
    if (smartTrim && result.length > smartTrim) {
        lucky = result.charAt(smartTrim) === replacement;
        result = result.slice(0, smartTrim);
        if (!lucky) result = result.slice(0, result.lastIndexOf(replacement));
    }
    return result;
}

if (typeof module !== 'undefined') {
    module.exports = slugger;
} else {
    window.slugger = slugger;
}
})();