"use strict";

let EdgeFix = (function() {
  // Add polyfill for iterator of the builtin type, see
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11805877/
  function* iterateItems() {
    for (let i = 0; i < this.length; i++) {
      yield this.item(i);
    }
  }
  StyleSheetList.prototype[Symbol.iterator] = iterateItems;
  CSSRuleList.prototype[Symbol.iterator] = iterateItems;
  CSSStyleDeclaration.prototype[Symbol.iterator] = iterateItems;

  // Iterates all effective CSSStyleRules in the given CSSRuleList.
  function* iterateEffectiveRulesFromList(ruleList) {
    for (let rule of ruleList) {
      if (rule.type == CSSRule.MEDIA_RULE) {
        if (window.matchMedia(rule.media.mediaText).matches) {
          yield* iterateEffectiveRulesFromList(rule.cssRules);
        }
      } else if (rule.type == CSSRule.SUPPORTS_RULE) {
        if (CSS.supports(rule.conditionText)) {
          yield* iterateEffectiveRulesFromList(rule.cssRules);
        }
      } else if (rule.type == CSSRule.STYLE_RULE) {
        yield rule;
      }
    }
  }

  // Iterates all effective CSSStyleRules in this document.
  function* iterateEffectiveRules() {
    for (let sheet of document.styleSheets) {
      yield* iterateEffectiveRulesFromList(sheet.cssRules);
    }
  }

  return {
    // This is a rough workaround for the issue that Edge doesn't
    // substitute CSS variable references correctly in many cases.
    // e.g. https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11684601/
    fixVariables() {
      // Read all global consts based on the assumption that they would
      // not be changed latter. This is not strictly true, but should be
      // fine enough for this page.
      let globalConsts = new Map;
      for (let rule of iterateEffectiveRules()) {
        if (!document.documentElement.matches(rule.selectorText)) {
          continue;
        }
        for (let prop of rule.style) {
          if (prop.startsWith('--')) {
            globalConsts.set(prop, rule.style.getPropertyValue(prop));
          }
        }
      }
      // Apply the global consts to property declarations directly.
      for (let rule of iterateEffectiveRules()) {
        let propsToChange = new Map;
        for (let prop of rule.style) {
          let oldValue = rule.style.getPropertyValue(prop);
          let newValue = oldValue.replace(
            /var\((--[A-Za-z0-9_-]*?)\)/g,
            (orig, variable) => globalConsts.get(variable) || orig);
          if (newValue != oldValue) {
            propsToChange.set(prop, newValue);
          }
        }
        // This has to be done in two phases, otherwise the order
        // of properties may be changed during iterating.
        for (let [prop, value] of propsToChange) {
          rule.style.setProperty(prop, value);
        }
      }
    },
  };
})();
