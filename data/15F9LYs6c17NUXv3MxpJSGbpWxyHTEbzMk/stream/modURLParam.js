/**
 * @license Copyright 2013 - Chris West - MIT Licensed
 */
// http://cwestblog.com/2013/05/21/javascript-modify-url-parameters/
 (function(expCharsToEscape, expEscapedSpace, expNoStart, undefined) {
  /**
   * Modifies the given URL, returning it with the given parameter
   * changed to the given value.  The parameter is added if it didn't
   * already exist.  The parameter is removed if null or undefined is
   * specified as the value.
   * @param {string} url  The URL to be modified.
   * @param {string} paramName  The URL parameter whose value will be
   *     modified.
   * @param {string} paramValue  The value to assign.  This will be
   *     escaped using encodeURIComponent.
   * @return {string}  The updated URL.
   */
  modURLParam = function(url, paramName, paramValue) {
    paramValue = paramValue != undefined
      ? encodeURIComponent(paramValue).replace(expEscapedSpace, '+')
      : paramValue;
    var pattern = new RegExp(
      '([?&]'
      + paramName.replace(expCharsToEscape, '\\$1')
      + '=)[^&]*'
    );
    if(pattern.test(url)) {
      return url.replace(
        pattern,
        function($0, $1) {
          return paramValue != undefined ? $1 + paramValue : ''; 
        }
      ).replace(expNoStart, '$1?');
    }
    else if (paramValue != undefined) {
      return url + (url.indexOf('?') + 1 ? '&' : '?')
        + paramName + '=' + paramValue;
    }
    else {
      return url;
    }
  };
})(/([\\\/\[\]{}().*+?|^$])/g, /%20/g, /^([^?]+)&/);