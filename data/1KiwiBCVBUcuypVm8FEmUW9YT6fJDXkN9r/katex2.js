webpackJsonp([4],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildGroup = exports.buildExpression = exports.groupTypes = exports.makeText = undefined;
exports.default = buildMathML;

var _buildCommon = __webpack_require__(5);

var _buildCommon2 = _interopRequireDefault(_buildCommon);

var _fontMetrics = __webpack_require__(85);

var _fontMetrics2 = _interopRequireDefault(_fontMetrics);

var _mathMLTree = __webpack_require__(7);

var _mathMLTree2 = _interopRequireDefault(_mathMLTree);

var _ParseError = __webpack_require__(24);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _Style = __webpack_require__(40);

var _Style2 = _interopRequireDefault(_Style);

var _symbols = __webpack_require__(68);

var _symbols2 = _interopRequireDefault(_symbols);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

var _stretchy = __webpack_require__(55);

var _stretchy2 = _interopRequireDefault(_stretchy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a symbol and converts it into a MathML text node after performing
 * optional replacement from symbols.js.
 */
/**
 * WARNING: New methods on groupTypes should be added to src/functions.
 *
 * This file converts a parse tree into a cooresponding MathML tree. The main
 * entry point is the `buildMathML` function, which takes a parse tree from the
 * parser.
 */

var makeText = exports.makeText = function makeText(text, mode) {
    if (_symbols2.default[mode][text] && _symbols2.default[mode][text].replace) {
        text = _symbols2.default[mode][text].replace;
    }

    return new _mathMLTree2.default.TextNode(text);
};

/**
 * Returns the math variant as a string or null if none is required.
 */
var getVariant = function getVariant(group, options) {
    var font = options.fontFamily;
    if (!font) {
        return null;
    }

    var mode = group.mode;
    if (font === "mathit") {
        return "italic";
    } else if (font === "boldsymbol") {
        return "bold-italic";
    }

    var value = group.value;
    if (_utils2.default.contains(["\\imath", "\\jmath"], value)) {
        return null;
    }

    if (_symbols2.default[mode][value] && _symbols2.default[mode][value].replace) {
        value = _symbols2.default[mode][value].replace;
    }

    var fontName = _buildCommon2.default.fontMap[font].fontName;
    if (_fontMetrics2.default.getCharacterMetrics(value, fontName, mode)) {
        return _buildCommon2.default.fontMap[font].variant;
    }

    return null;
};

/**
 * Functions for handling the different types of groups found in the parse
 * tree. Each function should take a parse group and return a MathML node.
 */
var groupTypes = exports.groupTypes = {};

var defaultVariant = {
    "mi": "italic",
    "mn": "normal",
    "mtext": "normal"
};

groupTypes.mathord = function (group, options) {
    var node = new _mathMLTree2.default.MathNode("mi", [makeText(group.value, group.mode)]);

    var variant = getVariant(group, options) || "italic";
    if (variant !== defaultVariant[node.type]) {
        node.setAttribute("mathvariant", variant);
    }
    return node;
};

groupTypes.textord = function (group, options) {
    var text = makeText(group.value, group.mode);

    var variant = getVariant(group, options) || "normal";

    var node = void 0;
    if (group.mode === 'text') {
        node = new _mathMLTree2.default.MathNode("mtext", [text]);
    } else if (/[0-9]/.test(group.value)) {
        // TODO(kevinb) merge adjacent <mn> nodes
        // do it as a post processing step
        node = new _mathMLTree2.default.MathNode("mn", [text]);
    } else if (group.value === "\\prime") {
        node = new _mathMLTree2.default.MathNode("mo", [text]);
    } else {
        node = new _mathMLTree2.default.MathNode("mi", [text]);
    }
    if (variant !== defaultVariant[node.type]) {
        node.setAttribute("mathvariant", variant);
    }

    return node;
};

groupTypes.bin = function (group, options) {
    var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

    var variant = getVariant(group, options);
    if (variant === "bold-italic") {
        node.setAttribute("mathvariant", variant);
    }

    return node;
};

groupTypes.rel = function (group) {
    var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.open = function (group) {
    var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.close = function (group) {
    var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.inner = function (group) {
    var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.punct = function (group) {
    var node = new _mathMLTree2.default.MathNode("mo", [makeText(group.value, group.mode)]);

    node.setAttribute("separator", "true");

    return node;
};

groupTypes.ordgroup = function (group, options) {
    var inner = buildExpression(group.value, options);

    var node = new _mathMLTree2.default.MathNode("mrow", inner);

    return node;
};

groupTypes.supsub = function (group, options) {
    // Is the inner group a relevant horizonal brace?
    var isBrace = false;
    var isOver = void 0;
    var isSup = void 0;
    if (group.value.base) {
        if (group.value.base.value.type === "horizBrace") {
            isSup = group.value.sup ? true : false;
            if (isSup === group.value.base.value.isOver) {
                isBrace = true;
                isOver = group.value.base.value.isOver;
            }
        }
    }

    var removeUnnecessaryRow = true;
    var children = [buildGroup(group.value.base, options, removeUnnecessaryRow)];

    if (group.value.sub) {
        children.push(buildGroup(group.value.sub, options, removeUnnecessaryRow));
    }

    if (group.value.sup) {
        children.push(buildGroup(group.value.sup, options, removeUnnecessaryRow));
    }

    var nodeType = void 0;
    if (isBrace) {
        nodeType = isOver ? "mover" : "munder";
    } else if (!group.value.sub) {
        var base = group.value.base;
        if (base && base.value.limits && options.style === _Style2.default.DISPLAY) {
            nodeType = "mover";
        } else {
            nodeType = "msup";
        }
    } else if (!group.value.sup) {
        var _base = group.value.base;
        if (_base && _base.value.limits && options.style === _Style2.default.DISPLAY) {
            nodeType = "munder";
        } else {
            nodeType = "msub";
        }
    } else {
        var _base2 = group.value.base;
        if (_base2 && _base2.value.limits && options.style === _Style2.default.DISPLAY) {
            nodeType = "munderover";
        } else {
            nodeType = "msubsup";
        }
    }

    var node = new _mathMLTree2.default.MathNode(nodeType, children);

    return node;
};

groupTypes.spacing = function (group) {
    var node = void 0;

    if (group.value === "\\ " || group.value === "\\space" || group.value === " " || group.value === "~") {
        node = new _mathMLTree2.default.MathNode("mtext", [new _mathMLTree2.default.TextNode("\xA0")]);
    } else {
        node = new _mathMLTree2.default.MathNode("mspace");

        node.setAttribute("width", _buildCommon2.default.spacingFunctions[group.value].size);
    }

    return node;
};

groupTypes.font = function (group, options) {
    var font = group.value.font;
    return buildGroup(group.value.body, options.withFontFamily(font));
};

groupTypes.styling = function (group, options) {
    // Figure out what style we're changing to.
    // TODO(kevinb): dedupe this with buildHTML.js
    // This will be easier of handling of styling nodes is in the same file.
    var styleMap = {
        "display": _Style2.default.DISPLAY,
        "text": _Style2.default.TEXT,
        "script": _Style2.default.SCRIPT,
        "scriptscript": _Style2.default.SCRIPTSCRIPT
    };

    var newStyle = styleMap[group.value.style];
    var newOptions = options.havingStyle(newStyle);

    var inner = buildExpression(group.value.value, newOptions);

    var node = new _mathMLTree2.default.MathNode("mstyle", inner);

    var styleAttributes = {
        "display": ["0", "true"],
        "text": ["0", "false"],
        "script": ["1", "false"],
        "scriptscript": ["2", "false"]
    };

    var attr = styleAttributes[group.value.style];

    node.setAttribute("scriptlevel", attr[0]);
    node.setAttribute("displaystyle", attr[1]);

    return node;
};

groupTypes.sizing = function (group, options) {
    var newOptions = options.havingSize(group.value.size);
    var inner = buildExpression(group.value.value, newOptions);

    var node = new _mathMLTree2.default.MathNode("mstyle", inner);

    // TODO(emily): This doesn't produce the correct size for nested size
    // changes, because we don't keep state of what style we're currently
    // in, so we can't reset the size to normal before changing it.  Now
    // that we're passing an options parameter we should be able to fix
    // this.
    node.setAttribute("mathsize", newOptions.sizeMultiplier + "em");

    return node;
};

groupTypes.horizBrace = function (group, options) {
    var accentNode = _stretchy2.default.mathMLnode(group.value.label);
    return new _mathMLTree2.default.MathNode(group.value.isOver ? "mover" : "munder", [buildGroup(group.value.base, options), accentNode]);
};

groupTypes.xArrow = function (group, options) {
    var arrowNode = _stretchy2.default.mathMLnode(group.value.label);
    var node = void 0;
    var lowerNode = void 0;

    if (group.value.body) {
        var upperNode = buildGroup(group.value.body, options);
        if (group.value.below) {
            lowerNode = buildGroup(group.value.below, options);
            node = new _mathMLTree2.default.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
        } else {
            node = new _mathMLTree2.default.MathNode("mover", [arrowNode, upperNode]);
        }
    } else if (group.value.below) {
        lowerNode = buildGroup(group.value.below, options);
        node = new _mathMLTree2.default.MathNode("munder", [arrowNode, lowerNode]);
    } else {
        node = new _mathMLTree2.default.MathNode("mover", [arrowNode]);
    }
    return node;
};

groupTypes.mclass = function (group, options) {
    var inner = buildExpression(group.value.value, options);
    return new _mathMLTree2.default.MathNode("mstyle", inner);
};

groupTypes.raisebox = function (group, options) {
    var node = new _mathMLTree2.default.MathNode("mpadded", [buildGroup(group.value.body, options)]);
    var dy = group.value.dy.value.number + group.value.dy.value.unit;
    node.setAttribute("voffset", dy);
    return node;
};

/**
 * Takes a list of nodes, builds them, and returns a list of the generated
 * MathML nodes. A little simpler than the HTML version because we don't do any
 * previous-node handling.
 */
var buildExpression = exports.buildExpression = function buildExpression(expression, options) {
    var groups = [];
    for (var i = 0; i < expression.length; i++) {
        var group = expression[i];
        groups.push(buildGroup(group, options));
    }

    // TODO(kevinb): combine \\not with mrels and mords

    return groups;
};

/**
 * Takes a group from the parser and calls the appropriate groupTypes function
 * on it to produce a MathML node.
 */
var buildGroup = exports.buildGroup = function buildGroup(group, options) {
    var removeUnnecessaryRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!group) {
        return new _mathMLTree2.default.MathNode("mrow");
    }

    if (groupTypes[group.type]) {
        // Call the groupTypes function
        var result = groupTypes[group.type](group, options);
        if (removeUnnecessaryRow) {
            if (result.type === "mrow" && result.children.length === 1) {
                return result.children[0];
            }
        }
        return result;
    } else {
        throw new _ParseError2.default("Got group of unknown type: '" + group.type + "'");
    }
};

/**
 * Takes a full parse tree and settings and builds a MathML representation of
 * it. In particular, we put the elements from building the parse tree into a
 * <semantics> tag so we can also include that TeX source as an annotation.
 *
 * Note that we actually return a domTree element with a `<math>` inside it so
 * we can do appropriate styling.
 */
function buildMathML(tree, texExpression, options) {
    var expression = buildExpression(tree, options);

    // Wrap up the expression in an mrow so it is presented in the semantics
    // tag correctly.
    var wrapper = new _mathMLTree2.default.MathNode("mrow", expression);

    // Build a TeX annotation of the source
    var annotation = new _mathMLTree2.default.MathNode("annotation", [new _mathMLTree2.default.TextNode(texExpression)]);

    annotation.setAttribute("encoding", "application/x-tex");

    var semantics = new _mathMLTree2.default.MathNode("semantics", [wrapper, annotation]);

    var math = new _mathMLTree2.default.MathNode("math", [semantics]);

    // You can't style <math> nodes, so we wrap the node in a span.
    return _buildCommon2.default.makeSpan(["katex-mathml"], [math]);
}

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/**
 * This file contains information about the options that the Parser carries
 * around with it while parsing. Data is held in an `Options` object, and when
 * recursing, a new `Options` object can be created with the `.with*` and
 * `.reset` functions.
 */

var _fontMetrics2 = __webpack_require__(85);

var _fontMetrics3 = _interopRequireDefault(_fontMetrics2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sizeStyleMap = [
// Each element contains [textsize, scriptsize, scriptscriptsize].
// The size mappings are taken from TeX with \normalsize=10pt.
[1, 1, 1], // size1: [5, 5, 5]              \tiny
[2, 1, 1], // size2: [6, 5, 5]
[3, 1, 1], // size3: [7, 5, 5]              \scriptsize
[4, 2, 1], // size4: [8, 6, 5]              \footnotesize
[5, 2, 1], // size5: [9, 6, 5]              \small
[6, 3, 1], // size6: [10, 7, 5]             \normalsize
[7, 4, 2], // size7: [12, 8, 6]             \large
[8, 6, 3], // size8: [14.4, 10, 7]          \Large
[9, 7, 6], // size9: [17.28, 12, 10]        \LARGE
[10, 8, 7], // size10: [20.74, 14.4, 12]     \huge
[11, 10, 9]];

var sizeMultipliers = [
// fontMetrics.js:getFontMetrics also uses size indexes, so if
// you change size indexes, change that function.
0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.44, 1.728, 2.074, 2.488];

var sizeAtStyle = function sizeAtStyle(size, style) {
    return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
};

/**
 * This is the main options class. It contains the current style, size, color,
 * and font.
 *
 * Options objects should not be modified. To create a new Options with
 * different properties, call a `.having*` method.
 */
var Options = function () {
    function Options(data) {
        _classCallCheck(this, Options);

        this.style = data.style;
        this.color = data.color;
        this.size = data.size || Options.BASESIZE;
        this.textSize = data.textSize || this.size;
        this.phantom = !!data.phantom;
        this.fontFamily = data.fontFamily;
        this.fontWeight = data.fontWeight || '';
        this.fontShape = data.fontShape || '';
        this.sizeMultiplier = sizeMultipliers[this.size - 1];
        this.maxSize = data.maxSize;
        this._fontMetrics = undefined;
    }

    /**
     * Returns a new options object with the same properties as "this".  Properties
     * from "extension" will be copied to the new options object.
     */


    /**
     * The base size index.
     */


    _createClass(Options, [{
        key: "extend",
        value: function extend(extension) {
            var data = {
                style: this.style,
                size: this.size,
                textSize: this.textSize,
                color: this.color,
                phantom: this.phantom,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight,
                fontShape: this.fontShape,
                maxSize: this.maxSize
            };

            for (var key in extension) {
                if (extension.hasOwnProperty(key)) {
                    data[key] = extension[key];
                }
            }

            return new Options(data);
        }

        /**
         * Return an options object with the given style. If `this.style === style`,
         * returns `this`.
         */

    }, {
        key: "havingStyle",
        value: function havingStyle(style) {
            if (this.style === style) {
                return this;
            } else {
                return this.extend({
                    style: style,
                    size: sizeAtStyle(this.textSize, style)
                });
            }
        }

        /**
         * Return an options object with a cramped version of the current style. If
         * the current style is cramped, returns `this`.
         */

    }, {
        key: "havingCrampedStyle",
        value: function havingCrampedStyle() {
            return this.havingStyle(this.style.cramp());
        }

        /**
         * Return an options object with the given size and in at least `\textstyle`.
         * Returns `this` if appropriate.
         */

    }, {
        key: "havingSize",
        value: function havingSize(size) {
            if (this.size === size && this.textSize === size) {
                return this;
            } else {
                return this.extend({
                    style: this.style.text(),
                    size: size,
                    textSize: size,
                    sizeMultiplier: sizeMultipliers[size - 1]
                });
            }
        }

        /**
         * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
         * changes to at least `\textstyle`.
         */

    }, {
        key: "havingBaseStyle",
        value: function havingBaseStyle(style) {
            style = style || this.style.text();
            var wantSize = sizeAtStyle(Options.BASESIZE, style);
            if (this.size === wantSize && this.textSize === Options.BASESIZE && this.style === style) {
                return this;
            } else {
                return this.extend({
                    style: style,
                    size: wantSize
                });
            }
        }

        /**
         * Create a new options object with the given color.
         */

    }, {
        key: "withColor",
        value: function withColor(color) {
            return this.extend({
                color: color
            });
        }

        /**
         * Create a new options object with "phantom" set to true.
         */

    }, {
        key: "withPhantom",
        value: function withPhantom() {
            return this.extend({
                phantom: true
            });
        }

        /**
         * Create a new options objects with the give font.
         */

    }, {
        key: "withFontFamily",
        value: function withFontFamily(fontFamily) {
            return this.extend({
                fontFamily: fontFamily || this.fontFamily
            });
        }

        /**
         * Creates a new options object with the given font weight
         */

    }, {
        key: "withFontWeight",
        value: function withFontWeight(fontWeight) {
            return this.extend({
                fontWeight: fontWeight
            });
        }

        /**
         * Creates a new options object with the given font weight
         */

    }, {
        key: "withFontShape",
        value: function withFontShape(fontShape) {
            return this.extend({
                fontShape: fontShape
            });
        }

        /**
         * Return the CSS sizing classes required to switch from enclosing options
         * `oldOptions` to `this`. Returns an array of classes.
         */

    }, {
        key: "sizingClasses",
        value: function sizingClasses(oldOptions) {
            if (oldOptions.size !== this.size) {
                return ["sizing", "reset-size" + oldOptions.size, "size" + this.size];
            } else {
                return [];
            }
        }

        /**
         * Return the CSS sizing classes required to switch to the base size. Like
         * `this.havingSize(BASESIZE).sizingClasses(this)`.
         */

    }, {
        key: "baseSizingClasses",
        value: function baseSizingClasses() {
            if (this.size !== Options.BASESIZE) {
                return ["sizing", "reset-size" + this.size, "size" + Options.BASESIZE];
            } else {
                return [];
            }
        }

        /**
         * Return the font metrics for this size.
         */

    }, {
        key: "fontMetrics",
        value: function fontMetrics() {
            if (!this._fontMetrics) {
                this._fontMetrics = _fontMetrics3.default.getFontMetrics(this.size);
            }
            return this._fontMetrics;
        }

        /**
         * A map of color names to CSS colors.
         * TODO(emily): Remove this when we have real macros
         */

    }, {
        key: "getColor",


        /**
         * Gets the CSS color of the current options object, accounting for the
         * `colorMap`.
         */
        value: function getColor() {
            if (this.phantom) {
                return "transparent";
            } else if (this.color != null && Options.colorMap.hasOwnProperty(this.color)) {
                return Options.colorMap[this.color];
            } else {
                return this.color;
            }
        }
    }]);

    return Options;
}();

Options.BASESIZE = 6;
Options.colorMap = {
    "katex-blue": "#6495ed",
    "katex-orange": "#ffa500",
    "katex-pink": "#ff00af",
    "katex-red": "#df0030",
    "katex-green": "#28ae7b",
    "katex-gray": "gray",
    "katex-purple": "#9d38bd",
    "katex-blueA": "#ccfaff",
    "katex-blueB": "#80f6ff",
    "katex-blueC": "#63d9ea",
    "katex-blueD": "#11accd",
    "katex-blueE": "#0c7f99",
    "katex-tealA": "#94fff5",
    "katex-tealB": "#26edd5",
    "katex-tealC": "#01d1c1",
    "katex-tealD": "#01a995",
    "katex-tealE": "#208170",
    "katex-greenA": "#b6ffb0",
    "katex-greenB": "#8af281",
    "katex-greenC": "#74cf70",
    "katex-greenD": "#1fab54",
    "katex-greenE": "#0d923f",
    "katex-goldA": "#ffd0a9",
    "katex-goldB": "#ffbb71",
    "katex-goldC": "#ff9c39",
    "katex-goldD": "#e07d10",
    "katex-goldE": "#a75a05",
    "katex-redA": "#fca9a9",
    "katex-redB": "#ff8482",
    "katex-redC": "#f9685d",
    "katex-redD": "#e84d39",
    "katex-redE": "#bc2612",
    "katex-maroonA": "#ffbde0",
    "katex-maroonB": "#ff92c6",
    "katex-maroonC": "#ed5fa6",
    "katex-maroonD": "#ca337c",
    "katex-maroonE": "#9e034e",
    "katex-purpleA": "#ddd7ff",
    "katex-purpleB": "#c6b9fc",
    "katex-purpleC": "#aa87ff",
    "katex-purpleD": "#7854ab",
    "katex-purpleE": "#543b78",
    "katex-mintA": "#f5f9e8",
    "katex-mintB": "#edf2df",
    "katex-mintC": "#e0e5cc",
    "katex-grayA": "#f6f7f7",
    "katex-grayB": "#f0f1f2",
    "katex-grayC": "#e3e5e6",
    "katex-grayD": "#d6d8da",
    "katex-grayE": "#babec2",
    "katex-grayF": "#888d93",
    "katex-grayG": "#626569",
    "katex-grayH": "#3b3e40",
    "katex-grayI": "#21242c",
    "katex-kaBlue": "#314453",
    "katex-kaGreen": "#71B307"
};
exports.default = Options;

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ParseError = __webpack_require__(24);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _Style = __webpack_require__(40);

var _Style2 = _interopRequireDefault(_Style);

var _domTree = __webpack_require__(54);

var _domTree2 = _interopRequireDefault(_domTree);

var _buildCommon = __webpack_require__(5);

var _buildCommon2 = _interopRequireDefault(_buildCommon);

var _fontMetrics = __webpack_require__(85);

var _fontMetrics2 = _interopRequireDefault(_fontMetrics);

var _symbols = __webpack_require__(68);

var _symbols2 = _interopRequireDefault(_symbols);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the metrics for a given symbol and font, after transformation (i.e.
 * after following replacement from symbols.js)
 */
var getMetrics = function getMetrics(symbol, font, mode) {
    if (_symbols2.default.math[symbol] && _symbols2.default.math[symbol].replace) {
        return _fontMetrics2.default.getCharacterMetrics(_symbols2.default.math[symbol].replace, font, mode);
    } else {
        return _fontMetrics2.default.getCharacterMetrics(symbol, font, mode);
    }
};

/**
 * Puts a delimiter span in a given style, and adds appropriate height, depth,
 * and maxFontSizes.
 */
/**
 * This file deals with creating delimiters of various sizes. The TeXbook
 * discusses these routines on page 441-442, in the "Another subroutine sets box
 * x to a specified variable delimiter" paragraph.
 *
 * There are three main routines here. `makeSmallDelim` makes a delimiter in the
 * normal font, but in either text, script, or scriptscript style.
 * `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
 * Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
 * smaller pieces that are stacked on top of one another.
 *
 * The functions take a parameter `center`, which determines if the delimiter
 * should be centered around the axis.
 *
 * Then, there are three exposed functions. `sizedDelim` makes a delimiter in
 * one of the given sizes. This is used for things like `\bigl`.
 * `customSizedDelim` makes a delimiter with a given total height+depth. It is
 * called in places like `\sqrt`. `leftRightDelim` makes an appropriate
 * delimiter which surrounds an expression of a given height an depth. It is
 * used in `\left` and `\right`.
 */

var styleWrap = function styleWrap(delim, toStyle, options, classes) {
    var newOptions = options.havingBaseStyle(toStyle);

    var span = _buildCommon2.default.makeSpan((classes || []).concat(newOptions.sizingClasses(options)), [delim], options);

    span.delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
    span.height *= span.delimSizeMultiplier;
    span.depth *= span.delimSizeMultiplier;
    span.maxFontSize = newOptions.sizeMultiplier;

    return span;
};

var centerSpan = function centerSpan(span, options, style) {
    var newOptions = options.havingBaseStyle(style);
    var shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;

    span.classes.push("delimcenter");
    span.style.top = shift + "em";
    span.height -= shift;
    span.depth += shift;
};

/**
 * Makes a small delimiter. This is a delimiter that comes in the Main-Regular
 * font, but is restyled to either be in textstyle, scriptstyle, or
 * scriptscriptstyle.
 */
var makeSmallDelim = function makeSmallDelim(delim, style, center, options, mode, classes) {
    var text = _buildCommon2.default.makeSymbol(delim, "Main-Regular", mode, options);
    var span = styleWrap(text, style, options, classes);
    if (center) {
        centerSpan(span, options, style);
    }
    return span;
};

/**
 * Builds a symbol in the given font size (note size is an integer)
 */
var mathrmSize = function mathrmSize(value, size, mode, options) {
    return _buildCommon2.default.makeSymbol(value, "Size" + size + "-Regular", mode, options);
};

/**
 * Makes a large delimiter. This is a delimiter that comes in the Size1, Size2,
 * Size3, or Size4 fonts. It is always rendered in textstyle.
 */
var makeLargeDelim = function makeLargeDelim(delim, size, center, options, mode, classes) {
    var inner = mathrmSize(delim, size, mode, options);
    var span = styleWrap(_buildCommon2.default.makeSpan(["delimsizing", "size" + size], [inner], options), _Style2.default.TEXT, options, classes);
    if (center) {
        centerSpan(span, options, _Style2.default.TEXT);
    }
    return span;
};

/**
 * Make an inner span with the given offset and in the given font. This is used
 * in `makeStackedDelim` to make the stacking pieces for the delimiter.
 */
var makeInner = function makeInner(symbol, font, mode) {
    var sizeClass = void 0;
    // Apply the correct CSS class to choose the right font.
    if (font === "Size1-Regular") {
        sizeClass = "delim-size1";
    } else if (font === "Size4-Regular") {
        sizeClass = "delim-size4";
    }

    var inner = _buildCommon2.default.makeSpan(["delimsizinginner", sizeClass], [_buildCommon2.default.makeSpan([], [_buildCommon2.default.makeSymbol(symbol, font, mode)])]);

    // Since this will be passed into `makeVList` in the end, wrap the element
    // in the appropriate tag that VList uses.
    return { type: "elem", elem: inner };
};

/**
 * Make a stacked delimiter out of a given delimiter, with the total height at
 * least `heightTotal`. This routine is mentioned on page 442 of the TeXbook.
 */
var makeStackedDelim = function makeStackedDelim(delim, heightTotal, center, options, mode, classes) {
    // There are four parts, the top, an optional middle, a repeated part, and a
    // bottom.
    var top = void 0;
    var middle = void 0;
    var repeat = void 0;
    var bottom = void 0;
    top = repeat = bottom = delim;
    middle = null;
    // Also keep track of what font the delimiters are in
    var font = "Size1-Regular";

    // We set the parts and font based on the symbol. Note that we use
    // '\u23d0' instead of '|' and '\u2016' instead of '\\|' for the
    // repeats of the arrows
    if (delim === "\\uparrow") {
        repeat = bottom = "\u23D0";
    } else if (delim === "\\Uparrow") {
        repeat = bottom = "\u2016";
    } else if (delim === "\\downarrow") {
        top = repeat = "\u23D0";
    } else if (delim === "\\Downarrow") {
        top = repeat = "\u2016";
    } else if (delim === "\\updownarrow") {
        top = "\\uparrow";
        repeat = "\u23D0";
        bottom = "\\downarrow";
    } else if (delim === "\\Updownarrow") {
        top = "\\Uparrow";
        repeat = "\u2016";
        bottom = "\\Downarrow";
    } else if (delim === "[" || delim === "\\lbrack") {
        top = "\u23A1";
        repeat = "\u23A2";
        bottom = "\u23A3";
        font = "Size4-Regular";
    } else if (delim === "]" || delim === "\\rbrack") {
        top = "\u23A4";
        repeat = "\u23A5";
        bottom = "\u23A6";
        font = "Size4-Regular";
    } else if (delim === "\\lfloor") {
        repeat = top = "\u23A2";
        bottom = "\u23A3";
        font = "Size4-Regular";
    } else if (delim === "\\lceil") {
        top = "\u23A1";
        repeat = bottom = "\u23A2";
        font = "Size4-Regular";
    } else if (delim === "\\rfloor") {
        repeat = top = "\u23A5";
        bottom = "\u23A6";
        font = "Size4-Regular";
    } else if (delim === "\\rceil") {
        top = "\u23A4";
        repeat = bottom = "\u23A5";
        font = "Size4-Regular";
    } else if (delim === "(") {
        top = "\u239B";
        repeat = "\u239C";
        bottom = "\u239D";
        font = "Size4-Regular";
    } else if (delim === ")") {
        top = "\u239E";
        repeat = "\u239F";
        bottom = "\u23A0";
        font = "Size4-Regular";
    } else if (delim === "\\{" || delim === "\\lbrace") {
        top = "\u23A7";
        middle = "\u23A8";
        bottom = "\u23A9";
        repeat = "\u23AA";
        font = "Size4-Regular";
    } else if (delim === "\\}" || delim === "\\rbrace") {
        top = "\u23AB";
        middle = "\u23AC";
        bottom = "\u23AD";
        repeat = "\u23AA";
        font = "Size4-Regular";
    } else if (delim === "\\lgroup") {
        top = "\u23A7";
        bottom = "\u23A9";
        repeat = "\u23AA";
        font = "Size4-Regular";
    } else if (delim === "\\rgroup") {
        top = "\u23AB";
        bottom = "\u23AD";
        repeat = "\u23AA";
        font = "Size4-Regular";
    } else if (delim === "\\lmoustache") {
        top = "\u23A7";
        bottom = "\u23AD";
        repeat = "\u23AA";
        font = "Size4-Regular";
    } else if (delim === "\\rmoustache") {
        top = "\u23AB";
        bottom = "\u23A9";
        repeat = "\u23AA";
        font = "Size4-Regular";
    }

    // Get the metrics of the four sections
    var topMetrics = getMetrics(top, font, mode);
    var topHeightTotal = topMetrics.height + topMetrics.depth;
    var repeatMetrics = getMetrics(repeat, font, mode);
    var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
    var bottomMetrics = getMetrics(bottom, font, mode);
    var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
    var middleHeightTotal = 0;
    var middleFactor = 1;
    if (middle !== null) {
        var middleMetrics = getMetrics(middle, font, mode);
        middleHeightTotal = middleMetrics.height + middleMetrics.depth;
        middleFactor = 2; // repeat symmetrically above and below middle
    }

    // Calcuate the minimal height that the delimiter can have.
    // It is at least the size of the top, bottom, and optional middle combined.
    var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;

    // Compute the number of copies of the repeat symbol we will need
    var repeatCount = Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal));

    // Compute the total height of the delimiter including all the symbols
    var realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal;

    // The center of the delimiter is placed at the center of the axis. Note
    // that in this context, "center" means that the delimiter should be
    // centered around the axis in the current style, while normally it is
    // centered around the axis in textstyle.
    var axisHeight = options.fontMetrics().axisHeight;
    if (center) {
        axisHeight *= options.sizeMultiplier;
    }
    // Calculate the depth
    var depth = realHeightTotal / 2 - axisHeight;

    // Now, we start building the pieces that will go into the vlist

    // Keep a list of the inner pieces
    var inners = [];

    // Add the bottom symbol
    inners.push(makeInner(bottom, font, mode));

    if (middle === null) {
        // Add that many symbols
        for (var i = 0; i < repeatCount; i++) {
            inners.push(makeInner(repeat, font, mode));
        }
    } else {
        // When there is a middle bit, we need the middle part and two repeated
        // sections
        for (var _i = 0; _i < repeatCount; _i++) {
            inners.push(makeInner(repeat, font, mode));
        }
        inners.push(makeInner(middle, font, mode));
        for (var _i2 = 0; _i2 < repeatCount; _i2++) {
            inners.push(makeInner(repeat, font, mode));
        }
    }

    // Add the top symbol
    inners.push(makeInner(top, font, mode));

    // Finally, build the vlist
    var newOptions = options.havingBaseStyle(_Style2.default.TEXT);
    var inner = _buildCommon2.default.makeVList({
        positionType: "bottom",
        positionData: depth,
        children: inners
    }, newOptions);

    return styleWrap(_buildCommon2.default.makeSpan(["delimsizing", "mult"], [inner], newOptions), _Style2.default.TEXT, options, classes);
};

var sqrtSvg = function sqrtSvg(sqrtName, height, viewBoxHeight, options) {
    var alternate = void 0;
    if (sqrtName === "sqrtTall") {
        // sqrtTall is from glyph U23B7 in the font KaTeX_Size4-Regular
        // One path edge has a variable length. It runs from the viniculumn
        // to a point near (14 units) the bottom of the surd. The viniculum
        // is 40 units thick. So the length of the line in question is:
        var vertSegment = viewBoxHeight - 54;
        alternate = "M702 0H400000v40H742v" + vertSegment + "l-4 4-4 4c-.667.667\n-2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1h-12l-28-84c-16.667-52-96.667\n-294.333-240-727l-212 -643 -85 170c-4-3.333-8.333-7.667-13 -13l-13-13l77-155\n 77-156c66 199.333 139 419.667 219 661 l218 661zM702 0H400000v40H742z";
    }
    var pathNode = new _domTree2.default.pathNode(sqrtName, alternate);

    var svg = new _domTree2.default.svgNode([pathNode], {
        // Note: 1000:1 ratio of viewBox to document em width.
        "width": "400em",
        "height": height + "em",
        "viewBox": "0 0 400000 " + viewBoxHeight,
        "preserveAspectRatio": "xMinYMin slice"
    });

    return _buildCommon2.default.makeSpan(["hide-tail"], [svg], options);
};

/**
 * Make a sqrt image of the given height,
 */
var makeSqrtImage = function makeSqrtImage(height, options) {
    var delim = traverseSequence("\\surd", height, stackLargeDelimiterSequence, options);

    // Create a span containing an SVG image of a sqrt symbol.
    var span = void 0;
    var sizeMultiplier = options.sizeMultiplier; // default
    var spanHeight = void 0;
    var viewBoxHeight = void 0;

    if (delim.type === "small") {
        // Get an SVG that is derived from glyph U+221A in font KaTeX-Main.
        viewBoxHeight = 1000; // from font
        var newOptions = options.havingBaseStyle(delim.style);
        sizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
        spanHeight = 1 * sizeMultiplier;
        span = sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, options);
        span.style.minWidth = "0.853em";
        span.advanceWidth = 0.833 * sizeMultiplier; // from the font.
    } else if (delim.type === "large") {
        // These SVGs come from fonts: KaTeX_Size1, _Size2, etc.
        viewBoxHeight = 1000 * sizeToMaxHeight[delim.size];
        spanHeight = sizeToMaxHeight[delim.size] / sizeMultiplier;
        span = sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, options);
        span.style.minWidth = "1.02em";
        span.advanceWidth = 1.0 / sizeMultiplier; // from the font
    } else {
        // Tall sqrt. In TeX, this would be stacked using multiple glyphs.
        // We'll use a single SVG to accomplish the same thing.
        spanHeight = height / sizeMultiplier;
        viewBoxHeight = Math.floor(1000 * height);
        span = sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, options);
        span.style.minWidth = "0.742em";
        span.advanceWidth = 1.056 / sizeMultiplier;
    }

    span.height = spanHeight;
    span.style.height = spanHeight + "em";

    return {
        span: span,
        // Calculate the actual line width.
        // This actually should depend on the chosen font -- e.g. \boldmath
        // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
        // have thicker rules.
        ruleWidth: options.fontMetrics().sqrtRuleThickness * sizeMultiplier
    };
};

// There are three kinds of delimiters, delimiters that stack when they become
// too large
var stackLargeDelimiters = ["(", ")", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\\lceil", "\\rceil", "\\surd"];

// delimiters that always stack
var stackAlwaysDelimiters = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache"];

// and delimiters that never stack
var stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];

// Metrics of the different sizes. Found by looking at TeX's output of
// $\bigl| // \Bigl| \biggl| \Biggl| \showlists$
// Used to create stacked delimiters of appropriate sizes in makeSizedDelim.
var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3.0];

/**
 * Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
 */
var makeSizedDelim = function makeSizedDelim(delim, size, options, mode, classes) {
    // < and > turn into \langle and \rangle in delimiters
    if (delim === "<" || delim === "\\lt") {
        delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt") {
        delim = "\\rangle";
    }

    // Sized delimiters are never centered.
    if (_utils2.default.contains(stackLargeDelimiters, delim) || _utils2.default.contains(stackNeverDelimiters, delim)) {
        return makeLargeDelim(delim, size, false, options, mode, classes);
    } else if (_utils2.default.contains(stackAlwaysDelimiters, delim)) {
        return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
    } else {
        throw new _ParseError2.default("Illegal delimiter: '" + delim + "'");
    }
};

/**
 * There are three different sequences of delimiter sizes that the delimiters
 * follow depending on the kind of delimiter. This is used when creating custom
 * sized delimiters to decide whether to create a small, large, or stacked
 * delimiter.
 *
 * In real TeX, these sequences aren't explicitly defined, but are instead
 * defined inside the font metrics. Since there are only three sequences that
 * are possible for the delimiters that TeX defines, it is easier to just encode
 * them explicitly here.
 */

// Delimiters that never stack try small delimiters and large delimiters only
var stackNeverDelimiterSequence = [{ type: "small", style: _Style2.default.SCRIPTSCRIPT }, { type: "small", style: _Style2.default.SCRIPT }, { type: "small", style: _Style2.default.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }];

// Delimiters that always stack try the small delimiters first, then stack
var stackAlwaysDelimiterSequence = [{ type: "small", style: _Style2.default.SCRIPTSCRIPT }, { type: "small", style: _Style2.default.SCRIPT }, { type: "small", style: _Style2.default.TEXT }, { type: "stack" }];

// Delimiters that stack when large try the small and then large delimiters, and
// stack afterwards
var stackLargeDelimiterSequence = [{ type: "small", style: _Style2.default.SCRIPTSCRIPT }, { type: "small", style: _Style2.default.SCRIPT }, { type: "small", style: _Style2.default.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }, { type: "stack" }];

/**
 * Get the font used in a delimiter based on what kind of delimiter it is.
 */
var delimTypeToFont = function delimTypeToFont(type) {
    if (type.type === "small") {
        return "Main-Regular";
    } else if (type.type === "large") {
        return "Size" + type.size + "-Regular";
    } else if (type.type === "stack") {
        return "Size4-Regular";
    }
};

/**
 * Traverse a sequence of types of delimiters to decide what kind of delimiter
 * should be used to create a delimiter of the given height+depth.
 */
var traverseSequence = function traverseSequence(delim, height, sequence, options) {
    // Here, we choose the index we should start at in the sequences. In smaller
    // sizes (which correspond to larger numbers in style.size) we start earlier
    // in the sequence. Thus, scriptscript starts at index 3-3=0, script starts
    // at index 3-2=1, text starts at 3-1=2, and display starts at min(2,3-0)=2
    var start = Math.min(2, 3 - options.style.size);
    for (var i = start; i < sequence.length; i++) {
        if (sequence[i].type === "stack") {
            // This is always the last delimiter, so we just break the loop now.
            break;
        }

        var metrics = getMetrics(delim, delimTypeToFont(sequence[i]), "math");
        var heightDepth = metrics.height + metrics.depth;

        // Small delimiters are scaled down versions of the same font, so we
        // account for the style change size.

        if (sequence[i].type === "small") {
            var newOptions = options.havingBaseStyle(sequence[i].style);
            heightDepth *= newOptions.sizeMultiplier;
        }

        // Check if the delimiter at this size works for the given height.
        if (heightDepth > height) {
            return sequence[i];
        }
    }

    // If we reached the end of the sequence, return the last sequence element.
    return sequence[sequence.length - 1];
};

/**
 * Make a delimiter of a given height+depth, with optional centering. Here, we
 * traverse the sequences, and create a delimiter that the sequence tells us to.
 */
var makeCustomSizedDelim = function makeCustomSizedDelim(delim, height, center, options, mode, classes) {
    if (delim === "<" || delim === "\\lt") {
        delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt") {
        delim = "\\rangle";
    }

    // Decide what sequence to use
    var sequence = void 0;
    if (_utils2.default.contains(stackNeverDelimiters, delim)) {
        sequence = stackNeverDelimiterSequence;
    } else if (_utils2.default.contains(stackLargeDelimiters, delim)) {
        sequence = stackLargeDelimiterSequence;
    } else {
        sequence = stackAlwaysDelimiterSequence;
    }

    // Look through the sequence
    var delimType = traverseSequence(delim, height, sequence, options);

    // Get the delimiter from font glyphs.
    // Depending on the sequence element we decided on, call the
    // appropriate function.
    if (delimType.type === "small") {
        return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
    } else if (delimType.type === "large") {
        return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
    } else /* if (delimType.type === "stack") */{
            return makeStackedDelim(delim, height, center, options, mode, classes);
        }
};

/**
 * Make a delimiter for use with `\left` and `\right`, given a height and depth
 * of an expression that the delimiters surround.
 */
var makeLeftRightDelim = function makeLeftRightDelim(delim, height, depth, options, mode, classes) {
    // We always center \left/\right delimiters, so the axis is always shifted
    var axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier;

    // Taken from TeX source, tex.web, function make_left_right
    var delimiterFactor = 901;
    var delimiterExtend = 5.0 / options.fontMetrics().ptPerEm;

    var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);

    var totalHeight = Math.max(
    // In real TeX, calculations are done using integral values which are
    // 65536 per pt, or 655360 per em. So, the division here truncates in
    // TeX but doesn't here, producing different results. If we wanted to
    // exactly match TeX's calculation, we could do
    //   Math.floor(655360 * maxDistFromAxis / 500) *
    //    delimiterFactor / 655360
    // (To see the difference, compare
    //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
    // in TeX and KaTeX)
    maxDistFromAxis / 500 * delimiterFactor, 2 * maxDistFromAxis - delimiterExtend);

    // Finally, we defer to `makeCustomSizedDelim` with our calculated total
    // height
    return makeCustomSizedDelim(delim, totalHeight, true, options, mode, classes);
};

exports.default = {
    sqrtImage: makeSqrtImage,
    sizedDelim: makeSizedDelim,
    customSizedDelim: makeCustomSizedDelim,
    leftRightDelim: makeLeftRightDelim
};

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.controlWordRegex = exports.combiningDiacriticalMarksEndRegex = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/**
 * The Lexer class handles tokenizing the input in various ways. Since our
 * parser expects us to be able to backtrack, the lexer allows lexing from any
 * given starting point.
 *
 * Its main exposed function is the `lex` function, which takes a position to
 * lex from and a type of token to lex. It defers to the appropriate `_innerLex`
 * function.
 *
 * The various `_innerLex` functions perform the actual lexing of different
 * kinds.
 */

var _matchAt = __webpack_require__(566);

var _matchAt2 = _interopRequireDefault(_matchAt);

var _ParseError = __webpack_require__(24);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _SourceLocation = __webpack_require__(118);

var _SourceLocation2 = _interopRequireDefault(_SourceLocation);

var _Token = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* The following tokenRegex
 * - matches typical whitespace (but not NBSP etc.) using its first group
 * - matches comments (must have trailing newlines)
 * - does not match any control character \x00-\x1f except whitespace
 * - does not match a bare backslash
 * - matches any ASCII character except those just mentioned
 * - does not match the BMP private use area \uE000-\uF8FF
 * - does not match bare surrogate code units
 * - matches any BMP character except for those just described
 * - matches any valid Unicode surrogate pair
 * - matches a backslash followed by one or more letters
 * - matches a backslash followed by any BMP character, including newline
 * Just because the Lexer matches something doesn't mean it's valid input:
 * If there is no matching function or symbol definition, the Parser will
 * still reject the input.
 */
var commentRegexString = "%[^\n]*[\n]";
var controlWordRegexString = "\\\\[a-zA-Z@]+";
var controlSymbolRegexString = "\\\\[^\uD800-\uDFFF]";
var combiningDiacriticalMarkString = "[\u0300-\u036F]";
var combiningDiacriticalMarksEndRegex = exports.combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
var tokenRegex = new RegExp("([ \r\n\t]+)|" + ( // whitespace
"(" + commentRegexString) + // comments
"|[!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + ( // single codepoint
combiningDiacriticalMarkString + "*") + // ...plus accents
"|[\uD800-\uDBFF][\uDC00-\uDFFF]" + ( // surrogate pair
combiningDiacriticalMarkString + "*") + // ...plus accents
"|\\\\verb\\*([^]).*?\\3" + // \verb*
"|\\\\verb([^*a-zA-Z]).*?\\4" + ( // \verb unstarred
"|" + controlWordRegexString) + ( // \macroName
"|" + controlSymbolRegexString) + // \\, \', etc.
")");

// tokenRegex has no ^ marker, as required by matchAt.
// These regexs are for matching results from tokenRegex,
// so they do have ^ markers.
var controlWordRegex = exports.controlWordRegex = new RegExp("^" + controlWordRegexString);
var commentRegex = new RegExp("^" + commentRegexString);

/** Main Lexer class */

var Lexer = function () {
    function Lexer(input) {
        _classCallCheck(this, Lexer);

        // Separate accents from characters
        this.input = input;
        this.pos = 0;
    }

    /**
     * This function lexes a single token.
     */


    _createClass(Lexer, [{
        key: "lex",
        value: function lex() {
            var input = this.input;
            var pos = this.pos;
            if (pos === input.length) {
                return new _Token.Token("EOF", new _SourceLocation2.default(this, pos, pos));
            }
            var match = (0, _matchAt2.default)(tokenRegex, input, pos);
            if (match === null) {
                throw new _ParseError2.default("Unexpected character: '" + input[pos] + "'", new _Token.Token(input[pos], new _SourceLocation2.default(this, pos, pos + 1)));
            }
            var text = match[2] || " ";
            var start = this.pos;
            this.pos += match[0].length;
            var end = this.pos;

            if (commentRegex.test(text)) {
                return this.lex();
            } else {
                return new _Token.Token(text, new _SourceLocation2.default(this, start, end));
            }
        }
    }]);

    return Lexer;
}();

exports.default = Lexer;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
/* eslint no-console:0 */
/**
 * This module contains general functions that can be used for building
 * different kinds of domTree nodes in a consistent manner.
 */

var _domTree = __webpack_require__(54);

var _domTree2 = _interopRequireDefault(_domTree);

var _fontMetrics = __webpack_require__(85);

var _fontMetrics2 = _interopRequireDefault(_fontMetrics);

var _symbols = __webpack_require__(68);

var _symbols2 = _interopRequireDefault(_symbols);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

var _stretchy = __webpack_require__(55);

var _stretchy2 = _interopRequireDefault(_stretchy);

var _units = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The following have to be loaded from Main-Italic font, using class mainit
var mainitLetters = ["\\imath", "ı", // dotless i
"\\jmath", "ȷ", // dotless j
"\\pounds", "\\mathsterling", "\\textsterling", "£"];

/**
 * Looks up the given symbol in fontMetrics, after applying any symbol
 * replacements defined in symbol.js
 */
var lookupSymbol = function lookupSymbol(value,
// TODO(#963): Use a union type for this.
fontFamily, mode) {
    // Replace the value with its replaced value from symbol.js
    if (_symbols2.default[mode][value] && _symbols2.default[mode][value].replace) {
        value = _symbols2.default[mode][value].replace;
    }
    return {
        value: value,
        metrics: _fontMetrics2.default.getCharacterMetrics(value, fontFamily, mode)
    };
};

/**
 * Makes a symbolNode after translation via the list of symbols in symbols.js.
 * Correctly pulls out metrics for the character, and optionally takes a list of
 * classes to be attached to the node.
 *
 * TODO: make argument order closer to makeSpan
 * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
 * should if present come first in `classes`.
 * TODO(#953): Make `options` mandatory and always pass it in.
 */
var makeSymbol = function makeSymbol(value, fontFamily, mode, options, classes) {
    var lookup = lookupSymbol(value, fontFamily, mode);
    var metrics = lookup.metrics;
    value = lookup.value;

    var symbolNode = void 0;
    if (metrics) {
        var italic = metrics.italic;
        if (mode === "text") {
            italic = 0;
        }
        symbolNode = new _domTree2.default.symbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
    } else {
        // TODO(emily): Figure out a good way to only print this in development
        typeof console !== "undefined" && console.warn("No character metrics for '" + value + "' in style '" + fontFamily + "'");
        symbolNode = new _domTree2.default.symbolNode(value, 0, 0, 0, 0, 0, classes);
    }

    if (options) {
        symbolNode.maxFontSize = options.sizeMultiplier;
        if (options.style.isTight()) {
            symbolNode.classes.push("mtight");
        }
        var color = options.getColor();
        if (color) {
            symbolNode.style.color = color;
        }
    }

    return symbolNode;
};

/**
 * Makes a symbol in Main-Regular or AMS-Regular.
 * Used for rel, bin, open, close, inner, and punct.
 *
 * TODO(#953): Make `options` mandatory and always pass it in.
 */
var mathsym = function mathsym(value, mode, options) {
    var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    // Decide what font to render the symbol in by its entry in the symbols
    // table.
    // Have a special case for when the value = \ because the \ is used as a
    // textord in unsupported command errors but cannot be parsed as a regular
    // text ordinal and is therefore not present as a symbol in the symbols
    // table for text, as well as a special case for boldsymbol because it
    // can be used for bold + and -
    if (options && options.fontFamily && options.fontFamily === "boldsymbol" && lookupSymbol(value, "Main-Bold", mode).metrics) {
        return makeSymbol(value, "Main-Bold", mode, options, classes.concat(["mathbf"]));
    } else if (value === "\\" || _symbols2.default[mode][value].font === "main") {
        return makeSymbol(value, "Main-Regular", mode, options, classes);
    } else {
        return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
    }
};

/**
 * Makes a symbol in the default font for mathords and textords.
 */
var mathDefault = function mathDefault(value, mode, options, classes, type) {
    if (type === "mathord") {
        var fontLookup = mathit(value, mode, options, classes);
        return makeSymbol(value, fontLookup.fontName, mode, options, classes.concat([fontLookup.fontClass]));
    } else if (type === "textord") {
        var font = _symbols2.default[mode][value] && _symbols2.default[mode][value].font;
        if (font === "ams") {
            var _fontName = retrieveTextFontName("amsrm", options.fontWeight, options.fontShape);
            return makeSymbol(value, _fontName, mode, options, classes.concat("amsrm", options.fontWeight, options.fontShape));
        } else {
            // if (font === "main") {
            var _fontName2 = retrieveTextFontName("textrm", options.fontWeight, options.fontShape);
            return makeSymbol(value, _fontName2, mode, options, classes.concat(options.fontWeight, options.fontShape));
        }
    } else {
        throw new Error("unexpected type: " + type + " in mathDefault");
    }
};

/**
 * Determines which of the two font names (Main-Italic and Math-Italic) and
 * corresponding style tags (mainit or mathit) to use for font "mathit",
 * depending on the symbol.  Use this function instead of fontMap for font
 * "mathit".
 */
var mathit = function mathit(value, mode, options, classes) {
    if (/[0-9]/.test(value.charAt(0)) ||
    // glyphs for \imath and \jmath do not exist in Math-Italic so we
    // need to use Main-Italic instead
    _utils2.default.contains(mainitLetters, value)) {
        return {
            fontName: "Main-Italic",
            fontClass: "mainit"
        };
    } else {
        return {
            fontName: "Math-Italic",
            fontClass: "mathit"
        };
    }
};

/**
 * Determines which of the two font names (Main-Bold and Math-BoldItalic) and
 * corresponding style tags (mathbf or boldsymbol) to use for font "boldsymbol",
 * depending on the symbol.  Use this function instead of fontMap for font
 * "boldsymbol".
 */
var boldsymbol = function boldsymbol(value, mode, options, classes) {
    if (lookupSymbol(value, "Math-BoldItalic", mode).metrics) {
        return {
            fontName: "Math-BoldItalic",
            fontClass: "boldsymbol"
        };
    } else {
        // Some glyphs do not exist in Math-BoldItalic so we need to use
        // Main-Bold instead.
        return {
            fontName: "Main-Bold",
            fontClass: "mathbf"
        };
    }
};

/**
 * Makes either a mathord or textord in the correct font and color.
 */
var makeOrd = function makeOrd(group, options, type) {
    var mode = group.mode;
    var value = group.value;

    var classes = ["mord"];

    var fontFamily = options.fontFamily;
    if (fontFamily) {
        var _fontName3 = void 0;
        var fontClasses = void 0;
        if (fontFamily === "boldsymbol") {
            var fontData = boldsymbol(value, mode, options, classes);
            _fontName3 = fontData.fontName;
            fontClasses = [fontData.fontClass];
        } else if (fontFamily === "mathit" || _utils2.default.contains(mainitLetters, value)) {
            var _fontData = mathit(value, mode, options, classes);
            _fontName3 = _fontData.fontName;
            fontClasses = [_fontData.fontClass];
        } else if (fontFamily.indexOf("math") !== -1 || mode === "math") {
            // To support old font functions (i.e. \rm \sf etc.) or math mode.
            _fontName3 = fontMap[fontFamily].fontName;
            fontClasses = [fontFamily];
        } else {
            _fontName3 = retrieveTextFontName(fontFamily, options.fontWeight, options.fontShape);
            fontClasses = [fontFamily, options.fontWeight, options.fontShape];
        }
        if (lookupSymbol(value, _fontName3, mode).metrics) {
            return makeSymbol(value, _fontName3, mode, options, classes.concat(fontClasses));
        } else {
            return mathDefault(value, mode, options, classes, type);
        }
    } else {
        return mathDefault(value, mode, options, classes, type);
    }
};

/**
 * Combine as many characters as possible in the given array of characters
 * via their tryCombine method.
 */
var tryCombineChars = function tryCombineChars(chars) {
    for (var i = 0; i < chars.length - 1; i++) {
        if (chars[i].tryCombine(chars[i + 1])) {
            chars.splice(i + 1, 1);
            i--;
        }
    }
    return chars;
};

/**
 * Calculate the height, depth, and maxFontSize of an element based on its
 * children.
 */
var sizeElementFromChildren = function sizeElementFromChildren(elem) {
    var height = 0;
    var depth = 0;
    var maxFontSize = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = elem.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            if (child.height > height) {
                height = child.height;
            }
            if (child.depth > depth) {
                depth = child.depth;
            }
            if (child.maxFontSize > maxFontSize) {
                maxFontSize = child.maxFontSize;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    elem.height = height;
    elem.depth = depth;
    elem.maxFontSize = maxFontSize;
};

/**
 * Makes a span with the given list of classes, list of children, and options.
 *
 * TODO(#953): Ensure that `options` is always provided (currently some call
 * sites don't pass it) and make the type below mandatory.
 * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
 * should if present come first in `classes`.
 */
var makeSpan = function makeSpan(classes, children, options, style) {
    var span = new _domTree2.default.span(classes, children, options, style);

    sizeElementFromChildren(span);

    return span;
};

var makeLineSpan = function makeLineSpan(className, options) {
    // Return a span with an SVG image of a horizontal line. The SVG path
    // fills the middle fifth of the span. We want an extra tall span
    // because Chrome will sometimes not display a span that is 0.04em tall.
    var lineHeight = options.fontMetrics().defaultRuleThickness;
    var line = _stretchy2.default.ruleSpan(className, lineHeight, options);
    line.height = lineHeight;
    line.style.height = 5 * line.height + "em";
    line.maxFontSize = 1.0;
    return line;
};

/**
 * Makes an anchor with the given href, list of classes, list of children,
 * and options.
 */
var makeAnchor = function makeAnchor(href, classes, children, options) {
    var anchor = new _domTree2.default.anchor(href, classes, children, options);

    sizeElementFromChildren(anchor);

    return anchor;
};

/**
 * Makes a document fragment with the given list of children.
 */
var makeFragment = function makeFragment(children) {
    var fragment = new _domTree2.default.documentFragment(children);

    sizeElementFromChildren(fragment);

    return fragment;
};

// These are exact object types to catch typos in the names of the optional fields.


// A list of child or kern nodes to be stacked on top of each other (i.e. the
// first element will be at the bottom, and the last at the top).


// Computes the updated `children` list and the overall depth.
//
// This helper function for makeVList makes it easier to enforce type safety by
// allowing early exits (returns) in the logic.
var getVListChildrenAndDepth = function getVListChildrenAndDepth(params) {
    if (params.positionType === "individualShift") {
        var oldChildren = params.children;
        var _children = [oldChildren[0]];

        // Add in kerns to the list of params.children to get each element to be
        // shifted to the correct specified shift
        var _depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
        var currPos = _depth;
        for (var i = 1; i < oldChildren.length; i++) {
            var diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
            var _size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);

            currPos = currPos + diff;

            _children.push({ type: "kern", size: _size });
            _children.push(oldChildren[i]);
        }

        return { children: _children, depth: _depth };
    }

    var depth = void 0;
    if (params.positionType === "top") {
        // We always start at the bottom, so calculate the bottom by adding up
        // all the sizes
        var bottom = params.positionData;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = params.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var child = _step2.value;

                bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        depth = bottom;
    } else if (params.positionType === "bottom") {
        depth = -params.positionData;
    } else {
        var firstChild = params.children[0];
        if (firstChild.type !== "elem") {
            throw new Error('First child must have type "elem".');
        }
        if (params.positionType === "shift") {
            depth = -firstChild.elem.depth - params.positionData;
        } else if (params.positionType === "firstBaseline") {
            depth = -firstChild.elem.depth;
        } else {
            throw new Error("Invalid positionType " + params.positionType + ".");
        }
    }
    return { children: params.children, depth: depth };
};

/**
 * Makes a vertical list by stacking elements and kerns on top of each other.
 * Allows for many different ways of specifying the positioning method.
 *
 * See VListParam documentation above.
 */
var makeVList = function makeVList(params, options) {
    var _getVListChildrenAndD = getVListChildrenAndDepth(params),
        children = _getVListChildrenAndD.children,
        depth = _getVListChildrenAndD.depth;

    // Create a strut that is taller than any list item. The strut is added to
    // each item, where it will determine the item's baseline. Since it has
    // `overflow:hidden`, the strut's top edge will sit on the item's line box's
    // top edge and the strut's bottom edge will sit on the item's baseline,
    // with no additional line-height spacing. This allows the item baseline to
    // be positioned precisely without worrying about font ascent and
    // line-height.


    var pstrutSize = 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var child = _step3.value;

            if (child.type === "elem") {
                var _elem = child.elem;
                pstrutSize = Math.max(pstrutSize, _elem.maxFontSize, _elem.height);
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    pstrutSize += 2;
    var pstrut = makeSpan(["pstrut"], []);
    pstrut.style.height = pstrutSize + "em";

    // Create a new list of actual children at the correct offsets
    var realChildren = [];
    var minPos = depth;
    var maxPos = depth;
    var currPos = depth;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _child = _step4.value;

            if (_child.type === "kern") {
                currPos += _child.size;
            } else {
                var _elem2 = _child.elem;
                var classes = _child.wrapperClasses || [];
                var style = _child.wrapperStyle || {};

                var childWrap = makeSpan(classes, [pstrut, _elem2], undefined, style);
                childWrap.style.top = -pstrutSize - currPos - _elem2.depth + "em";
                if (_child.marginLeft) {
                    childWrap.style.marginLeft = _child.marginLeft;
                }
                if (_child.marginRight) {
                    childWrap.style.marginRight = _child.marginRight;
                }

                realChildren.push(childWrap);
                currPos += _elem2.height + _elem2.depth;
            }
            minPos = Math.min(minPos, currPos);
            maxPos = Math.max(maxPos, currPos);
        }

        // The vlist contents go in a table-cell with `vertical-align:bottom`.
        // This cell's bottom edge will determine the containing table's baseline
        // without overly expanding the containing line-box.
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    var vlist = makeSpan(["vlist"], realChildren);
    vlist.style.height = maxPos + "em";

    // A second row is used if necessary to represent the vlist's depth.
    var rows = void 0;
    if (minPos < 0) {
        var depthStrut = makeSpan(["vlist"], []);
        depthStrut.style.height = -minPos + "em";

        // Safari wants the first row to have inline content; otherwise it
        // puts the bottom of the *second* row on the baseline.
        var topStrut = makeSpan(["vlist-s"], [new _domTree2.default.symbolNode("\u200B")]);

        rows = [makeSpan(["vlist-r"], [vlist, topStrut]), makeSpan(["vlist-r"], [depthStrut])];
    } else {
        rows = [makeSpan(["vlist-r"], [vlist])];
    }

    var vtable = makeSpan(["vlist-t"], rows);
    if (rows.length === 2) {
        vtable.classes.push("vlist-t2");
    }
    vtable.height = maxPos;
    vtable.depth = -minPos;
    return vtable;
};

// Converts verb group into body string, dealing with \verb* form
var makeVerb = function makeVerb(group, options) {
    // TODO(#892): Make ParseNode type-safe and confirm `group.type` to guarantee
    // that `group.value.body` is of type string.
    var text = group.value.body;
    if (group.value.star) {
        text = text.replace(/ /g, "\u2423"); // Open Box
    } else {
        text = text.replace(/ /g, '\xA0'); // No-Break Space
        // (so that, in particular, spaces don't coalesce)
    }
    return text;
};

// Glue is a concept from TeX which is a flexible space between elements in
// either a vertical or horizontal list.  In KaTeX, at least for now, it's
// static space between elements in a horizontal layout.
var makeGlue = function makeGlue(measurement, options) {
    // Make an empty span for the rule
    var rule = makeSpan(["mord", "rule"], [], options);
    var size = (0, _units.calculateSize)(measurement, options);
    rule.style.marginRight = size + "em";
    return rule;
};

// Takes an Options object, and returns the appropriate fontLookup
var retrieveTextFontName = function retrieveTextFontName(fontFamily, fontWeight, fontShape) {
    var baseFontName = retrieveBaseFontName(fontFamily);
    var fontStylesName = retrieveFontStylesName(fontWeight, fontShape);
    return baseFontName + "-" + fontStylesName;
};

var retrieveBaseFontName = function retrieveBaseFontName(font) {
    var baseFontName = "";
    switch (font) {
        case "amsrm":
            baseFontName = "AMS";
            break;
        case "textrm":
            baseFontName = "Main";
            break;
        case "textsf":
            baseFontName = "SansSerif";
            break;
        case "texttt":
            baseFontName = "Typewriter";
            break;
        default:
            throw new Error("Invalid font provided: " + font);
    }
    return baseFontName;
};

var retrieveFontStylesName = function retrieveFontStylesName(fontWeight, fontShape) {
    var fontStylesName = '';
    if (fontWeight === "textbf") {
        fontStylesName += "Bold";
    }
    if (fontShape === "textit") {
        fontStylesName += "Italic";
    }
    return fontStylesName || "Regular";
};

// A map of spacing functions to their attributes, like size and corresponding
// CSS class
var spacingFunctions = {
    "\\qquad": {
        size: "2em",
        className: "qquad"
    },
    "\\quad": {
        size: "1em",
        className: "quad"
    },
    "\\enspace": {
        size: "0.5em",
        className: "enspace"
    },
    "\\;": {
        size: "0.277778em",
        className: "thickspace"
    },
    "\\:": {
        size: "0.22222em",
        className: "mediumspace"
    },
    "\\,": {
        size: "0.16667em",
        className: "thinspace"
    },
    "\\!": {
        size: "-0.16667em",
        className: "negativethinspace"
    }
};

/**
 * Maps TeX font commands to objects containing:
 * - variant: string used for "mathvariant" attribute in buildMathML.js
 * - fontName: the "style" parameter to fontMetrics.getCharacterMetrics
 */
// A map between tex font commands an MathML mathvariant attribute values
var fontMap = {
    // styles
    "mathbf": {
        variant: "bold",
        fontName: "Main-Bold"
    },
    "mathrm": {
        variant: "normal",
        fontName: "Main-Regular"
    },
    "textit": {
        variant: "italic",
        fontName: "Main-Italic"
    },

    // "mathit" and "boldsymbol" are missing because they require the use of two
    // fonts: Main-Italic and Math-Italic for "mathit", and Math-BoldItalic and
    // Main-Bold for "boldsymbol".  This is handled by a special case in makeOrd
    // which ends up calling mathit and boldsymbol.

    // families
    "mathbb": {
        variant: "double-struck",
        fontName: "AMS-Regular"
    },
    "mathcal": {
        variant: "script",
        fontName: "Caligraphic-Regular"
    },
    "mathfrak": {
        variant: "fraktur",
        fontName: "Fraktur-Regular"
    },
    "mathscr": {
        variant: "script",
        fontName: "Script-Regular"
    },
    "mathsf": {
        variant: "sans-serif",
        fontName: "SansSerif-Regular"
    },
    "mathtt": {
        variant: "monospace",
        fontName: "Typewriter-Regular"
    }
};

var svgData = {
    //   path, width, height
    vec: ["vec", 0.471, 0.714] // values from the font glyph
};

var staticSvg = function staticSvg(value, options) {
    // Create a span with inline SVG for the element.
    var _svgData$value = _slicedToArray(svgData[value], 3),
        pathName = _svgData$value[0],
        width = _svgData$value[1],
        height = _svgData$value[2];

    var path = new _domTree2.default.pathNode(pathName);
    var svgNode = new _domTree2.default.svgNode([path], {
        "width": width + "em",
        "height": height + "em",
        // Override CSS rule `.katex svg { width: 100% }`
        "style": "width:" + width + "em",
        "viewBox": "0 0 " + 1000 * width + " " + 1000 * height,
        "preserveAspectRatio": "xMinYMin"
    });
    var span = makeSpan(["overlay"], [svgNode], options);
    span.height = height;
    span.style.height = height + "em";
    span.style.width = width + "em";
    return span;
};

exports.default = {
    fontMap: fontMap,
    makeSymbol: makeSymbol,
    mathsym: mathsym,
    makeSpan: makeSpan,
    makeLineSpan: makeLineSpan,
    makeAnchor: makeAnchor,
    makeFragment: makeFragment,
    makeVList: makeVList,
    makeOrd: makeOrd,
    makeVerb: makeVerb,
    makeGlue: makeGlue,
    staticSvg: staticSvg,
    svgData: svgData,
    tryCombineChars: tryCombineChars,
    spacingFunctions: spacingFunctions
};

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/**
 * These objects store the data about the DOM nodes we create, as well as some
 * extra data. They can then be transformed into real DOM nodes with the
 * `toNode` function or HTML markup using `toMarkup`. They are useful for both
 * storing extra properties on the nodes, as well as providing a way to easily
 * work with the DOM.
 *
 * Similar functions for working with MathML nodes exist in mathMLTree.js.
 */


var _unicodeScripts = __webpack_require__(120);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

var _svgGeometry = __webpack_require__(538);

var _svgGeometry2 = _interopRequireDefault(_svgGeometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove null or empty classes.
 */
var createClass = function createClass(classes) {
    classes = classes.slice();
    for (var i = classes.length - 1; i >= 0; i--) {
        if (!classes[i]) {
            classes.splice(i, 1);
        }
    }

    return classes.join(" ");
};

// To ensure that all nodes have compatible signatures for these methods.


/**
 * All `DomChildNode`s MUST have `height`, `depth`, and `maxFontSize` numeric
 * fields.
 *
 * `DomChildNode` is not defined as an interface since `documentFragment` also
 * has these fields but should not be considered a `DomChildNode`.
 */

/**
 * This node represents a span node, with a className, a list of children, and
 * an inline style. It also contains information about its height, depth, and
 * maxFontSize.
 */
var span = function () {
    function span(classes, children, options, style) {
        _classCallCheck(this, span);

        this.classes = classes || [];
        this.children = children || [];
        this.height = 0;
        this.depth = 0;
        this.maxFontSize = 0;
        this.style = Object.assign({}, style);
        this.attributes = {};
        if (options) {
            if (options.style.isTight()) {
                this.classes.push("mtight");
            }
            var color = options.getColor();
            if (color) {
                this.style.color = color;
            }
        }
    }

    /**
     * Sets an arbitrary attribute on the span. Warning: use this wisely. Not all
     * browsers support attributes the same, and having too many custom attributes
     * is probably bad.
     */


    _createClass(span, [{
        key: "setAttribute",
        value: function setAttribute(attribute, value) {
            this.attributes[attribute] = value;
        }
    }, {
        key: "tryCombine",
        value: function tryCombine(sibling) {
            return false;
        }

        /**
         * Convert the span into an HTML node
         */

    }, {
        key: "toNode",
        value: function toNode() {
            var span = document.createElement("span");

            // Apply the class
            span.className = createClass(this.classes);

            // Apply inline styles
            for (var style in this.style) {
                if (Object.prototype.hasOwnProperty.call(this.style, style)) {
                    // $FlowFixMe Flow doesn't seem to understand span.style's type.
                    span.style[style] = this.style[style];
                }
            }

            // Apply attributes
            for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    span.setAttribute(attr, this.attributes[attr]);
                }
            }

            // Append the children, also as HTML nodes
            for (var i = 0; i < this.children.length; i++) {
                span.appendChild(this.children[i].toNode());
            }

            return span;
        }

        /**
         * Convert the span into an HTML markup string
         */

    }, {
        key: "toMarkup",
        value: function toMarkup() {
            var markup = "<span";

            // Add the class
            if (this.classes.length) {
                markup += " class=\"";
                markup += _utils2.default.escape(createClass(this.classes));
                markup += "\"";
            }

            var styles = "";

            // Add the styles, after hyphenation
            for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                    styles += _utils2.default.hyphenate(style) + ":" + this.style[style] + ";";
                }
            }

            if (styles) {
                markup += " style=\"" + _utils2.default.escape(styles) + "\"";
            }

            // Add the attributes
            for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    markup += " " + attr + "=\"";
                    markup += _utils2.default.escape(this.attributes[attr]);
                    markup += "\"";
                }
            }

            markup += ">";

            // Add the markup of the children, also as markup
            for (var i = 0; i < this.children.length; i++) {
                markup += this.children[i].toMarkup();
            }

            markup += "</span>";

            return markup;
        }
    }]);

    return span;
}();

/**
 * This node represents an anchor (<a>) element with a hyperlink, a list of classes,
 * a list of children, and an inline style. It also contains information about its
 * height, depth, and maxFontSize.
 */


var anchor = function () {
    function anchor(href, classes, children, options) {
        _classCallCheck(this, anchor);

        this.href = href;
        this.classes = classes;
        this.children = children;
        this.height = 0;
        this.depth = 0;
        this.maxFontSize = 0;
        this.style = {};
        this.attributes = {};
        if (options.style.isTight()) {
            this.classes.push("mtight");
        }
        var color = options.getColor();
        if (color) {
            this.style.color = color;
        }
    }

    /**
     * Sets an arbitrary attribute on the anchor. Warning: use this wisely. Not all
     * browsers support attributes the same, and having too many custom attributes
     * is probably bad.
     */


    _createClass(anchor, [{
        key: "setAttribute",
        value: function setAttribute(attribute, value) {
            this.attributes[attribute] = value;
        }
    }, {
        key: "tryCombine",
        value: function tryCombine(sibling) {
            return false;
        }

        /**
         * Convert the anchor into an HTML node
         */

    }, {
        key: "toNode",
        value: function toNode() {
            var a = document.createElement("a");

            // Apply the href
            a.setAttribute('href', this.href);

            // Apply the class
            if (this.classes.length) {
                a.className = createClass(this.classes);
            }

            // Apply inline styles
            for (var style in this.style) {
                if (Object.prototype.hasOwnProperty.call(this.style, style)) {
                    // $FlowFixMe Flow doesn't seem to understand a.style's type.
                    a.style[style] = this.style[style];
                }
            }

            // Apply attributes
            for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    a.setAttribute(attr, this.attributes[attr]);
                }
            }

            // Append the children, also as HTML nodes
            for (var i = 0; i < this.children.length; i++) {
                a.appendChild(this.children[i].toNode());
            }

            return a;
        }

        /**
         * Convert the a into an HTML markup string
         */

    }, {
        key: "toMarkup",
        value: function toMarkup() {
            var markup = "<a";

            // Add the href
            markup += "href=\"" + (markup += _utils2.default.escape(this.href)) + "\"";
            // Add the class
            if (this.classes.length) {
                markup += " class=\"" + _utils2.default.escape(createClass(this.classes)) + "\"";
            }

            var styles = "";

            // Add the styles, after hyphenation
            for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                    styles += _utils2.default.hyphenate(style) + ":" + this.style[style] + ";";
                }
            }

            if (styles) {
                markup += " style=\"" + _utils2.default.escape(styles) + "\"";
            }

            // Add the attributes
            for (var attr in this.attributes) {
                if (attr !== "href" && Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    markup += " " + attr + "=\"" + _utils2.default.escape(this.attributes[attr]) + "\"";
                }
            }

            markup += ">";

            // Add the markup of the children, also as markup
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    markup += child.toMarkup();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            markup += "</a>";

            return markup;
        }
    }]);

    return anchor;
}();

/**
 * This node represents a document fragment, which contains elements, but when
 * placed into the DOM doesn't have any representation itself. Thus, it only
 * contains children and doesn't have any HTML properties. It also keeps track
 * of a height, depth, and maxFontSize.
 */


var documentFragment = function () {
    function documentFragment(children) {
        _classCallCheck(this, documentFragment);

        this.children = children || [];
        this.height = 0;
        this.depth = 0;
        this.maxFontSize = 0;
    }

    /**
     * Convert the fragment into a node
     */


    _createClass(documentFragment, [{
        key: "toNode",
        value: function toNode() {
            // Create a fragment
            var frag = document.createDocumentFragment();

            // Append the children
            for (var i = 0; i < this.children.length; i++) {
                frag.appendChild(this.children[i].toNode());
            }

            return frag;
        }

        /**
         * Convert the fragment into HTML markup
         */

    }, {
        key: "toMarkup",
        value: function toMarkup() {
            var markup = "";

            // Simply concatenate the markup for the children together
            for (var i = 0; i < this.children.length; i++) {
                markup += this.children[i].toMarkup();
            }

            return markup;
        }
    }]);

    return documentFragment;
}();

var iCombinations = {
    'î': "\u0131\u0302",
    'ï': "\u0131\u0308",
    'í': "\u0131\u0301",
    // 'ī': '\u0131\u0304', // enable when we add Extended Latin
    'ì': "\u0131\u0300"
};

/**
 * A symbol node contains information about a single symbol. It either renders
 * to a single text node, or a span with a single text node in it, depending on
 * whether it has CSS classes, styles, or needs italic correction.
 */

var symbolNode = function () {
    function symbolNode(value, height, depth, italic, skew, width, classes, style) {
        _classCallCheck(this, symbolNode);

        this.value = value;
        this.height = height || 0;
        this.depth = depth || 0;
        this.italic = italic || 0;
        this.skew = skew || 0;
        this.width = width || 0;
        this.classes = classes || [];
        this.style = Object.assign({}, style);
        this.maxFontSize = 0;

        // Mark text from non-Latin scripts with specific classes so that we
        // can specify which fonts to use.  This allows us to render these
        // characters with a serif font in situations where the browser would
        // either default to a sans serif or render a placeholder character.
        // We use CSS class names like cjk_fallback, hangul_fallback and
        // brahmic_fallback. See ./unicodeScripts.js for the set of possible
        // script names
        var script = (0, _unicodeScripts.scriptFromCodepoint)(this.value.charCodeAt(0));
        if (script) {
            this.classes.push(script + "_fallback");
        }

        if (/[îïíì]/.test(this.value)) {
            // add ī when we add Extended Latin
            this.value = iCombinations[this.value];
        }
    }

    _createClass(symbolNode, [{
        key: "tryCombine",
        value: function tryCombine(sibling) {
            if (!sibling || !(sibling instanceof symbolNode) || this.italic > 0 || createClass(this.classes) !== createClass(sibling.classes) || this.skew !== sibling.skew || this.maxFontSize !== sibling.maxFontSize) {
                return false;
            }
            for (var style in this.style) {
                if (this.style.hasOwnProperty(style) && this.style[style] !== sibling.style[style]) {
                    return false;
                }
            }
            for (var _style in sibling.style) {
                if (sibling.style.hasOwnProperty(_style) && this.style[_style] !== sibling.style[_style]) {
                    return false;
                }
            }
            this.value += sibling.value;
            this.height = Math.max(this.height, sibling.height);
            this.depth = Math.max(this.depth, sibling.depth);
            this.italic = sibling.italic;
            return true;
        }

        /**
         * Creates a text node or span from a symbol node. Note that a span is only
         * created if it is needed.
         */

    }, {
        key: "toNode",
        value: function toNode() {
            var node = document.createTextNode(this.value);
            var span = null;

            if (this.italic > 0) {
                span = document.createElement("span");
                span.style.marginRight = this.italic + "em";
            }

            if (this.classes.length > 0) {
                span = span || document.createElement("span");
                span.className = createClass(this.classes);
            }

            for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                    span = span || document.createElement("span");
                    // $FlowFixMe Flow doesn't seem to understand span.style's type.
                    span.style[style] = this.style[style];
                }
            }

            if (span) {
                span.appendChild(node);
                return span;
            } else {
                return node;
            }
        }

        /**
         * Creates markup for a symbol node.
         */

    }, {
        key: "toMarkup",
        value: function toMarkup() {
            // TODO(alpert): More duplication than I'd like from
            // span.prototype.toMarkup and symbolNode.prototype.toNode...
            var needsSpan = false;

            var markup = "<span";

            if (this.classes.length) {
                needsSpan = true;
                markup += " class=\"";
                markup += _utils2.default.escape(createClass(this.classes));
                markup += "\"";
            }

            var styles = "";

            if (this.italic > 0) {
                styles += "margin-right:" + this.italic + "em;";
            }
            for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                    styles += _utils2.default.hyphenate(style) + ":" + this.style[style] + ";";
                }
            }

            if (styles) {
                needsSpan = true;
                markup += " style=\"" + _utils2.default.escape(styles) + "\"";
            }

            var escaped = _utils2.default.escape(this.value);
            if (needsSpan) {
                markup += ">";
                markup += escaped;
                markup += "</span>";
                return markup;
            } else {
                return escaped;
            }
        }
    }]);

    return symbolNode;
}();

/**
 * SVG nodes are used to render stretchy wide elements.
 */


var svgNode = function () {
    function svgNode(children, attributes) {
        _classCallCheck(this, svgNode);

        this.children = children || [];
        this.attributes = attributes || {};
        this.height = 0;
        this.depth = 0;
        this.maxFontSize = 0;
    }
    // Required for all `DomChildNode`s. Are always 0 for svgNode.


    _createClass(svgNode, [{
        key: "toNode",
        value: function toNode() {
            var svgNS = "http://www.w3.org/2000/svg";
            var node = document.createElementNS(svgNS, "svg");

            // Apply attributes
            for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    node.setAttribute(attr, this.attributes[attr]);
                }
            }

            for (var i = 0; i < this.children.length; i++) {
                node.appendChild(this.children[i].toNode());
            }
            return node;
        }
    }, {
        key: "toMarkup",
        value: function toMarkup() {
            var markup = "<svg";

            // Apply attributes
            for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    markup += " " + attr + "='" + this.attributes[attr] + "'";
                }
            }

            markup += ">";

            for (var i = 0; i < this.children.length; i++) {
                markup += this.children[i].toMarkup();
            }

            markup += "</svg>";

            return markup;
        }
    }]);

    return svgNode;
}();

var pathNode = function () {
    function pathNode(pathName, alternate) {
        _classCallCheck(this, pathNode);

        this.pathName = pathName;
        this.alternate = alternate; // Used only for tall \sqrt
    }

    _createClass(pathNode, [{
        key: "toNode",
        value: function toNode() {
            var svgNS = "http://www.w3.org/2000/svg";
            var node = document.createElementNS(svgNS, "path");

            if (this.alternate) {
                node.setAttribute("d", this.alternate);
            } else {
                node.setAttribute("d", _svgGeometry2.default.path[this.pathName]);
            }

            return node;
        }
    }, {
        key: "toMarkup",
        value: function toMarkup() {
            if (this.alternate) {
                return "<path d='" + this.alternate + "'/>";
            } else {
                return "<path d='" + _svgGeometry2.default.path[this.pathName] + "'/>";
            }
        }
    }]);

    return pathNode;
}();

var lineNode = function () {
    function lineNode(attributes) {
        _classCallCheck(this, lineNode);

        this.attributes = attributes || {};
    }

    _createClass(lineNode, [{
        key: "toNode",
        value: function toNode() {
            var svgNS = "http://www.w3.org/2000/svg";
            var node = document.createElementNS(svgNS, "line");

            // Apply attributes
            for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    node.setAttribute(attr, this.attributes[attr]);
                }
            }

            return node;
        }
    }, {
        key: "toMarkup",
        value: function toMarkup() {
            var markup = "<line";

            for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                    markup += " " + attr + "='" + this.attributes[attr] + "'";
                }
            }

            markup += "/>";

            return markup;
        }
    }]);

    return lineNode;
}();

exports.default = {
    span: span,
    anchor: anchor,
    documentFragment: documentFragment,
    symbolNode: symbolNode,
    svgNode: svgNode,
    pathNode: pathNode,
    lineNode: lineNode
};

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ParseError = __webpack_require__(24);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseNode = __webpack_require__(66);

var _ParseNode2 = _interopRequireDefault(_ParseNode);

var _defineFunction2 = __webpack_require__(11);

var _defineFunction3 = _interopRequireDefault(_defineFunction2);

__webpack_require__(542);

__webpack_require__(543);

__webpack_require__(544);

__webpack_require__(545);

__webpack_require__(546);

__webpack_require__(547);

__webpack_require__(548);

__webpack_require__(549);

__webpack_require__(550);

__webpack_require__(551);

__webpack_require__(552);

__webpack_require__(553);

__webpack_require__(554);

__webpack_require__(555);

__webpack_require__(556);

__webpack_require__(557);

__webpack_require__(558);

__webpack_require__(559);

__webpack_require__(560);

__webpack_require__(561);

__webpack_require__(562);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// WARNING: New functions should be added to src/functions and imported here.

var functions = _defineFunction2._functions;
/** Include this to ensure that all functions are defined. */
exports.default = functions;

// Define a convenience function that mimcs the old semantics of defineFunction
// to support existing code so that we can migrate it a little bit at a time.

var defineFunction = function defineFunction(names, props, handler) // null only if handled in parser
{
    (0, _defineFunction3.default)({ names: names, props: props, handler: handler });
};

// TODO(kevinb): have functions return an object and call defineFunction with
// that object in this file instead of relying on side-effects.


// \color is handled in Parser.js's parseImplicitGroup
defineFunction(["\\color"], {
    numArgs: 1,
    allowedInText: true,
    greediness: 3,
    argTypes: ["color"]
}, null);

// Math class commands except \mathop
defineFunction(["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"], {
    numArgs: 1
}, function (context, args) {
    var body = args[0];
    return {
        type: "mclass",
        mclass: "m" + context.funcName.substr(5),
        value: (0, _defineFunction2.ordargument)(body)
    };
});

// Build a relation by placing one symbol on top of another
defineFunction(["\\stackrel"], {
    numArgs: 2
}, function (context, args) {
    var top = args[0];
    var bottom = args[1];

    var bottomop = new _ParseNode2.default("op", {
        type: "op",
        limits: true,
        alwaysHandleSupSub: true,
        symbol: false,
        value: (0, _defineFunction2.ordargument)(bottom)
    }, bottom.mode);

    var supsub = new _ParseNode2.default("supsub", {
        base: bottomop,
        sup: top,
        sub: null
    }, top.mode);

    return {
        type: "mclass",
        mclass: "mrel",
        value: [supsub]
    };
});

var fontAliases = {
    "\\Bbb": "\\mathbb",
    "\\bold": "\\mathbf",
    "\\frak": "\\mathfrak",
    "\\bm": "\\boldsymbol"
};

var singleCharIntegrals = {
    "\u222B": "\\int",
    "\u222C": "\\iint",
    "\u222D": "\\iiint",
    "\u222E": "\\oint"
};

// There are 2 flags for operators; whether they produce limits in
// displaystyle, and whether they are symbols and should grow in
// displaystyle. These four groups cover the four possible choices.

// No limits, not symbols
defineFunction(["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"], {
    numArgs: 0
}, function (context) {
    return {
        type: "op",
        limits: false,
        symbol: false,
        body: context.funcName
    };
});

// Limits, not symbols
defineFunction(["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"], {
    numArgs: 0
}, function (context) {
    return {
        type: "op",
        limits: true,
        symbol: false,
        body: context.funcName
    };
});

// No limits, symbols
defineFunction(["\\int", "\\iint", "\\iiint", "\\oint", "\u222B", "\u222C", "\u222D", "\u222E"], {
    numArgs: 0
}, function (context) {
    var fName = context.funcName;
    if (fName.length === 1) {
        fName = singleCharIntegrals[fName];
    }
    return {
        type: "op",
        limits: false,
        symbol: true,
        body: fName
    };
});

// Sizing functions (handled in Parser.js explicitly, hence no handler)
defineFunction(["\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], { numArgs: 0 }, null);

// Style changing functions (handled in Parser.js explicitly, hence no
// handler)
defineFunction(["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], { numArgs: 0 }, null);

// Old font changing functions
defineFunction(["\\rm", "\\sf", "\\tt", "\\bf", "\\it"], { numArgs: 0 }, null);

defineFunction([
// styles
"\\mathrm", "\\mathit", "\\mathbf", "\\boldsymbol",

// families
"\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt",

// aliases
"\\Bbb", "\\bold", "\\frak", "\\bm"], {
    numArgs: 1,
    greediness: 2
}, function (context, args) {
    var body = args[0];
    var func = context.funcName;
    if (func in fontAliases) {
        func = fontAliases[func];
    }
    return {
        type: "font",
        font: func.slice(1),
        body: body
    };
});

// Horizontal stretchy braces
defineFunction(["\\overbrace", "\\underbrace"], {
    numArgs: 1
}, function (context, args) {
    var base = args[0];
    return {
        type: "horizBrace",
        label: context.funcName,
        isOver: /^\\over/.test(context.funcName),
        base: base
    };
});

// Stretchy accents under the body


// Stretchy arrows with an optional argument
defineFunction(["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom"], {
    numArgs: 1,
    numOptionalArgs: 1
}, function (context, args, optArgs) {
    var below = optArgs[0];
    var body = args[0];
    return {
        type: "xArrow", // x for extensible
        label: context.funcName,
        body: body,
        below: below
    };
});

// Infix generalized fractions
defineFunction(["\\over", "\\choose", "\\atop"], {
    numArgs: 0,
    infix: true
}, function (context) {
    var replaceWith = void 0;
    switch (context.funcName) {
        case "\\over":
            replaceWith = "\\frac";
            break;
        case "\\choose":
            replaceWith = "\\binom";
            break;
        case "\\atop":
            replaceWith = "\\\\atopfrac";
            break;
        default:
            throw new Error("Unrecognized infix genfrac command");
    }
    return {
        type: "infix",
        replaceWith: replaceWith,
        token: context.token
    };
});

// Row breaks for aligned data
defineFunction(["\\\\", "\\cr"], {
    numArgs: 0,
    numOptionalArgs: 1,
    argTypes: ["size"]
}, function (context, args, optArgs) {
    var size = optArgs[0];
    return {
        type: "cr",
        size: size
    };
});

// Environment delimiters
defineFunction(["\\begin", "\\end"], {
    numArgs: 1,
    argTypes: ["text"]
}, function (context, args) {
    var nameGroup = args[0];
    if (nameGroup.type !== "ordgroup") {
        throw new _ParseError2.default("Invalid environment name", nameGroup);
    }
    var name = "";
    for (var i = 0; i < nameGroup.value.length; ++i) {
        name += nameGroup.value[i].value;
    }
    return {
        type: "environment",
        name: name,
        nameGroup: nameGroup
    };
});

// Box manipulation
defineFunction(["\\raisebox"], {
    numArgs: 2,
    argTypes: ["size", "text"],
    allowedInText: true
}, function (context, args) {
    var amount = args[0];
    var body = args[1];
    return {
        type: "raisebox",
        dy: amount,
        body: body,
        value: (0, _defineFunction2.ordargument)(body)
    };
});

// Hyperlinks


// MathChoice

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defineFunction = __webpack_require__(11);

var _defineFunction2 = _interopRequireDefault(_defineFunction);

var _buildCommon = __webpack_require__(5);

var _buildCommon2 = _interopRequireDefault(_buildCommon);

var _domTree = __webpack_require__(54);

var _domTree2 = _interopRequireDefault(_domTree);

var _mathMLTree = __webpack_require__(7);

var _mathMLTree2 = _interopRequireDefault(_mathMLTree);

var _delimiter = __webpack_require__(122);

var _delimiter2 = _interopRequireDefault(_delimiter);

var _Style = __webpack_require__(40);

var _Style2 = _interopRequireDefault(_Style);

var _buildHTML = __webpack_require__(9);

var html = _interopRequireWildcard(_buildHTML);

var _buildMathML = __webpack_require__(10);

var mml = _interopRequireWildcard(_buildMathML);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _defineFunction2.default)({
    type: "sqrt",
    names: ["\\sqrt"],
    props: {
        numArgs: 1,
        numOptionalArgs: 1
    },
    handler: function handler(context, args, optArgs) {
        var index = optArgs[0];
        var body = args[0];
        return {
            type: "sqrt",
            body: body,
            index: index
        };
    },
    htmlBuilder: function htmlBuilder(group, options) {
        // Square roots are handled in the TeXbook pg. 443, Rule 11.

        // First, we do the same steps as in overline to build the inner group
        // and line
        var inner = html.buildGroup(group.value.body, options.havingCrampedStyle());
        if (inner.height === 0) {
            // Render a small surd.
            inner.height = options.fontMetrics().xHeight;
        }

        // Some groups can return document fragments.  Handle those by wrapping
        // them in a span.
        if (inner instanceof _domTree2.default.documentFragment) {
            inner = _buildCommon2.default.makeSpan([], [inner], options);
        }

        // Calculate the minimum size for the \surd delimiter
        var metrics = options.fontMetrics();
        var theta = metrics.defaultRuleThickness;

        var phi = theta;
        if (options.style.id < _Style2.default.TEXT.id) {
            phi = options.fontMetrics().xHeight;
        }

        // Calculate the clearance between the body and line
        var lineClearance = theta + phi / 4;

        var minDelimiterHeight = (inner.height + inner.depth + lineClearance + theta) * options.sizeMultiplier;

        // Create a sqrt SVG of the required minimum size

        var _delimiter$sqrtImage = _delimiter2.default.sqrtImage(minDelimiterHeight, options),
            img = _delimiter$sqrtImage.span,
            ruleWidth = _delimiter$sqrtImage.ruleWidth;

        var delimDepth = img.height - ruleWidth;

        // Adjust the clearance based on the delimiter size
        if (delimDepth > inner.height + inner.depth + lineClearance) {
            lineClearance = (lineClearance + delimDepth - inner.height - inner.depth) / 2;
        }

        // Shift the sqrt image
        var imgShift = img.height - inner.height - lineClearance - ruleWidth;

        inner.style.paddingLeft = img.advanceWidth + "em";

        // Overlay the image and the argument.
        var body = _buildCommon2.default.makeVList({
            positionType: "firstBaseline",
            children: [{ type: "elem", elem: inner, wrapperClasses: ["svg-align"] }, { type: "kern", size: -(inner.height + imgShift) }, { type: "elem", elem: img }, { type: "kern", size: ruleWidth }]
        }, options);

        if (!group.value.index) {
            return _buildCommon2.default.makeSpan(["mord", "sqrt"], [body], options);
        } else {
            // Handle the optional root index

            // The index is always in scriptscript style
            var newOptions = options.havingStyle(_Style2.default.SCRIPTSCRIPT);
            var rootm = html.buildGroup(group.value.index, newOptions, options);

            // The amount the index is shifted by. This is taken from the TeX
            // source, in the definition of `\r@@t`.
            var toShift = 0.6 * (body.height - body.depth);

            // Build a VList with the superscript shifted up correctly
            var rootVList = _buildCommon2.default.makeVList({
                positionType: "shift",
                positionData: -toShift,
                children: [{ type: "elem", elem: rootm }]
            }, options);
            // Add a class surrounding it so we can add on the appropriate
            // kerning
            var rootVListWrap = _buildCommon2.default.makeSpan(["root"], [rootVList]);

            return _buildCommon2.default.makeSpan(["mord", "sqrt"], [rootVListWrap, body], options);
        }
    },
    mathmlBuilder: function mathmlBuilder(group, options) {
        var node = void 0;
        if (group.value.index) {
            node = new _mathMLTree2.default.MathNode("mroot", [mml.buildGroup(group.value.body, options), mml.buildGroup(group.value.index, options)]);
        } else {
            node = new _mathMLTree2.default.MathNode("msqrt", [mml.buildGroup(group.value.body, options)]);
        }

        return node;
    }
});

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
/**
 * This file provides support to buildMathML.js and buildHTML.js
 * for stretchy wide elements rendered from SVG files
 * and other CSS trickery.
 */

var _domTree = __webpack_require__(54);

var _domTree2 = _interopRequireDefault(_domTree);

var _buildCommon = __webpack_require__(5);

var _buildCommon2 = _interopRequireDefault(_buildCommon);

var _mathMLTree = __webpack_require__(7);

var _mathMLTree2 = _interopRequireDefault(_mathMLTree);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stretchyCodePoint = {
    widehat: "^",
    widetilde: "~",
    utilde: "~",
    overleftarrow: "\u2190",
    underleftarrow: "\u2190",
    xleftarrow: "\u2190",
    overrightarrow: "\u2192",
    underrightarrow: "\u2192",
    xrightarrow: "\u2192",
    underbrace: "\u23B5",
    overbrace: "\u23DE",
    overleftrightarrow: "\u2194",
    underleftrightarrow: "\u2194",
    xleftrightarrow: "\u2194",
    Overrightarrow: "\u21D2",
    xRightarrow: "\u21D2",
    overleftharpoon: "\u21BC",
    xleftharpoonup: "\u21BC",
    overrightharpoon: "\u21C0",
    xrightharpoonup: "\u21C0",
    xLeftarrow: "\u21D0",
    xLeftrightarrow: "\u21D4",
    xhookleftarrow: "\u21A9",
    xhookrightarrow: "\u21AA",
    xmapsto: "\u21A6",
    xrightharpoondown: "\u21C1",
    xleftharpoondown: "\u21BD",
    xrightleftharpoons: "\u21CC",
    xleftrightharpoons: "\u21CB",
    xtwoheadleftarrow: "\u219E",
    xtwoheadrightarrow: "\u21A0",
    xlongequal: "=",
    xtofrom: "\u21C4"
};

var mathMLnode = function mathMLnode(label) {
    var node = new _mathMLTree2.default.MathNode("mo", [new _mathMLTree2.default.TextNode(stretchyCodePoint[label.substr(1)])]);
    node.setAttribute("stretchy", "true");
    return node;
};

// Many of the KaTeX SVG images have been adapted from glyphs in KaTeX fonts.
// Copyright (c) 2009-2010, Design Science, Inc. (<www.mathjax.org>)
// Copyright (c) 2014-2017 Khan Academy (<www.khanacademy.org>)
// Licensed under the SIL Open Font License, Version 1.1.
// See \nhttp://scripts.sil.org/OFL

// Very Long SVGs
//    Many of the KaTeX stretchy wide elements use a long SVG image and an
//    overflow: hidden tactic to achieve a stretchy image while avoiding
//    distortion of arrowheads or brace corners.

//    The SVG typically contains a very long (400 em) arrow.

//    The SVG is in a container span that has overflow: hidden, so the span
//    acts like a window that exposes only part of the  SVG.

//    The SVG always has a longer, thinner aspect ratio than the container span.
//    After the SVG fills 100% of the height of the container span,
//    there is a long arrow shaft left over. That left-over shaft is not shown.
//    Instead, it is sliced off because the span's CSS has overflow: hidden.

//    Thus, the reader sees an arrow that matches the subject matter width
//    without distortion.

//    Some functions, such as \cancel, need to vary their aspect ratio. These
//    functions do not get the overflow SVG treatment.

// Second Brush Stroke
//    Low resolution monitors struggle to display images in fine detail.
//    So browsers apply anti-aliasing. A long straight arrow shaft therefore
//    will sometimes appear as if it has a blurred edge.

//    To mitigate this, these SVG files contain a second "brush-stroke" on the
//    arrow shafts. That is, a second long thin rectangular SVG path has been
//    written directly on top of each arrow shaft. This reinforcement causes
//    some of the screen pixels to display as black instead of the anti-aliased
//    gray pixel that a  single path would generate. So we get arrow shafts
//    whose edges appear to be sharper.

// In the katexImagesData object just below, the dimensions all
// correspond to path geometry inside the relevant SVG.
// For example, \overrightarrow uses the same arrowhead as glyph U+2192
// from the KaTeX Main font. The scaling factor is 1000.
// That is, inside the font, that arrowhead is 522 units tall, which
// corresponds to 0.522 em inside the document.

var katexImagesData = {
    //   path(s), minWidth, height, align
    overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
    overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
    underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
    underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
    xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
    xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
    Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
    xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
    xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
    overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
    xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
    xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
    overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
    xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
    xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
    xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
    xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
    xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],

    overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
    overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
    underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
    underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
    xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
    xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
    xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
    xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
    xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
    xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
    overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
    underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
    overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
    undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
    xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
    xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528]
};

var groupLength = function groupLength(arg) {
    if (arg.type === "ordgroup") {
        return arg.value.length;
    } else {
        return 1;
    }
};

var svgSpan = function svgSpan(group, options) {
    // Create a span with inline SVG for the element.
    function buildSvgSpan_() {
        var viewBoxWidth = 400000; // default
        var label = group.value.label.substr(1);
        if (_utils2.default.contains(["widehat", "widetilde", "utilde"], label)) {
            // There are four SVG images available for each function.
            // Choose a taller image when there are more characters.
            var numChars = groupLength(group.value.base);
            var viewBoxHeight = void 0;
            var pathName = void 0;
            var _height = void 0;

            if (numChars > 5) {
                viewBoxHeight = label === "widehat" ? 420 : 312;
                viewBoxWidth = label === "widehat" ? 2364 : 2340;
                // Next get the span height, in 1000 ems
                _height = label === "widehat" ? 0.42 : 0.34;
                pathName = (label === "widehat" ? "widehat" : "tilde") + "4";
            } else {
                var imgIndex = [1, 1, 2, 2, 3, 3][numChars];
                if (label === "widehat") {
                    viewBoxWidth = [0, 1062, 2364, 2364, 2364][imgIndex];
                    viewBoxHeight = [0, 239, 300, 360, 420][imgIndex];
                    _height = [0, 0.24, 0.3, 0.3, 0.36, 0.42][imgIndex];
                    pathName = "widehat" + imgIndex;
                } else {
                    viewBoxWidth = [0, 600, 1033, 2339, 2340][imgIndex];
                    viewBoxHeight = [0, 260, 286, 306, 312][imgIndex];
                    _height = [0, 0.26, 0.286, 0.3, 0.306, 0.34][imgIndex];
                    pathName = "tilde" + imgIndex;
                }
            }
            var path = new _domTree2.default.pathNode(pathName);
            var svgNode = new _domTree2.default.svgNode([path], {
                "width": "100%",
                "height": _height + "em",
                "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
                "preserveAspectRatio": "none"
            });
            return {
                span: _buildCommon2.default.makeSpan([], [svgNode], options),
                minWidth: 0,
                height: _height
            };
        } else {
            var spans = [];

            var _katexImagesData$labe = _slicedToArray(katexImagesData[label], 4),
                paths = _katexImagesData$labe[0],
                _minWidth = _katexImagesData$labe[1],
                _viewBoxHeight = _katexImagesData$labe[2],
                align1 = _katexImagesData$labe[3];

            var _height2 = _viewBoxHeight / 1000;

            var numSvgChildren = paths.length;
            var widthClasses = void 0;
            var aligns = void 0;
            if (numSvgChildren === 1) {
                widthClasses = ["hide-tail"];
                aligns = [align1];
            } else if (numSvgChildren === 2) {
                widthClasses = ["halfarrow-left", "halfarrow-right"];
                aligns = ["xMinYMin", "xMaxYMin"];
            } else if (numSvgChildren === 3) {
                widthClasses = ["brace-left", "brace-center", "brace-right"];
                aligns = ["xMinYMin", "xMidYMin", "xMaxYMin"];
            } else {
                throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
            }

            for (var i = 0; i < numSvgChildren; i++) {
                var _path = new _domTree2.default.pathNode(paths[i]);

                var _svgNode = new _domTree2.default.svgNode([_path], {
                    "width": "400em",
                    "height": _height2 + "em",
                    "viewBox": "0 0 " + viewBoxWidth + " " + _viewBoxHeight,
                    "preserveAspectRatio": aligns[i] + " slice"
                });

                var _span = _buildCommon2.default.makeSpan([widthClasses[i]], [_svgNode], options);
                if (numSvgChildren === 1) {
                    return { span: _span, minWidth: _minWidth, height: _height2 };
                } else {
                    _span.style.height = _height2 + "em";
                    spans.push(_span);
                }
            }

            return {
                span: _buildCommon2.default.makeSpan(["stretchy"], spans, options),
                minWidth: _minWidth,
                height: _height2
            };
        }
    } // buildSvgSpan_()

    var _buildSvgSpan_ = buildSvgSpan_(),
        span = _buildSvgSpan_.span,
        minWidth = _buildSvgSpan_.minWidth,
        height = _buildSvgSpan_.height;

    // Note that we are returning span.depth = 0.
    // Any adjustments relative to the baseline must be done in buildHTML.


    span.height = height;
    span.style.height = height + "em";
    if (minWidth > 0) {
        span.style.minWidth = minWidth + "em";
    }

    return span;
};

var encloseSpan = function encloseSpan(inner, label, pad, options) {
    // Return an image span for \cancel, \bcancel, \xcancel, or \fbox
    var img = void 0;
    var totalHeight = inner.height + inner.depth + 2 * pad;

    if (/fbox|color/.test(label)) {
        img = _buildCommon2.default.makeSpan(["stretchy", label], [], options);

        if (label === "fbox") {
            var color = options.color && options.getColor();
            if (color) {
                img.style.borderColor = color;
            }
        }
    } else {
        // \cancel, \bcancel, or \xcancel
        // Since \cancel's SVG is inline and it omits the viewBox attribute,
        // its stroke-width will not vary with span area.

        var lines = [];
        if (/^[bx]cancel$/.test(label)) {
            lines.push(new _domTree2.default.lineNode({
                "x1": "0",
                "y1": "0",
                "x2": "100%",
                "y2": "100%",
                "stroke-width": "0.046em"
            }));
        }

        if (/^x?cancel$/.test(label)) {
            lines.push(new _domTree2.default.lineNode({
                "x1": "0",
                "y1": "100%",
                "x2": "100%",
                "y2": "0",
                "stroke-width": "0.046em"
            }));
        }

        var svgNode = new _domTree2.default.svgNode(lines, {
            "width": "100%",
            "height": totalHeight + "em"
        });

        img = _buildCommon2.default.makeSpan([], [svgNode], options);
    }

    img.height = totalHeight;
    img.style.height = totalHeight + "em";

    return img;
};

var ruleSpan = function ruleSpan(className, lineThickness, options) {

    // Get a span with an SVG line that fills the middle fifth of the span.
    // We're using an extra wide span so Chrome won't round it down to zero.

    var lines = [];
    var svgNode = void 0;
    if (className === "vertical-separator") {
        // Apply 2 brush strokes for sharper edges on low-res screens.
        for (var i = 0; i < 2; i++) {
            lines.push(new _domTree2.default.lineNode({
                "x1": "5",
                "y1": "0",
                "x2": "5",
                "y2": "10",
                "stroke-width": "2"
            }));
        }

        svgNode = new _domTree2.default.svgNode(lines, {
            "width": "0.25em",
            "height": "100%",
            "viewBox": "0 0 10 10",
            "preserveAspectRatio": "none"
        });
    } else {
        for (var _i = 0; _i < 2; _i++) {
            lines.push(new _domTree2.default.lineNode({
                "x1": "0",
                "y1": "5",
                "x2": "10",
                "y2": "5",
                "stroke-width": "2"
            }));
        }

        svgNode = new _domTree2.default.svgNode(lines, {
            "width": "100%",
            "height": 5 * lineThickness + "em",
            "viewBox": "0 0 10 10",
            "preserveAspectRatio": "none"
        });
    }

    return _buildCommon2.default.makeSpan([className], [svgNode], options);
};

exports.default = {
    encloseSpan: encloseSpan,
    mathMLnode: mathMLnode,
    ruleSpan: ruleSpan,
    svgSpan: svgSpan
};

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defineFunction = __webpack_require__(11);

var _defineFunction2 = _interopRequireDefault(_defineFunction);

var _buildCommon = __webpack_require__(5);

var _buildCommon2 = _interopRequireDefault(_buildCommon);

var _delimiter = __webpack_require__(122);

var _delimiter2 = _interopRequireDefault(_delimiter);

var _mathMLTree = __webpack_require__(7);

var _mathMLTree2 = _interopRequireDefault(_mathMLTree);

var _Style = __webpack_require__(40);

var _Style2 = _interopRequireDefault(_Style);

var _buildHTML = __webpack_require__(9);

var html = _interopRequireWildcard(_buildHTML);

var _buildMathML = __webpack_require__(10);

var mml = _interopRequireWildcard(_buildMathML);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _defineFunction2.default)({
    type: "genfrac",
    names: ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac"],
    props: {
        numArgs: 2,
        greediness: 2
    },
    handler: function handler(context, args) {
        var numer = args[0];
        var denom = args[1];
        var hasBarLine = void 0;
        var leftDelim = null;
        var rightDelim = null;
        var size = "auto";

        switch (context.funcName) {
            case "\\dfrac":
            case "\\frac":
            case "\\tfrac":
                hasBarLine = true;
                break;
            case "\\\\atopfrac":
                hasBarLine = false;
                break;
            case "\\dbinom":
            case "\\binom":
            case "\\tbinom":
                hasBarLine = false;
                leftDelim = "(";
                rightDelim = ")";
                break;
            default:
                throw new Error("Unrecognized genfrac command");
        }

        switch (context.funcName) {
            case "\\dfrac":
            case "\\dbinom":
                size = "display";
                break;
            case "\\tfrac":
            case "\\tbinom":
                size = "text";
                break;
        }

        return {
            type: "genfrac",
            numer: numer,
            denom: denom,
            hasBarLine: hasBarLine,
            leftDelim: leftDelim,
            rightDelim: rightDelim,
            size: size
        };
    },
    htmlBuilder: function htmlBuilder(group, options) {
        // Fractions are handled in the TeXbook on pages 444-445, rules 15(a-e).
        // Figure out what style this fraction should be in based on the
        // function used
        var style = options.style;
        if (group.value.size === "display") {
            style = _Style2.default.DISPLAY;
        } else if (group.value.size === "text") {
            style = _Style2.default.TEXT;
        }

        var nstyle = style.fracNum();
        var dstyle = style.fracDen();
        var newOptions = void 0;

        newOptions = options.havingStyle(nstyle);
        var numerm = html.buildGroup(group.value.numer, newOptions, options);

        newOptions = options.havingStyle(dstyle);
        var denomm = html.buildGroup(group.value.denom, newOptions, options);

        var rule = void 0;
        var ruleWidth = void 0;
        var ruleSpacing = void 0;
        if (group.value.hasBarLine) {
            rule = _buildCommon2.default.makeLineSpan("frac-line", options);
            ruleWidth = rule.height;
            ruleSpacing = rule.height;
        } else {
            rule = null;
            ruleWidth = 0;
            ruleSpacing = options.fontMetrics().defaultRuleThickness;
        }

        // Rule 15b
        var numShift = void 0;
        var clearance = void 0;
        var denomShift = void 0;
        if (style.size === _Style2.default.DISPLAY.size) {
            numShift = options.fontMetrics().num1;
            if (ruleWidth > 0) {
                clearance = 3 * ruleSpacing;
            } else {
                clearance = 7 * ruleSpacing;
            }
            denomShift = options.fontMetrics().denom1;
        } else {
            if (ruleWidth > 0) {
                numShift = options.fontMetrics().num2;
                clearance = ruleSpacing;
            } else {
                numShift = options.fontMetrics().num3;
                clearance = 3 * ruleSpacing;
            }
            denomShift = options.fontMetrics().denom2;
        }

        var frac = void 0;
        if (!rule) {
            // Rule 15c
            var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
            if (candidateClearance < clearance) {
                numShift += 0.5 * (clearance - candidateClearance);
                denomShift += 0.5 * (clearance - candidateClearance);
            }

            frac = _buildCommon2.default.makeVList({
                positionType: "individualShift",
                children: [{ type: "elem", elem: denomm, shift: denomShift }, { type: "elem", elem: numerm, shift: -numShift }]
            }, options);
        } else {
            // Rule 15d
            var axisHeight = options.fontMetrics().axisHeight;

            if (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth) < clearance) {
                numShift += clearance - (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth));
            }

            if (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift) < clearance) {
                denomShift += clearance - (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift));
            }

            var midShift = -(axisHeight - 0.5 * ruleWidth);

            frac = _buildCommon2.default.makeVList({
                positionType: "individualShift",
                children: [{ type: "elem", elem: denomm, shift: denomShift },
                // The next line would ordinarily contain "shift: midShift".
                // But we put the rule into a a span that is 5 rules tall,
                // to overcome a Chrome rendering issue. Put another way,
                // we've replaced a kern of width = 2 * ruleWidth with a
                // bottom gap in the SVG = 2 * ruleWidth.
                { type: "elem", elem: rule, shift: midShift + 2 * ruleWidth }, { type: "elem", elem: numerm, shift: -numShift }]
            }, options);
        }

        // Since we manually change the style sometimes (with \dfrac or \tfrac),
        // account for the possible size change here.
        newOptions = options.havingStyle(style);
        frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
        frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier;

        // Rule 15e
        var delimSize = void 0;
        if (style.size === _Style2.default.DISPLAY.size) {
            delimSize = options.fontMetrics().delim1;
        } else {
            delimSize = options.fontMetrics().delim2;
        }

        var leftDelim = void 0;
        var rightDelim = void 0;
        if (group.value.leftDelim == null) {
            leftDelim = html.makeNullDelimiter(options, ["mopen"]);
        } else {
            leftDelim = _delimiter2.default.customSizedDelim(group.value.leftDelim, delimSize, true, options.havingStyle(style), group.mode, ["mopen"]);
        }
        if (group.value.rightDelim == null) {
            rightDelim = html.makeNullDelimiter(options, ["mclose"]);
        } else {
            rightDelim = _delimiter2.default.customSizedDelim(group.value.rightDelim, delimSize, true, options.havingStyle(style), group.mode, ["mclose"]);
        }

        return _buildCommon2.default.makeSpan(["mord"].concat(newOptions.sizingClasses(options)), [leftDelim, _buildCommon2.default.makeSpan(["mfrac"], [frac]), rightDelim], options);
    },
    mathmlBuilder: function mathmlBuilder(group, options) {
        var node = new _mathMLTree2.default.MathNode("mfrac", [mml.buildGroup(group.value.numer, options), mml.buildGroup(group.value.denom, options)]);

        if (!group.value.hasBarLine) {
            node.setAttribute("linethickness", "0px");
        }

        if (group.value.leftDelim != null || group.value.rightDelim != null) {
            var withDelims = [];

            if (group.value.leftDelim != null) {
                var leftOp = new _mathMLTree2.default.MathNode("mo", [new _mathMLTree2.default.TextNode(group.value.leftDelim)]);

                leftOp.setAttribute("fence", "true");

                withDelims.push(leftOp);
            }

            withDelims.push(node);

            if (group.value.rightDelim != null) {
                var rightOp = new _mathMLTree2.default.MathNode("mo", [new _mathMLTree2.default.TextNode(group.value.rightDelim)]);

                rightOp.setAttribute("fence", "true");

                withDelims.push(rightOp);
            }

            var outerNode = new _mathMLTree2.default.MathNode("mrow", withDelims);

            return outerNode;
        }

        return node;
    }
});

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _buildCommon = __webpack_require__(5);

var _buildCommon2 = _interopRequireDefault(_buildCommon);

var _defineEnvironment = __webpack_require__(180);

var _defineEnvironment2 = _interopRequireDefault(_defineEnvironment);

var _mathMLTree = __webpack_require__(7);

var _mathMLTree2 = _interopRequireDefault(_mathMLTree);

var _ParseError = __webpack_require__(24);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseNode = __webpack_require__(66);

var _ParseNode2 = _interopRequireDefault(_ParseNode);

var _units = __webpack_require__(56);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

var _stretchy = __webpack_require__(55);

var _stretchy2 = _interopRequireDefault(_stretchy);

var _buildHTML = __webpack_require__(9);

var html = _interopRequireWildcard(_buildHTML);

var _buildMathML = __webpack_require__(10);

var mml = _interopRequireWildcard(_buildMathML);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse the body of the environment, with rows delimited by \\ and
 * columns delimited by &, and create a nested list in row-major order
 * with one group per cell.  If given an optional argument style
 * ("text", "display", etc.), then each cell is cast into that style.
 */


// Data stored in the ParseNode associated with the environment.
function parseArray(parser, result, style) {
    var row = [];
    var body = [row];
    var rowGaps = [];
    while (true) {
        // eslint-disable-line no-constant-condition
        var cell = parser.parseExpression(false, undefined);
        cell = new _ParseNode2.default("ordgroup", cell, parser.mode);
        if (style) {
            cell = new _ParseNode2.default("styling", {
                style: style,
                value: [cell]
            }, parser.mode);
        }
        row.push(cell);
        var next = parser.nextToken.text;
        if (next === "&") {
            parser.consume();
        } else if (next === "\\end") {
            // Arrays terminate newlines with `\crcr` which consumes a `\cr` if
            // the last line is empty.
            var lastRow = body[body.length - 1];
            if (body.length > 1 && lastRow.length === 1 && lastRow[0].value.value[0].value.length === 0) {
                body.pop();
            }
            break;
        } else if (next === "\\\\" || next === "\\cr") {
            var cr = parser.parseFunction();
            if (!cr) {
                throw new _ParseError2.default("Failed to parse function after " + next);
            }
            rowGaps.push(cr.value.size);
            row = [];
            body.push(row);
        } else {
            throw new _ParseError2.default("Expected & or \\\\ or \\end", parser.nextToken);
        }
    }
    result.body = body;
    result.rowGaps = rowGaps;
    return new _ParseNode2.default(result.type, result, parser.mode);
}

// Decides on a style for cells in an array according to whether the given
// environment name starts with the letter 'd'.
function dCellStyle(envName) {
    if (envName.substr(0, 1) === "d") {
        return "display";
    } else {
        return "text";
    }
}

var htmlBuilder = function htmlBuilder(group, options) {
    var r = void 0;
    var c = void 0;
    var nr = group.value.body.length;
    var nc = 0;
    var body = new Array(nr);

    // Horizontal spacing
    var pt = 1 / options.fontMetrics().ptPerEm;
    var arraycolsep = 5 * pt; // \arraycolsep in article.cls

    // Vertical spacing
    var baselineskip = 12 * pt; // see size10.clo
    // Default \jot from ltmath.dtx
    // TODO(edemaine): allow overriding \jot via \setlength (#687)
    var jot = 3 * pt;
    // Default \arraystretch from lttab.dtx
    // TODO(gagern): may get redefined once we have user-defined macros
    var arraystretch = _utils2.default.deflt(group.value.arraystretch, 1);
    var arrayskip = arraystretch * baselineskip;
    var arstrutHeight = 0.7 * arrayskip; // \strutbox in ltfsstrc.dtx and
    var arstrutDepth = 0.3 * arrayskip; // \@arstrutbox in lttab.dtx

    var totalHeight = 0;
    for (r = 0; r < group.value.body.length; ++r) {
        var inrow = group.value.body[r];
        var _height = arstrutHeight; // \@array adds an \@arstrut
        var _depth = arstrutDepth; // to each tow (via the template)

        if (nc < inrow.length) {
            nc = inrow.length;
        }

        var outrow = new Array(inrow.length);
        for (c = 0; c < inrow.length; ++c) {
            var elt = html.buildGroup(inrow[c], options);
            if (_depth < elt.depth) {
                _depth = elt.depth;
            }
            if (_height < elt.height) {
                _height = elt.height;
            }
            outrow[c] = elt;
        }

        var gap = 0;
        if (group.value.rowGaps[r]) {
            gap = (0, _units.calculateSize)(group.value.rowGaps[r].value, options);
            if (gap > 0) {
                // \@argarraycr
                gap += arstrutDepth;
                if (_depth < gap) {
                    _depth = gap; // \@xargarraycr
                }
                gap = 0;
            }
        }
        // In AMS multiline environments such as aligned and gathered, rows
        // correspond to lines that have additional \jot added to the
        // \baselineskip via \openup.
        if (group.value.addJot) {
            _depth += jot;
        }

        outrow.height = _height;
        outrow.depth = _depth;
        totalHeight += _height;
        outrow.pos = totalHeight;
        totalHeight += _depth + gap; // \@yargarraycr
        body[r] = outrow;
    }

    var offset = totalHeight / 2 + options.fontMetrics().axisHeight;
    var colDescriptions = group.value.cols || [];
    var cols = [];
    var colSep = void 0;
    var colDescrNum = void 0;
    for (c = 0, colDescrNum = 0;
    // Continue while either there are more columns or more column
    // descriptions, so trailing separators don't get lost.
    c < nc || colDescrNum < colDescriptions.length; ++c, ++colDescrNum) {

        var colDescr = colDescriptions[colDescrNum] || {};

        var firstSeparator = true;
        while (colDescr.type === "separator") {
            // If there is more than one separator in a row, add a space
            // between them.
            if (!firstSeparator) {
                colSep = _buildCommon2.default.makeSpan(["arraycolsep"], []);
                colSep.style.width = options.fontMetrics().doubleRuleSep + "em";
                cols.push(colSep);
            }

            if (colDescr.separator === "|") {
                var _separator = _stretchy2.default.ruleSpan("vertical-separator", 0.05, options);
                _separator.style.height = totalHeight + "em";
                _separator.style.verticalAlign = -(totalHeight - offset) + "em";

                cols.push(_separator);
            } else {
                throw new _ParseError2.default("Invalid separator type: " + colDescr.separator);
            }

            colDescrNum++;
            colDescr = colDescriptions[colDescrNum] || {};
            firstSeparator = false;
        }

        if (c >= nc) {
            continue;
        }

        var sepwidth = void 0;
        if (c > 0 || group.value.hskipBeforeAndAfter) {
            sepwidth = _utils2.default.deflt(colDescr.pregap, arraycolsep);
            if (sepwidth !== 0) {
                colSep = _buildCommon2.default.makeSpan(["arraycolsep"], []);
                colSep.style.width = sepwidth + "em";
                cols.push(colSep);
            }
        }

        var col = [];
        for (r = 0; r < nr; ++r) {
            var row = body[r];
            var elem = row[c];
            if (!elem) {
                continue;
            }
            var shift = row.pos - offset;
            elem.depth = row.depth;
            elem.height = row.height;
            col.push({ type: "elem", elem: elem, shift: shift });
        }

        col = _buildCommon2.default.makeVList({
            positionType: "individualShift",
            children: col
        }, options);
        col = _buildCommon2.default.makeSpan(["col-align-" + (colDescr.align || "c")], [col]);
        cols.push(col);

        if (c < nc - 1 || group.value.hskipBeforeAndAfter) {
            sepwidth = _utils2.default.deflt(colDescr.postgap, arraycolsep);
            if (sepwidth !== 0) {
                colSep = _buildCommon2.default.makeSpan(["arraycolsep"], []);
                colSep.style.width = sepwidth + "em";
                cols.push(colSep);
            }
        }
    }
    body = _buildCommon2.default.makeSpan(["mtable"], cols);
    return _buildCommon2.default.makeSpan(["mord"], [body], options);
};

var mathmlBuilder = function mathmlBuilder(group, options) {
    return new _mathMLTree2.default.MathNode("mtable", group.value.body.map(function (row) {
        return new _mathMLTree2.default.MathNode("mtr", row.map(function (cell) {
            return new _mathMLTree2.default.MathNode("mtd", [mml.buildGroup(cell, options)]);
        }));
    }));
};

// Convinient function for aligned and alignedat environments.
var alignedHandler = function alignedHandler(context, args) {
    var res = {
        type: "array",
        cols: [],
        addJot: true
    };
    res = parseArray(context.parser, res, "display");

    // Determining number of columns.
    // 1. If the first argument is given, we use it as a number of columns,
    //    and makes sure that each row doesn't exceed that number.
    // 2. Otherwise, just count number of columns = maximum number
    //    of cells in each row ("aligned" mode -- isAligned will be true).
    //
    // At the same time, prepend empty group {} at beginning of every second
    // cell in each row (starting with second cell) so that operators become
    // binary.  This behavior is implemented in amsmath's \start@aligned.
    var numMaths = void 0;
    var numCols = 0;
    var emptyGroup = new _ParseNode2.default("ordgroup", [], context.mode);
    if (args[0] && args[0].value) {
        var arg0 = "";
        for (var i = 0; i < args[0].value.length; i++) {
            arg0 += args[0].value[i].value;
        }
        numMaths = Number(arg0);
        numCols = numMaths * 2;
    }
    var isAligned = !numCols;
    res.value.body.forEach(function (row) {
        for (var _i = 1; _i < row.length; _i += 2) {
            // Modify ordgroup node within styling node
            var ordgroup = row[_i].value.value[0];
            ordgroup.value.unshift(emptyGroup);
        }
        if (!isAligned) {
            // Case 1
            var curMaths = row.length / 2;
            if (numMaths < curMaths) {
                throw new _ParseError2.default("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row);
            }
        } else if (numCols < row.length) {
            // Case 2
            numCols = row.length;
        }
    });

    // Adjusting alignment.
    // In aligned mode, we add one \qquad between columns;
    // otherwise we add nothing.
    for (var _i2 = 0; _i2 < numCols; ++_i2) {
        var _align = "r";
        var _pregap = 0;
        if (_i2 % 2 === 1) {
            _align = "l";
        } else if (_i2 > 0 && isAligned) {
            // "aligned" mode.
            _pregap = 1; // add one \quad
        }
        res.value.cols[_i2] = {
            type: "align",
            align: _align,
            pregap: _pregap,
            postgap: 0
        };
    }
    return res;
};

// Arrays are part of LaTeX, defined in lttab.dtx so its documentation
// is part of the source2e.pdf file of LaTeX2e source documentation.
// {darray} is an {array} environment where cells are set in \displaystyle,
// as defined in nccmath.sty.
(0, _defineEnvironment2.default)({
    type: "array",
    names: ["array", "darray"],
    props: {
        numArgs: 1
    },
    handler: function handler(context, args) {
        var colalign = args[0];
        colalign = colalign.value.map ? colalign.value : [colalign];
        var cols = colalign.map(function (node) {
            var ca = node.value;
            if ("lcr".indexOf(ca) !== -1) {
                return {
                    type: "align",
                    align: ca
                };
            } else if (ca === "|") {
                return {
                    type: "separator",
                    separator: "|"
                };
            }
            throw new _ParseError2.default("Unknown column alignment: " + node.value, node);
        });
        var res = {
            type: "array",
            cols: cols,
            hskipBeforeAndAfter: true // \@preamble in lttab.dtx
        };
        res = parseArray(context.parser, res, dCellStyle(context.envName));
        return res;
    },
    htmlBuilder: htmlBuilder,
    mathmlBuilder: mathmlBuilder
});

// The matrix environments of amsmath builds on the array environment
// of LaTeX, which is discussed above.
(0, _defineEnvironment2.default)({
    type: "array",
    names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"],
    props: {
        numArgs: 0
    },
    handler: function handler(context) {
        var delimiters = {
            "matrix": null,
            "pmatrix": ["(", ")"],
            "bmatrix": ["[", "]"],
            "Bmatrix": ["\\{", "\\}"],
            "vmatrix": ["|", "|"],
            "Vmatrix": ["\\Vert", "\\Vert"]
        }[context.envName];
        var res = {
            type: "array",
            hskipBeforeAndAfter: false // \hskip -\arraycolsep in amsmath
        };
        res = parseArray(context.parser, res, dCellStyle(context.envName));
        if (delimiters) {
            res = new _ParseNode2.default("leftright", {
                body: [res],
                left: delimiters[0],
                right: delimiters[1]
            }, context.mode);
        }
        return res;
    },
    htmlBuilder: htmlBuilder,
    mathmlBuilder: mathmlBuilder
});

// A cases environment (in amsmath.sty) is almost equivalent to
// \def\arraystretch{1.2}%
// \left\{\begin{array}{@{}l@{\quad}l@{}} … \end{array}\right.
// {dcases} is a {cases} environment where cells are set in \displaystyle,
// as defined in mathtools.sty.
(0, _defineEnvironment2.default)({
    type: "array",
    names: ["cases", "dcases"],
    props: {
        numArgs: 0
    },
    handler: function handler(context) {
        var res = {
            type: "array",
            arraystretch: 1.2,
            cols: [{
                type: "align",
                align: "l",
                pregap: 0,
                // TODO(kevinb) get the current style.
                // For now we use the metrics for TEXT style which is what we were
                // doing before.  Before attempting to get the current style we
                // should look at TeX's behavior especially for \over and matrices.
                postgap: 1.0 /* 1em quad */
            }, {
                type: "align",
                align: "l",
                pregap: 0,
                postgap: 0
            }]
        };
        res = parseArray(context.parser, res, dCellStyle(context.envName));
        res = new _ParseNode2.default("leftright", {
            body: [res],
            left: "\\{",
            right: "."
        }, context.mode);
        return res;
    },
    htmlBuilder: htmlBuilder,
    mathmlBuilder: mathmlBuilder
});

// An aligned environment is like the align* environment
// except it operates within math mode.
// Note that we assume \nomallineskiplimit to be zero,
// so that \strut@ is the same as \strut.
(0, _defineEnvironment2.default)({
    type: "array",
    names: ["aligned"],
    props: {
        numArgs: 0
    },
    handler: alignedHandler,
    htmlBuilder: htmlBuilder,
    mathmlBuilder: mathmlBuilder
});

// A gathered environment is like an array environment with one centered
// column, but where rows are considered lines so get \jot line spacing
// and contents are set in \displaystyle.
(0, _defineEnvironment2.default)({
    type: "array",
    names: ["gathered"],
    props: {
        numArgs: 0
    },
    handler: function handler(context) {
        var res = {
            type: "array",
            cols: [{
                type: "align",
                align: "c"
            }],
            addJot: true
        };
        res = parseArray(context.parser, res, "display");
        return res;
    },
    htmlBuilder: htmlBuilder,
    mathmlBuilder: mathmlBuilder
});

// alignat environment is like an align environment, but one must explicitly
// specify maximum number of columns in each row, and can adjust spacing between
// each columns.
(0, _defineEnvironment2.default)({
    type: "array",
    names: ["alignedat"],
    // One for numbered and for unnumbered;
    // but, KaTeX doesn't supports math numbering yet,
    // they make no difference for now.
    props: {
        numArgs: 1
    },
    handler: alignedHandler,
    htmlBuilder: htmlBuilder,
    mathmlBuilder: mathmlBuilder
});

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defineMacro = defineMacro;

var _fontMetricsData = __webpack_require__(178);

var _fontMetricsData2 = _interopRequireDefault(_fontMetricsData);

var _symbols = __webpack_require__(68);

var _symbols2 = _interopRequireDefault(_symbols);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

var _Token = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides context to macros defined by functions. Implemented by
 * MacroExpander.
 */


/** Macro tokens (in reverse order). */

/**
 * Predefined macros for KaTeX.
 * This can be used to define some commands in terms of others.
 */

var builtinMacros = {};
exports.default = builtinMacros;

// This function might one day accept an additional argument and do more things.

function defineMacro(name, body) {
    builtinMacros[name] = body;
}

//////////////////////////////////////////////////////////////////////
// macro tools

// LaTeX's \@firstoftwo{#1}{#2} expands to #1, skipping #2
// TeX source: \long\def\@firstoftwo#1#2{#1}
defineMacro("\\@firstoftwo", function (context) {
    var args = context.consumeArgs(2);
    return { tokens: args[0], numArgs: 0 };
});

// LaTeX's \@secondoftwo{#1}{#2} expands to #2, skipping #1
// TeX source: \long\def\@secondoftwo#1#2{#2}
defineMacro("\\@secondoftwo", function (context) {
    var args = context.consumeArgs(2);
    return { tokens: args[1], numArgs: 0 };
});

// LaTeX's \@ifnextchar{#1}{#2}{#3} looks ahead to the next (unexpanded)
// symbol.  If it matches #1, then the macro expands to #2; otherwise, #3.
// Note, however, that it does not consume the next symbol in either case.
defineMacro("\\@ifnextchar", function (context) {
    var args = context.consumeArgs(3); // symbol, if, else
    var nextToken = context.future();
    if (args[0].length === 1 && args[0][0].text === nextToken.text) {
        return { tokens: args[1], numArgs: 0 };
    } else {
        return { tokens: args[2], numArgs: 0 };
    }
});

// LaTeX's \@ifstar{#1}{#2} looks ahead to the next (unexpanded) symbol.
// If it is `*`, then it consumes the symbol, and the macro expands to #1;
// otherwise, the macro expands to #2 (without consuming the symbol).
// TeX source: \def\@ifstar#1{\@ifnextchar *{\@firstoftwo{#1}}}
defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");

// LaTeX's \TextOrMath{#1}{#2} expands to #1 in text mode, #2 in math mode
defineMacro("\\TextOrMath", function (context) {
    var args = context.consumeArgs(2);
    if (context.mode === 'text') {
        return { tokens: args[0], numArgs: 0 };
    } else {
        return { tokens: args[1], numArgs: 0 };
    }
});

//////////////////////////////////////////////////////////////////////
// Grouping
// \let\bgroup={ \let\egroup=}
defineMacro("\\bgroup", "{");
defineMacro("\\egroup", "}");
defineMacro("\\begingroup", "{");
defineMacro("\\endgroup", "}");

// Symbols from latex.ltx:
// \def\lq{`}
// \def\rq{'}
// \def\lbrack{[}
// \def\rbrack{]}
// \def \aa {\r a}
// \def \AA {\r A}
defineMacro("\\lq", "`");
defineMacro("\\rq", "'");
defineMacro("\\lbrack", "[");
defineMacro("\\rbrack", "]");
defineMacro("\\aa", "\\r a");
defineMacro("\\AA", "\\r A");

// Unicode double-struck letters
defineMacro("\u2102", "\\mathbb{C}");
defineMacro("\u210D", "\\mathbb{H}");
defineMacro("\u2115", "\\mathbb{N}");
defineMacro("\u2119", "\\mathbb{P}");
defineMacro("\u211A", "\\mathbb{Q}");
defineMacro("\u211D", "\\mathbb{R}");
defineMacro("\u2124", "\\mathbb{Z}");

// Unicode middle dot
// The KaTeX fonts do not contain U+00B7. Instead, \cdotp displays
// the dot at U+22C5 and gives it punct spacing.
defineMacro("\xB7", "\\cdotp");

// \llap and \rlap render their contents in text mode
defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
defineMacro("\\clap", "\\mathclap{\\textrm{#1}}");

//////////////////////////////////////////////////////////////////////
// amsmath.sty
// http://mirrors.concertpass.com/tex-archive/macros/latex/required/amsmath/amsmath.pdf

// \def\overset#1#2{\binrel@{#2}\binrel@@{\mathop{\kern\z@#2}\limits^{#1}}}
defineMacro("\\overset", "\\mathop{#2}\\limits^{#1}");
defineMacro("\\underset", "\\mathop{#2}\\limits_{#1}");

// \newcommand{\boxed}[1]{\fbox{\m@th$\displaystyle#1$}}
defineMacro("\\boxed", "\\fbox{\\displaystyle{#1}}");

// \def\iff{\DOTSB\;\Longleftrightarrow\;}
// \def\implies{\DOTSB\;\Longrightarrow\;}
// \def\impliedby{\DOTSB\;\Longleftarrow\;}
defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");

// AMSMath's automatic \dots, based on \mdots@@ macro.
var dotsByToken = {
    ',': '\\dotsc',
    '\\not': '\\dotsb',
    // \keybin@ checks for the following:
    '+': '\\dotsb',
    '=': '\\dotsb',
    '<': '\\dotsb',
    '>': '\\dotsb',
    '-': '\\dotsb',
    '*': '\\dotsb',
    ':': '\\dotsb',
    // Symbols whose definition starts with \DOTSB:
    '\\DOTSB': '\\dotsb',
    '\\coprod': '\\dotsb',
    '\\bigvee': '\\dotsb',
    '\\bigwedge': '\\dotsb',
    '\\biguplus': '\\dotsb',
    '\\bigcap': '\\dotsb',
    '\\bigcup': '\\dotsb',
    '\\prod': '\\dotsb',
    '\\sum': '\\dotsb',
    '\\bigotimes': '\\dotsb',
    '\\bigoplus': '\\dotsb',
    '\\bigodot': '\\dotsb',
    '\\bigsqcup': '\\dotsb',
    '\\implies': '\\dotsb',
    '\\impliedby': '\\dotsb',
    '\\And': '\\dotsb',
    '\\longrightarrow': '\\dotsb',
    '\\Longrightarrow': '\\dotsb',
    '\\longleftarrow': '\\dotsb',
    '\\Longleftarrow': '\\dotsb',
    '\\longleftrightarrow': '\\dotsb',
    '\\Longleftrightarrow': '\\dotsb',
    '\\mapsto': '\\dotsb',
    '\\longmapsto': '\\dotsb',
    '\\hookrightarrow': '\\dotsb',
    '\\iff': '\\dotsb',
    '\\doteq': '\\dotsb',
    // Symbols whose definition starts with \mathbin:
    '\\mathbin': '\\dotsb',
    '\\bmod': '\\dotsb',
    // Symbols whose definition starts with \mathrel:
    '\\mathrel': '\\dotsb',
    '\\relbar': '\\dotsb',
    '\\Relbar': '\\dotsb',
    '\\xrightarrow': '\\dotsb',
    '\\xleftarrow': '\\dotsb',
    // Symbols whose definition starts with \DOTSI:
    '\\DOTSI': '\\dotsi',
    '\\int': '\\dotsi',
    '\\oint': '\\dotsi',
    '\\iint': '\\dotsi',
    '\\iiint': '\\dotsi',
    '\\iiiint': '\\dotsi',
    '\\idotsint': '\\dotsi',
    // Symbols whose definition starts with \DOTSX:
    '\\DOTSX': '\\dotsx'
};

defineMacro("\\dots", function (context) {
    // TODO: If used in text mode, should expand to \textellipsis.
    // However, in KaTeX, \textellipsis and \ldots behave the same
    // (in text mode), and it's unlikely we'd see any of the math commands
    // that affect the behavior of \dots when in text mode.  So fine for now
    // (until we support \ifmmode ... \else ... \fi).
    var thedots = '\\dotso';
    var next = context.expandAfterFuture().text;
    if (next in dotsByToken) {
        thedots = dotsByToken[next];
    } else if (next.substr(0, 4) === '\\not') {
        thedots = '\\dotsb';
    } else if (next in _symbols2.default.math) {
        if (_utils2.default.contains(['bin', 'rel'], _symbols2.default.math[next].group)) {
            thedots = '\\dotsb';
        }
    }
    return thedots;
});

var spaceAfterDots = {
    // \rightdelim@ checks for the following:
    ')': true,
    ']': true,
    '\\rbrack': true,
    '\\}': true,
    '\\rbrace': true,
    '\\rangle': true,
    '\\rceil': true,
    '\\rfloor': true,
    '\\rgroup': true,
    '\\rmoustache': true,
    '\\right': true,
    '\\bigr': true,
    '\\biggr': true,
    '\\Bigr': true,
    '\\Biggr': true,
    // \extra@ also tests for the following:
    '$': true,
    // \extrap@ checks for the following:
    ';': true,
    '.': true,
    ',': true
};

defineMacro("\\dotso", function (context) {
    var next = context.future().text;
    if (next in spaceAfterDots) {
        return "\\ldots\\,";
    } else {
        return "\\ldots";
    }
});

defineMacro("\\dotsc", function (context) {
    var next = context.future().text;
    // \dotsc uses \extra@ but not \extrap@, instead specially checking for
    // ';' and '.', but doesn't check for ','.
    if (next in spaceAfterDots && next !== ',') {
        return "\\ldots\\,";
    } else {
        return "\\ldots";
    }
});

defineMacro("\\cdots", function (context) {
    var next = context.future().text;
    if (next in spaceAfterDots) {
        return "\\@cdots\\,";
    } else {
        return "\\@cdots";
    }
});

defineMacro("\\dotsb", "\\cdots");
defineMacro("\\dotsm", "\\cdots");
defineMacro("\\dotsi", "\\!\\cdots");
// amsmath doesn't actually define \dotsx, but \dots followed by a macro
// starting with \DOTSX implies \dotso, and then \extra@ detects this case
// and forces the added `\,`.
defineMacro("\\dotsx", "\\ldots\\,");

// \let\DOTSI\relax
// \let\DOTSB\relax
// \let\DOTSX\relax
defineMacro("\\DOTSI", "\\relax");
defineMacro("\\DOTSB", "\\relax");
defineMacro("\\DOTSX", "\\relax");

// http://texdoc.net/texmf-dist/doc/latex/amsmath/amsmath.pdf
defineMacro("\\thinspace", "\\,"); //   \let\thinspace\,
defineMacro("\\medspace", "\\:"); //   \let\medspace\:
defineMacro("\\thickspace", "\\;"); //   \let\thickspace\;

//////////////////////////////////////////////////////////////////////
// LaTeX source2e

// \def\TeX{T\kern-.1667em\lower.5ex\hbox{E}\kern-.125emX\@}
// TODO: Doesn't normally work in math mode because \@ fails.  KaTeX doesn't
// support \@ yet, so that's omitted, and we add \text so that the result
// doesn't look funny in math mode.
defineMacro("\\TeX", "\\textrm{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}");

// \DeclareRobustCommand{\LaTeX}{L\kern-.36em%
//         {\sbox\z@ T%
//          \vbox to\ht\z@{\hbox{\check@mathfonts
//                               \fontsize\sf@size\z@
//                               \math@fontsfalse\selectfont
//                               A}%
//                         \vss}%
//         }%
//         \kern-.15em%
//         \TeX}
// This code aligns the top of the A with the T (from the perspective of TeX's
// boxes, though visually the A appears to extend above slightly).
// We compute the corresponding \raisebox when A is rendered at \scriptsize,
// which is size3, which has a scale factor of 0.7 (see Options.js).
var latexRaiseA = _fontMetricsData2.default['Main-Regular']["T".charCodeAt(0)][1] - 0.7 * _fontMetricsData2.default['Main-Regular']["A".charCodeAt(0)][1] + "em";
defineMacro("\\LaTeX", "\\textrm{L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptsize A}" + "\\kern-.15em\\TeX}");

// New KaTeX logo based on tweaking LaTeX logo
defineMacro("\\KaTeX", "\\textrm{K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptsize A}" + "\\kern-.15em\\TeX}");

// \DeclareRobustCommand\hspace{\@ifstar\@hspacer\@hspace}
// \def\@hspace#1{\hskip  #1\relax}
// KaTeX doesn't do line breaks, so \hspace and \hspace* are the same as \kern
defineMacro("\\hspace", "\\@ifstar\\kern\\kern");

//////////////////////////////////////////////////////////////////////
// mathtools.sty

//\providecommand\ordinarycolon{:}
defineMacro("\\ordinarycolon", ":");
//\def\vcentcolon{\mathrel{\mathop\ordinarycolon}}
//TODO(edemaine): Not yet centered. Fix via \raisebox or #726
defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
// \providecommand*\dblcolon{\vcentcolon\mathrel{\mkern-.9mu}\vcentcolon}
defineMacro("\\dblcolon", "\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon");
// \providecommand*\coloneqq{\vcentcolon\mathrel{\mkern-1.2mu}=}
defineMacro("\\coloneqq", "\\vcentcolon\\mathrel{\\mkern-1.2mu}=");
// \providecommand*\Coloneqq{\dblcolon\mathrel{\mkern-1.2mu}=}
defineMacro("\\Coloneqq", "\\dblcolon\\mathrel{\\mkern-1.2mu}=");
// \providecommand*\coloneq{\vcentcolon\mathrel{\mkern-1.2mu}\mathrel{-}}
defineMacro("\\coloneq", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");
// \providecommand*\Coloneq{\dblcolon\mathrel{\mkern-1.2mu}\mathrel{-}}
defineMacro("\\Coloneq", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");
// \providecommand*\eqqcolon{=\mathrel{\mkern-1.2mu}\vcentcolon}
defineMacro("\\eqqcolon", "=\\mathrel{\\mkern-1.2mu}\\vcentcolon");
// \providecommand*\Eqqcolon{=\mathrel{\mkern-1.2mu}\dblcolon}
defineMacro("\\Eqqcolon", "=\\mathrel{\\mkern-1.2mu}\\dblcolon");
// \providecommand*\eqcolon{\mathrel{-}\mathrel{\mkern-1.2mu}\vcentcolon}
defineMacro("\\eqcolon", "\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon");
// \providecommand*\Eqcolon{\mathrel{-}\mathrel{\mkern-1.2mu}\dblcolon}
defineMacro("\\Eqcolon", "\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon");
// \providecommand*\colonapprox{\vcentcolon\mathrel{\mkern-1.2mu}\approx}
defineMacro("\\colonapprox", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx");
// \providecommand*\Colonapprox{\dblcolon\mathrel{\mkern-1.2mu}\approx}
defineMacro("\\Colonapprox", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx");
// \providecommand*\colonsim{\vcentcolon\mathrel{\mkern-1.2mu}\sim}
defineMacro("\\colonsim", "\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim");
// \providecommand*\Colonsim{\dblcolon\mathrel{\mkern-1.2mu}\sim}
defineMacro("\\Colonsim", "\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim");

//////////////////////////////////////////////////////////////////////
// colonequals.sty

// Alternate names for mathtools's macros:
defineMacro("\\ratio", "\\vcentcolon");
defineMacro("\\coloncolon", "\\dblcolon");
defineMacro("\\colonequals", "\\coloneqq");
defineMacro("\\coloncolonequals", "\\Coloneqq");
defineMacro("\\equalscolon", "\\eqqcolon");
defineMacro("\\equalscoloncolon", "\\Eqqcolon");
defineMacro("\\colonminus", "\\coloneq");
defineMacro("\\coloncolonminus", "\\Coloneq");
defineMacro("\\minuscolon", "\\eqcolon");
defineMacro("\\minuscoloncolon", "\\Eqcolon");
// \colonapprox name is same in mathtools and colonequals.
defineMacro("\\coloncolonapprox", "\\Colonapprox");
// \colonsim name is same in mathtools and colonequals.
defineMacro("\\coloncolonsim", "\\Colonsim");

// Additional macros, implemented by analogy with mathtools definitions:
defineMacro("\\simcolon", "\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon");
defineMacro("\\simcoloncolon", "\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon");
defineMacro("\\approxcolon", "\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon");
defineMacro("\\approxcoloncolon", "\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon");

// Present in newtxmath, pxfonts and txfonts
// TODO: The unicode character U+220C ∌ should be added to the font, and this
//       macro turned into a propper defineSymbol in symbols.js. That way, the
//       MathML result will be much cleaner.
defineMacro("\\notni", "\\not\\ni");
defineMacro("\\limsup", "\\DOTSB\\mathop{\\operatorname{lim\\,sup}}\\limits");
defineMacro("\\liminf", "\\DOTSB\\mathop{\\operatorname{lim\\,inf}}\\limits");

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// This file is GENERATED by unicodeMake.js. DO NOT MODIFY.

exports.default = {
    "\xE1": "a\u0301", // á = \'{a}
    "\xE0": "a\u0300", // à = \`{a}
    "\xE4": "a\u0308", // ä = \"{a}
    "\u01DF": "a\u0308\u0304", // ǟ = \"\={a}
    "\xE3": "a\u0303", // ã = \~{a}
    "\u0101": "a\u0304", // ā = \={a}
    "\u0103": "a\u0306", // ă = \u{a}
    "\u1EAF": "a\u0306\u0301", // ắ = \u\'{a}
    "\u1EB1": "a\u0306\u0300", // ằ = \u\`{a}
    "\u1EB5": "a\u0306\u0303", // ẵ = \u\~{a}
    "\u01CE": "a\u030C", // ǎ = \v{a}
    "\xE2": "a\u0302", // â = \^{a}
    "\u1EA5": "a\u0302\u0301", // ấ = \^\'{a}
    "\u1EA7": "a\u0302\u0300", // ầ = \^\`{a}
    "\u1EAB": "a\u0302\u0303", // ẫ = \^\~{a}
    "\u0227": "a\u0307", // ȧ = \.{a}
    "\u01E1": "a\u0307\u0304", // ǡ = \.\={a}
    "\xE5": "a\u030A", // å = \r{a}
    "\u01FB": "a\u030A\u0301", // ǻ = \r\'{a}
    "\u1E03": "b\u0307", // ḃ = \.{b}
    "\u0107": "c\u0301", // ć = \'{c}
    "\u010D": "c\u030C", // č = \v{c}
    "\u0109": "c\u0302", // ĉ = \^{c}
    "\u010B": "c\u0307", // ċ = \.{c}
    "\u010F": "d\u030C", // ď = \v{d}
    "\u1E0B": "d\u0307", // ḋ = \.{d}
    "\xE9": "e\u0301", // é = \'{e}
    "\xE8": "e\u0300", // è = \`{e}
    "\xEB": "e\u0308", // ë = \"{e}
    "\u1EBD": "e\u0303", // ẽ = \~{e}
    "\u0113": "e\u0304", // ē = \={e}
    "\u1E17": "e\u0304\u0301", // ḗ = \=\'{e}
    "\u1E15": "e\u0304\u0300", // ḕ = \=\`{e}
    "\u0115": "e\u0306", // ĕ = \u{e}
    "\u011B": "e\u030C", // ě = \v{e}
    "\xEA": "e\u0302", // ê = \^{e}
    "\u1EBF": "e\u0302\u0301", // ế = \^\'{e}
    "\u1EC1": "e\u0302\u0300", // ề = \^\`{e}
    "\u1EC5": "e\u0302\u0303", // ễ = \^\~{e}
    "\u0117": "e\u0307", // ė = \.{e}
    "\u1E1F": "f\u0307", // ḟ = \.{f}
    "\u01F5": "g\u0301", // ǵ = \'{g}
    "\u1E21": "g\u0304", // ḡ = \={g}
    "\u011F": "g\u0306", // ğ = \u{g}
    "\u01E7": "g\u030C", // ǧ = \v{g}
    "\u011D": "g\u0302", // ĝ = \^{g}
    "\u0121": "g\u0307", // ġ = \.{g}
    "\u1E27": "h\u0308", // ḧ = \"{h}
    "\u021F": "h\u030C", // ȟ = \v{h}
    "\u0125": "h\u0302", // ĥ = \^{h}
    "\u1E23": "h\u0307", // ḣ = \.{h}
    "\xED": "i\u0301", // í = \'{i}
    "\xEC": "i\u0300", // ì = \`{i}
    "\xEF": "i\u0308", // ï = \"{i}
    "\u1E2F": "i\u0308\u0301", // ḯ = \"\'{i}
    "\u0129": "i\u0303", // ĩ = \~{i}
    "\u012B": "i\u0304", // ī = \={i}
    "\u012D": "i\u0306", // ĭ = \u{i}
    "\u01D0": "i\u030C", // ǐ = \v{i}
    "\xEE": "i\u0302", // î = \^{i}
    "\u01F0": "j\u030C", // ǰ = \v{j}
    "\u0135": "j\u0302", // ĵ = \^{j}
    "\u1E31": "k\u0301", // ḱ = \'{k}
    "\u01E9": "k\u030C", // ǩ = \v{k}
    "\u013A": "l\u0301", // ĺ = \'{l}
    "\u013E": "l\u030C", // ľ = \v{l}
    "\u1E3F": "m\u0301", // ḿ = \'{m}
    "\u1E41": "m\u0307", // ṁ = \.{m}
    "\u0144": "n\u0301", // ń = \'{n}
    "\u01F9": "n\u0300", // ǹ = \`{n}
    "\xF1": "n\u0303", // ñ = \~{n}
    "\u0148": "n\u030C", // ň = \v{n}
    "\u1E45": "n\u0307", // ṅ = \.{n}
    "\xF3": "o\u0301", // ó = \'{o}
    "\xF2": "o\u0300", // ò = \`{o}
    "\xF6": "o\u0308", // ö = \"{o}
    "\u022B": "o\u0308\u0304", // ȫ = \"\={o}
    "\xF5": "o\u0303", // õ = \~{o}
    "\u1E4D": "o\u0303\u0301", // ṍ = \~\'{o}
    "\u1E4F": "o\u0303\u0308", // ṏ = \~\"{o}
    "\u022D": "o\u0303\u0304", // ȭ = \~\={o}
    "\u014D": "o\u0304", // ō = \={o}
    "\u1E53": "o\u0304\u0301", // ṓ = \=\'{o}
    "\u1E51": "o\u0304\u0300", // ṑ = \=\`{o}
    "\u014F": "o\u0306", // ŏ = \u{o}
    "\u01D2": "o\u030C", // ǒ = \v{o}
    "\xF4": "o\u0302", // ô = \^{o}
    "\u1ED1": "o\u0302\u0301", // ố = \^\'{o}
    "\u1ED3": "o\u0302\u0300", // ồ = \^\`{o}
    "\u1ED7": "o\u0302\u0303", // ỗ = \^\~{o}
    "\u022F": "o\u0307", // ȯ = \.{o}
    "\u0231": "o\u0307\u0304", // ȱ = \.\={o}
    "\u0151": "o\u030B", // ő = \H{o}
    "\u1E55": "p\u0301", // ṕ = \'{p}
    "\u1E57": "p\u0307", // ṗ = \.{p}
    "\u0155": "r\u0301", // ŕ = \'{r}
    "\u0159": "r\u030C", // ř = \v{r}
    "\u1E59": "r\u0307", // ṙ = \.{r}
    "\u015B": "s\u0301", // ś = \'{s}
    "\u1E65": "s\u0301\u0307", // ṥ = \'\.{s}
    "\u0161": "s\u030C", // š = \v{s}
    "\u1E67": "s\u030C\u0307", // ṧ = \v\.{s}
    "\u015D": "s\u0302", // ŝ = \^{s}
    "\u1E61": "s\u0307", // ṡ = \.{s}
    "\u1E97": "t\u0308", // ẗ = \"{t}
    "\u0165": "t\u030C", // ť = \v{t}
    "\u1E6B": "t\u0307", // ṫ = \.{t}
    "\xFA": "u\u0301", // ú = \'{u}
    "\xF9": "u\u0300", // ù = \`{u}
    "\xFC": "u\u0308", // ü = \"{u}
    "\u01D8": "u\u0308\u0301", // ǘ = \"\'{u}
    "\u01DC": "u\u0308\u0300", // ǜ = \"\`{u}
    "\u01D6": "u\u0308\u0304", // ǖ = \"\={u}
    "\u01DA": "u\u0308\u030C", // ǚ = \"\v{u}
    "\u0169": "u\u0303", // ũ = \~{u}
    "\u1E79": "u\u0303\u0301", // ṹ = \~\'{u}
    "\u016B": "u\u0304", // ū = \={u}
    "\u1E7B": "u\u0304\u0308", // ṻ = \=\"{u}
    "\u016D": "u\u0306", // ŭ = \u{u}
    "\u01D4": "u\u030C", // ǔ = \v{u}
    "\xFB": "u\u0302", // û = \^{u}
    "\u016F": "u\u030A", // ů = \r{u}
    "\u0171": "u\u030B", // ű = \H{u}
    "\u1E7D": "v\u0303", // ṽ = \~{v}
    "\u1E83": "w\u0301", // ẃ = \'{w}
    "\u1E81": "w\u0300", // ẁ = \`{w}
    "\u1E85": "w\u0308", // ẅ = \"{w}
    "\u0175": "w\u0302", // ŵ = \^{w}
    "\u1E87": "w\u0307", // ẇ = \.{w}
    "\u1E98": "w\u030A", // ẘ = \r{w}
    "\u1E8D": "x\u0308", // ẍ = \"{x}
    "\u1E8B": "x\u0307", // ẋ = \.{x}
    "\xFD": "y\u0301", // ý = \'{y}
    "\u1EF3": "y\u0300", // ỳ = \`{y}
    "\xFF": "y\u0308", // ÿ = \"{y}
    "\u1EF9": "y\u0303", // ỹ = \~{y}
    "\u0233": "y\u0304", // ȳ = \={y}
    "\u0177": "y\u0302", // ŷ = \^{y}
    "\u1E8F": "y\u0307", // ẏ = \.{y}
    "\u1E99": "y\u030A", // ẙ = \r{y}
    "\u017A": "z\u0301", // ź = \'{z}
    "\u017E": "z\u030C", // ž = \v{z}
    "\u1E91": "z\u0302", // ẑ = \^{z}
    "\u017C": "z\u0307", // ż = \.{z}
    "\xC1": "A\u0301", // Á = \'{A}
    "\xC0": "A\u0300", // À = \`{A}
    "\xC4": "A\u0308", // Ä = \"{A}
    "\u01DE": "A\u0308\u0304", // Ǟ = \"\={A}
    "\xC3": "A\u0303", // Ã = \~{A}
    "\u0100": "A\u0304", // Ā = \={A}
    "\u0102": "A\u0306", // Ă = \u{A}
    "\u1EAE": "A\u0306\u0301", // Ắ = \u\'{A}
    "\u1EB0": "A\u0306\u0300", // Ằ = \u\`{A}
    "\u1EB4": "A\u0306\u0303", // Ẵ = \u\~{A}
    "\u01CD": "A\u030C", // Ǎ = \v{A}
    "\xC2": "A\u0302", // Â = \^{A}
    "\u1EA4": "A\u0302\u0301", // Ấ = \^\'{A}
    "\u1EA6": "A\u0302\u0300", // Ầ = \^\`{A}
    "\u1EAA": "A\u0302\u0303", // Ẫ = \^\~{A}
    "\u0226": "A\u0307", // Ȧ = \.{A}
    "\u01E0": "A\u0307\u0304", // Ǡ = \.\={A}
    "\xC5": "A\u030A", // Å = \r{A}
    "\u01FA": "A\u030A\u0301", // Ǻ = \r\'{A}
    "\u1E02": "B\u0307", // Ḃ = \.{B}
    "\u0106": "C\u0301", // Ć = \'{C}
    "\u010C": "C\u030C", // Č = \v{C}
    "\u0108": "C\u0302", // Ĉ = \^{C}
    "\u010A": "C\u0307", // Ċ = \.{C}
    "\u010E": "D\u030C", // Ď = \v{D}
    "\u1E0A": "D\u0307", // Ḋ = \.{D}
    "\xC9": "E\u0301", // É = \'{E}
    "\xC8": "E\u0300", // È = \`{E}
    "\xCB": "E\u0308", // Ë = \"{E}
    "\u1EBC": "E\u0303", // Ẽ = \~{E}
    "\u0112": "E\u0304", // Ē = \={E}
    "\u1E16": "E\u0304\u0301", // Ḗ = \=\'{E}
    "\u1E14": "E\u0304\u0300", // Ḕ = \=\`{E}
    "\u0114": "E\u0306", // Ĕ = \u{E}
    "\u011A": "E\u030C", // Ě = \v{E}
    "\xCA": "E\u0302", // Ê = \^{E}
    "\u1EBE": "E\u0302\u0301", // Ế = \^\'{E}
    "\u1EC0": "E\u0302\u0300", // Ề = \^\`{E}
    "\u1EC4": "E\u0302\u0303", // Ễ = \^\~{E}
    "\u0116": "E\u0307", // Ė = \.{E}
    "\u1E1E": "F\u0307", // Ḟ = \.{F}
    "\u01F4": "G\u0301", // Ǵ = \'{G}
    "\u1E20": "G\u0304", // Ḡ = \={G}
    "\u011E": "G\u0306", // Ğ = \u{G}
    "\u01E6": "G\u030C", // Ǧ = \v{G}
    "\u011C": "G\u0302", // Ĝ = \^{G}
    "\u0120": "G\u0307", // Ġ = \.{G}
    "\u1E26": "H\u0308", // Ḧ = \"{H}
    "\u021E": "H\u030C", // Ȟ = \v{H}
    "\u0124": "H\u0302", // Ĥ = \^{H}
    "\u1E22": "H\u0307", // Ḣ = \.{H}
    "\xCD": "I\u0301", // Í = \'{I}
    "\xCC": "I\u0300", // Ì = \`{I}
    "\xCF": "I\u0308", // Ï = \"{I}
    "\u1E2E": "I\u0308\u0301", // Ḯ = \"\'{I}
    "\u0128": "I\u0303", // Ĩ = \~{I}
    "\u012A": "I\u0304", // Ī = \={I}
    "\u012C": "I\u0306", // Ĭ = \u{I}
    "\u01CF": "I\u030C", // Ǐ = \v{I}
    "\xCE": "I\u0302", // Î = \^{I}
    "\u0130": "I\u0307", // İ = \.{I}
    "\u0134": "J\u0302", // Ĵ = \^{J}
    "\u1E30": "K\u0301", // Ḱ = \'{K}
    "\u01E8": "K\u030C", // Ǩ = \v{K}
    "\u0139": "L\u0301", // Ĺ = \'{L}
    "\u013D": "L\u030C", // Ľ = \v{L}
    "\u1E3E": "M\u0301", // Ḿ = \'{M}
    "\u1E40": "M\u0307", // Ṁ = \.{M}
    "\u0143": "N\u0301", // Ń = \'{N}
    "\u01F8": "N\u0300", // Ǹ = \`{N}
    "\xD1": "N\u0303", // Ñ = \~{N}
    "\u0147": "N\u030C", // Ň = \v{N}
    "\u1E44": "N\u0307", // Ṅ = \.{N}
    "\xD3": "O\u0301", // Ó = \'{O}
    "\xD2": "O\u0300", // Ò = \`{O}
    "\xD6": "O\u0308", // Ö = \"{O}
    "\u022A": "O\u0308\u0304", // Ȫ = \"\={O}
    "\xD5": "O\u0303", // Õ = \~{O}
    "\u1E4C": "O\u0303\u0301", // Ṍ = \~\'{O}
    "\u1E4E": "O\u0303\u0308", // Ṏ = \~\"{O}
    "\u022C": "O\u0303\u0304", // Ȭ = \~\={O}
    "\u014C": "O\u0304", // Ō = \={O}
    "\u1E52": "O\u0304\u0301", // Ṓ = \=\'{O}
    "\u1E50": "O\u0304\u0300", // Ṑ = \=\`{O}
    "\u014E": "O\u0306", // Ŏ = \u{O}
    "\u01D1": "O\u030C", // Ǒ = \v{O}
    "\xD4": "O\u0302", // Ô = \^{O}
    "\u1ED0": "O\u0302\u0301", // Ố = \^\'{O}
    "\u1ED2": "O\u0302\u0300", // Ồ = \^\`{O}
    "\u1ED6": "O\u0302\u0303", // Ỗ = \^\~{O}
    "\u022E": "O\u0307", // Ȯ = \.{O}
    "\u0230": "O\u0307\u0304", // Ȱ = \.\={O}
    "\u0150": "O\u030B", // Ő = \H{O}
    "\u1E54": "P\u0301", // Ṕ = \'{P}
    "\u1E56": "P\u0307", // Ṗ = \.{P}
    "\u0154": "R\u0301", // Ŕ = \'{R}
    "\u0158": "R\u030C", // Ř = \v{R}
    "\u1E58": "R\u0307", // Ṙ = \.{R}
    "\u015A": "S\u0301", // Ś = \'{S}
    "\u1E64": "S\u0301\u0307", // Ṥ = \'\.{S}
    "\u0160": "S\u030C", // Š = \v{S}
    "\u1E66": "S\u030C\u0307", // Ṧ = \v\.{S}
    "\u015C": "S\u0302", // Ŝ = \^{S}
    "\u1E60": "S\u0307", // Ṡ = \.{S}
    "\u0164": "T\u030C", // Ť = \v{T}
    "\u1E6A": "T\u0307", // Ṫ = \.{T}
    "\xDA": "U\u0301", // Ú = \'{U}
    "\xD9": "U\u0300", // Ù = \`{U}
    "\xDC": "U\u0308", // Ü = \"{U}
    "\u01D7": "U\u0308\u0301", // Ǘ = \"\'{U}
    "\u01DB": "U\u0308\u0300", // Ǜ = \"\`{U}
    "\u01D5": "U\u0308\u0304", // Ǖ = \"\={U}
    "\u01D9": "U\u0308\u030C", // Ǚ = \"\v{U}
    "\u0168": "U\u0303", // Ũ = \~{U}
    "\u1E78": "U\u0303\u0301", // Ṹ = \~\'{U}
    "\u016A": "U\u0304", // Ū = \={U}
    "\u1E7A": "U\u0304\u0308", // Ṻ = \=\"{U}
    "\u016C": "U\u0306", // Ŭ = \u{U}
    "\u01D3": "U\u030C", // Ǔ = \v{U}
    "\xDB": "U\u0302", // Û = \^{U}
    "\u016E": "U\u030A", // Ů = \r{U}
    "\u0170": "U\u030B", // Ű = \H{U}
    "\u1E7C": "V\u0303", // Ṽ = \~{V}
    "\u1E82": "W\u0301", // Ẃ = \'{W}
    "\u1E80": "W\u0300", // Ẁ = \`{W}
    "\u1E84": "W\u0308", // Ẅ = \"{W}
    "\u0174": "W\u0302", // Ŵ = \^{W}
    "\u1E86": "W\u0307", // Ẇ = \.{W}
    "\u1E8C": "X\u0308", // Ẍ = \"{X}
    "\u1E8A": "X\u0307", // Ẋ = \.{X}
    "\xDD": "Y\u0301", // Ý = \'{Y}
    "\u1EF2": "Y\u0300", // Ỳ = \`{Y}
    "\u0178": "Y\u0308", // Ÿ = \"{Y}
    "\u1EF8": "Y\u0303", // Ỹ = \~{Y}
    "\u0232": "Y\u0304", // Ȳ = \={Y}
    "\u0176": "Y\u0302", // Ŷ = \^{Y}
    "\u1E8E": "Y\u0307", // Ẏ = \.{Y}
    "\u0179": "Z\u0301", // Ź = \'{Z}
    "\u017D": "Z\u030C", // Ž = \v{Z}
    "\u1E90": "Z\u0302", // Ẑ = \^{Z}
    "\u017B": "Z\u0307", // Ż = \.{Z}
    "\u03AC": "\u03B1\u0301", // ά = \'{α}
    "\u1F70": "\u03B1\u0300", // ὰ = \`{α}
    "\u1FB1": "\u03B1\u0304", // ᾱ = \={α}
    "\u1FB0": "\u03B1\u0306", // ᾰ = \u{α}
    "\u03AD": "\u03B5\u0301", // έ = \'{ε}
    "\u1F72": "\u03B5\u0300", // ὲ = \`{ε}
    "\u03AE": "\u03B7\u0301", // ή = \'{η}
    "\u1F74": "\u03B7\u0300", // ὴ = \`{η}
    "\u03AF": "\u03B9\u0301", // ί = \'{ι}
    "\u1F76": "\u03B9\u0300", // ὶ = \`{ι}
    "\u03CA": "\u03B9\u0308", // ϊ = \"{ι}
    "\u0390": "\u03B9\u0308\u0301", // ΐ = \"\'{ι}
    "\u1FD2": "\u03B9\u0308\u0300", // ῒ = \"\`{ι}
    "\u1FD1": "\u03B9\u0304", // ῑ = \={ι}
    "\u1FD0": "\u03B9\u0306", // ῐ = \u{ι}
    "\u03CC": "\u03BF\u0301", // ό = \'{ο}
    "\u1F78": "\u03BF\u0300", // ὸ = \`{ο}
    "\u03CD": "\u03C5\u0301", // ύ = \'{υ}
    "\u1F7A": "\u03C5\u0300", // ὺ = \`{υ}
    "\u03CB": "\u03C5\u0308", // ϋ = \"{υ}
    "\u03B0": "\u03C5\u0308\u0301", // ΰ = \"\'{υ}
    "\u1FE2": "\u03C5\u0308\u0300", // ῢ = \"\`{υ}
    "\u1FE1": "\u03C5\u0304", // ῡ = \={υ}
    "\u1FE0": "\u03C5\u0306", // ῠ = \u{υ}
    "\u03CE": "\u03C9\u0301", // ώ = \'{ω}
    "\u1F7C": "\u03C9\u0300", // ὼ = \`{ω}
    "\u038E": "\u03A5\u0301", // Ύ = \'{Υ}
    "\u1FEA": "\u03A5\u0300", // Ὺ = \`{Υ}
    "\u03AB": "\u03A5\u0308", // Ϋ = \"{Υ}
    "\u1FE9": "\u03A5\u0304", // Ῡ = \={Υ}
    "\u1FE8": "\u03A5\u0306", // Ῠ = \u{Υ}
    "\u038F": "\u03A9\u0301", // Ώ = \'{Ω}
    "\u1FFA": "\u03A9\u0300" // Ὼ = \`{Ω}
};

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildGroup = exports.groupTypes = exports.makeNullDelimiter = exports.isLeftTight = exports.getTypeOfDomTree = exports.buildExpression = undefined;
exports.default = buildHTML;

var _ParseError = __webpack_require__(24);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _Style = __webpack_require__(40);

var _Style2 = _interopRequireDefault(_Style);

var _buildCommon = __webpack_require__(5);

var _buildCommon2 = _interopRequireDefault(_buildCommon);

var _domTree = __webpack_require__(54);

var _domTree2 = _interopRequireDefault(_domTree);

var _units = __webpack_require__(56);

var _utils = __webpack_require__(18);

var _utils2 = _interopRequireDefault(_utils);

var _stretchy = __webpack_require__(55);

var _stretchy2 = _interopRequireDefault(_stretchy);

var _spacingData = __webpack_require__(179);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * WARNING: New methods on groupTypes should be added to src/functions.
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * This file does the main work of building a domTree structure from a parse
                                                                                                                                                                                                     * tree. The entry point is the `buildHTML` function, which takes a parse tree.
                                                                                                                                                                                                     * Then, the buildExpression, buildGroup, and various groupTypes functions are
                                                                                                                                                                                                     * called, to produce a final HTML tree.
                                                                                                                                                                                                     */

var makeSpan = _buildCommon2.default.makeSpan;

// Binary atoms (first class `mbin`) change into ordinary atoms (`mord`)
// depending on their surroundings. See TeXbook pg. 442-446, Rules 5 and 6,
// and the text before Rule 19.
var isBin = function isBin(node) {
    return node && node.classes[0] === "mbin";
};

var isBinLeftCanceller = function isBinLeftCanceller(node, isRealGroup) {
    // TODO: This code assumes that a node's math class is the first element
    // of its `classes` array. A later cleanup should ensure this, for
    // instance by changing the signature of `makeSpan`.
    if (node) {
        return _utils2.default.contains(["mbin", "mopen", "mrel", "mop", "mpunct"], node.classes[0]);
    } else {
        return isRealGroup;
    }
};

var isBinRightCanceller = function isBinRightCanceller(node, isRealGroup) {
    if (node) {
        return _utils2.default.contains(["mrel", "mclose", "mpunct"], node.classes[0]);
    } else {
        return isRealGroup;
    }
};

var styleMap = {
    "display": _Style2.default.DISPLAY,
    "text": _Style2.default.TEXT,
    "script": _Style2.default.SCRIPT,
    "scriptscript": _Style2.default.SCRIPTSCRIPT
};

/**
 * Take a list of nodes, build them in order, and return a list of the built
 * nodes. documentFragments are flattened into their contents, so the
 * returned list contains no fragments. `isRealGroup` is true if `expression`
 * is a real group (no atoms will be added on either side), as opposed to
 * a partial group (e.g. one created by \color).
 */
var buildExpression = exports.buildExpression = function buildExpression(expression, options, isRealGroup) {
    // Parse expressions into `groups`.
    var rawGroups = [];
    for (var i = 0; i < expression.length; i++) {
        var group = expression[i];
        var output = buildGroup(group, options);
        if (output instanceof _domTree2.default.documentFragment) {
            rawGroups.push.apply(rawGroups, _toConsumableArray(output.children));
        } else {
            rawGroups.push(output);
        }
    }
    // At this point `rawGroups` consists entirely of `symbolNode`s and `span`s.

    // Ignore explicit spaces (e.g., \;, \,) when determining what implicit
    // spacing should go between atoms of different classes.
    var nonSpaces = rawGroups.filter(function (group) {
        return group && group.classes[0] !== "mspace";
    });

    // Before determining what spaces to insert, perform bin cancellation.
    // Binary operators change to ordinary symbols in some contexts.
    for (var _i = 0; _i < nonSpaces.length; _i++) {
        if (isBin(nonSpaces[_i])) {
            if (isBinLeftCanceller(nonSpaces[_i - 1], isRealGroup) || isBinRightCanceller(nonSpaces[_i + 1], isRealGroup)) {
                nonSpaces[_i].classes[0] = "mord";
            }
        }
    }

    var groups = [];
    var j = 0;
    for (var _i2 = 0; _i2 < rawGroups.length; _i2++) {
        groups.push(rawGroups[_i2]);

        // For any group that is not a space, get the next non-space.  Then
        // lookup what implicit space should be placed between those atoms and
        // add it to groups.
        if (rawGroups[_i2].classes[0] !== "mspace" && j < nonSpaces.length - 1) {
            // Get the type of the current non-space node.  If it's a document
            // fragment, get the type of the rightmost node in the fragment.
            var left = getTypeOfDomTree(nonSpaces[j], "right");

            // Get the type of the next non-space node.  If it's a document
            // fragment, get the type of the leftmost node in the fragment.
            var right = getTypeOfDomTree(nonSpaces[j + 1], "left");

            // We use buildExpression inside of sizingGroup, but it returns a
            // document fragment of elements.  sizingGroup sets `isRealGroup`
            // to false to avoid processing spans multiple times.
            if (left && right && isRealGroup) {
                var space = isLeftTight(nonSpaces[j + 1]) ? _spacingData.tightSpacings[left][right] : _spacingData.spacings[left][right];

                if (space) {
                    var glueOptions = options;

                    if (expression.length === 1) {
                        if (expression[0].type === "sizing") {
                            glueOptions = options.havingSize(expression[0].value.size);
                        } else if (expression[0].type === "styling") {
                            glueOptions = options.havingStyle(styleMap[expression[0].value.style]);
                        }
                    }

                    groups.push(_buildCommon2.default.makeGlue(space, glueOptions));
                }
            }
            j++;
        }
    }

    // Process \\not commands within the group.
    for (var _i3 = 0; _i3 < groups.length; _i3++) {
        if (groups[_i3].value === "\u0338") {
            groups[_i3].style.position = "absolute";
            // TODO(kevinb) fix this for Safari by switching to a non-combining
            // character for \not.
            // This value was determined empirically.
            // TODO(kevinb) figure out the real math for this value.
            groups[_i3].style.paddingLeft = "0.8em";
        }
    }

    return groups;
};

// Return math atom class (mclass) of a domTree.
var getTypeOfDomTree = exports.getTypeOfDomTree = function getTypeOfDomTree(node) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "right";

    if (node instanceof _domTree2.default.documentFragment || node instanceof _domTree2.default.anchor) {
        if (node.children.length) {
            if (side === "right") {
                return getTypeOfDomTree(node.children[node.children.length - 1]);
            } else if (side === "left") {
                return getTypeOfDomTree(node.children[0]);
            }
        }
    } else {
        // This makes a lot of assumptions as to where the type of atom
        // appears.  We should do a better job of enforcing this.
        if (_utils2.default.contains(["mord", "mop", "mbin", "mrel", "mopen", "mclose", "mpunct", "minner"], node.classes[0])) {
            return node.classes[0];
        }
    }
    return null;
};

// If `node` is an atom return whether it's been assigned the mtight class.
// If `node` is a document fragment, return the value of isLeftTight() for the
// leftmost node in the fragment.
// 'mtight' indicates that the node is script or scriptscript style.
var isLeftTight = exports.isLeftTight = function isLeftTight(node) {
    if (node instanceof _domTree2.default.documentFragment) {
        if (node.children.length) {
            return isLeftTight(node.children[0]);
        }
    } else {
        return _utils2.default.contains(node.classes, "mtight");
    }
    return false;
};

/**
 * Sometimes, groups perform special rules when they have superscripts or
 * subscripts attached to them. This function lets the `supsub` group know that
 * its inner element should handle the superscripts and subscripts instead of
 * handling them itself.
 */
var shouldHandleSupSub = function shouldHandleSupSub(group, options) {
    if (!group.value.base) {
        return false;
    } else {
        var base = group.value.base;
        if (base.type === "op") {
            // Operators handle supsubs differently when they have limits
            // (e.g. `\displaystyle\sum_2^3`)
            return base.value.limits && (options.style.size === _Style2.default.DISPLAY.size || base.value.alwaysHandleSupSub);
        } else if (base.type === "accent") {
            return _utils2.default.isCharacterBox(base.value.base);
        } else if (base.type === "horizBrace") {
            var isSup = group.value.sub ? false : true;
            return isSup === base.value.isOver;
        } else {
            return null;
        }
    }
};

var makeNullDelimiter = exports.makeNullDelimiter = function makeNullDelimiter(options, classes) {
    var moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
    return makeSpan(classes.concat(moreClasses));
};

/**
 * This is a map of group types to the function used to handle that type.
 * Simpler types come at the beginning, while complicated types come afterwards.
 */
var groupTypes = exports.groupTypes = {};

groupTypes.mathord = function (group, options) {
    return _buildCommon2.default.makeOrd(group, options, "mathord");
};

groupTypes.textord = function (group, options) {
    return _buildCommon2.default.makeOrd(group, options, "textord");
};

groupTypes.bin = function (group, options) {
    return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mbin"]);
};

groupTypes.rel = function (group, options) {
    return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mrel"]);
};

groupTypes.open = function (group, options) {
    return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mopen"]);
};

groupTypes.close = function (group, options) {
    return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mclose"]);
};

groupTypes.inner = function (group, options) {
    return _buildCommon2.default.mathsym(group.value, group.mode, options, ["minner"]);
};

groupTypes.punct = function (group, options) {
    return _buildCommon2.default.mathsym(group.value, group.mode, options, ["mpunct"]);
};

groupTypes.ordgroup = function (group, options) {
    return makeSpan(["mord"], buildExpression(group.value, options, true), options);
};

groupTypes.supsub = function (group, options) {
    // Superscript and subscripts are handled in the TeXbook on page
    // 445-446, rules 18(a-f).

    // Here is where we defer to the inner group if it should handle
    // superscripts and subscripts itself.
    if (shouldHandleSupSub(group, options)) {
        return groupTypes[group.value.base.type](group, options);
    }

    var base = buildGroup(group.value.base, options);
    var supm = void 0;
    var subm = void 0;

    var metrics = options.fontMetrics();
    var newOptions = void 0;

    // Rule 18a
    var supShift = 0;
    var subShift = 0;

    if (group.value.sup) {
        newOptions = options.havingStyle(options.style.sup());
        supm = buildGroup(group.value.sup, newOptions, options);
        if (!_utils2.default.isCharacterBox(group.value.base)) {
            supShift = base.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
        }
    }

    if (group.value.sub) {
        newOptions = options.havingStyle(options.style.sub());
        subm = buildGroup(group.value.sub, newOptions, options);
        if (!_utils2.default.isCharacterBox(group.value.base)) {
            subShift = base.depth + newOptions.fontMetrics().subDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
        }
    }

    // Rule 18c
    var minSupShift = void 0;
    if (options.style === _Style2.default.DISPLAY) {
        minSupShift = metrics.sup1;
    } else if (options.style.cramped) {
        minSupShift = metrics.sup3;
    } else {
        minSupShift = metrics.sup2;
    }

    // scriptspace is a font-size-independent size, so scale it
    // appropriately
    var multiplier = options.sizeMultiplier;
    var scriptspace = 0.5 / metrics.ptPerEm / multiplier + "em";

    var supsub = void 0;
    if (!group.value.sup) {
        // Rule 18b
        subShift = Math.max(subShift, metrics.sub1, subm.height - 0.8 * metrics.xHeight);

        var vlistElem = [{ type: "elem", elem: subm, marginRight: scriptspace }];
        // Subscripts shouldn't be shifted by the base's italic correction.
        // Account for that by shifting the subscript back the appropriate
        // amount. Note we only do this when the base is a single symbol.
        if (base instanceof _domTree2.default.symbolNode) {
            vlistElem[0].marginLeft = -base.italic + "em";
        }

        supsub = _buildCommon2.default.makeVList({
            positionType: "shift",
            positionData: subShift,
            children: vlistElem
        }, options);
    } else if (!group.value.sub) {
        // Rule 18c, d
        supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);

        supsub = _buildCommon2.default.makeVList({
            positionType: "shift",
            positionData: -supShift,
            children: [{ type: "elem", elem: supm, marginRight: scriptspace }]
        }, options);
    } else {
        supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
        subShift = Math.max(subShift, metrics.sub2);

        var ruleWidth = metrics.defaultRuleThickness;

        // Rule 18e
        if (supShift - supm.depth - (subm.height - subShift) < 4 * ruleWidth) {
            subShift = 4 * ruleWidth - (supShift - supm.depth) + subm.height;
            var psi = 0.8 * metrics.xHeight - (supShift - supm.depth);
            if (psi > 0) {
                supShift += psi;
                subShift -= psi;
            }
        }

        var _vlistElem = [{ type: "elem", elem: subm, shift: subShift, marginRight: scriptspace }, { type: "elem", elem: supm, shift: -supShift, marginRight: scriptspace }];
        // See comment above about subscripts not being shifted
        if (base instanceof _domTree2.default.symbolNode) {
            _vlistElem[0].marginLeft = -base.italic + "em";
        }

        supsub = _buildCommon2.default.makeVList({
            positionType: "individualShift",
            children: _vlistElem
        }, options);
    }

    // We ensure to wrap the supsub vlist in a span.msupsub to reset text-align
    var mclass = getTypeOfDomTree(base) || "mord";
    return makeSpan([mclass], [base, makeSpan(["msupsub"], [supsub])], options);
};

groupTypes.spacing = function (group, options) {
    if (group.value === "\\ " || group.value === "\\space" || group.value === " " || group.value === "~") {
        // Spaces are generated by adding an actual space. Each of these
        // things has an entry in the symbols table, so these will be turned
        // into appropriate outputs.
        if (group.mode === "text") {
            return _buildCommon2.default.makeOrd(group, options, "textord");
        } else {
            return makeSpan(["mspace"], [_buildCommon2.default.mathsym(group.value, group.mode, options)], options);
        }
    } else {
        // Other kinds of spaces are of arbitrary width. We use CSS to
        // generate these.
        return makeSpan(["mspace", _buildCommon2.default.spacingFunctions[group.value].className], [], options);
    }
};

function sizingGroup(value, options, baseOptions) {
    var inner = buildExpression(value, options, false);
    var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;

    // Add size-resetting classes to the inner list and set maxFontSize
    // manually. Handle nested size changes.
    for (var i = 0; i < inner.length; i++) {
        var pos = _utils2.default.indexOf(inner[i].classes, "sizing");
        if (pos < 0) {
            Array.prototype.push.apply(inner[i].classes, options.sizingClasses(baseOptions));
        } else if (inner[i].classes[pos + 1] === "reset-size" + options.size) {
            // This is a nested size change: e.g., inner[i] is the "b" in
            // `\Huge a \small b`. Override the old size (the `reset-` class)
            // but not the new size.
            inner[i].classes[pos + 1] = "reset-size" + baseOptions.size;
        }

        inner[i].height *= multiplier;
        inner[i].depth *= multiplier;
    }

    return _buildCommon2.default.makeFragment(inner);
}

groupTypes.sizing = function (group, options) {
    // Handle sizing operators like \Huge. Real TeX doesn't actually allow
    // these functions inside of math expressions, so we do some special
    // handling.
    var newOptions = options.havingSize(group.value.size);
    return sizingGroup(group.value.value, newOptions, options);
};

groupTypes.styling = function (group, options) {
    // Style changes are handled in the TeXbook on pg. 442, Rule 3.
    var newStyle = styleMap[group.value.style];
    var newOptions = options.havingStyle(newStyle);
    return sizingGroup(group.value.value, newOptions, options);
};

groupTypes.font = function (group, options) {
    var font = group.value.font;
    return buildGroup(group.value.body, options.withFontFamily(font));
};

groupTypes.horizBrace = function (group, options) {
    var style = options.style;

    var hasSupSub = group.type === "supsub";
    var supSubGroup = void 0;
    var newOptions = void 0;
    if (hasSupSub) {
        // Ref: LaTeX source2e: }}}}\limits}
        // i.e. LaTeX treats the brace similar to an op and passes it
        // with \limits, so we need to assign supsub style.
        if (group.value.sup) {
            newOptions = options.havingStyle(style.sup());
            supSubGroup = buildGroup(group.value.sup, newOptions, options);
        } else {
            newOptions = options.havingStyle(style.sub());
            supSubGroup = buildGroup(group.value.sub, newOptions, options);
        }
        group = group.value.base;
    }

    // Build the base group
    var body = buildGroup(group.value.base, options.havingBaseStyle(_Style2.default.DISPLAY));

    // Create the stretchy element
    var braceBody = _stretchy2.default.svgSpan(group, options);

    // Generate the vlist, with the appropriate kerns               ┏━━━━━━━━┓
    // This first vlist contains the subject matter and the brace:   equation
    var vlist = void 0;
    if (group.value.isOver) {
        vlist = _buildCommon2.default.makeVList({
            positionType: "firstBaseline",
            children: [{ type: "elem", elem: body }, { type: "kern", size: 0.1 }, { type: "elem", elem: braceBody }]
        }, options);
        vlist.children[0].children[0].children[1].classes.push("svg-align");
    } else {
        vlist = _buildCommon2.default.makeVList({
            positionType: "bottom",
            positionData: body.depth + 0.1 + braceBody.height,
            children: [{ type: "elem", elem: braceBody }, { type: "kern", size: 0.1 }, { type: "elem", elem: body }]
        }, options);
        vlist.children[0].children[0].children[0].classes.push("svg-align");
    }

    if (hasSupSub) {
        // In order to write the supsub, wrap the first vlist in another vlist:
        // They can't all go in the same vlist, because the note might be wider
        // than the equation. We want the equation to control the brace width.

        //      note          long note           long note
        //   ┏━━━━━━━━┓   or    ┏━━━┓     not    ┏━━━━━━━━━┓
        //    equation           eqn                 eqn

        var vSpan = makeSpan(["mord", group.value.isOver ? "mover" : "munder"], [vlist], options);

        if (group.value.isOver) {
            vlist = _buildCommon2.default.makeVList({
                positionType: "firstBaseline",
                children: [{ type: "elem", elem: vSpan }, { type: "kern", size: 0.2 }, { type: "elem", elem: supSubGroup }]
            }, options);
        } else {
            vlist = _buildCommon2.default.makeVList({
                positionType: "bottom",
                positionData: vSpan.depth + 0.2 + supSubGroup.height,
                children: [{ type: "elem", elem: supSubGroup }, { type: "kern", size: 0.2 }, { type: "elem", elem: vSpan }]
            }, options);
        }
    }

    return makeSpan(["mord", group.value.isOver ? "mover" : "munder"], [vlist], options);
};

groupTypes.xArrow = function (group, options) {
    var style = options.style;

    // Build the argument groups in the appropriate style.
    // Ref: amsmath.dtx:   \hbox{$\scriptstyle\mkern#3mu{#6}\mkern#4mu$}%

    var newOptions = options.havingStyle(style.sup());
    var upperGroup = buildGroup(group.value.body, newOptions, options);
    upperGroup.classes.push("x-arrow-pad");

    var lowerGroup = void 0;
    if (group.value.below) {
        // Build the lower group
        newOptions = options.havingStyle(style.sub());
        lowerGroup = buildGroup(group.value.below, newOptions, options);
        lowerGroup.classes.push("x-arrow-pad");
    }

    var arrowBody = _stretchy2.default.svgSpan(group, options);

    // Re shift: Note that stretchy.svgSpan returned arrowBody.depth = 0.
    // The point we want on the math axis is at 0.5 * arrowBody.height.
    var arrowShift = -options.fontMetrics().axisHeight + 0.5 * arrowBody.height;
    // 2 mu kern. Ref: amsmath.dtx: #7\if0#2\else\mkern#2mu\fi
    var upperShift = -options.fontMetrics().axisHeight - 0.5 * arrowBody.height - 0.111;

    // Generate the vlist
    var vlist = void 0;
    if (group.value.below) {
        var lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + 0.5 * arrowBody.height + 0.111;
        vlist = _buildCommon2.default.makeVList({
            positionType: "individualShift",
            children: [{ type: "elem", elem: upperGroup, shift: upperShift }, { type: "elem", elem: arrowBody, shift: arrowShift }, { type: "elem", elem: lowerGroup, shift: lowerShift }]
        }, options);
    } else {
        vlist = _buildCommon2.default.makeVList({
            positionType: "individualShift",
            children: [{ type: "elem", elem: upperGroup, shift: upperShift }, { type: "elem", elem: arrowBody, shift: arrowShift }]
        }, options);
    }

    vlist.children[0].children[0].children[1].classes.push("svg-align");

    return makeSpan(["mrel", "x-arrow"], [vlist], options);
};

groupTypes.mclass = function (group, options) {
    var elements = buildExpression(group.value.value, options, true);

    return makeSpan([group.value.mclass], elements, options);
};

groupTypes.raisebox = function (group, options) {
    var body = groupTypes.sizing({ value: {
            value: [{
                type: "text",
                value: {
                    body: group.value.value,
                    font: "mathrm" // simulate \textrm
                }
            }],
            size: 6 // simulate \normalsize
        } }, options);
    var dy = (0, _units.calculateSize)(group.value.dy.value, options);
    return _buildCommon2.default.makeVList({
        positionType: "shift",
        positionData: -dy,
        children: [{ type: "elem", elem: body }]
    }, options);
};

/**
 * buildGroup is the function that takes a group and calls the correct groupType
 * function for it. It also handles the interaction of size and style changes
 * between parents and children.
 */
var buildGroup = exports.buildGroup = function buildGroup(group, options, baseOptions) {
    if (!group) {
        return makeSpan();
    }

    if (groupTypes[group.type]) {
        // Call the groupTypes function
        var groupNode = groupTypes[group.type](group, options);

        // If the size changed between the parent and the current group, account
        // for that size difference.
        if (baseOptions && options.size !== baseOptions.size) {
            groupNode = makeSpan(options.sizingClasses(baseOptions), [groupNode], options);

            var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;

            groupNode.height *= multiplier;
            groupNode.depth *= multiplier;
        }

        return groupNode;
    } else {
        throw new _ParseError2.default("Got group of unknown type: '" + group.type + "'");
    }
};

/**
 * Take an entire parse tree, and build it into an appropriate set of HTML
 * nodes.
 */
function buildHTML(tree, options) {
    // buildExpression is destructive, so we need to make a clone
    // of the incoming tree so that it isn't accidentally changed
    tree = JSON.parse(JSON.stringify(tree));

    // Build the expression contained in the tree
    var expression = buildExpression(tree, options, true);
    var body = makeSpan(["base"], expression, options);

    // Add struts, which ensure that the top of the HTML element falls at the
    // height of the expression, and the bottom of the HTML element falls at the
    // depth of the expression.
    var topStrut = makeSpan(["strut"]);
    var bottomStrut = makeSpan(["strut", "bottom"]);

    topStrut.style.height = body.height + "em";
    bottomStrut.style.height = body.height + body.depth + "em";
    // We'd like to use `vertical-align: top` but in IE 9 this lowers the
    // baseline of the box to the bottom of this strut (instead staying in the
    // normal place) so we use an absolute value for vertical-align instead
    bottomStrut.style.verticalAlign = -body.depth + "em";

    // Wrap the struts and body together
    var htmlNode = makeSpan(["katex-html"], [topStrut, bottomStrut, body]);

    htmlNode.setAttribute("aria-hidden", "true");

    return htmlNode;
}

/***/ })

});