/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    // var reg = new RegExp( '[?&]' + field + '=([^#]*)', 'i' ); // This only accepts one URL arg, but is compatible for variables that might contain the ampersand character (e.g. full magnet links)
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' ); // This does not except full magnet links but allows for multiple URL args (e.g. ?fileID=torrentHash&loop=yes&autoplay=no )
    var string = reg.exec(href);
    return string ? string[1] : null;
};