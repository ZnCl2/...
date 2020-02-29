/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Zeroboard = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _zero_frame = __webpack_require__(5);
	
	var _zero_frame2 = _interopRequireDefault(_zero_frame);
	
	var _page = __webpack_require__(6);
	
	var _page2 = _interopRequireDefault(_page);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _newPost = __webpack_require__(4);
	
	var _newPost2 = _interopRequireDefault(_newPost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Include core classes
	
	// Include page components
	
	
	var Zeroboard = exports.Zeroboard = function (_Zeroframe) {
	    _inherits(Zeroboard, _Zeroframe);
	
	    function Zeroboard() {
	        _classCallCheck(this, Zeroboard);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Zeroboard).apply(this, arguments));
	    }
	
	    _createClass(Zeroboard, [{
	        key: "init",
	        value: function init() {
	            this.page = new _page2.default();
	
	            this.grepPath();
	
	            this.siteInfoUpdatedAt = 0;
	            this.currentPage = null;
	
	            this.page.hidePreloader();
	        }
	    }, {
	        key: "reloadSiteInfo",
	        value: function reloadSiteInfo() {
	            var _this2 = this;
	
	            setTimeout(this.reloadSiteInfo.bind(this), 15000);
	            if (_utils2.default.unixTimestamp("now") - this.siteInfoUpdatedAt < 30) {
	                return;
	            }
	            this.cmd("siteInfo", {}, function (newInfo) {
	                _this2.updateSiteInfo(newInfo);
	            });
	        }
	    }, {
	        key: "reloadSettings",
	        value: function reloadSettings() {
	            var _this3 = this;
	
	            return new Promise(function (resolve, reject) {
	                _this3.cmd("fileGet", { inner_path: "data/settings.json" }, function (settingsJSON) {
	                    try {
	                        _this3._Settings = JSON.parse(settingsJSON);
	                        return resolve();
	                    } catch (e) {
	                        console.log("Error with settings file. Please report to dev.");
	                        return reject();
	                    }
	                });
	            });
	        }
	    }, {
	        key: "onOpenWebsocket",
	        value: function onOpenWebsocket() {
	            var _this4 = this;
	
	            this.reloadSettings().then(function () {
	                _this4.cmd("siteInfo", {}, function (newInfo) {
	                    _this4.updateSiteInfo(newInfo);
	
	                    if (_this4.currentPage == null) {
	                        _this4.page.renderHeader();
	                        //this.determineRoute()
	                    }
	
	                    _this4.reloadSiteInfo();
	                });
	            });
	        }
	
	        //determineRoute () {
	        //
	        //}
	
	    }, {
	        key: "onRequest",
	        value: function onRequest(cmd, message) {
	            if (cmd == "setSiteInfo") {
	                this.updateSiteInfo(message);
	            }
	        }
	    }, {
	        key: "shortUserName",
	        value: function shortUserName() {
	            var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	            if (!name) {
	                name = this.siteInfo.cert_user_id;
	            }
	            if (name == "syleron@zeroid.bit") {
	                return "[dev] Syleron";
	            }
	            if (!name) {
	                return name;
	            }
	            return name.split("@")[0];
	        }
	    }, {
	        key: "updateSiteInfo",
	        value: function updateSiteInfo(newInfo) {
	            this.siteInfo = newInfo.params || newInfo;
	            this.siteInfoUpdatedAt = _utils2.default.unixTimestamp("now");
	            this.page.updateSiteInfo(this.siteInfo);
	        }
	    }, {
	        key: "grepPath",
	        value: function grepPath() {
	            var result = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = location.search.substring(1).split("/")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var part = _step.value;
	
	                    if (!!part.match("wrapper_nonce")) {
	                        part = part.split("wrapper_nonce")[0];
	                    }
	                    part = part.trim();
	                    if (part[part.length - 1] == "&") {
	                        part = part.substring(0, part.length - 1);
	                    }
	                    if (part == "" || part == "&") {
	                        continue;
	                    }
	                    result.push(part);
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
	
	            this._currentPath = result;
	        }
	    }]);
	
	    return Zeroboard;
	}(_zero_frame2.default);
	
	window.Zeroboard = new Zeroboard();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var newPost = function () {
	    function newPost() {
	        ////  this.element = document.getElementById("submit-new-post")
	
	        /// this.element.addEventListener("click", this.onClick(this));
	
	        _classCallCheck(this, newPost);
	    }
	
	    _createClass(newPost, [{
	        key: "onClick",
	        value: function onClick(comp) {
	            ////  comp.addModal()
	        }
	    }, {
	        key: "addModal",
	        value: function addModal() {
	            //   document.body.innerHTML += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">Modal title</h4> </div><div class="modal-body"> ... </div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Save changes</button> </div></div></div></div>'
	        }
	    }, {
	        key: "removeModal",
	        value: function removeModal() {}
	    }]);
	
	    return newPost;
	}();
	
	exports.default = newPost;
	
	new newPost();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CMD_INNER_READY = 'innerReady';
	var CMD_RESPONSE = 'response';
	var CMD_WRAPPER_READY = 'wrapperReady';
	var CMD_PING = 'ping';
	var CMD_PONG = 'pong';
	var CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket';
	var CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket';
	
	var ZeroFrame = function () {
	    function ZeroFrame() {
	        _classCallCheck(this, ZeroFrame);
	
	        this.waiting_cb = {};
	        this.connect();
	        this.next_message_id = 1;
	        this.init();
	    }
	
	    _createClass(ZeroFrame, [{
	        key: 'init',
	        value: function init() {
	            return this;
	        }
	    }, {
	        key: 'connect',
	        value: function connect() {
	            var _this = this;
	
	            this.target = window.parent;
	            window.addEventListener('message', function (e) {
	                return _this.onMessage(e);
	            }, false);
	            this.cmd(CMD_INNER_READY);
	        }
	    }, {
	        key: 'onMessage',
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
	        key: 'onRequest',
	        value: function onRequest(cmd, message) {
	            this.log("Unknown command", message);
	        }
	    }, {
	        key: 'response',
	        value: function response(to, result) {
	            this.send({
	                cmd: CMD_RESPONSE,
	                to: to,
	                result: result
	            });
	        }
	    }, {
	        key: 'cmd',
	        value: function cmd(_cmd) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	            var cb = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	            this.send({
	                cmd: _cmd,
	                params: params
	            }, cb);
	        }
	    }, {
	        key: 'send',
	        value: function send(message) {
	            var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	            message.id = this.next_message_id;
	            this.next_message_id++;
	            this.target.postMessage(message, '*');
	
	            if (cb) {
	                this.waiting_cb[message.id] = cb;
	            }
	        }
	    }, {
	        key: 'log',
	        value: function log() {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }
	
	            console.log.apply(console, ['[ZeroFrame]'].concat(args));
	        }
	    }, {
	        key: 'onOpenWebsocket',
	        value: function onOpenWebsocket() {
	            this.log('Websocket open');
	        }
	    }, {
	        key: 'onCloseWebsocket',
	        value: function onCloseWebsocket() {
	            this.log('Websocket close');
	        }
	    }]);
	
	    return ZeroFrame;
	}();

	exports.default = ZeroFrame;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Page = function () {
	    function Page() {
	        _classCallCheck(this, Page);
	
	        this.preloader = document.getElementById("preloader");
	        this.main_content = document.getElementById("main-content");
	    }
	
	    _createClass(Page, [{
	        key: "showPreloader",
	        value: function showPreloader() {
	            this.preloader.style.display = "block";
	            this.main_content.style.display = "none";
	        }
	    }, {
	        key: "hidePreloader",
	        value: function hidePreloader() {
	            this.preloader.style.display = "none";
	            this.main_content.style.display = "block";
	            this.main_content.className = "fadein";
	        }
	    }, {
	        key: "renderHeader",
	        value: function renderHeader(siteInfo) {
	            this.updateSiteInfo(siteInfo);
	        }
	    }, {
	        key: "updateSiteInfo",
	        value: function updateSiteInfo(newInfo) {
	            var siteinfo = document.getElementById("siteinfo");
	
	            if (newInfo) siteinfo.innerHTML = newInfo.settings.peers + " Peers, " + _utils2.default.formatSizeUnits(newInfo.settings.size);
	        }
	    }]);
	
	    return Page;
	}();

	exports.default = Page;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    _createClass(Utils, null, [{
	        key: 'formatSizeUnits',
	        value: function formatSizeUnits(bytes) {
	            if (bytes >= 1000000000) {
	                bytes = (bytes / 1000000000).toFixed(2) + ' GB';
	            } else if (bytes >= 1000000) {
	                bytes = (bytes / 1000000).toFixed(2) + ' MB';
	            } else if (bytes >= 1000) {
	                bytes = (bytes / 1000).toFixed(2) + ' KB';
	            } else if (bytes > 1) {
	                bytes = bytes + ' bytes';
	            } else if (bytes == 1) {
	                bytes = bytes + ' byte';
	            } else {
	                bytes = '0 byte';
	            }
	            return bytes;
	        }
	    }, {
	        key: 'timeSince',
	        value: function timeSince(time) {
	            var now, secs, back;
	
	            now = +new Date() / 1000;
	            secs = now - time;
	
	            if (secs < 60) {
	                back = "just now";
	            } else if (secs < 60 * 60) {
	                back = Math.round(secs / 60) + " minutes ago";
	            } else if (secs < 60 * 60 * 24) {
	                back = Math.round(secs / 60 / 60) + " hours ago";
	            } else if (secs < 60 * 60 * 24 * 3) {
	                back = Math.round(secs / 60 / 60 / 24) + " days ago";
	            } else {
	                back = "on " + this.formatDate(time);
	            }
	            back = back.replace(/^1 ([a-z]+)s/, "1 $1");
	
	            return back;
	        }
	    }, {
	        key: 'formatDate',
	        value: function formatDate(timestamp) {
	            var format = arguments.length <= 1 || arguments[1] === undefined ? "short" : arguments[1];
	
	            var parts, display;
	            parts = new Date(timestamp * 1000).toString().split(" ");
	
	            if (format == "short") {
	                display = parts.slice(1, 4);
	            } else {
	                display = parts.slice(1, 5);
	            }
	
	            return display.join(" ").replace(/( [0-9]{4})/, ",$1");
	        }
	    }, {
	        key: 'unixTimestamp',
	        value: function unixTimestamp() {
	            var date = arguments.length <= 0 || arguments[0] === undefined ? "now" : arguments[0];
	
	            if (date == "now") {
	                return parseInt(+new Date() / 1000);
	            } else {
	                parseInt(Date.parse(date) / 1000);
	            }
	        }
	    }, {
	        key: 'fixLink',
	        value: function fixLink(href) {
	            if (document.location.pathname != "/") {
	                return href;
	            }
	
	            return "/" + href;
	        }
	    }]);
	
	    return Utils;
	}();

	exports.default = Utils;

/***/ }
/******/ ]);
//# sourceMappingURL=zeroboard.js.map