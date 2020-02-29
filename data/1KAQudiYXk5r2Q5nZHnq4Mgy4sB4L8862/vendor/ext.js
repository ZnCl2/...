
Array.prototype.last = function() {
  return this[this.length - 1];
};

Array.prototype.first = function() {
  return this[0];
};


Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for (let i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

String.prototype.replaceAll = function(search, replacement) {
  let target = this;

  while (target.indexOf(search) !== -1) {
    target = target.replace(search, replacement)
  }

  return target;
};

String.prototype.endsWithMany = function(words) {
  let target = this;

  for (let word of words) {
    if (target.endsWith(word)) {
      return true;
    }
  }

  return false;
};

function guidGenerator () {
  var S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}


function getSafeLang (key, lang) {
  if (lang == null) {
    return key;
  }

  return lang[key];

}

function millisecondsToString (milliseconds = 60, lang = null) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);
  let years = Math.floor(months / 12);

  if (minutes === 0) {
    return seconds + " " + getSafeLang("secondShort", lang);
  } else if (hours === 0) {
    return minutes + " " + getSafeLang("minuteShort", lang);
  } else if (days === 0) {
    return hours + " " + getSafeLang("hourShort", lang);
  } else if (weeks === 0) {
    return days + " " + getSafeLang("dayShort", lang);
  } else if (months === 0) {
    return weeks + " " + getSafeLang("weekShort", lang);
  } else if (years === 0) {
    return months + " " + getSafeLang("monthShort", lang);
  } else {
    return years + " " + getSafeLang("yearShort", lang);
  }

}


function encodeArg (arg) {
  return arg.replaceAll("'", "\%39");
}

function decodeArg (arg) {
  return arg.replaceAll("\%39", "'");
}

var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}


function getElementPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}