

/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/lib/Promise.coffee ---- */


(function() {
  var Promise,
    __slice = [].slice;

  Promise = (function() {
    Promise.when = function() {
      var args, num_uncompleted, promise, task, task_id, tasks, _fn, _i, _len;
      tasks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      num_uncompleted = tasks.length;
      args = new Array(num_uncompleted);
      promise = new Promise();
      _fn = function(task_id) {
        return task.then(function() {
          args[task_id] = Array.prototype.slice.call(arguments);
          num_uncompleted--;
          if (num_uncompleted === 0) {
            return promise.complete.apply(promise, args);
          }
        });
      };
      for (task_id = _i = 0, _len = tasks.length; _i < _len; task_id = ++_i) {
        task = tasks[task_id];
        _fn(task_id);
      }
      return promise;
    };

    function Promise() {
      this.resolved = false;
      this.end_promise = null;
      this.result = null;
      this.callbacks = [];
    }

    Promise.prototype.resolve = function() {
      var back, callback, _i, _len, _ref;
      if (this.resolved) {
        return false;
      }
      this.resolved = true;
      this.data = arguments;
      if (!arguments.length) {
        this.data = [true];
      }
      this.result = this.data[0];
      _ref = this.callbacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        back = callback.apply(callback, this.data);
      }
      if (this.end_promise) {
        return this.end_promise.resolve(back);
      }
    };

    Promise.prototype.fail = function() {
      return this.resolve(false);
    };

    Promise.prototype.then = function(callback) {
      if (this.resolved === true) {
        callback.apply(callback, this.data);
        return;
      }
      this.callbacks.push(callback);
      return this.end_promise = new Promise();
    };

    return Promise;

  })();

  window.Promise = Promise;


  /*
  s = Date.now()
  log = (text) ->
  	console.log Date.now()-s, Array.prototype.slice.call(arguments).join(", ")
  
  log "Started"
  
  cmd = (query) ->
  	p = new Promise()
  	setTimeout ( ->
  		p.resolve query+" Result"
  	), 100
  	return p
  
  back = cmd("SELECT * FROM message").then (res) ->
  	log res
  	return "Return from query"
  .then (res) ->
  	log "Back then", res
  
  log "Query started", back
   */

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/lib/Property.coffee ---- */


(function() {
  Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/lib/maquette.js ---- */


(function (global) {

  "use strict";


  // Utilities

  var emptyArray = [];

  var extend = function (base, overrides) {
    var result = {};
    Object.keys(base).forEach(function (key) {
      result[key] = base[key];
    });
    if(overrides) {
      Object.keys(overrides).forEach(function (key) {
        result[key] = overrides[key];
      });
    }
    return result;
  };

  // Hyperscript helper functions

  var appendChildren = function (parentSelector, insertions, main) {
    for(var i = 0; i < insertions.length; i++) {
      var item = insertions[i];
      if(Array.isArray(item)) {
        appendChildren(parentSelector, item, main);
      } else {
        if(item !== null && item !== undefined) {
          if(!item.hasOwnProperty("vnodeSelector")) {
            item = toTextVNode(item);
          }
          main.push(item);
        }
      }
    }
  };

  var toTextVNode = function (data) {
    return {
      vnodeSelector: "",
      properties: undefined,
      children: undefined,
      text: (data === null || data === undefined) ? "" : data.toString(),
      domNode: null
    };
  };

  // Render helper functions

  var missingTransition = function() {
    throw new Error("Provide a transitions object to the projectionOptions to do animations");
  };

  var defaultProjectionOptions = {
    namespace: undefined,
    eventHandlerInterceptor: undefined,
    styleApplyer: function(domNode, styleName, value) {
      // Provides a hook to add vendor prefixes for browsers that still need it.
      domNode.style[styleName] = value;
    },
    transitions: {
      enter: missingTransition,
      exit: missingTransition
    }
  };

  var applyDefaultProjectionOptions = function (projectionOptions) {
    return extend(defaultProjectionOptions, projectionOptions);
  };

  var setProperties = function (domNode, properties, projectionOptions) {
    if(!properties) {
      return;
    }
    var eventHandlerInterceptor = projectionOptions.eventHandlerInterceptor;
    for(var propName in properties) {
      var propValue = properties[propName];
      if(propName === "class" || propName === "className" || propName === "classList") {
        throw new Error("Property " + propName + " is not supported, use 'classes' instead.");
      } else if(propName === "classes") {
        // object with string keys and boolean values
        for(var className in propValue) {
          if(propValue[className]) {
            domNode.classList.add(className);
          }
        }
      } else if(propName === "styles") {
        // object with string keys and string (!) values
        for(var styleName in propValue) {
          var styleValue = propValue[styleName];
          if(styleValue) {
            if(typeof styleValue !== "string") {
              throw new Error("Style values may only be strings");
            }
            projectionOptions.styleApplyer(domNode, styleName, styleValue);
          }
        }
      } else if(propName === "key") {
        continue;
      } else if(propValue === null || propValue === undefined) {
        continue;
      } else {
        var type = typeof propValue;
        if(type === "function") {
          if(eventHandlerInterceptor && (propName.lastIndexOf("on", 0) === 0)) { // lastIndexOf(,0)===0 -> startsWith
            propValue = eventHandlerInterceptor(propName, propValue, domNode, properties); // intercept eventhandlers
            if(propName === "oninput") {
              (function () {
                // record the evt.target.value, because IE sometimes does a requestAnimationFrame between changing value and running oninput
                var oldPropValue = propValue;
                propValue = function (evt) {
                  evt.target["oninput-value"] = evt.target.value;
                  oldPropValue.apply(this, [evt]);
                };
              }());
            }
          }
          domNode[propName] = propValue;
        } else if(type === "string" && propName !== "value") {
          domNode.setAttribute(propName, propValue);
        } else {
          domNode[propName] = propValue;
        }
      }
    }
  };

  var updateProperties = function (domNode, previousProperties, properties, projectionOptions) {
    if(!properties) {
      return;
    }
    var propertiesUpdated = false;
    for(var propName in properties) {
      // assuming that properties will be nullified instead of missing is by design
      var propValue = properties[propName];
      var previousValue = previousProperties[propName];
      if(propName === "classes") {
        var classList = domNode.classList;
        for(var className in propValue) {
          var on = !!propValue[className];
          var previousOn = !!previousValue[className];
          if(on === previousOn) {
            continue;
          }
          propertiesUpdated = true;
          if(on) {
            classList.add(className);
          } else {
            classList.remove(className);
          }
        }
      } else if(propName === "styles") {
        for(var styleName in propValue) {
          var newStyleValue = propValue[styleName];
          var oldStyleValue = previousValue[styleName];
          if(newStyleValue === oldStyleValue) {
            continue;
          }
          propertiesUpdated = true;
          if(newStyleValue) {
            if(typeof newStyleValue !== "string") {
              throw new Error("Style values may only be strings");
            }
            projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
          } else {
            projectionOptions.styleApplyer(domNode, styleName, "");
          }
        }
      } else {
        if(!propValue && typeof previousValue === "string") {
          propValue = "";
        }
        if(propName === "value") { // value can be manipulated by the user directly and using event.preventDefault() is not an option
          if(domNode[propName] !== propValue && domNode["oninput-value"] !== propValue) {
            domNode[propName] = propValue; // Reset the value, even if the virtual DOM did not change
            domNode["oninput-value"] = undefined;
          } // else do not update the domNode, otherwise the cursor position would be changed
          if(propValue !== previousValue) {
            propertiesUpdated = true;
          }
        } else if(propValue !== previousValue) {
          var type = typeof propValue;
          if(type === "function") {
            throw new Error("Functions may not be updated on subsequent renders (property: " + propName +
              "). Hint: declare event handler functions outside the render() function.");
          }
          if(type === "string") {
            domNode.setAttribute(propName, propValue);
          } else {
            if(domNode[propName] !== propValue) { // Comparison is here for side-effects in Edge with scrollLeft and scrollTop
              domNode[propName] = propValue;
            }
          }
          propertiesUpdated = true;
        }
      }
    }
    return propertiesUpdated;
  };

  var addChildren = function (domNode, children, projectionOptions) {
    if(!children) {
      return;
    }
    for(var i = 0; i < children.length; i++) {
      createDom(children[i], domNode, undefined, projectionOptions);
    }
  };

  var same = function (vnode1, vnode2) {
    if(vnode1.vnodeSelector !== vnode2.vnodeSelector) {
      return false;
    }
    if(vnode1.properties && vnode2.properties) {
      return vnode1.properties.key === vnode2.properties.key;
    }
    return !vnode1.properties && !vnode2.properties;
  };

  var findIndexOfChild = function (children, sameAs, start) {
    if(sameAs.vnodeSelector !== "") {
      // Never scan for text-nodes
      for(var i = start; i < children.length; i++) {
        if(same(children[i], sameAs)) {
          return i;
        }
      }
    }
    return -1;
  };

  var nodeAdded = function (vNode, transitions) {
    if(vNode.properties) {
      var enterAnimation = vNode.properties.enterAnimation;
      if(enterAnimation) {
        if(typeof enterAnimation === "function") {
          enterAnimation(vNode.domNode, vNode.properties);
        } else {
          transitions.enter(vNode.domNode, vNode.properties, enterAnimation);
        }
      }
    }
  };

  var nodeToRemove = function (vNode, transitions) {
    var domNode = vNode.domNode;
    if(vNode.properties) {
      var exitAnimation = vNode.properties.exitAnimation;
      if(exitAnimation) {
        domNode.style.pointerEvents = "none";
        var removeDomNode = function () {
          if(domNode.parentNode) {
            domNode.parentNode.removeChild(domNode);
          }
        };
        if(typeof exitAnimation === "function") {
          exitAnimation(domNode, removeDomNode, vNode.properties);
          return;
        } else {
          transitions.exit(vNode.domNode, vNode.properties, exitAnimation, removeDomNode);
          return;
        }
      }
    }
    if(domNode.parentNode) {
      domNode.parentNode.removeChild(domNode);
    }
  };

  var checkDistinguishable = function(childNodes, indexToCheck, parentVNode, operation) {
    var childNode = childNodes[indexToCheck];
    if (childNode.vnodeSelector === "") {
      return; // Text nodes need not be distinguishable
    }
    var key = childNode.properties ? childNode.properties.key : undefined;
    if (!key) { // A key is just assumed to be unique
      for (var i = 0; i < childNodes.length; i++) {
        if (i !== indexToCheck) {
          var node = childNodes[i];
          if (same(node, childNode)) {
            if (operation === "added") {
              throw new Error(parentVNode.vnodeSelector + " had a " + childNode.vnodeSelector + " child " +
                "added, but there is now more than one. You must add unique key properties to make them distinguishable.");
            } else {
              throw new Error(parentVNode.vnodeSelector + " had a " + childNode.vnodeSelector + " child " +
                "removed, but there were more than one. You must add unique key properties to make them distinguishable.");
            }
          }
        }
      }
    }
  };

  var updateChildren = function (vnode, domNode, oldChildren, newChildren, projectionOptions) {
    if(oldChildren === newChildren) {
      return false;
    }
    oldChildren = oldChildren || emptyArray;
    newChildren = newChildren || emptyArray;
    var oldChildrenLength = oldChildren.length;
    var newChildrenLength = newChildren.length;
    var transitions = projectionOptions.transitions;

    var oldIndex = 0;
    var newIndex = 0;
    var i;
    var textUpdated = false;
    while(newIndex < newChildrenLength) {
      var oldChild = (oldIndex < oldChildrenLength) ? oldChildren[oldIndex] : undefined;
      var newChild = newChildren[newIndex];
      if(oldChild !== undefined && same(oldChild, newChild)) {
        textUpdated = updateDom(oldChild, newChild, projectionOptions) || textUpdated;
        oldIndex++;
      } else {
        var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
        if(findOldIndex >= 0) {
          // Remove preceding missing children
          for(i = oldIndex; i < findOldIndex; i++) {
            nodeToRemove(oldChildren[i], transitions);
            checkDistinguishable(oldChildren, i, vnode, "removed");
          }
          textUpdated = updateDom(oldChildren[findOldIndex], newChild, projectionOptions) || textUpdated;
          oldIndex = findOldIndex + 1;
        } else {
          // New child
          createDom(newChild, domNode, (oldIndex < oldChildrenLength) ? oldChildren[oldIndex].domNode : undefined, projectionOptions);
          nodeAdded(newChild, transitions);
          checkDistinguishable(newChildren, newIndex, vnode, "added");
        }
      }
      newIndex++;
    }
    if(oldChildrenLength > oldIndex) {
      // Remove child fragments
      for(i = oldIndex; i < oldChildrenLength; i++) {
        nodeToRemove(oldChildren[i], transitions);
        checkDistinguishable(oldChildren, i, vnode, "removed");
      }
    }
    return textUpdated;
  };

  var createDom = function (vnode, parentNode, insertBefore, projectionOptions) {
    var domNode, i, c, start = 0, type, found;
    var vnodeSelector = vnode.vnodeSelector;
    if(vnodeSelector === "") {
      domNode = vnode.domNode = document.createTextNode(vnode.text);
      if(insertBefore !== undefined) {
        parentNode.insertBefore(domNode, insertBefore);
      } else {
        parentNode.appendChild(domNode);
      }
    } else {
      for (i = 0; i <= vnodeSelector.length; ++i) {
        c = vnodeSelector.charAt(i);
        if (i === vnodeSelector.length || c === '.' || c === '#') {
          type = vnodeSelector.charAt(start - 1);
          found = vnodeSelector.slice(start, i);
          if (type === ".") {
            domNode.classList.add(found);
          } else if (type === "#") {
            domNode.id = found;
          } else {
            if (found === "svg") {
              projectionOptions = extend(projectionOptions, { namespace: "http://www.w3.org/2000/svg" });
            }
            if (projectionOptions.namespace !== undefined) {
              domNode = vnode.domNode = document.createElementNS(projectionOptions.namespace, found);
            } else {
              domNode = vnode.domNode = document.createElement(found);
            }
            if (insertBefore !== undefined) {
              parentNode.insertBefore(domNode, insertBefore);
            } else {
              parentNode.appendChild(domNode);
            }
          }
          start = i + 1;
        }
      }
      initPropertiesAndChildren(domNode, vnode, projectionOptions);
    }
  };

  var initPropertiesAndChildren = function (domNode, vnode, projectionOptions) {
    addChildren(domNode, vnode.children, projectionOptions); // children before properties, needed for value property of <select>.
    if(vnode.text) {
      domNode.textContent = vnode.text;
    }
    setProperties(domNode, vnode.properties, projectionOptions);
    if(vnode.properties && vnode.properties.afterCreate) {
      vnode.properties.afterCreate(domNode, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children);
    }
  };

  var updateDom = function (previous, vnode, projectionOptions) {
    var domNode = previous.domNode;
    if(!domNode) {
      throw new Error("previous node was not rendered");
    }
    var textUpdated = false;
    if(previous === vnode) {
      return textUpdated; // we assume that nothing has changed
    }
    var updated = false;
    if(vnode.vnodeSelector === "") {
      if(vnode.text !== previous.text) {
        domNode.nodeValue = vnode.text;
        textUpdated = true;
      }
    } else {
      if(vnode.vnodeSelector.lastIndexOf("svg", 0) === 0) { // lastIndexOf(needle,0)===0 means StartsWith
        projectionOptions = extend(projectionOptions, { namespace: "http://www.w3.org/2000/svg" });
      }
      if(previous.text !== vnode.text) {
        updated = true;
        if(vnode.text === undefined) {
          domNode.removeChild(domNode.firstChild); // the only textnode presumably
        } else {
          domNode.textContent = vnode.text;
        }
      }
      updated = updateChildren(vnode, domNode, previous.children, vnode.children, projectionOptions) || updated;
      updated = updateProperties(domNode, previous.properties, vnode.properties, projectionOptions) || updated;
      if(vnode.properties && vnode.properties.afterUpdate) {
        vnode.properties.afterUpdate(domNode, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children);
      }
    }
    if(updated && vnode.properties && vnode.properties.updateAnimation) {
      vnode.properties.updateAnimation(domNode, vnode.properties, previous.properties);
    }
    vnode.domNode = previous.domNode;
    return textUpdated;
  };

  /**
   * Represents a {@link VNode} tree that has been rendered to a real DOM tree.
   * @interface Projection
   */
  var createProjection = function (vnode, projectionOptions) {
    if(!vnode.vnodeSelector) {
      throw new Error("Invalid vnode argument");
    }
    return {
      /**
       * Updates the projection with the new virtual DOM tree.
       * @param {VNode} updatedVnode - The updated virtual DOM tree. Note: The selector for the root of the tree must remain constant.
       * @memberof Projection#
       */
      update: function (updatedVnode) {
        if(vnode.vnodeSelector !== updatedVnode.vnodeSelector) {
          throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");
        }
        updateDom(vnode, updatedVnode, projectionOptions);
        vnode = updatedVnode;
      },
      /**
       * The DOM node that is used as the root of this {@link Projection}.
       * @type {Element}
       * @memberof Projection#
       */
      domNode: vnode.domNode
    };
  };

  // Declaration of interfaces and callbacks, before the @exports maquette

  /**
   * A virtual representation of a DOM Node. Maquette assumes that {@link VNode} objects are never modified externally.
   * Instances of {@link VNode} can be created using {@link module:maquette.h}.
   * @interface VNode
   */

  /**
   * A CalculationCache object remembers the previous outcome of a calculation along with the inputs.
   * On subsequent calls the previous outcome is returned if the inputs are identical.
   * This object can be used to bypass both rendering and diffing of a virtual DOM subtree.
   * Instances of {@link CalculationCache} can be created using {@link module:maquette.createCache}.
   * @interface CalculationCache
   */

  /**
   * Keeps an array of result objects synchronized with an array of source objects.
   * Mapping provides a {@link Mapping#map} function that updates the {@link Mapping#results}.
   * The {@link Mapping#map} function can be called multiple times and the results will get created, removed and updated accordingly.
   * A {@link Mapping} can be used to keep an array of components (objects with a `renderMaquette` method) synchronized with an array of data.
   * Instances of {@link Mapping} can be created using {@link module:maquette.createMapping}.
   * @interface Mapping
   */

  /**
   * Used to create and update the DOM.
   * Use {@link Projector#append}, {@link Projector#merge}, {@link Projector#insertBefore} and {@link Projector#replace}
   * to create the DOM.
   * The `renderMaquetteFunction` callbacks will be called immediately to create the DOM. Afterwards, these functions
   * will be called again to update the DOM on the next animation-frame after:
   *
   *  - The {@link Projector#scheduleRender} function  was called
   *  - An event handler (like `onclick`) on a rendered {@link VNode} was called.
   *
   * The projector stops when {@link Projector#stop} is called or when an error is thrown during rendering.
   * It is possible to use `window.onerror` to handle these errors.
   * Instances of {@link Projector} can be created using {@link module:maquette.createProjector}.
   * @interface Projector
   */

  /**
   * @callback enterAnimationCallback
   * @param {Element} element - Element that was just added to the DOM.
   * @param {Object} properties - The properties object that was supplied to the {@link module:maquette.h} method
   */

  /**
   * @callback exitAnimationCallback
   * @param {Element} element - Element that ought to be removed from to the DOM.
   * @param {function(Element)} removeElement - Function that removes the element from the DOM.
   * This argument is supplied purely for convenience.
   * You may use this function to remove the element when the animation is done.
   * @param {Object} properties - The properties object that was supplied to the {@link module:maquette.h} method that rendered this {@link VNode} the previous time.
   */

  /**
   * @callback updateAnimationCallback
   * @param {Element} element - Element that was modified in the DOM.
   * @param {Object} properties - The last properties object that was supplied to the {@link module:maquette.h} method
   * @param {Object} previousProperties - The previous properties object that was supplied to the {@link module:maquette.h} method
   */

  /**
   * @callback afterCreateCallback
   * @param {Element} element - The element that was added to the DOM.
   * @param {Object} projectionOptions - The projection options that were used see {@link module:maquette.createProjector}.
   * @param {string} vnodeSelector - The selector passed to the {@link module:maquette.h} function.
   * @param {Object} properties - The properties passed to the {@link module:maquette.h} function.
   * @param {VNode[]} children - The children that were created.
   * @param {Object} properties - The last properties object that was supplied to the {@link module:maquette.h} method
   * @param {Object} previousProperties - The previous properties object that was supplied to the {@link module:maquette.h} method
   */

  /**
   * @callback afterUpdateCallback
   * @param {Element} element - The element that may have been updated in the DOM.
   * @param {Object} projectionOptions - The projection options that were used see {@link module:maquette.createProjector}.
   * @param {string} vnodeSelector - The selector passed to the {@link module:maquette.h} function.
   * @param {Object} properties - The properties passed to the {@link module:maquette.h} function.
   * @param {VNode[]} children - The children for this node.
   */

  /**
   * Contains simple low-level utility functions to manipulate the real DOM. The singleton instance is available under {@link module:maquette.dom}.
   * @interface MaquetteDom
   */

  /**
   * The main object in maquette is the maquette object.
   * It is either bound to `window.maquette` or it can be obtained using {@link http://browserify.org/|browserify} or {@link http://requirejs.org/|requirejs}.
   * @exports maquette
   */
  var maquette = {

    /**
     * The `h` method is used to create a virtual DOM node.
     * This function is largely inspired by the mercuryjs and mithril frameworks.
     * The `h` stands for (virtual) hyperscript.
     *
     * @param {string} selector - Contains the tagName, id and fixed css classnames in CSS selector format.
     * It is formatted as follows: `tagname.cssclass1.cssclass2#id`.
     * @param {Object} [properties] - An object literal containing properties that will be placed on the DOM node.
     * @param {function} properties.<b>*</b> - Properties with functions values like `onclick:handleClick` are registered as event handlers
     * @param {String} properties.<b>*</b> - Properties with string values, like `href:"/"` are used as attributes
     * @param {object} properties.<b>*</b> - All non-string values are put on the DOM node as properties
     * @param {Object} properties.key - Used to uniquely identify a DOM node among siblings.
     * A key is required when there are more children with the same selector and these children are added or removed dynamically.
     * @param {Object} properties.classes - An object literal like `{important:true}` which allows css classes, like `important` to be added and removed dynamically.
     * @param {Object} properties.styles - An object literal like `{height:"100px"}` which allows styles to be changed dynamically. All values must be strings.
     * @param {(string|enterAnimationCallback)} properties.enterAnimation - The animation to perform when this node is added to an already existing parent.
     * {@link http://maquettejs.org/docs/animations.html|More about animations}.
     * When this value is a string, you must pass a `projectionOptions.transitions` object when creating the projector {@link module:maquette.createProjector}.
     * @param {(string|exitAnimationCallback)} properties.exitAnimation - The animation to perform when this node is removed while its parent remains.
     * When this value is a string, you must pass a `projectionOptions.transitions` object when creating the projector {@link module:maquette.createProjector}.
     * {@link http://maquettejs.org/docs/animations.html|More about animations}.
     * @param {updateAnimationCallback} properties.updateAnimation - The animation to perform when the properties of this node change.
     * This also includes attributes, styles, css classes. This callback is also invoked when node contains only text and that text changes.
     * {@link http://maquettejs.org/docs/animations.html|More about animations}.
     * @param {afterCreateCallback} properties.afterCreate - Callback that is executed after this node is added to the DOM. Childnodes and properties have already been applied.
     * @param {afterUpdateCallback} properties.afterUpdate - Callback that is executed every time this node may have been updated. Childnodes and properties have already been updated.
     * @param {Object[]} [children] - An array of virtual DOM nodes to add as child nodes.
     * This array may contain nested arrays, `null` or `undefined` values.
     * Nested arrays are flattened, `null` and `undefined` will be skipped.
     *
     * @returns {VNode} A VNode object, used to render a real DOM later. NOTE: There are {@link http://maquettejs.org/docs/rules.html|three basic rules} you should be aware of when updating the virtual DOM.
     */
    h: function (selector, properties, childrenArgs) {
      if (typeof selector !== "string") {
        throw new Error();
      }
      var childIndex = 1;
      if (properties && !properties.hasOwnProperty("vnodeSelector") && !Array.isArray(properties) && typeof properties === "object") {
        childIndex = 2;
      } else {
        // Optional properties argument was omitted
        properties = undefined;
      }
      var text = undefined;
      var children = undefined;
      var argsLength = arguments.length;
      // Recognize a common special case where there is only a single text node
      if(argsLength === childIndex + 1) {
        var onlyChild = arguments[childIndex];
        if (typeof onlyChild === "string") {
          text = onlyChild;
        } else if (onlyChild !== undefined && onlyChild.length === 1 && typeof onlyChild[0] === "string") {
          text = onlyChild[0];
        }
      }
      if (text === undefined) {
        children = [];
        for (;childIndex<arguments.length;childIndex++) {
          var child = arguments[childIndex];
          if(child === null || child === undefined) {
            continue;
          } else if(Array.isArray(child)) {
            appendChildren(selector, child, children);
          } else if(child.hasOwnProperty("vnodeSelector")) {
            children.push(child);
          } else {
            children.push(toTextVNode(child));
          }
        }
      }
      return {
        /**
         * The CSS selector containing tagname, css classnames and id. An empty string is used to denote a text node.
         * @memberof VNode#
         */
        vnodeSelector: selector,
        /**
         * Object containing attributes, properties, event handlers and more @see module:maquette.h
         * @memberof VNode#
         */
        properties: properties,
        /**
         * Array of VNodes to be used as children. This array is already flattened.
         * @memberof VNode#
         */
        children: children,
        /**
         * Used in a special case when a VNode only has one childnode which is a textnode. Only used in combination with children === undefined.
         * @memberof VNode#
         */
        text: text,
        /**
         * Used by maquette to store the domNode that was produced from this {@link VNode}.
         * @memberof VNode#
         */
        domNode: null
      };
    },

    /**
     * @type MaquetteDom
     */
    dom: {
      /**
       * Creates a real DOM tree from a {@link VNode}. The {@link Projection} object returned will contain the resulting DOM Node under the {@link Projection#domNode} property.
       * This is a low-level method. Users wil typically use a {@link Projector} instead.
       * @memberof MaquetteDom#
       * @param {VNode} vnode - The root of the virtual DOM tree that was created using the {@link module:maquette.h} function. NOTE: {@link VNode} objects may only be rendered once.
       * @param {Object} projectionOptions - Options to be used to create and update the projection, see {@link module:maquette.createProjector}.
       * @returns {Projection} The {@link Projection} which contains the DOM Node that was created.
       */
      create: function (vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        createDom(vnode, document.createElement("div"), undefined, projectionOptions);
        return createProjection(vnode, projectionOptions);
      },

      /**
       * Appends a new childnode to the DOM which is generated from a {@link VNode}.
       * This is a low-level method. Users wil typically use a {@link Projector} instead.
       * @memberof MaquetteDom#
       * @param {Element} parentNode - The parent node for the new childNode.
       * @param {VNode} vnode - The root of the virtual DOM tree that was created using the {@link module:maquette.h} function. NOTE: {@link VNode} objects may only be rendered once.
       * @param {Object} projectionOptions - Options to be used to create and update the projection, see {@link module:maquette.createProjector}.
       * @returns {Projection} The {@link Projection} that was created.
       */
      append: function (parentNode, vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        createDom(vnode, parentNode, undefined, projectionOptions);
        return createProjection(vnode, projectionOptions);
      },

      /**
       * Inserts a new DOM node which is generated from a {@link VNode}.
       * This is a low-level method. Users wil typically use a {@link Projector} instead.
       * @memberof MaquetteDom#
       * @param {Element} beforeNode - The node that the DOM Node is inserted before.
       * @param {VNode} vnode - The root of the virtual DOM tree that was created using the {@link module:maquette.h} function. NOTE: {@link VNode} objects may only be rendered once.
       * @param {Object} projectionOptions - Options to be used to create and update the projection, see {@link module:maquette.createProjector}.
       * @returns {Projection} The {@link Projection} that was created.
       */
      insertBefore: function(beforeNode, vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        createDom(vnode, beforeNode.parentNode, beforeNode, projectionOptions);
        return createProjection(vnode, projectionOptions);
      },

      /**
       * Merges a new DOM node which is generated from a {@link VNode} with an existing DOM Node.
       * This means that the virtual DOM and real DOM have one overlapping element.
       * Therefore the selector for the root {@link VNode} will be ignored, but its properties and children will be applied to the Element provided
       * This is a low-level method. Users wil typically use a {@link Projector} instead.
       * @memberof MaquetteDom#
       * @param {Element} domNode - The existing element to adopt as the root of the new virtual DOM. Existing attributes and childnodes are preserved.
       * @param {VNode} vnode - The root of the virtual DOM tree that was created using the {@link module:maquette.h} function. NOTE: {@link VNode} objects may only be rendered once.
       * @param {Object} projectionOptions - Options to be used to create and update the projection, see {@link module:maquette.createProjector}.
       * @returns {Projection} The {@link Projection} that was created.
       */
      merge: function (element, vnode, options) {
        options = applyDefaultProjectionOptions(options);
        vnode.domNode = element;
        initPropertiesAndChildren(element, vnode, options);
        return createProjection(vnode, options);
      }
    },

    /**
     * Creates a {@link CalculationCache} object, useful for caching {@link VNode} trees.
     * In practice, caching of {@link VNode} trees is not needed, because achieving 60 frames per second is almost never a problem.
     * @returns {CalculationCache}
     */
    createCache: function () {
      var cachedInputs = undefined;
      var cachedOutcome = undefined;
      var result = {
        /**
         * Manually invalidates the cached outcome.
         * @memberof CalculationCache#
         */
        invalidate: function () {
          cachedOutcome = undefined;
          cachedInputs = undefined;
        },
        /**
         * If the inputs array matches the inputs array from the previous invocation, this method returns the result of the previous invocation.
         * Otherwise, the calculation function is invoked and its result is cached and returned.
         * Objects in the inputs array are compared using ===.
         * @param {Object[]} inputs - Array of objects that are to be compared using === with the inputs from the previous invocation.
         * These objects are assumed to be immutable primitive values.
         * @param {function} calculation - Function that takes zero arguments and returns an object (A {@link VNode} assumably) that can be cached.
         * @memberof CalculationCache#
         */
        result: function (inputs, calculation) {
          if(cachedInputs) {
            for(var i = 0; i < inputs.length; i++) {
              if(cachedInputs[i] !== inputs[i]) {
                cachedOutcome = undefined;
              }
            }
          }
          if(!cachedOutcome) {
            cachedOutcome = calculation();
            cachedInputs = inputs;
          }
          return cachedOutcome;
        }
      };
      return result;
    },

    /**
     * Creates a {@link Mapping} instance that keeps an array of result objects synchronized with an array of source objects.
     * @param {function} getSourceKey - `function(source)` that must return a key to identify each source object. The result must eather be a string or a number.
     * @param {function} createResult - `function(source, index)` that must create a new result object from a given source. This function is identical argument of `Array.map`.
     * @param {function} updateResult - `function(source, target, index)` that updates a result to an updated source.
     * @returns {Mapping}
     */
    createMapping: function(getSourceKey, createResult, updateResult /*, deleteTarget*/) {
      var keys = [];
      var results = [];

      return {
        /**
         * The array of results. These results will be synchronized with the latest array of sources that were provided using {@link Mapping#map}.
         * @type {Object[]}
         * @memberof Mapping#
         */
        results: results,
        /**
         * Maps a new array of sources and updates {@link Mapping#results}.
         * @param {Object[]} newSources - The new array of sources.
         * @memberof Mapping#
         */
        map: function(newSources) {
          var newKeys = newSources.map(getSourceKey);
          var oldTargets = results.slice();
          var oldIndex = 0;
          for (var i=0;i<newSources.length;i++) {
            var source = newSources[i];
            var sourceKey = newKeys[i];
            if (sourceKey === keys[oldIndex]) {
              results[i] = oldTargets[oldIndex];
              updateResult(source, oldTargets[oldIndex], i);
              oldIndex++;
            } else {
              var found = false;
              for (var j = 1; j < keys.length; j++) {
                var searchIndex = (oldIndex + j) % keys.length;
                if (keys[searchIndex] === sourceKey) {
                  results[i] = oldTargets[searchIndex];
                  updateResult(newSources[i], oldTargets[searchIndex], i);
                  oldIndex = searchIndex + 1;
                  found = true;
                  break;
                }
              }
              if (!found) {
                results[i] = createResult(source, i);
              }
            }
          }
          results.length = newSources.length;
          keys = newKeys;
        }
      };
    },

    /**
     * Creates a {@link Projector} instance using the provided projectionOptions.
     * @param {Object} [projectionOptions] - Options that influence how the DOM is rendered and updated.
     * @param {Object} projectionOptions.transitions - A transition strategy to invoke when
     * enterAnimation and exitAnimation properties are provided as strings.
     * The module `cssTransitions` in the provided `css-transitions.js` file provides such a strategy.
     * A transition strategy is not needed when enterAnimation and exitAnimation properties are provided as functions.
     * @returns {Projector}
     */
    createProjector: function (projectionOptions) {
      projectionOptions = applyDefaultProjectionOptions(projectionOptions);
      projectionOptions.eventHandlerInterceptor = function (propertyName, functionPropertyArgument) {
        return function () {
          // intercept function calls (event handlers) to do a render afterwards.
          projector.scheduleRender();
          return functionPropertyArgument.apply(this, arguments);
        };
      };
      var renderCompleted = true;
      var scheduled;
      var stopped = false;
      var projections = [];
      var renderFunctions = []; // matches the projections array

      var doRender = function () {
        scheduled = undefined;
        if (!renderCompleted) {
          return; // The last render threw an error, it should be logged in the browser console.
        }
        var s = Date.now()
        renderCompleted = false;
        for(var i = 0; i < projections.length; i++) {
          var updatedVnode = renderFunctions[i]();
          projections[i].update(updatedVnode);
        }
        renderCompleted = true;
        if (Date.now()-s > 10)
          console.log("Render:", Date.now()-s)
      };

      var projector = {
        /**
         * Instructs the projector to re-render to the DOM at the next animation-frame using the registered `renderMaquette` functions.
         * This method is automatically called for you when event-handlers that are registered in the {@link VNode}s are invoked.
         * You need to call this method for instance when timeouts expire or AJAX responses arrive.
         * @memberof Projector#
         */
        scheduleRender: function () {
          if(!scheduled && !stopped) {
            scheduled = requestAnimationFrame(doRender);
          }
        },
        /**
         * Stops the projector. This means that the registered `renderMaquette` functions will not be called anymore.
         * Note that calling {@link Projector#stop} is not mandatory. A projector is a passive object that will get garbage collected as usual if it is no longer in scope.
         * @memberof Projector#
         */
        stop: function () {
          if(scheduled) {
            cancelAnimationFrame(scheduled);
            scheduled = undefined;
          }
          stopped = true;
        },
        /**
         * Resumes the projector. Use this method to resume rendering after stop was called or an error occurred during rendering.
         * @memberof Projector#
         */
        resume: function() {
          stopped = false;
          renderCompleted = true;
          projector.scheduleRender();
        },
        /**
         * Scans the document for `<script>` tags with `type="text/hyperscript"`.
         * The content of these scripts are registered as `renderMaquette` functions.
         * The result of evaluating these functions will be inserted into the DOM after the script.
         * These scripts can make use of variables that come from the `parameters` parameter.
         * @param {Element} rootNode - Element to start scanning at, example: `document.body`.
         * @param {Object} parameters - Variables to expose to the scripts. format: `{var1:value1, var2: value2}`
         * @memberof Projector#
         */
        evaluateHyperscript: function (rootNode, parameters) {
          var nodes = rootNode.querySelectorAll("script[type='text/hyperscript']");
          var functionParameters = ["maquette", "h", "enhancer"];
          var parameterValues = [maquette, maquette.h, projector];
          Object.keys(parameters).forEach(function (parameterName) {
            functionParameters.push(parameterName);
            parameterValues.push(parameters[parameterName]);
          });
          Array.prototype.forEach.call(nodes, function (node) {
            var func = new Function(functionParameters, "return " + node.textContent.trim());
            var renderFunction = function () {
              return func.apply(undefined, parameterValues);
            };
            projector.insertBefore(node, renderFunction);
          });
        },
        /**
         * Appends a new childnode to the DOM using the result from the provided `renderMaquetteFunction`.
         * The `renderMaquetteFunction` will be invoked again to update the DOM when needed.
         * @param {Element} parentNode - The parent node for the new childNode.
         * @param {function} renderMaquetteFunction - Function with zero arguments that returns a {@link VNode} tree.
         * @memberof Projector#
         */
        append: function (parentNode, renderMaquetteFunction) {
          projections.push(maquette.dom.append(parentNode, renderMaquetteFunction(), projectionOptions));
          renderFunctions.push(renderMaquetteFunction);
        },
        /**
         * Inserts a new DOM node using the result from the provided `renderMaquetteFunction`.
         * The `renderMaquetteFunction` will be invoked again to update the DOM when needed.
         * @param {Element} beforeNode - The node that the DOM Node is inserted before.
         * @param {function} renderMaquetteFunction - Function with zero arguments that returns a {@link VNode} tree.
         * @memberof Projector#
         */
        insertBefore: function (beforeNode, renderMaquetteFunction) {
          projections.push(maquette.dom.insertBefore(beforeNode, renderMaquetteFunction(), projectionOptions));
          renderFunctions.push(renderMaquetteFunction);
        },
        /**
         * Merges a new DOM node using the result from the provided `renderMaquetteFunction` with an existing DOM Node.
         * This means that the virtual DOM and real DOM have one overlapping element.
         * Therefore the selector for the root {@link VNode} will be ignored, but its properties and children will be applied to the Element provided
         * The `renderMaquetteFunction` will be invoked again to update the DOM when needed.
         * @param {Element} domNode - The existing element to adopt as the root of the new virtual DOM. Existing attributes and childnodes are preserved.
         * @param {function} renderMaquetteFunction - Function with zero arguments that returns a {@link VNode} tree.
         * @memberof Projector#
         */
        merge: function (domNode, renderMaquetteFunction) {
          projections.push(maquette.dom.merge(domNode, renderMaquetteFunction(), projectionOptions));
          renderFunctions.push(renderMaquetteFunction);
        },
        /**
         * Replaces an existing DOM node with the result from the provided `renderMaquetteFunction`.
         * The `renderMaquetteFunction` will be invoked again to update the DOM when needed.
         * @param {Element} domNode - The DOM node to replace.
         * @param {function} renderMaquetteFunction - Function with zero arguments that returns a {@link VNode} tree.
         * @memberof Projector#
         */
        replace: function (domNode, renderMaquetteFunction) {
          var vnode = renderMaquetteFunction();
          createDom(vnode, domNode.parentNode, domNode, projectionOptions);
          domNode.parentNode.removeChild(domNode);
          projections.push(createProjection(vnode, projectionOptions));
          renderFunctions.push(renderMaquetteFunction);
        }
      };
      return projector;
    }
  };

  if(typeof module !== "undefined" && module.exports) {
    // Node and other CommonJS-like environments that support module.exports
    module.exports = maquette;
  } else if(typeof define === "function" && define.amd) {
    // AMD / RequireJS
    define(function () {
      return maquette;
    });
  } else {
    // Browser
    window.maquette = maquette;
  }

})(this);



/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/Animation.coffee ---- */


(function() {
  var Animation;

  Animation = (function() {
    function Animation() {}

    Animation.prototype.slideDown = function(elem, props) {
      var cstyle, h, margin_bottom, margin_top, padding_bottom, padding_top, transition;
      h = elem.offsetHeight;
      cstyle = window.getComputedStyle(elem);
      margin_top = cstyle.marginTop;
      margin_bottom = cstyle.marginBottom;
      padding_top = cstyle.paddingTop;
      padding_bottom = cstyle.paddingBottom;
      transition = cstyle.transition;
      elem.style.boxSizing = "border-box";
      elem.style.overflow = "hidden";
      elem.style.transform = "scale(0.6)";
      elem.style.opacity = "0";
      elem.style.height = "0px";
      elem.style.marginTop = "0px";
      elem.style.marginBottom = "0px";
      elem.style.paddingTop = "0px";
      elem.style.paddingBottom = "0px";
      elem.style.transition = "none";
      setTimeout((function() {
        elem.className += " animate-inout";
        elem.style.height = h + "px";
        elem.style.transform = "scale(1)";
        elem.style.opacity = "1";
        elem.style.marginTop = margin_top;
        elem.style.marginBottom = margin_bottom;
        elem.style.paddingTop = padding_top;
        return elem.style.paddingBottom = padding_bottom;
      }), 1);
      return elem.addEventListener("transitionend", function() {
        elem.classList.remove("animate-inout");
        elem.style.transition = elem.style.transform = elem.style.opacity = elem.style.height = null;
        elem.style.boxSizing = elem.style.marginTop = elem.style.marginBottom = null;
        return elem.style.paddingTop = elem.style.paddingBottom = elem.style.overflow = null;
      });
    };

    Animation.prototype.slideUp = function(elem, remove_func, props) {
      elem.className += " animate-back";
      elem.style.boxSizing = "border-box";
      elem.style.height = elem.offsetHeight + "px";
      elem.style.overflow = "hidden";
      elem.style.transform = "scale(1)";
      elem.style.opacity = "1";
      elem.style.pointerEvents = "none";
      setTimeout((function() {
        elem.style.height = "0px";
        elem.style.marginTop = "0px";
        elem.style.marginBottom = "0px";
        elem.style.paddingTop = "0px";
        elem.style.paddingBottom = "0px";
        elem.style.transform = "scale(0.8)";
        elem.style.borderTopWidth = "0px";
        elem.style.borderBottomWidth = "0px";
        return elem.style.opacity = "0";
      }), 1);
      return elem.addEventListener("transitionend", function(e) {
        if (e.propertyName === "height") {
          return remove_func();
        }
      });
    };

    Animation.prototype.showRight = function(elem, props) {
      elem.className += " animate";
      elem.style.opacity = 0;
      elem.style.transform = "TranslateX(-20px) Scale(1.01)";
      setTimeout((function() {
        elem.style.opacity = 1;
        return elem.style.transform = "TranslateX(0px) Scale(1)";
      }), 1);
      return elem.addEventListener("transitionend", function() {
        elem.classList.remove("animate");
        return elem.style.transform = elem.style.opacity = null;
      });
    };

    Animation.prototype.show = function(elem, props) {
      var delay, direction, _ref, _ref1;
      delay = ((_ref = arguments[arguments.length - 1]) != null ? _ref.delay : void 0) * 1000 || 1;
      direction = ((_ref1 = arguments[arguments.length - 1]) != null ? _ref1.direction : void 0) || "down";
      elem.className += " animate";
      if (direction === "right") {
        elem.style.transform = "translateX(-20px)";
      } else if (direction === "left") {
        elem.style.transform = "translateX(20px)";
      } else if (direction === "none") {
        elem.style.transform = "";
      } else {
        elem.style.transform = "translateY(-20px)";
      }
      elem.style.opacity = 0;
      setTimeout((function() {
        elem.style.transform = "translateY(0px)";
        return elem.style.opacity = 1;
      }), delay);
      return elem.addEventListener("transitionend", function() {
        elem.classList.remove("animate");
        return elem.style.opacity = null;
      });
    };

    Animation.prototype.hide = function(elem, remove_func, props) {
      elem.className += " animate";
      setTimeout((function() {
        return elem.style.opacity = 0;
      }), 1);
      return setTimeout((function() {
        elem.style.opacity = 0;
        elem.classList.remove("animate");
        return remove_func();
      }), 300);
    };

    Animation.prototype.addVisibleClass = function(elem, props) {
      return setTimeout(function() {
        return elem.classList.add("visible");
      });
    };

    return Animation;

  })();

  window.Animation = new Animation();

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/Class.coffee ---- */


(function() {
  var Class,
    __slice = [].slice;

  Class = (function() {
    function Class() {}

    Class.prototype.trace = true;

    Class.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!this.trace) {
        return;
      }
      if (typeof console === 'undefined') {
        return;
      }
      args.unshift("[" + this.constructor.name + "]");
      console.log.apply(console, args);
      return this;
    };

    Class.prototype.logStart = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this.trace) {
        return;
      }
      this.logtimers || (this.logtimers = {});
      this.logtimers[name] = +(new Date);
      if (args.length > 0) {
        this.log.apply(this, ["" + name].concat(__slice.call(args), ["(started)"]));
      }
      return this;
    };

    Class.prototype.logEnd = function() {
      var args, ms, name;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      ms = +(new Date) - this.logtimers[name];
      this.log.apply(this, ["" + name].concat(__slice.call(args), ["(Done in " + ms + "ms)"]));
      return this;
    };

    return Class;

  })();

  window.Class = Class;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/Dollar.coffee ---- */


(function() {
  window.$ = function(selector) {
    if (selector.startsWith("#")) {
      return document.getElementById(selector.replace("#", ""));
    }
  };

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/ItemList.coffee ---- */


(function() {
  var ItemList;

  ItemList = (function() {
    function ItemList(_at_item_class, _at_key) {
      this.item_class = _at_item_class;
      this.key = _at_key;
      this.items = [];
      this.items_bykey = {};
    }

    ItemList.prototype.sync = function(rows, item_class, key) {
      var current_obj, item, row, _i, _len, _results;
      this.items.splice(0, this.items.length);
      _results = [];
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        current_obj = this.items_bykey[row[this.key]];
        if (current_obj) {
          current_obj.setRow(row);
          _results.push(this.items.push(current_obj));
        } else {
          item = new this.item_class(row, this);
          this.items_bykey[row[this.key]] = item;
          _results.push(this.items.push(item));
        }
      }
      return _results;
    };

    ItemList.prototype.deleteItem = function(item) {
      var index;
      index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        console.log("Can't delete item", item);
      }
      return delete this.items_bykey[item.row[this.key]];
    };

    return ItemList;

  })();

  window.ItemList = ItemList;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/Menu.coffee ---- */


(function() {
  var Menu,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Menu = (function() {
    function Menu() {
      this.render = __bind(this.render, this);
      this.renderItem = __bind(this.renderItem, this);
      this.handleClick = __bind(this.handleClick, this);
      this.storeNode = __bind(this.storeNode, this);
      this.toggle = __bind(this.toggle, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.visible = false;
      this.items = [];
      this.node = null;
    }

    Menu.prototype.show = function() {
      var _ref;
      if ((_ref = window.visible_menu) != null) {
        _ref.hide();
      }
      this.visible = true;
      return window.visible_menu = this;
    };

    Menu.prototype.hide = function() {
      return this.visible = false;
    };

    Menu.prototype.toggle = function() {
      if (this.visible) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    Menu.prototype.addItem = function(title, cb, selected) {
      if (selected == null) {
        selected = false;
      }
      return this.items.push([title, cb, selected]);
    };

    Menu.prototype.storeNode = function(node) {
      this.node = node;
      node.className = node.className.replace("visible", "");
      return setTimeout((function() {
        return node.className += " visible";
      }), 10);
    };

    Menu.prototype.handleClick = function(e) {
      var cb, keep_menu, title, _i, _len, _ref, _ref1;
      keep_menu = false;
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], title = _ref1[0], cb = _ref1[1];
        if (title === e.target.textContent) {
          keep_menu = cb();
        }
      }
      if (keep_menu !== true) {
        this.hide();
      }
      return false;
    };

    Menu.prototype.renderItem = function(item) {
      var cb, href, onclick, selected, title;
      title = item[0], cb = item[1], selected = item[2];
      if (title === "---") {
        return h("div.menu-item-separator");
      } else {
        if (typeof cb === "string") {
          href = cb;
          onclick = true;
        } else {
          href = "#" + title;
          onclick = this.handleClick;
        }
        return h("a.menu-item", {
          href: href,
          onclick: onclick,
          target: "_blank",
          key: title,
          classes: {
            "selected": selected
          }
        }, [title]);
      }
    };

    Menu.prototype.render = function(class_name) {
      if (class_name == null) {
        class_name = "";
      }
      if (this.visible || this.node) {
        return h("div.menu" + class_name, {
          classes: {
            "visible": this.visible
          },
          afterCreate: this.storeNode
        }, this.items.map(this.renderItem));
      }
    };

    return Menu;

  })();

  window.Menu = Menu;

  document.body.addEventListener("mouseup", function(e) {
    if (!window.visible_menu || !window.visible_menu.node) {
      return false;
    }
    if (e.target.parentNode !== window.visible_menu.node.parentNode && e.target.parentNode !== window.visible_menu.node && e.target.parentNode.parentNode !== window.visible_menu.node.parentNode) {
      window.visible_menu.hide();
      return Page.projector.scheduleRender();
    }
  });

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/Prototypes.coffee ---- */


(function() {
  String.prototype.startsWith = function(s) {
    return this.slice(0, s.length) === s;
  };

  String.prototype.endsWith = function(s) {
    return s === '' || this.slice(-s.length) === s;
  };

  String.prototype.repeat = function(count) {
    return new Array(count + 1).join(this);
  };

  window.isEmpty = function(obj) {
    var key;
    for (key in obj) {
      return false;
    }
    return true;
  };

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/RateLimit.coffee ---- */


(function() {
  var call_after_interval, limits;

  limits = {};

  call_after_interval = {};

  window.RateLimit = function(interval, fn) {
    if (!limits[fn]) {
      call_after_interval[fn] = false;
      fn();
      return limits[fn] = setTimeout((function() {
        if (call_after_interval[fn]) {
          fn();
        }
        delete limits[fn];
        return delete call_after_interval[fn];
      }), interval);
    } else {
      return call_after_interval[fn] = true;
    }
  };

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/Text.coffee ---- */


(function() {
  var Text,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Text = (function() {
    function Text() {}

    Text.prototype.toColor = function(text, saturation, lightness) {
      var hash, i, _i, _ref;
      if (saturation == null) {
        saturation = 30;
      }
      if (lightness == null) {
        lightness = 50;
      }
      hash = 0;
      for (i = _i = 0, _ref = text.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        hash += text.charCodeAt(i) * i;
        hash = hash % 1777;
      }
      return "hsl(" + (hash % 360) + ("," + saturation + "%," + lightness + "%)");
    };

    Text.prototype.renderMarked = function(text, options) {
      if (options == null) {
        options = {};
      }
      options["gfm"] = true;
      options["breaks"] = true;
      options["renderer"] = marked_renderer;
      text = this.fixReply(text);
      text = marked(text, options);
      text = this.emailLinks(text);
      return this.fixHtmlLinks(text);
    };

    Text.prototype.emailLinks = function(text) {
      return text.replace(/([a-zA-Z0-9]+)@zeroid.bit/g, "<a href='?to=$1' onclick='return Page.message_create.show(\"$1\")'>$1@zeroid.bit</a>");
    };

    Text.prototype.fixHtmlLinks = function(text) {
      if (window.is_proxy) {
        return text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="http://zero');
      } else {
        return text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="');
      }
    };

    Text.prototype.fixLink = function(link) {
      var back;
      if (window.is_proxy) {
        back = link.replace(/http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
        return back.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
      } else {
        return link.replace(/http:\/\/(127.0.0.1|localhost):43110/, '');
      }
    };

    Text.prototype.toUrl = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "");
    };

    Text.prototype.getSiteUrl = function(address) {
      if (window.is_proxy) {
        if (__indexOf.call(address, ".") >= 0) {
          return "http://" + address;
        } else {
          return "http://zero/" + address;
        }
      } else {
        return "/" + address;
      }
    };

    Text.prototype.fixReply = function(text) {
      return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2");
    };

    Text.prototype.toBitcoinAddress = function(text) {
      return text.replace(/[^A-Za-z0-9]/g, "");
    };

    Text.prototype.jsonEncode = function(obj) {
      return unescape(encodeURIComponent(JSON.stringify(obj)));
    };

    Text.prototype.jsonDecode = function(obj) {
      return JSON.parse(decodeURIComponent(escape(obj)));
    };

    Text.prototype.fileEncode = function(obj) {
      if (typeof obj === "string") {
        return btoa(unescape(encodeURIComponent(obj)));
      } else {
        return btoa(unescape(encodeURIComponent(JSON.stringify(obj, void 0, '\t'))));
      }
    };

    Text.prototype.utf8Encode = function(s) {
      return unescape(encodeURIComponent(s));
    };

    Text.prototype.utf8Decode = function(s) {
      return decodeURIComponent(escape(s));
    };

    Text.prototype.distance = function(s1, s2) {
      var char, extra_parts, key, match, next_find, next_find_i, val, _i, _len;
      s1 = s1.toLocaleLowerCase();
      s2 = s2.toLocaleLowerCase();
      next_find_i = 0;
      next_find = s2[0];
      match = true;
      extra_parts = {};
      for (_i = 0, _len = s1.length; _i < _len; _i++) {
        char = s1[_i];
        if (char !== next_find) {
          if (extra_parts[next_find_i]) {
            extra_parts[next_find_i] += char;
          } else {
            extra_parts[next_find_i] = char;
          }
        } else {
          next_find_i++;
          next_find = s2[next_find_i];
        }
      }
      if (extra_parts[next_find_i]) {
        extra_parts[next_find_i] = "";
      }
      extra_parts = (function() {
        var _results;
        _results = [];
        for (key in extra_parts) {
          val = extra_parts[key];
          _results.push(val);
        }
        return _results;
      })();
      if (next_find_i >= s2.length) {
        return extra_parts.length + extra_parts.join("").length;
      } else {
        return false;
      }
    };

    Text.prototype.parseQuery = function(query) {
      var key, params, part, parts, val, _i, _len, _ref;
      params = {};
      parts = query.split('&');
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        _ref = part.split("="), key = _ref[0], val = _ref[1];
        if (val) {
          params[decodeURIComponent(key)] = decodeURIComponent(val);
        } else {
          params["url"] = decodeURIComponent(key);
        }
      }
      return params;
    };

    Text.prototype.encodeQuery = function(params) {
      var back, key, val;
      back = [];
      if (params.url) {
        back.push(params.url);
      }
      for (key in params) {
        val = params[key];
        if (!val || key === "url") {
          continue;
        }
        back.push((encodeURIComponent(key)) + "=" + (encodeURIComponent(val).replace(/%20/g, '+')));
      }
      return back.join("&");
    };

    return Text;

  })();

  window.is_proxy = document.location.host === "zero" || window.location.pathname === "/";

  window.Text = new Text();

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/Time.coffee ---- */


(function() {
  var Time;

  Time = (function() {
    function Time() {}

    Time.prototype.since = function(timestamp) {
      var back, now, secs;
      now = +(new Date) / 1000;
      if (timestamp > 1000000000000) {
        timestamp = timestamp / 1000;
      }
      secs = now - timestamp;
      if (secs < 60) {
        back = "Just now";
      } else if (secs < 60 * 60) {
        back = (Math.round(secs / 60)) + " minutes ago";
      } else if (secs < 60 * 60 * 24) {
        back = (Math.round(secs / 60 / 60)) + " hours ago";
      } else if (secs < 60 * 60 * 24 * 3) {
        back = (Math.round(secs / 60 / 60 / 24)) + " days ago";
      } else {
        back = "on " + this.date(timestamp);
      }
      back = back.replace(/1 ([a-z]+)s/, "1 $1");
      return back;
    };

    Time.prototype.date = function(timestamp, format) {
      var display, parts;
      if (format == null) {
        format = "short";
      }
      if (timestamp > 1000000000000) {
        timestamp = timestamp / 1000;
      }
      parts = (new Date(timestamp * 1000)).toString().split(" ");
      if (format === "short") {
        display = parts.slice(1, 4);
      } else {
        display = parts.slice(1, 5);
      }
      return display.join(" ").replace(/( [0-9]{4})/, ",$1");
    };

    Time.prototype.timestamp = function(date) {
      if (date == null) {
        date = "";
      }
      if (date === "now" || date === "") {
        return parseInt(+(new Date) / 1000);
      } else {
        return parseInt(Date.parse(date) / 1000);
      }
    };

    return Time;

  })();

  window.Time = new Time;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/utils/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  ZeroFrame = (function(_super) {
    __extends(ZeroFrame, _super);

    function ZeroFrame(url) {
      this.onCloseWebsocket = __bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
      this.onRequest = __bind(this.onRequest, this);
      this.onMessage = __bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.history_state = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      this.cmd("innerReady");
      window.addEventListener("beforeunload", (function(_this) {
        return function(e) {
          _this.log("save scrollTop", window.pageYOffset);
          _this.history_state["scrollTop"] = window.pageYOffset;
          return _this.cmd("wrapperReplaceState", [_this.history_state, null]);
        };
      })(this));
      return this.cmd("wrapperGetState", [], (function(_this) {
        return function(state) {
          if (state != null) {
            _this.history_state = state;
          }
          _this.log("restore scrollTop", state, window.pageYOffset);
          if (window.pageYOffset === 0 && state) {
            return window.scroll(window.pageXOffset, state.scrollTop);
          }
        };
      })(this));
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return this.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.cmd("innerReady");
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else {
        return this.onRequest(cmd, message.params);
      }
    };

    ZeroFrame.prototype.onRequest = function(cmd, message) {
      return this.log("Unknown request", message);
    };

    ZeroFrame.prototype.response = function(to, result) {
      return this.send({
        "cmd": "response",
        "to": to,
        "result": result
      });
    };

    ZeroFrame.prototype.cmd = function(cmd, params, cb) {
      if (params == null) {
        params = {};
      }
      if (cb == null) {
        cb = null;
      }
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
    };

    ZeroFrame.prototype.send = function(message, cb) {
      if (cb == null) {
        cb = null;
      }
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })(Class);

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/Details.coffee ---- */


(function() {
  var Details,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Details = (function(_super) {
    __extends(Details, _super);

    function Details() {
      this.render = __bind(this.render, this);
      this.handleContentClick = __bind(this.handleContentClick, this);
      this.handleBgClick = __bind(this.handleBgClick, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.visible = false;
      this.hiding = false;
      this.timer_hide = null;
      this.title = null;
      this.animate = true;
    }

    Details.prototype.show = function(title, animate) {
      var imdb_id;
      if (animate == null) {
        animate = true;
      }
      this.visible = true;
      this.hiding = false;
      clearInterval(this.timer_hide);
      if (title === this.title) {
        return;
      }
      if (typeof title === "string") {
        imdb_id = title;
        Page.on_site_info.then((function(_this) {
          return function() {
            return Page.cmd("dbQuery", [
              "SELECT * FROM title WHERE imdb_id = :imdb_id LIMIT 1", {
                "imdb_id": imdb_id
              }
            ], function(title_rows) {
              title = new Title(title_rows[0]);
              return _this.title = title;
            });
          };
        })(this));
      } else {
        this.title = title;
        Page.setUrl(Page.createUrl({
          imdb_id: title.row.imdb_id,
          title: title.row.name
        }));
      }
      return false;
    };

    Details.prototype.hide = function() {
      this.hiding = true;
      Page.setUrl(Page.createUrl({
        imdb_id: null,
        title: null
      }));
      this.timer_hide = setTimeout(((function(_this) {
        return function() {
          _this.visible = false;
          _this.hiding = false;
          _this.title = null;
          return Page.projector.scheduleRender();
        };
      })(this)), 300);
      return false;
    };

    Details.prototype.handleBgClick = function() {
      return this.hide();
    };

    Details.prototype.handleContentClick = function(e) {
      return e.stopPropagation();
    };


    /*
    	renderYoutubePlayer: ->
    		h("div.youtube.player", [
    			h("iframe", {width: 560, height: 315, src: "https://www.youtube.com/embed/#{@youtube_id}&origin=127.0.0.1&showinfo=0&iv_load_policy=3&enablejsapi=0", frameborder: 0, allowfullscreen: true})
    		])
     */

    Details.prototype.renderDetails = function() {
      var row, stars_width;
      stars_width = Math.max((this.title.row.imdb_rating - 3) * 23, 0);
      row = this.title.row;
      return h("div.content", {
        onclick: this.handleContentClick,
        afterCreate: Animation.addVisibleClass
      }, [
        h("div.cover", {
          style: this.title.getCoverStyle()
        }), h("div.description", [
          h("h1", row.name), h("div.info", [h("span.year", row.year), " | ", h("span.length", row.length), " | ", h("span.genre", row.genre)]), h("a.imdb", {
            href: "http://www.imdb.com/title/" + row.imdb_id + "/"
          }, [
            h("span.stars.active", {
              style: "width: " + stars_width + "px"
            }, "\u2605\u2605\u2605\u2605\u2605"), h("span.stars", "\u2605\u2605\u2605\u2605\u2605"), h("span.score", row.imdb_rating)
          ]), row.youtube_id ? h("a.trailer", {
            href: "https://www.youtube.com/embed/" + row.youtube_id + "?autoplay=1&vq=hd1080&hd=1"
          }, ["\u25BA Watch trailer"]) : void 0, h("h2", "Download"), h("div.downloads", this.title.dls.map(function(dl) {
            return h("a.download", {
              key: dl[0],
              href:"https://yadi.sk/" + dl[2]
            }, [h("span.quality", dl[0]), h("span.size", dl[1])]);
          })), h("a.source", {
            href: "http://myanimelist.net/manga.php?q=" + row.name
          }, "Source: MyAnimeList")
        ])
      ]);
    };

    Details.prototype.render = function() {
      return h("div#Details", {
        classes: {
          visible: this.visible,
          hiding: this.hiding
        },
        onclick: this.handleBgClick
      }, [this.visible && this.title ? this.renderDetails() : void 0]);
    };

    return Details;

  })(Class);

  window.Details = Details;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/Filter.coffee ---- */


(function() {
  var Filter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Filter = (function() {
    function Filter() {
      this.render = __bind(this.render, this);
      this.handleClick = __bind(this.handleClick, this);
      this.active = "Popular";
    }

    Filter.prototype.handleClick = function(e) {
      var url;
      this.active = e.currentTarget.href.replace(/.*\/\?/, "");
      Page.params.page = "";
      url = Page.createUrl("url", this.active);
      Page.setUrl(url);
      Page.title_list.empty();
      Page.title_list.update("down");
      return false;
    };

    Filter.prototype.render = function() {
      return h("div#Filter", {
        classes: {
          inactive: Page.details.visible && !Page.details.hiding
        }
      }, [
        h("a.filter", {
          href: "?Popular",
          classes: {
            "active": this.active === "Popular"
          },
          onclick: this.handleClick
        }, "Popular now"), h("a.filter", {
          href: "?Downloaded",
          classes: {
            "active": this.active === "Downloaded"
          },
          onclick: this.handleClick
        }, "Most downloaded"), h("a.filter", {
          href: "?Recent",
          classes: {
            "active": this.active === "Recent"
          },
          onclick: this.handleClick
        }, "Recently added")
      ]);
    };

    return Filter;

  })();

  window.Filter = Filter;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/Head.coffee ---- */


(function() {
  var Head,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Head = (function() {
    function Head() {
      this.render = __bind(this.render, this);
      this.handleKeyup = __bind(this.handleKeyup, this);
      this.handleInput = __bind(this.handleInput, this);
      this.storeNodeSearch = __bind(this.storeNodeSearch, this);
      this.search = "";
    }

    Head.prototype.storeNodeSearch = function(node) {
      return document.body.onkeypress = (function(_this) {
        return function() {
          var _ref;
          if (((_ref = document.activeElement) != null ? _ref.tagName : void 0) !== "INPUT") {
            return node.focus();
          }
        };
      })(this);
    };

    Head.prototype.handleInput = function(e) {
      var delay;
      this.search = e.target.value;
      Page.params.page = 1;
      clearInterval(this.input_timer);
      if (this.search) {
        delay = 300;
      } else {
        delay = 50;
      }
      this.input_timer = setTimeout((function() {
        return RateLimit(500, function() {
          Page.title_list.update("none");
          return Page.setUrl(Page.createUrl("search", Page.head.search));
        });
      }), delay);
      return false;
    };

    Head.prototype.handleKeyup = function(e) {
      if (e.keyCode === 27) {
        e.target.value = "";
        this.handleInput(e);
      }
      return false;
    };

    Head.prototype.render = function() {
      return h("div#Head", {
        classes: {
          inactive: Page.details.visible && !Page.details.hiding
        }
      }, [
        h("a.logo", {
          href: "?Home"
        }, [
          h("img", {
            src: "img/logo.png"
          }), h("h1", "Ranobe Novel Books")
        ]), h("div.search", [
          h("input", {
            type: "text",
            placeholder: "Search: Ranobe, novel, books name, Genre",
            value: this.search,
            oninput: this.handleInput,
            onkeyup: this.handleKeyup,
            afterCreate: this.storeNodeSearch
          })
        ])
      ]);
    };

    return Head;

  })();

  window.Head = Head;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/Paginate.coffee ---- */


(function() {
  var Paginate,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Paginate = (function() {
    function Paginate() {
      this.render = __bind(this.render, this);
      this.handleNextClick = __bind(this.handleNextClick, this);
      this.handlePrevClick = __bind(this.handlePrevClick, this);
      this.page = 1;
      this.has_nextpage = false;
    }

    Paginate.prototype.handlePrevClick = function(e) {
      this.page -= 1;
      Page.title_list.empty();
      Page.title_list.update("right");
      document.body.scrollTop = 0;
      Page.setUrl(Page.createUrl("page", this.page));
      return false;
    };

    Paginate.prototype.handleNextClick = function(e) {
      this.page += 1;
      Page.title_list.empty();
      Page.title_list.update("left");
      document.body.scrollTop = 0;
      Page.setUrl(Page.createUrl("page", this.page));
      return false;
    };

    Paginate.prototype.render = function() {
      if (!Page.title_list.titles.length) {
        return h("div#Paginate");
      }
      return h("div#Paginate", [
        this.page > 1 ? h("a.prev", {
          href: Page.createUrl("page", this.page - 1),
          onclick: this.handlePrevClick
        }, "\u2039") : void 0, this.has_nextpage ? h("a.next", {
          href: Page.createUrl("page", this.page + 1),
          onclick: this.handleNextClick
        }, "Next \u203A") : void 0
      ]);
    };

    return Paginate;

  })();

  window.Paginate = Paginate;

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/Play.coffee ---- */


(function() {
  var Play,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  window.h = maquette.h;

  Play = (function(_super) {
    __extends(Play, _super);

    function Play() {
      this.reloadServerInfo = __bind(this.reloadServerInfo, this);
      this.reloadSiteInfo = __bind(this.reloadSiteInfo, this);
      this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
      return Play.__super__.constructor.apply(this, arguments);
    }

    Play.prototype.init = function() {
      this.params = {};
      this.site_info = null;
      this.server_info = null;
      this.address = null;
      this.on_site_info = new Promise();
      this.on_local_storage = new Promise();
      this.local_storage = null;
      return this.loadLocalStorage();
    };

    Play.prototype.createProjector = function() {
      this.projector = maquette.createProjector();
      this.head = new Head();
      this.filter = new Filter();
      this.title_list = new TitleList();
      this.paginate = new Paginate();
      this.details = new Details();
      if (base.href.indexOf("?") === -1) {
        this.route("");
      } else {
        this.route(base.href.replace(/.*?\?/, ""));
      }
      this.projector.replace($("#Head"), this.head.render);
      this.projector.replace($("#Filter"), this.filter.render);
      this.projector.replace($("#TitleList"), this.title_list.render);
      this.projector.replace($("#Paginate"), this.paginate.render);
      return this.projector.replace($("#Details"), this.details.render);
    };

    Play.prototype.route = function(query) {
      this.params = Text.parseQuery(query);
      this.log("Route", this.params);
      if (this.params.search) {
        this.head.search = this.params.search.replace(/\+/g, " ");
      }
      if (this.params.url === "Downloaded") {
        this.title_list.active = this.filter.active = "Downloaded";
      } else if (this.params.url === "Recent") {
        this.title_list.active = this.filter.active = "Recent";
      } else {
        this.title_list.active = this.filter.active = "Popular";
      }
      if (this.params.page) {
        this.paginate.page = parseInt(this.params.page);
      } else {
        this.paginate.page = 1;
      }
      if (this.params.imdb_id) {
        if (this.title_list.titles_byimdb[this.params.imdb_id]) {
          return this.details.show(this.title_list.titles_byimdb[this.params.imdb_id], false);
        } else {
          return this.details.show(this.params.imdb_id, false);
        }
      }
    };

    Play.prototype.createUrl = function(key, val) {
      var params, skey, sval;
      params = JSON.parse(JSON.stringify(this.params));
      if (typeof key === "object") {
        for (skey in key) {
          sval = key[skey];
          params[skey] = sval;
        }
      } else {
        params[key] = val;
      }
      return "?" + Text.encodeQuery(params);
    };

    Play.prototype.setUrl = function(url) {
      this.cmd("wrapperReplaceState", [
        {
          "url": url
        }, "", url
      ]);
      return this.route(url.replace(/.*?\?/, ""));
    };

    Play.prototype.loadLocalStorage = function() {
      return this.on_site_info.then((function(_this) {
        return function() {
          _this.log("Loading localstorage");
          return _this.cmd("wrapperGetLocalStorage", [], function(_at_local_storage) {
            var _base;
            _this.local_storage = _at_local_storage;
            _this.log("Loaded localstorage");
            if (_this.local_storage == null) {
              _this.local_storage = {};
            }
            if ((_base = _this.local_storage).quality == null) {
              _base.quality = "720p";
            }
            return _this.on_local_storage.resolve(_this.local_storage);
          });
        };
      })(this));
    };

    Play.prototype.saveLocalStorage = function(cb) {
      if (this.local_storage) {
        return this.cmd("wrapperSetLocalStorage", this.local_storage, (function(_this) {
          return function(res) {
            if (cb) {
              return cb(res);
            }
          };
        })(this));
      }
    };

    Play.prototype.onOpenWebsocket = function(e) {
      this.reloadSiteInfo();
      return this.reloadServerInfo();
    };

    Play.prototype.reloadSiteInfo = function() {
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {
          _this.address = site_info.address;
          return _this.setSiteInfo(site_info);
        };
      })(this));
    };

    Play.prototype.reloadServerInfo = function() {
      return this.cmd("serverInfo", {}, (function(_this) {
        return function(server_info) {
          return _this.setServerInfo(server_info);
        };
      })(this));
    };

    Play.prototype.onRequest = function(cmd, params) {
      if (cmd === "setSiteInfo") {
        return this.setSiteInfo(params);
      } else {
        return this.log("Unknown command", params);
      }
    };

    Play.prototype.setSiteInfo = function(site_info) {
      this.site_info = site_info;
      this.on_site_info.resolve();
      return this.title_list.onSiteInfo(site_info);
    };

    Play.prototype.setServerInfo = function(server_info) {
      this.server_info = server_info;
      return this.projector.scheduleRender();
    };

    Play.prototype.returnFalse = function() {
      return false;
    };

    return Play;

  })(ZeroFrame);

  window.Play = Play;

  window.scroll_timer = null;

  window.onscroll = function() {
    if (!window.scroll_timer) {
      $("#ScrollCover").style.display = "block";
    }
    clearInterval(window.scroll_timer);
    return window.scroll_timer = setTimeout((function() {
      $("#ScrollCover").style.display = "none";
      return window.scroll_timer = null;
    }), 300);
  };

}).call(this);


/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/Title.coffee ---- */


(function() {
  var Title,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Title = (function() {
    function Title(row) {
      this.handleCoverClick = __bind(this.handleCoverClick, this);
      this.addCoverStyle = __bind(this.addCoverStyle, this);
      var dl, _i, _len, _ref;
      this.hover = false;
      this.i = 0;
      this.setRow(row);
      this.dls = [];
      _ref = row.dl.split("|");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dl = _ref[_i];
        this.dls.push(dl.split(":"));
      }
      this.dls.sort(function(a, b) {
        return a[0].length - b[0].length;
      });
    }

    Title.prototype.setRow = function(row) {
      var _ref;
      _ref = row["data"].split("|"), row["year"] = _ref[0], row["genre"] = _ref[1], row["length"] = _ref[2], row["imdb_rating"] = _ref[3], row["youtube_id"] = _ref[4], row["poster_data"] = _ref[5];
      delete row["data"];
      return this.row = row;
    };

    Title.prototype.getCoverStyle = function() {
      var height, i, y, _ref;
      _ref = this.row.poster_data.split(","), i = _ref[0], y = _ref[1], height = _ref[2];
      return "background: url(data/poster/posters_" + i + ".jpg) 0px -" + y + "px no-repeat; height: " + height + "px; margin-top: " + (Math.max(0, 300 - height)) + "px; opacity: 1; ";
    };

    Title.prototype.addCoverStyle = function(node) {
      var delay, height, i, y, _ref;
      _ref = this.row.poster_data.split(","), i = _ref[0], y = _ref[1], height = _ref[2];
      node.style.cssText = "height: " + height + "px; margin-top: " + (Math.max(0, 300 - height)) + "px;";
      delay = this.row.i * 40;
      return setTimeout(((function(_this) {
        return function() {
          if (_this.row.i > 20) {
            return node.style.cssText = _this.getCoverStyle() + "transition: none";
          } else {
            return node.style.cssText = _this.getCoverStyle();
          }
        };
      })(this)), delay);
    };

    Title.prototype.getImdbColor = function() {
      return "hsl(" + (200 - (10 - this.row.imdb_rating) * 40) + ", 93%, 64%)";
    };


    /*
    	handleHover: (e) =>
    		@hover = true
    
    	handleHoverEnd: (e) =>
    		@hover = false
    
    	animationShow: (elem, props) ->
    		elem.style.opacity = 1
    		setTimeout (->
    			elem.style.opacity = 1
    			elem.className += " hover"
    		), 0
    
    	animationHide: (elem, remove_func, props) ->
    		return remove_func()
    		setTimeout (->
    			elem.style.opacity = 0
    		), 0
    		setTimeout (->
    			remove_func()
    		), 800
     */


    /*
    	renderHover: ->
    		#if not @hover
    		#	return []
    		 * Select current quality
    		if Page.local_storage.quality == "SD"
    			preference = ["SD", "720p", "1080p"]
    		else if Page.local_storage.quality == "1080p"
    			preference = ["1080p", "720p", "SD"]
    		else
    			preference = ["720p", "SD", "1080p"]
    
    		for quality in preference
    			dl = @dls[quality]
    			if dl
    				break
    
    
    		h("div.moviehover", [  # {enterAnimation: Animation.show, exitAnimation: Animation.hide}
    			if @row.youtube_id then h("a.trailer", {href: "https://www.youtube.com/embed/#{@row.youtube_id}?autoplay=1", title: "Play trailer", onclick: @handleTrailerClick}, "\u25BA"),
    			h("div.download",
    				h("a.download-menu", {href: "#Other+versions"}, "\u22EE"),
    				h("a.download-button", {href: "#"}, [
    					"Download",
    				])
    				h("div.download-details", [
    					h("a.resolution", {href: "#Other+versions"}, quality), " | "
    					h("span.size", dl[0]), " | "
    					h("span.length", @row.length)
    				])
    			)
    		])
     */

    Title.prototype.handleCoverClick = function() {
      return Page.details.show(this);
    };

    Title.prototype.render = function() {
      return h("div.movie", {
        key: this.row.imdb_id
      }, [
        h("div.cover", {
          afterCreate: this.addCoverStyle,
          onclick: this.handleCoverClick
        }, h("span.play", "\u25BA")), h("a.rating", {
          href: "http://www.imdb.com/title/" + this.row.imdb_id + "/",
          style: "color: " + (this.getImdbColor())
        }, this.row.imdb_rating > 0 ? this.row.imdb_rating : ""), h("span.title", [this.row.name, h("span.year", " (" + this.row.year + ")")]), h("span.genre", this.row.genre)
      ]);
    };

    return Title;

  })();

  window.Title = Title;

}).call(this);



/* ---- data/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/js/TitleList.coffee ---- */


(function() {
  var TitleList,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  TitleList = (function(_super) {
    __extends(TitleList, _super);

    function TitleList() {
      this.render = __bind(this.render, this);
      this.update = __bind(this.update, this);
      this.empty = __bind(this.empty, this);
      this.item_list = new ItemList(Title, "imdb_id");
      this.titles = this.item_list.items;
      this.titles_byimdb = this.item_list.items_bykey;
      this.active = Page.filter.active;
      this.animation_direction = "down";
      this.loading = true;
      Page.on_local_storage.then((function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    }

    TitleList.prototype.empty = function() {
      this.item_list.sync([]);
      return Page.projector.scheduleRender();
    };

    TitleList.prototype.update = function(_at_animation_direction) {
      var orderby, params, query, where, wheres;
      this.animation_direction = _at_animation_direction;
      this.loading = true;
      wheres = [];
      params = {};
      orderby = "peers-(strftime('%s','now') - added)/3000 DESC";
      if (Page.filter.active === "New") {
        wheres.push("data LIKE strftime('%Y', 'now') || \"%\" OR\ndata LIKE strftime('%Y', 'now', '-12 months') || \"%\"");
      }
      if (Page.filter.active === "Recent") {
        orderby = "added DESC";
      }
      if (Page.filter.active === "Downloaded") {
        orderby = "MIN(1500, peers)+MIN(2000, (strftime('%s','now') - added)/5000) DESC";
      }
      if (Page.head.search) {
        wheres.push("name || data LIKE :name_like");
        params["name_like"] = "%" + Page.head.search.replace(/ /g, "%") + "%";
      }
      if (wheres.length > 0) {
        where = "WHERE " + ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = wheres.length; _i < _len; _i++) {
            where = wheres[_i];
            _results.push("(" + where + ")");
          }
          return _results;
        })()).join(" AND ");
      } else {
        where = "";
      }
      query = "SELECT *\nFROM title\nLEFT JOIN title_data USING (imdb_id)\n" + where + "\nORDER BY " + orderby + " LIMIT " + ((Page.paginate.page - 1) * 60) + ",61";
      return Page.cmd("dbQuery", [query, params], (function(_this) {
        return function(titles) {
          var i, title, _i, _len;
          i = 0;
          for (_i = 0, _len = titles.length; _i < _len; _i++) {
            title = titles[_i];
            title.i = i;
            i++;
          }
          if (titles.length === 61) {
            Page.paginate.has_nextpage = true;
            titles.pop();
          } else {
            Page.paginate.has_nextpage = false;
          }
          _this.item_list.sync(titles);
          Page.projector.scheduleRender();
          _this.active = Page.filter.active;
          return _this.loading = false;
        };
      })(this));
    };

    TitleList.prototype.render = function() {
      if (this.titles.length === 0 && Page.head.search && !this.loading) {
        return h("div#List", {
          classes: {
            "noresult": true
          }
        }, [
          h("h2", "No result for: " + Page.head.search), h("h3", [
            "Try search on sites:", h("a.search", {
              "href": "https://rarbg.to/torrents.php?search=" + Page.head.search + "&category=1;14;15;16;17;21;22;42;18;19;41;27;28;29;30;31;32;40;23;24;25;26;33;34;43;44;45;46;47;48"
            }, "Rarbg"), h("a.search", {
              "href": "https://thepiratebay.se/search/" + Page.head.search
            }, "Piratebay"), h("a.search", {
              "href": "https://isohunt.to/torrents/?ihq=" + Page.head.search
            }, "Isohunt"), h("a.search", {
              "href": "http://www.google.com/search?q=" + Page.head.search + "+720p+torrent"
            }, "Google")
          ])
        ]);
      } else if (!this.titles) {
        return h("div#List");
      }
      if (document.body.className !== "loaded" && this.titles.length > 0) {
        document.body.className = "loaded";
      }
      return h("div#List", {
        classes: {
          inactive: Page.details.visible && !Page.details.hiding,
          "noresult": false
        }
      }, [
        h("div.list.list-" + this.active + "-" + Page.paginate.page, {
          enterAnimation: Animation.show,
          direction: this.animation_direction
        }, this.titles.map(function(title) {
          return title.render();
        }))
      ]);
    };

    TitleList.prototype.onSiteInfo = function(site_info) {
      var action, inner_path, _ref;
      if (site_info.event) {
        _ref = site_info.event, action = _ref[0], inner_path = _ref[1];
        if (action === "file_done" && inner_path.match(/data\/movies_.*/)) {
          return this.update("none");
        }
      }
    };

    return TitleList;

  })(Class);

  window.TitleList = TitleList;

}).call(this);