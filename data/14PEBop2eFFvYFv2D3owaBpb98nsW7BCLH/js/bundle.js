(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
	Autosize 4.0.0
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : (function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			'delete': function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	})();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		// IE does not support `new Event()`
		createEvent = function (name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = ta.clientWidth;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			var originalHeight = ta.style.height;
			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.height = '';

			var endHeight = ta.scrollHeight + heightOffset;

			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}

			ta.style.height = endHeight + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
			overflows.forEach(function (el) {
				el.node.scrollTop = el.scrollTop;
			});

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight !== styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = (function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});

			map['delete'](ta);
		}).bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	module.exports = autosize;
});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\autosize\\dist\\autosize.js","/node_modules\\autosize\\dist")

},{"_process":19,"buffer":3}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\base64-js\\index.js","/node_modules\\base64-js")

},{"_process":19,"buffer":3}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\buffer\\index.js","/node_modules\\buffer")

},{"_process":19,"base64-js":2,"buffer":3,"ieee754":9}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\desandro-matches-selector\\matches-selector.js","/node_modules\\desandro-matches-selector")

},{"_process":19,"buffer":3}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Draggabilly v2.1.1
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'get-size/get-size',
        'unidragger/unidragger'
      ],
      function( getSize, Unidragger ) {
        return factory( window, getSize, Unidragger );
      });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size'),
      require('unidragger')
    );
  } else {
    // browser global
    window.Draggabilly = factory(
      window,
      window.getSize,
      window.Unidragger
    );
  }

}( window, function factory( window, getSize, Unidragger ) {

'use strict';

// vars
var document = window.document;

function noop() {}

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function isElement( obj ) {
  return obj instanceof HTMLElement;
}

// -------------------------- requestAnimationFrame -------------------------- //

// get rAF, prefixed, if present
var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

// fallback to setTimeout
var lastTime = 0;
if ( !requestAnimationFrame )  {
  requestAnimationFrame = function( callback ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = setTimeout( callback, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };
}

// -------------------------- support -------------------------- //

var docElem = document.documentElement;
var transformProperty = typeof docElem.style.transform == 'string' ?
  'transform' : 'WebkitTransform';

var jQuery = window.jQuery;

// --------------------------  -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element == 'string' ?
    document.querySelector( element ) : element;

  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = extend( {}, this.constructor.defaults );
  this.option( options );

  this._create();
}

// inherit Unidragger methods
var proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

Draggabilly.defaults = {
};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  extend( this.options, opts );
};

// css position values that don't need to be set
var positionValues = {
  relative: true,
  absolute: true,
  fixed: true
};

proto._create = function() {

  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = extend( {}, this.position );

  // set relative positioning
  var style = getComputedStyle( this.element );
  if ( !positionValues[ style.position ] ) {
    this.element.style.position = 'relative';
  }

  this.enable();
  this.setHandles();

};

/**
 * set this.handles and bind start events to 'em
 */
proto.setHandles = function() {
  this.handles = this.options.handle ?
    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

  this.bindHandles();
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = [ event ].concat( args );
  this.emitEvent( type, emitArgs );
  var jQuery = window.jQuery;
  // trigger jQuery event
  if ( jQuery && this.$element ) {
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- position -------------------------- //

// get x/y position from style
proto._getPosition = function() {
  var style = getComputedStyle( this.element );
  var x = this._getPositionCoord( style.left, 'width' );
  var y = this._getPositionCoord( style.top, 'height' );
  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

proto._getPositionCoord = function( styleSide, measure ) {
  if ( styleSide.indexOf('%') != -1 ) {
    // convert percent into pixel for Safari, #75
    var parentSize = getSize( this.element.parentNode );
    // prevent not-in-DOM element throwing bug, #131
    return !parentSize ? 0 :
      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
  }
  return parseInt( styleSide, 10 );
};

// add transform: translate( x, y ) to position
proto._addTransformPosition = function( style ) {
  var transform = style[ transformProperty ];
  // bail out if value is 'none'
  if ( transform.indexOf('matrix') !== 0 ) {
    return;
  }
  // split matrix(1, 0, 0, 1, x, y)
  var matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
  var translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  if ( focused && focused.blur && focused != document.body ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.element.classList.add('is-pointer-down');
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

/**
 * drag start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragStart = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  this._getPosition();
  this.measureContainment();
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;
  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  this.element.classList.add('is-dragging');
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
  // start animation
  this.animate();
};

proto.measureContainment = function() {
  var containment = this.options.containment;
  if ( !containment ) {
    return;
  }

  // use element if element
  var container = isElement( containment ) ? containment :
    // fallback to querySelector if string
    typeof containment == 'string' ? document.querySelector( containment ) :
    // otherwise just `true`, use the parent
    this.element.parentNode;

  var elemSize = getSize( this.element );
  var containerSize = getSize( container );
  var elemRect = this.element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();

  var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
  var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

  var position = this.relativeStartPosition = {
    x: elemRect.left - ( containerRect.left + containerSize.borderLeftWidth ),
    y: elemRect.top - ( containerRect.top + containerSize.borderTopWidth )
  };

  this.containSize = {
    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height
  };
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isEnabled ) {
    return;
  }
  var dragX = moveVector.x;
  var dragY = moveVector.y;

  var grid = this.options.grid;
  var gridX = grid && grid[0];
  var gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  dragX = this.containDrag( 'x', dragX, gridX );
  dragY = this.containDrag( 'y', dragY, gridY );

  // constrain to axis
  dragX = this.options.axis == 'y' ? 0 : dragX;
  dragY = this.options.axis == 'x' ? 0 : dragY;

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;

  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

function applyGrid( value, grid, method ) {
  method = method || 'round';
  return grid ? Math[ method ]( value / grid ) * grid : value;
}

proto.containDrag = function( axis, drag, grid ) {
  if ( !this.options.containment ) {
    return drag;
  }
  var measure = axis == 'x' ? 'width' : 'height';

  var rel = this.relativeStartPosition[ axis ];
  var min = applyGrid( -rel, grid, 'ceil' );
  var max = this.containSize[ measure ];
  max = applyGrid( max, grid, 'floor' );
  return  Math.min( max, Math.max( min, drag ) );
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.element.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

/**
 * drag end
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragEnd = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  // use top left position when complete
  if ( transformProperty ) {
    this.element.style[ transformProperty ] = '';
    this.setLeftTop();
  }
  this.element.classList.remove('is-dragging');
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

// -------------------------- animation -------------------------- //

proto.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  this.positionDrag();

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  });

};

// left/top positioning
proto.setLeftTop = function() {
  this.element.style.left = this.position.x + 'px';
  this.element.style.top  = this.position.y + 'px';
};

proto.positionDrag = function() {
  this.element.style[ transformProperty ] = 'translate3d( ' + this.dragPoint.x +
    'px, ' + this.dragPoint.y + 'px, 0)';
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  this.dispatchEvent( 'staticClick', event, [ pointer ] );
};

// ----- methods ----- //

proto.enable = function() {
  this.isEnabled = true;
};

proto.disable = function() {
  this.isEnabled = false;
  if ( this.isDragging ) {
    this.dragEnd();
  }
};

proto.destroy = function() {
  this.disable();
  // reset styles
  this.element.style[ transformProperty ] = '';
  this.element.style.left = '';
  this.element.style.top = '';
  this.element.style.position = '';
  // unbind handles
  this.unbindHandles();
  // remove jQuery data
  if ( this.$element ) {
    this.$element.removeData('draggabilly');
  }
};

// ----- jQuery bridget ----- //

// required for jQuery bridget
proto._init = noop;

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'draggabilly', Draggabilly );
}

// -----  ----- //

return Draggabilly;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\draggabilly\\draggabilly.js","/node_modules\\draggabilly")

},{"_process":19,"buffer":3,"get-size":8,"unidragger":21}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\ev-emitter\\ev-emitter.js","/node_modules\\ev-emitter")

},{"_process":19,"buffer":3}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Fizzy UI utils v2.0.5
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj == 'object' &&
    typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    if ( timeout ) {
      clearTimeout( timeout );
    }
    var args = arguments;

    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\fizzy-ui-utils\\utils.js","/node_modules\\fizzy-ui-utils")

},{"_process":19,"buffer":3,"desandro-matches-selector":4}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

( function( window, factory ) {
  'use strict';

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( function() {
      return factory();
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See http://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
  body.removeChild( div );

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\get-size\\get-size.js","/node_modules\\get-size")

},{"_process":19,"buffer":3}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\ieee754\\index.js","/node_modules\\ieee754")

},{"_process":19,"buffer":3}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(
          cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1])
        );
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return '';
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[^]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[^]*/, '$1') + href;
  } else {
    return base + href;
  }
}
baseUrls = {};
originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false,
  baseUrl: null
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\marked\\lib\\marked.js","/node_modules\\marked\\lib")

},{"_process":19,"buffer":3}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
//! moment.js
//! version : 2.20.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString(keepOffset) {
    if (!this.isValid()) {
        return null;
    }
    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        if (utc) {
            return this.toDate().toISOString();
        } else {
            return new Date(this._d.valueOf()).toISOString().replace('Z', formatMoment(m, 'Z'));
        }
    }
    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.20.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

// currently HTML5 input type only supports 24-hour formats
hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',                             // <input type="date" />
    TIME: 'HH:mm',                                  // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
    WEEK: 'YYYY-[W]WW',                             // <input type="week" />
    MONTH: 'YYYY-MM'                                // <input type="month" />
};

return hooks;

})));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\moment\\moment.js","/node_modules\\moment")

},{"_process":19,"buffer":3}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( [
        'ev-emitter/ev-emitter',
        'get-size/get-size'
      ],
      factory
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseFloat( xValue );
  var y = parseFloat( yValue );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  if ( xValue.indexOf('%') != -1 ) {
    x = ( x / 100 ) * layoutSize.width;
  }
  if ( yValue.indexOf('%') != -1 ) {
    y = ( y / 100 ) * layoutSize.height;
  }
  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var didNotMove = x == this.position.x && y == this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseFloat( x );
  this.position.y = parseFloat( y );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\outlayer\\item.js","/node_modules\\outlayer")

},{"_process":19,"buffer":3,"ev-emitter":6,"get-size":8}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( [
        'ev-emitter/ev-emitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\outlayer\\outlayer.js","/node_modules\\outlayer")

},{"./item":12,"_process":19,"buffer":3,"ev-emitter":6,"fizzy-ui-utils":7,"get-size":8}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Packery Item Element
**/

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'outlayer/outlayer',
        './rect'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('./rect')
    );
  } else {
    // browser global
    window.Packery.Item = factory(
      window.Outlayer,
      window.Packery.Rect
    );
  }

}( window, function factory( Outlayer, Rect ) {
'use strict';

// -------------------------- Item -------------------------- //

var docElemStyle = document.documentElement.style;

var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

// sub-class Item
var Item = function PackeryItem() {
  Outlayer.Item.apply( this, arguments );
};

var proto = Item.prototype = Object.create( Outlayer.Item.prototype );

var __create = proto._create;
proto._create = function() {
  // call default _create logic
  __create.call( this );
  this.rect = new Rect();
};

var _moveTo = proto.moveTo;
proto.moveTo = function( x, y ) {
  // don't shift 1px while dragging
  var dx = Math.abs( this.position.x - x );
  var dy = Math.abs( this.position.y - y );

  var canHackGoTo = this.layout.dragItemCount && !this.isPlacing &&
    !this.isTransitioning && dx < 1 && dy < 1;
  if ( canHackGoTo ) {
    this.goTo( x, y );
    return;
  }
  _moveTo.apply( this, arguments );
};

// -------------------------- placing -------------------------- //

proto.enablePlacing = function() {
  this.removeTransitionStyles();
  // remove transform property from transition
  if ( this.isTransitioning && transformProperty ) {
    this.element.style[ transformProperty ] = 'none';
  }
  this.isTransitioning = false;
  this.getSize();
  this.layout._setRectSize( this.element, this.rect );
  this.isPlacing = true;
};

proto.disablePlacing = function() {
  this.isPlacing = false;
};

// -----  ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // add space back to packer
  this.layout.packer.addSpace( this.rect );
  this.emitEvent( 'remove', [ this ] );
};

// ----- dropPlaceholder ----- //

proto.showDropPlaceholder = function() {
  var dropPlaceholder = this.dropPlaceholder;
  if ( !dropPlaceholder ) {
    // create dropPlaceholder
    dropPlaceholder = this.dropPlaceholder = document.createElement('div');
    dropPlaceholder.className = 'packery-drop-placeholder';
    dropPlaceholder.style.position = 'absolute';
  }

  dropPlaceholder.style.width = this.size.width + 'px';
  dropPlaceholder.style.height = this.size.height + 'px';
  this.positionDropPlaceholder();
  this.layout.element.appendChild( dropPlaceholder );
};

proto.positionDropPlaceholder = function() {
  this.dropPlaceholder.style[ transformProperty ] = 'translate(' +
    this.rect.x + 'px, ' + this.rect.y + 'px)';
};

proto.hideDropPlaceholder = function() {
  // only remove once, #333
  var parent = this.dropPlaceholder.parentNode;
  if ( parent ) {
    parent.removeChild( this.dropPlaceholder );
  }
};

// -----  ----- //

return Item;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\packery\\js\\item.js","/node_modules\\packery\\js")

},{"./rect":17,"_process":19,"buffer":3,"outlayer":13}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Packer
 * bin-packing algorithm
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [ './rect' ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./rect')
    );
  } else {
    // browser global
    var Packery = window.Packery = window.Packery || {};
    Packery.Packer = factory( Packery.Rect );
  }

}( window, function factory( Rect ) {
'use strict';

// -------------------------- Packer -------------------------- //

/**
 * @param {Number} width
 * @param {Number} height
 * @param {String} sortDirection
 *   topLeft for vertical, leftTop for horizontal
 */
function Packer( width, height, sortDirection ) {
  this.width = width || 0;
  this.height = height || 0;
  this.sortDirection = sortDirection || 'downwardLeftToRight';

  this.reset();
}

var proto = Packer.prototype;

proto.reset = function() {
  this.spaces = [];

  var initialSpace = new Rect({
    x: 0,
    y: 0,
    width: this.width,
    height: this.height
  });

  this.spaces.push( initialSpace );
  // set sorter
  this.sorter = sorters[ this.sortDirection ] || sorters.downwardLeftToRight;
};

// change x and y of rect to fit with in Packer's available spaces
proto.pack = function( rect ) {
  for ( var i=0; i < this.spaces.length; i++ ) {
    var space = this.spaces[i];
    if ( space.canFit( rect ) ) {
      this.placeInSpace( rect, space );
      break;
    }
  }
};

proto.columnPack = function( rect ) {
  for ( var i=0; i < this.spaces.length; i++ ) {
    var space = this.spaces[i];
    var canFitInSpaceColumn = space.x <= rect.x &&
      space.x + space.width >= rect.x + rect.width &&
      space.height >= rect.height - 0.01; // fudge number for rounding error
    if ( canFitInSpaceColumn ) {
      rect.y = space.y;
      this.placed( rect );
      break;
    }
  }
};

proto.rowPack = function( rect ) {
  for ( var i=0; i < this.spaces.length; i++ ) {
    var space = this.spaces[i];
    var canFitInSpaceRow = space.y <= rect.y &&
      space.y + space.height >= rect.y + rect.height &&
      space.width >= rect.width - 0.01; // fudge number for rounding error
    if ( canFitInSpaceRow ) {
      rect.x = space.x;
      this.placed( rect );
      break;
    }
  }
};

proto.placeInSpace = function( rect, space ) {
  // place rect in space
  rect.x = space.x;
  rect.y = space.y;

  this.placed( rect );
};

// update spaces with placed rect
proto.placed = function( rect ) {
  // update spaces
  var revisedSpaces = [];
  for ( var i=0; i < this.spaces.length; i++ ) {
    var space = this.spaces[i];
    var newSpaces = space.getMaximalFreeRects( rect );
    // add either the original space or the new spaces to the revised spaces
    if ( newSpaces ) {
      revisedSpaces.push.apply( revisedSpaces, newSpaces );
    } else {
      revisedSpaces.push( space );
    }
  }

  this.spaces = revisedSpaces;

  this.mergeSortSpaces();
};

proto.mergeSortSpaces = function() {
  // remove redundant spaces
  Packer.mergeRects( this.spaces );
  this.spaces.sort( this.sorter );
};

// add a space back
proto.addSpace = function( rect ) {
  this.spaces.push( rect );
  this.mergeSortSpaces();
};

// -------------------------- utility functions -------------------------- //

/**
 * Remove redundant rectangle from array of rectangles
 * @param {Array} rects: an array of Rects
 * @returns {Array} rects: an array of Rects
**/
Packer.mergeRects = function( rects ) {
  var i = 0;
  var rect = rects[i];

  rectLoop:
  while ( rect ) {
    var j = 0;
    var compareRect = rects[ i + j ];

    while ( compareRect ) {
      if  ( compareRect == rect ) {
        j++; // next
      } else if ( compareRect.contains( rect ) ) {
        // remove rect
        rects.splice( i, 1 );
        rect = rects[i]; // set next rect
        continue rectLoop; // bail on compareLoop
      } else if ( rect.contains( compareRect ) ) {
        // remove compareRect
        rects.splice( i + j, 1 );
      } else {
        j++;
      }
      compareRect = rects[ i + j ]; // set next compareRect
    }
    i++;
    rect = rects[i];
  }

  return rects;
};


// -------------------------- sorters -------------------------- //

// functions for sorting rects in order
var sorters = {
  // top down, then left to right
  downwardLeftToRight: function( a, b ) {
    return a.y - b.y || a.x - b.x;
  },
  // left to right, then top down
  rightwardTopToBottom: function( a, b ) {
    return a.x - b.x || a.y - b.y;
  }
};


// --------------------------  -------------------------- //

return Packer;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\packery\\js\\packer.js","/node_modules\\packery\\js")

},{"./rect":17,"_process":19,"buffer":3}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Packery v2.1.1
 * Gapless, draggable grid layouts
 *
 * Licensed GPLv3 for open source use
 * or Packery Commercial License for commercial use
 *
 * http://packery.metafizzy.co
 * Copyright 2016 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'get-size/get-size',
        'outlayer/outlayer',
        './rect',
        './packer',
        './item'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('get-size'),
      require('outlayer'),
      require('./rect'),
      require('./packer'),
      require('./item')
    );
  } else {
    // browser global
    window.Packery = factory(
      window.getSize,
      window.Outlayer,
      window.Packery.Rect,
      window.Packery.Packer,
      window.Packery.Item
    );
  }

}( window, function factory( getSize, Outlayer, Rect, Packer, Item ) {
'use strict';

// ----- Rect ----- //

// allow for pixel rounding errors IE8-IE11 & Firefox; #227
Rect.prototype.canFit = function( rect ) {
  return this.width >= rect.width - 1 && this.height >= rect.height - 1;
};

// -------------------------- Packery -------------------------- //

// create an Outlayer layout class
var Packery = Outlayer.create('packery');
Packery.Item = Item;

var proto = Packery.prototype;

proto._create = function() {
  // call super
  Outlayer.prototype._create.call( this );

  // initial properties
  this.packer = new Packer();
  // packer for drop targets
  this.shiftPacker = new Packer();
  this.isEnabled = true;

  this.dragItemCount = 0;

  // create drag handlers
  var _this = this;
  this.handleDraggabilly = {
    dragStart: function() {
      _this.itemDragStart( this.element );
    },
    dragMove: function() {
      _this.itemDragMove( this.element, this.position.x, this.position.y );
    },
    dragEnd: function() {
      _this.itemDragEnd( this.element );
    }
  };

  this.handleUIDraggable = {
    start: function handleUIDraggableStart( event, ui ) {
      // HTML5 may trigger dragstart, dismiss HTML5 dragging
      if ( !ui ) {
        return;
      }
      _this.itemDragStart( event.currentTarget );
    },
    drag: function handleUIDraggableDrag( event, ui ) {
      if ( !ui ) {
        return;
      }
      _this.itemDragMove( event.currentTarget, ui.position.left, ui.position.top );
    },
    stop: function handleUIDraggableStop( event, ui ) {
      if ( !ui ) {
        return;
      }
      _this.itemDragEnd( event.currentTarget );
    }
  };

};


// ----- init & layout ----- //

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();

  this._getMeasurements();

  // reset packer
  var width, height, sortDirection;
  // packer settings, if horizontal or vertical
  if ( this._getOption('horizontal') ) {
    width = Infinity;
    height = this.size.innerHeight + this.gutter;
    sortDirection = 'rightwardTopToBottom';
  } else {
    width = this.size.innerWidth + this.gutter;
    height = Infinity;
    sortDirection = 'downwardLeftToRight';
  }

  this.packer.width = this.shiftPacker.width = width;
  this.packer.height = this.shiftPacker.height = height;
  this.packer.sortDirection = this.shiftPacker.sortDirection = sortDirection;

  this.packer.reset();

  // layout
  this.maxY = 0;
  this.maxX = 0;
};

/**
 * update columnWidth, rowHeight, & gutter
 * @private
 */
proto._getMeasurements = function() {
  this._getMeasurement( 'columnWidth', 'width' );
  this._getMeasurement( 'rowHeight', 'height' );
  this._getMeasurement( 'gutter', 'width' );
};

proto._getItemLayoutPosition = function( item ) {
  this._setRectSize( item.element, item.rect );
  if ( this.isShifting || this.dragItemCount > 0 ) {
    var packMethod = this._getPackMethod();
    this.packer[ packMethod ]( item.rect );
  } else {
    this.packer.pack( item.rect );
  }

  this._setMaxXY( item.rect );
  return item.rect;
};

proto.shiftLayout = function() {
  this.isShifting = true;
  this.layout();
  delete this.isShifting;
};

proto._getPackMethod = function() {
  return this._getOption('horizontal') ? 'rowPack' : 'columnPack';
};


/**
 * set max X and Y value, for size of container
 * @param {Packery.Rect} rect
 * @private
 */
proto._setMaxXY = function( rect ) {
  this.maxX = Math.max( rect.x + rect.width, this.maxX );
  this.maxY = Math.max( rect.y + rect.height, this.maxY );
};

/**
 * set the width and height of a rect, applying columnWidth and rowHeight
 * @param {Element} elem
 * @param {Packery.Rect} rect
 */
proto._setRectSize = function( elem, rect ) {
  var size = getSize( elem );
  var w = size.outerWidth;
  var h = size.outerHeight;
  // size for columnWidth and rowHeight, if available
  // only check if size is non-zero, #177
  if ( w || h ) {
    w = this._applyGridGutter( w, this.columnWidth );
    h = this._applyGridGutter( h, this.rowHeight );
  }
  // rect must fit in packer
  rect.width = Math.min( w, this.packer.width );
  rect.height = Math.min( h, this.packer.height );
};

/**
 * fits item to columnWidth/rowHeight and adds gutter
 * @param {Number} measurement - item width or height
 * @param {Number} gridSize - columnWidth or rowHeight
 * @returns measurement
 */
proto._applyGridGutter = function( measurement, gridSize ) {
  // just add gutter if no gridSize
  if ( !gridSize ) {
    return measurement + this.gutter;
  }
  gridSize += this.gutter;
  // fit item to columnWidth/rowHeight
  var remainder = measurement % gridSize;
  var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
  measurement = Math[ mathMethod ]( measurement / gridSize ) * gridSize;
  return measurement;
};

proto._getContainerSize = function() {
  if ( this._getOption('horizontal') ) {
    return {
      width: this.maxX - this.gutter
    };
  } else {
    return {
      height: this.maxY - this.gutter
    };
  }
};


// -------------------------- stamp -------------------------- //

/**
 * makes space for element
 * @param {Element} elem
 */
proto._manageStamp = function( elem ) {

  var item = this.getItem( elem );
  var rect;
  if ( item && item.isPlacing ) {
    rect = item.rect;
  } else {
    var offset = this._getElementOffset( elem );
    rect = new Rect({
      x: this._getOption('originLeft') ? offset.left : offset.right,
      y: this._getOption('originTop') ? offset.top : offset.bottom
    });
  }

  this._setRectSize( elem, rect );
  // save its space in the packer
  this.packer.placed( rect );
  this._setMaxXY( rect );
};

// -------------------------- methods -------------------------- //

function verticalSorter( a, b ) {
  return a.position.y - b.position.y || a.position.x - b.position.x;
}

function horizontalSorter( a, b ) {
  return a.position.x - b.position.x || a.position.y - b.position.y;
}

proto.sortItemsByPosition = function() {
  var sorter = this._getOption('horizontal') ? horizontalSorter : verticalSorter;
  this.items.sort( sorter );
};

/**
 * Fit item element in its current position
 * Packery will position elements around it
 * useful for expanding elements
 *
 * @param {Element} elem
 * @param {Number} x - horizontal destination position, optional
 * @param {Number} y - vertical destination position, optional
 */
proto.fit = function( elem, x, y ) {
  var item = this.getItem( elem );
  if ( !item ) {
    return;
  }

  // stamp item to get it out of layout
  this.stamp( item.element );
  // set placing flag
  item.enablePlacing();
  this.updateShiftTargets( item );
  // fall back to current position for fitting
  x = x === undefined ? item.rect.x: x;
  y = y === undefined ? item.rect.y: y;
  // position it best at its destination
  this.shift( item, x, y );
  this._bindFitEvents( item );
  item.moveTo( item.rect.x, item.rect.y );
  // layout everything else
  this.shiftLayout();
  // return back to regularly scheduled programming
  this.unstamp( item.element );
  this.sortItemsByPosition();
  item.disablePlacing();
};

/**
 * emit event when item is fit and other items are laid out
 * @param {Packery.Item} item
 * @private
 */
proto._bindFitEvents = function( item ) {
  var _this = this;
  var ticks = 0;
  function onLayout() {
    ticks++;
    if ( ticks != 2 ) {
      return;
    }
    _this.dispatchEvent( 'fitComplete', null, [ item ] );
  }
  // when item is laid out
  item.once( 'layout', onLayout );
  // when all items are laid out
  this.once( 'layoutComplete', onLayout );
};

// -------------------------- resize -------------------------- //

// debounced, layout on resize
proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #285, outlayer#9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  if ( this.options.shiftPercentResize ) {
    this.resizeShiftPercentLayout();
  } else {
    this.layout();
  }
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  var innerSize = this._getOption('horizontal') ? 'innerHeight' : 'innerWidth';
  return size[ innerSize ] != this.size[ innerSize ];
};

proto.resizeShiftPercentLayout = function() {
  var items = this._getItemsForLayout( this.items );

  var isHorizontal = this._getOption('horizontal');
  var coord = isHorizontal ? 'y' : 'x';
  var measure = isHorizontal ? 'height' : 'width';
  var segmentName = isHorizontal ? 'rowHeight' : 'columnWidth';
  var innerSize = isHorizontal ? 'innerHeight' : 'innerWidth';

  // proportional re-align items
  var previousSegment = this[ segmentName ];
  previousSegment = previousSegment && previousSegment + this.gutter;

  if ( previousSegment ) {
    this._getMeasurements();
    var currentSegment = this[ segmentName ] + this.gutter;
    items.forEach( function( item ) {
      var seg = Math.round( item.rect[ coord ] / previousSegment );
      item.rect[ coord ] = seg * currentSegment;
    });
  } else {
    var currentSize = getSize( this.element )[ innerSize ] + this.gutter;
    var previousSize = this.packer[ measure ];
    items.forEach( function( item ) {
      item.rect[ coord ] = ( item.rect[ coord ] / previousSize ) * currentSize;
    });
  }

  this.shiftLayout();
};

// -------------------------- drag -------------------------- //

/**
 * handle an item drag start event
 * @param {Element} elem
 */
proto.itemDragStart = function( elem ) {
  if ( !this.isEnabled ) {
    return;
  }
  this.stamp( elem );
  // this.ignore( elem );
  var item = this.getItem( elem );
  if ( !item ) {
    return;
  }

  item.enablePlacing();
  item.showDropPlaceholder();
  this.dragItemCount++;
  this.updateShiftTargets( item );
};

proto.updateShiftTargets = function( dropItem ) {
  this.shiftPacker.reset();

  // pack stamps
  this._getBoundingRect();
  var isOriginLeft = this._getOption('originLeft');
  var isOriginTop = this._getOption('originTop');
  this.stamps.forEach( function( stamp ) {
    // ignore dragged item
    var item = this.getItem( stamp );
    if ( item && item.isPlacing ) {
      return;
    }
    var offset = this._getElementOffset( stamp );
    var rect = new Rect({
      x: isOriginLeft ? offset.left : offset.right,
      y: isOriginTop ? offset.top : offset.bottom
    });
    this._setRectSize( stamp, rect );
    // save its space in the packer
    this.shiftPacker.placed( rect );
  }, this );

  // reset shiftTargets
  var isHorizontal = this._getOption('horizontal');
  var segmentName = isHorizontal ? 'rowHeight' : 'columnWidth';
  var measure = isHorizontal ? 'height' : 'width';

  this.shiftTargetKeys = [];
  this.shiftTargets = [];
  var boundsSize;
  var segment = this[ segmentName ];
  segment = segment && segment + this.gutter;

  if ( segment ) {
    var segmentSpan = Math.ceil( dropItem.rect[ measure ] / segment );
    var segs = Math.floor( ( this.shiftPacker[ measure ] + this.gutter ) / segment );
    boundsSize = ( segs - segmentSpan ) * segment;
    // add targets on top
    for ( var i=0; i < segs; i++ ) {
      var initialX = isHorizontal ? 0 : i * segment;
      var initialY = isHorizontal ? i * segment : 0;
      this._addShiftTarget( initialX, initialY, boundsSize );
    }
  } else {
    boundsSize = ( this.shiftPacker[ measure ] + this.gutter ) - dropItem.rect[ measure ];
    this._addShiftTarget( 0, 0, boundsSize );
  }

  // pack each item to measure where shiftTargets are
  var items = this._getItemsForLayout( this.items );
  var packMethod = this._getPackMethod();
  items.forEach( function( item ) {
    var rect = item.rect;
    this._setRectSize( item.element, rect );
    this.shiftPacker[ packMethod ]( rect );

    // add top left corner
    this._addShiftTarget( rect.x, rect.y, boundsSize );
    // add bottom left / top right corner
    var cornerX = isHorizontal ? rect.x + rect.width : rect.x;
    var cornerY = isHorizontal ? rect.y : rect.y + rect.height;
    this._addShiftTarget( cornerX, cornerY, boundsSize );

    if ( segment ) {
      // add targets for each column on bottom / row on right
      var segSpan = Math.round( rect[ measure ] / segment );
      for ( var i=1; i < segSpan; i++ ) {
        var segX = isHorizontal ? cornerX : rect.x + segment * i;
        var segY = isHorizontal ? rect.y + segment * i : cornerY;
        this._addShiftTarget( segX, segY, boundsSize );
      }
    }
  }, this );

};

proto._addShiftTarget = function( x, y, boundsSize ) {
  var checkCoord = this._getOption('horizontal') ? y : x;
  if ( checkCoord !== 0 && checkCoord > boundsSize ) {
    return;
  }
  // create string for a key, easier to keep track of what targets
  var key = x + ',' + y;
  var hasKey = this.shiftTargetKeys.indexOf( key ) != -1;
  if ( hasKey ) {
    return;
  }
  this.shiftTargetKeys.push( key );
  this.shiftTargets.push({ x: x, y: y });
};

// -------------------------- drop -------------------------- //

proto.shift = function( item, x, y ) {
  var shiftPosition;
  var minDistance = Infinity;
  var position = { x: x, y: y };
  this.shiftTargets.forEach( function( target ) {
    var distance = getDistance( target, position );
    if ( distance < minDistance ) {
      shiftPosition = target;
      minDistance = distance;
    }
  });
  item.rect.x = shiftPosition.x;
  item.rect.y = shiftPosition.y;
};

function getDistance( a, b ) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return Math.sqrt( dx * dx + dy * dy );
}

// -------------------------- drag move -------------------------- //

var DRAG_THROTTLE_TIME = 120;

/**
 * handle an item drag move event
 * @param {Element} elem
 * @param {Number} x - horizontal change in position
 * @param {Number} y - vertical change in position
 */
proto.itemDragMove = function( elem, x, y ) {
  var item = this.isEnabled && this.getItem( elem );
  if ( !item ) {
    return;
  }

  x -= this.size.paddingLeft;
  y -= this.size.paddingTop;

  var _this = this;
  function onDrag() {
    _this.shift( item, x, y );
    item.positionDropPlaceholder();
    _this.layout();
  }

  // throttle
  var now = new Date();
  if ( this._itemDragTime && now - this._itemDragTime < DRAG_THROTTLE_TIME ) {
    clearTimeout( this.dragTimeout );
    this.dragTimeout = setTimeout( onDrag, DRAG_THROTTLE_TIME );
  } else {
    onDrag();
    this._itemDragTime = now;
  }
};

// -------------------------- drag end -------------------------- //

/**
 * handle an item drag end event
 * @param {Element} elem
 */
proto.itemDragEnd = function( elem ) {
  var item = this.isEnabled && this.getItem( elem );
  if ( !item ) {
    return;
  }

  clearTimeout( this.dragTimeout );
  item.element.classList.add('is-positioning-post-drag');

  var completeCount = 0;
  var _this = this;
  function onDragEndLayoutComplete() {
    completeCount++;
    if ( completeCount != 2 ) {
      return;
    }
    // reset drag item
    item.element.classList.remove('is-positioning-post-drag');
    item.hideDropPlaceholder();
    _this.dispatchEvent( 'dragItemPositioned', null, [ item ] );
  }

  item.once( 'layout', onDragEndLayoutComplete );
  this.once( 'layoutComplete', onDragEndLayoutComplete );
  item.moveTo( item.rect.x, item.rect.y );
  this.layout();
  this.dragItemCount = Math.max( 0, this.dragItemCount - 1 );
  this.sortItemsByPosition();
  item.disablePlacing();
  this.unstamp( item.element );
};

/**
 * binds Draggabilly events
 * @param {Draggabilly} draggie
 */
proto.bindDraggabillyEvents = function( draggie ) {
  this._bindDraggabillyEvents( draggie, 'on' );
};

proto.unbindDraggabillyEvents = function( draggie ) {
  this._bindDraggabillyEvents( draggie, 'off' );
};

proto._bindDraggabillyEvents = function( draggie, method ) {
  var handlers = this.handleDraggabilly;
  draggie[ method ]( 'dragStart', handlers.dragStart );
  draggie[ method ]( 'dragMove', handlers.dragMove );
  draggie[ method ]( 'dragEnd', handlers.dragEnd );
};

/**
 * binds jQuery UI Draggable events
 * @param {jQuery} $elems
 */
proto.bindUIDraggableEvents = function( $elems ) {
  this._bindUIDraggableEvents( $elems, 'on' );
};

proto.unbindUIDraggableEvents = function( $elems ) {
  this._bindUIDraggableEvents( $elems, 'off' );
};

proto._bindUIDraggableEvents = function( $elems, method ) {
  var handlers = this.handleUIDraggable;
  $elems
    [ method ]( 'dragstart', handlers.start )
    [ method ]( 'drag', handlers.drag )
    [ method ]( 'dragstop', handlers.stop );
};

// ----- destroy ----- //

var _destroy = proto.destroy;
proto.destroy = function() {
  _destroy.apply( this, arguments );
  // disable flag; prevent drag events from triggering. #72
  this.isEnabled = false;
};

// -----  ----- //

Packery.Rect = Rect;
Packery.Packer = Packer;

return Packery;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\packery\\js\\packery.js","/node_modules\\packery\\js")

},{"./item":14,"./packer":15,"./rect":17,"_process":19,"buffer":3,"get-size":8,"outlayer":13}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Rect
 * low-level utility class for basic geometry
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Packery = window.Packery || {};
    window.Packery.Rect = factory();
  }

}( window, function factory() {
'use strict';

// -------------------------- Rect -------------------------- //

function Rect( props ) {
  // extend properties from defaults
  for ( var prop in Rect.defaults ) {
    this[ prop ] = Rect.defaults[ prop ];
  }

  for ( prop in props ) {
    this[ prop ] = props[ prop ];
  }

}

Rect.defaults = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

var proto = Rect.prototype;

/**
 * Determines whether or not this rectangle wholly encloses another rectangle or point.
 * @param {Rect} rect
 * @returns {Boolean}
**/
proto.contains = function( rect ) {
  // points don't have width or height
  var otherWidth = rect.width || 0;
  var otherHeight = rect.height || 0;
  return this.x <= rect.x &&
    this.y <= rect.y &&
    this.x + this.width >= rect.x + otherWidth &&
    this.y + this.height >= rect.y + otherHeight;
};

/**
 * Determines whether or not the rectangle intersects with another.
 * @param {Rect} rect
 * @returns {Boolean}
**/
proto.overlaps = function( rect ) {
  var thisRight = this.x + this.width;
  var thisBottom = this.y + this.height;
  var rectRight = rect.x + rect.width;
  var rectBottom = rect.y + rect.height;

  // http://stackoverflow.com/a/306332
  return this.x < rectRight &&
    thisRight > rect.x &&
    this.y < rectBottom &&
    thisBottom > rect.y;
};

/**
 * @param {Rect} rect - the overlapping rect
 * @returns {Array} freeRects - rects representing the area around the rect
**/
proto.getMaximalFreeRects = function( rect ) {

  // if no intersection, return false
  if ( !this.overlaps( rect ) ) {
    return false;
  }

  var freeRects = [];
  var freeRect;

  var thisRight = this.x + this.width;
  var thisBottom = this.y + this.height;
  var rectRight = rect.x + rect.width;
  var rectBottom = rect.y + rect.height;

  // top
  if ( this.y < rect.y ) {
    freeRect = new Rect({
      x: this.x,
      y: this.y,
      width: this.width,
      height: rect.y - this.y
    });
    freeRects.push( freeRect );
  }

  // right
  if ( thisRight > rectRight ) {
    freeRect = new Rect({
      x: rectRight,
      y: this.y,
      width: thisRight - rectRight,
      height: this.height
    });
    freeRects.push( freeRect );
  }

  // bottom
  if ( thisBottom > rectBottom ) {
    freeRect = new Rect({
      x: this.x,
      y: rectBottom,
      width: this.width,
      height: thisBottom - rectBottom
    });
    freeRects.push( freeRect );
  }

  // left
  if ( this.x < rect.x ) {
    freeRect = new Rect({
      x: this.x,
      y: this.y,
      width: rect.x - this.x,
      height: this.height
    });
    freeRects.push( freeRect );
  }

  return freeRects;
};

proto.canFit = function( rect ) {
  return this.width >= rect.width && this.height >= rect.height;
};

return Rect;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\packery\\js\\rect.js","/node_modules\\packery\\js")

},{"_process":19,"buffer":3}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * A handy class to calculate color values.
 *
 * @version 1.0
 * @author Robert Eisele <robert@xarg.org>
 * @copyright Copyright (c) 2010, Robert Eisele
 * @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
 * @license http://www.opensource.org/licenses/bsd-license.php BSD License
 *
 */

// Modified by George Chan <gchan@21cn.com>

module.exports = function(width,height,depth) {


    // helper functions for that ctx
    function write(buffer, offs) {
        for (var i = 2; i < arguments.length; i++) {
            for (var j = 0; j < arguments[i].length; j++) {
                buffer[offs++] = arguments[i].charAt(j);
            }
        }
    }

    function byte2(w) {
        return String.fromCharCode((w >> 8) & 255, w & 255);
    }

    function byte4(w) {
        return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
    }

    function byte2lsb(w) {
        return String.fromCharCode(w & 255, (w >> 8) & 255);
    }

    this.width   = width;
    this.height  = height;
    this.depth   = depth;

    // pixel data and row filter identifier size
    this.pix_size = height * (width + 1);

    // deflate header, pix_size, block headers, adler32 checksum
    this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;

    // offsets and sizes of Png chunks
    this.ihdr_offs = 0;									// IHDR offset and size
    this.ihdr_size = 4 + 4 + 13 + 4;
    this.plte_offs = this.ihdr_offs + this.ihdr_size;	// PLTE offset and size
    this.plte_size = 4 + 4 + 3 * depth + 4;
    this.trns_offs = this.plte_offs + this.plte_size;	// tRNS offset and size
    this.trns_size = 4 + 4 + depth + 4;
    this.idat_offs = this.trns_offs + this.trns_size;	// IDAT offset and size
    this.idat_size = 4 + 4 + this.data_size + 4;
    this.iend_offs = this.idat_offs + this.idat_size;	// IEND offset and size
    this.iend_size = 4 + 4 + 4;
    this.buffer_size  = this.iend_offs + this.iend_size;	// total PNG size

    this.buffer  = new Array();
    this.palette = new Object();
    this.pindex  = 0;

    var _crc32 = new Array();

    // initialize buffer with zero bytes
    for (var i = 0; i < this.buffer_size; i++) {
        this.buffer[i] = "\x00";
    }

    // initialize non-zero elements
    write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), "\x08\x03");
    write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');
    write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');
    write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');
    write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');

    // initialize deflate header
    var header = ((8 + (7 << 4)) << 8) | (3 << 6);
    header+= 31 - (header % 31);

    write(this.buffer, this.idat_offs + 8, byte2(header));

    // initialize deflate block headers
    for (var i = 0; (i << 16) - 1 < this.pix_size; i++) {
        var size, bits;
        if (i + 0xffff < this.pix_size) {
            size = 0xffff;
            bits = "\x00";
        } else {
            size = this.pix_size - (i << 16) - i;
            bits = "\x01";
        }
        write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
    }

    /* Create crc32 lookup table */
    for (var i = 0; i < 256; i++) {
        var c = i;
        for (var j = 0; j < 8; j++) {
            if (c & 1) {
                c = -306674912 ^ ((c >> 1) & 0x7fffffff);
            } else {
                c = (c >> 1) & 0x7fffffff;
            }
        }
        _crc32[i] = c;
    }

    // compute the index into a png for a given pixel
    this.index = function(x,y) {
        var i = y * (this.width + 1) + x + 1;
        var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
        return j;
    }

    // convert a color and build up the palette
    this.color = function(red, green, blue, alpha) {

        alpha = alpha >= 0 ? alpha : 255;
        var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;

        if (typeof this.palette[color] == "undefined") {
            if (this.pindex == this.depth) return "\x00";

            var ndx = this.plte_offs + 8 + 3 * this.pindex;

            this.buffer[ndx + 0] = String.fromCharCode(red);
            this.buffer[ndx + 1] = String.fromCharCode(green);
            this.buffer[ndx + 2] = String.fromCharCode(blue);
            this.buffer[this.trns_offs+8+this.pindex] = String.fromCharCode(alpha);

            this.palette[color] = String.fromCharCode(this.pindex++);
        }
        return this.palette[color];
    }

    // output a PNG string, Base64 encoded
    this.getBase64 = function() {

        var s = this.getDump();

        var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var c1, c2, c3, e1, e2, e3, e4;
        var l = s.length;
        var i = 0;
        var r = "";

        do {
            c1 = s.charCodeAt(i);
            e1 = c1 >> 2;
            c2 = s.charCodeAt(i+1);
            e2 = ((c1 & 3) << 4) | (c2 >> 4);
            c3 = s.charCodeAt(i+2);
            if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
            if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }
            r+= ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
        } while ((i+= 3) < l);
        return r;
    }

    // output a PNG string
    this.getDump = function() {

        // compute adler32 of output pixels + row filter bytes
        var BASE = 65521; /* largest prime smaller than 65536 */
        var NMAX = 5552;  /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
        var s1 = 1;
        var s2 = 0;
        var n = NMAX;

        for (var y = 0; y < this.height; y++) {
            for (var x = -1; x < this.width; x++) {
                s1+= this.buffer[this.index(x, y)].charCodeAt(0);
                s2+= s1;
                if ((n-= 1) == 0) {
                    s1%= BASE;
                    s2%= BASE;
                    n = NMAX;
                }
            }
        }
        s1%= BASE;
        s2%= BASE;
        write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));

        // compute crc32 of the PNG chunks
        function crc32(png, offs, size) {
            var crc = -1;
            for (var i = 4; i < size-4; i += 1) {
                crc = _crc32[(crc ^ png[offs+i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
            }
            write(png, offs+size-4, byte4(crc ^ -1));
        }

        crc32(this.buffer, this.ihdr_offs, this.ihdr_size);
        crc32(this.buffer, this.plte_offs, this.plte_size);
        crc32(this.buffer, this.trns_offs, this.trns_size);
        crc32(this.buffer, this.idat_offs, this.idat_size);
        crc32(this.buffer, this.iend_offs, this.iend_size);

        // convert PNG to string
        return "\211PNG\r\n\032\n"+this.buffer.join('');
    }
};


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\pnglib\\lib\\pnglib.js","/node_modules\\pnglib\\lib")

},{"_process":19,"buffer":3}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\process\\browser.js","/node_modules\\process")

},{"_process":19,"buffer":3}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\svg4everybody\\dist\\svg4everybody.js","/node_modules\\svg4everybody\\dist")

},{"_process":19,"buffer":3}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Unidragger v2.1.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -----  ----- //

function noop() {}

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

var navigator = window.navigator;
/**
 * works as unbinder, as you can .bindHandles( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindHandles = function( isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  // extra bind logic
  var binderExtra;
  if ( navigator.pointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.touchAction = isBind ? 'none' : '';
    };
  } else if ( navigator.msPointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.msTouchAction = isBind ? 'none' : '';
    };
  } else {
    binderExtra = noop;
  }
  // bind each handle
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isBind );
    binderExtra( handle );
    handle[ bindMethod ]( 'click', this );
  }
};

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss range sliders
  if ( event.target.nodeName == 'INPUT' && event.target.type == 'range' ) {
    // reset pointerDown logic
    this.isPointerDown = false;
    delete this.pointerIdentifier;
    return;
  }

  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// base pointer down logic
proto._dragPointerDown = function( event, pointer ) {
  // track to see when dragging starts
  this.pointerDownPoint = Unipointer.getPointerPoint( pointer );

  var canPreventDefault = this.canPreventDefaultOnPointerDown( event, pointer );
  if ( canPreventDefault ) {
    event.preventDefault();
  }
};

// overwriteable method so Flickity can prevent for scrolling
proto.canPreventDefaultOnPointerDown = function( event ) {
  // prevent default, unless touchstart or <select>
  return event.target.nodeName != 'SELECT';
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var movePoint = Unipointer.getPointerPoint( pointer );
  var moveVector = {
    x: movePoint.x - this.pointerDownPoint.x,
    y: movePoint.y - this.pointerDownPoint.y
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};


// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.dragStartPoint = Unipointer.getPointerPoint( pointer );
  // prevent clicks
  this.isPreventingClicks = true;

  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  // allow click in <input>s and <textarea>s
  var nodeName = event.target.nodeName;
  if ( nodeName == 'INPUT' || nodeName == 'TEXTAREA' ) {
    event.target.focus();
  }
  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\unidragger\\unidragger.js","/node_modules\\unidragger")

},{"_process":19,"buffer":3,"unipointer":22}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Unipointer v2.1.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * works as unbinder, as you can ._bindStart( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindStartEvent = function( elem, isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

  if ( window.navigator.pointerEnabled ) {
    // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
    elem[ bindMethod ]( 'pointerdown', this );
  } else if ( window.navigator.msPointerEnabled ) {
    // IE10 Pointer Events
    elem[ bindMethod ]( 'MSPointerDown', this );
  } else {
    // listen for both, for devices like Chrome Pixel
    elem[ bindMethod ]( 'mousedown', this );
    elem[ bindMethod ]( 'touchstart', this );
  }
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onMSPointerDown =
proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss other pointers
  if ( this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
  MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onMSPointerMove =
proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onMSPointerUp =
proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  // remove events
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onMSPointerCancel =
proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\unipointer\\unipointer.js","/node_modules\\unipointer")

},{"_process":19,"buffer":3,"ev-emitter":6}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Vue=e()}(this,function(){"use strict";function t(t){return void 0===t||null===t}function e(t){return void 0!==t&&null!==t}function n(t){return!0===t}function r(t){return"string"==typeof t||"number"==typeof t||"symbol"==typeof t||"boolean"==typeof t}function i(t){return null!==t&&"object"==typeof t}function o(t){return"[object Object]"===Nn.call(t)}function a(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function s(t){return null==t?"":"object"==typeof t?JSON.stringify(t,null,2):String(t)}function c(t){var e=parseFloat(t);return isNaN(e)?t:e}function u(t,e){for(var n=Object.create(null),r=t.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return e?function(t){return n[t.toLowerCase()]}:function(t){return n[t]}}function l(t,e){if(t.length){var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}function f(t,e){return Mn.call(t,e)}function p(t){var e=Object.create(null);return function(n){return e[n]||(e[n]=t(n))}}function d(t,e){function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return n._length=t.length,n}function v(t,e){e=e||0;for(var n=t.length-e,r=new Array(n);n--;)r[n]=t[n+e];return r}function h(t,e){for(var n in e)t[n]=e[n];return t}function m(t){for(var e={},n=0;n<t.length;n++)t[n]&&h(e,t[n]);return e}function y(t,e,n){}function g(t,e){if(t===e)return!0;var n=i(t),r=i(e);if(!n||!r)return!n&&!r&&String(t)===String(e);try{var o=Array.isArray(t),a=Array.isArray(e);if(o&&a)return t.length===e.length&&t.every(function(t,n){return g(t,e[n])});if(o||a)return!1;var s=Object.keys(t),c=Object.keys(e);return s.length===c.length&&s.every(function(n){return g(t[n],e[n])})}catch(t){return!1}}function _(t,e){for(var n=0;n<t.length;n++)if(g(t[n],e))return n;return-1}function b(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function $(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function C(t,e,n,r){Object.defineProperty(t,e,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function w(t){return"function"==typeof t&&/native code/.test(t.toString())}function x(t){return new mr(void 0,void 0,void 0,String(t))}function k(t,e){var n=t.componentOptions,r=new mr(t.tag,t.data,t.children,t.text,t.elm,t.context,n,t.asyncFactory);return r.ns=t.ns,r.isStatic=t.isStatic,r.key=t.key,r.isComment=t.isComment,r.fnContext=t.fnContext,r.fnOptions=t.fnOptions,r.fnScopeId=t.fnScopeId,r.isCloned=!0,e&&(t.children&&(r.children=A(t.children,!0)),n&&n.children&&(n.children=A(n.children,!0))),r}function A(t,e){for(var n=t.length,r=new Array(n),i=0;i<n;i++)r[i]=k(t[i],e);return r}function O(t,e,n){t.__proto__=e}function S(t,e,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];C(t,o,e[o])}}function T(t,e){if(i(t)&&!(t instanceof mr)){var n;return f(t,"__ob__")&&t.__ob__ instanceof wr?n=t.__ob__:Cr.shouldConvert&&!ur()&&(Array.isArray(t)||o(t))&&Object.isExtensible(t)&&!t._isVue&&(n=new wr(t)),e&&n&&n.vmCount++,n}}function E(t,e,n,r,i){var o=new vr,a=Object.getOwnPropertyDescriptor(t,e);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set,u=!i&&T(n);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=s?s.call(t):n;return vr.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(e)&&I(e))),e},set:function(e){var r=s?s.call(t):n;e===r||e!=e&&r!=r||(c?c.call(t,e):n=e,u=!i&&T(e),o.notify())}})}}function j(t,e,n){if(Array.isArray(t)&&a(e))return t.length=Math.max(t.length,e),t.splice(e,1,n),n;if(e in t&&!(e in Object.prototype))return t[e]=n,n;var r=t.__ob__;return t._isVue||r&&r.vmCount?n:r?(E(r.value,e,n),r.dep.notify(),n):(t[e]=n,n)}function N(t,e){if(Array.isArray(t)&&a(e))t.splice(e,1);else{var n=t.__ob__;t._isVue||n&&n.vmCount||f(t,e)&&(delete t[e],n&&n.dep.notify())}}function I(t){for(var e=void 0,n=0,r=t.length;n<r;n++)(e=t[n])&&e.__ob__&&e.__ob__.dep.depend(),Array.isArray(e)&&I(e)}function L(t,e){if(!e)return t;for(var n,r,i,a=Object.keys(e),s=0;s<a.length;s++)r=t[n=a[s]],i=e[n],f(t,n)?o(r)&&o(i)&&L(r,i):j(t,n,i);return t}function M(t,e,n){return n?function(){var r="function"==typeof e?e.call(n,n):e,i="function"==typeof t?t.call(n,n):t;return r?L(r,i):i}:e?t?function(){return L("function"==typeof e?e.call(this,this):e,"function"==typeof t?t.call(this,this):t)}:e:t}function D(t,e){return e?t?t.concat(e):Array.isArray(e)?e:[e]:t}function P(t,e,n,r){var i=Object.create(t||null);return e?h(i,e):i}function F(t,e,n){function r(r){var i=xr[r]||Or;u[r]=i(t[r],e[r],n,r)}"function"==typeof e&&(e=e.options),function(t,e){var n=t.props;if(n){var r,i,a={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(a[Pn(i)]={type:null});else if(o(n))for(var s in n)i=n[s],a[Pn(s)]=o(i)?i:{type:i};t.props=a}}(e),function(t,e){var n=t.inject;if(n){var r=t.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(o(n))for(var a in n){var s=n[a];r[a]=o(s)?h({from:a},s):{from:s}}}}(e),function(t){var e=t.directives;if(e)for(var n in e){var r=e[n];"function"==typeof r&&(e[n]={bind:r,update:r})}}(e);var i=e.extends;if(i&&(t=F(t,i,n)),e.mixins)for(var a=0,s=e.mixins.length;a<s;a++)t=F(t,e.mixins[a],n);var c,u={};for(c in t)r(c);for(c in e)f(t,c)||r(c);return u}function R(t,e,n,r){if("string"==typeof n){var i=t[e];if(f(i,n))return i[n];var o=Pn(n);if(f(i,o))return i[o];var a=Fn(o);if(f(i,a))return i[a];return i[n]||i[o]||i[a]}}function H(t,e,n,r){var i=e[t],o=!f(n,t),a=n[t];if(U(Boolean,i.type)&&(o&&!f(i,"default")?a=!1:U(String,i.type)||""!==a&&a!==Hn(t)||(a=!0)),void 0===a){a=function(t,e,n){if(!f(e,"default"))return;var r=e.default;if(t&&t.$options.propsData&&void 0===t.$options.propsData[n]&&void 0!==t._props[n])return t._props[n];return"function"==typeof r&&"Function"!==B(e.type)?r.call(t):r}(r,i,t);var s=Cr.shouldConvert;Cr.shouldConvert=!0,T(a),Cr.shouldConvert=s}return a}function B(t){var e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:""}function U(t,e){if(!Array.isArray(e))return B(e)===B(t);for(var n=0,r=e.length;n<r;n++)if(B(e[n])===B(t))return!0;return!1}function V(t,e,n){if(e)for(var r=e;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,t,e,n))return}catch(t){z(t,r,"errorCaptured hook")}}z(t,e,n)}function z(t,e,n){if(Jn.errorHandler)try{return Jn.errorHandler.call(null,t,e,n)}catch(t){K(t,null,"config.errorHandler")}K(t,e,n)}function K(t,e,n){if(!Gn&&!Zn||"undefined"==typeof console)throw t;console.error(t)}function J(){Tr=!1;var t=Sr.slice(0);Sr.length=0;for(var e=0;e<t.length;e++)t[e]()}function q(t,e){var n;if(Sr.push(function(){if(t)try{t.call(e)}catch(t){V(t,e,"nextTick")}else n&&n(e)}),Tr||(Tr=!0,Er?Ar():kr()),!t&&"undefined"!=typeof Promise)return new Promise(function(t){n=t})}function W(t){G(t,Mr),Mr.clear()}function G(t,e){var n,r,o=Array.isArray(t);if((o||i(t))&&!Object.isFrozen(t)){if(t.__ob__){var a=t.__ob__.dep.id;if(e.has(a))return;e.add(a)}if(o)for(n=t.length;n--;)G(t[n],e);else for(n=(r=Object.keys(t)).length;n--;)G(t[r[n]],e)}}function Z(t){function e(){var t=arguments,n=e.fns;if(!Array.isArray(n))return n.apply(null,arguments);for(var r=n.slice(),i=0;i<r.length;i++)r[i].apply(null,t)}return e.fns=t,e}function X(e,n,r,i,o){var a,s,c,u;for(a in e)s=e[a],c=n[a],u=Dr(a),t(s)||(t(c)?(t(s.fns)&&(s=e[a]=Z(s)),r(u.name,s,u.once,u.capture,u.passive,u.params)):s!==c&&(c.fns=s,e[a]=c));for(a in n)t(e[a])&&i((u=Dr(a)).name,n[a],u.capture)}function Y(r,i,o){function a(){o.apply(this,arguments),l(s.fns,a)}r instanceof mr&&(r=r.data.hook||(r.data.hook={}));var s,c=r[i];t(c)?s=Z([a]):e(c.fns)&&n(c.merged)?(s=c).fns.push(a):s=Z([c,a]),s.merged=!0,r[i]=s}function Q(t,n,r,i,o){if(e(n)){if(f(n,r))return t[r]=n[r],o||delete n[r],!0;if(f(n,i))return t[r]=n[i],o||delete n[i],!0}return!1}function tt(t){return e(t)&&e(t.text)&&function(t){return!1===t}(t.isComment)}function et(i,o){var a,s,c,u,l=[];for(a=0;a<i.length;a++)t(s=i[a])||"boolean"==typeof s||(u=l[c=l.length-1],Array.isArray(s)?s.length>0&&(tt((s=et(s,(o||"")+"_"+a))[0])&&tt(u)&&(l[c]=x(u.text+s[0].text),s.shift()),l.push.apply(l,s)):r(s)?tt(u)?l[c]=x(u.text+s):""!==s&&l.push(x(s)):tt(s)&&tt(u)?l[c]=x(u.text+s.text):(n(i._isVList)&&e(s.tag)&&t(s.key)&&e(o)&&(s.key="__vlist"+o+"_"+a+"__"),l.push(s)));return l}function nt(t,e){return(t.__esModule||fr&&"Module"===t[Symbol.toStringTag])&&(t=t.default),i(t)?e.extend(t):t}function rt(t){return t.isComment&&t.asyncFactory}function it(t){if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];if(e(r)&&(e(r.componentOptions)||rt(r)))return r}}function ot(t,e,n){n?Lr.$once(t,e):Lr.$on(t,e)}function at(t,e){Lr.$off(t,e)}function st(t,e,n){Lr=t,X(e,n||{},ot,at),Lr=void 0}function ct(t,e){var n={};if(!t)return n;for(var r=0,i=t.length;r<i;r++){var o=t[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==e&&o.fnContext!==e||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children||[]):c.push(o)}}for(var u in n)n[u].every(ut)&&delete n[u];return n}function ut(t){return t.isComment&&!t.asyncFactory||" "===t.text}function lt(t,e){e=e||{};for(var n=0;n<t.length;n++)Array.isArray(t[n])?lt(t[n],e):e[t[n].key]=t[n].fn;return e}function ft(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function pt(t,e){if(e){if(t._directInactive=!1,ft(t))return}else if(t._directInactive)return;if(t._inactive||null===t._inactive){t._inactive=!1;for(var n=0;n<t.$children.length;n++)pt(t.$children[n]);vt(t,"activated")}}function dt(t,e){if(!(e&&(t._directInactive=!0,ft(t))||t._inactive)){t._inactive=!0;for(var n=0;n<t.$children.length;n++)dt(t.$children[n]);vt(t,"deactivated")}}function vt(t,e){var n=t.$options[e];if(n)for(var r=0,i=n.length;r<i;r++)try{n[r].call(t)}catch(n){V(n,t,e+" hook")}t._hasHookEvent&&t.$emit("hook:"+e)}function ht(){Ur=!0;var t,e;for(Fr.sort(function(t,e){return t.id-e.id}),Vr=0;Vr<Fr.length;Vr++)e=(t=Fr[Vr]).id,Hr[e]=null,t.run();var n=Rr.slice(),r=Fr.slice();Vr=Fr.length=Rr.length=0,Hr={},Br=Ur=!1,function(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,pt(t[e],!0)}(n),function(t){var e=t.length;for(;e--;){var n=t[e],r=n.vm;r._watcher===n&&r._isMounted&&vt(r,"updated")}}(r),lr&&Jn.devtools&&lr.emit("flush")}function mt(t,e,n){Jr.get=function(){return this[e][n]},Jr.set=function(t){this[e][n]=t},Object.defineProperty(t,n,Jr)}function yt(t){t._watchers=[];var e=t.$options;e.props&&function(t,e){var n=t.$options.propsData||{},r=t._props={},i=t.$options._propKeys=[],o=!t.$parent;Cr.shouldConvert=o;var a=function(o){i.push(o);var a=H(o,e,n,t);E(r,o,a),o in t||mt(t,"_props",o)};for(var s in e)a(s);Cr.shouldConvert=!0}(t,e.props),e.methods&&function(t,e){t.$options.props;for(var n in e)t[n]=null==e[n]?y:d(e[n],t)}(t,e.methods),e.data?function(t){var e=t.$options.data;e=t._data="function"==typeof e?function(t,e){try{return t.call(e,e)}catch(t){return V(t,e,"data()"),{}}}(e,t):e||{},o(e)||(e={});var n=Object.keys(e),r=t.$options.props,i=(t.$options.methods,n.length);for(;i--;){var a=n[i];r&&f(r,a)||$(a)||mt(t,"_data",a)}T(e,!0)}(t):T(t._data={},!0),e.computed&&function(t,e){var n=t._computedWatchers=Object.create(null),r=ur();for(var i in e){var o=e[i],a="function"==typeof o?o:o.get;r||(n[i]=new Kr(t,a||y,y,qr)),i in t||gt(t,i,o)}}(t,e.computed),e.watch&&e.watch!==ir&&function(t,e){for(var n in e){var r=e[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)bt(t,n,r[i]);else bt(t,n,r)}}(t,e.watch)}function gt(t,e,n){var r=!ur();"function"==typeof n?(Jr.get=r?_t(e):n,Jr.set=y):(Jr.get=n.get?r&&!1!==n.cache?_t(e):n.get:y,Jr.set=n.set?n.set:y),Object.defineProperty(t,e,Jr)}function _t(t){return function(){var e=this._computedWatchers&&this._computedWatchers[t];if(e)return e.dirty&&e.evaluate(),vr.target&&e.depend(),e.value}}function bt(t,e,n,r){return o(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=t[n]),t.$watch(e,n,r)}function $t(t,e){if(t){for(var n=Object.create(null),r=fr?Reflect.ownKeys(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}):Object.keys(t),i=0;i<r.length;i++){for(var o=r[i],a=t[o].from,s=e;s;){if(s._provided&&a in s._provided){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in t[o]){var c=t[o].default;n[o]="function"==typeof c?c.call(e):c}}return n}}function Ct(t,n){var r,o,a,s,c;if(Array.isArray(t)||"string"==typeof t)for(r=new Array(t.length),o=0,a=t.length;o<a;o++)r[o]=n(t[o],o);else if("number"==typeof t)for(r=new Array(t),o=0;o<t;o++)r[o]=n(o+1,o);else if(i(t))for(s=Object.keys(t),r=new Array(s.length),o=0,a=s.length;o<a;o++)c=s[o],r[o]=n(t[c],c,o);return e(r)&&(r._isVList=!0),r}function wt(t,e,n,r){var i,o=this.$scopedSlots[t];if(o)n=n||{},r&&(n=h(h({},r),n)),i=o(n)||e;else{var a=this.$slots[t];a&&(a._rendered=!0),i=a||e}var s=n&&n.slot;return s?this.$createElement("template",{slot:s},i):i}function xt(t){return R(this.$options,"filters",t)||Un}function kt(t,e,n,r){var i=Jn.keyCodes[e]||n;return i?Array.isArray(i)?-1===i.indexOf(t):i!==t:r?Hn(r)!==e:void 0}function At(t,e,n,r,o){if(n)if(i(n)){Array.isArray(n)&&(n=m(n));var a,s=function(i){if("class"===i||"style"===i||Ln(i))a=t;else{var s=t.attrs&&t.attrs.type;a=r||Jn.mustUseProp(e,s,i)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}if(!(i in a)&&(a[i]=n[i],o)){(t.on||(t.on={}))["update:"+i]=function(t){n[i]=t}}};for(var c in n)s(c)}else;return t}function Ot(t,e){var n=this._staticTrees||(this._staticTrees=[]),r=n[t];return r&&!e?Array.isArray(r)?A(r):k(r):(r=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,null,this),Tt(r,"__static__"+t,!1),r)}function St(t,e,n){return Tt(t,"__once__"+e+(n?"_"+n:""),!0),t}function Tt(t,e,n){if(Array.isArray(t))for(var r=0;r<t.length;r++)t[r]&&"string"!=typeof t[r]&&Et(t[r],e+"_"+r,n);else Et(t,e,n)}function Et(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function jt(t,e){if(e)if(o(e)){var n=t.on=t.on?h({},t.on):{};for(var r in e){var i=n[r],a=e[r];n[r]=i?[].concat(i,a):a}}else;return t}function Nt(t){t._o=St,t._n=c,t._s=s,t._l=Ct,t._t=wt,t._q=g,t._i=_,t._m=Ot,t._f=xt,t._k=kt,t._b=At,t._v=x,t._e=gr,t._u=lt,t._g=jt}function It(t,e,r,i,o){var a=o.options;this.data=t,this.props=e,this.children=r,this.parent=i,this.listeners=t.on||jn,this.injections=$t(a.inject,i),this.slots=function(){return ct(r,i)};var s=Object.create(i),c=n(a._compiled),u=!c;c&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=t.scopedSlots||jn),a._scopeId?this._c=function(t,e,n,r){var o=Dt(s,t,e,n,r,u);return o&&(o.fnScopeId=a._scopeId,o.fnContext=i),o}:this._c=function(t,e,n,r){return Dt(s,t,e,n,r,u)}}function Lt(t,e){for(var n in e)t[Pn(n)]=e[n]}function Mt(r,o,a,s,c){if(!t(r)){var u=a.$options._base;if(i(r)&&(r=u.extend(r)),"function"==typeof r){var l;if(t(r.cid)&&(l=r,void 0===(r=function(r,o,a){if(n(r.error)&&e(r.errorComp))return r.errorComp;if(e(r.resolved))return r.resolved;if(n(r.loading)&&e(r.loadingComp))return r.loadingComp;if(!e(r.contexts)){var s=r.contexts=[a],c=!0,u=function(){for(var t=0,e=s.length;t<e;t++)s[t].$forceUpdate()},l=b(function(t){r.resolved=nt(t,o),c||u()}),f=b(function(t){e(r.errorComp)&&(r.error=!0,u())}),p=r(l,f);return i(p)&&("function"==typeof p.then?t(r.resolved)&&p.then(l,f):e(p.component)&&"function"==typeof p.component.then&&(p.component.then(l,f),e(p.error)&&(r.errorComp=nt(p.error,o)),e(p.loading)&&(r.loadingComp=nt(p.loading,o),0===p.delay?r.loading=!0:setTimeout(function(){t(r.resolved)&&t(r.error)&&(r.loading=!0,u())},p.delay||200)),e(p.timeout)&&setTimeout(function(){t(r.resolved)&&f(null)},p.timeout))),c=!1,r.loading?r.loadingComp:r.resolved}r.contexts.push(a)}(l,u,a))))return function(t,e,n,r,i){var o=gr();return o.asyncFactory=t,o.asyncMeta={data:e,context:n,children:r,tag:i},o}(l,o,a,s,c);o=o||{},Ft(r),e(o.model)&&function(t,n){var r=t.model&&t.model.prop||"value",i=t.model&&t.model.event||"input";(n.props||(n.props={}))[r]=n.model.value;var o=n.on||(n.on={});e(o[i])?o[i]=[n.model.callback].concat(o[i]):o[i]=n.model.callback}(r.options,o);var f=function(n,r,i){var o=r.options.props;if(!t(o)){var a={},s=n.attrs,c=n.props;if(e(s)||e(c))for(var u in o){var l=Hn(u);Q(a,c,u,l,!0)||Q(a,s,u,l,!1)}return a}}(o,r);if(n(r.options.functional))return function(t,n,r,i,o){var a=t.options,s={},c=a.props;if(e(c))for(var u in c)s[u]=H(u,c,n||jn);else e(r.attrs)&&Lt(s,r.attrs),e(r.props)&&Lt(s,r.props);var l=new It(r,s,o,i,t),f=a.render.call(null,l._c,l);return f instanceof mr&&(f.fnContext=i,f.fnOptions=a,r.slot&&((f.data||(f.data={})).slot=r.slot)),f}(r,f,o,a,s);var p=o.on;if(o.on=o.nativeOn,n(r.options.abstract)){var d=o.slot;o={},d&&(o.slot=d)}!function(t){t.hook||(t.hook={});for(var e=0;e<Gr.length;e++){var n=Gr[e],r=t.hook[n],i=Wr[n];t.hook[n]=r?function(t,e){return function(n,r,i,o){t(n,r,i,o),e(n,r,i,o)}}(i,r):i}}(o);var v=r.options.name||c;return new mr("vue-component-"+r.cid+(v?"-"+v:""),o,void 0,void 0,void 0,a,{Ctor:r,propsData:f,listeners:p,tag:c,children:s},l)}}}function Dt(t,i,o,a,s,c){return(Array.isArray(o)||r(o))&&(s=a,a=o,o=void 0),n(c)&&(s=Xr),function(t,n,i,o,a){if(e(i)&&e(i.__ob__))return gr();e(i)&&e(i.is)&&(n=i.is);if(!n)return gr();Array.isArray(o)&&"function"==typeof o[0]&&((i=i||{}).scopedSlots={default:o[0]},o.length=0);a===Xr?o=function(t){return r(t)?[x(t)]:Array.isArray(t)?et(t):void 0}(o):a===Zr&&(o=function(t){for(var e=0;e<t.length;e++)if(Array.isArray(t[e]))return Array.prototype.concat.apply([],t);return t}(o));var s,c;if("string"==typeof n){var u;c=t.$vnode&&t.$vnode.ns||Jn.getTagNamespace(n),s=Jn.isReservedTag(n)?new mr(Jn.parsePlatformTagName(n),i,o,void 0,void 0,t):e(u=R(t.$options,"components",n))?Mt(u,i,t,o,n):new mr(n,i,o,void 0,void 0,t)}else s=Mt(n,i,t,o);return e(s)?(c&&Pt(s,c),s):gr()}(t,i,o,a,s)}function Pt(r,i,o){if(r.ns=i,"foreignObject"===r.tag&&(i=void 0,o=!0),e(r.children))for(var a=0,s=r.children.length;a<s;a++){var c=r.children[a];e(c.tag)&&(t(c.ns)||n(o))&&Pt(c,i,o)}}function Ft(t){var e=t.options;if(t.super){var n=Ft(t.super);if(n!==t.superOptions){t.superOptions=n;var r=function(t){var e,n=t.options,r=t.extendOptions,i=t.sealedOptions;for(var o in n)n[o]!==i[o]&&(e||(e={}),e[o]=function(t,e,n){{if(Array.isArray(t)){var r=[];n=Array.isArray(n)?n:[n],e=Array.isArray(e)?e:[e];for(var i=0;i<t.length;i++)(e.indexOf(t[i])>=0||n.indexOf(t[i])<0)&&r.push(t[i]);return r}return t}}(n[o],r[o],i[o]));return e}(t);r&&h(t.extendOptions,r),(e=t.options=F(n,t.extendOptions)).name&&(e.components[e.name]=t)}}return e}function Rt(t){this._init(t)}function Ht(t){t.cid=0;var e=1;t.extend=function(t){t=t||{};var n=this,r=n.cid,i=t._Ctor||(t._Ctor={});if(i[r])return i[r];var o=t.name||n.options.name,a=function(t){this._init(t)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=e++,a.options=F(n.options,t),a.super=n,a.options.props&&function(t){var e=t.options.props;for(var n in e)mt(t.prototype,"_props",n)}(a),a.options.computed&&function(t){var e=t.options.computed;for(var n in e)gt(t.prototype,n,e[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,zn.forEach(function(t){a[t]=n[t]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=t,a.sealedOptions=h({},a.options),i[r]=a,a}}function Bt(t){return t&&(t.Ctor.options.name||t.tag)}function Ut(t,e){return Array.isArray(t)?t.indexOf(e)>-1:"string"==typeof t?t.split(",").indexOf(e)>-1:!!function(t){return"[object RegExp]"===Nn.call(t)}(t)&&t.test(e)}function Vt(t,e){var n=t.cache,r=t.keys,i=t._vnode;for(var o in n){var a=n[o];if(a){var s=Bt(a.componentOptions);s&&!e(s)&&zt(n,o,r,i)}}}function zt(t,e,n,r){var i=t[e];!i||r&&i.tag===r.tag||i.componentInstance.$destroy(),t[e]=null,l(n,e)}function Kt(t){for(var n=t.data,r=t,i=t;e(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(n=Jt(i.data,n));for(;e(r=r.parent);)r&&r.data&&(n=Jt(n,r.data));return function(t,n){if(e(t)||e(n))return qt(t,Wt(n));return""}(n.staticClass,n.class)}function Jt(t,n){return{staticClass:qt(t.staticClass,n.staticClass),class:e(t.class)?[t.class,n.class]:n.class}}function qt(t,e){return t?e?t+" "+e:t:e||""}function Wt(t){return Array.isArray(t)?function(t){for(var n,r="",i=0,o=t.length;i<o;i++)e(n=Wt(t[i]))&&""!==n&&(r&&(r+=" "),r+=n);return r}(t):i(t)?function(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}(t):"string"==typeof t?t:""}function Gt(t){return bi(t)?"svg":"math"===t?"math":void 0}function Zt(t){if("string"==typeof t){var e=document.querySelector(t);return e||document.createElement("div")}return t}function Xt(t,e){var n=t.data.ref;if(n){var r=t.context,i=t.componentInstance||t.elm,o=r.$refs;e?Array.isArray(o[n])?l(o[n],i):o[n]===i&&(o[n]=void 0):t.data.refInFor?Array.isArray(o[n])?o[n].indexOf(i)<0&&o[n].push(i):o[n]=[i]:o[n]=i}}function Yt(r,i){return r.key===i.key&&(r.tag===i.tag&&r.isComment===i.isComment&&e(r.data)===e(i.data)&&function(t,n){if("input"!==t.tag)return!0;var r,i=e(r=t.data)&&e(r=r.attrs)&&r.type,o=e(r=n.data)&&e(r=r.attrs)&&r.type;return i===o||wi(i)&&wi(o)}(r,i)||n(r.isAsyncPlaceholder)&&r.asyncFactory===i.asyncFactory&&t(i.asyncFactory.error))}function Qt(t,n,r){var i,o,a={};for(i=n;i<=r;++i)e(o=t[i].key)&&(a[o]=i);return a}function te(t,e){(t.data.directives||e.data.directives)&&function(t,e){var n,r,i,o=t===Ai,a=e===Ai,s=ee(t.data.directives,t.context),c=ee(e.data.directives,e.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,ne(i,"update",e,t),i.def&&i.def.componentUpdated&&l.push(i)):(ne(i,"bind",e,t),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)ne(u[n],"inserted",e,t)};o?Y(e,"insert",f):f()}l.length&&Y(e,"postpatch",function(){for(var n=0;n<l.length;n++)ne(l[n],"componentUpdated",e,t)});if(!o)for(n in s)c[n]||ne(s[n],"unbind",t,t,a)}(t,e)}function ee(t,e){var n=Object.create(null);if(!t)return n;var r,i;for(r=0;r<t.length;r++)(i=t[r]).modifiers||(i.modifiers=Ti),n[function(t){return t.rawName||t.name+"."+Object.keys(t.modifiers||{}).join(".")}(i)]=i,i.def=R(e.$options,"directives",i.name);return n}function ne(t,e,n,r,i){var o=t.def&&t.def[e];if(o)try{o(n.elm,t,n,r,i)}catch(r){V(r,n.context,"directive "+t.name+" "+e+" hook")}}function re(n,r){var i=r.componentOptions;if(!(e(i)&&!1===i.Ctor.options.inheritAttrs||t(n.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=n.data.attrs||{},u=r.data.attrs||{};e(u.__ob__)&&(u=r.data.attrs=h({},u));for(o in u)a=u[o],c[o]!==a&&ie(s,o,a);(Qn||er)&&u.value!==c.value&&ie(s,"value",u.value);for(o in c)t(u[o])&&(hi(o)?s.removeAttributeNS(vi,mi(o)):pi(o)||s.removeAttribute(o))}}function ie(t,e,n){if(di(e))yi(n)?t.removeAttribute(e):(n="allowfullscreen"===e&&"EMBED"===t.tagName?"true":e,t.setAttribute(e,n));else if(pi(e))t.setAttribute(e,yi(n)||"false"===n?"false":"true");else if(hi(e))yi(n)?t.removeAttributeNS(vi,mi(e)):t.setAttributeNS(vi,e,n);else if(yi(n))t.removeAttribute(e);else{if(Qn&&!tr&&"TEXTAREA"===t.tagName&&"placeholder"===e&&!t.__ieph){var r=function(e){e.stopImmediatePropagation(),t.removeEventListener("input",r)};t.addEventListener("input",r),t.__ieph=!0}t.setAttribute(e,n)}}function oe(n,r){var i=r.elm,o=r.data,a=n.data;if(!(t(o.staticClass)&&t(o.class)&&(t(a)||t(a.staticClass)&&t(a.class)))){var s=Kt(r),c=i._transitionClasses;e(c)&&(s=qt(s,Wt(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}function ae(t){function e(){(a||(a=[])).push(t.slice(v,i).trim()),v=i+1}var n,r,i,o,a,s=!1,c=!1,u=!1,l=!1,f=0,p=0,d=0,v=0;for(i=0;i<t.length;i++)if(r=n,n=t.charCodeAt(i),s)39===n&&92!==r&&(s=!1);else if(c)34===n&&92!==r&&(c=!1);else if(u)96===n&&92!==r&&(u=!1);else if(l)47===n&&92!==r&&(l=!1);else if(124!==n||124===t.charCodeAt(i+1)||124===t.charCodeAt(i-1)||f||p||d){switch(n){case 34:c=!0;break;case 39:s=!0;break;case 96:u=!0;break;case 40:d++;break;case 41:d--;break;case 91:p++;break;case 93:p--;break;case 123:f++;break;case 125:f--}if(47===n){for(var h=i-1,m=void 0;h>=0&&" "===(m=t.charAt(h));h--);m&&Ii.test(m)||(l=!0)}}else void 0===o?(v=i+1,o=t.slice(0,i).trim()):e();if(void 0===o?o=t.slice(0,i).trim():0!==v&&e(),a)for(i=0;i<a.length;i++)o=function(t,e){var n=e.indexOf("(");{if(n<0)return'_f("'+e+'")('+t+")";var r=e.slice(0,n),i=e.slice(n+1);return'_f("'+r+'")('+t+","+i}}(o,a[i]);return o}function se(t){console.error("[Vue compiler]: "+t)}function ce(t,e){return t?t.map(function(t){return t[e]}).filter(function(t){return t}):[]}function ue(t,e,n){(t.props||(t.props=[])).push({name:e,value:n}),t.plain=!1}function le(t,e,n){(t.attrs||(t.attrs=[])).push({name:e,value:n}),t.plain=!1}function fe(t,e,n){t.attrsMap[e]=n,t.attrsList.push({name:e,value:n})}function pe(t,e,n,r,i,o){(t.directives||(t.directives=[])).push({name:e,rawName:n,value:r,arg:i,modifiers:o}),t.plain=!1}function de(t,e,n,r,i,o){(r=r||jn).capture&&(delete r.capture,e="!"+e),r.once&&(delete r.once,e="~"+e),r.passive&&(delete r.passive,e="&"+e),"click"===e&&(r.right?(e="contextmenu",delete r.right):r.middle&&(e="mouseup"));var a;r.native?(delete r.native,a=t.nativeEvents||(t.nativeEvents={})):a=t.events||(t.events={});var s={value:n};r!==jn&&(s.modifiers=r);var c=a[e];Array.isArray(c)?i?c.unshift(s):c.push(s):a[e]=c?i?[s,c]:[c,s]:s,t.plain=!1}function ve(t,e,n){var r=he(t,":"+e)||he(t,"v-bind:"+e);if(null!=r)return ae(r);if(!1!==n){var i=he(t,e);if(null!=i)return JSON.stringify(i)}}function he(t,e,n){var r;if(null!=(r=t.attrsMap[e]))for(var i=t.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===e){i.splice(o,1);break}return n&&delete t.attrsMap[e],r}function me(t,e,n){var r=n||{},i="$$v";r.trim&&(i="(typeof $$v === 'string'? $$v.trim(): $$v)"),r.number&&(i="_n("+i+")");var o=ye(e,i);t.model={value:"("+e+")",expression:'"'+e+'"',callback:"function ($$v) {"+o+"}"}}function ye(t,e){var n=function(t){if(ei=t.length,t.indexOf("[")<0||t.lastIndexOf("]")<ei-1)return(ii=t.lastIndexOf("."))>-1?{exp:t.slice(0,ii),key:'"'+t.slice(ii+1)+'"'}:{exp:t,key:null};ni=t,ii=oi=ai=0;for(;!_e();)be(ri=ge())?$e(ri):91===ri&&function(t){var e=1;oi=ii;for(;!_e();)if(t=ge(),be(t))$e(t);else if(91===t&&e++,93===t&&e--,0===e){ai=ii;break}}(ri);return{exp:t.slice(0,oi),key:t.slice(oi+1,ai)}}(t);return null===n.key?t+"="+e:"$set("+n.exp+", "+n.key+", "+e+")"}function ge(){return ni.charCodeAt(++ii)}function _e(){return ii>=ei}function be(t){return 34===t||39===t}function $e(t){for(var e=t;!_e()&&(t=ge())!==e;);}function Ce(t,e,n,r,i){e=function(t){return t._withTask||(t._withTask=function(){Er=!0;var e=t.apply(null,arguments);return Er=!1,e})}(e),n&&(e=function(t,e,n){var r=si;return function i(){null!==t.apply(null,arguments)&&we(e,i,n,r)}}(e,t,r)),si.addEventListener(t,e,or?{capture:r,passive:i}:r)}function we(t,e,n,r){(r||si).removeEventListener(t,e._withTask||e,n)}function xe(n,r){if(!t(n.data.on)||!t(r.data.on)){var i=r.data.on||{},o=n.data.on||{};si=r.elm,function(t){if(e(t[Li])){var n=Qn?"change":"input";t[n]=[].concat(t[Li],t[n]||[]),delete t[Li]}e(t[Mi])&&(t.change=[].concat(t[Mi],t.change||[]),delete t[Mi])}(i),X(i,o,Ce,we,r.context),si=void 0}}function ke(n,r){if(!t(n.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=n.data.domProps||{},u=r.data.domProps||{};e(u.__ob__)&&(u=r.data.domProps=h({},u));for(i in s)t(u[i])&&(a[i]="");for(i in u){if(o=u[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i){a._value=o;var l=t(o)?"":String(o);(function(t,n){return!t.composing&&("OPTION"===t.tagName||function(t,e){var n=!0;try{n=document.activeElement!==t}catch(t){}return n&&t.value!==e}(t,n)||function(t,n){var r=t.value,i=t._vModifiers;if(e(i)){if(i.lazy)return!1;if(i.number)return c(r)!==c(n);if(i.trim)return r.trim()!==n.trim()}return r!==n}(t,n))})(a,l)&&(a.value=l)}else a[i]=o}}}function Ae(t){var e=Oe(t.style);return t.staticStyle?h(t.staticStyle,e):e}function Oe(t){return Array.isArray(t)?m(t):"string"==typeof t?Fi(t):t}function Se(n,r){var i=r.data,o=n.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=Oe(r.data.style)||{};r.data.normalizedStyle=e(p.__ob__)?h({},p):p;var d=function(t,e){var n,r={};if(e)for(var i=t;i.componentInstance;)(i=i.componentInstance._vnode)&&i.data&&(n=Ae(i.data))&&h(r,n);(n=Ae(t.data))&&h(r,n);for(var o=t;o=o.parent;)o.data&&(n=Ae(o.data))&&h(r,n);return r}(r,!0);for(s in f)t(d[s])&&Bi(c,s,"");for(s in d)(a=d[s])!==f[s]&&Bi(c,s,null==a?"":a)}}function Te(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(/\s+/).forEach(function(e){return t.classList.add(e)}):t.classList.add(e);else{var n=" "+(t.getAttribute("class")||"")+" ";n.indexOf(" "+e+" ")<0&&t.setAttribute("class",(n+e).trim())}}function Ee(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(/\s+/).forEach(function(e){return t.classList.remove(e)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var n=" "+(t.getAttribute("class")||"")+" ",r=" "+e+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?t.setAttribute("class",n):t.removeAttribute("class")}}function je(t){if(t){if("object"==typeof t){var e={};return!1!==t.css&&h(e,Ki(t.name||"v")),h(e,t),e}return"string"==typeof t?Ki(t):void 0}}function Ne(t){Qi(function(){Qi(t)})}function Ie(t,e){var n=t._transitionClasses||(t._transitionClasses=[]);n.indexOf(e)<0&&(n.push(e),Te(t,e))}function Le(t,e){t._transitionClasses&&l(t._transitionClasses,e),Ee(t,e)}function Me(t,e,n){var r=De(t,e),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===qi?Zi:Yi,c=0,u=function(){t.removeEventListener(s,l),n()},l=function(e){e.target===t&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),t.addEventListener(s,l)}function De(t,e){var n,r=window.getComputedStyle(t),i=r[Gi+"Delay"].split(", "),o=r[Gi+"Duration"].split(", "),a=Pe(i,o),s=r[Xi+"Delay"].split(", "),c=r[Xi+"Duration"].split(", "),u=Pe(s,c),l=0,f=0;e===qi?a>0&&(n=qi,l=a,f=o.length):e===Wi?u>0&&(n=Wi,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?qi:Wi:null)?n===qi?o.length:c.length:0;return{type:n,timeout:l,propCount:f,hasTransform:n===qi&&to.test(r[Gi+"Property"])}}function Pe(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(e,n){return Fe(e)+Fe(t[n])}))}function Fe(t){return 1e3*Number(t.slice(0,-1))}function Re(n,r){var o=n.elm;e(o._leaveCb)&&(o._leaveCb.cancelled=!0,o._leaveCb());var a=je(n.data.transition);if(!t(a)&&!e(o._enterCb)&&1===o.nodeType){for(var s=a.css,u=a.type,l=a.enterClass,f=a.enterToClass,p=a.enterActiveClass,d=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,$=a.beforeAppear,C=a.appear,w=a.afterAppear,x=a.appearCancelled,k=a.duration,A=Pr,O=Pr.$vnode;O&&O.parent;)A=(O=O.parent).context;var S=!A._isMounted||!n.isRootInsert;if(!S||C||""===C){var T=S&&d?d:l,E=S&&h?h:p,j=S&&v?v:f,N=S?$||m:m,I=S&&"function"==typeof C?C:y,L=S?w||g:g,M=S?x||_:_,D=c(i(k)?k.enter:k),P=!1!==s&&!tr,F=Ue(I),R=o._enterCb=b(function(){P&&(Le(o,j),Le(o,E)),R.cancelled?(P&&Le(o,T),M&&M(o)):L&&L(o),o._enterCb=null});n.data.show||Y(n,"insert",function(){var t=o.parentNode,e=t&&t._pending&&t._pending[n.key];e&&e.tag===n.tag&&e.elm._leaveCb&&e.elm._leaveCb(),I&&I(o,R)}),N&&N(o),P&&(Ie(o,T),Ie(o,E),Ne(function(){Ie(o,j),Le(o,T),R.cancelled||F||(Be(D)?setTimeout(R,D):Me(o,u,R))})),n.data.show&&(r&&r(),I&&I(o,R)),P||F||R()}}}function He(n,r){function o(){x.cancelled||(n.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[n.key]=n),v&&v(a),$&&(Ie(a,f),Ie(a,d),Ne(function(){Ie(a,p),Le(a,f),x.cancelled||C||(Be(w)?setTimeout(x,w):Me(a,l,x))})),h&&h(a,x),$||C||x())}var a=n.elm;e(a._enterCb)&&(a._enterCb.cancelled=!0,a._enterCb());var s=je(n.data.transition);if(t(s)||1!==a.nodeType)return r();if(!e(a._leaveCb)){var u=s.css,l=s.type,f=s.leaveClass,p=s.leaveToClass,d=s.leaveActiveClass,v=s.beforeLeave,h=s.leave,m=s.afterLeave,y=s.leaveCancelled,g=s.delayLeave,_=s.duration,$=!1!==u&&!tr,C=Ue(h),w=c(i(_)?_.leave:_),x=a._leaveCb=b(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[n.key]=null),$&&(Le(a,p),Le(a,d)),x.cancelled?($&&Le(a,f),y&&y(a)):(r(),m&&m(a)),a._leaveCb=null});g?g(o):o()}}function Be(t){return"number"==typeof t&&!isNaN(t)}function Ue(n){if(t(n))return!1;var r=n.fns;return e(r)?Ue(Array.isArray(r)?r[0]:r):(n._length||n.length)>1}function Ve(t,e){!0!==e.data.show&&Re(e)}function ze(t,e,n){Ke(t,e,n),(Qn||er)&&setTimeout(function(){Ke(t,e,n)},0)}function Ke(t,e,n){var r=e.value,i=t.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=t.options.length;s<c;s++)if(a=t.options[s],i)o=_(r,qe(a))>-1,a.selected!==o&&(a.selected=o);else if(g(qe(a),r))return void(t.selectedIndex!==s&&(t.selectedIndex=s));i||(t.selectedIndex=-1)}}function Je(t,e){return e.every(function(e){return!g(e,t)})}function qe(t){return"_value"in t?t._value:t.value}function We(t){t.target.composing=!0}function Ge(t){t.target.composing&&(t.target.composing=!1,Ze(t.target,"input"))}function Ze(t,e){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)}function Xe(t){return!t.componentInstance||t.data&&t.data.transition?t:Xe(t.componentInstance._vnode)}function Ye(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?Ye(it(e.children)):t}function Qe(t){var e={},n=t.$options;for(var r in n.propsData)e[r]=t[r];var i=n._parentListeners;for(var o in i)e[Pn(o)]=i[o];return e}function tn(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function en(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function nn(t){t.data.newPos=t.elm.getBoundingClientRect()}function rn(t){var e=t.data.pos,n=t.data.newPos,r=e.left-n.left,i=e.top-n.top;if(r||i){t.data.moved=!0;var o=t.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function on(t,e){var n=e?zo:Vo;return t.replace(n,function(t){return Uo[t]})}function an(t,e,n){return{type:1,tag:t,attrsList:e,attrsMap:function(t){for(var e={},n=0,r=t.length;n<r;n++)e[t[n].name]=t[n].value;return e}(e),parent:n,children:[]}}function sn(t,e){function n(t){t.pre&&(s=!1),Lo(t.tag)&&(c=!1);for(var n=0;n<Io.length;n++)Io[n](t,e)}To=e.warn||se,Lo=e.isPreTag||Bn,Mo=e.mustUseProp||Bn,Do=e.getTagNamespace||Bn,jo=ce(e.modules,"transformNode"),No=ce(e.modules,"preTransformNode"),Io=ce(e.modules,"postTransformNode"),Eo=e.delimiters;var r,i,o=[],a=!1!==e.preserveWhitespace,s=!1,c=!1;return function(t,e){function n(e){l+=e,t=t.substring(e)}function r(t,n,r){var i,s;if(null==n&&(n=l),null==r&&(r=l),t&&(s=t.toLowerCase()),t)for(i=a.length-1;i>=0&&a[i].lowerCasedTag!==s;i--);else i=0;if(i>=0){for(var c=a.length-1;c>=i;c--)e.end&&e.end(a[c].tag,n,r);a.length=i,o=i&&a[i-1].tag}else"br"===s?e.start&&e.start(t,[],!0,n,r):"p"===s&&(e.start&&e.start(t,[],!1,n,r),e.end&&e.end(t,n,r))}for(var i,o,a=[],s=e.expectHTML,c=e.isUnaryTag||Bn,u=e.canBeLeftOpenTag||Bn,l=0;t;){if(i=t,o&&Ho(o)){var f=0,p=o.toLowerCase(),d=Bo[p]||(Bo[p]=new RegExp("([\\s\\S]*?)(</"+p+"[^>]*>)","i")),v=t.replace(d,function(t,n,r){return f=r.length,Ho(p)||"noscript"===p||(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Jo(p,n)&&(n=n.slice(1)),e.chars&&e.chars(n),""});l+=t.length-v.length,t=v,r(p,l-f,l)}else{var h=t.indexOf("<");if(0===h){if(Ao.test(t)){var m=t.indexOf("--\x3e");if(m>=0){e.shouldKeepComment&&e.comment(t.substring(4,m)),n(m+3);continue}}if(Oo.test(t)){var y=t.indexOf("]>");if(y>=0){n(y+2);continue}}var g=t.match(ko);if(g){n(g[0].length);continue}var _=t.match(xo);if(_){var b=l;n(_[0].length),r(_[1],b,l);continue}var $=function(){var e=t.match(Co);if(e){var r={tagName:e[1],attrs:[],start:l};n(e[0].length);for(var i,o;!(i=t.match(wo))&&(o=t.match(_o));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=l,r}}();if($){!function(t){var n=t.tagName,i=t.unarySlash;s&&("p"===o&&go(n)&&r(o),u(n)&&o===n&&r(n));for(var l=c(n)||!!i,f=t.attrs.length,p=new Array(f),d=0;d<f;d++){var v=t.attrs[d];So&&-1===v[0].indexOf('""')&&(""===v[3]&&delete v[3],""===v[4]&&delete v[4],""===v[5]&&delete v[5]);var h=v[3]||v[4]||v[5]||"",m="a"===n&&"href"===v[1]?e.shouldDecodeNewlinesForHref:e.shouldDecodeNewlines;p[d]={name:v[1],value:on(h,m)}}l||(a.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:p}),o=n),e.start&&e.start(n,p,l,t.start,t.end)}($),Jo(o,t)&&n(1);continue}}var C=void 0,w=void 0,x=void 0;if(h>=0){for(w=t.slice(h);!(xo.test(w)||Co.test(w)||Ao.test(w)||Oo.test(w)||(x=w.indexOf("<",1))<0);)h+=x,w=t.slice(h);C=t.substring(0,h),n(h)}h<0&&(C=t,t=""),e.chars&&C&&e.chars(C)}if(t===i){e.chars&&e.chars(t);break}}r()}(t,{warn:To,expectHTML:e.expectHTML,isUnaryTag:e.isUnaryTag,canBeLeftOpenTag:e.canBeLeftOpenTag,shouldDecodeNewlines:e.shouldDecodeNewlines,shouldDecodeNewlinesForHref:e.shouldDecodeNewlinesForHref,shouldKeepComment:e.comments,start:function(t,a,u){var l=i&&i.ns||Do(t);Qn&&"svg"===l&&(a=function(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];na.test(r.name)||(r.name=r.name.replace(ra,""),e.push(r))}return e}(a));var f=an(t,a,i);l&&(f.ns=l),function(t){return"style"===t.tag||"script"===t.tag&&(!t.attrsMap.type||"text/javascript"===t.attrsMap.type)}(f)&&!ur()&&(f.forbidden=!0);for(var p=0;p<No.length;p++)f=No[p](f,e)||f;if(s||(!function(t){null!=he(t,"v-pre")&&(t.pre=!0)}(f),f.pre&&(s=!0)),Lo(f.tag)&&(c=!0),s?function(t){var e=t.attrsList.length;if(e)for(var n=t.attrs=new Array(e),r=0;r<e;r++)n[r]={name:t.attrsList[r].name,value:JSON.stringify(t.attrsList[r].value)};else t.pre||(t.plain=!0)}(f):f.processed||(un(f),function(t){var e=he(t,"v-if");if(e)t.if=e,ln(t,{exp:e,block:t});else{null!=he(t,"v-else")&&(t.else=!0);var n=he(t,"v-else-if");n&&(t.elseif=n)}}(f),function(t){null!=he(t,"v-once")&&(t.once=!0)}(f),cn(f,e)),r?o.length||r.if&&(f.elseif||f.else)&&ln(r,{exp:f.elseif,block:f}):r=f,i&&!f.forbidden)if(f.elseif||f.else)!function(t,e){var n=function(t){var e=t.length;for(;e--;){if(1===t[e].type)return t[e];t.pop()}}(e.children);n&&n.if&&ln(n,{exp:t.elseif,block:t})}(f,i);else if(f.slotScope){i.plain=!1;var d=f.slotTarget||'"default"';(i.scopedSlots||(i.scopedSlots={}))[d]=f}else i.children.push(f),f.parent=i;u?n(f):(i=f,o.push(f))},end:function(){var t=o[o.length-1],e=t.children[t.children.length-1];e&&3===e.type&&" "===e.text&&!c&&t.children.pop(),o.length-=1,i=o[o.length-1],n(t)},chars:function(t){if(i&&(!Qn||"textarea"!==i.tag||i.attrsMap.placeholder!==t)){var e=i.children;if(t=c||t.trim()?function(t){return"script"===t.tag||"style"===t.tag}(i)?t:ea(t):a&&e.length?" ":""){var n;!s&&" "!==t&&(n=function(t,e){var n=e?fo(e):uo;if(n.test(t)){for(var r,i,o,a=[],s=[],c=n.lastIndex=0;r=n.exec(t);){(i=r.index)>c&&(s.push(o=t.slice(c,i)),a.push(JSON.stringify(o)));var u=ae(r[1].trim());a.push("_s("+u+")"),s.push({"@binding":u}),c=i+r[0].length}return c<t.length&&(s.push(o=t.slice(c)),a.push(JSON.stringify(o))),{expression:a.join("+"),tokens:s}}}(t,Eo))?e.push({type:2,expression:n.expression,tokens:n.tokens,text:t}):" "===t&&e.length&&" "===e[e.length-1].text||e.push({type:3,text:t})}}},comment:function(t){i.children.push({type:3,text:t,isComment:!0})}}),r}function cn(t,e){!function(t){var e=ve(t,"key");e&&(t.key=e)}(t),t.plain=!t.key&&!t.attrsList.length,function(t){var e=ve(t,"ref");e&&(t.ref=e,t.refInFor=function(t){var e=t;for(;e;){if(void 0!==e.for)return!0;e=e.parent}return!1}(t))}(t),function(t){if("slot"===t.tag)t.slotName=ve(t,"name");else{var e;"template"===t.tag?(e=he(t,"scope"),t.slotScope=e||he(t,"slot-scope")):(e=he(t,"slot-scope"))&&(t.slotScope=e);var n=ve(t,"slot");n&&(t.slotTarget='""'===n?'"default"':n,"template"===t.tag||t.slotScope||le(t,"slot",n))}}(t),function(t){var e;(e=ve(t,"is"))&&(t.component=e);null!=he(t,"inline-template")&&(t.inlineTemplate=!0)}(t);for(var n=0;n<jo.length;n++)t=jo[n](t,e)||t;!function(t){var e,n,r,i,o,a,s,c=t.attrsList;for(e=0,n=c.length;e<n;e++)if(r=i=c[e].name,o=c[e].value,Wo.test(r))if(t.hasBindings=!0,(a=function(t){var e=t.match(ta);if(e){var n={};return e.forEach(function(t){n[t.slice(1)]=!0}),n}}(r))&&(r=r.replace(ta,"")),Qo.test(r))r=r.replace(Qo,""),o=ae(o),s=!1,a&&(a.prop&&(s=!0,"innerHtml"===(r=Pn(r))&&(r="innerHTML")),a.camel&&(r=Pn(r)),a.sync&&de(t,"update:"+Pn(r),ye(o,"$event"))),s||!t.component&&Mo(t.tag,t.attrsMap.type,r)?ue(t,r,o):le(t,r,o);else if(qo.test(r))r=r.replace(qo,""),de(t,r,o,a,!1);else{var u=(r=r.replace(Wo,"")).match(Yo),l=u&&u[1];l&&(r=r.slice(0,-(l.length+1))),pe(t,r,i,o,l,a)}else le(t,r,JSON.stringify(o)),!t.component&&"muted"===r&&Mo(t.tag,t.attrsMap.type,r)&&ue(t,r,"true")}(t)}function un(t){var e;if(e=he(t,"v-for")){var n=function(t){var e=t.match(Go);if(!e)return;var n={};n.for=e[2].trim();var r=e[1].trim().replace(Xo,""),i=r.match(Zo);i?(n.alias=r.replace(Zo,""),n.iterator1=i[1].trim(),i[2]&&(n.iterator2=i[2].trim())):n.alias=r;return n}(e);n&&h(t,n)}}function ln(t,e){t.ifConditions||(t.ifConditions=[]),t.ifConditions.push(e)}function fn(t){return an(t.tag,t.attrsList.slice(),t.parent)}function pn(t){if(t.static=function(t){if(2===t.type)return!1;if(3===t.type)return!0;return!(!t.pre&&(t.hasBindings||t.if||t.for||In(t.tag)||!Fo(t.tag)||function(t){for(;t.parent;){if("template"!==(t=t.parent).tag)return!1;if(t.for)return!0}return!1}(t)||!Object.keys(t).every(Po)))}(t),1===t.type){if(!Fo(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var e=0,n=t.children.length;e<n;e++){var r=t.children[e];pn(r),r.static||(t.static=!1)}if(t.ifConditions)for(var i=1,o=t.ifConditions.length;i<o;i++){var a=t.ifConditions[i].block;pn(a),a.static||(t.static=!1)}}}function dn(t,e){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=e),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var n=0,r=t.children.length;n<r;n++)dn(t.children[n],e||!!t.for);if(t.ifConditions)for(var i=1,o=t.ifConditions.length;i<o;i++)dn(t.ifConditions[i].block,e)}}function vn(t,e,n){var r=e?"nativeOn:{":"on:{";for(var i in t)r+='"'+i+'":'+hn(i,t[i])+",";return r.slice(0,-1)+"}"}function hn(t,e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return hn(t,e)}).join(",")+"]";var n=ca.test(e.value),r=sa.test(e.value);if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)if(fa[s])o+=fa[s],ua[s]&&a.push(s);else if("exact"===s){var c=e.modifiers;o+=la(["ctrl","shift","alt","meta"].filter(function(t){return!c[t]}).map(function(t){return"$event."+t+"Key"}).join("||"))}else a.push(s);a.length&&(i+=function(t){return"if(!('button' in $event)&&"+t.map(mn).join("&&")+")return null;"}(a)),o&&(i+=o);return"function($event){"+i+(n?e.value+"($event)":r?"("+e.value+")($event)":e.value)+"}"}return n||r?e.value:"function($event){"+e.value+"}"}function mn(t){var e=parseInt(t,10);if(e)return"$event.keyCode!=="+e;var n=ua[t];return"_k($event.keyCode,"+JSON.stringify(t)+","+JSON.stringify(n)+",$event.key)"}function yn(t,e){var n=new da(e);return{render:"with(this){return "+(t?gn(t,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function gn(t,e){if(t.staticRoot&&!t.staticProcessed)return _n(t,e);if(t.once&&!t.onceProcessed)return bn(t,e);if(t.for&&!t.forProcessed)return function(t,e,n,r){var i=t.for,o=t.alias,a=t.iterator1?","+t.iterator1:"",s=t.iterator2?","+t.iterator2:"";return t.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||gn)(t,e)+"})"}(t,e);if(t.if&&!t.ifProcessed)return $n(t,e);if("template"!==t.tag||t.slotTarget){if("slot"===t.tag)return function(t,e){var n=t.slotName||'"default"',r=kn(t,e),i="_t("+n+(r?","+r:""),o=t.attrs&&"{"+t.attrs.map(function(t){return Pn(t.name)+":"+t.value}).join(",")+"}",a=t.attrsMap["v-bind"];!o&&!a||r||(i+=",null");o&&(i+=","+o);a&&(i+=(o?"":",null")+","+a);return i+")"}(t,e);var n;if(t.component)n=function(t,e,n){var r=e.inlineTemplate?null:kn(e,n,!0);return"_c("+t+","+wn(e,n)+(r?","+r:"")+")"}(t.component,t,e);else{var r=t.plain?void 0:wn(t,e),i=t.inlineTemplate?null:kn(t,e,!0);n="_c('"+t.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<e.transforms.length;o++)n=e.transforms[o](t,n);return n}return kn(t,e)||"void 0"}function _n(t,e){return t.staticProcessed=!0,e.staticRenderFns.push("with(this){return "+gn(t,e)+"}"),"_m("+(e.staticRenderFns.length-1)+(t.staticInFor?",true":"")+")"}function bn(t,e){if(t.onceProcessed=!0,t.if&&!t.ifProcessed)return $n(t,e);if(t.staticInFor){for(var n="",r=t.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+gn(t,e)+","+e.onceId+++","+n+")":gn(t,e)}return _n(t,e)}function $n(t,e,n,r){return t.ifProcessed=!0,Cn(t.ifConditions.slice(),e,n,r)}function Cn(t,e,n,r){function i(t){return n?n(t,e):t.once?bn(t,e):gn(t,e)}if(!t.length)return r||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+i(o.block)+":"+Cn(t,e,n,r):""+i(o.block)}function wn(t,e){var n="{",r=function(t,e){var n=t.directives;if(!n)return;var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=e.directives[o.name];u&&(a=!!u(t,o,e.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?',arg:"'+o.arg+'"':"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}if(c)return s.slice(0,-1)+"]"}(t,e);r&&(n+=r+","),t.key&&(n+="key:"+t.key+","),t.ref&&(n+="ref:"+t.ref+","),t.refInFor&&(n+="refInFor:true,"),t.pre&&(n+="pre:true,"),t.component&&(n+='tag:"'+t.tag+'",');for(var i=0;i<e.dataGenFns.length;i++)n+=e.dataGenFns[i](t);if(t.attrs&&(n+="attrs:{"+On(t.attrs)+"},"),t.props&&(n+="domProps:{"+On(t.props)+"},"),t.events&&(n+=vn(t.events,!1,e.warn)+","),t.nativeEvents&&(n+=vn(t.nativeEvents,!0,e.warn)+","),t.slotTarget&&!t.slotScope&&(n+="slot:"+t.slotTarget+","),t.scopedSlots&&(n+=function(t,e){return"scopedSlots:_u(["+Object.keys(t).map(function(n){return xn(n,t[n],e)}).join(",")+"])"}(t.scopedSlots,e)+","),t.model&&(n+="model:{value:"+t.model.value+",callback:"+t.model.callback+",expression:"+t.model.expression+"},"),t.inlineTemplate){var o=function(t,e){var n=t.children[0];if(1===n.type){var r=yn(n,e.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(t){return"function(){"+t+"}"}).join(",")+"]}"}}(t,e);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",t.wrapData&&(n=t.wrapData(n)),t.wrapListeners&&(n=t.wrapListeners(n)),n}function xn(t,e,n){if(e.for&&!e.forProcessed)return function(t,e,n){var r=e.for,i=e.alias,o=e.iterator1?","+e.iterator1:"",a=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,"_l(("+r+"),function("+i+o+a+"){return "+xn(t,e,n)+"})"}(t,e,n);return"{key:"+t+",fn:"+("function("+String(e.slotScope)+"){return "+("template"===e.tag?e.if?e.if+"?"+(kn(e,n)||"undefined")+":undefined":kn(e,n)||"undefined":gn(e,n))+"}")+"}"}function kn(t,e,n,r,i){var o=t.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag)return(r||gn)(a,e);var s=n?function(t,e){for(var n=0,r=0;r<t.length;r++){var i=t[r];if(1===i.type){if(An(i)||i.ifConditions&&i.ifConditions.some(function(t){return An(t.block)})){n=2;break}(e(i)||i.ifConditions&&i.ifConditions.some(function(t){return e(t.block)}))&&(n=1)}}return n}(o,e.maybeComponent):0,c=i||function(t,e){if(1===t.type)return gn(t,e);return 3===t.type&&t.isComment?function(t){return"_e("+JSON.stringify(t.text)+")"}(t):function(t){return"_v("+(2===t.type?t.expression:Sn(JSON.stringify(t.text)))+")"}(t)};return"["+o.map(function(t){return c(t,e)}).join(",")+"]"+(s?","+s:"")}}function An(t){return void 0!==t.for||"template"===t.tag||"slot"===t.tag}function On(t){for(var e="",n=0;n<t.length;n++){var r=t[n];e+='"'+r.name+'":'+Sn(r.value)+","}return e.slice(0,-1)}function Sn(t){return t.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function Tn(t,e){try{return new Function(t)}catch(n){return e.push({err:n,code:t}),y}}function En(t){return Ro=Ro||document.createElement("div"),Ro.innerHTML=t?'<a href="\n"/>':'<div a="\n"/>',Ro.innerHTML.indexOf("&#10;")>0}var jn=Object.freeze({}),Nn=Object.prototype.toString,In=u("slot,component",!0),Ln=u("key,ref,slot,slot-scope,is"),Mn=Object.prototype.hasOwnProperty,Dn=/-(\w)/g,Pn=p(function(t){return t.replace(Dn,function(t,e){return e?e.toUpperCase():""})}),Fn=p(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),Rn=/\B([A-Z])/g,Hn=p(function(t){return t.replace(Rn,"-$1").toLowerCase()}),Bn=function(t,e,n){return!1},Un=function(t){return t},Vn="data-server-rendered",zn=["component","directive","filter"],Kn=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured"],Jn={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Bn,isReservedAttr:Bn,isUnknownElement:Bn,getTagNamespace:y,parsePlatformTagName:Un,mustUseProp:Bn,_lifecycleHooks:Kn},qn=/[^\w.$]/,Wn="__proto__"in{},Gn="undefined"!=typeof window,Zn="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,Xn=Zn&&WXEnvironment.platform.toLowerCase(),Yn=Gn&&window.navigator.userAgent.toLowerCase(),Qn=Yn&&/msie|trident/.test(Yn),tr=Yn&&Yn.indexOf("msie 9.0")>0,er=Yn&&Yn.indexOf("edge/")>0,nr=Yn&&Yn.indexOf("android")>0||"android"===Xn,rr=Yn&&/iphone|ipad|ipod|ios/.test(Yn)||"ios"===Xn,ir=(Yn&&/chrome\/\d+/.test(Yn),{}.watch),or=!1;if(Gn)try{var ar={};Object.defineProperty(ar,"passive",{get:function(){or=!0}}),window.addEventListener("test-passive",null,ar)}catch(t){}var sr,cr,ur=function(){return void 0===sr&&(sr=!Gn&&"undefined"!=typeof global&&"server"===global.process.env.VUE_ENV),sr},lr=Gn&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,fr="undefined"!=typeof Symbol&&w(Symbol)&&"undefined"!=typeof Reflect&&w(Reflect.ownKeys);cr="undefined"!=typeof Set&&w(Set)?Set:function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(t){return!0===this.set[t]},t.prototype.add=function(t){this.set[t]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var pr=y,dr=0,vr=function(){this.id=dr++,this.subs=[]};vr.prototype.addSub=function(t){this.subs.push(t)},vr.prototype.removeSub=function(t){l(this.subs,t)},vr.prototype.depend=function(){vr.target&&vr.target.addDep(this)},vr.prototype.notify=function(){for(var t=this.subs.slice(),e=0,n=t.length;e<n;e++)t[e].update()},vr.target=null;var hr=[],mr=function(t,e,n,r,i,o,a,s){this.tag=t,this.data=e,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=e&&e.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},yr={child:{configurable:!0}};yr.child.get=function(){return this.componentInstance},Object.defineProperties(mr.prototype,yr);var gr=function(t){void 0===t&&(t="");var e=new mr;return e.text=t,e.isComment=!0,e},_r=Array.prototype,br=Object.create(_r);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(t){var e=_r[t];C(br,t,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=e.apply(this,n),a=this.__ob__;switch(t){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var $r=Object.getOwnPropertyNames(br),Cr={shouldConvert:!0},wr=function(t){if(this.value=t,this.dep=new vr,this.vmCount=0,C(t,"__ob__",this),Array.isArray(t)){(Wn?O:S)(t,br,$r),this.observeArray(t)}else this.walk(t)};wr.prototype.walk=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)E(t,e[n],t[e[n]])},wr.prototype.observeArray=function(t){for(var e=0,n=t.length;e<n;e++)T(t[e])};var xr=Jn.optionMergeStrategies;xr.data=function(t,e,n){return n?M(t,e,n):e&&"function"!=typeof e?t:M(t,e)},Kn.forEach(function(t){xr[t]=D}),zn.forEach(function(t){xr[t+"s"]=P}),xr.watch=function(t,e,n,r){if(t===ir&&(t=void 0),e===ir&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var i={};h(i,t);for(var o in e){var a=i[o],s=e[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},xr.props=xr.methods=xr.inject=xr.computed=function(t,e,n,r){if(!t)return e;var i=Object.create(null);return h(i,t),e&&h(i,e),i},xr.provide=M;var kr,Ar,Or=function(t,e){return void 0===e?t:e},Sr=[],Tr=!1,Er=!1;if("undefined"!=typeof setImmediate&&w(setImmediate))Ar=function(){setImmediate(J)};else if("undefined"==typeof MessageChannel||!w(MessageChannel)&&"[object MessageChannelConstructor]"!==MessageChannel.toString())Ar=function(){setTimeout(J,0)};else{var jr=new MessageChannel,Nr=jr.port2;jr.port1.onmessage=J,Ar=function(){Nr.postMessage(1)}}if("undefined"!=typeof Promise&&w(Promise)){var Ir=Promise.resolve();kr=function(){Ir.then(J),rr&&setTimeout(y)}}else kr=Ar;var Lr,Mr=new cr,Dr=p(function(t){var e="&"===t.charAt(0),n="~"===(t=e?t.slice(1):t).charAt(0),r="!"===(t=n?t.slice(1):t).charAt(0);return t=r?t.slice(1):t,{name:t,once:n,capture:r,passive:e}}),Pr=null,Fr=[],Rr=[],Hr={},Br=!1,Ur=!1,Vr=0,zr=0,Kr=function(t,e,n,r,i){this.vm=t,i&&(t._watcher=this),t._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++zr,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new cr,this.newDepIds=new cr,this.expression="","function"==typeof e?this.getter=e:(this.getter=function(t){if(!qn.test(t)){var e=t.split(".");return function(t){for(var n=0;n<e.length;n++){if(!t)return;t=t[e[n]]}return t}}}(e),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Kr.prototype.get=function(){!function(t){vr.target&&hr.push(vr.target),vr.target=t}(this);var t,e=this.vm;try{t=this.getter.call(e,e)}catch(t){if(!this.user)throw t;V(t,e,'getter for watcher "'+this.expression+'"')}finally{this.deep&&W(t),vr.target=hr.pop(),this.cleanupDeps()}return t},Kr.prototype.addDep=function(t){var e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),this.depIds.has(e)||t.addSub(this))},Kr.prototype.cleanupDeps=function(){for(var t=this.deps.length;t--;){var e=this.deps[t];this.newDepIds.has(e.id)||e.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},Kr.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(t){var e=t.id;if(null==Hr[e]){if(Hr[e]=!0,Ur){for(var n=Fr.length-1;n>Vr&&Fr[n].id>t.id;)n--;Fr.splice(n+1,0,t)}else Fr.push(t);Br||(Br=!0,q(ht))}}(this)},Kr.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||i(t)||this.deep){var e=this.value;if(this.value=t,this.user)try{this.cb.call(this.vm,t,e)}catch(t){V(t,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,t,e)}}},Kr.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Kr.prototype.depend=function(){for(var t=this.deps.length;t--;)this.deps[t].depend()},Kr.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||l(this.vm._watchers,this);for(var t=this.deps.length;t--;)this.deps[t].removeSub(this);this.active=!1}};var Jr={enumerable:!0,configurable:!0,get:y,set:y},qr={lazy:!0};Nt(It.prototype);var Wr={init:function(t,n,r,i){if(!t.componentInstance||t.componentInstance._isDestroyed){(t.componentInstance=function(t,n,r,i){var o={_isComponent:!0,parent:n,_parentVnode:t,_parentElm:r||null,_refElm:i||null},a=t.data.inlineTemplate;return e(a)&&(o.render=a.render,o.staticRenderFns=a.staticRenderFns),new t.componentOptions.Ctor(o)}(t,Pr,r,i)).$mount(n?t.elm:void 0,n)}else if(t.data.keepAlive){var o=t;Wr.prepatch(o,o)}},prepatch:function(t,e){var n=e.componentOptions;!function(t,e,n,r,i){var o=!!(i||t.$options._renderChildren||r.data.scopedSlots||t.$scopedSlots!==jn);if(t.$options._parentVnode=r,t.$vnode=r,t._vnode&&(t._vnode.parent=r),t.$options._renderChildren=i,t.$attrs=r.data&&r.data.attrs||jn,t.$listeners=n||jn,e&&t.$options.props){Cr.shouldConvert=!1;for(var a=t._props,s=t.$options._propKeys||[],c=0;c<s.length;c++){var u=s[c];a[u]=H(u,t.$options.props,e,t)}Cr.shouldConvert=!0,t.$options.propsData=e}if(n){var l=t.$options._parentListeners;t.$options._parentListeners=n,st(t,n,l)}o&&(t.$slots=ct(i,r.context),t.$forceUpdate())}(e.componentInstance=t.componentInstance,n.propsData,n.listeners,e,n.children)},insert:function(t){var e=t.context,n=t.componentInstance;n._isMounted||(n._isMounted=!0,vt(n,"mounted")),t.data.keepAlive&&(e._isMounted?function(t){t._inactive=!1,Rr.push(t)}(n):pt(n,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?dt(e,!0):e.$destroy())}},Gr=Object.keys(Wr),Zr=1,Xr=2,Yr=0;!function(t){t.prototype._init=function(t){this._uid=Yr++,this._isVue=!0,t&&t._isComponent?function(t,e){var n=t.$options=Object.create(t.constructor.options),r=e._parentVnode;n.parent=e.parent,n._parentVnode=r,n._parentElm=e._parentElm,n._refElm=e._refElm;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}(this,t):this.$options=F(Ft(this.constructor),t||{},this),this._renderProxy=this,this._self=this,function(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}(this),function(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&st(t,e)}(this),function(t){t._vnode=null,t._staticTrees=null;var e=t.$options,n=t.$vnode=e._parentVnode,r=n&&n.context;t.$slots=ct(e._renderChildren,r),t.$scopedSlots=jn,t._c=function(e,n,r,i){return Dt(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return Dt(t,e,n,r,i,!0)};var i=n&&n.data;E(t,"$attrs",i&&i.attrs||jn,0,!0),E(t,"$listeners",e._parentListeners||jn,0,!0)}(this),vt(this,"beforeCreate"),function(t){var e=$t(t.$options.inject,t);e&&(Cr.shouldConvert=!1,Object.keys(e).forEach(function(n){E(t,n,e[n])}),Cr.shouldConvert=!0)}(this),yt(this),function(t){var e=t.$options.provide;e&&(t._provided="function"==typeof e?e.call(t):e)}(this),vt(this,"created"),this.$options.el&&this.$mount(this.$options.el)}}(Rt),function(t){var e={};e.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=j,t.prototype.$delete=N,t.prototype.$watch=function(t,e,n){if(o(e))return bt(this,t,e,n);(n=n||{}).user=!0;var r=new Kr(this,t,e,n);return n.immediate&&e.call(this,r.value),function(){r.teardown()}}}(Rt),function(t){var e=/^hook:/;t.prototype.$on=function(t,n){if(Array.isArray(t))for(var r=0,i=t.length;r<i;r++)this.$on(t[r],n);else(this._events[t]||(this._events[t]=[])).push(n),e.test(t)&&(this._hasHookEvent=!0);return this},t.prototype.$once=function(t,e){function n(){r.$off(t,n),e.apply(r,arguments)}var r=this;return n.fn=e,r.$on(t,n),r},t.prototype.$off=function(t,e){if(!arguments.length)return this._events=Object.create(null),this;if(Array.isArray(t)){for(var n=0,r=t.length;n<r;n++)this.$off(t[n],e);return this}var i=this._events[t];if(!i)return this;if(!e)return this._events[t]=null,this;if(e)for(var o,a=i.length;a--;)if((o=i[a])===e||o.fn===e){i.splice(a,1);break}return this},t.prototype.$emit=function(t){var e=this,n=e._events[t];if(n){n=n.length>1?v(n):n;for(var r=v(arguments,1),i=0,o=n.length;i<o;i++)try{n[i].apply(e,r)}catch(n){V(n,e,'event handler for "'+t+'"')}}return e}}(Rt),function(t){t.prototype._update=function(t,e){this._isMounted&&vt(this,"beforeUpdate");var n=this.$el,r=this._vnode,i=Pr;Pr=this,this._vnode=t,r?this.$el=this.__patch__(r,t):(this.$el=this.__patch__(this.$el,t,e,!1,this.$options._parentElm,this.$options._refElm),this.$options._parentElm=this.$options._refElm=null),Pr=i,n&&(n.__vue__=null),this.$el&&(this.$el.__vue__=this),this.$vnode&&this.$parent&&this.$vnode===this.$parent._vnode&&(this.$parent.$el=this.$el)},t.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},t.prototype.$destroy=function(){if(!this._isBeingDestroyed){vt(this,"beforeDestroy"),this._isBeingDestroyed=!0;var t=this.$parent;!t||t._isBeingDestroyed||this.$options.abstract||l(t.$children,this),this._watcher&&this._watcher.teardown();for(var e=this._watchers.length;e--;)this._watchers[e].teardown();this._data.__ob__&&this._data.__ob__.vmCount--,this._isDestroyed=!0,this.__patch__(this._vnode,null),vt(this,"destroyed"),this.$off(),this.$el&&(this.$el.__vue__=null),this.$vnode&&(this.$vnode.parent=null)}}}(Rt),function(t){Nt(t.prototype),t.prototype.$nextTick=function(t){return q(t,this)},t.prototype._render=function(){var t=this,e=t.$options,n=e.render,r=e._parentVnode;if(t._isMounted)for(var i in t.$slots){var o=t.$slots[i];(o._rendered||o[0]&&o[0].elm)&&(t.$slots[i]=A(o,!0))}t.$scopedSlots=r&&r.data.scopedSlots||jn,t.$vnode=r;var a;try{a=n.call(t._renderProxy,t.$createElement)}catch(e){V(e,t,"render"),a=t._vnode}return a instanceof mr||(a=gr()),a.parent=r,a}}(Rt);var Qr=[String,RegExp,Array],ti={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Qr,exclude:Qr,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)zt(this.cache,t,this.keys)},watch:{include:function(t){Vt(this,function(e){return Ut(t,e)})},exclude:function(t){Vt(this,function(e){return!Ut(t,e)})}},render:function(){var t=this.$slots.default,e=it(t),n=e&&e.componentOptions;if(n){var r=Bt(n),i=this.include,o=this.exclude;if(i&&(!r||!Ut(i,r))||o&&r&&Ut(o,r))return e;var a=this.cache,s=this.keys,c=null==e.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):e.key;a[c]?(e.componentInstance=a[c].componentInstance,l(s,c),s.push(c)):(a[c]=e,s.push(c),this.max&&s.length>parseInt(this.max)&&zt(a,s[0],s,this._vnode)),e.data.keepAlive=!0}return e||t&&t[0]}}};!function(t){var e={};e.get=function(){return Jn},Object.defineProperty(t,"config",e),t.util={warn:pr,extend:h,mergeOptions:F,defineReactive:E},t.set=j,t.delete=N,t.nextTick=q,t.options=Object.create(null),zn.forEach(function(e){t.options[e+"s"]=Object.create(null)}),t.options._base=t,h(t.options.components,ti),function(t){t.use=function(t){var e=this._installedPlugins||(this._installedPlugins=[]);if(e.indexOf(t)>-1)return this;var n=v(arguments,1);return n.unshift(this),"function"==typeof t.install?t.install.apply(t,n):"function"==typeof t&&t.apply(null,n),e.push(t),this}}(t),function(t){t.mixin=function(t){return this.options=F(this.options,t),this}}(t),Ht(t),function(t){zn.forEach(function(e){t[e]=function(t,n){return n?("component"===e&&o(n)&&(n.name=n.name||t,n=this.options._base.extend(n)),"directive"===e&&"function"==typeof n&&(n={bind:n,update:n}),this.options[e+"s"][t]=n,n):this.options[e+"s"][t]}})}(t)}(Rt),Object.defineProperty(Rt.prototype,"$isServer",{get:ur}),Object.defineProperty(Rt.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Rt.version="2.5.13";var ei,ni,ri,ii,oi,ai,si,ci,ui=u("style,class"),li=u("input,textarea,option,select,progress"),fi=function(t,e,n){return"value"===n&&li(t)&&"button"!==e||"selected"===n&&"option"===t||"checked"===n&&"input"===t||"muted"===n&&"video"===t},pi=u("contenteditable,draggable,spellcheck"),di=u("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),vi="http://www.w3.org/1999/xlink",hi=function(t){return":"===t.charAt(5)&&"xlink"===t.slice(0,5)},mi=function(t){return hi(t)?t.slice(6,t.length):""},yi=function(t){return null==t||!1===t},gi={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},_i=u("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),bi=u("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),$i=function(t){return _i(t)||bi(t)},Ci=Object.create(null),wi=u("text,number,password,search,email,tel,url"),xi=Object.freeze({createElement:function(t,e){var n=document.createElement(t);return"select"!==t?n:(e.data&&e.data.attrs&&void 0!==e.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(t,e){return document.createElementNS(gi[t],e)},createTextNode:function(t){return document.createTextNode(t)},createComment:function(t){return document.createComment(t)},insertBefore:function(t,e,n){t.insertBefore(e,n)},removeChild:function(t,e){t.removeChild(e)},appendChild:function(t,e){t.appendChild(e)},parentNode:function(t){return t.parentNode},nextSibling:function(t){return t.nextSibling},tagName:function(t){return t.tagName},setTextContent:function(t,e){t.textContent=e},setAttribute:function(t,e,n){t.setAttribute(e,n)}}),ki={create:function(t,e){Xt(e)},update:function(t,e){t.data.ref!==e.data.ref&&(Xt(t,!0),Xt(e))},destroy:function(t){Xt(t,!0)}},Ai=new mr("",{},[]),Oi=["create","activate","update","remove","destroy"],Si={create:te,update:te,destroy:function(t){te(t,Ai)}},Ti=Object.create(null),Ei=[ki,Si],ji={create:re,update:re},Ni={create:oe,update:oe},Ii=/[\w).+\-_$\]]/,Li="__r",Mi="__c",Di={create:xe,update:xe},Pi={create:ke,update:ke},Fi=p(function(t){var e={},n=/:(.+)/;return t.split(/;(?![^(]*\))/g).forEach(function(t){if(t){var r=t.split(n);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}),Ri=/^--/,Hi=/\s*!important$/,Bi=function(t,e,n){if(Ri.test(e))t.style.setProperty(e,n);else if(Hi.test(n))t.style.setProperty(e,n.replace(Hi,""),"important");else{var r=Vi(e);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)t.style[r]=n[i];else t.style[r]=n}},Ui=["Webkit","Moz","ms"],Vi=p(function(t){if(ci=ci||document.createElement("div").style,"filter"!==(t=Pn(t))&&t in ci)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<Ui.length;n++){var r=Ui[n]+e;if(r in ci)return r}}),zi={create:Se,update:Se},Ki=p(function(t){return{enterClass:t+"-enter",enterToClass:t+"-enter-to",enterActiveClass:t+"-enter-active",leaveClass:t+"-leave",leaveToClass:t+"-leave-to",leaveActiveClass:t+"-leave-active"}}),Ji=Gn&&!tr,qi="transition",Wi="animation",Gi="transition",Zi="transitionend",Xi="animation",Yi="animationend";Ji&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(Gi="WebkitTransition",Zi="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Xi="WebkitAnimation",Yi="webkitAnimationEnd"));var Qi=Gn?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()},to=/\b(transform|all)(,|$)/,eo=function(i){function o(t){var n=A.parentNode(t);e(n)&&A.removeChild(n,t)}function a(t,r,i,o,a){if(t.isRootInsert=!a,!function(t,r,i,o){var a=t.data;if(e(a)){var u=e(t.componentInstance)&&a.keepAlive;if(e(a=a.hook)&&e(a=a.init)&&a(t,!1,i,o),e(t.componentInstance))return s(t,r),n(u)&&function(t,n,r,i){for(var o,a=t;a.componentInstance;)if(a=a.componentInstance._vnode,e(o=a.data)&&e(o=o.transition)){for(o=0;o<x.activate.length;++o)x.activate[o](Ai,a);n.push(a);break}c(r,t.elm,i)}(t,r,i,o),!0}}(t,r,i,o)){var u=t.data,f=t.children,v=t.tag;e(v)?(t.elm=t.ns?A.createElementNS(t.ns,v):A.createElement(v,t),d(t),l(t,f,r),e(u)&&p(t,r),c(i,t.elm,o)):n(t.isComment)?(t.elm=A.createComment(t.text),c(i,t.elm,o)):(t.elm=A.createTextNode(t.text),c(i,t.elm,o))}}function s(t,n){e(t.data.pendingInsert)&&(n.push.apply(n,t.data.pendingInsert),t.data.pendingInsert=null),t.elm=t.componentInstance.$el,f(t)?(p(t,n),d(t)):(Xt(t),n.push(t))}function c(t,n,r){e(t)&&(e(r)?r.parentNode===t&&A.insertBefore(t,n,r):A.appendChild(t,n))}function l(t,e,n){if(Array.isArray(e))for(var i=0;i<e.length;++i)a(e[i],n,t.elm,null,!0);else r(t.text)&&A.appendChild(t.elm,A.createTextNode(String(t.text)))}function f(t){for(;t.componentInstance;)t=t.componentInstance._vnode;return e(t.tag)}function p(t,n){for(var r=0;r<x.create.length;++r)x.create[r](Ai,t);e(C=t.data.hook)&&(e(C.create)&&C.create(Ai,t),e(C.insert)&&n.push(t))}function d(t){var n;if(e(n=t.fnScopeId))A.setAttribute(t.elm,n,"");else for(var r=t;r;)e(n=r.context)&&e(n=n.$options._scopeId)&&A.setAttribute(t.elm,n,""),r=r.parent;e(n=Pr)&&n!==t.context&&n!==t.fnContext&&e(n=n.$options._scopeId)&&A.setAttribute(t.elm,n,"")}function v(t,e,n,r,i,o){for(;r<=i;++r)a(n[r],o,t,e)}function h(t){var n,r,i=t.data;if(e(i))for(e(n=i.hook)&&e(n=n.destroy)&&n(t),n=0;n<x.destroy.length;++n)x.destroy[n](t);if(e(n=t.children))for(r=0;r<t.children.length;++r)h(t.children[r])}function m(t,n,r,i){for(;r<=i;++r){var a=n[r];e(a)&&(e(a.tag)?(y(a),h(a)):o(a.elm))}}function y(t,n){if(e(n)||e(t.data)){var r,i=x.remove.length+1;for(e(n)?n.listeners+=i:n=function(t,e){function n(){0==--n.listeners&&o(t)}return n.listeners=e,n}(t.elm,i),e(r=t.componentInstance)&&e(r=r._vnode)&&e(r.data)&&y(r,n),r=0;r<x.remove.length;++r)x.remove[r](t,n);e(r=t.data.hook)&&e(r=r.remove)?r(t,n):n()}else o(t.elm)}function g(n,r,i,o,s){for(var c,u,l,f=0,p=0,d=r.length-1,h=r[0],y=r[d],g=i.length-1,b=i[0],$=i[g],C=!s;f<=d&&p<=g;)t(h)?h=r[++f]:t(y)?y=r[--d]:Yt(h,b)?(_(h,b,o),h=r[++f],b=i[++p]):Yt(y,$)?(_(y,$,o),y=r[--d],$=i[--g]):Yt(h,$)?(_(h,$,o),C&&A.insertBefore(n,h.elm,A.nextSibling(y.elm)),h=r[++f],$=i[--g]):Yt(y,b)?(_(y,b,o),C&&A.insertBefore(n,y.elm,h.elm),y=r[--d],b=i[++p]):(t(c)&&(c=Qt(r,f,d)),t(u=e(b.key)?c[b.key]:function(t,n,r,i){for(var o=r;o<i;o++){var a=n[o];if(e(a)&&Yt(t,a))return o}}(b,r,f,d))?a(b,o,n,h.elm):Yt(l=r[u],b)?(_(l,b,o),r[u]=void 0,C&&A.insertBefore(n,l.elm,h.elm)):a(b,o,n,h.elm),b=i[++p]);f>d?v(n,t(i[g+1])?null:i[g+1].elm,i,p,g,o):p>g&&m(0,r,f,d)}function _(r,i,o,a){if(r!==i){var s=i.elm=r.elm;if(n(r.isAsyncPlaceholder))e(i.asyncFactory.resolved)?$(r.elm,i,o):i.isAsyncPlaceholder=!0;else if(n(i.isStatic)&&n(r.isStatic)&&i.key===r.key&&(n(i.isCloned)||n(i.isOnce)))i.componentInstance=r.componentInstance;else{var c,u=i.data;e(u)&&e(c=u.hook)&&e(c=c.prepatch)&&c(r,i);var l=r.children,p=i.children;if(e(u)&&f(i)){for(c=0;c<x.update.length;++c)x.update[c](r,i);e(c=u.hook)&&e(c=c.update)&&c(r,i)}t(i.text)?e(l)&&e(p)?l!==p&&g(s,l,p,o,a):e(p)?(e(r.text)&&A.setTextContent(s,""),v(s,null,p,0,p.length-1,o)):e(l)?m(0,l,0,l.length-1):e(r.text)&&A.setTextContent(s,""):r.text!==i.text&&A.setTextContent(s,i.text),e(u)&&e(c=u.hook)&&e(c=c.postpatch)&&c(r,i)}}}function b(t,r,i){if(n(i)&&e(t.parent))t.parent.data.pendingInsert=r;else for(var o=0;o<r.length;++o)r[o].data.hook.insert(r[o])}function $(t,r,i,o){var a,c=r.tag,u=r.data,f=r.children;if(o=o||u&&u.pre,r.elm=t,n(r.isComment)&&e(r.asyncFactory))return r.isAsyncPlaceholder=!0,!0;if(e(u)&&(e(a=u.hook)&&e(a=a.init)&&a(r,!0),e(a=r.componentInstance)))return s(r,i),!0;if(e(c)){if(e(f))if(t.hasChildNodes())if(e(a=u)&&e(a=a.domProps)&&e(a=a.innerHTML)){if(a!==t.innerHTML)return!1}else{for(var d=!0,v=t.firstChild,h=0;h<f.length;h++){if(!v||!$(v,f[h],i,o)){d=!1;break}v=v.nextSibling}if(!d||v)return!1}else l(r,f,i);if(e(u)){var m=!1;for(var y in u)if(!O(y)){m=!0,p(r,i);break}!m&&u.class&&W(u.class)}}else t.data!==r.text&&(t.data=r.text);return!0}var C,w,x={},k=i.modules,A=i.nodeOps;for(C=0;C<Oi.length;++C)for(x[Oi[C]]=[],w=0;w<k.length;++w)e(k[w][Oi[C]])&&x[Oi[C]].push(k[w][Oi[C]]);var O=u("attrs,class,staticClass,staticStyle,key");return function(r,i,o,s,c,u){if(!t(i)){var l=!1,p=[];if(t(r))l=!0,a(i,p,c,u);else{var d=e(r.nodeType);if(!d&&Yt(r,i))_(r,i,p,s);else{if(d){if(1===r.nodeType&&r.hasAttribute(Vn)&&(r.removeAttribute(Vn),o=!0),n(o)&&$(r,i,p))return b(i,p,!0),r;r=function(t){return new mr(A.tagName(t).toLowerCase(),{},[],void 0,t)}(r)}var v=r.elm,y=A.parentNode(v);if(a(i,p,v._leaveCb?null:y,A.nextSibling(v)),e(i.parent))for(var g=i.parent,C=f(i);g;){for(var w=0;w<x.destroy.length;++w)x.destroy[w](g);if(g.elm=i.elm,C){for(var k=0;k<x.create.length;++k)x.create[k](Ai,g);var O=g.data.hook.insert;if(O.merged)for(var S=1;S<O.fns.length;S++)O.fns[S]()}else Xt(g);g=g.parent}e(y)?m(0,[r],0,0):e(r.tag)&&h(r)}}return b(i,p,l),i.elm}e(r)&&h(r)}}({nodeOps:xi,modules:[ji,Ni,Di,Pi,zi,Gn?{create:Ve,activate:Ve,remove:function(t,e){!0!==t.data.show?He(t,e):e()}}:{}].concat(Ei)});tr&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&Ze(t,"input")});var no={inserted:function(t,e,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?Y(n,"postpatch",function(){no.componentUpdated(t,e,n)}):ze(t,e,n.context),t._vOptions=[].map.call(t.options,qe)):("textarea"===n.tag||wi(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("change",Ge),nr||(t.addEventListener("compositionstart",We),t.addEventListener("compositionend",Ge)),tr&&(t.vmodel=!0)))},componentUpdated:function(t,e,n){if("select"===n.tag){ze(t,e,n.context);var r=t._vOptions,i=t._vOptions=[].map.call(t.options,qe);if(i.some(function(t,e){return!g(t,r[e])})){(t.multiple?e.value.some(function(t){return Je(t,i)}):e.value!==e.oldValue&&Je(e.value,i))&&Ze(t,"change")}}}},ro={model:no,show:{bind:function(t,e,n){var r=e.value,i=(n=Xe(n)).data&&n.data.transition,o=t.__vOriginalDisplay="none"===t.style.display?"":t.style.display;r&&i?(n.data.show=!0,Re(n,function(){t.style.display=o})):t.style.display=r?o:"none"},update:function(t,e,n){var r=e.value;if(r!==e.oldValue){(n=Xe(n)).data&&n.data.transition?(n.data.show=!0,r?Re(n,function(){t.style.display=t.__vOriginalDisplay}):He(n,function(){t.style.display="none"})):t.style.display=r?t.__vOriginalDisplay:"none"}},unbind:function(t,e,n,r,i){i||(t.style.display=t.__vOriginalDisplay)}}},io={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]},oo={name:"transition",props:io,abstract:!0,render:function(t){var e=this,n=this.$slots.default;if(n&&(n=n.filter(function(t){return t.tag||rt(t)})).length){var i=this.mode,o=n[0];if(function(t){for(;t=t.parent;)if(t.data.transition)return!0}(this.$vnode))return o;var a=Ye(o);if(!a)return o;if(this._leaving)return tn(t,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:r(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=Qe(this),u=this._vnode,l=Ye(u);if(a.data.directives&&a.data.directives.some(function(t){return"show"===t.name})&&(a.data.show=!0),l&&l.data&&!function(t,e){return e.key===t.key&&e.tag===t.tag}(a,l)&&!rt(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=h({},c);if("out-in"===i)return this._leaving=!0,Y(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),tn(t,o);if("in-out"===i){if(rt(a))return u;var p,d=function(){p()};Y(c,"afterEnter",d),Y(c,"enterCancelled",d),Y(f,"delayLeave",function(t){p=t})}}return o}}},ao=h({tag:String,moveClass:String},io);delete ao.mode;var so={Transition:oo,TransitionGroup:{props:ao,render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=Qe(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var p=r[f];p.data.transition=a,p.data.pos=p.elm.getBoundingClientRect(),n[p.key]?u.push(p):l.push(p)}this.kept=t(e,null,u),this.removed=l}return t(e,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";t.length&&this.hasMove(t[0].elm,e)&&(t.forEach(en),t.forEach(nn),t.forEach(rn),this._reflow=document.body.offsetHeight,t.forEach(function(t){if(t.data.moved){var n=t.elm,r=n.style;Ie(n,e),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Zi,n._moveCb=function t(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Zi,t),n._moveCb=null,Le(n,e))})}}))},methods:{hasMove:function(t,e){if(!Ji)return!1;if(this._hasMove)return this._hasMove;var n=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(t){Ee(n,t)}),Te(n,e),n.style.display="none",this.$el.appendChild(n);var r=De(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};Rt.config.mustUseProp=fi,Rt.config.isReservedTag=$i,Rt.config.isReservedAttr=ui,Rt.config.getTagNamespace=Gt,Rt.config.isUnknownElement=function(t){if(!Gn)return!0;if($i(t))return!1;if(t=t.toLowerCase(),null!=Ci[t])return Ci[t];var e=document.createElement(t);return t.indexOf("-")>-1?Ci[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Ci[t]=/HTMLUnknownElement/.test(e.toString())},h(Rt.options.directives,ro),h(Rt.options.components,so),Rt.prototype.__patch__=Gn?eo:y,Rt.prototype.$mount=function(t,e){return t=t&&Gn?Zt(t):void 0,function(t,e,n){t.$el=e,t.$options.render||(t.$options.render=gr),vt(t,"beforeMount");var r;return r=function(){t._update(t._render(),n)},new Kr(t,r,y,null,!0),n=!1,null==t.$vnode&&(t._isMounted=!0,vt(t,"mounted")),t}(this,t,e)},Rt.nextTick(function(){Jn.devtools&&lr&&lr.emit("init",Rt)},0);var co,uo=/\{\{((?:.|\n)+?)\}\}/g,lo=/[-.*+?^${}()|[\]\/\\]/g,fo=p(function(t){var e=t[0].replace(lo,"\\$&"),n=t[1].replace(lo,"\\$&");return new RegExp(e+"((?:.|\\n)+?)"+n,"g")}),po={staticKeys:["staticClass"],transformNode:function(t,e){e.warn;var n=he(t,"class");n&&(t.staticClass=JSON.stringify(n));var r=ve(t,"class",!1);r&&(t.classBinding=r)},genData:function(t){var e="";return t.staticClass&&(e+="staticClass:"+t.staticClass+","),t.classBinding&&(e+="class:"+t.classBinding+","),e}},vo={staticKeys:["staticStyle"],transformNode:function(t,e){e.warn;var n=he(t,"style");n&&(t.staticStyle=JSON.stringify(Fi(n)));var r=ve(t,"style",!1);r&&(t.styleBinding=r)},genData:function(t){var e="";return t.staticStyle&&(e+="staticStyle:"+t.staticStyle+","),t.styleBinding&&(e+="style:("+t.styleBinding+"),"),e}},ho=function(t){return co=co||document.createElement("div"),co.innerHTML=t,co.textContent},mo=u("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),yo=u("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),go=u("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),_o=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,bo="[a-zA-Z_][\\w\\-\\.]*",$o="((?:"+bo+"\\:)?"+bo+")",Co=new RegExp("^<"+$o),wo=/^\s*(\/?)>/,xo=new RegExp("^<\\/"+$o+"[^>]*>"),ko=/^<!DOCTYPE [^>]+>/i,Ao=/^<!--/,Oo=/^<!\[/,So=!1;"x".replace(/x(.)?/g,function(t,e){So=""===e});var To,Eo,jo,No,Io,Lo,Mo,Do,Po,Fo,Ro,Ho=u("script,style,textarea",!0),Bo={},Uo={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t"},Vo=/&(?:lt|gt|quot|amp);/g,zo=/&(?:lt|gt|quot|amp|#10|#9);/g,Ko=u("pre,textarea",!0),Jo=function(t,e){return t&&Ko(t)&&"\n"===e[0]},qo=/^@|^v-on:/,Wo=/^v-|^@|^:/,Go=/(.*?)\s+(?:in|of)\s+(.*)/,Zo=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Xo=/^\(|\)$/g,Yo=/:(.*)$/,Qo=/^:|^v-bind:/,ta=/\.[^.]+/g,ea=p(ho),na=/^xmlns:NS\d+/,ra=/^NS\d+:/,ia=[po,vo,{preTransformNode:function(t,e){if("input"===t.tag){var n=t.attrsMap;if(n["v-model"]&&(n["v-bind:type"]||n[":type"])){var r=ve(t,"type"),i=he(t,"v-if",!0),o=i?"&&("+i+")":"",a=null!=he(t,"v-else",!0),s=he(t,"v-else-if",!0),c=fn(t);un(c),fe(c,"type","checkbox"),cn(c,e),c.processed=!0,c.if="("+r+")==='checkbox'"+o,ln(c,{exp:c.if,block:c});var u=fn(t);he(u,"v-for",!0),fe(u,"type","radio"),cn(u,e),ln(c,{exp:"("+r+")==='radio'"+o,block:u});var l=fn(t);return he(l,"v-for",!0),fe(l,":type",r),cn(l,e),ln(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}],oa={expectHTML:!0,modules:ia,directives:{model:function(t,e,n){var r=e.value,i=e.modifiers,o=t.tag,a=t.attrsMap.type;if(t.component)return me(t,r,i),!1;if("select"===o)!function(t,e,n){var r='var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"});";r=r+" "+ye(e,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),de(t,"change",r,null,!0)}(t,r,i);else if("input"===o&&"checkbox"===a)!function(t,e,n){var r=n&&n.number,i=ve(t,"value")||"null",o=ve(t,"true-value")||"true",a=ve(t,"false-value")||"false";ue(t,"checked","Array.isArray("+e+")?_i("+e+","+i+")>-1"+("true"===o?":("+e+")":":_q("+e+","+o+")")),de(t,"change","var $$a="+e+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+e+"=$$a.concat([$$v]))}else{$$i>-1&&("+e+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+ye(e,"$$c")+"}",null,!0)}(t,r,i);else if("input"===o&&"radio"===a)!function(t,e,n){var r=n&&n.number,i=ve(t,"value")||"null";ue(t,"checked","_q("+e+","+(i=r?"_n("+i+")":i)+")"),de(t,"change",ye(e,i),null,!0)}(t,r,i);else if("input"===o||"textarea"===o)!function(t,e,n){var r=t.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?Li:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=ye(e,l);c&&(f="if($event.target.composing)return;"+f),ue(t,"value","("+e+")"),de(t,u,f,null,!0),(s||a)&&de(t,"blur","$forceUpdate()")}(t,r,i);else if(!Jn.isReservedTag(o))return me(t,r,i),!1;return!0},text:function(t,e){e.value&&ue(t,"textContent","_s("+e.value+")")},html:function(t,e){e.value&&ue(t,"innerHTML","_s("+e.value+")")}},isPreTag:function(t){return"pre"===t},isUnaryTag:mo,mustUseProp:fi,canBeLeftOpenTag:yo,isReservedTag:$i,getTagNamespace:Gt,staticKeys:function(t){return t.reduce(function(t,e){return t.concat(e.staticKeys||[])},[]).join(",")}(ia)},aa=p(function(t){return u("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(t?","+t:""))}),sa=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,ca=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,ua={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},la=function(t){return"if("+t+")return null;"},fa={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:la("$event.target !== $event.currentTarget"),ctrl:la("!$event.ctrlKey"),shift:la("!$event.shiftKey"),alt:la("!$event.altKey"),meta:la("!$event.metaKey"),left:la("'button' in $event && $event.button !== 0"),middle:la("'button' in $event && $event.button !== 1"),right:la("'button' in $event && $event.button !== 2")},pa={on:function(t,e){t.wrapListeners=function(t){return"_g("+t+","+e.value+")"}},bind:function(t,e){t.wrapData=function(n){return"_b("+n+",'"+t.tag+"',"+e.value+","+(e.modifiers&&e.modifiers.prop?"true":"false")+(e.modifiers&&e.modifiers.sync?",true":"")+")"}},cloak:y},da=function(t){this.options=t,this.warn=t.warn||se,this.transforms=ce(t.modules,"transformCode"),this.dataGenFns=ce(t.modules,"genData"),this.directives=h(h({},pa),t.directives);var e=t.isReservedTag||Bn;this.maybeComponent=function(t){return!e(t.tag)},this.onceId=0,this.staticRenderFns=[]},va=(new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),new RegExp("\\b"+"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b")+"\\s*\\([^\\)]*\\)"),function(t){return function(e){function n(n,r){var i=Object.create(e),o=[],a=[];if(i.warn=function(t,e){(e?a:o).push(t)},r){r.modules&&(i.modules=(e.modules||[]).concat(r.modules)),r.directives&&(i.directives=h(Object.create(e.directives||null),r.directives));for(var s in r)"modules"!==s&&"directives"!==s&&(i[s]=r[s])}var c=t(n,i);return c.errors=o,c.tips=a,c}return{compile:n,compileToFunctions:function(t){var e=Object.create(null);return function(n,r,i){(r=h({},r)).warn,delete r.warn;var o=r.delimiters?String(r.delimiters)+n:n;if(e[o])return e[o];var a=t(n,r),s={},c=[];return s.render=Tn(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(t){return Tn(t,c)}),e[o]=s}}(n)}}}(function(t,e){var n=sn(t.trim(),e);!1!==e.optimize&&function(t,e){t&&(Po=aa(e.staticKeys||""),Fo=e.isReservedTag||Bn,pn(t),dn(t,!1))}(n,e);var r=yn(n,e);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}})(oa).compileToFunctions),ha=!!Gn&&En(!1),ma=!!Gn&&En(!0),ya=p(function(t){var e=Zt(t);return e&&e.innerHTML}),ga=Rt.prototype.$mount;return Rt.prototype.$mount=function(t,e){if((t=t&&Zt(t))===document.body||t===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=ya(r));else{if(!r.nodeType)return this;r=r.innerHTML}else t&&(r=function(t){if(t.outerHTML)return t.outerHTML;var e=document.createElement("div");return e.appendChild(t.cloneNode(!0)),e.innerHTML}(t));if(r){var i=va(r,{shouldDecodeNewlines:ha,shouldDecodeNewlinesForHref:ma,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return ga.call(this,t,e)},Rt.compile=va,Rt});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\vue\\dist\\vue.min.js","/node_modules\\vue\\dist")

},{"_process":19,"buffer":3}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Version 1.0.0 - Initial release
// Version 1.1.0 (2017-08-02) - Added cmdp function that returns promise instead of using callback
// Version 1.2.0 (2017-08-02) - Added Ajax monkey patch to emulate XMLHttpRequest over ZeroFrame API

const CMD_INNER_READY = 'innerReady'
const CMD_RESPONSE = 'response'
const CMD_WRAPPER_READY = 'wrapperReady'
const CMD_PING = 'ping'
const CMD_PONG = 'pong'
const CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket'
const CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket'

class ZeroFrame {
    constructor(url) {
        this.url = url
        this.waiting_cb = {}
        this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1")
        this.connect()
        this.next_message_id = 1
        this.init()
    }

    init() {
        return this
    }

    connect() {
        this.target = window.parent
        window.addEventListener('message', e => this.onMessage(e), false)
        this.cmd(CMD_INNER_READY)
    }

    onMessage(e) {
        let message = e.data
        let cmd = message.cmd
        if (cmd === CMD_RESPONSE) {
            if (this.waiting_cb[message.to] !== undefined) {
                this.waiting_cb[message.to](message.result)
            } else {
                this.log("Websocket callback not found:", message)
            }
        } else if (cmd === CMD_WRAPPER_READY) {
            this.cmd(CMD_INNER_READY)
        } else if (cmd === CMD_PING) {
            this.response(message.id, CMD_PONG)
        } else if (cmd === CMD_WRAPPER_OPENED_WEBSOCKET) {
            this.onOpenWebsocket()
        } else if (cmd === CMD_WRAPPER_CLOSE_WEBSOCKET) {
            this.onCloseWebsocket()
        } else {
            this.onRequest(cmd, message)
        }
    }

    onRequest(cmd, message) {
        this.log("Unknown request", message)
    }

    response(to, result) {
        this.send({
            cmd: CMD_RESPONSE,
            to: to,
            result: result
        })
    }

    cmd(cmd, params = {}, cb = null) {
        this.send({
            cmd: cmd,
            params: params
        }, cb)
    }

    cmdp(cmd, params = {}) {
        return new Promise((resolve, reject) => {
            this.cmd(cmd, params, (res) => {
                if (res && res.error) {
                    reject(res.error)
                } else {
                    resolve(res)
                }
            })
        })
    }

    send(message, cb = null) {
        message.wrapper_nonce = this.wrapper_nonce
        message.id = this.next_message_id
        this.next_message_id++
            this.target.postMessage(message, '*')
        if (cb) {
            this.waiting_cb[message.id] = cb
        }
    }

    log(...args) {
        console.log.apply(console, ['[ZeroFrame]'].concat(args))
    }

    onOpenWebsocket() {
        this.log('Websocket open')
    }

    onCloseWebsocket() {
        this.log('Websocket close')
    }

    monkeyPatchAjax() {
        var page = this
        XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open
        this.cmd("wrapperGetAjaxKey", [], (res) => { this.ajax_key = res })
        var newOpen = function(method, url, async) {
            url += "?ajax_key=" + page.ajax_key
            return this.realOpen(method, url, async)
        }
        XMLHttpRequest.prototype.open = newOpen
    }
}

module.exports = ZeroFrame;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\ZeroFrame.js","/src")

},{"_process":19,"buffer":3}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var ZeroFrame = require("./ZeroFrame.js");

var Vue = require("vue/dist/vue.min.js");

var Router = require("./router.js");

var VueZeroFrameRouter = require("./vue-zeroframe-router.js");

require("./vue_components/avatar.js");
require("./vue_components/navbar.js");
require("./vue_components/note.js");
require("./vue_components/noteLists.js");

autosize = require("autosize");
marked = require("marked");
moment = require("moment");
pnglib = require("pnglib");
svg4everybody = require("svg4everybody");

function d2h(d) {
    return d.toString(16);
}

function h2d(h) {
    return parseInt(h, 16);
}

function stringToHex(tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c;

    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i)
        str += d2h(c) + ' ';
    }
    return str;
}

function hexToString(tmp) {
    var arr = tmp.split(' '),
        str = '',
        i = 0,
        arr_len = arr.length,
        c;

    for (; i < arr_len; i += 1) {
        c = String.fromCharCode(h2d(arr[i]));
        str += c;
    }

    return str;
}



generateUUID = (typeof(window.crypto) != 'undefined' &&
        typeof(window.crypto.getRandomValues) != 'undefined') ?
    function() {
        // If we have a cryptographically secure PRNG, use that
        // https://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
        var buf = new Uint16Array(8);
        window.crypto.getRandomValues(buf);
        var S4 = function(num) {
            var ret = num.toString(16);
            while (ret.length < 4) {
                ret = "0" + ret;
            }
            return ret;
        };
        return (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-" + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5]) + S4(buf[6]) + S4(buf[7]));
    }

:

function() {
    // Otherwise, just use Math.random
    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};



marked.setOptions({
    "gfm": true,
    "breaks": true,
    "sanitize": true,
    "smartLists": true,
    "smartypants": true,
    "highlight": function(code) {

        // console.log("Highlighting >> ", code)
        return hljs.highlightAuto(code).value;
    }
});

var markedR = new marked.Renderer();
markedR.link = function(href, title, text) {
    var href = href || '',
        title = title || '',
        text = text || '';

    if (this.options.sanitize) {
        try {
            var prot = decodeURIComponent(unescape(href))
                .replace(/[^\w:]/g, '')
                .toLowerCase();
        } catch (e) {
            return '';
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
            return '';
        }
    }

    return '<a href="' + href + '" onclick="return openNewTab(\'' + href + '\');" ' + (title ? ('title="' + title + '"') : '') + '>' + text + '</a>';
};



openNewTab = function(url) {
    page.cmd("wrapperOpenWindow", [url, "_blank", ""]);
    return false;
}



Vue.use(VueZeroFrameRouter.VueZeroFrameRouter);

app = new Vue({
    el: '#app',
    template: `
        <div class="off-canvas">
            <navbar v-on:toggleLeftSidebar="toggleLeftSidebar" v-on:logIn="logIn" v-on:logOut="logOut"
            v-bind:userInfo="userInfo" v-bind:siteInfo="siteInfo"
            v-on:setSearch="setSearch"></navbar>
            <div id="sidebar-left" v-bind:class="'app-sidebar off-canvas-sidebar ' + (leftSidebarShown ? 'active' : '')">
                <div class="app-brand">
                    <route-link to="" class="app-logo">
                        <img src="" />
                        <h2>Thundote</h2>
                    </route-link>
                </div>
                <div class="app-nav">
                    <ul class="menu">
                        <!--<avatar v-if="isLoggedIn" v-bind:cert_user_id="userInfo.cert_user_id"></avatar>
                        <avatar v-else cert_user_id=""></avatar>
                        <li class="divider"></li>-->
                        <li class="menu-item">
                            <div v-if="checkReminders()" class="menu-badge">
                                <label class="label label-primary">{{ checkReminders() }}</label>
                            </div>
                            <route-link to="app/reminders">
                                <i class="mdi">{{ checkReminders() ? 'notifications' : 'notifications_none' }}</i> Reminders
                            </route-link>
                        </li>
                        <li class="divider"></li>
                        <li class="menu-item">
                            <a href="./?/app/local" v-on:click.prevent="goto('/app/local'); setGetList('l')">
                                <i class="mdi">cloud_off</i> Local notes
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="./?/app/synced" v-on:click.prevent="goto('/app/synced'); setGetList('s')">
                                <i class="mdi">cloud</i> Synced notes
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li class="menu-item">
                            <a href="./?/app/shared" v-on:click.prevent="goto('/app/shared'); setGetList('sh')">
                                <i class="mdi">cloud_upload</i> Own shared notes
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="./?/app/oshared" v-on:click.prevent="goto('/app/oshared'); setGetList('osh')">
                                <i class="mdi">cloud_download</i> Others shared notes
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li class="menu-item">
                            <route-link to="app/settings"><i class="mdi">settings</i> Settings</route-link>
                        </li>
                        <li class="divider" data-content="LINKS"></li>
                        <li class="menu-item">
                            <a href="https://github.com/AnthyG/Thundote" v-on:click.prevent="return openNewTab('https://github.com/AnthyG/Thundote');">
                                <i class="icon icon-link"></i> GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        
            <a class="off-canvas-overlay" href="#close" v-on:click.prevent="toggleLeftSidebar(false)"></a>
        
            <div class="off-canvas-content" style="padding-left: .4rem;">
                <div class="#container #grid-xl">
                    <component ref="view" v-bind:is="currentView"
                    v-on:getUserInfo="getUserInfo" v-on:logIn="logIn" v-on:logOut="logOut"
                    v-bind:userInfo="userInfo" v-bind:siteInfo="siteInfo"

                    v-on:getReminders="getReminders" v-bind:checkReminders="checkReminders" v-bind:reminders="reminders"
                    v-bind:getLists="getLists()" v-bind:getListsN="getLists(true)"

                    v-on:addNote="addNote" v-bind:colors="colors"
                    v-on:editNote="editNote" v-on:todoToggle="todoToggle" v-on:colorChange="colorChange" v-on:orderNotes="orderNotes"
                    v-on:deleteNote="deleteNote"

                    v-on:setGetList="setGetList" v-on:getNoteList="getNoteList" v-bind:getList="getList" v-bind:noteList="p_noteList"
                    v-on:setSearch="setSearch" v-bind:searchFor="searchFor"></component>
                </div>
            </div>
        </div>
    `,
    data: {
        out: null,
        currentView: null,
        serverInfo: null,
        siteInfo: null,
        userInfo: null,
        leftSidebarShown: false,
        getList: "l",
        noteList: null,
        noteListL: null,
        p_noteList: null,
        searchFor: '',
        reminders: null
    },
    computed: {
        isLoggedIn: function() {
            if (this.userInfo == null) return false;
            return this.userInfo.cert_user_id != null;
        },
        colors: function() {
            var colors = ["grey-100"];

            var colornames = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange"];
            var suffix = "-a100";

            for (var x = 0; x < colornames.length; x++) {
                var y = colornames[x];
                colors.push(y + suffix);
            }

            colors.push("blue-grey-100", "brown-100");

            return colors;
        }
    },
    methods: {
        toggleLeftSidebar: function(to) {
            if (to && typeof to === "boolean")
                this.leftSidebarShown = to;
            else
                this.leftSidebarShown = !this.leftSidebarShown;
        },
        logIn: function() {
            if (this.siteInfo == null) {
                return;
            }

            var dis = this;

            page.selectUser(function() {
                console.log("User selected; Logging in..");
                page.verifyUserFiles(undefined, function() {
                    console.log("Logged in");

                    dis.getList = "l";
                    dis.noteList = null;
                    dis.noteListL = null;
                    dis.p_noteList = null;
                    dis.reminders = null;

                    dis.getUserInfo();
                    dis.goto('/app');

                    dis.getNoteList(dis.getList, true);
                    dis.getReminders();
                });
            });
        },
        logOut: function() {
            var dis = this;

            page.signOut(function() {
                dis.getList = "l";
                dis.noteList = null;
                dis.noteListL = null;
                dis.p_noteList = null;
                dis.reminders = null;

                console.log("Logged out");

                dis.getUserInfo();
                dis.goto('');
            });
        },
        goto: function(to) {
            this.leftSidebarShown = false;
            Router.navigate(to);
        },
        getUserInfo: function() {
            if (this.siteInfo == null || this.siteInfo.cert_user_id == null) {
                this.userInfo = null;
                return;
            }

            console.log("Getting user-info", JSON.parse(JSON.stringify(this.siteInfo)));

            var dis = this;

            dis.userInfo = {
                json_id: null,
                public_key: null,
                cert_user_id: dis.siteInfo.cert_user_id,
                auth_address: dis.siteInfo.auth_address
            };

            page.cmd("dbQuery", [
                "SELECT * FROM extra_data LEFT JOIN json USING (json_id) WHERE auth_address = '" + dis.siteInfo.auth_address + "'"
            ], (res) => {
                if (!res || res.length !== 1 || !res[0]) return false;

                var user = res[0];

                dis.userInfo = {
                    json_id: user.json_id,
                    public_key: user.public_key,
                    cert_user_id: dis.siteInfo.cert_user_id,
                    auth_address: dis.siteInfo.auth_address
                };

                console.log("Got user-info", res, user, dis.siteInfo, dis.userInfo);

                dis.getReminders();

                if (Router.currentRoute === "")
                    dis.goto('/app');
            });
        },
        getReminders: function() {
            if (!this.isLoggedIn) return false;

            this.reminders = [{
                uuid: "UUID",
                rtime: moment().add(2, 'hours').format("x")
            }];

            /*
            this.reminders = {
                "l": this.noteListL,
                "s": this.noteList
            };
            // const lists = this.getLists();

            // for (let x = 0; x < lists.length; x++) {
            //     let y = lists[x];
            //     this.reminders[y] = y === "s" ? this.noteList : this.noteListL;
            // }
            */

            console.log("Got reminders", this.reminders);
        },
        checkReminders: function() {
            if (!this.isLoggedIn) return false;

            if (this.reminders !== null && this.reminders.length > -1) {
                return this.reminders.length;
            }

            /*
            if (this.reminders === null) return false;

            const l1 = this.reminders.l !== null ? this.reminders.l.length : 0;
            const l2 = this.reminders.s !== null ? this.reminders.s.length : 0;
            const count = l1 + l2;

            if (count > -1) {
                return count;
            }
            */

            return false;
        },
        setSearch: function(s) {
            if (!this.isLoggedIn) return false;

            console.log("Setting searchFor", s);
            if (typeof s === "string")
                this.searchFor = s;
        },
        getLists: function(n) {
            if (!this.isLoggedIn) return false;

            var n = n ? true : false;

            var lists = ["l", "s", "sh", "osh"];
            var listsn = ["local", "synced", "shared", "others shared"];

            return n ? listsn : lists;
        },
        setGetList: function(to, forceget) {
            if (!this.isLoggedIn) return false;

            var forceget = forceget === true ? true : false;

            var lists = this.getLists();

            if (to === true) {
                var ni = lists.indexOf(this.getList) + 1;
                ni = ni < lists.length ? ni : 0;
                var to = lists[ni];
            } else if (lists.indexOf(to) === -1) to = "l";

            this.getList = to;
            this.getNoteList(to, forceget);
        },
        getNoteList: function(l, forceget) {
            if (!this.isLoggedIn) return false;

            var lists = this.getLists();

            var l = lists.indexOf(l) !== -1 ? l : (lists.indexOf(this.getList) !== -1 ? this.getList : "l");

            var forceget = forceget === true ? true : false;
            var ncl = l === "s" ? this.noteList : this.noteListL;
            console.log("Getting noteList", forceget, l, ncl);
            if (!forceget && ncl !== null) {
                this.getList = l;
                this.p_noteList = ncl;
                return false;
            }

            // this.noteList = null;
            // this.noteListL = null;
            this.p_noteList = null;

            var dis = this;

            var dnlT = 6;

            var decryptor = function(data, cb) {
                var decryptList = [];

                var dnl = data.length;

                for (var x = 0; x < dnl; x++) {
                    var y = data[x];

                    if (typeof y.todoCheck === "boolean")
                        continue;

                    decryptList.push(y.title);
                    decryptList.push(y.body);
                    decryptList.push(y.todoCheck);
                    decryptList.push(y.rtime);
                    decryptList.push(y.color);
                    decryptList.push(y.lastedited);
                }

                page.cmd("eciesDecrypt", [
                    decryptList
                ], (res) => {
                    // console.log("Decrypted local note-stuff", res);

                    var c_noteList = [];

                    for (var x = 0; x < dnl * dnlT; x += dnlT) {
                        var y = data[x / dnlT];

                        // console.log("Reading local notes", x, x / 4, y);

                        c_noteList[x / dnlT] = {};

                        c_noteList[x / dnlT].uuid = y.uuid;
                        c_noteList[x / dnlT].title = res[x] !== null ? res[x] : y.title;
                        c_noteList[x / dnlT].body = res[x + 1] !== null ? res[x + 1] : y.body;
                        c_noteList[x / dnlT].todoCheck = y.encrypted ? res[x + 2] : (res[x + 2] === "true" ? true : false /*  || y.todoCheck */ );
                        c_noteList[x / dnlT].rtime = res[x + 3] !== null ? res[x + 3] : y.rtime;
                        c_noteList[x / dnlT].color = res[x + 4] !== null ? res[x + 4] : y.color;
                        c_noteList[x / dnlT].lastedited = res[x + 5] !== null ? res[x + 5] : y.lastedited;
                        c_noteList[x / dnlT].encrypted = y.encrypted;

                        // c_noteList[x / dnlT].todoCheck = res[x + 2] === "true" ? true : false || y.todoCheck;
                    }

                    console.log("Got noteList", c_noteList);

                    typeof cb === "function" && cb(c_noteList);
                });
            };

            var decryptor2 = function(data, key2, cb) {
                var decryptList = [];

                var key = btoa(key2);
                var iv = key;

                var dnl = data.length;

                for (var x = 0; x < dnl; x++) {
                    var y = data[x];

                    if (typeof y.todoCheck === "boolean")
                        continue;

                    decryptList.push([iv, y.title]);
                    decryptList.push([iv, y.body]);
                    decryptList.push([iv, y.todoCheck]);
                    decryptList.push([iv, y.rtime]);
                    decryptList.push([iv, y.color]);
                    decryptList.push([iv, y.lastedited]);
                }

                page.cmd("aesDecrypt", [
                    decryptList, [key]
                ], (res) => {
                    // console.log("Decrypted local note-stuff", res);

                    var c_noteList = [];

                    for (var x = 0; x < dnl * dnlT; x += dnlT) {
                        var y = data[x / dnlT];

                        // console.log("Reading local notes", x, x / 4, y);

                        c_noteList[x / dnlT] = {};

                        c_noteList[x / dnlT].uuid = y.uuid;
                        c_noteList[x / dnlT].title = res[x] || y.title;
                        c_noteList[x / dnlT].body = res[x + 1] || y.body;
                        c_noteList[x / dnlT].todoCheck = res[x + 2] === "true" ? true : false || y.todoCheck;
                        c_noteList[x / dnlT].rtime = res[x + 3] || y.rtime;
                        c_noteList[x / dnlT].color = res[x + 4] || y.color;
                        c_noteList[x / dnlT].lastedited = res[x + 5] || y.lastedited;
                        c_noteList[x / dnlT].encrypted = y.encrypted;
                    }

                    console.log("Got noteList 2", c_noteList);

                    typeof cb === "function" && cb(c_noteList);
                });
            };

            var tableName = "local_notes";
            if (l === "s") {
                tableName = "notes";
            }
            page.cmd("dbQuery", [
                "SELECT * FROM " + tableName + ", extra_data" +
                " JOIN json USING (json_id)" +
                " WHERE directory = 'users/" + app.userInfo.auth_address + "'"
            ], (notes) => {
                if (notes) {
                    decryptor(notes, function(c_noteList) {
                        // decryptor2(c_noteList_, key, function(c_noteList) {
                        dis.getList = l;

                        if (l === "s")
                            dis.noteList = c_noteList;
                        else if (l === "l")
                            dis.noteListL = c_noteList;

                        dis.p_noteList = c_noteList;
                        // });
                    });
                }
            });
        },
        addNote: function(note, sync, key) {
            if (!this.isLoggedIn) return false;

            // if (!note.title || !note.body) return false;
            console.log("Adding note..", note, sync, key);
            var note = note || {
                "uuid": generateUUID(),
                "title": "",
                "body": "",
                "todoCheck": false,
                "rtime": "",
                "color": "grey-100",
                "lastedited": moment().format("x"),
                "encrypted": (key ? true : false)
            };

            var sync = typeof sync === "boolean" ? sync : (this.getList === "s" ? true : false);

            var key = typeof key === "string" ? key : "";

            var nNote = {
                "uuid": note.uuid,
                "title": "",
                "body": "",
                "todoCheck": "",
                "rtime": "",
                "color": "",
                "lastedited": "",
                "encrypted": note.encrypted
            };

            if (sync)
                this.noteList.push(note);
            else
                this.noteListL.push(note);

            this.goto('/note/' + note.uuid);

            var data_inner_path = "data/users/" + this.userInfo.auth_address + "/data.json";
            var data2_inner_path = "data/users/" + this.userInfo.auth_address + "/data_private.json";
            var content_inner_path = "data/users/" + this.userInfo.auth_address + "/content.json";

            if (sync) {
                page.cmd("fileGet", {
                    "inner_path": data_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Adding synced note", data);

                    encryptor(note, nNote, function(nNote_) {
                        data.notes.push(nNote_);
                        writeBlaTo(0, data);
                    });
                });
            } else {
                page.cmd("fileGet", {
                    "inner_path": data2_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Adding local note", data);

                    encryptor(note, nNote, function(nNote_) {
                        data.local_notes.push(nNote_);
                        writeBlaTo(1, data);
                    });
                });
            }
        },
        todoToggle: function(note, to, sync) {
            if (!this.isLoggedIn) return false;

            var uuid = note.uuid;
            var nid;

            var sync = typeof sync === "boolean" ? sync : (this.getList === "s" ? true : false);

            var editableNotes = this.p_noteList.filter(function(a, b) {
                nid = a.uuid === uuid ? b : nid;
                return a.uuid === uuid;
            });
            if (editableNotes.length !== 1) return false;
            var nNote = editableNotes[0];

            nNote.todoCheck = (typeof to === "boolean" ? to : !nNote.todoCheck);

            this.editNote(nNote, sync);
            // this.p_noteList[nid] = nNote;

            console.log("Toggled todo-state of note", uuid, nNote.todoCheck);
        },
        reminderChange: function(note, to, sync) {
            if (!this.isLoggedIn) return false;

            var uuid = note.uuid;
            var nid;

            var sync = typeof sync === "boolean" ? sync : (this.getList === "s" ? true : false);

            var editableNotes = this.p_noteList.filter(function(a, b) {
                nid = a.uuid === uuid ? b : nid;
                return a.uuid === uuid;
            });
            if (editableNotes.length !== 1) return false;
            var nNote = editableNotes[0];

            nNote.rtime = (typeof to === "integer" ? to : 0);

            this.editNote(nNote, sync);

            console.log("Changed reminder of note", uuid, nNote.rtime);
        },
        colorChange: function(note, to, sync) {
            if (!this.isLoggedIn) return false;

            if (this.colors.indexOf(to) === -1) return false;

            var uuid = note.uuid;
            var nid;

            var sync = typeof sync === "boolean" ? sync : (this.getList === "s" ? true : false);

            var editableNotes = this.p_noteList.filter(function(a, b) {
                nid = a.uuid === uuid ? b : nid;
                return a.uuid === uuid;
            });
            if (editableNotes.length !== 1) return false;
            var nNote = editableNotes[0];

            nNote.color = to;

            this.editNote(nNote, sync);

            console.log("Changed color of note", uuid, nNote.color);
        },
        editNote: function(note, sync) {
            if (!this.isLoggedIn) return false;

            var uuid = note.uuid;
            var nid;

            var sync = typeof sync === "boolean" ? sync : (this.getList === "s" ? true : false);

            var editableNotes = this.p_noteList.filter(function(a, b) {
                nid = a.uuid === uuid ? b : nid;
                return a.uuid === uuid;
            });
            if (editableNotes.length !== 1) return false;
            var nNote = editableNotes[0];

            var tNote = {
                "uuid": "",
                "title": "",
                "body": "",
                "todoCheck": false,
                "rtime": "0",
                "color": "",
                "lastedited": "0",
                "encrypted": false
            };

            for (var x in tNote) {
                if (note.hasOwnProperty(x) && typeof tNote[x] === typeof note[x]) {
                    nNote[x] = note[x];
                } else if (!note.hasOwnProperty(x) || typeof tNote[x] !== typeof note[x]) {
                    nNote[x] = tNote[x];
                }
            }
            nNote.lastedited = moment().format("x");

            // this.p_noteList[nid] = JSON.parse(JSON.stringify(nNote));

            var r_nid = this.p_noteList.length - nid - 1;

            var data_inner_path = "data/users/" + this.userInfo.auth_address + "/data.json";
            var data2_inner_path = "data/users/" + this.userInfo.auth_address + "/data_private.json";
            var content_inner_path = "data/users/" + this.userInfo.auth_address + "/content.json";

            var dis = this;

            if (sync) {
                page.cmd("fileGet", {
                    "inner_path": data_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Editing synced note", JSON.parse(JSON.stringify(data)), nid, r_nid, JSON.parse(JSON.stringify(nNote)));

                    encryptor(JSON.parse(JSON.stringify(nNote)), JSON.parse(JSON.stringify(nNote)), function(nNote_) {
                        data.notes[nid] = nNote_;
                        writeBlaTo(0, JSON.parse(JSON.stringify(data)), function() {
                            // dis.getNoteList("s");
                        });
                    });
                });
            } else {
                page.cmd("fileGet", {
                    "inner_path": data2_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Editing local note", JSON.parse(JSON.stringify(data)), nid, r_nid, JSON.parse(JSON.stringify(nNote)));

                    encryptor(JSON.parse(JSON.stringify(nNote)), JSON.parse(JSON.stringify(nNote)), function(nNote_) {
                        data.local_notes[nid] = nNote_;
                        writeBlaTo(1, JSON.parse(JSON.stringify(data)), function() {
                            // dis.getNoteList("l");
                        });
                    });
                });
            }
        },
        orderNotes: function(e) {
            if (!this.isLoggedIn) return false;

            var sync = typeof sync === "boolean" ? sync : (this.getList === "s" ? true : false);

            console.log("Ordering notes", e);

            var onid,
                nid;

            e.layout.items.forEach(function(item, i) {
                if (e.element === item.element) {
                    console.log(item, i, item.element.getAttribute("index"));

                    onid = parseInt(item.element.getAttribute("index"));
                    nid = i;
                }
            });

            var r_onid = this.p_noteList.length - onid - 1;
            var r_nid = this.p_noteList.length - nid - 1;

            if (sync) {
                var cNote1 = JSON.parse(JSON.stringify(this.noteList[onid]));
                var cNote2 = JSON.parse(JSON.stringify(this.noteList[nid]));

                this.noteList.splice(onid, 1);
                this.noteList.splice(nid, 0, cNote1);
            } else {
                var cNote1 = JSON.parse(JSON.stringify(this.noteListL[onid]));
                var cNote2 = JSON.parse(JSON.stringify(this.noteListL[nid]));

                this.noteListL.splice(onid, 1);
                this.noteListL.splice(nid, 0, cNote1);
            }
            console.log(onid, r_onid, nid, r_nid, cNote1, cNote2);

            var data_inner_path = "data/users/" + this.userInfo.auth_address + "/data.json";
            var data2_inner_path = "data/users/" + this.userInfo.auth_address + "/data_private.json";
            var content_inner_path = "data/users/" + this.userInfo.auth_address + "/content.json";

            var dis = this;

            if (sync) {
                page.cmd("fileGet", {
                    "inner_path": data_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Ordering synced note", JSON.parse(JSON.stringify(data)), onid, r_onid, JSON.parse(JSON.stringify(cNote1)), nid, r_nid, JSON.parse(JSON.stringify(cNote2)));

                    encryptor(JSON.parse(JSON.stringify(cNote2)), JSON.parse(JSON.stringify(cNote2)), function(cNote2_) {
                        data.notes[onid] = cNote2_;
                        writeBlaTo(0, JSON.parse(JSON.stringify(data)), function() {
                            // dis.getNoteList("s");
                            encryptor(JSON.parse(JSON.stringify(cNote1)), JSON.parse(JSON.stringify(cNote1)), function(cNote1_) {
                                data.notes[nid] = cNote1_;
                                writeBlaTo(0, JSON.parse(JSON.stringify(data)), function() {
                                    // dis.getNoteList("s");
                                });
                            });
                        });
                    });
                });
            } else {
                page.cmd("fileGet", {
                    "inner_path": data2_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Ordering local note", JSON.parse(JSON.stringify(data)), onid, r_onid, JSON.parse(JSON.stringify(cNote1)), nid, r_nid, JSON.parse(JSON.stringify(cNote2)));

                    encryptor(JSON.parse(JSON.stringify(cNote2)), JSON.parse(JSON.stringify(cNote2)), function(cNote2_) {
                        data.local_notes[onid] = cNote2_;
                        writeBlaTo(1, JSON.parse(JSON.stringify(data)), function() {
                            // dis.getNoteList("l");
                            encryptor(JSON.parse(JSON.stringify(cNote1)), JSON.parse(JSON.stringify(cNote1)), function(cNote1_) {
                                data.local_notes[nid] = cNote1_;
                                writeBlaTo(1, JSON.parse(JSON.stringify(data)), function() {
                                    // dis.getNoteList("l");
                                });
                            });
                        });
                    });
                });
            }
        },
        deleteNote: function(note) {
            if (!this.isLoggedIn) return false;

            var uuid = note.uuid;
            var nid = null;

            var sync = typeof sync === "boolean" ? sync : (this.getList === "s" ? true : false);

            var editableNotes = this.p_noteList.filter(function(a, b) {
                nid = a.uuid === uuid ? b : nid;
                return a.uuid === uuid;
            });
            if (editableNotes.length !== 1) return false;

            var r_nid = this.p_noteList.length - nid - 1;

            // console.log("Deleting note..", note, nid, editableNotes, sync ? this.noteList[r_nid] : this.noteListL[r_nid]);

            if (sync)
                this.noteList.splice(nid, 1);
            else
                this.noteListL.splice(nid, 1);

            var data_inner_path = "data/users/" + this.userInfo.auth_address + "/data.json";
            var data2_inner_path = "data/users/" + this.userInfo.auth_address + "/data_private.json";
            var content_inner_path = "data/users/" + this.userInfo.auth_address + "/content.json";

            var dis = this;

            if (sync) {
                page.cmd("fileGet", {
                    "inner_path": data_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Deleting synced note", JSON.parse(JSON.stringify(data)), nid, r_nid, JSON.parse(JSON.stringify(note)));

                    data.notes.splice(nid, 1);
                    writeBlaTo(0, JSON.parse(JSON.stringify(data)), function() {
                        // dis.getNoteList("s");
                    });
                });
            } else {
                page.cmd("fileGet", {
                    "inner_path": data2_inner_path,
                    "required": false
                }, (data) => {
                    var data = data ? JSON.parse(data) : {};

                    console.log("Deleting local note", JSON.parse(JSON.stringify(data)), nid, r_nid, JSON.parse(JSON.stringify(note)));

                    data.local_notes.splice(nid, 1);
                    writeBlaTo(1, JSON.parse(JSON.stringify(data)), function() {
                        // dis.getNoteList("l");
                    });
                });
            }
        }
    }
});



class Page extends ZeroFrame {
    verifyUserFiles(cb1, cb2, forcesign) {
        var forcesign = forcesign ? true : false;
        console.log("Verifying User Files...", forcesign);

        if (!page.site_info.cert_user_id) return false;

        var data_inner_path = "data/users/" + page.site_info.auth_address + "/data.json";
        var data2_inner_path = "data/users/" + page.site_info.auth_address + "/data_private.json";
        var content_inner_path = "data/users/" + page.site_info.auth_address + "/content.json";

        var curpversion = 1;

        function verifyData2(cb1, cb2) {
            page.cmd("fileGet", {
                "inner_path": data2_inner_path,
                "required": false
            }, (data) => {
                // console.log("BEFORE 1", JSON.parse(JSON.stringify(data)));
                if (data)
                    var data = JSON.parse(data);
                else
                    var data = {};
                var olddata = JSON.parse(JSON.stringify(data));
                // console.log("BEFORE 2", JSON.parse(JSON.stringify(olddata)));

                if (data.pversion !== curpversion)
                    data = {
                        "pversion": curpversion
                    };

                if (!data.hasOwnProperty("local_notes"))
                    data.local_notes = [];

                console.log("VERIFIED data_private.json", JSON.parse(JSON.stringify(olddata)), JSON.parse(JSON.stringify(data)));

                var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')));
                var json_rawA = btoa(json_raw);

                if (JSON.stringify(data) !== JSON.stringify(olddata)) {
                    console.log("data_private.json HAS RECEIVED A UPDATE!");
                    page.cmd("fileWrite", [
                        data2_inner_path,
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            console.log("data_private.json HAS BEEN UPDATED!");
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ]);
                        }
                    });
                }
            });
            verifyData(cb1, cb2);
        }

        function verifyData(cb1, cb2) {
            page.cmd("fileGet", {
                "inner_path": data_inner_path,
                "required": false
            }, (data) => {
                if (data)
                    var data = JSON.parse(data);
                else
                    var data = {};
                var olddata = JSON.parse(JSON.stringify(data));

                if (!data.hasOwnProperty("notes"))
                    data.notes = [];

                if (!data.hasOwnProperty("shared"))
                    data.shared = [];

                if (data.hasOwnProperty("public_key"))
                    delete data.public_key;

                if (!data.hasOwnProperty("extra_data") || !data.extra_data[0])
                    data.extra_data = [{}];

                if (!data.extra_data[0].hasOwnProperty("auth_address"))
                    data.extra_data[0].auth_address = page.site_info.auth_address;

                if (!data.extra_data[0].hasOwnProperty("public_key") || !data.extra_data[0].public_key) {
                    page.cmd("userPublickey", [], (public_key) => {
                        data.extra_data[0].public_key = public_key;
                        verifyData_2(data, olddata, cb1, cb2);
                    });
                } else {
                    verifyData_2(data, olddata, cb1, cb2);
                }
            });
        }

        function verifyData_2(data, olddata, cb1, cb2) {
            console.log("VERIFIED data.json", olddata, data);

            if (JSON.stringify(data) !== JSON.stringify(olddata)) {
                console.log("data.json HAS RECEIVED A UPDATE!");

                var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')));
                var json_rawA = btoa(json_raw);

                page.cmd("fileWrite", [
                    data_inner_path,
                    json_rawA
                ], (res) => {
                    if (res == "ok") {
                        console.log("data.json HAS BEEN UPDATED!");

                        if (typeof cb1 === "function")
                            cb1(data, olddata, true);
                        verifyContent(data, olddata, cb2);
                    } else {
                        page.cmd("wrapperNotification", [
                            "error", "File write error: " + JSON.stringify(res)
                        ]);
                    }
                });
            } else {
                if (typeof cb1 === "function")
                    cb1(data, olddata, false);
                verifyContent(data, olddata, cb2);
            }
        }

        function verifyContent(data, olddata, cb2) {
            page.cmd("fileGet", {
                "inner_path": content_inner_path,
                "required": false
            }, (data2) => {
                if (data2)
                    var data2 = JSON.parse(data2);
                else
                    var data2 = {};
                var olddata2 = JSON.parse(JSON.stringify(data2));

                var curoptional = ""; // ".+\\.(png|jpg|jpeg|gif|mp3|ogg|mp4)"
                var curignore = "(data(?:_private)?.json)"; // "(?!(.+\\.(png|jpg|jpeg|gif|mp3|ogg|mp4)|data.json))"
                if (!data2.hasOwnProperty("optional") || data2.optional !== curoptional)
                    data2.optional = curoptional;
                if (!data2.hasOwnProperty("ignore") || data2.ignore !== curignore)
                    data2.ignore = curignore;
                if (!data2.hasOwnProperty("inner_path") || data2.inner_path !== content_inner_path) {
                    data2.inner_path = content_inner_path;
                }
                console.log("VERIFIED content.json", olddata2, data2);

                if (JSON.stringify(data2) !== JSON.stringify(olddata2) || JSON.stringify(data) !== JSON.stringify(olddata) || forcesign) {
                    console.log("content.json HAS RECEIVED A UPDATE!");

                    var json_raw2 = unescape(encodeURIComponent(JSON.stringify(data2, undefined, '\t')));
                    var json_rawA2 = btoa(json_raw2);

                    page.cmd("fileWrite", [
                        content_inner_path,
                        json_rawA2
                    ], (res) => {
                        if (res == "ok") {
                            console.log("content.json HAS BEEN UPDATED!");
                            if (typeof cb2 === "function")
                                cb2(data2, olddata2, true);
                            page.cmd("siteSign", {
                                "inner_path": content_inner_path
                            }, (res) => {
                                page.cmd("sitePublish", {
                                    "inner_path": content_inner_path,
                                    "sign": false
                                }, function() {});
                            });
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ]);
                        }
                    });
                } else {
                    if (typeof cb2 === "function")
                        cb2(data2, olddata2, false);
                }
            });
        }

        verifyData2(cb1, cb2);
    }

    selectUser(cb) {
        this.cmd("certSelect", {
            accepted_domains: [
                "zeroid.bit",
                "kaffie.bit",
                "cryptoid.bit"
            ]
        }, () => {
            typeof cb === "function" && cb();
        });
        return false;
    }

    signOut(cb) {
        this.cmd("certSelect", {
            accepted_domains: [""]
        }, () => {
            typeof cb === "function" && cb();
        });
    }

    onRequest(cmd, message) {
        Router.listenForBack(cmd, message);

        if (cmd == "setSiteInfo") {
            this.site_info = message.params;
            app.siteInfo = message.params;
            this.setSiteInfo(message.params);

            app.getUserInfo();
        } else
            this.log("Unknown incoming message:", cmd);
    }

    setSiteInfo(site_info) {
        app.out =
            "Page address: " + site_info.address +
            "<br>- Peers: " + site_info.peers +
            "<br>- Size: " + site_info.settings.size +
            "<br>- Modified: " + (new Date(site_info.content.modified * 1000));
    }

    onOpenWebsocket() {
        this.cmd("siteInfo", [], function(site_info) {
            page.site_info = site_info;
            app.siteInfo = site_info;

            page.verifyUserFiles(undefined, undefined, true);

            // if (site_info.cert_user_id) {
            app.getUserInfo();

            page.setSiteInfo(site_info);

            page.cmd("serverInfo", [], (res) => {
                app.serverInfo = res;
            });

            var Note = require("./router_pages/note.js");
            var Reminders = require("./router_pages/reminders.js");
            var Settings = require("./router_pages/settings.js");
            var Home = require("./router_pages/home.js");

            VueZeroFrameRouter.VueZeroFrameRouter_Init(Router, app, [
                { route: "note/:uuid", component: Note },
                { route: "app/reminders", component: Reminders },
                { route: "app/settings", component: Settings },
                { route: "app/:list/:search", component: Home },
                { route: "app/:list", component: Home },
                { route: "app", component: Home },
                { route: ":anything", component: Home },
                { route: "", component: Home }
            ]);
            // }
        });
    }
}
page = new Page();

var writeBlaTo = function(to, bla, cb1, cb2) {
    var data_inner_path = "data/users/" + app.siteInfo.auth_address + "/data.json";
    var data2_inner_path = "data/users/" + app.siteInfo.auth_address + "/data_private.json";
    var content_inner_path = "data/users/" + app.siteInfo.auth_address + "/content.json";

    var ip = to === 1 ? data2_inner_path : (to === 2 ? content_inner_path : data_inner_path);

    console.log("Writing", to, ip, bla);

    // Encode data array to utf8 json text
    var json_raw = unescape(encodeURIComponent(JSON.stringify(bla, undefined, '\t')));
    var json_rawA = btoa(json_raw);

    page.cmd("fileWrite", [
        ip,
        json_rawA
    ], (res) => {
        if (res == "ok") {
            var cbf = function() {
                console.log("Wrote", to, ip, bla);
                typeof cb1 === "function" && cb1(res, to, ip, bla);
            }
            if (to === 1)
                page.verifyUserFiles(null, cbf);
            else
                page.verifyUserFiles(cbf, null);
        } else {
            page.cmd("wrapperNotification", [
                "error", "File write error: " + JSON.stringify(res)
            ]);
            typeof cb2 === "function" && cb2(res, to, ip, bla);
        }
    });
};

encrypt = function(text, mode, key, iv, cb) {
    var mode = mode || 0;

    var key = key || "";
    var iv = iv || key || "";

    if (mode === 1 && key && iv) {
        var bR1 = btoa(key);
        var bR2 = btoa(iv);
        page.cmd("aesEncrypt", [
            text,
            bR1,
            bR2
        ], (res) => {
            typeof cb === "function" && cb(res, text, mode, key, iv, bR1, bR2);
        })
    } else if (mode === 0) {
        page.cmd("eciesEncrypt", [
            text
        ], (res) => {
            typeof cb === "function" && cb(res, text, mode, key, iv);
        });
    } else return false;
};

encryptor = function(note, nNote, cb, key) {
    var cb = typeof cb === "function" ? cb : undefined;

    var these = [
        "title",
        "body",
        "todoCheck",
        "rtime",
        "color",
        "lastedited"
    ];
    var thesetS = [false, false, true, false, false];

    var x2 = -1;
    var enc2 = false;
    var genEncryptorStr = function(x, mode) {
        var encryptorStr_ = ``;

        x2++;
        var x = x + 1;
        var y = these[x];

        var mode = mode === 1 ? 1 : 0;

        encryptorStr_ += `
            console.log("Now encrypting '` + y + `'..", n` + (mode === 0 && note.encrypted ? `N` : ``) + `ote_['` + y + `']);
            encrypt(n` + (mode === 0 && note.encrypted ? `N` : ``) + `ote_['` + y + `']` + (thesetS[x] ? `.toString()` : ``) +
            `, ` + mode + `, key_, "", function(res` + x2 + `, text` + x2 + `, mode` + x2 + `, key` + x2 + `, iv` + x2 + `, bR1` + x2 + `, bR2` + x2 + `) {
                // console.log("Encrypted '` + y + `'", [res` + x2 + `, text` + x2 + `, mode` + x2 + `, key` + x2 + `, iv` + x2 + `, bR1` + x2 + `, bR2` + x2 + `]);
                nNote_['` + y + `'] = res` + x2 + (mode === 1 ? `[2]` : ``) + `;
                `;

        if (x < these.length - 1) {
            encryptorStr_ += genEncryptorStr(x, mode);
        }

        if (x === these.length - 1 && !enc2 && note.encrypted) {
            encryptorStr_ += `
                console.log("Encrypting with ECIES!");`;
            enc2 = true;
            encryptorStr_ += genEncryptorStr(-1, 0);
        } else if (x === these.length - 1) {
            encryptorStr_ += `
                // console.log("Encryptor encrypted!", nNote_, note_);
                cb_(nNote_, note_);`;
        } else {
            // console.log(x === these.length - 1, enc2, note.encrypted);
        }

        encryptorStr_ += `
            });`;

        return encryptorStr_;
    };

    var encryptorStr = `(function(note_, nNote_, cb_, key_) {
        // console.log(note_, nNote_, cb_, key_);` +
        (note.encrypted ? genEncryptorStr(-1, 1) : genEncryptorStr(-1, 0)) + `
    })(note, nNote, cb, key);`;
    // console.log("Encryptor Str", encryptorStr);
    eval(encryptorStr);
};

function showError(msg, t) {
    var t = typeof t === "number" ? t : 1000;
    page.cmd("wrapperNotification", [
        "error", msg, t
    ]);
}

(function() {
    showError(
        "<b>As a warning</b>, <i>this Zite is still in Alpha</i>, so notes in<br>" +
        " might get deleted due to more secure encryption methods or bugs!",
        10000
    );
})();
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\main.js","/src")

},{"./ZeroFrame.js":24,"./router.js":26,"./router_pages/home.js":27,"./router_pages/note.js":28,"./router_pages/reminders.js":29,"./router_pages/settings.js":30,"./vue-zeroframe-router.js":31,"./vue_components/avatar.js":32,"./vue_components/navbar.js":33,"./vue_components/note.js":34,"./vue_components/noteLists.js":35,"_process":19,"autosize":1,"buffer":3,"marked":10,"moment":11,"pnglib":18,"svg4everybody":20,"vue/dist/vue.min.js":23}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Router = {
    routes: [],
    currentRoute: "",
    currentParams: {},
    searchQuery: {},
    root: "/",
    notFoundFunction: null,
    hookFunctions: {}, // hooks that are called for each route, functions for 'before' and 'after'.
    config: function(options) {
        this.root = options && options.root ? "/" + this.clearSlashes(options.root) + "/" : "/";
        return this;
    },
    getURL: function() { // get's current query string/hash & clears slashes from beginning and end, Note: only for initial load
        var url = '';
        url = window.location.search.replace(/&wrapper_nonce=([A-Za-z0-9]+)/, "").replace(/\?wrapper_nonce=([A-Za-z0-9]+)/, "").replace(/\?\//, '').replace(/&.*/, ''); // TODO: Fix this to replace the root instead of just a slash
        return this.clearSlashes(url);
    },
    getSearchQuery: function() {
        var url = "";
        url = window.location.search.replace(/&wrapper_nonce=([A-Za-z0-9]+)/, "").replace(/\?wrapper_nonce=([A-Za-z0-9]+)/, "").replace(/\?\//, '');
        var re = (/&([^&=]+)(=?)([^&]*)/g);
        var m;

        do {
            m = re.exec(url);
            if (m) {
                this.searchQuery[m[1]] = m[3];
            }
        } while (m);
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(path, controller, hooks, object = null) {
        if (typeof path === "function") {
            object = hooks;
            hooks = controller;
            controller = path;
            path = '';
        }
        this.routes.push({ path: path, controller: controller, hooks: hooks, object: object });
        return this;
    },
    remove: function(param) {
        for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.controller === param || r.path.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    flush: function() {
        this.routes = [];
        this.root = '/';
        return this;
    },
    check: function(hash) {
        var reg, keys, match, routeParams;
        for (var i = 0, max = this.routes.length; i < max; i++) {
            this.getSearchQuery();
            routeParams = {
                searchQuery: this.searchQuery
            };
            keys = this.routes[i].path.match(/:([^\/]+)/g);
            match = hash.replace(/^\//, "").match(new RegExp("^" + this.routes[i].path.replace(/:([^\/]+)/g, "([^\/]*)").replace(/\*/g, '(?:.*)') + '(?:\/|$)'));
            if (match) {
                match.shift();
                match.forEach(function(value, i) {
                    routeParams[keys[i].replace(":", "")] = value;
                });
                var object = {};
                if (this.routes[i].object) {
                    object = this.routes[i].object;
                    object.params = routeParams;
                }
                this.currentParams = routeParams;
                // Call 'before' hook
                if (this.hookFunctions && this.hookFunctions["before"]) { // TODO: Move this into navigate function?
                    if (!this.hookFunctions["before"].call(object, this.routes[i].path, routeParams, this.searchQuery)) {
                        page.cmd("wrapperPushState", [{ "route": this.currentRoute }, null, this.root + this.clearSlashes(this.currentRoute)]);
                        return this;
                    }
                }
                // Call route-specific 'before' hook
                if (this.routes[i].hooks && this.routes[i].hooks["before"]) {
                    if (!this.routes[i].hooks["before"].call(object, routeParams, this.searchQuery)) {
                        page.cmd("wrapperPushState", [{ "route": this.currentRoute }, null, this.root + this.clearSlashes(this.currentRoute)]);
                        return this;
                    }
                }
                this.currentRoute = this.routes[i].path;
                window.scroll(window.pageXOffset, 0);
                if (this.setView) { // Used for Vue-ZeroFrame-Router-Plugin NOTE: May Change
                    this.setView(i, this.routes[i].object);
                }
                this.routes[i].controller.call(object, routeParams, this.searchQuery);
                // Call route-specific 'after' hook
                if (this.routes[i].hooks) {
                    this.routes[i].hooks["after"].call(object, routeParams, this.searchQuery);
                }
                if (this.hookFunctions) {
                    if (this.hookFunctions["after"]) {
                        this.hookFunctions["after"].call(object, this.currentRoute, routeParams, this.searchQuery);
                    }
                }
                return this;
            }
        }
        return this;
    },
    refresh: function() { // Refreshes the current route - reruns the route's controller function
        this.check(this.currentRoute);
        return this;
    },
    listenForBack: function(cmd, message) { // Note: Call in the OnRequest function in ZeroFrame class.
        if (!cmd) console.log("[Router] Please pass in cmd and message into Router.listenForBack function");
        if (cmd == "wrapperPopState") {
            if (message.params.state) {
                if (!message.params.state.url) {
                    message.params.state.url = message.params.href.replace(/.*\?/, "");
                }
                this.navigate(message.params.state.url.replace(/^\//, ''), false);
            }
        }
    },
    navigate: function(path, doPush = true) {
        var previousRoute = this.currentRoute;
        // TODO: Call route-specific 'leave' hook
        // Call global 'leave' hook
        if (this.hookFunctions && this.hookFunctions["leave"]) {
            if (!this.hookFunctions["leave"].call({}, previousRoute)) {
                return this;
            }
        }

        path = path ? path : '';
        if (doPush) {
            page.cmd("wrapperPushState", [{ "route": path }, path, this.root + this.clearSlashes(path)]);
        }
        this.check(path);
        return this;
    },
    hooks: function(hookFunctions) { // TODO: Check if using correct format?
        this.hookFunctions = hookFunctions;
        return this;
    },
    notFound: function(f) {
        if (f && typeof f === "function") {
            this.notFoundFunction = f;
        }
        return this;
    }
}

// Note: Call right after creating all of your routes.
Router.init = function() {
    // if '?/' isn't on address - add it
    var address = window.location.search.replace(/&wrapper_nonce=([A-Za-z0-9]+)/, "").replace(/\?wrapper_nonce=([A-Za-z0-9]+)/, ""); // TODO: Fix this to replace the root instead of just a slash
    if (address == '') {
        page.cmd("wrapperPushState", [{ "route": "" }, null, this.root]);
    }
    // Resolve the initial route
    Router.check(Router.getURL());
}

// Returns a string with the html for a link that will call the Router.navigate function when clicked.
// Example:
//   content += generateRouteLinkHTML('tutorials/' + tutorial.slug, tutorial.name, 'button is-info', 'margin-left: 30px;') + "<br>";
function generateRouteLinkHTML(to, display, tagClass = "", tagStyle = "") {
    var link = '<a href="./?/' + to + '" onclick="Router.navigate(\'' + to + '\'); event.preventDefault();"';

    if (tagClass && tagClass !== "") {
        link += ' class="' + tagClass + '"';
    }
    if (tagStyle && tagStyle !== "") {
        link += ' style="' + tagStyle + '"';
    }
    link += '>' + display + '</a>';
    return link;
}

module.exports = Router;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\router.js","/src")

},{"_process":19,"buffer":3}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

var Home = {
    beforeMount: function() {
        // this.$emit('getUserInfo');
        if (this.userInfo == null || this.userInfo.cert_user_id == null) {
            Router.navigate('');
            console.log("Redirected to LP", this.userInfo);
        } else {
            var lists = this.getLists;
            var listsn = this.getListsN;

            console.log("Lists", lists, listsn);

            if (!Router.currentParams.hasOwnProperty("list") || Router.currentParams.list == "") {
                this.$emit('setGetList', "local");
                Router.navigate('/app/local');
            } else if (Router.currentParams.hasOwnProperty("list")) {
                var trycurlist = Router.currentParams.list;
                var trycurlistI = listsn.indexOf(trycurlist);
                if (trycurlistI !== -1) {
                    this.$emit('setGetList', lists[trycurlistI]);
                    Router.navigate('/app/' + trycurlist);
                } else {
                    this.$emit('setGetList', "local");
                    Router.navigate('/app/local');
                }
            } else {
                this.$emit('getNoteList');
            }

            if (Router.currentParams.hasOwnProperty("search") && Router.currentParams.search != "") {
                this.searchFor = Router.currentParams.search;
                console.log("Searching", s);
                this.$emit('setSearch', s);
            }

            console.log("Staying on Home", Router.currentParams, this.noteList, this.noteList !== null, this.searchFor);
        }

        console.log("Loaded App (home)", this.userInfo);
    },
    props: {
        userInfo: Object,
        siteInfo: Object,
        getList: String,
        getLists: Array,
        getListsN: Array,
        noteList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        searchFor: String,
        colors: Array
    },
    data: function() {
        return {
            hideChecked: false
        }
    },
    computed: {
        isLoggedIn: function() {
            if (this.userInfo == null) return false;
            return this.userInfo.cert_user_id != null;
        },
        curList: function() {
            var lists = this.getLists;
            var listsn = this.getListsN;
            return listsn[lists.indexOf(this.getList)];
        },
        listIcon: function() {
            return this.getList === 'l' ? 'cloud_off' :
                (this.getList === 's' ? 'cloud' :
                    (this.getList === 'sh' ? 'cloud_upload' :
                        (this.getList === 'osh' ? 'cloud_download' :
                            'error')));
        },
        p_noteList: function() {
            var dis = this;

            console.log("Filtering notes", this.hideChecked, this.searchFor);

            if (this.noteList !== null)
                return this.noteList.filter(function(a, b) {
                    if (dis.hideChecked && a.todoCheck) {
                        return false;
                    }

                    if (dis.searchFor) {
                        var s = new RegExp(dis.searchFor, "mi");

                        if (!s.test(a.body) && !s.test(a.title)) {
                            return false;
                        }
                    }

                    return true;
                });
            else return [];
        }
    },
    watch: {
        getList: function() {
            console.log("Watching getList", this.getList);

            this.naviList();

            return this.getList;
        }
    },
    methods: {
        logIn: function() {
            this.$emit('logIn');
        },
        logOut: function() {
            this.$emit('logOut');
        },
        goto: function(to) {
            Router.navigate(to);
        },
        setSearch: function(s) {
            this.searchFor = s;
            console.log("Searching", s);
            this.$emit('setSearch', s);
        },
        addNote: function(e, note, sync, key) {
            var sync = sync === true ? true : (this.getList === "s" ? true : false);
            // var key = key != "" ? key : (this.addNoteKey != "" ? this.addNoteKey : undefined);
            this.$emit('addNote', note, sync, key);
        },
        todoToggle: function(note, to) {
            this.$emit('todoToggle', note, to);
        },
        colorChange: function(note, to) {
            this.$emit('colorChange', note, to);
        },
        editNote: function(note) {
            this.$emit('editNote', note);
        },
        orderNotes: function(e) {
            this.$emit('orderNotes', e);
        },
        deleteNote: function(note) {
            this.$emit('deleteNote', note);
        },
        toggleHideChecked: function(to) {
            this.hideChecked = typeof to === "boolean" ? to : !this.hideChecked;
        },
        setGetList: function(to, forceget) {
            this.$emit('setGetList', to, forceget);
        },
        naviList: function() {
            var lists = this.getLists;
            var listsn = this.getListsN;

            var getList = this.getList;

            var getListI = lists.indexOf(getList);

            console.log("Navigating list", getList, getListI);

            if (getListI !== -1) {
                this.$emit('setGetList', getList);

                var path = '/app/' + listsn[getListI];

                Router.navigate(path);
            } else {
                this.$emit('setGetList', "local");

                var path = '/app/local';

                Router.navigate(path);
            }

            return path;
        }
    },
    template: `
        <div>
            <div v-if="isLoggedIn">
                <div class="empty">
                    <div class="empty-icon">
                        <i class="mdi">{{ listIcon }}</i>
                    </div>
                    <p class="empty-title h5">
                        You have {{ p_noteList !== null ? p_noteList.length : 'no' }} {{ curList }} {{ hideChecked ? 'ticked ' : '' }} note{{ p_noteList.length === 1 ? '' : 's' }}
                        <span v-if="searchFor"><i>containing</i> <mark>{{ searchFor }}</mark></span>
                    </p>
                    <p class="empty-subtitle">Add new notes and tick your completed tasks!</p>
                    <div class="empty-action">
                        <button class="btn btn-primary btn-action" v-on:click.prevent="setGetList(getList, true)"><i class="mdi">refresh</i></button>
                        <button class="btn btn-primary btn-action"
                        v-on:click.prevent="setGetList(getList === 'l' ? 's' : (getList === 's' ? 'l' : (getList === 'sh' ? 'osh' : (getList === 'osh' ? 'sh' : 'l'))))">
                            <i class="mdi">{{ listIcon }}</i>
                        </button>
                        <button class="btn btn-primary btn-action" v-on:click.prevent="addNote"><i class="mdi">add</i></button>
                        <button class="btn btn-secondary" v-on:click.prevent="toggleHideChecked">{{ hideChecked ? 'Show ticked' : 'Hide ticked' }}</button>
                    </div>
                    <!--<h5 v-if="searchFor"><br>{{ p_noteList.length }} search-results for <mark>{{ searchFor }}</mark></h5>-->
                </div>
                <note-list v-if="p_noteList !== null && p_noteList.length > 0"
                v-bind:noteList="p_noteList" v-bind:hideChecked="hideChecked" v-bind:searchFor="searchFor"
                v-bind:colors="colors"
                v-on:editNote="editNote" v-on:todoToggle="todoToggle" v-on:colorChange="colorChange" v-on:orderNotes="orderNotes"
                v-on:deleteNote="deleteNote"></note-list>
            </div>
            <div v-else>
                <h1>Thundote</h1>
                <h4>Please <a href="#" v-on:click.prevent="logIn">log in</a> to use Thundote!</h4>
            </div>
        </div>
    `
};

module.exports = Home;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\router_pages\\home.js","/src\\router_pages")

},{"../router.js":26,"_process":19,"buffer":3,"vue/dist/vue.min.js":23}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

var Note = {
    beforeMount: function() {
        this.$emit('getNoteList');
        console.log("Opened note", Router.currentParams.uuid, this.getList, this.noteList, this.searchFor);
    },
    props: {
        userInfo: Object,
        siteInfo: Object,
        getList: String,
        getLists: Array,
        getListsN: Array,
        colors: Array,
        noteList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        searchFor: String
    },
    computed: {
        note: function() {
            var uuid = Router.currentParams.uuid;
            var nid;

            if (this.noteList === null) return {
                "uuid": uuid,
                "title": "",
                "body": "",
                "todoCheck": "",
                "lastedited": "",
                "encrypted": false
            };

            var editableNotes = this.noteList.filter(function(a, b) {
                nid = a.uuid === uuid ? b : nid;
                return a.uuid === uuid;
            });
            if (editableNotes.length !== 1) return false;

            return editableNotes[0];
        },
        isLoggedIn: function() {
            if (this.userInfo == null) return false;
            return this.userInfo.cert_user_id != null;
        },
        curList: function() {
            var lists = this.getLists;
            var listsn = this.getListsN;
            return listsn[lists.indexOf(this.getList)];
        }
    },
    methods: {
        goto: function(to) {
            Router.navigate(to);
        },
        setSearch: function(s) {
            this.searchFor = s;
            console.log("Searching", s);
            this.$emit('setSearch', s);
        },
        todoToggle: function(to) {
            this.$emit('todoToggle', this.note, to);
        },
        colorChange: function(to) {
            this.$emit('colorChange', this.note, to);
        },
        editNote: function() {
            this.$emit('editNote', this.note);
        },
        deleteNote: function() {
            this.$emit('deleteNote', this.note);
            this.goto('/app/' + this.curList);
        }
    },
    template: `
        <div class="modal-lg modal active">
            <div v-bind:class="'modal-overlay bg-color-i-' + (note.color ? note.color : 'grey-100')" v-on:click.prevent="goto('/app/' + curList)"></div>
            <div v-bind:class="'modal-container bg-color-' + (note.color ? note.color : 'grey-100')">
                <div class="modal-header">
                    <button class="btn btn-action btn-link color-grey-900 float-right tooltip tooltip-bottom" data-tooltip="Close editor" v-on:click.prevent="goto('/app/' + curList)">
                        <i class="icon icon-cross"></i>
                    </button>
                    <div class="modal-title h5">
                        <div class="input-group">
                            <input type="text" v-bind:class="'form-input color-grey-800 bg-color-' + (note.color ? note.color : 'grey-100')" placeholder="Title" v-model="note.title" v-on:change="editNote" />
                            <button v-bind:class="'btn btn-action color-grey-900 input-group-btn tooltip tooltip-bottom bg-color-' + (note.color ? note.color : 'grey-100')" v-bind:data-tooltip="note.todoCheck ? 'Un-tick!' : 'Tick!'" v-on:click.prevent="todoToggle">
                                <i v-bind:class="'icon icon-' + (note.todoCheck ? 'check' : 'plus')"></i>
                            </button>
                        </div>
                    </div>
                    <div class="modal-subtitle color-grey-600">{{ moment(note.lastedited, "x").format("MMMM Do, YYYY - HH:mm:ss") }}</div>
                </div>
                <div class="modal-body" style="height: 50vh;">
                    <div class="content" style="height: 100%;">
                        <div class="col-12" style="height: 100%;">
                            <textarea style="height: 100%; resize: none;" v-bind:class="'form-input color-grey-800 bg-color-' + (note.color ? note.color : 'grey-100')" placeholder="Content" v-model="note.body" v-on:change="editNote"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="text-align: left;">
                    <button class="btn btn-action btn-link color-grey-900 tooltip tooltip-bottom" data-tooltip="Share"><i class="mdi">share</i></button>
                    <button class="btn btn-action btn-link color-grey-900 tooltip tooltip-bottom" data-tooltip="Encrypt"><i class="mdi">lock_outline</i></button>
                    <div class="popover">
                        <button class="btn btn-action btn-link color-grey-900 tooltip tooltip-bottom" data-tooltip="Color"><i class="mdi">color_lens</i></button>
                        <div class="popover-container">
                            <div class="card">
                                <div class="card-body">
                                    <button v-for="(color) in colors"
                                    v-bind:class="'btn btn-action m-5 tooltip tooltip-bottom circle bg-color-' + color"
                                    style="width: 1.5rem; height: 1.5rem;"
                                    v-bind:data-tooltip="color" v-on:click.prevent="colorChange(color)">
                                        <div v-if="(note.color ? note.color : 'grey-100') === color" class="icon icon-check color-grey-900"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="dropdown">
                        <a href="#" class="btn btn-link color-grey-900 dropdown-toggle" tabindex="0">
                            <i class="mdi">more_vert</i>
                        </a>
                        <ul class="menu">
                            <li class="menu-item"></li>
                        </ul>
                    </div>-->
                    <button class="btn btn-action btn-link color-grey-900 float-right tooltip tooltip-bottom" data-tooltip="Delete" v-on:click.prevent="deleteNote"><i class="mdi">delete_forever</i></button>
                </div>
            </div>
        </div>
    `
};

module.exports = Note;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\router_pages\\note.js","/src\\router_pages")

},{"../router.js":26,"_process":19,"buffer":3,"vue/dist/vue.min.js":23}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

var Reminders = {
    beforeMount: function() {
        if (this.userInfo == null || this.userInfo.cert_user_id == null) {
            Router.navigate('');
            console.log("Redirected to LP", this.userInfo);
        } else {
            this.$emit('getReminders');
        }
    },
    props: {
        userInfo: Object,
        siteInfo: Object,
        checkReminders: Function,
        reminders: Array
    },
    template: `
        <div>
            <h1>Reminders</h1>
            <ul v-if="checkReminders != false">
                <li v-for="(reminder, i) in reminders">
                    {{ i }} :: {{ JSON.stringify(reminder) }}
                </li>
            </ul>
            <div v-else>
                <h5>You have no reminders.</h5>
            </div>
        </div>
    `
};

module.exports = Reminders;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\router_pages\\reminders.js","/src\\router_pages")

},{"../router.js":26,"_process":19,"buffer":3,"vue/dist/vue.min.js":23}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

var Settings = {
    template: `
        <div>
            <h1>Settings</h1>
        </div>
    `
};

module.exports = Settings;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\router_pages\\settings.js","/src\\router_pages")

},{"../router.js":26,"_process":19,"buffer":3,"vue/dist/vue.min.js":23}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
//export default MyPlugin;
var Router = require("./router.js");

const VueRouteLink = {
    props: ['to'],
    template: '<a v-bind:href="getHref" v-on:click.prevent="goto" v-bind:class="{ \'is-active\': active }"><slot></slot></a>',
    methods: {
        goto: function() {
            Router.navigate(this.to);
        }
    },
    computed: {
        active: function() {
            if (Router.currentRoute === this.to) {
                return true;
            }
            return false;
        },
        getHref: function() { // Middle Click - open in new tab
            return "./?/" + this.to;
        }
    }
};

const VueZeroFrameRouter = {
    routes: null,
    install(Vue) {
        Vue.component('route-link', VueRouteLink);
    }
};

function VueZeroFrameRouter_Init(Router, vueInstance, routes) {
    VueZeroFrameRouter.routes = routes;
    for (var i = 0; i < routes.length; i++) {
        Router.add(routes[i].route, !routes[i].component.init ? function() {} : routes[i].component.init, {
            before: !routes[i].component.before ? function() { return true; } : routes[i].component.before,
            after: !routes[i].component.after ? function() {} : routes[i].component.after,
            leave: !routes[i].component.leave ? function() {} : routes[i].component.leave
        }, routes[i].component);
    }
    Router.vueInstance = vueInstance;
    Router.setView = function(i, object) {
        this.vueInstance.currentView = object;
    }
    Router.init();
}

module.exports = {
    VueZeroFrameRouter: VueZeroFrameRouter,
    VueZeroFrameRouter_Init: VueZeroFrameRouter_Init
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\vue-zeroframe-router.js","/src")

},{"./router.js":26,"_process":19,"buffer":3}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

Vue.component("avatar-img", {
    props: {
        cert_user_id: String,
        size: {
            validator: function(value) {
                var sizes = ["", "xs", "sm", "lg", "xl"];

                return sizes.indexOf(value) !== -1;
            },
            default: ""
        }
    },
    computed: {
        initials: function() {
            return this.cert_user_id.substr(0, 2);
        },
        pixelSize: function() {
            var size = this.size;

            var sizes = ["", "xs", "sm", "lg", "xl"];
            var sizes2 = [1.6, .8, 1.2, 2.4, 3.2];

            var i = sizes.indexOf(size);

            if (i !== -1) return sizes2[i];
            else return 1.6;
        }
    },
    template: `
        <div>
            <figure v-if="this.cert_user_id" v-bind:class="'avatar ' + (this.size ? 'avatar-' + this.size : '')" v-bind:data-initial="initials"></figure>
            <i v-else class="mdi circle" v-bind:style="'font-size: ' + pixelSize + 'rem; width: ' + pixelSize + 'rem; height: ' + pixelSize + 'rem; background: #1de9b6;'">account_circle</i>
        </div>
    `
});

Vue.component("avatar", {
    props: {
        cert_user_id: String,
        size: {
            validator: function(value) {
                var sizes = ["", "xs", "sm", "lg", "xl"];

                return sizes.indexOf(value) !== -1;
            },
            default: ""
        }
    },
    computed: {
        initials: function() {
            return this.cert_user_id.substr(0, 2);
        }
    },
    template: `
        <div class="tile tile-centered">
            <div class="tile-icon">
                <avatar-img v-bind:cert_user_id="this.cert_user_id" v-bind:size="this.size"></avatar-img>
            </div>
            <div class="tile-content">
                <span>{{ this.cert_user_id }}</span>
            </div>
        </div>
    `
});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\vue_components\\avatar.js","/src\\vue_components")

},{"../router.js":26,"_process":19,"buffer":3,"vue/dist/vue.min.js":23}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

Vue.component("navbar", {
    props: ['userInfo'],
    data: function() {
        return {
            searchFor: '',
            menuShown: false
        }
    },
    computed: {
        isLoggedIn: function() {
            if (this.userInfo == null) return false;
            return this.userInfo.cert_user_id != null;
        }
    },
    methods: {
        toggleMenu: function(to) {
            if (typeof to === "boolean")
                this.menuShown = to;
            else
                this.menuShown = !this.menuShown;
        },
        toggleLeftSidebar: function() {
            this.$emit('toggleLeftSidebar');
        },
        logIn: function() {
            this.$emit('logIn');
        },
        logOut: function() {
            this.$emit('logOut');
        },
        goto: function(to) {
            this.menuShown = false;
            Router.navigate(to);
        },
        setSearch: function(s) {
            this.searchFor = s;
            console.log("Searching", s);
            this.$emit('setSearch', s);
        }
    },
    template: `
        <header class="navbar fixed">
            <nav class="navbar container grid-lg">
                <section class="navbar-section">
                    <a class="off-canvas-toggle btn btn-link btn-action" href="#sidebar-left" v-on:click.prevent="toggleLeftSidebar">
                        <i class="icon icon-menu"></i>
                    </a>
                </section>
                <section class="navbar-center">
                    <div class="input-group input-inline">
                        <input class="form-input" type="text" placeholder="search" v-bind:value="searchFor"
                        v-on:input="setSearch($event.target.value)">
                        <button class="btn btn-link btn-action input-group-btn"><i class="icon icon-search"></i></button>
                    </div>
                </section>
                <section class="navbar-section">
                    <div class="dropdown dropdown-right" v-bind:class="{'active': menuShown}">
                        <button class="btn btn-action btn-lg btn-link circle dropdown-btn" tabindex="0" v-on:focus="toggleMenu(true)" v-on:mousedown="toggleMenu" v-on:blur="toggleMenu(false)">
                            <div style="margin-top: -.3rem;">
                                <avatar-img v-if="isLoggedIn" v-bind:cert_user_id="userInfo.cert_user_id"></avatar-img>
                                <avatar-img v-else cert_user_id=""></avatar-img>
                            </div>
                        </button>
                        <ul class="menu light">
                            <li class="menu-item">
                                <avatar v-if="isLoggedIn" v-bind:cert_user_id="userInfo.cert_user_id" size="xl"></avatar>
                                <avatar v-else cert_user_id="" size="xl"></avatar>
                            </li>
                            <li class="divider"></li>
                            <li class="menu-item">
                                <a v-if="isLoggedIn" href="#Select+user" id="select_user" v-on:click.prevent="logOut">
                                    Log out
                                </a>
                                <a v-else href="#Select+user" id="select_user" v-on:click.prevent="logIn">
                                    Log in
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </nav>
        </header>
    `
});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\vue_components\\navbar.js","/src\\vue_components")

},{"../router.js":26,"_process":19,"buffer":3,"vue/dist/vue.min.js":23}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

Vue.component("note-card", {
    props: ["cert_user_id", "noteData", "colors"],
    data: function() {
        return {
            moreMenuActive: false,
            note: this.noteData
        }
    },
    computed: {},
    methods: {
        goto: function(to) {
            Router.navigate(to);
        },
        todoToggle: function(to) {
            console.log("Todo-Toggle", this.note, to);
            this.$emit('todoToggle', this.note, to);
        },
        colorChange: function(to) {
            console.log("Color-Change", this.note, to);
            this.$emit('colorChange', this.note, to);
        },
        editNote: function() {
            console.log("Edit note", this.note);
            this.$emit('editNote', this.note);
        },
        openEditor: function() {
            console.log("Open editor", this.note);
            this.goto('/note/' + this.note.uuid);
        },
        deleteNote: function() {
            console.log("Delete note", this.note);
            this.$emit('deleteNote', this.note);
        },
        toggleMoreMenu: function(to) {
            console.log("Toggle more menu", to, this.moreMenuActive);
            if (typeof to === "boolean")
                this.moreMenuActive = to;
            else
                this.moreMenuActive = !this.moreMenuActive;
        }
    },
    template: `
        <div v-bind:class="'card color-grey-800 bg-color-' + (note.color ? note.color : 'grey-100')" v-bind:data-ticked="note.todoCheck ? 'true' : 'false'" v-on:focusout="toggleMoreMenu(false)">
            <div class="card-header">
                <button class="btn btn-action btn-link color-grey-900 btn-sm nohoverhide float-right tooltip tooltip-bottom" v-bind:data-tooltip="note.todoCheck ? 'Un-tick!' : 'Tick!'" v-on:click.prevent="todoToggle">
                    <i v-bind:class="'icon icon-' + (note.todoCheck ? 'check' : 'plus')"></i>
                </button>
                <div v-bind:class="'card-title h5 text-break text-ellipsis ' + (note.todoCheck ? 'color-grey-600' : '')" v-on:click.prevent="openEditor">{{ note.title }}</div>
                <small class="card-subtitle color-grey-600 nohoverhide" v-on:click.prevent="openEditor">{{ moment(note.lastedited, "x").format("MMMM Do, YYYY - HH:mm:ss") }}</small>
            </div>
            <div v-bind:class="'card-body text-break text-ellipsis ' + (note.todoCheck ? 'color-grey-600' : '')"
            style="white-space: pre-line;"
            v-on:click.prevent="openEditor">{{ note.body }}</div>
            <div v-bind:class="'card-footer nohoverhide ' + (moreMenuActive ? 'active' : '') + ' bg-color-' + (note.color ? note.color : 'grey-100')">
                <button class="btn btn-action btn-link color-grey-900 tooltip tooltip-bottom" data-tooltip="Open editor" v-on:click.prevent="openEditor"><i class="mdi">mode_edit</i></button>
                <div class="popover">
                    <button class="btn btn-action btn-link color-grey-900 tooltip tooltip-bottom" data-tooltip="Color"><i class="mdi">color_lens</i></button>
                    <div class="popover-container">
                        <div class="card">
                            <div class="card-body">
                                <button v-for="(color) in colors"
                                v-bind:class="'btn btn-action m-5 tooltip tooltip-bottom circle bg-color-' + color"
                                style="width: 1.5rem; height: 1.5rem;"
                                v-bind:data-tooltip="color" v-on:click.prevent="colorChange(color)">
                                    <div v-if="(note.color ? note.color : 'grey-100') === color" class="icon icon-check color-grey-900"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-bind:class="'dropdown ' + (moreMenuActive ? 'active' : '')">
                    <button class="btn btn-action btn-link color-grey-900 dropdown-toggle" tabindex="0" v-on:focus="toggleMoreMenu(true)" v-on:mousedown="toggleMoreMenu" v-on:blur="toggleMoreMenu(false)">
                        <i class="mdi">more_vert</i>
                    </button>
                    <ul class="menu text-light">
                        <li class="menu-item">
                            <a href="#" v-on:click.prevent="">Share</a>
                        </li>
                        <li class="menu-item">
                            <a href="#" v-on:click.prevent="">Set up reminder</a>
                        </li>
                        <li class="menu-item">
                            <a href="#" v-on:click.prevent="">Encrypt</a>
                        </li>
                        <li class="menu-item divider"></li>
                        <li class="menu-item">
                            <a href="#" v-on:click.prevent="deleteNote">Delete</a>
                        </li>
                    </ul>
                </div>
                <!--<button class="btn btn-action btn-link color-grey-900 float-right tooltip tooltip-bottom" data-tooltip="Delete" v-on:click.prevent="deleteNote"><i class="mdi">delete_forever</i></button>-->
            </div>
        </div>
    `
});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\vue_components\\note.js","/src\\vue_components")

},{"../router.js":26,"_process":19,"buffer":3,"vue/dist/vue.min.js":23}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Vue = require("vue/dist/vue.min.js");
var Router = require("../router.js");

Packery = require("packery");
Draggabilly = require("draggabilly");

var makeDraggie = function(iso) {

    /*
    UNBIND NEEDS TO BE DONE AS WELL!!
    OR JUST BIND TO THE NEW ELEMENTS..
    */

    console.log(iso);
    iso.getItemElements().forEach(function(gridItem, i) {
        var draggie = new Draggabilly(gridItem);

        iso.bindDraggabillyEvents(draggie);
    });
};

Vue.component('note-list', {
    mounted: function() {
        var grid = document.querySelector('.grid');

        this.iso = new Packery('.grid', {
            itemSelector: '.grid-item',
            gutter: 0,
            stagger: 50,
            transitionDuration: 150,
            percentPosition: true,
            getSortData: {
                index: '[index]'
            },
            sortBy: 'index',
            sortAscending: true
        });

        this.iso.on('dragItemPositioned', this.orderNotes);

        console.log("Binding Masonry", this.$el, grid, this.iso);

        var dis = this;

        this.$nextTick(function() {
            dis.iso.reloadItems();
            dis.iso.layout();
            makeDraggie(dis.iso);
        });
    },
    props: {
        hideChecked: {
            type: Boolean,
            default: false
        },
        searchFor: {
            type: String,
            default: ''
        },
        noteList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        colors: Array
    },
    data: function() {
        return {
            hideChecked: this.hideChecked || false,
            noteList: this.noteList || []
        }
    },
    computed: {
        r_noteList: function() {
            return this.noteList.slice(0).reverse();
        },
        p_noteList: function() {
            var dis = this;

            this.$nextTick(function() {
                dis.iso.reloadItems();
                dis.iso.layout();
            });

            return this.r_noteList;
        }
    },
    watch: {
        noteList: function() {
            this.iso.destroy();

            var grid = document.querySelector('.grid');

            this.iso = new Packery('.grid', {
                itemSelector: '.grid-item',
                gutter: 0,
                stagger: 50,
                transitionDuration: 150,
                percentPosition: true,
                getSortData: {
                    index: '[index]'
                },
                sortBy: 'index',
                sortAscending: true
            });

            this.iso.on('dragItemPositioned', this.orderNotes);

            console.log("Binding Masonry", this.$el, grid, this.iso);

            var dis = this;

            this.$nextTick(function() {
                dis.iso.reloadItems();
                dis.iso.layout();
                makeDraggie(dis.iso);
            });
        }
    },
    methods: {
        todoToggle: function(note, to) {
            this.$emit('todoToggle', note, to);
        },
        colorChange: function(note, to) {
            this.$emit('colorChange', note, to);
        },
        editNote: function(note) {
            this.iso.reloadItems();
            makeDraggie(this.iso);

            this.$emit('editNote', note);
        },
        orderNotes: function(e) {
            this.$emit('orderNotes', e);
        },
        deleteNote: function(note) {
            this.iso.reloadItems();
            makeDraggie(this.iso);

            this.$emit('deleteNote', note);
        }
    },
    template: `
        <div v-if="noteList !== null" class="grid">
            <note-card v-bind:class="'grid-item'" v-for="(note, i) in p_noteList"
            v-bind:index="i" v-bind:key="note.uuid" v-bind:noteData="note" 
            v-bind:colors="colors"
            v-on:editNote="editNote" v-on:todoToggle="todoToggle" v-on:colorChange="colorChange"
            v-on:deleteNote="deleteNote"></note-card>
        </div>
    `
});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\vue_components\\noteLists.js","/src\\vue_components")

},{"../router.js":26,"_process":19,"buffer":3,"draggabilly":5,"packery":16,"vue/dist/vue.min.js":23}]},{},[25])

//# sourceMappingURL=bundle.js.map
