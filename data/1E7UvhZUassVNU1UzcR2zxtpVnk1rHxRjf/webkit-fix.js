"use strict";

let WebKitFix = (function() {
  // Fetches the SVG file and returns its document.
  function fetchSVG(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();
      xhr.onload = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            resolve(xhr.responseXML);
          } else {
            reject();
          }
        }
      };
    });
  }

  // Iterates all CSSStyleRules in the given CSSRuleList.
  function* iterateRulesFromList(sheet, ruleList) {
    for (let j = 0; j < ruleList.length; j++) {
      let rule = ruleList[j];
      if ('cssRules' in rule) {
        yield* iterateRulesFromList(sheet, rule.cssRules);
      }
      if (rule.type == CSSRule.STYLE_RULE) {
        yield {sheet, rule};
      }
    }
  }

  // Iterates all CSSStyleRules in this document.
  function* iterateRules() {
    for (let i = 0; i < document.styleSheets.length; i++) {
      let sheet = document.styleSheets[i];
      yield* iterateRulesFromList(sheet, sheet.cssRules);
    }
  }

  let serializer = new XMLSerializer();
  // Serializes the given SVG document to a data URI.
  function convertSVGDocumentToDataUri(doc) {
    let string = serializer.serializeToString(doc);
    return "data:image/svg+xml;base64," + window.btoa(string);
  }

  // WebKit incorrectly adds escapes in the url, see
  // https://bugs.webkit.org/show_bug.cgi?id=170283
  function stripBackslashes(value) {
    return value.replace(/\\/g, '');
  }

  return {
    // This is a workaround for the issue that fragment in url() value
    // is not respected when the file is from remote. See
    // https://bugs.webkit.org/show_bug.cgi?id=163811
    fixSVGSprites() {
      // A map from an absolute url string to an array of
      // {rule, prop, id, urlvalue}.
      let itemsToHandle = new Map();
      // Find all SVG sprites we need to handle.
      for (let {sheet, rule} of iterateRules()) {
        for (let i = 0; i < rule.style.length; i++) {
          let prop = rule.style[i];
          let value = stripBackslashes(rule.style.getPropertyValue(prop));
          let match = /\burl\(['"]?(.+?\.svg)#(.+?)['"]?\)/.exec(value);
          if (match) {
            let urlvalue = match[0];
            let url = new URL(match[1], sheet.href).toString();
            let id = match[2];
            let entry = itemsToHandle.get(url);
            if (!entry) {
              entry = [];
              itemsToHandle.set(url, entry);
            }
            entry.push({rule, prop, id, urlvalue});
          }
        }
      }
      // Replace all SVG sprites with data URI with the corresponding
      // element forced to display.
      for (let [url, items] of itemsToHandle.entries()) {
        fetchSVG(url).then(doc => {
          for (let {rule, prop, id, urlvalue} of items) {
            let elem = doc.getElementById(id);
            elem.style.setProperty('display', 'inline', 'important');
            let newurlvalue = `url(${convertSVGDocumentToDataUri(doc)})`;
            elem.style.removeProperty('display');
            let value = stripBackslashes(rule.style.getPropertyValue(prop));
            let priority = rule.style.getPropertyPriority(prop);
            let newvalue = value.replace(urlvalue, newurlvalue);
            rule.style.setProperty(prop, newvalue, priority);
          }
        });
      }
    }
  };
})();
