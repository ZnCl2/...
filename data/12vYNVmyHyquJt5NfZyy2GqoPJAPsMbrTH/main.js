
var str = ""

var escapeHTML = function(unsafe) {
  return unsafe.replace(/[&<"']/g, function(m) {
    switch (m) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '"':
        return '&quot;';
      default:
        return '&#039;';
    }
  });
};

document.addEventListener('keypress', function(event) {
    if( (event.keyCode == 27) || (event.keyCode == 8) ) {
        str = str.substring(0, str.length-1);
        document.getElementById("txt").innerHTML = str;
        event.preventDefault();
    } else {
        str = str + escapeHTML(String.fromCharCode(event.charCode));
    }
    document.getElementById("txt").innerHTML = str;
});

