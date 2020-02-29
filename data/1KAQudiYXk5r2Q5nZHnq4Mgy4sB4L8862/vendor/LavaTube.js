
//
// TODO: if render area has overwritten variable names, raise error
// NOT WORKING: calling updateArea in rendered area
//

class LavaTubeGlobal {
  location;
  onHrefCallback;
  methods = {};

  setHref(href) {
    let self = this;
    self.location = href;

    if (self.onHrefCallback !== undefined) {
      self.onHrefCallback(href);
    }
  }

  onHref(callback) {
    let self = this;
    this.onHrefCallback = callback;
  }
}

let lavaTubeGlobal = new LavaTubeGlobal();


class LavaTube extends ZeroFrame {

  /**
   * @type {Boolean}
   */
  debug;

  /**
   * @type {LilFrame}
   */
  lilframe;

  currentlyRendering;
  areaTemplatesByNameBuf = {};


  /**
   * @constructor
   * @param {LilFrame} lilframe
   * @param {boolean} debug
   */
  constructor(lilframe, debug = false) {
    super();
    let self = this;

    self.lilframe = lilframe;
    self.debug = debug;

    if (debug) {
      console.log("[LavaTube] init(debug="+debug+")")
    }

    // disable every lavatube-href and use function instead
    /*
    if (window.addEventListener) {
      document.addEventListener('click', function (e) {

        var node = e.target;
        while (node !== undefined && node.className !== undefined) {

          if (node.className.indexOf("lavatube-href") !== -1) {
            node.preventDefault();

            if (self.onHrefCallback !== undefined) {
              lavaTubeGlobal.location = node.getAttribute("href");
              self.onHrefCallback(location.search);
            }

          }

          node = node.parentNode;
        }

      });
    }

    lavaTubeGlobal.onHref((href) => {
      self.onHrefCallback(location.search);
    })

     */
  }

  //
  // misc area
  //

  attribute(name) {
    let self = this;

    if (lavaTubeGlobal.location === undefined) {
      return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(lavaTubeGlobal.location) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }

  emptyOrUndefined (val) {
    return val === undefined || val == null || val === ""
  }


  //
  // just clear renderer content
  // also clears methods used
  //

  clearRenderer () {
    let self = this;

    let renderer = document.querySelector("LavaTubeRenderer");
    if (renderer) {
      renderer.innerHTML = "";

      // also clear methods
      lavaTubeGlobal.methods = {};

      // clear saved templates, used to in updateArea function
      self.areaTemplatesByNameBuf = {};
    } else {
      console.error("[LavaTube] 'LavaTubeRenderer' doesn't exists");
    }
  }


  //
  // render mambo jambo
  //

  render (htmlTemplate, htmlData = [], callback = null) {
    let self = this;

    if (self.debug) {
      console.log("[LavaTube] render("+htmlTemplate+")")
    }

    // set currently rendering name to later print out errors and logs
    self.currentlyRendering = htmlTemplate;

    if (self.emptyOrUndefined(htmlTemplate)) {
      throw "passed htmlTemplate(1st arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlData)) {
      throw "passed htmlData(2nd arg) can't be undefined"
    }

    let renderer = document.querySelector("LavaTubeRenderer");
    if (renderer) {

      self.lilframe.getFileOnce(htmlTemplate, (data) => {
        if (data) {

          renderer.innerHTML = data;

          // save templates by are if theres area name defines, lavatub-area="area-name"
          let areaElems = renderer.querySelectorAll("[lavatube-area]");
          if (areaElems !== undefined) {
            areaElems.forEach((elem) => {
              let areaName = elem.getAttribute("lavatube-area");
              self.areaTemplatesByNameBuf[areaName] = elem.innerHTML;
            });
          }

          self.parse(renderer, htmlData);

          if (callback != null) {
            callback();
          }

        } else {
          console.error("[LavaTube] file can't be opened: " + htmlTemplate);
        }
      });


    } // if (renderer)
    else {
      console.error("[LavaTube] 'LavaTubeRenderer' doesn't exists");
    }

  }


  //
  // update area
  //

  updateArea (areaName, htmlData = []) {
    let self = this;

    if (self.emptyOrUndefined(areaName)) {
      throw "passed areaName(1st arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlData)) {
      throw "passed data(2nd arg) can't be undefined"
    }

    let templateInnerHtml = self.areaTemplatesByNameBuf[areaName];
    if (templateInnerHtml === undefined || templateInnerHtml == null) {
      console.error("[LavaTube] '"+areaName+"' area name doesnt exist in: " + self.currentlyRendering);
      return;
    }

    let areaElem = document.querySelector("[lavatube-area='"+areaName+"']");
    if (areaElem === undefined || areaElem == null) {
      console.error("[LavaTube] '"+areaName+"' area name doesnt exist in: " + self.currentlyRendering);
      return;
    }

    let span = document.createElement("span");
    span.innerHTML = templateInnerHtml;

    self.parse(span, htmlData);
    areaElem.innerHTML = span.innerHTML;

  } // updateArea


  //
  // render area, in area render html file
  //

  renderArea (areaName, htmlTemplate, htmlData = [], callback = null) {
    let self = this;

    if (self.emptyOrUndefined(areaName)) {
      throw "passed areaName(1st arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlTemplate)) {
      throw "passed htmlTemplate(2nd arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlData)) {
      throw "passed htmlData(3rd arg) can't be undefined"
    }

    let areaElem = document.querySelector("[lavatube-area='"+areaName+"']");
    if (areaElem === undefined || areaElem == null) {
      console.error("[LavaTube] '"+areaName+"' area name doesnt exist in: " + self.currentlyRendering);
      return;
    }

    self.lilframe.getFileOnce(htmlTemplate, (data) => {

      if (data) {
        let span = document.createElement("span");
        span.innerHTML = data;

        self.parse(span, htmlData);

        areaElem.innerHTML = span.innerHTML;

        // save templates by are if theres area name defines, lavatub-area="area-name"
        let areaElems = areaElem.querySelectorAll("[lavatube-area]");
        if (areaElems !== undefined) {
          areaElems.forEach((elem) => {
            let areaNameToSave = elem.getAttribute("lavatube-area");
            self.areaTemplatesByNameBuf[areaNameToSave] = elem.innerHTML;
          });
        }

        if (callback != null) {
          callback();
        }

      } // if (data)
      else {
        console.error("[LavaTube] file can't be opened: " + htmlTemplate);
      }

    });

  } // renderArea


  //
  // addToArea
  //

  addToArea (areaName, htmlTemplate, htmlData = [], callback = null) {
    let self = this;

    if (self.emptyOrUndefined(areaName)) {
      throw "passed areaName(1st arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlTemplate)) {
      throw "passed htmlTemplate(2nd arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlData)) {
      throw "passed htmlData(3rd arg) can't be undefined"
    }

    let areaElem = document.querySelector("[lavatube-area='"+areaName+"']");
    if (areaElem === undefined || areaElem == null) {
      console.error("[LavaTube] '"+areaName+"' area name doesnt exist in: " + self.currentlyRendering);
      return;
    }

    self.lilframe.getFileOnce(htmlTemplate, (data) => {

      if (data) {
        let elemId = "ltpe-"+guidGenerator();

        areaElem.innerHTML += "<span id='"+elemId+"'>" + data + "</span>";
        self.parse(areaElem.querySelector("#"+elemId), htmlData);

        if (callback != null) {
          callback(elemId);
        }
      } // if (data)
      else {
        console.error("[LavaTube] file can't be opened: " + htmlTemplate);
      }

    });
  }


  //
  // insert template after element by id
  //

  insertBeforeToArea (areaName, beforeElementQuery, htmlTemplate, htmlData = [], callback = null) {
    let self = this;

    if (self.emptyOrUndefined(areaName)) {
      throw "passed areaName(1st arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlTemplate)) {
      throw "passed htmlTemplate(2nd arg) can't be empty or undefined"
    }

    if (self.emptyOrUndefined(htmlData)) {
      throw "passed htmlData(3rd arg) can't be undefined"
    }

    let areaElem = document.querySelector("[lavatube-area='"+areaName+"']");
    if (areaElem === undefined || areaElem == null) {
      console.error("[LavaTube] '"+areaName+"' area name doesnt exist in: " + self.currentlyRendering);
      return;
    }

    self.lilframe.getFileOnce(htmlTemplate, (data) => {

      if (data) {
        let elemId = "ltpe-"+guidGenerator();

        let referenceNode = document.querySelector(beforeElementQuery);

        if (referenceNode) {
          let s = document.createElement('span');
          s.id = elemId;
          s.innerHTML = data;

          referenceNode.parentNode.insertBefore(s, referenceNode);
          self.parse(areaElem.querySelector("#"+elemId), htmlData);
        } else {
          console.error("[LavaTube] element '"+beforeElementQuery+"' in area '"+areaName+"' doesnt exist in: " + self.currentlyRendering);
        }

        if (callback != null) {
          callback(elemId);
        }
      } // if (data)
      else {
        console.error("[LavaTube] file can't be opened: " + htmlTemplate);
      }

    });
  }



  //
  // lavatube parse html attributes
  //

  parse (renderer, htmlData = []) {
    let self = this;

    let regexSearchVariable = /{{(.*?)}}/g;
    let regexMatch;


    // search {{ variable names }}
    let renderer_innerHTML = renderer.innerHTML;
    regexMatch = regexSearchVariable.exec(renderer_innerHTML);
    while (regexMatch != null) {

      let regexMatch_1 = regexMatch[0];
      for (let key of Object.keys(htmlData)) {
        // check var names to replace
        // and replace all possible var names
        let regex = new RegExp('('+key+'(_|))([^a-zA-z0-9]|)', 'g');
        let match = regex.exec(regexMatch[1]);

        if (match == null) {
          continue;
        }
        
        // NOTICE: dunno why buut regex raplce isnt working as expected
        //console.log(regexMatch);
        //console.log(regexMatch_1);
        //console.log(regexMatch_1.replace(regex, "htmlData['"+key+"']$3"));

        regexMatch_1 = regexMatch_1.replace(regex, "htmlData['"+key+"']$3");
      }

      renderer.innerHTML = renderer.innerHTML.replace(regexMatch[0], regexMatch_1);

      regexMatch = regexSearchVariable.exec(renderer_innerHTML);
    }

    // search for lavatube-foreach
    let foreachLoops = renderer.querySelectorAll("[lavatube-foreach]");
    if (foreachLoops !== undefined) {
      for (let loopElem of foreachLoops) {

        // just remove unnecessary strings
        let attr = loopElem.getAttribute("lavatube-foreach").trim();
        attr = attr.replace("var ", "").replace("let ", "");

        if (attr === "") {
          console.error("[LavaTube] empty lavatube-foreachs: " + self.currentlyRendering);
          continue;
        }

        let splits = attr.split(' in ');
        let keyFromHtmlData = splits[1];
        let keyToReplace = splits[0];

        let parentNode = loopElem.parentNode;
        let lastEelem = loopElem;

        for (let key of Object.keys(htmlData)) {
          if (key === keyFromHtmlData) {

            for (let i = 0; i < htmlData[key].length; i++) {

              // clone template node and remove lavatibe-foreach attr
              let node = loopElem.cloneNode(true);
              node.removeAttribute("lavatube-foreach");


              // search element inner html to replace {{ data }}
              let node_innerHTML = node.innerHTML;
              regexMatch = regexSearchVariable.exec(node_innerHTML);
              while (regexMatch != null) {

                let regex = new RegExp('('+keyToReplace+'(_|))([^a-zA-z0-9]|$)', 'g');
                let match = regex.exec(regexMatch[1]);

                if (match != null) {
                  let newLavaTubeFormula = regexMatch[0].replace(regex, "htmlData['"+key+"']["+i+"]$3");
                  node.innerHTML = node.innerHTML.replaceAll(regexMatch[0], newLavaTubeFormula);
                }

                regexMatch = regexSearchVariable.exec(node_innerHTML);
              }

              // also check every attribute to replace {{ data }}
              for (let attr of node.attributes) {
                let attr_value = attr.value;
                regexMatch = regexSearchVariable.exec(attr_value);
                while (regexMatch != null) {

                  let regex = new RegExp('('+keyToReplace+'(_|))([^a-zA-z0-9]|$)', 'g');
                  let match = regex.exec(regexMatch[1]);

                  if (match != null) {
                    let newLavaTubeFormula = regexMatch[0].replace(regex, "htmlData['"+key+"']["+i+"]$3");
                    attr.value = attr.value.replaceAll(regexMatch[0], newLavaTubeFormula);
                  }

                  regexMatch = regexSearchVariable.exec(attr_value);
                }
              }

              parentNode.insertBefore(node, lastEelem.nextSibling);
              lastEelem = node;
            }

            break;
          }
        }

        // remove template one
        loopElem.remove();
      } // for (let loopElem of foreachLoops)
    }

    // execute {{ var names }} built by above code
    renderer_innerHTML = renderer.innerHTML;
    regexMatch = regexSearchVariable.exec(renderer_innerHTML);
    while (regexMatch != null) {
      try {
        renderer.innerHTML = renderer.innerHTML.replace(regexMatch[0], eval(regexMatch[1]));
      } catch (e) {
        // TODO: show also where we got that error
        console.error(e.message);
      }
      regexMatch = regexSearchVariable.exec(renderer_innerHTML);
    }

    // lavatube-if
    let ifElems = renderer.querySelectorAll("[lavatube-if]");
    if (ifElems !== undefined) {
      for (let elem of ifElems) {
        let attrValue = elem.getAttribute("lavatube-if");

        if (attrValue === "") {
          console.error("[LavaTube] empty lavatube-if in : " + self.currentlyRendering);
          continue;
        }

        // check every var to see if we can replace its name in template to execute
        for (let key of Object.keys(htmlData)) {
          let regex = new RegExp('('+key+'(_|))([^a-zA-z0-9]|$)', 'g');
          let match = regex.exec(attrValue);

          if (match == null) {
            continue;
          }

          let regexQuotes = new RegExp("'.*?'", 'g');
          let matchQuotes = regexQuotes.exec(attrValue);

          let storedQuotes = [];
          while (matchQuotes != null) {
            let storeId = "%%" + storedQuotes.length + "%%";
            storedQuotes.push({id: storeId, match: matchQuotes});
            matchQuotes = regexQuotes.exec(attrValue);
          }

          for (let storedQuote of storedQuotes) {
            attrValue = attrValue.replace(storedQuote.match[0], storedQuote.id);
          }

          attrValue = attrValue.replace(regex, "htmlData['"+key+"']$3");

          for (let storedQuote of storedQuotes) {
            attrValue = attrValue.replace(storedQuote.id, storedQuote.match[0]);
          }

        }


        for (let errorsCounter = 0; errorsCounter < 10; errorsCounter++) {
          try {
            // if its statement we success then we just remove lavatube-if attribute
            // else we delete model
            if (eval(attrValue)) {
              elem.removeAttribute("lavatube-if");
            } else {
              elem.remove();
            }
          } catch (e) {

            // different web engined show error differently
            if (e.message.indexOf("is not defined") !== -1) {
              console.log("[LavaTube] NOTICE: parse - " + e.message);

              let varToUndefine = e.message.split(" ")[0];
              let regex = new RegExp('('+varToUndefine+'(_|))([^a-zA-z0-9]|$)', 'g');
              attrValue = attrValue.replace(regex, "undefined$3");

              continue;
            } else if (e.message.indexOf("Can't find variable") !== -1) {
              console.log("[LavaTube] NOTICE: parse - " + e.message);

              let varToUndefine = e.message.split(": ")[1];
              let regex = new RegExp('('+varToUndefine+'(_|))([^a-zA-z0-9]|$)', 'g');
              attrValue = attrValue.replace(regex, "undefined$3");

              continue;
            }

            console.error("[LavaTube] ERROR: parse - " + e.message);
            console.log("[LavaTube] LOG: statement - " + attrValue);
            console.log("[LavaTube] LOG: from - " + elem.outerHTML.substr(0, elem.outerHTML.indexOf(">") +1));

          }

          break;

        }

      } // for (let elem of onListenerElems)
    }

    // lavatube-onchange, lavatube-oninput and so more events
    for (let onListener of ["onclick", "onchange", "oninput", "oncut", "oncopy", "onpaste", "onkeypress", "onkeyup", "onkeydown"]) {
      let onListenerElems = renderer.querySelectorAll("[lavatube-"+onListener+"]");
      if (onListenerElems !== undefined) {
        for (let elem of onListenerElems) {
          let attr = elem.getAttribute("lavatube-"+onListener);
          elem.removeAttribute("lavatube-"+onListener);

          if (attr === "") {
            console.error("[LavaTube] empty lavatube-"+onListener+" in : " + self.currentlyRendering);
            continue;
          }

          let regex = /(.*?)\(/g;
          let methodName = regex.exec(attr)[1];

          elem.setAttribute(onListener,  "lavaTubeGlobal.methods['"+methodName+"']" + attr.substr(methodName.length));
        } // for (let elem of onListenerElems)
      }
    }

    // lavatube-while, so something until
    let whileElems = renderer.querySelectorAll("[lavatube-while]");
    if (whileElems !== undefined) {
      whileElems.forEach((elem) => {
        let attrValue = elem.getAttribute("lavatube-while");

        let selfBuf = this;
        self = elem;

        let regex = /^.*?\[(.*?)\]/g;
        let regex2 = /^.*?\](.*)/g;
        let statement = regex.exec(attrValue)[1];
        let expression = regex2.exec(attrValue)[1];

        while (eval(statement)) {
          eval(expression);
        }

        self = selfBuf;
      });
    }

    // lavatube-template, load default template to element
    let templateElems = renderer.querySelectorAll("[lavatube-template]");
    if (templateElems !== undefined) {
      templateElems.forEach((elem) => {
        let templatePath = elem.getAttribute("lavatube-template");

        self.lilframe.getFileOnce(templatePath, (data) => {
          if (data) {
            elem.innerHTML = data;
            self.parse(elem, htmlData);
          } // if (data)
          else {
            console.error("[LavaTube] file can't be opened: " + templatePath);
          }

        });

      });
    }
  }

  //
  // onMethod
  //

  onMethod (methods) {
    for (let key of Object.keys(methods)) {
      lavaTubeGlobal.methods[key] = methods[key];
    }
  }



  //
  // onHref
  //
  onHref (callback) {
    lavaTubeGlobal.onHrefCallback = callback;
  }


  //
  // remove elem
  //

  removeElem (query) {
    let self = this;

    let elem = document.querySelector(query);
    if (elem) {
      elem.remove();
    } else {
      console.warn("[LavaTube] WARNING: removeElem - element query '" + query + "' doesn't exists at: " + self.currentlyRendering);
    }
  }
}
