/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/1P1ETdC5pjJJur1rLPVuK5LmKoMnqpLzkW/app/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "0746":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "387f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommPostView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("557a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommPostView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommPostView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommPostView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4cff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "557a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.copy-within.js
var es6_array_copy_within = __webpack_require__("744f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.fill.js
var es6_array_fill = __webpack_require__("6c7b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
var es6_array_from = __webpack_require__("1c4c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.of.js
var es6_array_of = __webpack_require__("e804");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.species.js
var es6_array_species = __webpack_require__("d04f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.date.to-json.js
var es6_date_to_json = __webpack_require__("0298");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.date.to-primitive.js
var es6_date_to_primitive = __webpack_require__("c8ce");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.has-instance.js
var es6_function_has_instance = __webpack_require__("217b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.map.js
var es6_map = __webpack_require__("f400");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.acosh.js
var es6_math_acosh = __webpack_require__("7f25");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.asinh.js
var es6_math_asinh = __webpack_require__("536b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.atanh.js
var es6_math_atanh = __webpack_require__("d9ab");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.cbrt.js
var es6_math_cbrt = __webpack_require__("f9ab");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.clz32.js
var es6_math_clz32 = __webpack_require__("32d7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.cosh.js
var es6_math_cosh = __webpack_require__("25c9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.expm1.js
var es6_math_expm1 = __webpack_require__("9f3c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.fround.js
var es6_math_fround = __webpack_require__("042e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.hypot.js
var es6_math_hypot = __webpack_require__("c7c6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.log1p.js
var es6_math_log1p = __webpack_require__("049f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.log10.js
var es6_math_log10 = __webpack_require__("7872");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.log2.js
var es6_math_log2 = __webpack_require__("a69f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.sign.js
var es6_math_sign = __webpack_require__("0b21");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.sinh.js
var es6_math_sinh = __webpack_require__("6c1a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.tanh.js
var es6_math_tanh = __webpack_require__("c7c62");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.trunc.js
var es6_math_trunc = __webpack_require__("84b4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.epsilon.js
var es6_number_epsilon = __webpack_require__("2e37");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-finite.js
var es6_number_is_finite = __webpack_require__("fca0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-integer.js
var es6_number_is_integer = __webpack_require__("7cdf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-nan.js
var es6_number_is_nan = __webpack_require__("ee1d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-safe-integer.js
var es6_number_is_safe_integer = __webpack_require__("b1b1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.max-safe-integer.js
var es6_number_max_safe_integer = __webpack_require__("87f3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.min-safe-integer.js
var es6_number_min_safe_integer = __webpack_require__("9278");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.parse-float.js
var es6_number_parse_float = __webpack_require__("5df2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.parse-int.js
var es6_number_parse_int = __webpack_require__("04ff");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.define-getter.js
var es7_object_define_getter = __webpack_require__("4504");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.define-setter.js
var es7_object_define_setter = __webpack_require__("fee7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.entries.js
var es7_object_entries = __webpack_require__("ffc1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.freeze.js
var es6_object_freeze = __webpack_require__("0d6d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js
var es6_object_get_own_property_descriptor = __webpack_require__("9986");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.get-own-property-names.js
var es6_object_get_own_property_names = __webpack_require__("25db");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.get-prototype-of.js
var es6_object_get_prototype_of = __webpack_require__("e4f7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.lookup-getter.js
var es7_object_lookup_getter = __webpack_require__("b9a1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.lookup-setter.js
var es7_object_lookup_setter = __webpack_require__("64d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.prevent-extensions.js
var es6_object_prevent_extensions = __webpack_require__("9aea");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.is.js
var es6_object_is = __webpack_require__("db97");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.is-frozen.js
var es6_object_is_frozen = __webpack_require__("66c8");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.is-sealed.js
var es6_object_is_sealed = __webpack_require__("57f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.is-extensible.js
var es6_object_is_extensible = __webpack_require__("165b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.seal.js
var es6_object_seal = __webpack_require__("cf6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.set-prototype-of.js
var es6_object_set_prototype_of = __webpack_require__("fd24");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.values.js
var es7_object_values = __webpack_require__("8615");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.apply.js
var es6_reflect_apply = __webpack_require__("df1b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.construct.js
var es6_reflect_construct = __webpack_require__("2397");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.define-property.js
var es6_reflect_define_property = __webpack_require__("88ca");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.delete-property.js
var es6_reflect_delete_property = __webpack_require__("ba16");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.get.js
var es6_reflect_get = __webpack_require__("d185");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js
var es6_reflect_get_own_property_descriptor = __webpack_require__("ebde");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js
var es6_reflect_get_prototype_of = __webpack_require__("2d34");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.has.js
var es6_reflect_has = __webpack_require__("f6b3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.is-extensible.js
var es6_reflect_is_extensible = __webpack_require__("2251");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.own-keys.js
var es6_reflect_own_keys = __webpack_require__("c698");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js
var es6_reflect_prevent_extensions = __webpack_require__("a19f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.set.js
var es6_reflect_set = __webpack_require__("9253");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js
var es6_reflect_set_prototype_of = __webpack_require__("9275");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.flags.js
var es6_regexp_flags = __webpack_require__("3846");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.search.js
var es6_regexp_search = __webpack_require__("386d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.set.js
var es6_set = __webpack_require__("4f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__("8a81");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__("ac4d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.code-point-at.js
var es6_string_code_point_at = __webpack_require__("a032");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.ends-with.js
var es6_string_ends_with = __webpack_require__("aef6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.from-code-point.js
var es6_string_from_code_point = __webpack_require__("5695");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.string.pad-start.js
var es7_string_pad_start = __webpack_require__("f576");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.string.pad-end.js
var es7_string_pad_end = __webpack_require__("ed50");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.raw.js
var es6_string_raw = __webpack_require__("788d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.repeat.js
var es6_string_repeat = __webpack_require__("14b9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __webpack_require__("f559");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.array-buffer.js
var es6_typed_array_buffer = __webpack_require__("c66f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.int8-array.js
var es6_typed_int8_array = __webpack_require__("b05c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.uint8-array.js
var es6_typed_uint8_array = __webpack_require__("34ef");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js
var es6_typed_uint8_clamped_array = __webpack_require__("6aa2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.int16-array.js
var es6_typed_int16_array = __webpack_require__("15ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.uint16-array.js
var es6_typed_uint16_array = __webpack_require__("af56");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.int32-array.js
var es6_typed_int32_array = __webpack_require__("b6e4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.uint32-array.js
var es6_typed_uint32_array = __webpack_require__("9c29");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.float32-array.js
var es6_typed_float32_array = __webpack_require__("63d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.typed.float64-array.js
var es6_typed_float64_array = __webpack_require__("4dda");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.weak-map.js
var es6_weak_map = __webpack_require__("10ad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.weak-set.js
var es6_weak_set = __webpack_require__("c02b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__("4795");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.immediate.js
var web_immediate = __webpack_require__("130f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/index.js + 10 modules
var lib = __webpack_require__("bb71");

// EXTERNAL MODULE: ./node_modules/vuetify/src/stylus/app.styl
var app = __webpack_require__("da64");

// CONCATENATED MODULE: ./src/plugins/vuetify.js



vue_runtime_esm["a" /* default */].use(lib["a" /* default */], {
  iconfont: 'md'
});
// EXTERNAL MODULE: ./src/assets/css/icons.css
var icons = __webpack_require__("0746");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=396546ac&
var Appvue_type_template_id_396546ac_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app',[_c('Navigator'),_c('v-content',[_c('v-container',{attrs:{"fluid":""}},[_c('router-view')],1)],1),_c('MobNav')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=396546ac&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Navigator.vue?vue&type=template&id=94ec2730&
var Navigatorvue_type_template_id_94ec2730_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-toolbar',{staticClass:"hidden-sm-and-down deep-purple lighten-1 white--text",attrs:{"tabs":"","app":""}},[_c('v-toolbar-title',{staticClass:"headline text-uppercase"},[_vm._v("\n    ZeroVue\n  ")]),_c('v-toolbar-items',{staticClass:"hidden-sm-and-down ml-4"},[_c('v-btn',{staticClass:"title white--text",attrs:{"flat":"","to":"/"}},[_vm._v("视频")]),_c('v-btn',{staticClass:"title white--text",attrs:{"flat":"","to":"/gif"}},[_vm._v("动图")]),_c('v-btn',{staticClass:"title white--text",attrs:{"flat":"","to":"/photo"}},[_vm._v("图片")]),_c('v-btn',{staticClass:"title white--text",attrs:{"flat":"","to":"/publish"}},[_vm._v("发布")])],1)],1)}
var Navigatorvue_type_template_id_94ec2730_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Navigator.vue?vue&type=template&id=94ec2730&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__("6544");
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js + 3 modules
var VBtn = __webpack_require__("8336");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VToolbar/VToolbar.js + 1 modules
var VToolbar = __webpack_require__("71d9");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VToolbar/index.js + 2 modules
var components_VToolbar = __webpack_require__("2a7f");

// CONCATENATED MODULE: ./src/components/Navigator.vue

var script = {}


/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  Navigatorvue_type_template_id_94ec2730_render,
  Navigatorvue_type_template_id_94ec2730_staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Navigator.vue"
/* harmony default export */ var Navigator = (component.exports);

/* vuetify-loader */





installComponents_default()(component, {
  VBtn: VBtn["a" /* default */],
  VToolbar: VToolbar["a" /* default */],
  VToolbarItems: components_VToolbar["a" /* VToolbarItems */],
  VToolbarTitle: components_VToolbar["b" /* VToolbarTitle */],
})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MobNav.vue?vue&type=template&id=0435dd45&
var MobNavvue_type_template_id_0435dd45_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-bottom-nav',{staticClass:"hidden-sm-and-up",attrs:{"active":_vm.bottomNav,"value":true,"fixed":"","app":""},on:{"update:active":function($event){_vm.bottomNav=$event}}},[_c('v-btn',{attrs:{"color":"deep-purple","to":"/","flat":"","value":"video"}},[_c('span',[_vm._v("视频")]),_c('v-icon',[_vm._v("movie")])],1),_c('v-btn',{attrs:{"color":"deep-purple","to":"/gif","flat":"","value":"gif"}},[_c('span',[_vm._v("动图")]),_c('v-icon',[_vm._v("gif")])],1),_c('v-btn',{attrs:{"color":"deep-purple","to":"/photo","flat":"","value":"photo"}},[_c('span',[_vm._v("图片")]),_c('v-icon',[_vm._v("image")])],1),_c('v-btn',{attrs:{"color":"deep-purple","to":"/publish","flat":"","value":"publish"}},[_c('span',[_vm._v("发布")]),_c('v-icon',[_vm._v("publish")])],1)],1)}
var MobNavvue_type_template_id_0435dd45_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/MobNav.vue?vue&type=template&id=0435dd45&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MobNav.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var MobNavvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      bottomNav: "video"
    };
  }
});
// CONCATENATED MODULE: ./src/components/MobNav.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MobNavvue_type_script_lang_js_ = (MobNavvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBottomNav/VBottomNav.js + 3 modules
var VBottomNav = __webpack_require__("887a");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js + 1 modules
var VIcon = __webpack_require__("132d");

// CONCATENATED MODULE: ./src/components/MobNav.vue





/* normalize component */

var MobNav_component = Object(componentNormalizer["a" /* default */])(
  components_MobNavvue_type_script_lang_js_,
  MobNavvue_type_template_id_0435dd45_render,
  MobNavvue_type_template_id_0435dd45_staticRenderFns,
  false,
  null,
  null,
  null
  
)

MobNav_component.options.__file = "MobNav.vue"
/* harmony default export */ var MobNav = (MobNav_component.exports);

/* vuetify-loader */




installComponents_default()(MobNav_component, {
  VBottomNav: VBottomNav["a" /* default */],
  VBtn: VBtn["a" /* default */],
  VIcon: VIcon["a" /* default */],
})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'App',
  components: {
    Navigator: Navigator,
    MobNav: MobNav
  },
  data: function data() {
    return {//
    };
  }
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VApp/VApp.js + 6 modules
var VApp = __webpack_require__("7496");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js
var VContainer = __webpack_require__("a523");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContent.js
var VContent = __webpack_require__("549c");

// CONCATENATED MODULE: ./src/App.vue





/* normalize component */

var App_component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  Appvue_type_template_id_396546ac_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

App_component.options.__file = "App.vue"
/* harmony default export */ var App = (App_component.exports);

/* vuetify-loader */




installComponents_default()(App_component, {
  VApp: VApp["a" /* default */],
  VContainer: VContainer["a" /* default */],
  VContent: VContent["a" /* default */],
})

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/VideoView.vue?vue&type=template&id=5d613bdf&
var VideoViewvue_type_template_id_5d613bdf_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('post-view',{attrs:{"fileType":"video"},on:{"click":_vm.onItemClick}})}
var VideoViewvue_type_template_id_5d613bdf_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/VideoView.vue?vue&type=template&id=5d613bdf&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommPostView.vue?vue&type=template&id=fa6515be&
var CommPostViewvue_type_template_id_fa6515be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('List',{attrs:{"title":_vm.fileType,"items":_vm.items},on:{"click":function (data, event){ return _vm.$emit('click', data, event); }}})}
var CommPostViewvue_type_template_id_fa6515be_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommPostView.vue?vue&type=template&id=fa6515be&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/List.vue?vue&type=template&id=5b3f5e08&
var Listvue_type_template_id_5b3f5e08_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[_c('v-layout',{attrs:{"justify-center":"","row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm9":"","lg9":""}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},_vm._l((_vm.items),function(ele,i){return _c('v-flex',{key:i,attrs:{"xs12":"","sm4":"","lg3":""}},[_c('v-card',[(ele.post_type == 'video')?_c('video',{attrs:{"width":"100%","height":"auto","preload":"auto","controls":"","controlsList":"nofullscreen nodownload noremoteplayback","no-referrer":"","src":((ele.statics[0].inner_path) + "#t=0.5")},on:{"click":function($event){_vm.itemClick(ele, $event)}}}):_c('img',{attrs:{"width":"100%","height":"auto","no-referrer":"","src":ele.statics[0].inner_path}}),_c('v-card-title',[_c('div',{staticClass:"text-truncate"},[_c('span',[_vm._v(_vm._s(ele.title))])])])],1)],1)}))],1)],1)],1)],1)}
var Listvue_type_template_id_5b3f5e08_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/List.vue?vue&type=template&id=5b3f5e08&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/List.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Listvue_type_script_lang_js_ = ({
  props: {
    title: String,
    items: Array
  },
  methods: {
    itemClick: function itemClick(item, event) {
      this.$emit('click', item, event);
    }
  }
});
// CONCATENATED MODULE: ./src/components/List.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Listvue_type_script_lang_js_ = (Listvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__("b0af");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCardTitle.js
var VCardTitle = __webpack_require__("12b2");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VFlex.js
var VFlex = __webpack_require__("0e8f");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VLayout.js
var VLayout = __webpack_require__("a722");

// CONCATENATED MODULE: ./src/components/List.vue





/* normalize component */

var List_component = Object(componentNormalizer["a" /* default */])(
  components_Listvue_type_script_lang_js_,
  Listvue_type_template_id_5b3f5e08_render,
  Listvue_type_template_id_5b3f5e08_staticRenderFns,
  false,
  null,
  null,
  null
  
)

List_component.options.__file = "List.vue"
/* harmony default export */ var List = (List_component.exports);

/* vuetify-loader */






installComponents_default()(List_component, {
  VCard: VCard["a" /* default */],
  VCardTitle: VCardTitle["a" /* default */],
  VContainer: VContainer["a" /* default */],
  VFlex: VFlex["a" /* default */],
  VLayout: VLayout["a" /* default */],
})

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("a34a");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./src/lib/ZeroFrame.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Version 1.0.0 - Initial release
// Version 1.1.0 (2017-08-02) - Added cmdp function that returns promise instead of using callback
// Version 1.2.0 (2017-08-02) - Added Ajax monkey patch to emulate XMLHttpRequest over ZeroFrame API
var CMD_INNER_READY = 'innerReady';
var CMD_RESPONSE = 'response';
var CMD_WRAPPER_READY = 'wrapperReady';
var CMD_PING = 'ping';
var CMD_PONG = 'pong';
var CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket';
var CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket';

var ZeroFrame =
/*#__PURE__*/
function () {
  function ZeroFrame(url) {
    _classCallCheck(this, ZeroFrame);

    this.url = url;
    this.waiting_cb = {};
    this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
    this.connect();
    this.next_message_id = 1;
    this.init();
  }

  _createClass(ZeroFrame, [{
    key: "init",
    value: function init() {
      return this;
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this = this;

      this.target = window.parent;
      window.addEventListener('message', function (e) {
        return _this.onMessage(e);
      }, false);
      this.cmd(CMD_INNER_READY);
    }
  }, {
    key: "onMessage",
    value: function onMessage(e) {
      var message = e.data;
      var cmd = message.cmd;

      if (cmd === CMD_RESPONSE) {
        if (this.waiting_cb[message.to] !== undefined) {
          this.waiting_cb[message.to](message.result);
        } else {
          this.log("Websocket callback not found:", message);
        }
      } else if (cmd === CMD_WRAPPER_READY) {
        this.cmd(CMD_INNER_READY);
      } else if (cmd === CMD_PING) {
        this.response(message.id, CMD_PONG);
      } else if (cmd === CMD_WRAPPER_OPENED_WEBSOCKET) {
        this.onOpenWebsocket();
      } else if (cmd === CMD_WRAPPER_CLOSE_WEBSOCKET) {
        this.onCloseWebsocket();
      } else {
        this.onRequest(cmd, message);
      }
    }
  }, {
    key: "onRequest",
    value: function onRequest(cmd, message) {
      this.log("Unknown request", message);
    }
  }, {
    key: "response",
    value: function response(to, result) {
      this.send({
        cmd: CMD_RESPONSE,
        to: to,
        result: result
      });
    }
  }, {
    key: "cmd",
    value: function cmd(_cmd) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.send({
        cmd: _cmd,
        params: params
      }, cb);
    }
  }, {
    key: "cmdp",
    value: function cmdp(cmd) {
      var _this2 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        _this2.cmd(cmd, params, function (res) {
          if (res && res.error) {
            reject(res.error);
          } else {
            resolve(res);
          }
        });
      });
    }
  }, {
    key: "send",
    value: function send(message) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id++;
      this.target.postMessage(message, '*');

      if (cb) {
        this.waiting_cb[message.id] = cb;
      }
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log.apply(console, ['[ZeroFrame]'].concat(args));
    }
  }, {
    key: "onOpenWebsocket",
    value: function onOpenWebsocket() {
      this.log('Websocket open');
    }
  }, {
    key: "onCloseWebsocket",
    value: function onCloseWebsocket() {
      this.log('Websocket close');
    }
  }, {
    key: "monkeyPatchAjax",
    value: function monkeyPatchAjax() {
      var _this3 = this;

      var page = this;
      XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;
      this.cmd("wrapperGetAjaxKey", [], function (res) {
        _this3.ajax_key = res;
      });

      var newOpen = function newOpen(method, url, async) {
        url += "?ajax_key=" + page.ajax_key;
        return this.realOpen(method, url, async);
      };

      XMLHttpRequest.prototype.open = newOpen;
    }
  }]);

  return ZeroFrame;
}();


// CONCATENATED MODULE: ./src/lib/Text.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Text_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Text_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Text_createClass(Constructor, protoProps, staticProps) { if (protoProps) Text_defineProperties(Constructor.prototype, protoProps); if (staticProps) Text_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var Text =
/*#__PURE__*/
function () {
  function Text() {
    Text_classCallCheck(this, Text);

    this.renderMarked = this.renderMarked.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
  }

  Text_createClass(Text, [{
    key: "toColor",
    value: function toColor(text, saturation, lightness) {
      if (saturation == null) {
        saturation = 30;
      }

      if (lightness == null) {
        lightness = 50;
      }

      var hash = 0;

      for (var i = 0, end = text.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
        hash += text.charCodeAt(i) * i;
        hash = hash % 1777;
      }

      return "hsl(".concat(hash % 360, ",".concat(saturation, "%,").concat(lightness, "%)"));
    }
  }, {
    key: "renderMarked",
    value: function renderMarked(text, options) {
      if (options == null) {
        options = {};
      }

      if (!text) {
        return "";
      }

      options["gfm"] = true;
      options["breaks"] = true;
      options["sanitize"] = true;
      options["renderer"] = marked_renderer;
      text = this.fixReply(text);
      text = marked(text, options);
      text = text.replace(/(@[^\x00-\x1f^\x21-\x2f^\x3a-\x40^\x5b-\x60^\x7b-\x7f]{1,16}):/g, '<b class="reply-name">$1</b>:'); // Highlight usernames

      return this.fixHtmlLinks(text);
    }
  }, {
    key: "renderLinks",
    value: function renderLinks(text) {
      text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); // Sanitize html tags

      text = text.replace(/(https?:\/\/[^\s)]+)/g, function (match) {
        return "<a href=\"".concat(match.replace(/&amp;/g, '&'), "\">").concat(match, "</a>");
      }); // UnSanitize &amp; -> & in links

      text = text.replace(/\n/g, '<br>');
      text = text.replace(/(@[^\x00-\x1f^\x21-\x2f^\x3a-\x40^\x5b-\x60^\x7b-\x7f]{1,16}):/g, '<b class="reply-name">$1</b>:');
      text = this.fixHtmlLinks(text);
      return text;
    }
  }, {
    key: "emailLinks",
    value: function emailLinks(text) {
      return text.replace(/([a-zA-Z0-9]+)@zeroid.bit/g, "<a href='?to=$1' onclick='return Page.message_create.show(\"$1\")'>$1@zeroid.bit</a>");
    } // Convert zeronet html links to relaitve

  }, {
    key: "fixHtmlLinks",
    value: function fixHtmlLinks(text) {
      // Fix site links
      text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110\/(Me.ZeroNetwork.bit|1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH)\/\?/gi, 'href="?');

      if (window.is_proxy) {
        text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/gi, 'href="http://zero');
        text = text.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1");
      } else {
        text = text.replace(/href="http:\/\/(127.0.0.1|localhost):43110/g, 'href="');
      } // Add no-refresh linking to local links


      text = text.replace(/href="\?/g, 'onclick="return Page.handleLinkClick(window.event)" href="?');
      return text;
    } // Convert a single link to relative

  }, {
    key: "fixLink",
    value: function fixLink(link) {
      if (window.is_proxy) {
        var back = link.replace(/http:\/\/(127.0.0.1|localhost):43110/, 'http://zero');
        return back.replace(/http:\/\/zero\/([^\/]+\.bit)/, "http://$1"); // Domain links
      } else {
        return link.replace(/http:\/\/(127.0.0.1|localhost):43110/, '');
      }
    }
  }, {
    key: "toUrl",
    value: function toUrl(text) {
      return text.replace(/[^A-Za-z0-9]/g, "+").replace(/[+]+/g, "+").replace(/[+]+$/, "");
    }
  }, {
    key: "getSiteUrl",
    value: function getSiteUrl(address) {
      if (window.is_proxy) {
        if (Array.from(address).includes(".")) {
          // Domain
          return "http://".concat(address, "/");
        } else {
          return "http://zero/".concat(address, "/");
        }
      } else {
        return "/".concat(address, "/");
      }
    }
  }, {
    key: "fixReply",
    value: function fixReply(text) {
      return text.replace(/(>.*\n)([^\n>])/gm, "$1\n$2");
    }
  }, {
    key: "toBitcoinAddress",
    value: function toBitcoinAddress(text) {
      return text.replace(/[^A-Za-z0-9]/g, "");
    }
  }, {
    key: "jsonEncode",
    value: function jsonEncode(obj) {
      return unescape(encodeURIComponent(JSON.stringify(obj)));
    }
  }, {
    key: "jsonDecode",
    value: function jsonDecode(obj) {
      return JSON.parse(decodeURIComponent(escape(obj)));
    }
  }, {
    key: "fileEncode",
    value: function fileEncode(obj) {
      if (typeof obj === "string") {
        return btoa(unescape(encodeURIComponent(obj)));
      } else {
        return btoa(unescape(encodeURIComponent(JSON.stringify(obj, undefined, '\t'))));
      }
    }
  }, {
    key: "utf8Encode",
    value: function utf8Encode(s) {
      return unescape(encodeURIComponent(s));
    }
  }, {
    key: "utf8Decode",
    value: function utf8Decode(s) {
      return decodeURIComponent(escape(s));
    }
  }, {
    key: "distance",
    value: function distance(s1, s2) {
      s1 = s1.toLocaleLowerCase();
      s2 = s2.toLocaleLowerCase();
      var next_find_i = 0;
      var next_find = s2[0];
      var match = true;
      var extra_parts = {};

      var _arr = Array.from(s1);

      for (var _i = 0; _i < _arr.length; _i++) {
        var char = _arr[_i];

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
        extra_parts[next_find_i] = ""; // Extra chars on the end doesnt matter
      }

      extra_parts = function () {
        var result = [];

        for (var key in extra_parts) {
          var val = extra_parts[key];
          result.push(val);
        }

        return result;
      }();

      if (next_find_i >= s2.length) {
        return extra_parts.length + extra_parts.join("").length;
      } else {
        return false;
      }
    }
  }, {
    key: "queryParse",
    value: function queryParse(query) {
      var params = {};
      var parts = query.split('&');

      var _arr2 = Array.from(parts);

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var part = _arr2[_i2];

        var _Array$from = Array.from(part.split("=")),
            _Array$from2 = _slicedToArray(_Array$from, 2),
            key = _Array$from2[0],
            val = _Array$from2[1];

        if (val) {
          params[decodeURIComponent(key)] = decodeURIComponent(val);
        } else {
          params["url"] = decodeURIComponent(key);
          params["urls"] = params["url"].split("/");
        }
      }

      return params;
    }
  }, {
    key: "queryEncode",
    value: function queryEncode(params) {
      var back = [];

      if (params.url) {
        back.push(params.url);
      }

      for (var key in params) {
        var val = params[key];

        if (!val || key === "url") {
          continue;
        }

        back.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(val)));
      }

      return back.join("&");
    }
  }, {
    key: "highlight",
    value: function highlight(text, search) {
      var parts = text.split(RegExp(search, "i"));
      var back = [];

      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        back.push(part);

        if (i < parts.length - 1) {
          back.push(h("span.highlight", {
            key: i
          }, search));
        }
      }

      return back;
    }
  }, {
    key: "sqlIn",
    value: function sqlIn(values) {
      return "(".concat(Array.from(values).map(function (value) {
        return "'".concat(value, "'");
      }).join(','), ")");
    }
  }, {
    key: "formatSize",
    value: function formatSize(size) {
      if (!size) {
        return "0 KB";
      }

      var size_mb = size / 1024 / 1024;

      if (size_mb >= 1000) {
        return (size_mb / 1024).toFixed(1) + " GB";
      } else if (size_mb >= 100) {
        return size_mb.toFixed(0) + " MB";
      } else if (size / 1024 >= 1000) {
        return size_mb.toFixed(2) + " MB";
      } else {
        return (size / 1024).toFixed(2) + " KB";
      }
    }
  }]);

  return Text;
}();

window.is_proxy = document.location.host === "zero" || window.location.pathname === "/"; // window.Text = new Text();

/* harmony default export */ var lib_Text = (new Text());
// CONCATENATED MODULE: ./src/lib/Time.js
function Time_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Time_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Time_createClass(Constructor, protoProps, staticProps) { if (protoProps) Time_defineProperties(Constructor.prototype, protoProps); if (staticProps) Time_defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var Time =
/*#__PURE__*/
function () {
  function Time() {
    Time_classCallCheck(this, Time);
  }

  Time_createClass(Time, [{
    key: "since",
    value: function since(timestamp) {
      var back;
      var now = +new Date() / 1000;

      if (timestamp > 1000000000000) {
        // In ms
        timestamp = timestamp / 1000;
      }

      var secs = now - timestamp;

      if (secs < 60) {
        back = "Just now";
      } else if (secs < 60 * 60) {
        back = "".concat(Math.round(secs / 60), " minutes ago");
      } else if (secs < 60 * 60 * 24) {
        back = "".concat(Math.round(secs / 60 / 60), " hours ago");
      } else if (secs < 60 * 60 * 24 * 3) {
        back = "".concat(Math.round(secs / 60 / 60 / 24), " days ago");
      } else {
        back = "on ".concat(this.date(timestamp));
      }

      back = back.replace(/^1 ([a-z]+)s/, "1 $1"); // 1 days ago fix

      return back;
    }
  }, {
    key: "date",
    value: function date(timestamp, format) {
      var display;

      if (format == null) {
        format = "short";
      }

      if (timestamp > 1000000000000) {
        // In ms
        timestamp = timestamp / 1000;
      }

      var parts = new Date(timestamp * 1000).toString().split(" ");

      if (format === "short") {
        display = parts.slice(1, 4);
      } else {
        display = parts.slice(1, 5);
      }

      return display.join(" ").replace(/( [0-9]{4})/, ",$1");
    }
  }, {
    key: "timestamp",
    value: function timestamp(date) {
      if (date == null) {
        date = "";
      }

      if (date === "now" || date === "") {
        return parseInt(+new Date() / 1000);
      } else {
        return parseInt(Date.parse(date) / 1000);
      }
    }
  }]);

  return Time;
}();

/* harmony default export */ var lib_Time = (new Time());
// CONCATENATED MODULE: ./src/lib/tools.js
var UA = navigator.userAgent;
var boolMobile = /android/i.test(UA);
// EXTERNAL MODULE: ./node_modules/querystring-es3/index.js
var querystring_es3 = __webpack_require__("b383");
var querystring_es3_default = /*#__PURE__*/__webpack_require__.n(querystring_es3);

// CONCATENATED MODULE: ./src/lib/NativeCall.js
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var scheme = "zshare://com.zshare.app/path";
var global = boolMobile ? window.top : window;
var callbacks = global.__CALLBACKS__ = {};
function nativeCall(action) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var callbackName = createCallbackName();
  var promise = new Promise(function (resolve, reject) {
    callbacks[callbackName] = function (ret) {
      resolve(ret);
    };

    setTimeout(function () {
      reject();
    }, 15 * 60000);
  });

  var query = _objectSpread({
    action: action
  }, params, {
    callback_name: callbackName // console.log(`${scheme}?${querystring.stringify(query)}`)

  });

  location.href = "".concat(scheme, "?").concat(querystring_es3_default.a.stringify(query));
  return promise;
}

global.nativeCallback = function _nativeCallback(strResult) {
  var _JSON$parse = JSON.parse(strResult),
      callbackName = _JSON$parse.callbackName,
      ret = _JSON$parse.ret;

  var _callbackFunction = window.top.__CALLBACKS__[callbackName]; // console.log('callback', callbackName)

  if (_callbackFunction) {
    try {
      // const _ret = JSON.parse(ret);
      // console.log('callback', _ret)
      _callbackFunction(ret);
    } catch (error) {
      _callbackFunction({});

      console.log('native callback', error.message || error);
    }
  }
};

function createCallbackName() {
  return "callback_".concat(Math.random() * 1000 >> 0).concat(Date.now());
}

function NativeCall_pickFile() {
  return nativeCall('file_get');
}
function uploadFile(fileName, uploadUrl, filePath) {
  return nativeCall('file_upload', {
    args: JSON.stringify([fileName, uploadUrl, filePath])
  }); // "zshare://com.zshare.app/path?action=file_upload&args=" + encodeURIComponent(JSON.stringify([name, init_res.url, uri]));
}
// CONCATENATED MODULE: ./src/lib/ZeroUp.js


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ZeroUp_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { ZeroUp_defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ZeroUp_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ZeroUp_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ZeroUp_createClass(Constructor, protoProps, staticProps) { if (protoProps) ZeroUp_defineProperties(Constructor.prototype, protoProps); if (staticProps) ZeroUp_defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ZeroUp_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // import {pickFile, uploadFile} from './NativeCall';



var ZeroUp_ZeroUp =
/*#__PURE__*/
function (_ZeroFrame) {
  _inherits(ZeroUp, _ZeroFrame);

  function ZeroUp() {
    var _getPrototypeOf2;

    var _this;

    ZeroUp_classCallCheck(this, ZeroUp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ZeroUp)).call.apply(_getPrototypeOf2, [this].concat(args)));

    ZeroUp_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "site_info", null);

    return _this;
  }

  ZeroUp_createClass(ZeroUp, [{
    key: "listFiles",
    value: function () {
      var _listFiles = _asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(fileType) {
        var pageNo,
            order,
            pageSize,
            post_res,
            files_res,
            stat_res,
            stats,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            stat,
            post_map,
            _iteratorNormalCompletion2,
            _didIteratorError2,
            _iteratorError2,
            _iterator2,
            _step2,
            file,
            post,
            _args = arguments;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pageNo = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
                order = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'date_added';
                _context.next = 4;
                return this.cmdp('siteInfo', {});

              case 4:
                this.site_info = _context.sent;
                pageSize = 20;
                _context.next = 8;
                return this.cmdp('dbQuery', ["SELECT * FROM post WHERE post_type='".concat(fileType, "' ORDER BY date_added DESC LIMIT ").concat(pageSize * pageNo, ", ").concat(pageSize)]);

              case 8:
                post_res = _context.sent;
                _context.next = 11;
                return this.cmdp('dbQuery', ["SELECT * FROM file LEFT JOIN json USING(json_id) \n                                      WHERE post_id in (".concat(post_res.map(function (p) {
                  return p.id;
                }).join(','), ") \n                                      ORDER BY date_added DESC")]);

              case 11:
                files_res = _context.sent;
                _context.next = 14;
                return this.cmdp("optionalFileList", {
                  filter: "bigfile",
                  limit: 2000 // orderby: orderby

                });

              case 14:
                stat_res = _context.sent;
                stats = {};
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 19;

                for (_iterator = stat_res[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  stat = _step.value;
                  stats[stat.inner_path] = stat;
                }

                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](19);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 27:
                _context.prev = 27;
                _context.prev = 28;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 30:
                _context.prev = 30;

                if (!_didIteratorError) {
                  _context.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context.finish(30);

              case 34:
                return _context.finish(27);

              case 35:
                post_map = post_res.reduce(function (data, val) {
                  // console.log(data);
                  data["".concat(val.json_id, "-").concat(val.id)] = ZeroUp_objectSpread({}, val, {
                    statics: []
                  });
                  return data;
                }, {});
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 39;

                for (_iterator2 = files_res[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  file = _step2.value;
                  post = post_map["".concat(file.json_id, "-").concat(file.post_id)];

                  if (post) {
                    file.id = file.directory + "_" + file.date_added;
                    file.inner_path = "/".concat(this.site_info.address, "/data/users/").concat(file.directory, "/").concat(file.file_name); // file.data_inner_path = `data/users/${file.directory}/data.json`;
                    // file.content_inner_path = `data/users/${file.directory}/content.json`;

                    file.stats = stats[file.inner_path];
                    file.stats = file.stats || {};
                    file.stats.peer = file.stats.peer || 0;
                    file.stats.peer_seed = file.stats.peer_seed || 0;
                    file.stats.peer_leech = file.stats.peer_leech || 0;
                    post.statics.push(file);
                  }
                } // console.log(post_map)


                _context.next = 47;
                break;

              case 43:
                _context.prev = 43;
                _context.t1 = _context["catch"](39);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t1;

              case 47:
                _context.prev = 47;
                _context.prev = 48;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 50:
                _context.prev = 50;

                if (!_didIteratorError2) {
                  _context.next = 53;
                  break;
                }

                throw _iteratorError2;

              case 53:
                return _context.finish(50);

              case 54:
                return _context.finish(47);

              case 55:
                return _context.abrupt("return", Object.values(post_map).filter(function (ele) {
                  return ele.statics.length > 0;
                }));

              case 56:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[19, 23, 27, 35], [28,, 30, 34], [39, 43, 47, 55], [48,, 50, 54]]);
      }));

      return function listFiles(_x) {
        return _listFiles.apply(this, arguments);
      };
    }()
  }, {
    key: "formatFileName",
    value: function formatFileName(file_name) {
      if (file_name.replace(/[^A-Za-z0-9]/g, "").length < 20) {
        file_name = lib_Time.timestamp() + "-" + file_name;
      }

      return file_name;
    }
  }, {
    key: "pickFile",
    value: function () {
      var _pickFile = _asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2() {
        var ret, name;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return NativeCall_pickFile();

              case 2:
                ret = _context2.sent;
                name = this.formatFileName(ret.name); // const size = ret.size;
                // const uri = ret.uri;

                return _context2.abrupt("return", ZeroUp_objectSpread({}, ret, {
                  name: name
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function pickFile() {
        return _pickFile.apply(this, arguments);
      };
    }()
  }, {
    key: "uploadFileNative",
    value: function () {
      var _uploadFileNative = _asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3(postInfo, fileInfo, successFunction, errorFunction) {
        var filename, size, uri, init_res, ret;
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (fileInfo) {
                  _context3.next = 3;
                  break;
                }

                errorFunction(fileInfo);
                throw new Error("method:uploadFileNative, fileInfo is ".concat(fileInfo));

              case 3:
                _context3.prev = 3;
                _context3.next = 6;
                return this.checkContentJson();

              case 6:
                filename = fileInfo.filename, size = fileInfo.size, uri = fileInfo.uri;
                _context3.next = 9;
                return this.cmdp("bigfileUploadInit", ["data/users/" + this.site_info.auth_address + "/" + filename, size]);

              case 9:
                init_res = _context3.sent;
                console.log(postInfo);
                _context3.next = 13;
                return uploadFile(filename, init_res.url, uri);

              case 13:
                console.log('upload done');
                _context3.next = 16;
                return this.registerUpload(postInfo, filename, init_res.relativePath, size, lib_Time.timestamp());

              case 16:
                console.log('registerUpload done');
                _context3.next = 19;
                return this.cmdp("siteSign", {
                  inner_path: "data/users/" + this.site_info.auth_address + "/content.json"
                });

              case 19:
                ret = _context3.sent;
                // await this.cmdp("sitePublish", {
                //   inner_path: `data/users/${this.site_info.auth_address}/content.json`,
                //   "sign": false
                // });
                successFunction(fileInfo);
                _context3.next = 26;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](3);
                errorFunction(fileInfo);

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 23]]);
      }));

      return function uploadFileNative(_x2, _x3, _x4, _x5) {
        return _uploadFileNative.apply(this, arguments);
      };
    }()
  }, {
    key: "addPost",
    value: function () {
      var _addPost = _asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee4(postInfo) {
        var inner_path, res, newPost;
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                inner_path = "data/users/".concat(this.site_info.auth_address, "/data.json");
                _context4.next = 3;
                return this.cmdp("fileGet", [inner_path, false]);

              case 3:
                res = _context4.sent;

                if (res) {
                  res = JSON.parse(res);
                }

                if (res == null) {
                  res = {
                    next_post_id: 0,
                    post: []
                  };
                }

                if (res.post == null) {
                  res.post = [];
                  res.next_post_id = 1;
                }

                newPost = ZeroUp_objectSpread({
                  id: res.next_post_id++
                }, postInfo, {
                  date_added: lib_Time.timestamp()
                });
                res.post.push(newPost);
                _context4.next = 11;
                return this.cmdp("fileWrite", [inner_path, lib_Text.fileEncode(res)]);

              case 11:
                return _context4.abrupt("return", newPost.id);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function addPost(_x6) {
        return _addPost.apply(this, arguments);
      };
    }()
    /**
     * 写入上传到文件
     * @param {string} title 
     * @param {string} file_name 
     * @param {number} file_size 
     * @param {number} date_added 
     */

  }, {
    key: "registerUpload",
    value: function registerUpload(postInfo, file_name, file_size, date_added) {
      var _this2 = this;

      var inner_path = "data/users/".concat(this.site_info.auth_address, "/data.json");
      return this.cmdp("fileGet", [inner_path, false]).then(function (res) {
        var post_id = postInfo.post_id,
            title = postInfo.title;

        if (res) {
          res = JSON.parse(res);
        }

        if (res == null) {
          res = {};
        }

        if (res.file == null) {
          res.file = {};
        }

        console.log('---->', post_id);
        res.file[file_name] = {
          post_id: post_id,
          title: title,
          size: file_size,
          date_added: date_added
        };
        return _this2.cmdp("fileWrite", [inner_path, lib_Text.fileEncode(res)]);
      });
    }
  }, {
    key: "uploadFileBrowser",
    value: function () {
      var _uploadFileBrowser = _asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee5(postInfo, file, successFunction, errorFunction) {
        var _this3 = this,
            _arguments = arguments;

        var init_res, formdata, req;
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.checkContentJson();

              case 2:
                _context5.next = 4;
                return this.cmdp("bigfileUploadInit", ["data/users/".concat(this.site_info.auth_address, "/").concat(file.filename), file.size]);

              case 4:
                init_res = _context5.sent;
                formdata = new FormData();
                req = new XMLHttpRequest();
                this.req = req;
                formdata.append(file.filename, file.blob);
                req.upload.addEventListener("loadstart", function (progress) {
                  _this3.log("loadstart", _arguments); // this.file_info.started = progress.timeStamp;
                  // return Page.setPage("uploader");

                });
                req.upload.addEventListener("loadend", function () {
                  // this.log("loadend", arguments);
                  // this.file_info.status = "done";
                  // const postId = `${Time.timestamp()}-${btoa(escape(ostInfo.title)).substr(0, 16)}`;
                  _this3.registerUpload(postInfo, init_res.file_relative_path, file.size, lib_Time.timestamp()).then(function (res) {
                    return _this3.cmdp("siteSign", {
                      inner_path: "data/users/".concat(_this3.site_info.auth_address, "/content.json")
                    });
                  }) // .then(res => {
                  //   return this.cmdp("sitePublish", {
                  //     inner_path: `data/users/${this.site_info.auth_address}/content.json`,
                  //     "sign": false
                  //   });
                  // })
                  .then(function (res) {
                    return successFunction(res);
                  });
                });
                req.addEventListener("error", function () {
                  _this3.log("error", _arguments);

                  errorFunction(_arguments);
                });
                req.withCredentials = true;
                req.open("POST", init_res.url);
                return _context5.abrupt("return", req.send(formdata));

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function uploadFileBrowser(_x7, _x8, _x9, _x10) {
        return _uploadFileBrowser.apply(this, arguments);
      };
    }()
  }, {
    key: "handleUploadDone",
    value: function handleUploadDone() {}
  }, {
    key: "uploadFiles",
    value: function uploadFiles(postInfo) {
      var _this4 = this;

      var fileList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var progressFunction = arguments.length > 2 ? arguments[2] : undefined;
      fileList.forEach(function (file) {
        var fileName = _this4.formatFileName(file.filename);

        var func = boolMobile ? _this4.uploadFileNative : _this4.uploadFileBrowser;
        func.apply(_this4, [postInfo, ZeroUp_objectSpread({}, file, {
          filename: fileName
        }), function (ret) {
          progressFunction({
            success: file
          });
        }, function () {
          progressFunction({
            error: file
          });
        }]);
      });
    }
  }, {
    key: "checkContentJson",
    value: function checkContentJson() {
      var _this5 = this;

      return new Promise(function (done) {
        var inner_path = "data/users/" + _this5.site_info.auth_address + "/content.json";

        _this5.cmd("fileGet", [inner_path, false], function (res) {
          if (res) {
            res = JSON.parse(res);
          } else {
            res = {};
          }

          var optional_pattern = "(?!data.json)";
          if (res.optional == optional_pattern) return done();
          res.optional = optional_pattern;

          _this5.cmd("fileWrite", [inner_path, lib_Text.fileEncode(res)], done);
        });
      });
    }
  }]);

  return ZeroUp;
}(ZeroFrame);

/* harmony default export */ var lib_ZeroUp = (new ZeroUp_ZeroUp());
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommPostView.vue?vue&type=script&lang=js&
//
//
//
//


/* harmony default export */ var CommPostViewvue_type_script_lang_js_ = ({
  props: {
    fileType: {
      type: String,
      default: ''
    }
  },
  components: {
    List: List
  },
  data: function data() {
    return {
      items: []
    };
  },
  created: function created() {
    var _this = this;

    lib_ZeroUp.listFiles(this.fileType).then(function (list) {
      console.log(list);
      _this.items = list;
    });
  }
}); // import {postMixin} from "../lib/mixins"
// export default {
//   data: () =>({
//     fileType
//   }),
//   mixins:[
//     postMixin
//   ],
//   ...props
// }
// CONCATENATED MODULE: ./src/components/CommPostView.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CommPostViewvue_type_script_lang_js_ = (CommPostViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CommPostView.vue?vue&type=style&index=0&lang=stylus&
var CommPostViewvue_type_style_index_0_lang_stylus_ = __webpack_require__("387f");

// CONCATENATED MODULE: ./src/components/CommPostView.vue






/* normalize component */

var CommPostView_component = Object(componentNormalizer["a" /* default */])(
  components_CommPostViewvue_type_script_lang_js_,
  CommPostViewvue_type_template_id_fa6515be_render,
  CommPostViewvue_type_template_id_fa6515be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

CommPostView_component.options.__file = "CommPostView.vue"
/* harmony default export */ var CommPostView = (CommPostView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/VideoView.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var VideoViewvue_type_script_lang_js_ = ({
  components: {
    'post-view': CommPostView
  },
  methods: {
    onItemClick: function onItemClick(a, b) {
      console.log(a, b);
    }
  }
});
// CONCATENATED MODULE: ./src/views/VideoView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_VideoViewvue_type_script_lang_js_ = (VideoViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/VideoView.vue





/* normalize component */

var VideoView_component = Object(componentNormalizer["a" /* default */])(
  views_VideoViewvue_type_script_lang_js_,
  VideoViewvue_type_template_id_5d613bdf_render,
  VideoViewvue_type_template_id_5d613bdf_staticRenderFns,
  false,
  null,
  null,
  null
  
)

VideoView_component.options.__file = "VideoView.vue"
/* harmony default export */ var VideoView = (VideoView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/PhotoView.vue?vue&type=template&id=1e5406c3&
var PhotoViewvue_type_template_id_1e5406c3_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('post-view',{attrs:{"fileType":"photo"}})}
var PhotoViewvue_type_template_id_1e5406c3_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/PhotoView.vue?vue&type=template&id=1e5406c3&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/PhotoView.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var PhotoViewvue_type_script_lang_js_ = ({
  components: {
    'post-view': CommPostView
  }
});
// CONCATENATED MODULE: ./src/views/PhotoView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_PhotoViewvue_type_script_lang_js_ = (PhotoViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/PhotoView.vue





/* normalize component */

var PhotoView_component = Object(componentNormalizer["a" /* default */])(
  views_PhotoViewvue_type_script_lang_js_,
  PhotoViewvue_type_template_id_1e5406c3_render,
  PhotoViewvue_type_template_id_1e5406c3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

PhotoView_component.options.__file = "PhotoView.vue"
/* harmony default export */ var PhotoView = (PhotoView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/GifView.vue?vue&type=template&id=dd894c32&
var GifViewvue_type_template_id_dd894c32_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('post-view',{attrs:{"fileType":"gif"}})}
var GifViewvue_type_template_id_dd894c32_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/GifView.vue?vue&type=template&id=dd894c32&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/GifView.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var GifViewvue_type_script_lang_js_ = ({
  components: {
    'post-view': CommPostView
  }
});
// CONCATENATED MODULE: ./src/views/GifView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_GifViewvue_type_script_lang_js_ = (GifViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/GifView.vue





/* normalize component */

var GifView_component = Object(componentNormalizer["a" /* default */])(
  views_GifViewvue_type_script_lang_js_,
  GifViewvue_type_template_id_dd894c32_render,
  GifViewvue_type_template_id_dd894c32_staticRenderFns,
  false,
  null,
  null,
  null
  
)

GifView_component.options.__file = "GifView.vue"
/* harmony default export */ var GifView = (GifView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3d7bed73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/PushView.vue?vue&type=template&id=0c6843e0&
var PushViewvue_type_template_id_0c6843e0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',{attrs:{"row":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":"","offset-sm3":""}},[_c('v-toolbar',{staticClass:"hidden-md-and-up",attrs:{"app":""}},[_c('v-toolbar-title',[_vm._v(_vm._s(_vm.title))])],1),_c('v-form',{ref:"form",attrs:{"value":"false"},model:{value:(_vm.valid),callback:function ($$v) {_vm.valid=$$v},expression:"valid"}},[_c('v-text-field',{attrs:{"rules":_vm.titleRule,"required":"","placeholder":"请输入一个霸气的名称"},model:{value:(_vm.mTitle),callback:function ($$v) {_vm.mTitle=$$v},expression:"mTitle"}}),_c('v-subheader',{staticClass:"px-0"},[_vm._v("选择文件类型")]),_c('v-radio-group',{staticClass:"mt-0",attrs:{"mandatory":false},model:{value:(_vm.fileType),callback:function ($$v) {_vm.fileType=$$v},expression:"fileType"}},[_c('v-radio',{attrs:{"label":"视频","value":"video","color":"deep-purple"}}),_c('v-radio',{attrs:{"label":"GIF动图","value":"gif","color":"deep-purple"}}),_c('v-radio',{attrs:{"label":"图片","value":"photo","color":"deep-purple"}})],1),_c('v-divider'),_c('v-checkbox',{attrs:{"label":"使用外部链接"},model:{value:(_vm.showLinkInput),callback:function ($$v) {_vm.showLinkInput=$$v},expression:"showLinkInput"}}),(!_vm.showLinkInput)?_c('v-subheader',{staticClass:"px-0"},[_vm._v("选择文件")]):_vm._e(),(!_vm.showLinkInput)?_c('v-list',[_vm._l((_vm.fileList),function(item,i){return [_c('v-list-tile',{key:item.filename},[_c('v-list-tile-action',{staticClass:"hidden-sm-and-down",on:{"click":function (){ return null; }}},[_c('v-btn',{attrs:{"icon":""},on:{"click":function($event){_vm.remove(i)}}},[_c('v-icon',{attrs:{"color":"deep-purple"}},[_vm._v("remove_circle_outline")])],1)],1),_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v(_vm._s(item.filename))])],1),_c('v-list-tile-action',{staticClass:"hidden-md-and-up"},[_c('v-btn',{attrs:{"icon":""},on:{"click":function($event){_vm.remove(i)}}},[_c('v-icon',{attrs:{"color":"deep-purple"}},[_vm._v("remove_circle_outline")])],1)],1)],1),_c('v-divider',{key:i})]}),_c('v-list-tile',{directives:[{name:"show",rawName:"v-show",value:('video' !== _vm.fileType || _vm.fileList.length === 0),expression:"'video' !== fileType || fileList.length === 0"}],staticClass:"file-picker"},[_c('v-list-tile-action',{staticClass:"hidden-sm-and-down"},[_c('v-icon',{attrs:{"color":"deep-purple"}},[_vm._v("add_circle_outline")])],1),_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v("添加文件")])],1),_c('v-list-tile-action',{staticClass:"hidden-md-and-up",on:{"click":_vm.pickFile}},[_c('v-icon',{attrs:{"color":"deep-purple"}},[_vm._v("add_circle_outline")])],1),_c('input',{staticClass:"hidden-sm-and-down",attrs:{"type":"file"},on:{"change":_vm.pickFile}})],1),_c('v-divider')],2):_vm._e(),(_vm.showLinkInput)?_c('v-text-field',{attrs:{"rules":_vm.linkRule,"placeholder":"请输入外链地址（例如：http://www.baidu.com/）"}}):_vm._e(),_c('v-btn',{staticClass:"upload-btn",attrs:{"dark":"","block":"","color":"deep-purple"},on:{"click":_vm.submit}},[_vm._v("上传")])],1)],1),_c('v-dialog',{attrs:{"max-width":"290"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-card',[_c('v-card-text',[_vm._v(_vm._s(_vm.dialogMsg))]),_c('v-card-actions',[_c('v-spacer'),_c('v-btn',{attrs:{"color":"deep-purple darken-1","flat":"flat"},on:{"click":function (){ return (_vm.dialog = false,_vm.dialogButton=null); }}},[_vm._v(_vm._s(_vm.dialogButton||"我知道了"))]),_c('v-spacer')],1)],1)],1)],1)}
var PushViewvue_type_template_id_0c6843e0_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/PushView.vue?vue&type=template&id=0c6843e0&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/PushView.vue?vue&type=script&lang=js&


function PushViewvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { PushViewvue_type_script_lang_js_defineProperty(target, key, source[key]); }); } return target; }

function PushViewvue_type_script_lang_js_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function PushViewvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function PushViewvue_type_script_lang_js_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { PushViewvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { PushViewvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



function checkFileType(uploadType, fileType) {
  var conditions = {
    video: {
      "video/mp4": true,
      "video/webm": true,
      "video/ogg": true
    },
    photo: {
      "image/jpeg": true,
      "image/png": true
    },
    gif: {
      "image/gif": true
    }
  };
  return conditions[uploadType] && conditions[uploadType][fileType];
}

var tips = {
  video: "视频只能上传 mp4、webm、ogg 格式",
  gif: "请选择gif文件",
  photo: "图片只能上传 jpg、png 格式"
};
/* harmony default export */ var PushViewvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      valid: false,
      fileType: "video",
      title: "共享资源",
      // stage: 1,
      mTitle: "",
      fileList: [],
      dialog: false,
      dialogMsg: "",
      showLinkInput: false,
      dialogButton: null,
      titleRule: [function (v) {
        return !!v || '名称不能为空';
      }, function (v) {
        return v && v.length >= 4 && v.length <= 30 || '名称的长度必须在4到30个字符之间';
      }],
      linkRule: [function (v) {
        return /^https?:\/\/[\d\-a-zA-Z]+(\.[\d\-a-zA-Z]+)*\/?$/.test(v) || '请输入一个有效的链接';
      }]
    };
  },
  methods: {
    submit: function () {
      var _submit = PushViewvue_type_script_lang_js_asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee() {
        var _this = this;

        var doneCount, failCount, postInfo, postId;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.$refs.form.validate()) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!(this.fileList.length === 0)) {
                  _context.next = 6;
                  break;
                }

                this.dialog = true;
                this.dialogMsg = '请添加要分享的文件';
                return _context.abrupt("return");

              case 6:
                doneCount = 0;
                failCount = 0;
                this.dialog = true;
                this.dialogButton = '关闭';
                this.dialogMsg = "\u603B\u5171".concat(this.fileList.length, "\u4E2A\u6587\u4EF6\uFF0C\u5B8C\u6210").concat(doneCount, "\u4E2A\u6587\u4EF6\uFF0C\u5931\u8D25").concat(failCount, "\u4E2A\u6587\u4EF6");
                postInfo = {
                  title: this.mTitle,
                  post_type: this.fileType
                };
                _context.next = 14;
                return lib_ZeroUp.addPost(postInfo);

              case 14:
                postId = _context.sent;
                console.log(postId);
                lib_ZeroUp.uploadFiles(PushViewvue_type_script_lang_js_objectSpread({
                  post_id: postId
                }, postInfo), this.fileList, function (ret) {
                  var success = ret.success,
                      error = ret.error;
                  success && doneCount++;
                  error && failCount++;
                  _this.dialogMsg = "\u5171".concat(_this.fileList.length, "\u4E2A\u6587\u4EF6\uFF0C\u5B8C\u6210").concat(doneCount, "\u4E2A\u6587\u4EF6\uFF0C\u5931\u8D25").concat(failCount, "\u4E2A\u6587\u4EF6");
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function submit() {
        return _submit.apply(this, arguments);
      };
    }(),
    remove: function remove(i) {
      // console.log(11);
      this.fileList.splice(i, 1);
    },
    checkFile: function checkFile(file, callback) {
      // console.log(file.size >= 5*1024)
      if (file.size >= 512 * 1024 * 1024 || file.size <= 5 * 1024) {
        this.dialog = true;
        this.dialogMsg = '文件的大小必须在5KB到500M之间';
        return;
      }

      if (file && checkFileType(this.fileType, file.type)) {
        callback();
      } else {
        this.dialog = true;
        this.dialogMsg = tips[this.fileType];
        this.pickedFile = null;
      }
    },
    pickFile: function pickFile(e) {
      var _this2 = this;

      // console.log('change')
      if (boolMobile) {
        lib_ZeroUp.pickFile().then(function (fileInfo) {
          _this2.checkFile(fileInfo, function () {
            _this2.fileList.push(PushViewvue_type_script_lang_js_objectSpread({}, fileInfo, {
              filename: fileInfo.name
            }));
          });
        });
      } else {
        var file = e.target.files[0];
        this.checkFile(file, function () {
          _this2.fileList.push({
            filename: file.name,
            blob: file,
            size: file.size
          });
        });
        e.target.value = null;
      }
    }
  },
  // computed: {
  //   showLinkInput() {
  //     return this.fileType === "link";
  //   }
  // },
  watch: {
    fileType: function fileType() {
      this.fileList = [];
    }
  }
});
// CONCATENATED MODULE: ./src/views/PushView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_PushViewvue_type_script_lang_js_ = (PushViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/PushView.vue?vue&type=style&index=0&lang=stylus&
var PushViewvue_type_style_index_0_lang_stylus_ = __webpack_require__("6887");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js + 4 modules
var components_VCard = __webpack_require__("99d9");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCheckbox/VCheckbox.js
var VCheckbox = __webpack_require__("ac7c");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js + 7 modules
var VDialog = __webpack_require__("169a");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__("ce7e");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VForm/VForm.js
var VForm = __webpack_require__("4bd4");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
var VList = __webpack_require__("8860");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListTile.js
var VListTile = __webpack_require__("ba95");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListTileAction.js
var VListTileAction = __webpack_require__("40fe");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 4 modules
var components_VList = __webpack_require__("5d23");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VRadioGroup/VRadio.js
var VRadio = __webpack_require__("67b6");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VRadioGroup/VRadioGroup.js
var VRadioGroup = __webpack_require__("43a6");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/index.js
var VGrid = __webpack_require__("9910");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSubheader/VSubheader.js
var VSubheader = __webpack_require__("e0c7");

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/index.js + 11 modules
var VTextField = __webpack_require__("2677");

// CONCATENATED MODULE: ./src/views/PushView.vue






/* normalize component */

var PushView_component = Object(componentNormalizer["a" /* default */])(
  views_PushViewvue_type_script_lang_js_,
  PushViewvue_type_template_id_0c6843e0_render,
  PushViewvue_type_template_id_0c6843e0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

PushView_component.options.__file = "PushView.vue"
/* harmony default export */ var PushView = (PushView_component.exports);

/* vuetify-loader */
























installComponents_default()(PushView_component, {
  VBtn: VBtn["a" /* default */],
  VCard: VCard["a" /* default */],
  VCardActions: components_VCard["a" /* VCardActions */],
  VCardText: components_VCard["b" /* VCardText */],
  VCheckbox: VCheckbox["a" /* default */],
  VDialog: VDialog["a" /* default */],
  VDivider: VDivider["a" /* default */],
  VFlex: VFlex["a" /* default */],
  VForm: VForm["a" /* default */],
  VIcon: VIcon["a" /* default */],
  VLayout: VLayout["a" /* default */],
  VList: VList["a" /* default */],
  VListTile: VListTile["a" /* default */],
  VListTileAction: VListTileAction["a" /* default */],
  VListTileContent: components_VList["a" /* VListTileContent */],
  VListTileTitle: components_VList["b" /* VListTileTitle */],
  VRadio: VRadio["a" /* default */],
  VRadioGroup: VRadioGroup["a" /* default */],
  VSpacer: VGrid["a" /* VSpacer */],
  VSubheader: VSubheader["a" /* default */],
  VTextField: VTextField["a" /* VTextField */],
  VToolbar: VToolbar["a" /* default */],
  VToolbarTitle: components_VToolbar["b" /* VToolbarTitle */],
})

// CONCATENATED MODULE: ./src/router.js






vue_runtime_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  routes: [{
    path: "/",
    name: "home",
    component: VideoView
  }, {
    path: "/publish",
    name: "publish",
    component: PushView
  }, {
    path: "/photo",
    name: "photo",
    component: PhotoView
  }, {
    path: "/gif",
    name: "gif",
    component: GifView
  }]
}));
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./src/store.js


vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
/* harmony default export */ var store = (new vuex_esm["a" /* default */].Store({
  state: {},
  mutations: {},
  actions: {}
}));
// CONCATENATED MODULE: ./src/main.js





















































































































vue_runtime_esm["a" /* default */].config.productionTip = false;
new vue_runtime_esm["a" /* default */]({
  router: router,
  store: store,
  render: function render(h) {
    return h(App);
  }
}).$mount("#app");

/***/ }),

/***/ "6887":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4cff");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushView_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

/******/ });
//# sourceMappingURL=app.1cc0fc20.js.map