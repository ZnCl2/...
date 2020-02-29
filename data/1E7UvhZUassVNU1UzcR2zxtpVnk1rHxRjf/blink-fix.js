"use strict";

// This class implements part of CSS cascading. This is not a complete
// implementation, and only supports a small subset of valid CSS.
class StyleSet {
  constructor(stylesheets) {
    let index = 0;
    this.rules = [];
    for (let stylesheet of stylesheets) {
      for (let rule of StyleSet.parseRuleList(stylesheet.cssRules)) {
        let {a, b, c} = rule.specificity;
        rule.order = {a, b, c, index: index++};
        rule.sheet = stylesheet;
        this.rules.push(rule);
      }
    }
    this.rules.sort((lhs, rhs) => {
      const lorder = lhs.order;
      const rorder = rhs.order;
      return -(lorder.a - rorder.a) ||
             -(lorder.b - rorder.b) ||
             -(lorder.c - rorder.c) ||
             lorder.index - rorder.index;
    });
  }

  // Iterates style rules in a CSSRuleList, and yields objects in form
  // of {selector, pseudo, specificity, declaration}, where:
  // * selector: complex selector without pseudo-element
  // * pseudo: the pseudo-element part of the selector
  // * specificity: {a, b, c}
  // * declaration: a CSSStyleDeclaration object
  // Note: this implements an extremely simplified parser, which
  // ignores any non-grouping at-rules, and only recognizes pseudo-
  // element starts with double colons.
  static *parseRuleList(ruleList) {
    for (let rule of ruleList) {
      if ('cssRules' in rule) {
        yield* StyleSet.parseRuleList(rule.cssRules);
      }
      if (rule.type != CSSRule.STYLE_RULE) {
        continue;
      }
      let declaration = rule.style;
      for (let selectorText of rule.selectorText.split(',')) {
        let [selector, pseudo] = selectorText.split('::');
        selector = selector.trim();
        pseudo = pseudo && `::${pseudo.trim()}`;
        let specificity = StyleSet.computeSpecificity(selectorText);
        yield {selector, pseudo, specificity, declaration};
      }
    }
  }

  // Compute the specificity of the given selector text. This only
  // handles a single complex selector.
  // Note: the parser is an extremely simplified implementation, which
  // assumes none of the following exists in the selector:
  // * attribute selector,
  // * functional pseudo-class,
  // * CSS2 pseudo-element with single colon,
  // * namespace prefix of type selector,
  // * escape in identifiers, or
  // * codepoints outside ASCII.
  static computeSpecificity(selectorText) {
    let result = {a: 0, b: 0, c: 0};
    selectorText.replace(/(\#|\.|::|:)?[A-Za-z0-9_-]+/, (match, prefix) => {
      if (prefix == '#') {
        result.a++;
      } else if (prefix == '.' || prefix == ':') {
        result.b++;
      } else {
        result.c++;
      }
    });
    return result;
  }

  // Returns the cascaded value of the property for the given element
  // as well as the rule it lives in.
  getCascadedValueAndRule({elem, pseudo}, prop) {
    for (let rule of this.rules) {
      if (rule.pseudo == pseudo && elem.matches(rule.selector)) {
        let value = rule.declaration.getPropertyValue(prop);
        if (value) {
          return {value, rule};
        }
      }
    }
    return {};
  }

  // Returns the cascaded value of the property for the given element.
  getCascadedValue(target, prop) {
    let {value} = this.getCascadedValueAndRule(target, prop);
    return value || "";
  }

  // Returns the cascaded value of the property for the given element
  // with inheritance.
  getInheritedCascadedValue({elem, pseudo}, prop) {
    let value = "";
    if (pseudo) {
      value = this.getCascadedValue({elem, pseudo}, prop);
    }
    for (; !value && elem; elem = elem.parentElement) {
      value = this.getCascadedValue({elem}, prop);
    }
    return value;
  }

  // Substitute all variables in the given value for the given target.
  // Note: this method doesn't handle cyclic dependency.
  substituteVariables(target, value) {
    return value.replace(/var\((--[A-Za-z0-9_-]*)\)/, (_, variable) => {
      let value = this.getInheritedCascadedValue(target, variable);
      return this.substituteVariables(target, value);
    });
  }

  // Returns the cascaded value of the property for the given element
  // with all variables inside substituted.
  getSubstitutedValueAndRule(target, prop) {
    let {value, rule} = this.getCascadedValueAndRule(target, prop);
    value = value && this.substituteVariables(target, value);
    return {value, rule};
  }
}

let BlinkFix = (function() {
  let styleset = new StyleSet(document.styleSheets);

  function getBackgroundImageValueAndRule(target) {
    let image = styleset.getSubstitutedValueAndRule(target, 'background-image');
    if (!image.value) {
      let bg = styleset.getSubstitutedValueAndRule(target, 'background');
      if (bg.value) {
        let match = /url\(.+?\)/.exec(bg.value);
        image = {value: match && match[0], rule: bg.rule};
      }
    }
    if (image.value) {
      // Chromium incorrectly adds escapes in the url, see
      // https://bugs.chromium.org/p/chromium/issues/detail?id=661007
      image.value = image.value.replace('\\', '');
    }
    return image;
  }

  return {
    // This is a workaround for the issue that url() values may not be
    // handled correctly when used with CSS variables. See
    // https://bugs.chromium.org/p/chromium/issues/detail?id=618165
    fixBackgroundImages() {
      function isBackgroundImageInvalid(elem, pseudo) {
        return getComputedStyle(elem, pseudo).backgroundImage == 'url("")';
      }
      const $body = document.body;
      let iter = document.createNodeIterator($body, NodeFilter.SHOW_ELEMENT);
      let itemsToHandle = [];
      while (true) {
        let elem = iter.nextNode();
        if (!elem) {
          break;
        }
        for (let pseudo of [undefined, '::before', '::after']) {
          if (isBackgroundImageInvalid(elem, pseudo)) {
            itemsToHandle.push({elem, pseudo});
          }
        }
      }
      // Nothing to handle. Maybe the bug has been fixed?
      if (itemsToHandle.length == 0) {
        return;
      }

      let count = 0;
      for (let item of itemsToHandle) {
        let {elem, pseudo} = item;
        let image = getBackgroundImageValueAndRule(item);
        if (image.value) {
          let className = `chromium-fix-${count++}`;
          elem.classList.add(className);
          let newRule = `.${className}${pseudo} {
            background-image: ${image.value} !important;
          }`;
          let targetSheet = image.rule.sheet;
          targetSheet.insertRule(newRule, targetSheet.cssRules.length);
        }
      }
    },
  };
})();
