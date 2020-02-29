webpackJsonp([1],Array(28).concat([
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TooMuchError = exports.NotEnoughError = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.toSlug = toSlug;

var _route = __webpack_require__(61);

var _startup = __webpack_require__(84);

var _startup2 = _interopRequireDefault(_startup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _extendableBuiltin3(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

function toSlug(s) {
	return s.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").toLowerCase();
};

var NotEnoughError = function (_extendableBuiltin2) {
	_inherits(NotEnoughError, _extendableBuiltin2);

	function NotEnoughError() {
		_classCallCheck(this, NotEnoughError);

		return _possibleConstructorReturn(this, (NotEnoughError.__proto__ || Object.getPrototypeOf(NotEnoughError)).apply(this, arguments));
	}

	return NotEnoughError;
}(_extendableBuiltin(Error));

;

var TooMuchError = function (_extendableBuiltin4) {
	_inherits(TooMuchError, _extendableBuiltin4);

	function TooMuchError() {
		_classCallCheck(this, TooMuchError);

		return _possibleConstructorReturn(this, (TooMuchError.__proto__ || Object.getPrototypeOf(TooMuchError)).apply(this, arguments));
	}

	return TooMuchError;
}(_extendableBuiltin3(Error));

;
exports.NotEnoughError = NotEnoughError;
exports.TooMuchError = TooMuchError;

var Hub = function () {
	function Hub(slug) {
		_classCallCheck(this, Hub);

		this.slug = slug;
	}

	_createClass(Hub, [{
		key: "init",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _startup2.default)();

							case 2:
								_context.next = 4;
								return Hub.slugToData(this.slug);

							case 4:
								data = _context.sent;

								this.address = data.address;
								this.language = data.language;
								this.subgroup = data.subgroup;

								_context.next = 10;
								return (0, _startup.addMergedSite)(this.address);

							case 10:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function init() {
				return _ref.apply(this, arguments);
			}

			return init;
		}()
	}, {
		key: "getIndex",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return _route.zeroDB.query("\n\t\t\tSELECT\n\t\t\t\tarticle.title,\n\t\t\t\tarticle.text,\n\t\t\t\tarticle.slug,\n\t\t\t\tMAX(article.date_updated) AS date_updated,\n\t\t\t\tarticle.imported,\n\t\t\t\tarticle.json_id\n\t\t\tFROM article\n\n\t\t\tLEFT JOIN json\n\t\t\tUSING (json_id)\n\n\t\t\tWHERE json.directory LIKE \"" + this.address + "/%\"\n\t\t\tAND json.site = \"merged-Kiwipedia\"\n\n\t\t\tGROUP BY article.slug\n\t\t");

							case 2:
								return _context2.abrupt("return", _context2.sent);

							case 3:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getIndex() {
				return _ref2.apply(this, arguments);
			}

			return getIndex;
		}()
	}, {
		key: "getArticle",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(slug) {
				var importOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
				var res;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return _route.zeroDB.query("\n\t\t\tSELECT\n\t\t\t\tarticle.*,\n\t\t\t\tjson_content.cert_user_id\n\t\t\tFROM article\n\n\t\t\tLEFT JOIN json USING (json_id)\n\n\t\t\tLEFT JOIN json AS json_content ON (\n\t\t\t\tjson.directory = json_content.directory\n\t\t\t\tAND json.site = json_content.site\n\t\t\t\tAND json_content.file_name = \"content.json\"\n\t\t\t)\n\n\t\t\tWHERE slug = :slug\n\t\t\tAND json_content.directory LIKE \"" + this.address + "/%\"\n\t\t\tAND json_content.site = \"merged-Kiwipedia\"\n\t\t\tAND imported = :importOrigin\n\n\t\t\tORDER BY date_updated DESC\n\n\t\t\tLIMIT 1\n\t\t", { slug: slug, importOrigin: importOrigin });

							case 2:
								res = _context3.sent;

								if (!(res.length == 0)) {
									_context3.next = 5;
									break;
								}

								throw new NotEnoughError("No articles found for slug " + slug + " in hub " + this.slug);

							case 5:
								return _context3.abrupt("return", res[0]);

							case 6:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function getArticle(_x2) {
				return _ref3.apply(this, arguments);
			}

			return getArticle;
		}()
	}, {
		key: "getArticleOrigins",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(slug) {
				var res;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return _route.zeroDB.query("\n\t\t\tSELECT\n\t\t\t\tarticle.*,\n\t\t\t\tjson_content.cert_user_id\n\t\t\tFROM article\n\n\t\t\tLEFT JOIN json USING (json_id)\n\n\t\t\tLEFT JOIN json AS json_content ON (\n\t\t\t\tjson.directory = json_content.directory\n\t\t\t\tAND json.site = json_content.site\n\t\t\t\tAND json_content.file_name = \"content.json\"\n\t\t\t)\n\n\t\t\tWHERE slug = :slug\n\t\t\tAND json_content.directory LIKE \"" + this.address + "/%\"\n\t\t\tAND json_content.site = \"merged-Kiwipedia\"\n\n\t\t\tGROUP BY imported\n\t\t", { slug: slug });

							case 2:
								res = _context4.sent;

								if (!(res.length == 0)) {
									_context4.next = 5;
									break;
								}

								throw new NotEnoughError("No articles found for slug " + slug + " in hub " + this.slug);

							case 5:
								return _context4.abrupt("return", res.map(function (row) {
									return row.imported;
								}));

							case 6:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function getArticleOrigins(_x3) {
				return _ref4.apply(this, arguments);
			}

			return getArticleOrigins;
		}()
	}, {
		key: "getArticleVersion",
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(slug, date) {
				var res;
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								_context5.next = 2;
								return _route.zeroDB.query("\n\t\t\tSELECT\n\t\t\t\tarticle.*,\n\t\t\t\tjson_content.cert_user_id\n\t\t\tFROM article\n\n\t\t\tLEFT JOIN json USING (json_id)\n\n\t\t\tLEFT JOIN json AS json_content ON (\n\t\t\t\tjson.directory = json_content.directory\n\t\t\t\tAND json.site = json_content.site\n\t\t\t\tAND json_content.file_name = \"content.json\"\n\t\t\t)\n\n\t\t\tWHERE slug = :slug\n\t\t\tAND json_content.directory LIKE \"" + this.address + "/%\"\n\t\t\tAND json_content.site = \"merged-Kiwipedia\"\n\t\t\tAND article.date_updated = :date\n\n\t\t\tLIMIT 1\n\t\t", { slug: slug, date: date });

							case 2:
								res = _context5.sent;

								if (!(res.length == 0)) {
									_context5.next = 5;
									break;
								}

								throw new NotEnoughError("No article found for slug " + slug + " and version " + date + " in hub " + this.slug);

							case 5:
								return _context5.abrupt("return", res[0]);

							case 6:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function getArticleVersion(_x4, _x5) {
				return _ref5.apply(this, arguments);
			}

			return getArticleVersion;
		}()
	}, {
		key: "getArticleHistory",
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(slug) {
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.next = 2;
								return _route.zeroDB.query("\n\t\t\tSELECT\n\t\t\t\tarticle.*,\n\t\t\t\tjson_content.cert_user_id\n\t\t\tFROM article\n\n\t\t\tLEFT JOIN json USING (json_id)\n\n\t\t\tLEFT JOIN json AS json_content ON (\n\t\t\t\tjson.directory = json_content.directory\n\t\t\t\tAND json.site = json_content.site\n\t\t\t\tAND json_content.file_name = \"content.json\"\n\t\t\t)\n\n\t\t\tWHERE slug = :slug\n\t\t\tAND json_content.directory LIKE \"" + this.address + "/%\"\n\t\t\tAND json_content.site = \"merged-Kiwipedia\"\n\n\t\t\tORDER BY date_updated DESC\n\t\t", { slug: slug });

							case 2:
								return _context6.abrupt("return", _context6.sent);

							case 3:
							case "end":
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function getArticleHistory(_x6) {
				return _ref6.apply(this, arguments);
			}

			return getArticleHistory;
		}()
	}, {
		key: "publishArticle",
		value: function () {
			var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(title, text) {
				var imported = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
				var auth, slug;
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								_context7.next = 2;
								return _route.zeroAuth.requestAuth();

							case 2:
								auth = _context7.sent;
								slug = toSlug(title);
								_context7.next = 6;
								return _route.zeroDB.insertRow("merged-Kiwipedia/" + this.address + "/data/users/" + auth.address + "/" + slug + ".json", "merged-Kiwipedia/" + this.address + "/data/users/" + auth.address + "/content.json", "article", {
									title: title,
									text: text,
									slug: slug,
									date_updated: Date.now(),
									imported: imported
								}, null, null);

							case 6:
								return _context7.abrupt("return", slug);

							case 7:
							case "end":
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function publishArticle(_x8, _x9) {
				return _ref7.apply(this, arguments);
			}

			return publishArticle;
		}()
	}], [{
		key: "slugToData",
		value: function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(slug) {
				var result;
				return regeneratorRuntime.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								_context8.next = 2;
								return _route.zeroDB.query("\n\t\t\tSELECT *\n\t\t\tFROM hubs\n\n\t\t\tWHERE slug = :slug\n\t\t\tGROUP BY address\n\t\t", { slug: slug });

							case 2:
								result = _context8.sent;

								if (!(result.length == 0)) {
									_context8.next = 7;
									break;
								}

								throw new NotEnoughError("No addresses found for hub slug " + slug);

							case 7:
								if (!(result.length > 1)) {
									_context8.next = 9;
									break;
								}

								throw new TooMuchError(result.length + " addresses found for hub slug " + slug);

							case 9:
								return _context8.abrupt("return", result[0]);

							case 10:
							case "end":
								return _context8.stop();
						}
					}
				}, _callee8, this);
			}));

			function slugToData(_x10) {
				return _ref8.apply(this, arguments);
			}

			return slugToData;
		}()
	}]);

	return Hub;
}();

exports.default = Hub;
;

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.zeroAuth = exports.zeroFS = exports.zeroDB = exports.zeroPage = exports.route = undefined;

var _ZeroFrame = __webpack_require__(494);

var _ZeroFrame2 = _interopRequireDefault(_ZeroFrame);

var _ZeroPage = __webpack_require__(495);

var _ZeroPage2 = _interopRequireDefault(_ZeroPage);

var _ZeroFS = __webpack_require__(168);

var _ZeroFS2 = _interopRequireDefault(_ZeroFS);

var _ZeroDB = __webpack_require__(496);

var _ZeroDB2 = _interopRequireDefault(_ZeroDB);

var _ZeroAuth = __webpack_require__(169);

var _ZeroAuth2 = _interopRequireDefault(_ZeroAuth);

var _vueMin = __webpack_require__(115);

var _vueMin2 = _interopRequireDefault(_vueMin);

var _vuerouter = __webpack_require__(497);

var _vuerouter2 = _interopRequireDefault(_vuerouter);

var _routes = __webpack_require__(499);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zf = new _ZeroFrame2.default();

var zp = new _ZeroPage2.default(zf);

var zeroFS = new _ZeroFS2.default(zp);

var zeroDB = new _ZeroDB2.default(zp);

var zeroAuth = new _ZeroAuth2.default(zp);
zp.auth = zeroAuth;

var router = (0, _vuerouter2.default)(zp);
_vueMin2.default.use(router.plugin);

zp.on("wrapperPopState", function (res) {
	return router.router.listenForBack(res.params);
});

var route = exports.route = function route(vue) {
	var routes = (0, _routes2.default)(vue, zp);

	routes.forEach(function (route) {
		router.router.add({
			path: route.path,
			controller: function controller(params) {
				var oldView = vue.currentView;

				route.controller(params);
				if (oldView == vue.currentView) {
					vue.currentView = null;
					vue.$nextTick(function () {
						return vue.currentView = oldView;
					});
				}
			}
		});
	});
	router.router.check(router.router.getURL());
};

exports.zeroPage = zp;
exports.zeroDB = zeroDB;
exports.zeroFS = zeroFS;
exports.zeroAuth = zeroAuth;

/***/ }),
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var context = __webpack_require__(523);

var Templates = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = context.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var file = _step.value;

		if (file == "./templates.js") {
			continue;
		}

		var template = context(file).default;

		var names = template.name;
		if (typeof names == "string") {
			names = [names];
		}

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var name = _step2.value;

				Templates[name] = template;
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

exports.default = Templates;

/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadAdditional = exports.addMergedSite = undefined;

var addMergedSite = exports.addMergedSite = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
		var list;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _route.zeroPage.cmd("mergerSiteList");

					case 2:
						list = _context.sent;

						if (!list[address]) {
							_context.next = 5;
							break;
						}

						return _context.abrupt("return");

					case 5:
						_context.next = 7;
						return new Promise(function (resolve, reject) {
							// Wait for some file to download
							var handler = function handler(siteInfo) {
								if (siteInfo.params.address != address) {
									return;
								}

								var event = siteInfo.params.event;
								if (event[0] == "file_done") {
									_route.zeroPage.off("setSiteInfo", handler);
									resolve(true);
								}
							};
							_route.zeroPage.on("setSiteInfo", handler);

							_route.zeroPage.cmd("mergerSiteAdd", [address]);
						});

					case 7:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function addMergedSite(_x) {
		return _ref.apply(this, arguments);
	};
}();

var startup = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
		var siteInfo;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return _route.zeroPage.getSiteInfo();

					case 2:
						siteInfo = _context2.sent;

						if (!(siteInfo.settings.permissions.indexOf("Merger:Kiwipedia") == -1)) {
							_context2.next = 6;
							break;
						}

						_context2.next = 6;
						return _route.zeroPage.cmd("wrapperPermissionAdd", ["Merger:Kiwipedia"]);

					case 6:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function startup() {
		return _ref2.apply(this, arguments);
	};
}();

var loadAdditional = exports.loadAdditional = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return startup();

					case 2:
						_context3.next = 4;
						return addMergedSite(config.templateAddress);

					case 4:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function loadAdditional() {
		return _ref3.apply(this, arguments);
	};
}();

var _route = __webpack_require__(61);

var _config = __webpack_require__(116);

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;
exports.default = startup;
;

/***/ }),
/* 85 */,
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/***********************************************
Copyright 2010, 2011, Chris Winberry <chris@winberry.net>. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
***********************************************/
/* v1.7.6 */

(function () {

	//Types of elements found in the DOM
	var ElementType = {
		Text: "text" //Plain text
		, Directive: "directive" //Special tag <!...>
		, Comment: "comment" //Special tag <!--...-->
		, Script: "script" //Special tag <script>...</script>
		, Style: "style" //Special tag <style>...</style>
		, Tag: "tag" //Any tag that isn't special
	};

	function Parser(handler, options) {
		this._options = options ? options : {};
		if (this._options.includeLocation == undefined) {
			this._options.includeLocation = false; //Do not track element position in document by default
		}

		this.validateHandler(handler);
		this._handler = handler;
		this.reset();
	}

	//**"Static"**//
	//Regular expressions used for cleaning up and parsing (stateless)
	Parser._reTrim = /(^\s+|\s+$)/g; //Trim leading/trailing whitespace
	Parser._reTrimComment = /(^\!--|--$)/g; //Remove comment tag markup from comment contents
	Parser._reWhitespace = /\s/g; //Used to find any whitespace to split on
	Parser._reTagName = /^\s*(\/?)\s*([^\s\/]+)/; //Used to find the tag name for an element

	//Regular expressions used for parsing (stateful)
	Parser._reAttrib = //Find attributes in a tag
	/([^=<>\"\'\s]+)\s*=\s*"([^"]*)"|([^=<>\"\'\s]+)\s*=\s*'([^']*)'|([^=<>\"\'\s]+)\s*=\s*([^'"\s]+)|([^=<>\"\'\s\/]+)/g;
	Parser._reTags = /[\<\>]/g; //Find tag markers

	//**Public**//
	//Methods//
	//Parses a complete HTML and pushes it to the handler
	Parser.prototype.parseComplete = function Parser$parseComplete(data) {
		this.reset();
		this.parseChunk(data);
		this.done();
	};

	//Parses a piece of an HTML document
	Parser.prototype.parseChunk = function Parser$parseChunk(data) {
		if (this._done) this.handleError(new Error("Attempted to parse chunk after parsing already done"));
		this._buffer += data; //FIXME: this can be a bottleneck
		this.parseTags();
	};

	//Tells the parser that the HTML being parsed is complete
	Parser.prototype.done = function Parser$done() {
		if (this._done) return;
		this._done = true;

		//Push any unparsed text into a final element in the element list
		if (this._buffer.length) {
			var rawData = this._buffer;
			this._buffer = "";
			var element = {
				raw: rawData,
				data: this._parseState == ElementType.Text ? rawData : rawData.replace(Parser._reTrim, ""),
				type: this._parseState
			};
			if (this._parseState == ElementType.Tag || this._parseState == ElementType.Script || this._parseState == ElementType.Style) element.name = this.parseTagName(element.data);
			this.parseAttribs(element);
			this._elements.push(element);
		}

		this.writeHandler();
		this._handler.done();
	};

	//Resets the parser to a blank state, ready to parse a new HTML document
	Parser.prototype.reset = function Parser$reset() {
		this._buffer = "";
		this._bufferOffset = 0;
		this._done = false;
		this._elements = [];
		this._elementsCurrent = 0;
		this._current = 0;
		this._next = 0;
		this._location = {
			row: 0,
			col: 0,
			charOffset: 0,
			inBuffer: 0
		};
		this._parseState = ElementType.Text;
		this._prevTagSep = '';
		this._tagStack = [];
		this._handler.reset();
	};

	//**Private**//
	//Properties//
	Parser.prototype._options = null; //Parser options for how to behave
	Parser.prototype._handler = null; //Handler for parsed elements
	Parser.prototype._buffer = null; //Buffer of unparsed data
	Parser.prototype._done = false; //Flag indicating whether parsing is done
	Parser.prototype._elements = null; //Array of parsed elements
	Parser.prototype._elementsCurrent = 0; //Pointer to last element in _elements that has been processed
	Parser.prototype._current = 0; //Position in data that has already been parsed
	Parser.prototype._next = 0; //Position in data of the next tag marker (<>)
	Parser.prototype._location = null; //Position tracking for elements in a stream
	Parser.prototype._parseState = ElementType.Text; //Current type of element being parsed
	Parser.prototype._prevTagSep = ''; //Previous tag marker found
	//Stack of element types previously encountered; keeps track of when
	//parsing occurs inside a script/comment/style tag
	Parser.prototype._tagStack = null;

	//Methods//
	//Takes an array of elements and parses any found attributes
	Parser.prototype.parseTagAttribs = function Parser$parseTagAttribs(elements) {
		var idxEnd = elements.length;
		var idx = 0;

		while (idx < idxEnd) {
			var element = elements[idx++];
			if (element.type == ElementType.Tag || element.type == ElementType.Script || element.type == ElementType.style) this.parseAttribs(element);
		}

		return elements;
	};

	//Takes an element and adds an "attribs" property for any element attributes found 
	Parser.prototype.parseAttribs = function Parser$parseAttribs(element) {
		//Only parse attributes for tags
		if (element.type != ElementType.Script && element.type != ElementType.Style && element.type != ElementType.Tag) return;

		var tagName = element.data.split(Parser._reWhitespace, 1)[0];
		var attribRaw = element.data.substring(tagName.length);
		if (attribRaw.length < 1) return;

		var match;
		Parser._reAttrib.lastIndex = 0;
		while (match = Parser._reAttrib.exec(attribRaw)) {
			if (element.attribs == undefined) element.attribs = {};

			if (typeof match[1] == "string" && match[1].length) {
				element.attribs[match[1]] = match[2];
			} else if (typeof match[3] == "string" && match[3].length) {
				element.attribs[match[3].toString()] = match[4].toString();
			} else if (typeof match[5] == "string" && match[5].length) {
				element.attribs[match[5]] = match[6];
			} else if (typeof match[7] == "string" && match[7].length) {
				element.attribs[match[7]] = match[7];
			}
		}
	};

	//Extracts the base tag name from the data value of an element
	Parser.prototype.parseTagName = function Parser$parseTagName(data) {
		if (data == null || data == "") return "";
		var match = Parser._reTagName.exec(data);
		if (!match) return "";
		return (match[1] ? "/" : "") + match[2];
	};

	//Parses through HTML text and returns an array of found elements
	//I admit, this function is rather large but splitting up had an noticeable impact on speed
	Parser.prototype.parseTags = function Parser$parseTags() {
		var bufferEnd = this._buffer.length - 1;
		while (Parser._reTags.test(this._buffer)) {
			this._next = Parser._reTags.lastIndex - 1;
			var tagSep = this._buffer.charAt(this._next); //The currently found tag marker
			var rawData = this._buffer.substring(this._current, this._next); //The next chunk of data to parse

			//A new element to eventually be appended to the element list
			var element = {
				raw: rawData,
				data: this._parseState == ElementType.Text ? rawData : rawData.replace(Parser._reTrim, ""),
				type: this._parseState,
				from: this._current + this._bufferOffset,
				to: this._next + this._bufferOffset
			};

			var elementName = this.parseTagName(element.data);

			//This section inspects the current tag stack and modifies the current
			//element if we're actually parsing a special area (script/comment/style tag)
			if (this._tagStack.length) {
				//We're parsing inside a script/comment/style tag
				if (this._tagStack[this._tagStack.length - 1] == ElementType.Script) {
					//We're currently in a script tag
					if (elementName.toLowerCase() == "/script") //Actually, we're no longer in a script tag, so pop it off the stack
						this._tagStack.pop();else {
						//Not a closing script tag
						if (element.raw.indexOf("!--") != 0) {
							//Make sure we're not in a comment
							//All data from here to script close is now a text element
							element.type = ElementType.Text;
							//If the previous element is text, append the current text to it
							if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Text) {
								var prevElement = this._elements[this._elements.length - 1];
								prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep + element.raw;
								element.raw = element.data = ""; //This causes the current element to not be added to the element list
							}
						}
					}
				} else if (this._tagStack[this._tagStack.length - 1] == ElementType.Style) {
					//We're currently in a style tag
					if (elementName.toLowerCase() == "/style") //Actually, we're no longer in a style tag, so pop it off the stack
						this._tagStack.pop();else {
						if (element.raw.indexOf("!--") != 0) {
							//Make sure we're not in a comment
							//All data from here to style close is now a text element
							element.type = ElementType.Text;
							//If the previous element is text, append the current text to it
							if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Text) {
								var prevElement = this._elements[this._elements.length - 1];
								if (element.raw != "") {
									prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep + element.raw;
									element.raw = element.data = ""; //This causes the current element to not be added to the element list
								} else {
									//Element is empty, so just append the last tag marker found
									prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep;
								}
							} else {
								//The previous element was not text
								if (element.raw != "") {
									element.raw = element.data = element.raw;
								}
							}
						}
					}
				} else if (this._tagStack[this._tagStack.length - 1] == ElementType.Comment) {
					//We're currently in a comment tag
					var rawLen = element.raw.length;
					if (element.raw.charAt(rawLen - 2) == "-" && element.raw.charAt(rawLen - 1) == "-" && tagSep == ">") {
						//Actually, we're no longer in a style tag, so pop it off the stack
						this._tagStack.pop();
						//If the previous element is a comment, append the current text to it
						if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Comment) {
							var prevElement = this._elements[this._elements.length - 1];
							prevElement.raw = prevElement.data = (prevElement.raw + element.raw).replace(Parser._reTrimComment, "");
							element.raw = element.data = ""; //This causes the current element to not be added to the element list
							element.type = ElementType.Text;
						} else //Previous element not a comment
							element.type = ElementType.Comment; //Change the current element's type to a comment
					} else {
						//Still in a comment tag
						element.type = ElementType.Comment;
						//If the previous element is a comment, append the current text to it
						if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Comment) {
							var prevElement = this._elements[this._elements.length - 1];
							prevElement.raw = prevElement.data = prevElement.raw + element.raw + tagSep;
							element.raw = element.data = ""; //This causes the current element to not be added to the element list
							element.type = ElementType.Text;
						} else element.raw = element.data = element.raw + tagSep;
					}
				}
			}

			//Processing of non-special tags
			if (element.type == ElementType.Tag) {
				element.name = elementName;
				var elementNameCI = elementName.toLowerCase();

				if (element.raw.indexOf("!--") == 0) {
					//This tag is really comment
					element.type = ElementType.Comment;
					delete element["name"];
					var rawLen = element.raw.length;
					//Check if the comment is terminated in the current element
					if (element.raw.charAt(rawLen - 1) == "-" && element.raw.charAt(rawLen - 2) == "-" && tagSep == ">") element.raw = element.data = element.raw.replace(Parser._reTrimComment, "");else {
						//It's not so push the comment onto the tag stack
						element.raw += tagSep;
						this._tagStack.push(ElementType.Comment);
					}
				} else if (element.raw.indexOf("!") == 0 || element.raw.indexOf("?") == 0) {
					element.type = ElementType.Directive;
					//TODO: what about CDATA?
				} else if (elementNameCI == "script") {
					element.type = ElementType.Script;
					//Special tag, push onto the tag stack if not terminated
					if (element.data.charAt(element.data.length - 1) != "/") this._tagStack.push(ElementType.Script);
				} else if (elementNameCI == "/script") element.type = ElementType.Script;else if (elementNameCI == "style") {
					element.type = ElementType.Style;
					//Special tag, push onto the tag stack if not terminated
					if (element.data.charAt(element.data.length - 1) != "/") this._tagStack.push(ElementType.Style);
				} else if (elementNameCI == "/style") element.type = ElementType.Style;
				if (element.name && element.name.charAt(0) == "/") element.data = element.name;
			}

			//Add all tags and non-empty text elements to the element list
			if (element.raw != "" || element.type != ElementType.Text) {
				if (this._options.includeLocation && !element.location) {
					element.location = this.getLocation(element.type == ElementType.Tag);
				}
				this.parseAttribs(element);
				this._elements.push(element);
				//If tag self-terminates, add an explicit, separate closing tag
				if (element.type != ElementType.Text && element.type != ElementType.Comment && element.type != ElementType.Directive && element.data.charAt(element.data.length - 1) == "/") this._elements.push({
					raw: "/" + element.name,
					data: "/" + element.name,
					name: "/" + element.name,
					type: element.type
				});
			}
			this._parseState = tagSep == "<" ? ElementType.Tag : ElementType.Text;
			this._current = this._next + 1;
			this._prevTagSep = tagSep;
		}

		if (this._options.includeLocation) {
			this.getLocation();
			this._location.row += this._location.inBuffer;
			this._location.inBuffer = 0;
			this._location.charOffset = 0;
		}
		this._buffer = this._current <= bufferEnd ? this._buffer.substring(this._current) : "";
		this._bufferOffset += this.current;
		this._current = 0;

		this.writeHandler();
	};

	Parser.prototype.getLocation = function Parser$getLocation(startTag) {
		var c,
		    l = this._location,
		    end = this._current - (startTag ? 1 : 0),
		    chunk = startTag && l.charOffset == 0 && this._current == 0;

		for (; l.charOffset < end; l.charOffset++) {
			c = this._buffer.charAt(l.charOffset);
			if (c == '\n') {
				l.inBuffer++;
				l.col = 0;
			} else if (c != '\r') {
				l.col++;
			}
		}
		return {
			line: l.row + l.inBuffer + 1,
			col: l.col + (chunk ? 0 : 1)
		};
	};

	//Checks the handler to make it is an object with the right "interface"
	Parser.prototype.validateHandler = function Parser$validateHandler(handler) {
		if ((typeof handler === "undefined" ? "undefined" : _typeof(handler)) != "object") throw new Error("Handler is not an object");
		if (typeof handler.reset != "function") throw new Error("Handler method 'reset' is invalid");
		if (typeof handler.done != "function") throw new Error("Handler method 'done' is invalid");
		if (typeof handler.writeTag != "function") throw new Error("Handler method 'writeTag' is invalid");
		if (typeof handler.writeText != "function") throw new Error("Handler method 'writeText' is invalid");
		if (typeof handler.writeComment != "function") throw new Error("Handler method 'writeComment' is invalid");
		if (typeof handler.writeDirective != "function") throw new Error("Handler method 'writeDirective' is invalid");
	};

	//Writes parsed elements out to the handler
	Parser.prototype.writeHandler = function Parser$writeHandler(forceFlush) {
		forceFlush = !!forceFlush;
		if (this._tagStack.length && !forceFlush) return;
		while (this._elements.length) {
			var element = this._elements.shift();
			switch (element.type) {
				case ElementType.Comment:
					this._handler.writeComment(element);
					break;
				case ElementType.Directive:
					this._handler.writeDirective(element);
					break;
				case ElementType.Text:
					this._handler.writeText(element);
					break;
				default:
					this._handler.writeTag(element);
					break;
			}
		}
	};

	Parser.prototype.handleError = function Parser$handleError(error) {
		if (typeof this._handler.error == "function") this._handler.error(error);else throw error;
	};

	exports.Parser = Parser;

	exports.ElementType = ElementType;
})();

/***/ }),
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var templateAddress = exports.templateAddress = "1LAdo54S3sDzKWHrv1Pp1Ncj78fL5LU8gR";
var zeroWikiAddress = exports.zeroWikiAddress = "138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP";

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_render_vue__ = __webpack_require__(177);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_182819f4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_render_vue__ = __webpack_require__(590);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(520)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-182819f4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_render_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_182819f4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_render_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "common\\wiki-engine\\render.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-182819f4", Component.options)
  } else {
    hotAPI.reload("data-v-182819f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.base64encode = base64encode;
exports.base64decode = base64decode;
function base64encode(str) {
	return btoa(unescape(encodeURIComponent(str)));
};
function base64decode(str) {
	return decodeURIComponent(escape(atob(str)));
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _htmlparser = __webpack_require__(86);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Handler = function () {
	function Handler(data) {
		_classCallCheck(this, Handler);

		this._done = false;
		this._tagStack = null;

		this.data = data;
		this.reset();
	}

	// HTML Tags that shouldn't contain child nodes


	// Regex to detect whitespace only text nodes


	_createClass(Handler, [{
		key: "reset",


		// Resets the handler back to starting state
		value: function reset() {
			this.dom = [];
			this.tokens = [];
			this._done = false;
			this._tagStack = [];
			this._tagStack.last = function () {
				return this.length ? this[this.length - 1] : null;
			};
		}

		// Signals the handler that parsing is done

	}, {
		key: "done",
		value: function done() {
			this._done = true;
		}
	}, {
		key: "writeTag",
		value: function writeTag(element) {
			this.handleElement(element);
		}
	}, {
		key: "writeText",
		value: function writeText(element) {
			this.handleElement(element);
		}
	}, {
		key: "writeComment",
		value: function writeComment(element) {
			this.handleElement(element);
		}
	}, {
		key: "writeDirective",
		value: function writeDirective(element) {
			this.handleElement(element);
		}

		// Flag indicating whether handler has been notified of parsing completed


		// List of parents to the currently element being processed

	}, {
		key: "isEmptyTag",
		value: function isEmptyTag(element) {
			var name = element.name.toLowerCase();
			if (name[0] == "/") {
				name = name.substring(1);
			}
			return !!Handler._emptyTags[name];
		}
	}, {
		key: "handleElement",
		value: function handleElement(element) {
			if (this._done) {
				throw new Error("Writing to the handler after done() called is not allowed without a reset()");
			}

			var tokenId = this.tokens.length;
			this.tokens.push(element);

			if (element.type == "tag" && /\/\s*$/.test(element.raw)) {
				element.name = element.name.replace(/\s*\/\s*$/, "");
				element.forceVoid = true;
			}

			if (!this._tagStack.last()) {
				// There are no parent elements

				// If the element can be a container, add it to the tag stack and the top level list
				if (element.type != _htmlparser.ElementType.Text && element.type != _htmlparser.ElementType.Comment && element.type != _htmlparser.ElementType.Directive) {
					// Ignore closing tags that obviously don't have an opening tag
					if (element.name[0] != "/") {
						element.openTokenId = tokenId;
						this.dom.push(element);
						// Don't add tags to the tag stack that can't have children
						if (!this.isEmptyTag(element)) {
							this._tagStack.push(element);
						}
					}
				} else {
					// Otherwise just add to the top level list
					this.dom.push(element);
				}
			} else {
				// There are parent elements

				// If the element can be a container, add it as a child of the element
				// on top of the tag stack and then add it to the tag stack
				if (element.type != _htmlparser.ElementType.Text && element.type != _htmlparser.ElementType.Comment && element.type != _htmlparser.ElementType.Directive) {
					if (element.name[0] == "/") {
						// This is a closing tag, scan the tagStack to find the matching opening tag
						// and pop the stack up to the opening tag's parent
						var baseName = element.name.substring(1);
						if (!this.isEmptyTag(element)) {
							var pos = this._tagStack.length - 1;
							while (pos > -1 && this._tagStack[pos--].name != baseName) {}
							if (pos > -1 || this._tagStack[0].name == baseName) {
								while (pos < this._tagStack.length - 1) {
									this._tagStack.last().closeTokenId = tokenId;
									this._tagStack.pop();
								}
							}
						}
					} else {
						// This is not a closing tag
						element.openTokenId = tokenId;

						if (!this._tagStack.last().children) {
							this._tagStack.last().children = [];
						}
						this._tagStack.last().children.push(element);

						// Don't add tags to the tag stack that can't have children
						if (!this.isEmptyTag(element)) {
							this._tagStack.push(element);
						}
					}
				} else {
					// This is not a container element
					if (!this._tagStack.last().children) {
						this._tagStack.last().children = [];
					}
					this._tagStack.last().children.push(element);
				}
			}
		}
	}]);

	return Handler;
}();

Handler._emptyTags = {
	area: 1,
	base: 1,
	basefont: 1,
	br: 1,
	col: 1,
	frame: 1,
	hr: 1,
	img: 1,
	input: 1,
	isindex: 1,
	link: 1,
	meta: 1,
	param: 1,
	embed: 1
};
Handler.reWhitespace = /^\s*$/;
exports.default = Handler;
;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.render = undefined;

var render = exports.render = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(elem, convert, renderTemplate, renderData) {
		var name;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						name = elem.name.replace(/^plugin-/, "");

						if (Plugins[name]) {
							_context.next = 3;
							break;
						}

						return _context.abrupt("return", "");

					case 3:
						_context.next = 5;
						return Plugins[name].render(elem, convert, renderTemplate, renderData);

					case 5:
						return _context.abrupt("return", _context.sent);

					case 6:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function render(_x, _x2, _x3, _x4) {
		return _ref.apply(this, arguments);
	};
}();

exports.prepare = prepare;

var _pluginUtil = __webpack_require__(126);

var pluginUtil = _interopRequireWildcard(_pluginUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var context = __webpack_require__(588);

var Plugins = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = context.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var file = _step.value;

		if (file == "./plugins.js" || file == "./plugin-util.js") {
			continue;
		}

		var plugin = context(file).default;
		Plugins[plugin.name] = plugin;
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

function prepare(html) {
	return Object.keys(Plugins).reduce(function (html, name) {
		var plugin = Plugins[name];
		return pluginUtil.walkHtml(html, plugin.condition, plugin.handler, name);
	}, html);
};

;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getParams = undefined;

var getParams = exports.getParams = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(elem, convert) {
		var params, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, child, paramName, paramValue;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						params = {};
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 4;
						_iterator = findAll(elem, "kiwipedia-param")[Symbol.iterator]();

					case 6:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 16;
							break;
						}

						child = _step.value;
						paramName = child.attribs.name;
						_context.next = 11;
						return Promise.all((child.children || []).map(convert));

					case 11:
						paramValue = _context.sent.join("");


						params[paramName] = paramValue;

					case 13:
						_iteratorNormalCompletion = true;
						_context.next = 6;
						break;

					case 16:
						_context.next = 22;
						break;

					case 18:
						_context.prev = 18;
						_context.t0 = _context["catch"](4);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 22:
						_context.prev = 22;
						_context.prev = 23;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 25:
						_context.prev = 25;

						if (!_didIteratorError) {
							_context.next = 28;
							break;
						}

						throw _iteratorError;

					case 28:
						return _context.finish(25);

					case 29:
						return _context.finish(22);

					case 30:
						return _context.abrupt("return", params);

					case 31:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[4, 18, 22, 30], [23,, 25, 29]]);
	}));

	return function getParams(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.walkHtml = walkHtml;
exports.find = find;
exports.findAll = findAll;

var _htmlparser = __webpack_require__(86);

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _htmlhandler = __webpack_require__(124);

var _htmlhandler2 = _interopRequireDefault(_htmlhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function walkHtml(html, condition, handler, name) {
	var htmlHandler = new _htmlhandler2.default("<div>\n" + html + "\n</div>");
	var parser = new _htmlparser2.default.Parser(htmlHandler);
	parser.parseComplete("<div>\n" + html + "\n</div>");

	var getInside = function getInside(elem) {
		if (elem.forceVoid) {
			return "";
		}

		var first = htmlHandler.tokens[elem.openTokenId];
		var last = htmlHandler.tokens[elem.closeTokenId];

		return ("<div>\n" + html + "\n</div>").substring(first.to + 1, last.from - 1);
	};

	var convert = function convert(elem) {
		if (elem.type == "text") {
			return elem.raw;
		} else if (elem.type == "tag") {
			if (condition(elem)) {
				var _renderedInside = getInside(elem);
				return "<plugin-" + name + " is=\"" + elem.name + "\">" + handler(elem, _renderedInside) + "</plugin-" + name + ">";
			}

			var renderedInside = (elem.children || []).map(convert).join("");

			return "<" + elem.raw + ">" + renderedInside + "</" + elem.name + ">";
		}
	};
	return convert(htmlHandler.dom[0]);
};

function find(elem, tagName) {
	var child = (elem.children || []).find(function (child) {
		return child.type == "tag" && child.name == tagName;
	});

	return child || null;
};
function findAll(elem, tagName) {
	var children = (elem.children || []).filter(function (child) {
		return child.type == "tag" && child.name == tagName;
	});

	return children;
};

;

/***/ }),
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sidebar_sidebar_vue__ = __webpack_require__(471);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	props: [],
	name: "root",
	components: {
		sidebar: __WEBPACK_IMPORTED_MODULE_0__sidebar_sidebar_vue__["a" /* default */]
	}
});

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	props: [],
	name: "sidebar",
	data() {
		return {
			siteInfo: {}
		};
	},
	mounted() {
		this.$eventBus.$on("setSiteInfo", siteInfo => {
			this.siteInfo = siteInfo;
		});
	}
});

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkbox_vue__ = __webpack_require__(632);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	name: "init-hub",
	props: ["name", "description", "type", "value", "disabled"],
	data() {
		return {
			value: "",
			disabled: false
		};
	},

	methods: {
		update() {
			this.$emit("input", this.$refs.input.value);
		}
	},

	components: {
		checkbox: __WEBPACK_IMPORTED_MODULE_0__checkbox_vue__["a" /* default */]
	}
});

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "s-button",
	props: ["value"],

	data() {
		return {
			value: ""
		};
	}
});

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_template__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_template___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_template__);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	name: "loading",
	components: {
		"vue-loading": __WEBPACK_IMPORTED_MODULE_0_vue_loading_template___default.a
	}
});

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "hub-header",
	props: ["hub"]
});

/***/ }),
/* 168 */,
/* 169 */,
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "home"
});

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__config_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_startup_js__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_startup_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_startup_js__);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	name: "new-hub",
	async mounted() {
		/*
  await loadAdditional();
  this.$zeroPage.cmd("siteClone", [config.templateAddress]);
  */
	}
});

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hub_vue__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_hub_manager_js__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_hub_manager_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_hub_manager_js__);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	name: "hub-list",
	data() {
		return {};
	},
	components: {
		hub: __WEBPACK_IMPORTED_MODULE_0__hub_vue__["a" /* default */]
	},
	asyncComputed: {
		async hubs() {
			return await Object(__WEBPACK_IMPORTED_MODULE_1__common_hub_manager_js__["getHubList"])();
		}
	}
});

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "hub",
	props: ["slug", "language", "subgroup", "runner"],
	data() {
		return {};
	}
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getHubList = undefined;

var getHubList = exports.getHubList = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _route.zeroDB.query("\n\t\tSELECT\n\t\t\thubs.*,\n\t\t\tjson_content.cert_user_id AS runner\n\t\tFROM hubs\n\n\t\tLEFT JOIN json ON (\n\t\t\thubs.json_id = json.json_id\n\t\t\tAND json.file_name = \"data.json\"\n\t\t)\n\n\t\tLEFT JOIN json AS json_content ON (\n\t\t\tjson.directory = json_content.directory\n\t\t\tAND json.site = json_content.site\n\t\t\tAND json_content.file_name = \"content.json\"\n\t\t)\n\n\t\tGROUP BY address\n\t");

					case 2:
						return _context.abrupt("return", _context.sent);

					case 3:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function getHubList() {
		return _ref.apply(this, arguments);
	};
}();

var _route = __webpack_require__(61);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_init_hub_js__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_init_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_init_hub_js__);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	name: "init-hub",
	data() {
		return {
			language: "",
			subgroup: ""
		};
	},
	methods: {
		async init() {
			const language = this.language.trim();
			const subgroup = this.subgroup.trim();
			const address = this.$router.currentParams.address;

			const slug = await __WEBPACK_IMPORTED_MODULE_0__common_init_hub_js___default()(language, subgroup, address);

			this.$router.navigate(`/wiki/${slug}/home`);
		}
	}
});

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_wiki_engine_render_vue__ = __webpack_require__(117);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	name: "article",
	data() {
		return {
			error: "",
			status: "",
			slug: "",
			article: "",

			imported: "",
			origins: [],

			hub: null,
			articleNode: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		this.slug = language + (subgroup && `/${subgroup}`);

		this.article = this.$router.currentParams.article;

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.error = e.message;
			this.status = "error";
			return;
		}

		try {
			this.origins = await this.hub.getArticleOrigins(this.article);
		} catch (e) {
			if (e instanceof __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["NotEnoughError"]) {
				this.status = "no-article";
			} else {
				this.error = e.message;
				this.status = "error";
			}
			return;
		}

		if (this.origins.indexOf("") > -1 && this.origins.length > 1) {
			// There are both imported and local versions
			this.imported = "";
			this.origins.splice(this.origins.indexOf(""), 1);
		} else if (this.origins.indexOf("") == -1 && this.origins.length > 1) {
			// There are only imported versions
			this.imported = "ask";
			return;
		} else if (this.origins.length == 1 && this.origins[0] == "") {
			// There is only local version
			this.imported = "";
			this.origins = [];
		} else {
			// There is only imported version
			this.$router.navigate(`imported/${this.slug}/${Object(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__["toSlug"])(this.origins[0])}/${this.article}`);
			return;
		}

		try {
			this.articleNode = await this.hub.getArticle(this.article, "");
		} catch (e) {
			if (e instanceof __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["NotEnoughError"]) {
				this.status = "no-article";
			} else {
				this.error = e.message;
				this.status = "error";
			}
			return;
		}
	},
	components: {
		"render-article": __WEBPACK_IMPORTED_MODULE_1__common_wiki_engine_render_vue__["a" /* default */]
	},
	methods: {
		toSlug: __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["toSlug"]
	}
});

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_js__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__render_js__);
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


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__render_js___default.a);

/***/ }),
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templates = __webpack_require__(65);

var _templates2 = _interopRequireDefault(_templates);

var _htmlparser = __webpack_require__(86);

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _htmlhandler = __webpack_require__(124);

var _htmlhandler2 = _interopRequireDefault(_htmlhandler);

var _util = __webpack_require__(123);

var util = _interopRequireWildcard(_util);

var _pluginUtil = __webpack_require__(126);

var pluginUtil = _interopRequireWildcard(_pluginUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "nowiki",

	condition: function condition(elem) {
		return _templates2.default["<" + elem.name + ">"] && _templates2.default["<" + elem.name + ">"].nowiki;
	},
	handler: function handler(elem, renderedInside) {
		return Object.keys(elem.attribs || {}).map(function (key) {
			var value = elem.attribs[key];
			return "<kiwipedia-param name=\"" + key + "\">" + value + "</kiwipedia-param>";
		}).join("") + ("<kiwipedia-inside value=\"" + util.base64encode(renderedInside) + "\" />");
	},
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(elem, convert, renderTemplate, renderData) {
			var params, inside, template;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return pluginUtil.getParams(convert);

						case 2:
							params = _context.sent;
							inside = pluginUtil.find(elem, "kiwipedia-inside");

							if (inside) {
								inside = util.base64decode(inside.attribs.value);
							} else {
								inside = "";
							}

							params._ = inside;

							template = "<" + elem.attribs.is + ">";
							_context.next = 9;
							return renderTemplate(template, params, renderData);

						case 9:
							return _context.abrupt("return", _context.sent);

						case 10:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2, _x3, _x4) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_wiki_engine_render_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_importer_js__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_importer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__common_importer_js__);
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





/* harmony default export */ __webpack_exports__["a"] = ({
	name: "imported",
	data() {
		return {
			error: "",
			status: "",
			slug: "",
			article: "",

			imported: "",
			origins: [],
			source: "",

			hub: null,
			articleNode: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		let origin = this.$router.currentParams.origin;
		this.slug = language + (subgroup && `/${subgroup}`);

		this.article = this.$router.currentParams.article;

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.error = e.message;
			this.status = "error";
			return;
		}

		try {
			this.origins = await this.hub.getArticleOrigins(this.article);
		} catch (e) {
			if (e instanceof __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["NotEnoughError"]) {
				this.status = "no-article";
			} else {
				this.error = e.message;
				this.status = "error";
			}
			return;
		}

		const index = this.origins.findIndex(curOrigin => Object(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__["toSlug"])(curOrigin) == origin);
		if (index == -1) {
			this.status = "missing";
			if (this.origins.indexOf("") > -1 && this.origins.length == 1) {
				this.imported = "localOnly";
			} else if (this.origins.indexOf("") > -1 && this.origins.length > 1) {
				this.imported = "localAndImported";
			} else if (this.origins.indexOf("") == -1) {
				this.imported = "importedOnly";
			}
			return;
		}

		origin = this.origins[index];
		this.source = origin;

		this.origins.splice(index, 1);

		if (this.origins.indexOf("") > -1 && this.origins.length > 1) {
			// There are both imported and local versions
			this.imported = "localAndImported";
			this.origins.splice(this.origins.indexOf(""), 1);
		} else if (this.origins.indexOf("") == -1 && this.origins.length > 0) {
			// There are imported versions
			this.imported = "importedOnly";
		} else if (this.origins.length == 1 && this.origins[0] == "") {
			// There is only local version
			this.imported = "localOnly";
			this.origins = [];
		}

		try {
			this.articleNode = await this.hub.getArticle(this.article, origin);
		} catch (e) {
			if (e instanceof __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["NotEnoughError"]) {
				this.status = "no-article";
			} else {
				this.error = e.message;
				this.status = "error";
			}
			return;
		}
	},
	components: {
		"render-article": __WEBPACK_IMPORTED_MODULE_1__common_wiki_engine_render_vue__["a" /* default */]
	},
	methods: {
		toSlug: __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["toSlug"],
		async reimport() {
			let content;
			try {
				content = await __WEBPACK_IMPORTED_MODULE_2__common_importer_js___default()(this.source);
			} catch (e) {
				this.$zeroPage.error(e.message);
				return;
			}

			const slug = await this.hub.publishArticle(this.articleNode.title, content, this.source);

			this.$router.navigate(`imported/${this.slug}/${Object(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__["toSlug"])(this.source)}/${slug}`);
		}
	}
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var importZeroWiki = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address, slug) {
		var serverInfo, progress, versions, latest, markdown, title, rows, rowIndex, wikitext;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _route.zeroPage.cmd("serverInfo");

					case 2:
						serverInfo = _context.sent;

						if (!(serverInfo.rev < 3230)) {
							_context.next = 5;
							break;
						}

						throw new Error("Please update ZeroNet to at least rev3230 to import from ZeroWiki.");

					case 5:
						_context.next = 7;
						return _route.zeroPage.cmd("corsPermission", [address]);

					case 7:
						progress = _route.zeroPage.progress("Querying article from database...");

						progress.setPercent(20);

						_context.next = 11;
						return _route.zeroPage.cmd("as", [address, "dbQuery", ["\n\t\tSELECT *\n\t\tFROM pages\n\n\t\tWHERE slug = :slug\n\n\t\tORDER BY date_added DESC\n\t\tLIMIT 1\n\t", {
							slug: slug
						}]]);

					case 11:
						versions = _context.sent;

						if (!(versions.length == 0)) {
							_context.next = 15;
							break;
						}

						progress.setPercent(-1);
						throw new _hub.NotEnoughError("No article with slug <b>" + slug + "</b> was found on ZeroWiki (<b>" + address + "</b>)");

					case 15:

						progress.setMessage("Searching for the latest version...");
						progress.setPercent(60);

						latest = versions[0];


						progress.setMessage("Translating Markdown into WikiText...");
						progress.setPercent(80);

						markdown = latest.body;

						// Move #... rows to title

						title = "";
						rows = markdown.split("\n");
						rowIndex = rows.findIndex(function (row) {
							return row.startsWith("#") && !row.startsWith("##");
						});

						if (rowIndex != -1) {
							title = rows[rowIndex].replace(/^#|#$/, "").trim();
							markdown = rows.filter(function (currentRow, i) {
								return i != rowIndex;
							}).join("\n").trimLeft();
						}

						wikitext = markdownToWikiText(markdown);


						progress.setMessage("Done");
						progress.done();

						return _context.abrupt("return", {
							title: title,
							content: wikitext
						});

					case 29:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function importZeroWiki(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var importWikipedia = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(address, article) {
		var backend, url, progress, query, parsed, page;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						backend = address + "/w/api.php";
						url = backend + "?action=query&titles=" + encodeURIComponent(article) + "&prop=revisions&rvprop=content&rvlimit=1&format=json&formatversion=2&origin=*";
						progress = _route.zeroPage.progress("Querying article from wikipedia...");

						progress.setPercent(20);

						query = void 0;
						_context2.prev = 5;
						_context2.next = 8;
						return fetch(url, {
							headers: new Headers({
								"Api-User-Agent": "Kiwipedia/1.0",
								"Content-Type": "application/json; charset=UTF-8"
							})
						});

					case 8:
						query = _context2.sent;
						_context2.next = 16;
						break;

					case 11:
						_context2.prev = 11;
						_context2.t0 = _context2["catch"](5);

						progress.setMessage("Failed");
						progress.setPercent(-1);
						throw _context2.t0;

					case 16:

						progress.setMessage("Parsing result...");
						progress.setPercent(50);

						parsed = void 0;
						_context2.prev = 19;
						_context2.next = 22;
						return query.json();

					case 22:
						parsed = _context2.sent;
						_context2.next = 30;
						break;

					case 25:
						_context2.prev = 25;
						_context2.t1 = _context2["catch"](19);

						progress.setMessage("Failed");
						progress.setPercent(-1);
						throw _context2.t1;

					case 30:
						page = parsed.query.pages[0];

						if (!page.missing) {
							_context2.next = 34;
							break;
						}

						progress.setPercent(-1);
						throw new _hub.NotEnoughError("No article <b>" + article + "</b> was found on MediaWiki (<b>" + address + "</b>)");

					case 34:

						progress.setMessage("Done");
						progress.done();

						return _context2.abrupt("return", {
							title: page.title,
							content: page.revisions[0].content
						});

					case 37:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this, [[5, 11], [19, 25]]);
	}));

	return function importWikipedia(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

var _config = __webpack_require__(116);

var _startup = __webpack_require__(84);

var _route = __webpack_require__(61);

var _hub = __webpack_require__(28);

var _markdownWiki = __webpack_require__(595);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function markdownToWikiText(markdown) {
	markdown = markdown.replace(/\[\[(.*?)\]\]/g, function (all, article) {
		var label = article;
		if (article.indexOf("|") > -1) {
			label = article.substr(article.indexOf("|") + 1);
			article = article.substr(0, article.indexOf("|"));
		}

		return "[BEGINMARKDOWNLABEL" + label + "ENDMARKDOWNLABEL](BEGINMARKDOWNARTICLE" + article + "ENDMARKDOWNARTICLE)";
	});

	var wiki = (0, _markdownWiki.markdown2wiki)(markdown);
	wiki = wiki.replace(/\[BEGINMARKDOWNARTICLE(.*?)ENDMARKDOWNARTICLE,BEGINMARKDOWNLABEL(.*?)ENDMARKDOWNLABEL\]/g, function (all, article, label) {
		if (article == label) {
			return "[[" + article + "]]";
		} else {
			return "[[" + article + "|" + label + "]]";
		}
	}).replace(/_([^_]*)_/g, "<strong>$1</strong>").replace(/\[img:(.*?)\]/g, function (all, img) {
		return "{{external media|image1=" + img + "}}";
	}).replace(/\[([^\[\],]+),([^\[\]]+)\]/g, "[$1 $2]").replace(/\[\//g, "[zero://");

	return wiki;
};

;

;

exports.default = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(source) {
		var address, article, _address, _article;

		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (!(source.startsWith("zerowiki://") && source.indexOf("/", "zerowiki://".length) == -1)) {
							_context3.next = 6;
							break;
						}

						_context3.next = 3;
						return importZeroWiki(_config.zeroWikiAddress, source.replace("zerowiki://", ""));

					case 3:
						return _context3.abrupt("return", _context3.sent);

					case 6:
						if (!source.startsWith("zerowiki://")) {
							_context3.next = 15;
							break;
						}

						source = source.replace("zerowiki://", "");

						address = source.substr(0, source.substr(source.indexOf("/")));
						article = source.substr(source.substr(source.indexOf("/")) + 1);
						_context3.next = 12;
						return importZeroWiki(address, article);

					case 12:
						return _context3.abrupt("return", _context3.sent);

					case 15:
						if (!(source.indexOf("/wiki/") > -1)) {
							_context3.next = 23;
							break;
						}

						_address = source.substr(0, source.indexOf("/wiki/"));
						_article = source.substr(source.indexOf("/wiki/") + 6).replace(/\/$/, "");
						_context3.next = 20;
						return importWikipedia(_address, _article);

					case 20:
						return _context3.abrupt("return", _context3.sent);

					case 23:
						throw new Error("Unknown source " + source);

					case 24:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	function importer(_x5) {
		return _ref3.apply(this, arguments);
	}

	return importer;
}();

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	name: "new-article",
	data() {
		return {
			slug: "",
			status: "",
			error: "",

			title: "",
			content: "",

			isFirst: false,

			hub: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		this.slug = language + (subgroup && `/${subgroup}`);

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.header = "Error";
			this.error = e.message;
			this.status = "error";
			return;
		}

		const index = await this.hub.getIndex();
		if (index.length == 0) {
			this.isFirst = true;
			this.$refs.title.disabled = true;
			this.title = "Home";
		}

		this.status = "hubLoaded";
	},
	methods: {
		async publish() {
			if (!this.title) {
				this.$zeroPage.error("Please fill title");
				return;
			}

			const slug = await this.hub.publishArticle(this.title, this.content);

			this.$router.navigate(`wiki/${this.slug}/${slug}`);
		}
	}
});

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_importer_js__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_importer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_importer_js__);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	name: "import-article",
	data() {
		return {
			slug: "",
			status: "",
			error: "",

			title: "",
			source: "",

			isFirst: false,

			hub: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		this.slug = language + (subgroup && `/${subgroup}`);

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.header = "Error";
			this.error = e.message;
			this.status = "error";
			return;
		}

		const index = await this.hub.getIndex();
		if (index.length == 0) {
			this.isFirst = true;
			this.$refs.title.disabled = true;
			this.title = "Home";
		}

		this.status = "hubLoaded";
	},
	methods: {
		async importArticle() {
			let content, title;
			try {
				const res = await __WEBPACK_IMPORTED_MODULE_1__common_importer_js___default()(this.source);
				content = res.content;
				title = res.title;
			} catch (e) {
				this.$zeroPage.error(e.message);
				return;
			}

			title = this.title || title;

			if (!title) {
				this.$zeroPage.error("Please fill title");
				return;
			}

			const slug = await this.hub.publishArticle(title, content, this.source);

			this.$router.navigate(`wiki/${this.slug}/${slug}`);
		},
		async importWikipedia() {
			if (!this.title) {
				this.$zeroPage.error("Please fill title");
				return;
			}

			const language = this.slug.split("/")[0];
			this.source = `https://${language}.wikipedia.org/wiki/${this.title}`;

			await this.importArticle();
		},
		async importZeroWiki() {
			if (!this.title) {
				this.$zeroPage.error("Please fill title");
				return;
			}

			this.source = `zerowiki://${Object(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__["toSlug"])(this.title)}`;

			await this.importArticle();
		}
	}
});

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	name: "edit-article",
	data() {
		return {
			slug: "",
			status: "",
			error: "",

			title: "",
			content: "",

			hub: null,

			article: "",
			articleNode: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		this.slug = language + (subgroup && `/${subgroup}`);

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.header = "Error";
			this.error = e.message;
			this.status = "error";
			return;
		}

		this.article = this.$router.currentParams.article;
		this.articleNode = await this.hub.getArticle(this.article);

		this.content = this.articleNode.text;
	},
	methods: {
		async publish() {
			const slug = await this.hub.publishArticle(this.articleNode.title, this.content);

			this.$router.navigate(`wiki/${this.slug}/${slug}`);
		}
	}
});

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__version_vue__ = __webpack_require__(611);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	name: "article-history",
	data() {
		return {
			slug: "",
			status: "",
			error: "",

			hub: null,

			article: "",
			articleNode: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		this.slug = language + (subgroup && `/${subgroup}`);

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.error = e.message;
			this.status = "error";
			return;
		}

		this.article = this.$router.currentParams.article;

		let origin;
		try {
			origin = (await this.hub.getArticleOrigins(this.article))[0];
		} catch (e) {
			if (e instanceof __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["NotEnoughError"]) {
				this.error = `No articles with slug ${article}`;
			} else {
				this.error = e.message;
			}
			this.status = "error";
			return;
		}

		this.articleNode = await this.hub.getArticle(this.article, origin);
	},
	asyncComputed: {
		async versions() {
			return this.hub.getArticleHistory(this.article);
		}
	},
	components: {
		version: __WEBPACK_IMPORTED_MODULE_1__version_vue__["a" /* default */]
	}
});

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "version",
	props: ["slug", "article", "date", "editor", "imported"],
	data() {
		return {};
	},
	methods: {
		formatDate(date) {
			const dt = new Date(date);
			return dt.toLocaleString("en-US", {
				hour12: false,
				timeZone: "UTC",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				second: "2-digit",
				timeZoneName: "short"
			});
		}
	}
});

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_wiki_engine_render_vue__ = __webpack_require__(117);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	name: "article-version",
	data() {
		return {
			error: "",
			status: "",
			slug: "",
			article: "",
			imported: "",

			hub: null,
			articleNode: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		this.slug = language + (subgroup && `/${subgroup}`);

		this.article = this.$router.currentParams.article;
		this.version = this.$router.currentParams.date;

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.error = e.message;
			this.status = "error";
			return;
		}

		try {
			await this.hub.getArticleOrigins(this.article);
		} catch (e) {
			if (e instanceof __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["NotEnoughError"]) {
				this.status = "no-article";
			} else {
				this.error = e.message;
				this.status = "error";
			}
			return;
		}

		try {
			this.articleNode = await this.hub.getArticleVersion(this.article, this.version);
		} catch (e) {
			if (e instanceof __WEBPACK_IMPORTED_MODULE_0__common_hub_js__["NotEnoughError"]) {
				this.status = "no-version";
			} else {
				this.error = e.message;
				this.status = "error";
			}
			return;
		}
	},
	components: {
		"render-article": __WEBPACK_IMPORTED_MODULE_1__common_wiki_engine_render_vue__["a" /* default */]
	}
});

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_hub_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_vue__ = __webpack_require__(623);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	name: "article-index",
	data() {
		return {
			slug: "",
			status: "",
			error: "",

			hub: null,

			article: "",
			articleNode: null
		};
	},
	async mounted() {
		const language = this.$router.currentParams.language;
		const subgroup = this.$router.currentParams.subgroup || "";
		this.slug = language + (subgroup && `/${subgroup}`);

		this.hub = new __WEBPACK_IMPORTED_MODULE_0__common_hub_js___default.a(this.slug);
		try {
			await this.hub.init();
		} catch (e) {
			this.header = "Error";
			this.error = e.message;
			this.status = "error";
			return;
		}

		this.status = "ready";
	},
	asyncComputed: {
		async articles() {
			if (this.status == "") {
				await this.hub.init();
			}

			return await this.hub.getIndex();
		}
	},
	components: {
		"article-item": __WEBPACK_IMPORTED_MODULE_1__article_vue__["a" /* default */]
	}
});

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "article",
	props: ["slug", "article", "title", "date"],
	data() {
		return {};
	},
	methods: {
		formatDate(date) {
			const dt = new Date(date);
			return dt.toLocaleString("en-US", {
				hour12: false,
				timeZone: "UTC",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				second: "2-digit",
				timeZoneName: "short"
			});
		}
	}
});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(195);
module.exports = __webpack_require__(397);


/***/ }),
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(398);

__webpack_require__(402);

__webpack_require__(404);

var _vueMin = __webpack_require__(115);

var _vueMin2 = _interopRequireDefault(_vueMin);

var _vueAsyncComputed = __webpack_require__(466);

var _vueAsyncComputed2 = _interopRequireDefault(_vueAsyncComputed);

var _root = __webpack_require__(467);

var _root2 = _interopRequireDefault(_root);

var _setting = __webpack_require__(477);

var _setting2 = _interopRequireDefault(_setting);

var _sButton = __webpack_require__(481);

var _sButton2 = _interopRequireDefault(_sButton);

var _loading = __webpack_require__(485);

var _loading2 = _interopRequireDefault(_loading);

var _hubHeader = __webpack_require__(490);

var _hubHeader2 = _interopRequireDefault(_hubHeader);

var _route = __webpack_require__(61);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_vueMin2.default.use(_vueAsyncComputed2.default);

_vueMin2.default.prototype.$eventBus = new _vueMin2.default();

var app = new _vueMin2.default({
	el: "#app",
	render: function render(h) {
		return h(_root2.default);
	},
	data: {
		currentView: null,
		zeroPage: null
	}
});

_vueMin2.default.component("setting", _setting2.default);

_vueMin2.default.component("s-button", _sButton2.default);

_vueMin2.default.component("loading", _loading2.default);

_vueMin2.default.component("hub-header", _hubHeader2.default);

(0, _route.route)(app);

_vueMin2.default.prototype.$zeroPage = _route.zeroPage;

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	var siteInfo;
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return _route.zeroPage.getSiteInfo();

				case 2:
					siteInfo = _context.sent;

					app.$eventBus.$emit("setSiteInfo", siteInfo);

				case 4:
				case "end":
					return _context.stop();
			}
		}
	}, _callee, this);
}))();
_route.zeroPage.on("setSiteInfo", function (msg) {
	app.$eventBus.$emit("setSiteInfo", msg.params);
});

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(399);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(114)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./main.sass", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./main.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(161);
exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"Text Me One\";\n  src: url(" + escape(__webpack_require__(400)) + ");\n  font-weight: normal; }\n\nhtml, body {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  background-color: #FFF; }\n\na {\n  text-decoration: none;\n  color: #82F; }\n  a:visited {\n    color: #B0F; }\n  a:hover, a:active {\n    text-decoration: underline; }\n\nh1 {\n  margin: 0;\n  font-family: \"Text Me One\", \"Verdana\", \"Arial\", sans-serif;\n  font-size: 42px;\n  margin-bottom: 16px; }\n\np {\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n  margin-top: 16px;\n  margin-bottom: 16px; }\n", ""]);

// exports


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/TextMeOne-Regular.ttf";

/***/ }),
/* 401 */,
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(403);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(114)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./styles.sass", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./styles.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, ".ambox {\n  width: 70%;\n  margin: 0 auto;\n  padding: 16px;\n  background-color: #EEE;\n  color: #000;\n  border-left: 10px solid #000;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px; }\n\n.ambox-notice {\n  border-left-color: #36c; }\n\n.ambox-discussion {\n  border-left-color: #396; }\n\n.ambox-good {\n  border-left-color: #6c4; }\n\n.ambox-style {\n  border-left-color: #fc3; }\n\n.ambox-content {\n  border-left-color: #f80; }\n\n.ambox-serious {\n  border-left-color: #b22; }\n\n.ambox-delete {\n  border-left-color: #b22;\n  background-color: #FEE; }\n\n.interwiki-invalid {\n  border: 8px solid #b22;\n  border-top-width: 5px;\n  border-bottom-width: 5px;\n  background-color: #b22;\n  color: #FFF !important; }\n\n.interwiki-error {\n  color: #b22 !important; }\n\n.nowrap {\n  white-space: nowrap; }\n\n.hatnote {\n  display: block;\n  margin: 16px;\n  font-style: italic; }\n\n.mvar {\n  font-style: italic;\n  white-space: nowrap;\n  font-family: Times, serif;\n  font-size: 120%; }\n\n.sidebar-container {\n  display: block;\n  float: right;\n  text-align: center; }\n\n.sidebar {\n  display: block;\n  width: 250px;\n  padding: 12px 16px;\n  background-color: #EEE; }\n", ""]);

// exports


/***/ }),
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_root_vue__ = __webpack_require__(162);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5bfbb8de_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_root_vue__ = __webpack_require__(476);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(468)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5bfbb8de"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_root_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5bfbb8de_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_root_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue_components\\root.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5bfbb8de", Component.options)
  } else {
    hotAPI.reload("data-v-5bfbb8de", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(469);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("ac8d59b4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5bfbb8de\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./root.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5bfbb8de\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./root.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.root[data-v-5bfbb8de] {\n  height: calc(100% - 32px);\n}\n.current-view[data-v-5bfbb8de] {\n  float: left;\n  padding: 16px;\n  width: calc(100% - 250px - 32px - 32px);\n  height: 100%;\n  position: relative;\n  overflow: auto;\n}\n", ""]);

// exports


/***/ }),
/* 470 */,
/* 471 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_vue__ = __webpack_require__(163);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d29ec06_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_sidebar_vue__ = __webpack_require__(474);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(472)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1d29ec06"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d29ec06_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_sidebar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue_components\\sidebar\\sidebar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d29ec06", Component.options)
  } else {
    hotAPI.reload("data-v-1d29ec06", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(473);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("47f6faa8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1d29ec06\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./sidebar.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1d29ec06\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./sidebar.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\naside[data-v-1d29ec06] {\n  display: inline-block;\n  width: 250px;\n  height: 100%;\n  float: left;\n  padding: 16px;\n  overflow: auto;\n  background-color: #fe8;\n}\n.logo-container[data-v-1d29ec06] {\n  color: #000;\n  text-decoration: none;\n}\n.logo-container > .logo[data-v-1d29ec06] {\n    display: block;\n    margin: 0 auto;\n}\n.logo-container > .title[data-v-1d29ec06] {\n    text-align: center;\n    font-size: 32px;\n}\n.logo-container > .title > span[data-v-1d29ec06] {\n      color: #770;\n}\n", ""]);

// exports


/***/ }),
/* 474 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("aside", [
    _c(
      "a",
      {
        staticClass: "logo-container",
        attrs: { href: "?/" },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.$router.navigate("")
          }
        }
      },
      [
        _c("img", {
          staticClass: "logo",
          attrs: { src: __webpack_require__(475) }
        }),
        _vm._v(" "),
        _vm._m(0)
      ]
    ),
    _vm._v(" "),
    _vm._m(1),
    _vm._v(" "),
    _vm._m(2),
    _vm._v(" "),
    _c("p", [
      _c(
        "a",
        {
          attrs: { href: "?/" },
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.$router.navigate("")
            }
          }
        },
        [_vm._v("\n\t\t\tHome\n\t\t")]
      ),
      _c("br"),
      _vm._v(" "),
      _c(
        "a",
        {
          attrs: { href: "?/hub-list" },
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.$router.navigate("hub-list")
            }
          }
        },
        [_vm._v("\n\t\t\tHub list\n\t\t")]
      )
    ]),
    _vm._v(" "),
    _c("p", [
      _c(
        "a",
        {
          attrs: { href: "?/new-hub" },
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.$router.navigate("new-hub")
            }
          }
        },
        [_vm._v("\n\t\t\tDon't see you language in list?\n\t\t")]
      ),
      _c("br"),
      _vm._v(" "),
      _c("a", { attrs: { href: "/13c2MpR9ztCzVm7r8cTfV9h9FFEEiQ6AKD" } }, [
        _vm._v("\n\t\t\tWant to request a feature or report a bug?\n\t\t")
      ])
    ]),
    _vm._v(" "),
    _c("p", [
      _vm.siteInfo.auth_address
        ? _c(
            "a",
            {
              attrs: { href: "?/settings" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.$router.navigate("settings")
                }
              }
            },
            [_vm._v("\n\t\t\tMy settings\n\t\t")]
          )
        : _vm._e()
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h1", { staticClass: "title" }, [
      _c("span", [_vm._v("Kiwi")]),
      _vm._v("pedia")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("\n\t\tLogo by "),
      _c("a", { attrs: { href: "https://www.iconfinder.com/zapolzun" } }, [
        _vm._v("Anastasia Kuznetsova")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("\n\t\tWikipedia for ZeroNet with auto-import."),
      _c("br"),
      _vm._v("\n\t\tMade with 💛 by "),
      _c("a", { attrs: { href: "/Mail.ZeroNetwork.bit/?to=gitcenter" } }, [
        _vm._v("GitCenter")
      ]),
      _vm._v(" and community.\n\t")
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1d29ec06", esExports)
  }
}

/***/ }),
/* 475 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxMDAiIGlkPSJzdmcyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnMgaWQ9ImRlZnM0Ij48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhckdyYWRpZW50NTk4MiI+PHN0b3AgaWQ9InN0b3A1OTg0IiBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmFmM2U7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBpZD0ic3RvcDU5ODYiIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I2UxZmY3MztzdG9wLW9wYWNpdHk6MSIvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY2xpcFBhdGg0MzgzIj48cGF0aCBkPSJtIDEzNy4wNjkxNCwxMDQuNTUwMjYgYyAtNC42NzM0NCw4LjA5NDY1IC05LjA3MTk4LDguMDk0NjUgLTEzLjc0NTQzLDAgLTQuNjczNDUsLTguMDk0NjQ2IC0yLjQ3NDE4LC0xMS45MDM4OTIgNi44NzI3MiwtMTEuOTAzODkyIDkuMzQ2ODksMCAxMS41NDYxNiwzLjgwOTI0NyA2Ljg3MjcxLDExLjkwMzg5MiB6IiBpZD0icGF0aDQzODUiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZTgyNzNjO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjAyNzUyOTIsMCwwLDEuMTY4Mjk3LC0zLjg5Nzg5NDksLTE4LjYxNzIyMykiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNsaXBQYXRoNDI0OCI+PGcgaWQ9Imc0MjUwIj48ZWxsaXBzZSBjeD0iMTUwLjA2ODM3IiBjeT0iLTE2LjM2NzgiIGlkPSJlbGxpcHNlNDI1MiIgcng9IjE3LjAzNjgzMSIgcnk9IjIxLjg2ODg0NSIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNjNGViNTI7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIgdHJhbnNmb3JtPSJtYXRyaXgoMC45MTkxMDQ4NywwLjM5NDAxMjk4LC0wLjM1NzMwNzg0LDAuOTMzOTg2NjcsMCwwKSIvPjxlbGxpcHNlIGN4PSItMTA1LjYyNzgzIiBjeT0iOTEuNTAwNTgiIGlkPSJlbGxpcHNlNDI1NCIgcng9IjE3LjAzNjgzMSIgcnk9IjIxLjg2ODg0NSIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNjNGViNTI7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuOTE5MTA0ODcsMC4zOTQwMTI5OCwwLjM1NzMwNzg0LDAuOTMzOTg2NjcsMCwwKSIvPjwvZz48L2NsaXBQYXRoPjxmaWx0ZXIgaWQ9ImZpbHRlcjQzODQiIHN0eWxlPSJjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6c1JHQiI+PGZlQmxlbmQgaWQ9ImZlQmxlbmQ0Mzg2IiBpbjI9IkJhY2tncm91bmRJbWFnZSIgbW9kZT0ibGlnaHRlbiIvPjwvZmlsdGVyPjxjbGlwUGF0aCBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNsaXBQYXRoNDQ0NyI+PHBhdGggZD0ibSAxNTIuMDk0NjksMzQuMjc3MzQ0IGMgLTEuOTI3NjcsLTAuNjI5MjIyIC00LjA5MjkyLC0wLjA3MzcyIC02LjE5MzM2LC0wLjA3MjI3IC0yLjEwMjI0LDAuMDAxNSAtNC4yNzEwMywtMC41NTExMjEgLTYuMjAxMTcsMC4wODAwOCAtNC4yMjQyOSwxLjM4MTQzNyAtNi4yMzM4NSw2LjMxOTIzNiAtNi4yMzYzMywxMC43NjM2NzIgLTAuMDA0LDYuODY5MDQxIDUuNTY4NDYsMTIuNDM3NSAxMi40Mzc1LDEyLjQzNzUgNi44NjkwNCwwIDEyLjQzNzUsLTUuNTY4NDU4IDEyLjQzNzUsLTEyLjQzNzUgLTAuMDA1LC00LjQ0ODgzOSAtMi4wMTQ5LC05LjM5MDk5MyAtNi4yNDQxNCwtMTAuNzcxNDg0IHoiIGlkPSJwYXRoNDQ0OSIgc3R5bGU9ImRpc3BsYXk6aW5saW5lO29wYWNpdHk6MTtmaWxsOiNiYjBhMGE7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtmaWx0ZXI6dXJsKCNmaWx0ZXI0Mzg0KSIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY2xpcFBhdGg0MzUyIj48cGF0aCBkPSJtIDI0My4yNDQxNCwyNi41MjczNDQgYSAxNi41Mjg2MjEsMTguNzM4MzI5IDAgMCAwIC0xNi41MjczNCwxOC43MzgyODEgMTYuNTI4NjIxLDE4LjczODMyOSAwIDAgMCAwLjQyMzgyLDQuMTA5Mzc1IDI0LjU3MTk2LDI0LjU3MTk2IDAgMCAwIC04LjQ2ODc0LDE4LjUxNzU3OCAyNC41NzE5NiwyNC41NzE5NiAwIDAgMCAyNC41NzIyNiwyNC41NzIyNjYgMjQuNTcxOTYsMjQuNTcxOTYgMCAwIDAgMjQuNTcyMjcsLTI0LjU3MjI2NiAyNC41NzE5NiwyNC41NzE5NiAwIDAgMCAtOC40NTcwMywtMTguNTI3MzQ0IDE2LjUyODYyMSwxOC43MzgzMjkgMCAwIDAgMC40MTQwNiwtNC4wOTk2MDkgMTYuNTI4NjIxLDE4LjczODMyOSAwIDAgMCAtMTYuNTI5MywtMTguNzM4MjgxIHoiIGlkPSJwYXRoNDM1NCIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNlZWY5M2Q7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjc7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY2xpcFBhdGg1ODM2Ij48cmVjdCBoZWlnaHQ9IjUwIiBpZD0icmVjdDU4MzgiIHJ5PSIyMC43MzE3MDciIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZkMDQ4O2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIgd2lkdGg9IjQxLjQ2MzQxMyIgeD0iOTYuMTY2NTE5IiB5PSI3NjUuMTI3ODciLz48L2NsaXBQYXRoPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEuMzk2NzcxNiwwLDAsMS40MDM4NDMxLC0xMjkuMjM2MjMsLTEzMC41Njg3KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJsaW5lYXJHcmFkaWVudDU5NzkiIHgxPSIxMzguNTUzMzEiIHgyPSIxMTguODM1NDMiIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDU5ODIiIHkxPSI4MzIuMzQ2MTMiIHkyPSI3OTMuMjg1NzciLz48L2RlZnM+PGcgaWQ9ImxheWVyMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtOTUyLjM2MjE4KSI+PHBhdGggZD0ibSA0OC4xNjIzMTMsOTY2LjgzNzI4IGMgLTExLjU3MjY3MiwwLjA0NzQgLTIzLjEwNzk1Miw2LjUwNTkyIC0yOS43Mzg0NDEsMTguMzgyMzEgLTYuOTA2MTgzLDEyLjM3MDIzIC02LjYyNjg5OSwyNi42MDAyMSAtMC4yNTA0ODMsMzcuMTE3MjEgNS42Mjk3NTgsMTAuNDYwMSAxNy4xMDg5NDQsMTcuNTAwNSAyOS45OTg2MTcsMTcuNTAwNSA5LjY3NzA0MywwIDE4Ljk1OTgzNCwtMi42NTQ3IDI2LjAzMjk0NSwtOC4zMzI1IDcuMDczMTEyLC01LjY3NzkgMTEuNzQxMzA0LC0xNC40NTc2IDEyLjA5NjUzMSwtMjUuNjc0NiAwLjI5MTMyNSwtOS4xOTkzNSAtMy4zNzk5MDgsLTE4LjA5OTIxIC04LjkzNTUxMSwtMjQuOTk5NjMgLTkuMDMzMzI3LC05LjIwODcyIC0xOC4xNTM5NTIsLTEzLjk3NzgzIC0yOS4yMDM2NTgsLTEzLjk5MzI5IHoiIGlkPSJwYXRoNTkyNSIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiMyODU3MDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIi8+PHBhdGggZD0ibSA4Mi42NDgzOTQsMTAwNS40Mzc0IGMgLTAuNjU2MjA0LDIwLjcyMDcgLTE2LjY0MTU5OCwzMC43Mjc5IC0zNC43NjExMzQsMzAuNzI3OSAtMTYuOTI2MTg5LDAgLTMwLjI0MzkzMSwtMTIuNjY2OCAtMzAuMjQzOTMxLC0yOS41NDE0IDAsLTE2Ljg3NDU0IDE3LjUyOTIzMSwtMzQuNTQ3ODggMzQuNjA5MTc4LC0zNS42OTU4MyAxNC43MTIwMTMsLTAuOTg4ODEgMzAuOTU4MDE3LDE2Ljc1ODQzIDMwLjM5NTg4NywzNC41MDkzMyB6IiBpZD0icGF0aDU5MjciIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojOGU1YTBlO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIvPjxwYXRoIGQ9Im0gNjEuNjc0NzUxLDk3My42NzU3MiBjIC0xMy41MDMzNDUsLTguMDYyMyAtMzEuNDU4MTE4LC0yLjY1NDY5IC00MC4zMTA2NiwxMy4yMDE3OSAtOC44NDQ3OTEsMTUuODQyNDkgLTQuNzA5MzY5LDM0Ljc0Njg5IDguODA2Nzg0LDQyLjgxNjg5IDEzLjUwNTExOSw4LjA2MzQgMzAuMzc3NjE3LDEuODQ2NiAzOS4xNzgyOTgsLTEzLjkxNyA4Ljc5MjkxNCwtMTUuNzQ5OCA1Ljg0MDAxMywtMzQuMDMyNzggLTcuNjc0NDIyLC00Mi4xMDE2OCB6IiBpZD0icGF0aDU5MjkiIHN0eWxlPSJkaXNwbGF5OmlubGluZTtvcGFjaXR5OjE7ZmlsbDojZWNlYmE0O2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjY5OTk5OTk5O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiLz48cGF0aCBkPSJtIDY4LjE1Njg2LDEwMTQuOTYxNiBjIC04LjUzNzUsMTUuMjkyMSAtMjQuNjEzMDE0LDIxLjIxNDUgLTM3LjY4OTM4LDEzLjQwNzEgLTEzLjA3NjM1MywtNy44MDczIC0xNy4wNDUwMTQsLTI1Ljk1MiAtOC41MDc1MTMsLTQxLjI0NDE2IDguNTM3NTAxLC0xNS4yOTIxNyAyNS43Njk3OTQsLTIwLjQ4Nzg0IDM4Ljg0NjE2LC0xMi42ODA0NyAxMy4wNzYzNTIsNy44MDczNiAxNS44ODgyMzQsMjUuMjI1MjUgNy4zNTA3MzMsNDAuNTE3NTMgeiIgaWQ9InBhdGg1OTMxIiBzdHlsZT0iZGlzcGxheTppbmxpbmU7b3BhY2l0eToxO2ZpbGw6Izg3ZDU0MztmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC42OTk5OTk5OTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIi8+PHBhdGggZD0ibSA0Ny43MjI3MzUsOTcwLjg0NjExIGMgLTkuOTEyOTcyLDAuMDI0NSAtMTkuODk0MzU4LDUuNzY1MTcgLTI1Ljc2Mzg5OSwxNi4yNzg1NiAtOC41Mzc1MDEsMTUuMjkyMTMgLTQuNTY3NDk5LDMzLjQzNjAzIDguNTA4ODUzLDQxLjI0MzUzIDEzLjA3NjM2Niw3LjgwNzQgMjkuMTUwNzc3LDEuODg0MiAzNy42ODgyNzgsLTEzLjQwNzggOC41Mzc1LC0xNS4yOTIzMyA1LjcyNjkzMSwtMzIuNzA5NTggLTcuMzQ5NDIxLC00MC41MTY5NCAtNC4wODYzNTMsLTIuNDM5OCAtOC41Nzc5MjQsLTMuNjA4NDkgLTEzLjA4MzgxMSwtMy41OTczNSB6IG0gMC42MTEwODcsMi42OTgwMiBjIDAuNjA1OTksMC4wMTQ1IDEuMjA5MzExLDAuMDUyOCAxLjgxMTQzMSwwLjExNTExIDMuMjExMTM2LDAuMzMyODQgNi4zNTkzMzQsMS4zNDU4MiA5LjI5NDUzOCwzLjA5ODMzIDExLjcxODY5LDYuOTk2NzYgMTQuMzc0MjE4LDIyLjU3NjggNi4zODM2NzksMzYuODg5MzMgLTcuOTgwMzcxLDE0LjI5NDMgLTIyLjI1MTQzOCwxOS40MjA1IC0zMy45ODkwMTIsMTIuNDEyNSAtMTEuNzE1NDkxLC02Ljk5NDcgLTE2LjIwNjA0MiwtMjMuODAxIC04LjI4Mzg2MSwtMzcuOTkwOTIgNS41NjMwNjIsLTkuOTY0NDYgMTUuNjkzMzU3LC0xNC43NDIzMiAyNC43ODMyMjUsLTE0LjUyNDQgeiIgaWQ9InBhdGg1OTQ5IiBzdHlsZT0iZGlzcGxheTppbmxpbmU7b3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MC4zMDcxODk1ODtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC42OTk5OTk5OTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIi8+PHBhdGggZD0ibSA0NS4zMzM4NSw5ODMuNDY2NTcgYyAyLjQ3NjkwOSwwLjA2MzggMS41MDc4NTcsLTYuNzQ0OCAzLjk1MDY3MSwtNi4zMjgyNSAyLjM3MjAzOSwwLjQwNDQ5IC0wLjYyODE0Miw2LjE3Mjc5IDEuNjA0OTYsNy4wNzI3NSAyLjU2MzczMywxLjAzMzE5IDQuNzU1MDg2LC02LjMyMzE2IDYuOTEzNjcsLTQuNTkxMDggMi4wOTY1OTcsMS42ODIzMyAtMy44MzUyMTMsNS41MDE3IC0xLjk3NTMyOCw3LjQ0NSAxLjk4NDc3MSwyLjA3MzggNi41OTc0MTMsLTUuMTQ4NjIgOC4xNDgyMzUsLTIuNzI5ODQgMS42NzIwMTksMi42MDc4IC03LjQ5MTc4LDMuOTY0MzMgLTYuMjk2MzY3LDYuODI0NTkgMS4xNDc5MzcsMi43NDY2NyA4LjM3NTU1OSwtMi42ODU5NSA4Ljg4ODk5OCwwLjI0ODE3IDAuNTgyNDQsMy4zMjgzOSAtOS40MTE3MjYsMC4zNDMxNCAtOS4zODI4MjcsMy43MjI1IDAuMDIxMDksMi40NzM1OCA3LjE0NzgyNSwwLjE0MzI0IDYuOTEzNjU2LDIuNjA1NjkgLTAuMjEwNDc5LDIuMjEzNDQgLTUuOTA0NzEyLC0xLjAxMjAzIC02LjU0MzI4OCwxLjExNjc1IC0wLjc5ODMzOSwyLjY2MTU1IDYuODIwNTA2LDMuNzQzNjUgNS44MDI1MzksNi4zMjgzNSAtMC43MTE4NzksMS44MDc2IC00LjkwNzI1LC0xLjcyMzEgLTUuODAyNTM5LDAgLTEuMjk5OTE5LDIuNTAyIDYuNTUzODA2LDQuNzMyMyA0LjgxNDg2Nyw2Ljk0ODcgLTEuODg4MDcyLDIuNDA2NSAtOC42NDIwOTEsLTMuODQ2NyAtOC41MTg2MTYsLTMuMzUwMyAwLjEyMzQ3NCwwLjQ5NjQgMy4wMzE2NTEsMi44Nzg5IDIuMDk4Nzg5LDQuMDk0OCAtMC45MjY3NDQsMS4yMDc5IC0zLjU0NTA0OCwtMi4yMjEyIC00LjQ0NDQ5OSwtMC45OTI3IC0xLjkxMTkyOSwyLjYxMTYgNy4xNTEyMDUsNi4yMDE5IDQuODE0ODgxLDguNDM3NyAtMi4yNjUyOTgsMi4xNjc4IC01LjMyODc4MiwtNS41NjQ1IC04LjAyNDgwMiwtMy45NzA2IC0xLjcwNTkxOSwxLjAwODUgMi4yMzA0MzQsNS4yNzYzIDAuMzcwMzgyLDUuOTU1OSAtMS44MjU1NjcsMC42NjcxIC0yLjE4NTUxNSwtNS42NjggLTQuMDc0MTMyLC01LjIxMTUgLTIuOTYwMDUyLDAuNzE1NyAxLjU2MDE5NCw4LjkyNzMgLTEuNDgxNDg1LDkuMDU4MiAtMi44NDIwMTIsMC4xMjIxIDAuNzE3NzAzLC03LjkxMjggLTIuMDk4ODAzLC04LjMxMzYgLTMuMzA1NDc0LC0wLjQ3MDYgLTEuODA5Njk5LDkuNDQ0MSAtNS4wNjE3ODksOC42ODU3IC0zLjI1NjA0MiwtMC43NTkgMi4yMTg4OTgsLTguNDg5NCAtMC43NDA3NSwtMTAuMDUwNiAtMi40NDk4MjUsLTEuMjkyMyAtNS4wNTY4MDIsNS4wNDQgLTcuMDM3MTMsMy4xMDIgLTEuODg1MzkxLC0xLjg0ODkgNS4xNjQ3NTgsLTQuNjY3OSAzLjgyNzIxLC02Ljk0ODcgLTAuOTQwMzQ5LC0xLjYwMzQgLTQuNjU5OTY2LDEuNjI5MSAtNS41NTU2MTgsMCAtMC44MjI4MSwtMS40OTY1IDMuNTM4ODg5LC0yLjg0NjMgMi43MTYwNzksLTQuMzQyOCAtMS4wMTUwNzYsLTEuODQ2NCAtNS42Mzk2NDcsMi4wMDM0IC02LjI5NjM4MSwwIC0wLjczNjU4OCwtMi4yNDcxIDUuODk5Nzk1LC0xLjg2MzUgNS42NzkwOTEsLTQuMjE5IC0wLjIzMTIzNSwtMi40NjggLTYuOTcxODg3LC0wLjc2NjIgLTYuNjY2NzQ4LC0zLjIyNjEgMC4zMDY1MzUsLTIuNDcxMTggNi44NjUxNDYsMC45NjUzIDcuMjg0MDM4LC0xLjQ4OTA1IDAuMzY1MTMsLTIuMTM5MzIgLTUuNzU1ODg2LC0xLjE4OTA2IC01LjU1NTYzMSwtMy4zNTAyNSAwLjIxOTc0LC0yLjM3MTUyIDQuNzY0NDk5LC0wLjI5NjE1IDUuNzA2NDgyLC0yLjQ4MTY3IDEuMDExNjgyLC0yLjM0NzI4IC0zLjkyNTQ3MywtNS4zOTY3MiAtMi4wMDI3MTksLTcuMDcyNzUgMS42MzE0OTksLTEuNDIyMTcgNS42MjgwODIsNC42MTcyNCA1LjI5MzcyMiwyLjQ3Mjg0IC0wLjgyOTcxLC01LjMyMTI5IC0yLjUzNzk4OSwtNC40ODg3NSAtMC43MjU3NjIsLTUuODIzMSAxLjQ0MDE2OSwtMS4wNjA0MSAzLjMyNzQxNywzLjM0OTg3IDQuODE0ODY3LDIuMzU3NTkgMS44ODg2MTcsLTEuMjU5OSAtMi40ODgxMzksLTYuMDEyMTkgLTAuMzcwMzgyLC02LjgyNDU5IDEuOTY5NDc2LC0wLjc1NTUyIDEuODY3MjQ2LDUuMjg2MyAzLjk1MDY3MSw0Ljk2MzM0IDEuOTE4NDk0LC0wLjI5NzM5IDAuMTYyMzg4LC01LjMyMjg1IDIuMDk4Nzg5LC01LjQ1OTY3IDIuMDIxNTQ3LC0wLjE0Mjg0IDAuOTM3MTM2LDUuMjgzMzUgMi45NjI5OTksNS4zMzU1OCB6IiBpZD0icGF0aDU5NjQiIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjAuMTMzMzMzMzM7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIi8+PHBhdGggZD0ibSAxMjcuNDU1MDgsNzk1Ljk5NjA5IGMgLTIuODYxMjYsLTAuMjk1MDggLTYuNzM1NjYsMS4yMDkwNSAtOS4yNzkzLDUuNzQyMTkgLTMuNDExMDMsNi4wNzg5OSAtMS43MDUwNSwxMS44MjkzNCAxLjk3ODUyLDE0LjAxNzU4IDEuNTc0ODQsMC45MzU1NCAzLjc4MjU2LDEuNTQzODYgNS44NDM3NSwwLjYyNSAyLjA2MTE5LC0wLjkxODg2IDMuNjQ0MzQsLTIuODQxNDEgNS4zOTI1NywtNS45NTcwMyAxLjgwNTQsLTMuMjE3NDkgMi41Mzc2OCwtNS45MDU0NSAyLjI2MzY4LC04LjI3NTM5IC0wLjI3NDAxLC0yLjM2OTk0IC0xLjcyMzU5LC00LjIxOTU5IC0zLjQxMjExLC01LjIyMjY2IC0wLjg4NzA5LC0wLjUyNjk4IC0xLjg2MzAxLC0wLjgzNDM4IC0yLjc4NzExLC0wLjkyOTY5IHoiIGlkPSJwYXRoNTk2MiIgc3R5bGU9ImRpc3BsYXk6aW5saW5lO29wYWNpdHk6MTtmaWxsOiNjNWRiNGE7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuNjk5OTk5OTk7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIgdHJhbnNmb3JtPSJtYXRyaXgoMS4zMTc1OTI5LC0wLjE2MTQ1NTUsMC4xNjA2NDIyMSwxLjMyNDI2MzYsLTI1MS42NjY1NiwtNDcuNjEwMjIpIi8+PHBhdGggZD0ibSAxMjcuMjMyNDIsNzk4LjE1NjI1IGMgLTEuOTgyNjYsLTAuMjA0NDcgLTQuOTU1MjUsMC43MTE1OCAtNy4xNjIxMSw0LjY0NDUzIC0yLjk5NDQ0LDUuMzM2NTUgLTEuMjcyOTIsOS42MjI3OSAxLjE5MzM2LDExLjA4Nzg5IDIuNTc4MTMsMS41MzE1NCA0Ljk0MzE1LDEuMzM0NjQgOC4yMzI0MiwtNC41MjczNCAzLjM0MDg0LC01Ljk1Mzg4IDIuMTE5MjIsLTkuMDkzNjMgLTAuMzYzMjgsLTEwLjU2ODM2IC0wLjY0ODYzLC0wLjM4NTMyIC0xLjI0MDI2LC0wLjU2ODY0IC0xLjkwMDM5LC0wLjYzNjcyIHoiIGlkPSJwYXRoNTk1OCIgc3R5bGU9ImRpc3BsYXk6aW5saW5lO29wYWNpdHk6MTtmaWxsOiNkYmYwNjc7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuNjk5OTk5OTk7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIgdHJhbnNmb3JtPSJtYXRyaXgoMS4zMTc1OTI5LC0wLjE2MTQ1NTUsMC4xNjA2NDIyMSwxLjMyNDI2MzYsLTI1MS42NjY1NiwtNDcuNjEwMjIpIi8+PHBhdGggZD0ibSA0Ny43MjI3MzUsOTcwLjg0NjExIGMgLTkuOTEyOTcyLDAuMDI0NSAtMTkuODk0MzU4LDUuNzY1MTcgLTI1Ljc2Mzg5OSwxNi4yNzg1NiAtMi43MzMxMDUsNC44OTU0OSAtNC4xNjgyMTgsMTAuMDgyMzIgLTQuNDQ5NDcyLDE1LjEyOTczIDguNjI5Nzg2LC0xNC45MDQ2MSAzNC4wNTQ4NDIsLTE5LjQ2OTggNTQuODc3ODQzLC0xMS4yNDE3NCAtMS40MzE4MTcsLTYuODY1NzcgLTUuMzEyOTE0LC0xMi44MjY5OCAtMTEuNTgwNjYxLC0xNi41NjkyIC00LjA4NjM1MywtMi40Mzk4IC04LjU3NzkyNCwtMy42MDg0OSAtMTMuMDgzODExLC0zLjU5NzM1IHoiIGlkPSJwYXRoNTk2NiIgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MC40MTgzMDA2NztmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiLz48L2c+PGcgaWQ9ImxheWVyMiIgc3R5bGU9ImRpc3BsYXk6aW5saW5lO29wYWNpdHk6MC40OyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtOTUyLjM2MjE4KSI+PHBhdGggZD0ibSA0OC4xNjIzMTMsOTY2LjgzNzI4IGMgLTExLjU3MjY3MiwwLjA0NzQgLTIzLjEwNzk1Miw2LjUwNTkyIC0yOS43Mzg0NDEsMTguMzgyMzEgLTYuOTA2MTgzLDEyLjM3MDIzIC02LjYyNjg5OSwyNi42MDAyMSAtMC4yNTA0ODMsMzcuMTE3MjEgNS42Mjk3NTgsMTAuNDYwMSAxNy4xMDg5NDQsMTcuNTAwNSAyOS45OTg2MTcsMTcuNTAwNSA5LjY3NzA0MywwIDE4Ljk1OTgzNCwtMi42NTQ3IDI2LjAzMjk0NSwtOC4zMzI1IDcuMDczMTEyLC01LjY3NzkgMTEuNzQxMzA0LC0xNC40NTc2IDEyLjA5NjUzMSwtMjUuNjc0NiAwLjI5MTMyNSwtOS4xOTkzNSAtMy4zNzk5MDgsLTE4LjA5OTIxIC04LjkzNTUxMSwtMjQuOTk5NjMgLTkuMDMzMzI3LC05LjIwODcyIC0xOC4xNTM5NTIsLTEzLjk3NzgzIC0yOS4yMDM2NTgsLTEzLjk5MzI5IHoiIGlkPSJwYXRoNTk3MSIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ1OTc5KTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4xO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7ZW5hYmxlLWJhY2tncm91bmQ6bmV3Ii8+PC9nPjwvc3ZnPg=="

/***/ }),
/* 476 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "root" },
    [
      _c("sidebar"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "current-view" },
        [_c(_vm.$parent.currentView, { ref: "currentView", tag: "component" })],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5bfbb8de", esExports)
  }
}

/***/ }),
/* 477 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_setting_vue__ = __webpack_require__(164);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3fbcb036_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_setting_vue__ = __webpack_require__(480);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(478)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3fbcb036"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_setting_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3fbcb036_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_setting_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue_components\\setting\\setting.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fbcb036", Component.options)
  } else {
    hotAPI.reload("data-v-3fbcb036", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(479);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("d7340696", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fbcb036\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./setting.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fbcb036\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./setting.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.name[data-v-3fbcb036] {\n  font-size: 16px;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-weight: bold;\n  margin-top: 16px;\n}\n.description[data-v-3fbcb036] {\n  font-size: 16px;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n}\ninput[data-v-3fbcb036], textarea[data-v-3fbcb036] {\n  padding: 8px 12px;\n  margin: 8px 0;\n  border: 1px solid #DDD;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n}\ntextarea[data-v-3fbcb036] {\n  width: calc(100% - 24px);\n  height: 500px;\n}\n.checkbox[data-v-3fbcb036] {\n  float: left;\n  margin-right: 8px;\n}\n", ""]);

// exports


/***/ }),
/* 480 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.type == "checkbox"
        ? _c("checkbox", {
            ref: "input",
            staticClass: "checkbox",
            attrs: {
              type: "checkbox",
              disabled: _vm.disabled,
              value: _vm.value
            },
            on: { input: _vm.update }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "name" }, [_vm._v(_vm._s(_vm.name))]),
      _vm._v(" "),
      _c("div", { staticClass: "description" }, [
        _vm._v(_vm._s(_vm.description))
      ]),
      _vm._v(" "),
      _vm.type == "multiline"
        ? _c("textarea", {
            ref: "input",
            attrs: { disabled: _vm.disabled },
            domProps: { value: _vm.value },
            on: { input: _vm.update }
          })
        : _vm.type == "checkbox"
          ? _c("div")
          : _c("input", {
              ref: "input",
              attrs: { type: "text", disabled: _vm.disabled },
              domProps: { value: _vm.value },
              on: { input: _vm.update }
            })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3fbcb036", esExports)
  }
}

/***/ }),
/* 481 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_s_button_vue__ = __webpack_require__(165);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78941abd_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_s_button_vue__ = __webpack_require__(484);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(482)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-78941abd"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_s_button_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78941abd_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_s_button_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue_components\\s-button\\s-button.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78941abd", Component.options)
  } else {
    hotAPI.reload("data-v-78941abd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(483);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("1e6f001c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-78941abd\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./s-button.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-78941abd\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./s-button.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.s-button[data-v-78941abd] {\n  border: 1px solid #DDD;\n  background: none;\n  padding: 8px 12px;\n  font-size: 16px;\n}\n.s-button[data-v-78941abd]:hover {\n  background: #EEE;\n}\n", ""]);

// exports


/***/ }),
/* 484 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "button",
      {
        staticClass: "s-button",
        on: {
          click: function($event) {
            _vm.$emit("click")
          }
        }
      },
      [_vm._v(_vm._s(_vm.value))]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-78941abd", esExports)
  }
}

/***/ }),
/* 485 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__ = __webpack_require__(166);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c2e1486_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__ = __webpack_require__(489);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(486)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5c2e1486"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c2e1486_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue_components\\loading\\loading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c2e1486", Component.options)
  } else {
    hotAPI.reload("data-v-5c2e1486", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(487);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("1fd4172c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c2e1486\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c2e1486\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.loading[data-v-5c2e1486] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translateY(-50%) translateX(-50%);\n}\n", ""]);

// exports


/***/ }),
/* 488 */,
/* 489 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("vue-loading", {
    staticClass: "loading",
    attrs: {
      type: "bars",
      color: "#ee3",
      size: { width: "50px", height: "50px" }
    }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5c2e1486", esExports)
  }
}

/***/ }),
/* 490 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_hub_header_vue__ = __webpack_require__(167);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9da69ec6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_hub_header_vue__ = __webpack_require__(493);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(491)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9da69ec6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_hub_header_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9da69ec6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_hub_header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue_components\\hub-header\\hub-header.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9da69ec6", Component.options)
  } else {
    hotAPI.reload("data-v-9da69ec6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(492);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("0620c9e6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9da69ec6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./hub-header.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9da69ec6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./hub-header.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.hub-header[data-v-9da69ec6] {\n  background-color: #EEE;\n  padding: 8px 12px;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n}\n.bar[data-v-9da69ec6] {\n  display: inline-block;\n  width: 1px;\n  height: 16px;\n  vertical-align: middle;\n  background-color: #888;\n}\n", ""]);

// exports


/***/ }),
/* 493 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "hub-header" }, [
    _vm._v("\n\tYou are viewing hub\n\t"),
    _c("b", [_vm._v(_vm._s(_vm.hub.language))]),
    _vm._v(" "),
    _vm.hub.subgroup != ""
      ? _c("b", [
          _c("div", { staticClass: "bar" }),
          _vm._v("\n\t\t" + _vm._s(_vm.hub.subgroup) + "\n\t")
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _c(
      "a",
      {
        attrs: { href: "?/wiki/" + _vm.hub.slug + "/home" },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.$router.navigate("wiki/" + _vm.hub.slug + "/home")
          }
        }
      },
      [_vm._v("Home")]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "bar" }),
    _vm._v(" "),
    _c(
      "a",
      {
        attrs: { href: "?/new-article/" + _vm.hub.slug },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.$router.navigate("new-article/" + _vm.hub.slug)
          }
        }
      },
      [_vm._v("Create a new article")]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "bar" }),
    _vm._v(" "),
    _c(
      "a",
      {
        attrs: { href: "?/article-index/" + _vm.hub.slug },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.$router.navigate("article-index/" + _vm.hub.slug)
          }
        }
      },
      [_vm._v("Article index")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9da69ec6", esExports)
  }
}

/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var ZeroFrame = function () {
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
            this.log("Unknown request", message);
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
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            this.send({
                cmd: _cmd,
                params: params
            }, cb);
        }
    }, {
        key: 'cmdp',
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
        key: 'send',
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
    }, {
        key: 'monkeyPatchAjax',
        value: function monkeyPatchAjax() {
            window.XMLHttpRequest = ZeroFakeXMLHttpRequest;
            ZeroFakeXMLHttpRequest.zero_frame = this;
        }
    }]);

    return ZeroFrame;
}();

var ZeroFakeXMLHttpRequest = function () {
    function ZeroFakeXMLHttpRequest() {
        _classCallCheck(this, ZeroFakeXMLHttpRequest);
    }

    _createClass(ZeroFakeXMLHttpRequest, [{
        key: 'open',
        value: function open(method, path) {
            this.path = path;
            this.zero_frame = ZeroFakeXMLHttpRequest.zero_frame;
        }
    }, {
        key: 'onResult',
        value: function onResult(res) {
            this.status = 200;
            this.statusText = "200 OK";
            this.readyState = 4; // Done
            this.responseType = "text";
            this.responseText = this.response = res;
            if (this.onload) this.onload();
            if (this.onreadystatechange) this.onreadystatechange();
        }
    }, {
        key: 'setRequestHeader',
        value: function setRequestHeader(key, val) {
            return;
        }
    }, {
        key: 'getAllResponseHeaders',
        value: function getAllResponseHeaders() {
            return "";
        }
    }, {
        key: 'getAllResponseHeaders',
        value: function getAllResponseHeaders(name) {
            return null;
        }
    }, {
        key: 'send',
        value: function send() {
            var _this3 = this;

            this.zero_frame.cmd("fileGet", this.path, function (res) {
                return _this3.onResult(res);
            });
        }
    }]);

    return ZeroFakeXMLHttpRequest;
}();

module.exports = ZeroFrame;

/***/ }),
/* 495 */,
/* 496 */,
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vueMin = __webpack_require__(115);

var _vueMin2 = _interopRequireDefault(_vueMin);

var _router = __webpack_require__(498);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (zeroPage) {
	var router = new _router2.default(zeroPage);

	var plugin = {
		router: router,
		install: function install() {
			Object.defineProperty(_vueMin2.default.prototype, "$router", {
				get: function get() {
					return router;
				}
			});
		}
	};

	return { plugin: plugin, router: router };
};

/***/ }),
/* 498 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function Router(zeroPage) {
		_classCallCheck(this, Router);

		this.routes = [];
		this.currentRoute = "";
		this.currentParams = {};
		this.currentHash = "";
		this.zeroPage = zeroPage;

		this.check("");
	}

	_createClass(Router, [{
		key: "getURL",
		value: function getURL() {
			return this.clearSlashes(location.search.replace(/[?&]wrapper_nonce=([A-Za-z0-9]+)/, "").replace("?/", ""));
		}
	}, {
		key: "clearSlashes",
		value: function clearSlashes(path) {
			return path.toString().replace(/\/$/, "").replace(/^\//, "");
		}
	}, {
		key: "add",
		value: function add(route) {
			this.routes.push(route);
		}
	}, {
		key: "remove",
		value: function remove(arg) {
			var index = this.routes.findIndex(function (route) {
				return route.controller == arg || route.path == arg;
			});
			if (index > -1) {
				this.routes.splice(index, 1);
			}
		}
	}, {
		key: "check",
		value: function check(hash) {
			var _this = this;

			this.routes.forEach(function (route) {
				var match = hash.replace(/^\//, "").match(new RegExp("^" + route.path.replace(/:([^\/]+)/g, "([^\/]*)").replace(/\*/g, '(?:[^/]*)') + "$"));

				if (match) {
					match.shift(); // Shift [0] which has all the pattern

					var keys = route.path.match(/:([^\/]+)/g);
					var routeParams = {};
					match.forEach(function (value, i) {
						routeParams[keys[i].replace(":", "")] = value;
					});

					_this.currentParams = routeParams;
					_this.currentRoute = route.path;
					_this.currentHash = hash;

					route.controller(routeParams);
				}
			});
		}
	}, {
		key: "refresh",
		value: function refresh() {
			this.check(this.currentRoute);
		}
	}, {
		key: "listenForBack",
		value: function listenForBack(params) {
			this.navigate(params.href.replace(/.*\?/, "").replace(/^\//, ""), false);
		}
	}, {
		key: "navigate",
		value: function navigate(path) {
			var doPush = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			path = path || "";

			var previousRoute = this.currentRoute;
			if (doPush) {
				this.zeroPage.cmd("wrapperPushState", [{ route: path }, path, "/" + this.clearSlashes(path)]);
			}

			this.check(path);
		}
	}]);

	return Router;
}();

/***/ }),
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _home = __webpack_require__(500);

var _home2 = _interopRequireDefault(_home);

var _newHub = __webpack_require__(502);

var _newHub2 = _interopRequireDefault(_newHub);

var _hubList = __webpack_require__(504);

var _hubList2 = _interopRequireDefault(_hubList);

var _initHub = __webpack_require__(512);

var _initHub2 = _interopRequireDefault(_initHub);

var _article = __webpack_require__(517);

var _article2 = _interopRequireDefault(_article);

var _imported = __webpack_require__(592);

var _imported2 = _interopRequireDefault(_imported);

var _newArticle = __webpack_require__(600);

var _newArticle2 = _interopRequireDefault(_newArticle);

var _importArticle = __webpack_require__(602);

var _importArticle2 = _interopRequireDefault(_importArticle);

var _editArticle = __webpack_require__(604);

var _editArticle2 = _interopRequireDefault(_editArticle);

var _articleHistory = __webpack_require__(608);

var _articleHistory2 = _interopRequireDefault(_articleHistory);

var _articleVersion = __webpack_require__(616);

var _articleVersion2 = _interopRequireDefault(_articleVersion);

var _articleIndex = __webpack_require__(620);

var _articleIndex2 = _interopRequireDefault(_articleIndex);

var _settings = __webpack_require__(629);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (vue, zeroPage) {
	return [{
		path: "",
		controller: function controller() {
			vue.currentView = _home2.default;
		}
	}, {
		path: "new-hub",
		controller: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								vue.currentView = _newHub2.default;

							case 1:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, undefined);
			}));

			function controller() {
				return _ref.apply(this, arguments);
			}

			return controller;
		}()
	}, {
		path: "hub-list",
		controller: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								vue.currentView = _hubList2.default;

							case 1:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, undefined);
			}));

			function controller() {
				return _ref2.apply(this, arguments);
			}

			return controller;
		}()
	}, {
		path: "init-hub/:address",
		controller: function controller() {
			vue.currentView = _initHub2.default;
		}
	}, {
		path: "wiki/:language/:subgroup/:article",
		controller: function controller() {
			vue.currentView = _article2.default;
		}
	}, {
		path: "wiki/:language/:article",
		controller: function controller() {
			vue.currentView = _article2.default;
		}
	}, {
		path: "imported/:language/:subgroup/:origin/:article",
		controller: function controller() {
			vue.currentView = _imported2.default;
		}
	}, {
		path: "imported/:language/:origin/:article",
		controller: function controller() {
			vue.currentView = _imported2.default;
		}
	}, {
		path: "new-article/:language/:subgroup",
		controller: function controller() {
			vue.currentView = _newArticle2.default;
		}
	}, {
		path: "new-article/:language",
		controller: function controller() {
			vue.currentView = _newArticle2.default;
		}
	}, {
		path: "import-article/:language/:subgroup",
		controller: function controller() {
			vue.currentView = _importArticle2.default;
		}
	}, {
		path: "import-article/:language",
		controller: function controller() {
			vue.currentView = _importArticle2.default;
		}
	}, {
		path: "edit-article/:language/:subgroup/:article",
		controller: function controller() {
			vue.currentView = _editArticle2.default;
		}
	}, {
		path: "edit-article/:language/:article",
		controller: function controller() {
			vue.currentView = _editArticle2.default;
		}
	}, {
		path: "article-history/:language/:subgroup/:article",
		controller: function controller() {
			vue.currentView = _articleHistory2.default;
		}
	}, {
		path: "article-history/:language/:article",
		controller: function controller() {
			vue.currentView = _articleHistory2.default;
		}
	}, {
		path: "article-version/:language/:subgroup/:article/:date",
		controller: function controller() {
			vue.currentView = _articleVersion2.default;
		}
	}, {
		path: "article-version/:language/:article/:date",
		controller: function controller() {
			vue.currentView = _articleVersion2.default;
		}
	}, {
		path: "article-index/:language/:subgroup",
		controller: function controller() {
			vue.currentView = _articleIndex2.default;
		}
	}, {
		path: "article-index/:language",
		controller: function controller() {
			vue.currentView = _articleIndex2.default;
		}
	}, {
		path: "settings",
		controller: function controller() {
			vue.currentView = _settings2.default;
		}
	}];
};

/***/ }),
/* 500 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__ = __webpack_require__(170);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_221e22bc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_home_vue__ = __webpack_require__(501);
var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_221e22bc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\home\\home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-221e22bc", Component.options)
  } else {
    hotAPI.reload("data-v-221e22bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 501 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", [_vm._v("Welcome to Kiwipedia")]),
    _vm._v(" "),
    _c("p", [_vm._v("\n\t\tKiwipedia is a wiki platform for ZeroNet.\n\t")]),
    _vm._v(" "),
    _c("p", [
      _vm._v("\n\t\tHelp us by "),
      _c(
        "a",
        {
          attrs: { href: "?/new-article/en" },
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.$router.navigate("new-article/en")
            }
          }
        },
        [_vm._v("adding a new article to the English version")]
      ),
      _vm._v(", "),
      _c(
        "a",
        {
          attrs: { href: "?/new-hub" },
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.$router.navigate("new-hub")
            }
          }
        },
        [_vm._v("create a new topic for another language")]
      ),
      _vm._v(" or join our development group at "),
      _c("a", { attrs: { href: "/13c2MpR9ztCzVm7r8cTfV9h9FFEEiQ6AKD" } }, [
        _vm._v("Git Center")
      ]),
      _vm._v(" or "),
      _c("a", { attrs: { href: "https://github.com/imachug/Kiwipedia" } }, [
        _vm._v("GitHub")
      ]),
      _vm._v(".\n\t")
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-221e22bc", esExports)
  }
}

/***/ }),
/* 502 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_new_hub_vue__ = __webpack_require__(171);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2cbbb448_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_new_hub_vue__ = __webpack_require__(503);
var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_new_hub_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2cbbb448_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_new_hub_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\new-hub.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2cbbb448", Component.options)
  } else {
    hotAPI.reload("data-v-2cbbb448", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 503 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("h1", [_vm._v("New Hub")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "\n\t\tBefore Kiwipedia is released from beta, creating hub is limited to developers. If you want to add a hub, use "
        ),
        _c(
          "a",
          {
            attrs: {
              href:
                "/Me.ZeroNetwork.bit/?Profile/1SunAWK2VUT9GQK32MpwRfFPVgcBSJN9a/1Cy3ntkN2GN9MH6EaW6eHpi4YoRS2nK5Di/gitcenter@zeroid.bit"
            }
          },
          [_vm._v("ZeroMe")]
        ),
        _vm._v(".\n\t")
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2cbbb448", esExports)
  }
}

/***/ }),
/* 504 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_hub_list_vue__ = __webpack_require__(172);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_885aa3c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_hub_list_vue__ = __webpack_require__(511);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(505)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_hub_list_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_885aa3c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_hub_list_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\hub-list\\hub-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-885aa3c8", Component.options)
  } else {
    hotAPI.reload("data-v-885aa3c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(506);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("282f9904", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-885aa3c8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./hub-list.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-885aa3c8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./hub-list.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.hub {\n  display: block;\n  padding: 12px 16px;\n  background-color: #EEE;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n  text-decoration: none !important;\n}\n.hub:hover {\n  background-color: #DDD;\n}\n.hub-owner {\n  color: #000;\n}\n", ""]);

// exports


/***/ }),
/* 507 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_hub_vue__ = __webpack_require__(173);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_676b4782_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_hub_vue__ = __webpack_require__(510);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(508)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_hub_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_676b4782_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_hub_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\hub-list\\hub.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-676b4782", Component.options)
  } else {
    hotAPI.reload("data-v-676b4782", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(509);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("fa95312c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-676b4782\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./hub.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-676b4782\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./hub.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.hub {\n  display: block;\n  padding: 12px 16px;\n  background-color: #EEE;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n  text-decoration: none !important;\n}\n.hub:hover {\n  background-color: #DDD;\n}\n.runner {\n  color: #000;\n}\n", ""]);

// exports


/***/ }),
/* 510 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      staticClass: "hub",
      attrs: { href: "?/wiki/" + _vm.slug + "/home" },
      on: {
        click: function($event) {
          $event.preventDefault()
          _vm.$router.navigate("wiki/" + _vm.slug + "/home")
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "title" },
        [
          _vm._v("\n\t\t" + _vm._s(_vm.language) + "\n\n\t\t"),
          _vm.subgroup != ""
            ? [_vm._v("\n\t\t\t| " + _vm._s(_vm.subgroup) + "\n\t\t")]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "runner" }, [
        _vm._v("Runner: " + _vm._s(_vm.runner))
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-676b4782", esExports)
  }
}

/***/ }),
/* 511 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("h1", [_vm._v("Hub list")]),
      _vm._v(" "),
      _vm._l(_vm.hubs, function(hub) {
        return _c("hub", {
          key: "hub.address",
          attrs: {
            slug: hub.slug,
            language: hub.language,
            subgroup: hub.subgroup,
            runner: hub.runner
          }
        })
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-885aa3c8", esExports)
  }
}

/***/ }),
/* 512 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_init_hub_vue__ = __webpack_require__(175);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a5348f48_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_init_hub_vue__ = __webpack_require__(516);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(513)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a5348f48"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_init_hub_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a5348f48_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_init_hub_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\init-hub\\init-hub.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a5348f48", Component.options)
  } else {
    hotAPI.reload("data-v-a5348f48", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(514);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("14c98ec1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a5348f48\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./init-hub.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a5348f48\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./init-hub.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 514 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 515 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var addToIndex = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(language, subgroup, address) {
		var auth, slug;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _route.zeroAuth.requestAuth();

					case 2:
						auth = _context.sent;
						slug = (0, _hub.toSlug)(language) + (subgroup && "/" + (0, _hub.toSlug)(subgroup));
						_context.next = 6;
						return _route.zeroDB.insertRow("data/users/" + auth.address + "/data.json", "data/users/" + auth.address + "/content.json", "hubs", { language: language, subgroup: subgroup, address: address, slug: slug });

					case 6:
						return _context.abrupt("return", slug);

					case 7:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function addToIndex(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var _route = __webpack_require__(61);

var _startup = __webpack_require__(84);

var _hub = __webpack_require__(28);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

exports.default = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(language, subgroup, address) {
		var path, content;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return (0, _startup.addMergedSite)(address);

					case 2:
						path = "merged-Kiwipedia/" + address + "/content.json";
						_context2.next = 5;
						return _route.zeroFS.readFile(path);

					case 5:
						content = _context2.sent;

						content = JSON.parse(content);

						content.title = "Kiwipedia hub | " + language + (subgroup && " | " + subgroup);

						content = JSON.stringify(content, null, 4);
						_context2.next = 11;
						return _route.zeroFS.writeFile(path, content);

					case 11:
						_context2.next = 13;
						return _route.zeroPage.sign(path);

					case 13:
						_context2.next = 15;
						return addToIndex(language, subgroup, address);

					case 15:
						return _context2.abrupt("return", _context2.sent);

					case 16:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	function init(_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	}

	return init;
}();

/***/ }),
/* 516 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("h1", [_vm._v("Init Hub")]),
      _vm._v(" "),
      _c("p", [_vm._v("\n\t\tChoose settings for your new hub.\n\t")]),
      _vm._v(" "),
      _c("setting", {
        attrs: { type: "text", name: "Language", description: "en/pl/etc." },
        model: {
          value: _vm.language,
          callback: function($$v) {
            _vm.language = $$v
          },
          expression: "language"
        }
      }),
      _vm._v(" "),
      _c("setting", {
        attrs: {
          type: "text",
          name: "Subgroup (optional)",
          description: "ZeroNet development/America/etc."
        },
        model: {
          value: _vm.subgroup,
          callback: function($$v) {
            _vm.subgroup = $$v
          },
          expression: "subgroup"
        }
      }),
      _vm._v(" "),
      _c("s-button", { attrs: { value: "Init" }, on: { click: _vm.init } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a5348f48", esExports)
  }
}

/***/ }),
/* 517 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_vue__ = __webpack_require__(176);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f13a910_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_vue__ = __webpack_require__(591);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(518)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f13a910_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\article\\article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f13a910", Component.options)
  } else {
    hotAPI.reload("data-v-6f13a910", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 518 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(519);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("007eabaa", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f13a910\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f13a910\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.edit-icon, .history-icon {\n  color: #888 !important;\n  text-decoration: none !important;\n  font-size: 24px;\n}\n", ""]);

// exports


/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(521);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("1ac562f7", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-182819f4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./render.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-182819f4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./render.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.rendered[data-v-182819f4] {\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n}\n", ""]);

// exports


/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templates = __webpack_require__(65);

var _templates2 = _interopRequireDefault(_templates);

var _util = __webpack_require__(123);

var util = _interopRequireWildcard(_util);

var _wikitext = __webpack_require__(581);

var wikiText = _interopRequireWildcard(_wikitext);

var _template = __webpack_require__(586);

var _renderTemplate = __webpack_require__(589);

var _renderTemplate2 = _interopRequireDefault(_renderTemplate);

var _nowiki = __webpack_require__(183);

var nowiki = _interopRequireWildcard(_nowiki);

var _plugins = __webpack_require__(125);

var plugins = _interopRequireWildcard(_plugins);

var _settings = __webpack_require__(638);

var Settings = _interopRequireWildcard(_settings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var renderTemplate = void 0;

exports.default = {
	name: "markdown-article",
	props: ["text", "slug", "article", "imported", "title"],
	data: function data() {
		return {
			text: "",
			slug: "",
			article: "",
			imported: "",
			rendered: "",

			id: ""
		};
	},
	mounted: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var _this = this;

			var res, renderData;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							this.id = Math.random().toString(36).substr(2);

							_context3.next = 3;
							return this.render(this.text);

						case 3:
							res = _context3.sent;

							this.rendered = res.html;

							renderData = res.renderData;

							Object.freeze(renderData);

							this.$nextTick(function () {
								var rootNode = document.getElementById(_this.id);
								if (!rootNode) {
									return;
								}

								var secondaryRenderer = function () {
									var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(template, params) {
										return regeneratorRuntime.wrap(function _callee$(_context) {
											while (1) {
												switch (_context.prev = _context.next) {
													case 0:
														if (!_templates2.default[template].afterRender) {
															_context.next = 4;
															break;
														}

														_context.next = 3;
														return renderTemplate("ambox", {
															type: "serious",
															text: "'''AfterRender error'''",
															"text-small": "Template with afterRender cannot be invoked in afterRender handler"
														});

													case 3:
														return _context.abrupt("return", _context.sent);

													case 4:
														_context.next = 6;
														return renderTemplate(template, params, renderData);

													case 6:
														return _context.abrupt("return", _context.sent);

													case 7:
													case "end":
														return _context.stop();
												}
											}
										}, _callee, _this);
									}));

									return function secondaryRenderer(_x, _x2) {
										return _ref2.apply(this, arguments);
									};
								}();

								Object.keys(_templates2.default).filter(function (templateName) {
									return (/^<.*>$/.test(templateName)
									);
								}).map(function (templateName) {
									return templateName.match(/^<(.*)>$/)[1];
								}).filter(function (tagName) {
									return _templates2.default["<" + tagName + ">"].afterRender;
								}).forEach(function (tagName) {
									var toRender = Array.from(rootNode.querySelectorAll("rendered-" + tagName));
									toRender.forEach(function () {
										var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(node) {
											var params, afterRender, newNode;
											return regeneratorRuntime.wrap(function _callee2$(_context2) {
												while (1) {
													switch (_context2.prev = _context2.next) {
														case 0:
															params = { _: util.base64decode(node.innerHTML) };


															Array.from(node.attributes).forEach(function (attr) {
																return params[attr.name] = attr.value;
															});

															_context2.next = 4;
															return _templates2.default["<" + tagName + ">"].afterRender(params, secondaryRenderer);

														case 4:
															afterRender = _context2.sent;
															newNode = document.createElement("div");

															newNode.innerHTML = afterRender;

															if (!(newNode.children.length == 0)) {
																_context2.next = 11;
																break;
															}

															node.parentNode.removeChild(node);
															_context2.next = 23;
															break;

														case 11:
															if (!(newNode.children.length == 1)) {
																_context2.next = 15;
																break;
															}

															node.parentNode.replaceChild(newNode.children[0], node);
															_context2.next = 23;
															break;

														case 15:
															_context2.t0 = wikiText;
															_context2.next = 18;
															return renderTemplate("ambox", {
																type: "serious",
																text: "'''AfterRender error'''",
																"text-small": "AfterRender handler must return one node only, " + newNode.children.length + " were returned."
															});

														case 18:
															_context2.t1 = _context2.sent;
															_context2.t2 = _this.slug;
															_context2.next = 22;
															return _context2.t0.wikiTextToHTML.call(_context2.t0, _context2.t1, _context2.t2);

														case 22:
															node.innerHTML = _context2.sent;

														case 23:
														case "end":
															return _context2.stop();
													}
												}
											}, _callee2, _this);
										}));

										return function (_x3) {
											return _ref3.apply(this, arguments);
										};
									}());
								});
							});

						case 8:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, this);
		}));

		function mounted() {
			return _ref.apply(this, arguments);
		}

		return mounted;
	}(),

	methods: {
		render: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(text) {
				var settings, renderData, _replaceTemplates, replaced, renderingTemplates, rendered, html;

				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return Settings.load();

							case 2:
								settings = _context4.sent;
								_context4.next = 5;
								return wikiText.init();

							case 5:
								renderTemplate = (0, _renderTemplate2.default)({
									slug: this.slug,
									article: this.article,
									imported: this.imported,
									title: this.title,
									settings: settings
								});
								_template.settings.renderTemplate = renderTemplate;

								renderData = this.initTemplates();


								text = plugins.prepare(text);

								_replaceTemplates = (0, _template.replaceTemplates)(text), replaced = _replaceTemplates.replaced, renderingTemplates = _replaceTemplates.renderingTemplates;
								_context4.next = 12;
								return this.renderTemplates(replaced, renderingTemplates, renderData);

							case 12:
								rendered = _context4.sent;
								_context4.next = 15;
								return wikiText.wikiTextToHTML(rendered, this.slug);

							case 15:
								html = _context4.sent;
								return _context4.abrupt("return", { html: html, renderData: renderData });

							case 17:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function render(_x4) {
				return _ref4.apply(this, arguments);
			}

			return render;
		}(),
		initTemplates: function initTemplates() {
			var renderData = {};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.values(_templates2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var template = _step.value;

					if (template.init) {
						template.init.call(renderData);
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

			return renderData;
		},
		renderTemplates: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(text, renderingTemplates, renderData) {
				var rendered;
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								rendered = (0, _template.renderCurlyTemplates)(text, renderingTemplates, renderData);
								_context5.next = 3;
								return (0, _template.convertTagTemplates)(rendered, renderData);

							case 3:
								rendered = _context5.sent;
								return _context5.abrupt("return", rendered);

							case 5:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function renderTemplates(_x5, _x6, _x7) {
				return _ref5.apply(this, arguments);
			}

			return renderTemplates;
		}(),
		clicked: function clicked(e) {
			var parent = e.target;
			while (parent) {
				if (typeof parent.tagName == "string" && parent.tagName.toLowerCase() == "a") {
					var href = parent.getAttribute("href") || "";
					if (href[0] == "?") {
						this.$router.navigate(href.replace(/^\?\/?/, ""));
					}
					e.preventDefault();
					break;
				}
				parent = parent.parentNode;
			}
		}
	}
};

/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./#if.js": 524,
	"./about.js": 525,
	"./ambox.js": 526,
	"./cite-web.js": 527,
	"./clear.js": 528,
	"./external-media.js": 529,
	"./hatnote.js": 530,
	"./if.js": 531,
	"./invalid-template.js": 532,
	"./main.js": 533,
	"./math.js": 534,
	"./mathtag.js": 535,
	"./mvar.js": 570,
	"./nowiki.js": 571,
	"./nowrap.js": 572,
	"./numberofarticles.js": 573,
	"./original-test.js": 574,
	"./ref.js": 575,
	"./reflist.js": 576,
	"./see-also.js": 577,
	"./sidebar.js": 578,
	"./syntaxhighlight.js": 579,
	"./templates.js": 65,
	"./unexisting-template.js": 580
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 523;

/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "#if",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return renderer("if", {
								1: "",
								2: params[1],
								3: params[2],
								4: params[3]
							});

						case 2:
							return _context.abrupt("return", _context.sent);

						case 3:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "about",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer, context) {
			var thisIsAbout, uses, i, use, title, item;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							thisIsAbout = params[1];
							uses = [];

							for (i = 2; params[i] !== undefined; i += 2) {
								use = params[i] || "other uses";
								title = params[i + 1] || title + " (disambiguation)";

								uses.push({ use: use, title: title });
							}

							uses = uses.map(function (use) {
								return "For " + use.use + ", see [[" + use.title + "]].";
							}).join(" ");

							item = params.section == "yes" ? "section" : "page";
							_context.next = 7;
							return renderer("hatnote", {
								1: "This " + item + " is about " + thisIsAbout + ". " + uses,
								extraclasses: "about"
							});

						case 7:
							return _context.abrupt("return", _context.sent);

						case 8:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "ambox",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "\n\t\t\t<div class='ambox " + (params.type ? "ambox-" + params.type : "ambox-notice") + "'>\n\t\t\t\t" + (params.text || "") + "\n\t\t\t\t" + (params["text-small"] ? "<br />" + params["text-small"] : "") + "\n\t\t\t</div>\n\t\t");

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "cite web",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			var formatAuthor;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							formatAuthor = function formatAuthor() {
								var author = params.last ? params.first + " " + params.last : params.author || "";
								return params.authorlink ? "[[" + params.authorlink + "|" + author + "]]" : author;
							};

							return _context.abrupt("return", "\n\t\t\t<a href=\"" + params.url + "\">" + params.title + "</a>\n\t\t\t" + (params.last || params.author ? " &#8212; " + formatAuthor(params) : "") + "\n\t\t\t" + (params.description ? " <i>" + params.description + "</i>" : "") + "\n\t\t\t" + (params.website || "") + "\n\t\t\t" + (params.publisher ? "published by " + params.publisher : "") + "\n\t\t");

						case 2:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "clear",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "<div style=\"clear: " + (params[1] || "both") + "\" />");

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
		name: "external media",
		render: function () {
				var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
						var images, audios, videos;
						return regeneratorRuntime.wrap(function _callee$(_context) {
								while (1) {
										switch (_context.prev = _context.next) {
												case 0:
														images = [params.image1, params.image2, params.image3];

														images = images.filter(function (image) {
																return image;
														});
														images = images.map(function (image) {
																return "<img src=\"" + image + "\" />";
														});
														images = images.join("<br />");

														audios = [params.audio1, params.audio2, params.audio3];

														audios = audios.filter(function (audio) {
																return audio;
														});
														audios = audios.map(function (audio) {
																return "<audio src=\"" + audio + "\" controls />";
														});
														audios = audios.join("<br />");

														videos = [params.video1, params.video2, params.video3];

														videos = videos.filter(function (video) {
																return video;
														});
														videos = videos.map(function (video) {
																return "<video src=\"" + video + "\" controls />";
														});
														videos = videos.join("<br />");

														return _context.abrupt("return", [].concat(images, audios, videos).join("<br />"));

												case 13:
												case "end":
														return _context.stop();
										}
								}
						}, _callee, this);
				}));

				function render(_x, _x2) {
						return _ref.apply(this, arguments);
				}

				return render;
		}()
};

/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "hatnote",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			var isTrue;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							isTrue = function isTrue(val) {
								return ["yes", "y", "true", "1"].indexOf(val) > -1;
							};

							return _context.abrupt("return", "\n\t\t\t<div role=\"note\" class=\"hatnote " + (params.extraclasses || "") + " " + (isTrue(params.selfref) ? "selfref" : "") + "\">\n\t\t\t\t" + params[1] + "\n\t\t\t</div>\n\t\t");

						case 2:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "if",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			var settings;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(params[1] == "")) {
								_context.next = 17;
								break;
							}

							// Simple if

							settings = (params[5] || "").split(",");

							if (!(params[2].indexOf("was referenced, though is doesn't exist") > -1 && settings.indexOf("-unknown") == -1)) {
								_context.next = 10;
								break;
							}

							_context.next = 5;
							return renderer("ambox", {
								type: "serious",
								text: "'''Unknown template'''",
								"text-small": "<code>{{if}}</code> condition is " + params[2] + " - probably some template doesn't exist. Check source code and fix the error. If there is no error, pass <code>-unknown</code> flag to <code>{{if}}</code>, like this: <code>{{if||condition|then|else|-unknown}}</code>"
							});

						case 5:
							_context.t0 = _context.sent;
							_context.t1 = params[3];
							return _context.abrupt("return", _context.t0 + _context.t1);

						case 10:
							if (!(params[2] != "")) {
								_context.next = 14;
								break;
							}

							return _context.abrupt("return", params[3]);

						case 14:
							return _context.abrupt("return", params[4]);

						case 15:
							_context.next = 20;
							break;

						case 17:
							_context.next = 19;
							return renderer("unexisting-template", {
								name: "if|" + params[1]
							});

						case 19:
							return _context.abrupt("return", _context.sent);

						case 20:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "invalid-template",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return renderer("ambox", {
								type: "serious",
								text: "'''Invalid template'''",
								"text-small": "Code <code>{{" + params.code + "}}</code> was used as a template, though it looks like invalid syntax. If you think the syntax is correct, [[:en/kiwipedia-test:TODO templates|add it to TODO templates]]."
							});

						case 2:
							return _context.abrupt("return", _context.sent);

						case 3:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: ["main", "main article"],
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer, context) {
			var articles, i, count;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							articles = [];

							for (i = 1; params[i] !== undefined; i++) {
								articles.push({
									link: params[i],
									label: params["l" + i] || params["label " + i] || params[i]
								});
							}

							if (!params[1]) {
								articles.push({
									link: context.slug,
									label: params["l1"] || params["label 1"] || context.title
								});
							}

							articles = articles.map(function (article) {
								return "[[" + article.link + "|" + article.label + "]]";
							});

							count = void 0;

							if (articles.length > 1) {
								articles = articles.slice(0, articles.length - 1).join(", ") + " and " + articles.slice(-1)[0];
								count = "s";
							} else {
								articles = articles[0];
								count = "";
							}

							_context.next = 8;
							return renderer("hatnote", {
								1: "Main article" + count + ": " + articles,
								extraclasses: "main",
								selfref: params.selfref
							});

						case 8:
							return _context.abrupt("return", _context.sent);

						case 9:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "math",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "\n\t\t\t<span class=\"formula\">" + params[1] + "</span>\n\t\t");

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 535 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _katex = __webpack_require__(536);

var _katex2 = _interopRequireDefault(_katex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "<math>",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "" + params._);

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}(),
	afterRender: function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params, renderer) {
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							return _context2.abrupt("return", "<span class=\"math\">" + _katex2.default.renderToString(params._) + "</span>");

						case 4:
							_context2.prev = 4;
							_context2.t0 = _context2["catch"](0);

							if (!(_context2.t0 instanceof _katex2.default.ParseError)) {
								_context2.next = 12;
								break;
							}

							_context2.next = 9;
							return renderer("ambox", {
								type: "serious",
								text: "Incorrect formula",
								"text-small": "Formula <code>" + params._ + "</code> is incorrect."
							});

						case 9:
							return _context2.abrupt("return", _context2.sent);

						case 12:
							_context2.next = 14;
							return renderer("ambox", {
								type: "serious",
								text: "Error during rendering formula",
								"text-small": _context2.t0.message
							});

						case 14:
							return _context2.abrupt("return", _context2.sent);

						case 15:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, this, [[0, 4]]);
		}));

		function afterRender(_x3, _x4) {
			return _ref2.apply(this, arguments);
		}

		return afterRender;
	}()
};

/***/ }),
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "mvar",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "\n\t\t\t<span class=\"math-template mvar\">" + params[1] + "</span>\n\t\t");

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 571 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	nowiki: true,
	name: "<nowiki>",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", params._);

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 572 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "nowrap",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "\n\t\t\t<span class=\"nowrap\">" + params[1] + "</span>\n\t\t");

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 573 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _hub = __webpack_require__(28);

var _hub2 = _interopRequireDefault(_hub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "nUMBEROFARTICLES",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer, context) {
			var hub, index;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							hub = new _hub2.default(context.slug);
							_context.next = 4;
							return hub.init();

						case 4:
							_context.next = 6;
							return hub.getIndex();

						case 6:
							index = _context.sent;
							return _context.abrupt("return", index.length.toString());

						case 10:
							_context.prev = 10;
							_context.t0 = _context["catch"](0);
							_context.next = 14;
							return renderer("ambox", {
								type: "serious",
								text: "'''Unable to get number of articles'''",
								"text-small": "Could not evaluate {{NUMBEROFARTICLES}}: <code>" + _context.t0.message + "</code>."
							});

						case 14:
							return _context.abrupt("return", _context.sent);

						case 15:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 10]]);
		}));

		function render(_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 574 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	nowiki: true,
	name: "<original-test>",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return renderer("ambox", {
								type: "notice",
								text: "'''&lt;original-test&gt;'''",
								"text-small": "\n\t\t\t\t\t<div>\n\t\t\t\t\t\t''Original string'': " + params._.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "<br>\n\t\t\t\t\t\t''Params'': " + JSON.stringify(params, function (key, value) {
									return key == "_" ? undefined : value;
								}).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "\n\t\t\t\t\t</div>\n\t\t\t\t"
							});

						case 2:
							return _context.abrupt("return", _context.sent);

						case 3:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 575 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "<ref>",

	init: function init() {
		this.refs = [];
		this.refNames = [];
	},
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			var id;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(!params.name && !params._)) {
								_context.next = 2;
								break;
							}

							return _context.abrupt("return", "");

						case 2:

							if (!params.name) {
								params.name = this.refs.length;
							}

							if (this.refNames.indexOf(params.name) == -1) {
								this.refNames.push(params.name);
								this.refs.push("");
							}
							id = this.refNames.indexOf(params.name);


							if (params._ != "") {
								this.refs[id] = "\n\t\t\t\t<div id=\"ref_" + (id + 1) + "\">\n\t\t\t\t\t" + params._ + "\n\t\t\t\t</div>\n\t\t\t";
							}

							return _context.abrupt("return", "<sup><a href=\"#ref_" + (id + 1) + "\">[" + (id + 1) + "]</a></sup>");

						case 7:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 576 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "reflist",

	init: function init() {
		this.refs = [];
	},
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "<ol>" + this.refs.map(function (ref) {
								return "<li>" + ref + "</li>";
							}).join("") + "</ol>");

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 577 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "see also",

	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer, context) {
			var articles, i;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							articles = [];

							for (i = 1; params[i] !== undefined; i++) {
								articles.push({
									link: params[i],
									label: params["l" + i] || params["label " + i] || params[i]
								});
							}

							articles = articles.map(function (article) {
								return "[[" + article.link + "|" + article.label + "]]";
							}).join(", ");

							_context.next = 5;
							return renderer("hatnote", {
								1: "See also: " + articles,
								extraclasses: "see-also",
								selfref: params.selfref
							});

						case 5:
							return _context.abrupt("return", _context.sent);

						case 6:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 578 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "sidebar",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			var headings, i, heading;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							headings = [];

							for (i = 1; i <= 35; i++) {
								if (params["content" + i]) {
									heading = params["heading" + i];

									heading = heading ? "<b>" + heading + "</b><br>" : "";
									headings.push(heading + params["content" + i] + "<br>");
								}
							}
							headings = headings.join("");

							return _context.abrupt("return", "\n\t\t\t<div class=\"sidebar-container\">\n\t\t\t\t" + (params.outertitle || "") + "\n\n\t\t\t\t<div class=\"sidebar\">\n\t\t\t\t\t" + (params.topimage || "") + "\n\n\t\t\t\t\t" + (params.pretitle ? params.pretitle + "<br>" : "") + "\n\t\t\t\t\t" + (params.title ? "<h3>" + params.title + "</h3>" : "") + "\n\n\t\t\t\t\t" + (params.image || "") + "\n\n\t\t\t\t\t" + headings + "\n\n\t\t\t\t\t<br>\n\t\t\t\t\t" + (params.name ? "<small>Template: " + params.name + "</small>" : "") + "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");

						case 4:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 579 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	nowiki: true,
	name: "<syntaxhighlight>",
	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt("return", "<pre>" + params._.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>") + "</pre>");

						case 1:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 580 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	name: "unexisting-template",

	render: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, renderer, context) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!context.settings.hideUnknownTemplate) {
								_context.next = 2;
								break;
							}

							return _context.abrupt("return", "");

						case 2:
							_context.next = 4;
							return renderer("ambox", {
								type: "style",
								text: "'''Unknown template'''",
								"text-small": "Template '''" + params.name + "''' was referenced, though is doesn't exist. If it looks like a correct WikiMedia template, [[:en/kiwipedia-test:TODO templates|add it to TODO templates]]."
							});

						case 4:
							return _context.abrupt("return", _context.sent);

						case 5:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function render(_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		}

		return render;
	}()
};

/***/ }),
/* 581 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wikiTextToHTML = exports.init = undefined;

var init = exports.init = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var hubs;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return (0, _hubManager.getHubList)();

					case 2:
						hubs = _context.sent;

						hubs = hubs.map(function (hub) {
							return hub.slug;
						});
						hubs = hubs.join("|");

						_instaview2.default.conf.wiki = {
							lang: "language",
							interwiki: hubs,
							default_thumb_width: 180
						};
						_instaview2.default.conf.paths = {
							base_href: "./",
							articles: "ARTICLENAMEGOESHERE",
							math: "/math/", // TODO
							images: "",
							images_fallback: "", // TODO
							magnify_icon: "" // TODO
						};

					case 7:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function init() {
		return _ref.apply(this, arguments);
	};
}();

var wikiTextToHTML = exports.wikiTextToHTML = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(wikitext, slug) {
		var _this = this;

		var html;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						html = _instaview2.default.convert(wikitext);
						_context3.next = 3;
						return (0, _stringReplaceAsync2.default)(html, /ARTICLENAMEGOESHERE(.*?)(['"])/g, function () {
							var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(all, article, quote) {
								var wiki, hub;
								return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												wiki = void 0;


												if (article.indexOf(":") == -1) {
													// Local link
													wiki = slug;
												} else {
													// Interwiki
													article = article.replace(/^:/, "");

													wiki = article.substr(0, article.indexOf(":"));
													article = article.substr(article.indexOf(":") + 1);

													wiki = (0, _hub.toSlug)(wiki.replace("/", "MYAWESOMECONSTANT")).replace((0, _hub.toSlug)("MYAWESOMECONSTANT"), "/");
												}

												article = (0, _hub.toSlug)(article);

												hub = new _hub2.default(wiki);
												_context2.prev = 4;
												_context2.next = 7;
												return hub.init();

											case 7:
												_context2.next = 12;
												break;

											case 9:
												_context2.prev = 9;
												_context2.t0 = _context2["catch"](4);
												return _context2.abrupt("return", "?/wiki/" + wiki + "/" + article + quote + " class='interwiki-invalid'");

											case 12:
												_context2.prev = 12;
												_context2.next = 15;
												return hub.getArticleOrigins(article);

											case 15:
												_context2.next = 20;
												break;

											case 17:
												_context2.prev = 17;
												_context2.t1 = _context2["catch"](12);
												return _context2.abrupt("return", "?/wiki/" + wiki + "/" + article + quote + " class='interwiki-error'");

											case 20:
												return _context2.abrupt("return", "?/wiki/" + wiki + "/" + article + quote + " class='interwiki-exists'");

											case 21:
											case "end":
												return _context2.stop();
										}
									}
								}, _callee2, _this, [[4, 9], [12, 17]]);
							}));

							return function (_x3, _x4, _x5) {
								return _ref3.apply(this, arguments);
							};
						}());

					case 3:
						html = _context3.sent;
						return _context3.abrupt("return", html);

					case 5:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function wikiTextToHTML(_x, _x2) {
		return _ref2.apply(this, arguments);
	};
}();

var _hubManager = __webpack_require__(174);

var _hub = __webpack_require__(28);

var _hub2 = _interopRequireDefault(_hub);

var _instaview = __webpack_require__(582);

var _instaview2 = _interopRequireDefault(_instaview);

var _stringReplaceAsync = __webpack_require__(584);

var _stringReplaceAsync2 = _interopRequireDefault(_stringReplaceAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;

/***/ }),
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.convertTagTemplates = exports.settings = undefined;

var convertTagTemplates = exports.convertTagTemplates = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(html, renderData) {
		var _this = this;

		var handler, parser, renderTagTemplate, convert;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						handler = new _htmlhandler2.default("<div>\n" + html + "\n</div>");
						parser = new _htmlparser2.default.Parser(handler);

						parser.parseComplete("<div>\n" + html + "\n</div>");

						renderTagTemplate = function () {
							var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(elem) {
								var template, params, children, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, child, paramName, paramValue;

								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												template = elem.attribs.is;
												params = {};
												children = (elem.children || []).filter(function (child) {
													return child.type == "tag" && child.name == "kiwipedia-param";
												});
												_iteratorNormalCompletion2 = true;
												_didIteratorError2 = false;
												_iteratorError2 = undefined;
												_context.prev = 6;
												_iterator2 = children[Symbol.iterator]();

											case 8:
												if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
													_context.next = 18;
													break;
												}

												child = _step2.value;
												paramName = child.attribs.name;
												_context.next = 13;
												return Promise.all((child.children || []).map(convert));

											case 13:
												paramValue = _context.sent.join("");


												params[paramName] = paramValue;

											case 15:
												_iteratorNormalCompletion2 = true;
												_context.next = 8;
												break;

											case 18:
												_context.next = 24;
												break;

											case 20:
												_context.prev = 20;
												_context.t0 = _context["catch"](6);
												_didIteratorError2 = true;
												_iteratorError2 = _context.t0;

											case 24:
												_context.prev = 24;
												_context.prev = 25;

												if (!_iteratorNormalCompletion2 && _iterator2.return) {
													_iterator2.return();
												}

											case 27:
												_context.prev = 27;

												if (!_didIteratorError2) {
													_context.next = 30;
													break;
												}

												throw _iteratorError2;

											case 30:
												return _context.finish(27);

											case 31:
												return _context.finish(24);

											case 32:
												_context.next = 34;
												return settings.renderTemplate(template, params, renderData);

											case 34:
												return _context.abrupt("return", _context.sent);

											case 35:
											case "end":
												return _context.stop();
										}
									}
								}, _callee, _this, [[6, 20, 24, 32], [25,, 27, 31]]);
							}));

							return function renderTagTemplate(_x3) {
								return _ref2.apply(this, arguments);
							};
						}();

						convert = function () {
							var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elem) {
								var renderedInside, template, params;
								return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												if (!(elem.type == "text")) {
													_context2.next = 4;
													break;
												}

												return _context2.abrupt("return", elem.raw);

											case 4:
												if (!(elem.type == "tag")) {
													_context2.next = 28;
													break;
												}

												if (!(elem.name == "kiwipedia-template")) {
													_context2.next = 11;
													break;
												}

												_context2.next = 8;
												return renderTagTemplate(elem);

											case 8:
												return _context2.abrupt("return", _context2.sent);

											case 11:
												if (!elem.name.startsWith("plugin-")) {
													_context2.next = 15;
													break;
												}

												_context2.next = 14;
												return plugins.render(elem, convert, settings.renderTemplate, renderData);

											case 14:
												return _context2.abrupt("return", _context2.sent);

											case 15:
												_context2.next = 17;
												return Promise.all((elem.children || []).map(convert));

											case 17:
												renderedInside = _context2.sent.join("");
												template = "<" + elem.name + ">";

												if (!_templates2.default[template]) {
													_context2.next = 27;
													break;
												}

												params = { _: renderedInside };

												Object.assign(params, elem.attribs || {});
												_context2.next = 24;
												return settings.renderTemplate(template, params, renderData);

											case 24:
												return _context2.abrupt("return", _context2.sent);

											case 27:
												return _context2.abrupt("return", "<" + elem.raw + ">" + renderedInside + "</" + elem.name + ">");

											case 28:
											case "end":
												return _context2.stop();
										}
									}
								}, _callee2, _this);
							}));

							return function convert(_x4) {
								return _ref3.apply(this, arguments);
							};
						}();

						_context3.next = 7;
						return convert(handler.dom[0]);

					case 7:
						return _context3.abrupt("return", _context3.sent);

					case 8:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function convertTagTemplates(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.replaceTemplates = replaceTemplates;
exports.renderCurlyTemplates = renderCurlyTemplates;

var _templates = __webpack_require__(65);

var _templates2 = _interopRequireDefault(_templates);

var _htmlparser = __webpack_require__(86);

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _htmlhandler = __webpack_require__(124);

var _htmlhandler2 = _interopRequireDefault(_htmlhandler);

var _parser = __webpack_require__(587);

var _plugins = __webpack_require__(125);

var plugins = _interopRequireWildcard(_plugins);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var settings = exports.settings = { renderTemplate: null };

var templateConstant = "MY_AWESOME_TEMPLATE_NUMBER_{{id}}_GOES_HERE_PLEASE_DONT_USE_THIS_CONSTANT_ANYWHERE_IN_ARTICLE";

function replaceTemplates(text) {
	var lastTemplateId = 0;

	var renderingTemplates = {};

	// Remove <!-- --> comments
	text = text.replace(/<!--[\s\S]*?-->/g, "");

	// First, replace {{templates}} with constants
	var replaced = text,
	    oldReplaced = void 0;
	do {
		oldReplaced = replaced;
		replaced = replace(replaced, function (template) {
			var id = lastTemplateId++;
			renderingTemplates[id] = template;
			return templateConstant.replace("{{id}}", id);
		});
	} while (oldReplaced != replaced);

	return { renderingTemplates: renderingTemplates, replaced: replaced };
};

function replace(text, callback) {
	return text.replace(/{{/g, "\x00").replace(/}}/g, "\x01").replace(/\x00([^\x00\x01]*?)\x01/g, function (all, template) {
		return callback(template);
	}).replace(/\x00/g, "{{").replace(/\x01/g, "}}");
};

function renderCurlyTemplates(text, renderingTemplates, renderData) {
	var templateRegexp = /MY_AWESOME_TEMPLATE_NUMBER_(.+?)_GOES_HERE_PLEASE_DONT_USE_THIS_CONSTANT_ANYWHERE_IN_ARTICLE/g;

	var rendered = text.replace(templateRegexp, function (all, id) {
		var template = renderingTemplates[id];

		var _parseTemplate = (0, _parser.parseTemplate)(template),
		    name = _parseTemplate.name,
		    params = _parseTemplate.params;

		name = name[0].toLowerCase() + name.substr(1);
		if (!_templates2.default[name]) {
			return ("\n\t\t\t\t<kiwipedia-template is=\"unexisting-template\">\n\t\t\t\t\t<kiwipedia-param name=\"name\">" + name + "</kiwipedia-param>\n\t\t\t\t</kiwipedia-template>\n\t\t\t").replace(/[\t\n]/g, "");
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.keys(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var paramName = _step.value;

				var paramValue = params[paramName];
				paramValue = renderCurlyTemplates(paramValue, renderingTemplates, renderData);
				params[paramName] = paramValue;
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

		return "<kiwipedia-template is=\"" + name + "\">" + Object.keys(params).map(function (paramName) {
			var paramValue = params[paramName];
			return "<kiwipedia-param name=\"" + paramName + "\">" + paramValue + "</kiwipedia-param>";
		}).join("") + "</kiwipedia-template>";
	});

	return rendered;
};

;

/***/ }),
/* 587 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseTemplateParams = parseTemplateParams;
exports.parseTemplate = parseTemplate;
function parseTemplateParams(params) {
	var trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var index = 1;
	var res = {};

	params.split("|").forEach(function (param) {
		if (trim) {
			if (param.indexOf("=") == -1) {
				res[index++] = param;
			} else {
				var name = param.substr(0, param.indexOf("=")).trim();
				var value = param.substr(param.indexOf("=") + 1).trim();
				res[name] = value;
			}
		} else {
			res[index++] = param.trim();
		}
	});

	return res;
};

function parseTemplate(template) {
	if (template[0] == "#") {
		var name = template.substr(0, template.indexOf(":"));
		var params = template.substr(template.indexOf(":") + 1);

		return {
			name: name.trimLeft(),
			params: parseTemplateParams(params, false)
		};
	}

	var match = template.match(/^([^#<>\[\]\|\{\}]+?)\|([\s\S]*)$/);
	if (match) {
		return {
			name: match[1].trim(),
			params: parseTemplateParams(match[2])
		};
	}

	match = template.match(/^([^#<>\[\]\|\{\}]+?)$/);
	if (match) {
		return {
			name: match[1].trim(),
			params: {}
		};
	}

	return {
		name: "invalid-template",
		params: {
			code: template
		}
	};
};

/***/ }),
/* 588 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./nowiki.js": 183,
	"./plugin-util.js": 126,
	"./plugins.js": 125
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 588;

/***/ }),
/* 589 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _templates = __webpack_require__(65);

var _templates2 = _interopRequireDefault(_templates);

var _util = __webpack_require__(123);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function init(context) {
	return function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(template, params, renderData) {
			var _this = this;

			var renderer, rendered, attribs, tagName;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							renderer = function () {
								var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(template, params) {
									return regeneratorRuntime.wrap(function _callee$(_context) {
										while (1) {
											switch (_context.prev = _context.next) {
												case 0:
													_context.next = 2;
													return renderTemplate(template, params, renderData);

												case 2:
													return _context.abrupt("return", _context.sent);

												case 3:
												case "end":
													return _context.stop();
											}
										}
									}, _callee, _this);
								}));

								return function renderer(_x4, _x5) {
									return _ref2.apply(this, arguments);
								};
							}();

							template = template[0].toLowerCase() + template.substr(1);

							if (_templates2.default[template]) {
								_context2.next = 6;
								break;
							}

							_context2.next = 5;
							return renderTemplate("unexisting-template", {
								name: template
							}, renderData);

						case 5:
							return _context2.abrupt("return", _context2.sent);

						case 6:
							_context2.next = 8;
							return _templates2.default[template].render.call(renderData, params, renderer, context);

						case 8:
							rendered = _context2.sent.trim().replace(/\n/g, "");


							if (/^<.*>$/.test(template) && _templates2.default[template].afterRender) {
								attribs = Object.keys(params).filter(function (name) {
									return name != "_";
								}).map(function (name) {
									return {
										name: name,
										value: params[name].replace(/&/g, "&amp;").replace(/"/g, "&quot;")
									};
								}).map(function (_ref3) {
									var name = _ref3.name,
									    value = _ref3.value;
									return name + "=\"" + value + "\"";
								}).join(" ");
								tagName = template.match(/^<(.*)>$/)[1];

								rendered = "<rendered-" + tagName + " " + attribs + ">" + util.base64encode(rendered) + "</rendered-" + tagName + ">";
							}

							return _context2.abrupt("return", rendered);

						case 11:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, this);
		}));

		function renderTemplate(_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		}

		return renderTemplate;
	}();
};

/***/ }),
/* 590 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.rendered != ""
    ? _c("div", {
        staticClass: "rendered",
        attrs: { id: _vm.id },
        domProps: { innerHTML: _vm._s(_vm.rendered) },
        on: { click: _vm.clicked }
      })
    : _c("loading")
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-182819f4", esExports)
  }
}

/***/ }),
/* 591 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.status == "no-article"
        ? _c("div", [
            _c("h1", [
              _vm._v("No article named "),
              _c("i", [_vm._v(_vm._s(_vm.article))])
            ]),
            _vm._v(" "),
            _c("p", [
              _c(
                "a",
                {
                  attrs: { href: "?/new-article/" + _vm.slug },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$router.navigate("new-article/" + _vm.slug)
                    }
                  }
                },
                [_vm._v("Create this article")]
              ),
              _vm._v("\n\t\t\tor\n\t\t\t"),
              _c(
                "a",
                {
                  attrs: { href: "?/import-article/" + _vm.slug },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$router.navigate("import-article/" + _vm.slug)
                    }
                  }
                },
                [_vm._v("import it")]
              ),
              _vm._v(".\n\t\t")
            ])
          ])
        : _vm.status == "error"
          ? _c("div", [
              _c("h1", [_vm._v("Error")]),
              _vm._v(" "),
              _c("p", [_vm._v(_vm._s(_vm.error))])
            ])
          : _vm.imported == "ask"
            ? _c(
                "div",
                [
                  _c("hub-header", { attrs: { hub: _vm.hub } }),
                  _vm._v(" "),
                  _c("h1", [_vm._v("Imported")]),
                  _vm._v(" "),
                  _c(
                    "p",
                    [
                      _vm._v(
                        "\n\t\t\tThis is an imported article, and there are several versions you may want to look at. Choose between\n\t\t\t"
                      ),
                      _vm._l(_vm.origins, function(origin) {
                        return _c("span", [
                          _c(
                            "a",
                            {
                              attrs: {
                                href:
                                  "?/imported/" +
                                  _vm.slug +
                                  "/" +
                                  _vm.toSlug(origin) +
                                  "/" +
                                  _vm.article
                              },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.$router.navigate(
                                    "imported/" +
                                      _vm.slug +
                                      "/" +
                                      _vm.toSlug(origin) +
                                      "/" +
                                      _vm.article
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(origin))]
                          ),
                          _vm._v(" "),
                          _c("span")
                        ])
                      }),
                      _vm._v(" origins.\n\t\t")
                    ],
                    2
                  )
                ],
                1
              )
            : _vm.articleNode
              ? _c(
                  "div",
                  [
                    _c("hub-header", { attrs: { hub: _vm.hub } }),
                    _vm._v(" "),
                    _c("h1", [
                      _vm._v(
                        "\n\t\t\t" + _vm._s(_vm.articleNode.title) + "\n\t\t\t"
                      ),
                      _c(
                        "a",
                        {
                          staticClass: "edit-icon",
                          attrs: {
                            href:
                              "?/edit-article/" + _vm.slug + "/" + _vm.article
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.$router.navigate(
                                "edit-article/" + _vm.slug + "/" + _vm.article
                              )
                            }
                          }
                        },
                        [_vm._v("✎")]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticClass: "history-icon",
                          attrs: {
                            href:
                              "?/article-history/" +
                              _vm.slug +
                              "/" +
                              _vm.article
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.$router.navigate(
                                "article-history/" +
                                  _vm.slug +
                                  "/" +
                                  _vm.article
                              )
                            }
                          }
                        },
                        [_vm._v("☰")]
                      )
                    ]),
                    _vm._v(" "),
                    _vm.origins.length > 0
                      ? _c(
                          "div",
                          { staticClass: "ambox ambox-notice" },
                          [
                            _c("b", [
                              _vm._v(
                                "This article has imported version(s) you may want to look at."
                              )
                            ]),
                            _c("br"),
                            _vm._v("\n\t\t\tChoose between\n\t\t\t"),
                            _vm._l(_vm.origins, function(origin) {
                              return _c("span", [
                                _c(
                                  "a",
                                  {
                                    attrs: {
                                      href:
                                        "?/imported/" +
                                        _vm.slug +
                                        "/" +
                                        _vm.toSlug(origin) +
                                        "/" +
                                        _vm.article
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        _vm.$router.navigate(
                                          "imported/" +
                                            _vm.slug +
                                            "/" +
                                            _vm.toSlug(origin) +
                                            "/" +
                                            _vm.article
                                        )
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(origin))]
                                ),
                                _vm._v(" "),
                                _c("span")
                              ])
                            }),
                            _vm._v(".\n\t\t")
                          ],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c("render-article", {
                      attrs: {
                        text: _vm.articleNode.text,
                        slug: _vm.slug,
                        article: _vm.article,
                        imported: "",
                        title: _vm.articleNode.title
                      }
                    })
                  ],
                  1
                )
              : _c("loading")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6f13a910", esExports)
  }
}

/***/ }),
/* 592 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_imported_vue__ = __webpack_require__(184);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cf6de448_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_imported_vue__ = __webpack_require__(599);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(593)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_imported_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cf6de448_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_imported_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\imported\\imported.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf6de448", Component.options)
  } else {
    hotAPI.reload("data-v-cf6de448", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 593 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(594);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("4215813e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cf6de448\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./imported.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cf6de448\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./imported.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 594 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.reimport-icon, .history-icon {\n  color: #888 !important;\n  text-decoration: none !important;\n  font-size: 24px;\n}\n", ""]);

// exports


/***/ }),
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.status == "no-article"
        ? _c("div", [
            _c("h1", [
              _vm._v("No article named "),
              _c("i", [_vm._v(_vm._s(_vm.article))])
            ]),
            _vm._v(" "),
            _c("p", [
              _c(
                "a",
                {
                  attrs: { href: "?/import-article/" + _vm.slug },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$router.navigate("import-article/" + _vm.slug)
                    }
                  }
                },
                [_vm._v("Want to import one?")]
              )
            ])
          ])
        : _vm.status == "error"
          ? _c("div", [
              _c("h1", [_vm._v("Error")]),
              _vm._v(" "),
              _c("p", [_vm._v(_vm._s(_vm.error))])
            ])
          : _vm.status == "missing"
            ? _c(
                "div",
                [
                  _c("hub-header", { attrs: { hub: _vm.hub } }),
                  _vm._v(" "),
                  _c("h1", [_vm._v("Local")]),
                  _vm._v(" "),
                  (_vm.imported = "localOnly")
                    ? _c("p", [
                        _vm._v(
                          "\n\t\t\tThis is a local article, though you opened it as imported from "
                        ),
                        _c("b", [
                          _vm._v(_vm._s(_vm.$router.currentParams.origin))
                        ]),
                        _vm._v(". Try to "),
                        _c(
                          "a",
                          {
                            attrs: {
                              href: "?/wiki/" + _vm.slug + "/" + _vm.article
                            },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.$router.navigate(
                                  "wiki/" + _vm.slug + "/" + _vm.article
                                )
                              }
                            }
                          },
                          [_vm._v("open a local version")]
                        ),
                        _vm._v(".\n\t\t")
                      ])
                    : _vm.imported == "importedOnly"
                      ? _c(
                          "p",
                          [
                            _vm._v(
                              "\n\t\t\tThis is an imported article, though it wasn't imported from "
                            ),
                            _c("b", [
                              _vm._v(_vm._s(_vm.$router.currentParams.origin))
                            ]),
                            _vm._v(". Choose between\n\t\t\t"),
                            _vm._l(_vm.origins, function(origin) {
                              return _c("span", [
                                _c(
                                  "a",
                                  {
                                    attrs: {
                                      href:
                                        "?/imported/" +
                                        _vm.slug +
                                        "/" +
                                        _vm.toSlug(origin) +
                                        "/" +
                                        _vm.article
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        _vm.$router.navigate(
                                          "imported/" +
                                            _vm.slug +
                                            "/" +
                                            _vm.toSlug(origin) +
                                            "/" +
                                            _vm.article
                                        )
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(origin))]
                                ),
                                _vm._v(" "),
                                _c("span")
                              ])
                            }),
                            _vm._v(" origins.\n\t\t")
                          ],
                          2
                        )
                      : _vm.imported == "localAndImported"
                        ? _c(
                            "p",
                            [
                              _vm._v(
                                "\n\t\t\tThis is both a local and an imported article, though it wasn't imported from "
                              ),
                              _c("b", [
                                _vm._v(_vm._s(_vm.$router.currentParams.origin))
                              ]),
                              _vm._v(". Choose between\n\t\t\t"),
                              _vm._l(_vm.origins, function(origin) {
                                return _c("span", [
                                  _c(
                                    "a",
                                    {
                                      attrs: {
                                        href:
                                          "?/imported/" +
                                          _vm.slug +
                                          "/" +
                                          _vm.toSlug(origin) +
                                          "/" +
                                          _vm.article
                                      },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          _vm.$router.navigate(
                                            "imported/" +
                                              _vm.slug +
                                              "/" +
                                              _vm.toSlug(origin) +
                                              "/" +
                                              _vm.article
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v(_vm._s(origin))]
                                  ),
                                  _vm._v(" "),
                                  _c("span")
                                ])
                              }),
                              _vm._v(" origins or "),
                              _c(
                                "a",
                                {
                                  attrs: {
                                    href:
                                      "?/wiki/" + _vm.slug + "/" + _vm.article
                                  },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.$router.navigate(
                                        "wiki/" + _vm.slug + "/" + _vm.article
                                      )
                                    }
                                  }
                                },
                                [_vm._v("open a local version")]
                              ),
                              _vm._v(".\n\t\t")
                            ],
                            2
                          )
                        : _vm._e()
                ],
                1
              )
            : _vm.articleNode
              ? _c(
                  "div",
                  [
                    _c("hub-header", { attrs: { hub: _vm.hub } }),
                    _vm._v(" "),
                    _c("h1", [
                      _vm._v(
                        "\n\t\t\t" + _vm._s(_vm.articleNode.title) + "\n\t\t\t"
                      ),
                      _c(
                        "a",
                        {
                          staticClass: "reimport-icon",
                          attrs: { href: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.reimport($event)
                            }
                          }
                        },
                        [_vm._v("↻")]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticClass: "history-icon",
                          attrs: {
                            href:
                              "?/article-history/" +
                              _vm.slug +
                              "/" +
                              _vm.article
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.$router.navigate(
                                "article-history/" +
                                  _vm.slug +
                                  "/" +
                                  _vm.article
                              )
                            }
                          }
                        },
                        [_vm._v("☰")]
                      )
                    ]),
                    _vm._v(" "),
                    _vm.imported == "localOnly"
                      ? _c("div", { staticClass: "ambox ambox-notice" }, [
                          _c("b", [
                            _vm._v(
                              "This article has a local version you may want to look at."
                            )
                          ]),
                          _c("br"),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              attrs: {
                                href: "?/wiki/" + _vm.slug + "/" + _vm.article
                              },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.$router.navigate(
                                    "wiki/" + _vm.slug + "/" + _vm.article
                                  )
                                }
                              }
                            },
                            [_vm._v("Visit it.")]
                          )
                        ])
                      : _vm.imported == "importedOnly"
                        ? _c(
                            "div",
                            { staticClass: "ambox ambox-notice" },
                            [
                              _c("b", [
                                _vm._v(
                                  "This article has other imported version(s) you may want to look at."
                                )
                              ]),
                              _c("br"),
                              _vm._v("\n\t\t\tChoose between\n\t\t\t"),
                              _vm._l(_vm.origins, function(origin) {
                                return _c("span", [
                                  _c(
                                    "a",
                                    {
                                      attrs: {
                                        href:
                                          "?/imported/" +
                                          _vm.slug +
                                          "/" +
                                          _vm.toSlug(origin) +
                                          "/" +
                                          _vm.article
                                      },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          _vm.$router.navigate(
                                            "imported/" +
                                              _vm.slug +
                                              "/" +
                                              _vm.toSlug(origin) +
                                              "/" +
                                              _vm.article
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v(_vm._s(origin))]
                                  ),
                                  _vm._v(" "),
                                  _c("span")
                                ])
                              }),
                              _vm._v(".\n\t\t")
                            ],
                            2
                          )
                        : _vm.imported == "localAndImported"
                          ? _c(
                              "div",
                              { staticClass: "ambox ambox-notice" },
                              [
                                _c("b", [
                                  _vm._v(
                                    "This article has a local version and other imported version(s) you may want to look at."
                                  )
                                ]),
                                _c("br"),
                                _vm._v("\n\t\t\tChoose between\n\t\t\t"),
                                _vm._l(_vm.origins, function(origin) {
                                  return _c("span", [
                                    _c(
                                      "a",
                                      {
                                        attrs: {
                                          href:
                                            "?/imported/" +
                                            _vm.slug +
                                            "/" +
                                            _vm.toSlug(origin) +
                                            "/" +
                                            _vm.article
                                        },
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            _vm.$router.navigate(
                                              "imported/" +
                                                _vm.slug +
                                                "/" +
                                                _vm.toSlug(origin) +
                                                "/" +
                                                _vm.article
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v(_vm._s(origin))]
                                    ),
                                    _vm._v(" "),
                                    _c("span")
                                  ])
                                }),
                                _vm._v(" or "),
                                _c(
                                  "a",
                                  {
                                    attrs: {
                                      href:
                                        "?/wiki/" + _vm.slug + "/" + _vm.article
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        _vm.$router.navigate(
                                          "wiki/" + _vm.slug + "/" + _vm.article
                                        )
                                      }
                                    }
                                  },
                                  [_vm._v("open a local version")]
                                ),
                                _vm._v(".\n\t\t")
                              ],
                              2
                            )
                          : _vm._e(),
                    _vm._v(" "),
                    _c("render-article", {
                      attrs: {
                        text: _vm.articleNode.text,
                        slug: _vm.slug,
                        article: _vm.article,
                        imported: _vm.source,
                        title: _vm.articleNode.title
                      }
                    })
                  ],
                  1
                )
              : _c("loading")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-cf6de448", esExports)
  }
}

/***/ }),
/* 600 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_new_article_vue__ = __webpack_require__(186);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26ff5636_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_new_article_vue__ = __webpack_require__(601);
var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_new_article_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26ff5636_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_new_article_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\new-article\\new-article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26ff5636", Component.options)
  } else {
    hotAPI.reload("data-v-26ff5636", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 601 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.status == "error"
      ? _c("div", [
          _c("h1", [_vm._v("Error")]),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.error))])
        ])
      : _c(
          "div",
          [
            _vm.status == "hubLoaded"
              ? _c("hub-header", { attrs: { hub: _vm.hub } })
              : _vm._e(),
            _vm._v(" "),
            _c("h1", [_vm._v("Create a new article")]),
            _vm._v(" "),
            _c("p", [
              _c(
                "a",
                {
                  attrs: { href: "?/import-article/" + _vm.slug },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$router.navigate("import-article/" + _vm.slug)
                    }
                  }
                },
                [_vm._v("or import it.")]
              )
            ]),
            _vm._v(" "),
            _vm.isFirst
              ? _c("p", [
                  _vm._v(
                    "\n\t\t\tThis is the first article, so it will be marked as "
                  ),
                  _c("b", [_vm._v("home")]),
                  _vm._v(".\n\t\t")
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("setting", {
              ref: "title",
              attrs: { type: "text", name: "Title", description: "" },
              model: {
                value: _vm.title,
                callback: function($$v) {
                  _vm.title = $$v
                },
                expression: "title"
              }
            }),
            _vm._v(" "),
            _c("setting", {
              ref: "content",
              attrs: {
                type: "multiline",
                name: "Content",
                description: "Wikitext supported"
              },
              model: {
                value: _vm.content,
                callback: function($$v) {
                  _vm.content = $$v
                },
                expression: "content"
              }
            }),
            _vm._v(" "),
            _c("s-button", {
              attrs: { value: "Publish" },
              on: { click: _vm.publish }
            })
          ],
          1
        )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-26ff5636", esExports)
  }
}

/***/ }),
/* 602 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_import_article_vue__ = __webpack_require__(187);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_020f7ac8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_import_article_vue__ = __webpack_require__(603);
var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_import_article_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_020f7ac8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_import_article_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\import-article\\import-article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-020f7ac8", Component.options)
  } else {
    hotAPI.reload("data-v-020f7ac8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 603 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.status == "error"
      ? _c("div", [
          _c("h1", [_vm._v("Error")]),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.error))])
        ])
      : _c(
          "div",
          [
            _vm.status == "hubLoaded"
              ? _c("hub-header", { attrs: { hub: _vm.hub } })
              : _vm._e(),
            _vm._v(" "),
            _c("h1", [_vm._v("Import an article")]),
            _vm._v(" "),
            _c("p", [
              _c(
                "a",
                {
                  attrs: { href: "?/new-article/" + _vm.slug },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$router.navigate("new-article/" + _vm.slug)
                    }
                  }
                },
                [_vm._v("or create it from scratch.")]
              )
            ]),
            _vm._v(" "),
            _vm.isFirst
              ? _c("p", [
                  _vm._v(
                    "\n\t\t\tThis is the first article, so it will be marked as "
                  ),
                  _c("b", [_vm._v("home")]),
                  _vm._v(".\n\t\t")
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("setting", {
              ref: "title",
              attrs: {
                type: "text",
                name: "Title",
                description: "Leave it empty to use title from article source"
              },
              model: {
                value: _vm.title,
                callback: function($$v) {
                  _vm.title = $$v
                },
                expression: "title"
              }
            }),
            _vm._v(" "),
            _c("s-button", {
              attrs: { value: "Import from Wikipedia" },
              on: { click: _vm.importWikipedia }
            }),
            _vm._v(" "),
            _c("s-button", {
              attrs: { value: "Import from ZeroWiki" },
              on: { click: _vm.importZeroWiki }
            }),
            _vm._v(" "),
            _c("p", [_vm._v("Or")]),
            _vm._v(" "),
            _c("setting", {
              ref: "source",
              attrs: {
                type: "text",
                name: "Source",
                description:
                  "Use http[s]://{language}.wikipedia.org/wiki/{article} for Wikipedia.org, zerowiki://{article} for original ZeroWiki and zerowiki://{address}/{article} for ZeroWiki clones"
              },
              model: {
                value: _vm.source,
                callback: function($$v) {
                  _vm.source = $$v
                },
                expression: "source"
              }
            }),
            _vm._v(" "),
            _c("s-button", {
              attrs: { value: "Import" },
              on: { click: _vm.importArticle }
            })
          ],
          1
        )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-020f7ac8", esExports)
  }
}

/***/ }),
/* 604 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_article_vue__ = __webpack_require__(188);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_10e6ee3c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_edit_article_vue__ = __webpack_require__(607);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(605)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_article_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_10e6ee3c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_edit_article_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\edit-article\\edit-article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10e6ee3c", Component.options)
  } else {
    hotAPI.reload("data-v-10e6ee3c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 605 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(606);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("6a4e9a94", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10e6ee3c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./edit-article.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10e6ee3c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./edit-article.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 606 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.view-icon {\n  color: #888 !important;\n  text-decoration: none !important;\n  font-size: 24px;\n}\n.origin {\n  margin-top: -16px;\n  border-top: 1px solid #CCC;\n}\n", ""]);

// exports


/***/ }),
/* 607 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.status == "error"
        ? _c("div", [
            _c("h1", [_vm._v("Error")]),
            _vm._v(" "),
            _c("p", [_vm._v(_vm._s(_vm.error))])
          ])
        : _vm.articleNode
          ? _c(
              "div",
              [
                _c("hub-header", { attrs: { hub: _vm.hub } }),
                _vm._v(" "),
                _c("h1", [
                  _vm._v(
                    "\n\t\t\t" + _vm._s(_vm.articleNode.title) + "\n\t\t\t"
                  ),
                  _c(
                    "a",
                    {
                      staticClass: "view-icon",
                      attrs: { href: "?/wiki/" + _vm.slug + "/" + _vm.article },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.$router.navigate(
                            "wiki/" + _vm.slug + "/" + _vm.article
                          )
                        }
                      }
                    },
                    [_vm._v("👁")]
                  )
                ]),
                _vm._v(" "),
                _c("setting", {
                  ref: "content",
                  attrs: {
                    type: "multiline",
                    name: "Content",
                    description: "Wikitext supported"
                  },
                  model: {
                    value: _vm.content,
                    callback: function($$v) {
                      _vm.content = $$v
                    },
                    expression: "content"
                  }
                }),
                _vm._v(" "),
                _c("s-button", {
                  attrs: { value: "Publish" },
                  on: { click: _vm.publish }
                })
              ],
              1
            )
          : _c("loading")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-10e6ee3c", esExports)
  }
}

/***/ }),
/* 608 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_history_vue__ = __webpack_require__(189);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dbabc4c4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_history_vue__ = __webpack_require__(615);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(609)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_history_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dbabc4c4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_history_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\article-history\\article-history.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dbabc4c4", Component.options)
  } else {
    hotAPI.reload("data-v-dbabc4c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 609 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(610);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("ee28186e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dbabc4c4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article-history.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dbabc4c4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article-history.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 610 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.view-icon {\n  color: #888 !important;\n  text-decoration: none !important;\n  font-size: 24px;\n}\n.origin {\n  margin-top: -16px;\n  border-top: 1px solid #CCC;\n}\n", ""]);

// exports


/***/ }),
/* 611 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_version_vue__ = __webpack_require__(190);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d28f618e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_version_vue__ = __webpack_require__(614);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(612)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_version_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d28f618e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_version_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\article-history\\version.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d28f618e", Component.options)
  } else {
    hotAPI.reload("data-v-d28f618e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 612 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(613);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("7ab85307", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d28f618e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./version.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d28f618e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./version.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 613 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.version {\n  display: block;\n  padding: 12px 16px;\n  background-color: #EEE;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n  text-decoration: none !important;\n}\n.version:hover {\n  background-color: #DDD;\n}\n.editor, .imported {\n  color: #000;\n}\n", ""]);

// exports


/***/ }),
/* 614 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      staticClass: "version",
      attrs: {
        href:
          "?/article-version/" + _vm.slug + "/" + _vm.article + "/" + _vm.date
      },
      on: {
        click: function($event) {
          $event.preventDefault()
          _vm.$router.navigate(
            "article-version/" + _vm.slug + "/" + _vm.article + "/" + _vm.date
          )
        }
      }
    },
    [
      _c("div", { staticClass: "title" }, [
        _vm._v(_vm._s(_vm.formatDate(_vm.date)))
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "editor" }, [
        _vm._v("Editor: " + _vm._s(_vm.editor))
      ]),
      _vm._v(" "),
      _vm.imported != ""
        ? _c("div", { staticClass: "imported" }, [
            _vm._v("Imported from: " + _vm._s(_vm.imported))
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d28f618e", esExports)
  }
}

/***/ }),
/* 615 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.status == "error"
        ? _c("div", [
            _c("h1", [_vm._v("Error")]),
            _vm._v(" "),
            _c("p", [_vm._v(_vm._s(_vm.error))])
          ])
        : _vm.articleNode
          ? _c(
              "div",
              [
                _c("hub-header", { attrs: { hub: _vm.hub } }),
                _vm._v(" "),
                _c("h1", [
                  _vm._v(
                    "\n\t\t\t" + _vm._s(_vm.articleNode.title) + "\n\t\t\t"
                  ),
                  _c(
                    "a",
                    {
                      staticClass: "view-icon",
                      attrs: { href: "?/wiki/" + _vm.slug + "/" + _vm.article },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.$router.navigate(
                            "wiki/" + _vm.slug + "/" + _vm.article
                          )
                        }
                      }
                    },
                    [_vm._v("👁")]
                  )
                ]),
                _vm._v(" "),
                _vm._l(_vm.versions, function(version) {
                  return _c("version", {
                    key: version.date_updated,
                    attrs: {
                      slug: _vm.slug,
                      article: _vm.article,
                      date: version.date_updated,
                      editor: version.cert_user_id,
                      imported: version.imported
                    }
                  })
                })
              ],
              2
            )
          : _c("loading")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-dbabc4c4", esExports)
  }
}

/***/ }),
/* 616 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_version_vue__ = __webpack_require__(191);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_65cc0226_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_version_vue__ = __webpack_require__(619);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(617)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_version_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_65cc0226_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_version_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\article-version\\article-version.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65cc0226", Component.options)
  } else {
    hotAPI.reload("data-v-65cc0226", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 617 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(618);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("720096f1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-65cc0226\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article-version.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-65cc0226\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article-version.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 618 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.history-icon {\n  color: #888 !important;\n  text-decoration: none !important;\n  font-size: 24px;\n}\n.origin {\n  margin-top: -16px;\n  border-top: 1px solid #CCC;\n}\n", ""]);

// exports


/***/ }),
/* 619 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.status == "no-article"
        ? _c("div", [
            _c("h1", [
              _vm._v("No article named "),
              _c("i", [_vm._v(_vm._s(_vm.article))])
            ]),
            _vm._v(" "),
            _c("p", [
              _c(
                "a",
                {
                  attrs: { href: "?/new-article/" + _vm.slug },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$router.navigate("new-article/" + _vm.slug)
                    }
                  }
                },
                [_vm._v("Create this article")]
              ),
              _vm._v("\n\t\t\tor\n\t\t\t"),
              _c(
                "a",
                {
                  attrs: { href: "?/import-article/" + _vm.slug },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$router.navigate("import-article/" + _vm.slug)
                    }
                  }
                },
                [_vm._v("import it")]
              ),
              _vm._v(".\n\t\t")
            ])
          ])
        : _vm.status == "no-version"
          ? _c("div", [
              _c("h1", [
                _vm._v("No version "),
                _c("i", [_vm._v(_vm._s(_vm.version))]),
                _vm._v(" of article "),
                _c("i", [_vm._v(_vm._s(_vm.article))])
              ]),
              _vm._v(" "),
              _c("p", [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "?/edit-article/" + _vm.slug + "/" + _vm.article
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.$router.navigate(
                          "edit-article/" + _vm.slug + "/" + _vm.article
                        )
                      }
                    }
                  },
                  [_vm._v("Want to update this article")]
                ),
                _vm._v(" or "),
                _c(
                  "a",
                  {
                    attrs: { href: "?/wiki/" + _vm.slug + "/" + _vm.article },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.$router.navigate(
                          "wiki/" + _vm.slug + "/" + _vm.article
                        )
                      }
                    }
                  },
                  [_vm._v("look at to latest version")]
                ),
                _vm._v("?\n\t\t")
              ])
            ])
          : _vm.status == "error"
            ? _c("div", [
                _c("h1", [_vm._v("Error")]),
                _vm._v(" "),
                _c("p", [_vm._v(_vm._s(_vm.error))])
              ])
            : _vm.articleNode
              ? _c(
                  "div",
                  [
                    _c("hub-header", { attrs: { hub: _vm.hub } }),
                    _vm._v(" "),
                    _c("h1", [
                      _vm._v(
                        "\n\t\t\t" + _vm._s(_vm.articleNode.title) + "\n\t\t\t"
                      ),
                      _c(
                        "a",
                        {
                          staticClass: "history-icon",
                          attrs: {
                            href:
                              "?/article-history/" +
                              _vm.slug +
                              "/" +
                              _vm.article
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.$router.navigate(
                                "article-history/" +
                                  _vm.slug +
                                  "/" +
                                  _vm.article
                              )
                            }
                          }
                        },
                        [_vm._v("☰")]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "ambox ambox-notice" }, [
                      _c("b", [_vm._v("You are viewing an outdated version.")]),
                      _c("br"),
                      _vm._v("\n\t\t\tFor the latest version, "),
                      _c(
                        "a",
                        {
                          attrs: {
                            href: "?wiki/" + _vm.slug + "/" + _vm.article
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.$router.navigate(
                                "wiki/" + _vm.slug + "/" + _vm.article
                              )
                            }
                          }
                        },
                        [_vm._v("look here")]
                      ),
                      _vm._v(".\n\t\t")
                    ]),
                    _vm._v(" "),
                    _c("render-article", {
                      attrs: {
                        text: _vm.articleNode.text,
                        slug: _vm.slug,
                        article: _vm.article,
                        imported: _vm.articleNode.imported,
                        title: _vm.articleNode.title
                      }
                    })
                  ],
                  1
                )
              : _c("loading")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-65cc0226", esExports)
  }
}

/***/ }),
/* 620 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_index_vue__ = __webpack_require__(192);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_31d7d85a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_index_vue__ = __webpack_require__(627);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(621)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_31d7d85a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\article-index\\article-index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31d7d85a", Component.options)
  } else {
    hotAPI.reload("data-v-31d7d85a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 621 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(622);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("e622c752", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31d7d85a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article-index.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31d7d85a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article-index.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 622 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 623 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_vue__ = __webpack_require__(193);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d3efb056_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_vue__ = __webpack_require__(626);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(624)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_article_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d3efb056_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_article_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\article-index\\article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d3efb056", Component.options)
  } else {
    hotAPI.reload("data-v-d3efb056", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 624 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(625);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("0ea88fe0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d3efb056\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d3efb056\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./article.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 625 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.article {\n  display: block;\n  padding: 12px 16px;\n  background-color: #EEE;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n  text-decoration: none !important;\n}\n.article:hover {\n  background-color: #DDD;\n}\n.editor {\n  color: #000;\n}\n", ""]);

// exports


/***/ }),
/* 626 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      staticClass: "article",
      attrs: { href: "?/wiki/" + _vm.slug + "/" + _vm.article },
      on: {
        click: function($event) {
          $event.preventDefault()
          _vm.$router.navigate("wiki/" + _vm.slug + "/" + _vm.article)
        }
      }
    },
    [
      _c("div", { staticClass: "title" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c("div", { staticClass: "editor" }, [
        _vm._v("Last edited on " + _vm._s(_vm.formatDate(_vm.date)))
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d3efb056", esExports)
  }
}

/***/ }),
/* 627 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.status == "error"
        ? _c("div", [
            _c("h1", [_vm._v("Error")]),
            _vm._v(" "),
            _c("p", [_vm._v(_vm._s(_vm.error))])
          ])
        : _vm.status == "ready"
          ? _c(
              "div",
              [
                _c("hub-header", { attrs: { hub: _vm.hub } }),
                _vm._v(" "),
                _c("h1", [_vm._v("Article index")]),
                _vm._v(" "),
                _vm._l(_vm.articles, function(article) {
                  return _c("article-item", {
                    key: article.slug,
                    attrs: {
                      slug: _vm.slug,
                      article: article.slug,
                      title: article.title,
                      date: article.date_updated
                    }
                  })
                })
              ],
              2
            )
          : _c("loading")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-31d7d85a", esExports)
  }
}

/***/ }),
/* 628 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_settings_js__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_settings_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_settings_js__);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	name: "settings",
	data() {
		return {
			ready: false,

			hideUnknownTemplate: false
		};
	},
	async mounted() {
		const settings = await __WEBPACK_IMPORTED_MODULE_0__common_settings_js__["load"]();
		this.hideUnknownTemplate = settings.hideUnknownTemplate;

		this.$nextTick(() => {
			this.ready = true;
		});
	},
	watch: {
		hideUnknownTemplate() {
			this.save();
		}
	},
	methods: {
		save() {
			if (!this.ready) {
				return;
			}

			try {
				__WEBPACK_IMPORTED_MODULE_0__common_settings_js__["save"]({
					hideUnknownTemplate: this.hideUnknownTemplate
				});
			} catch (e) {
				this.$zeroPage.error(e.message);
			}
		}
	}
});

/***/ }),
/* 629 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_settings_vue__ = __webpack_require__(628);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_333c70bc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_settings_vue__ = __webpack_require__(630);
var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_settings_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_333c70bc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_settings_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "router_pages\\settings\\settings.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-333c70bc", Component.options)
  } else {
    hotAPI.reload("data-v-333c70bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 630 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("h1", [_vm._v("My settings")]),
      _vm._v(" "),
      _c("setting", {
        attrs: {
          type: "checkbox",
          name: 'Don\'t show "Unknown template" messages',
          description: "",
          disabled: !_vm.ready
        },
        model: {
          value: _vm.hideUnknownTemplate,
          callback: function($$v) {
            _vm.hideUnknownTemplate = $$v
          },
          expression: "hideUnknownTemplate"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-333c70bc", esExports)
  }
}

/***/ }),
/* 631 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "checkbox",
	props: ["disabled", "value"],
	data() {
		return {
			value: false,
			disabled: false
		};
	},

	methods: {
		click() {
			if (this.disabled) {
				return;
			}

			this.value = !this.value;
			this.$emit("input", this.value);
		}
	}
});

/***/ }),
/* 632 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(631);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b542f504_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(635);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(636)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b542f504"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b542f504_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue_components\\setting\\checkbox.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b542f504", Component.options)
  } else {
    hotAPI.reload("data-v-b542f504", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 633 */,
/* 634 */,
/* 635 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: "checkbox" + (this.disabled ? " disabled" : ""),
      on: { click: _vm.click }
    },
    [_vm.value ? _c("span", [_vm._v("✔")]) : _vm._e()]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b542f504", esExports)
  }
}

/***/ }),
/* 636 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(637);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(17)("e80372ae", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b542f504\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./checkbox.sass", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b542f504\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!./checkbox.sass");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 637 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "\n.checkbox[data-v-b542f504] {\n  position: relative;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #DDD;\n  font-family: \"Verdana\", \"Arial\", sans-serif;\n  font-size: 16px;\n}\n.checkbox[data-v-b542f504]:not(.disabled):hover {\n  background-color: #EEE;\n}\n.checkbox[data-v-b542f504]:not(.disabled):active {\n  background-color: #CCC;\n}\n.disabled[data-v-b542f504] {\n  background-color: #888;\n  border-color: #888;\n}\n.checkbox span[data-v-b542f504] {\n  position: absolute;\n  top: -4px;\n  left: 2px;\n  display: inline-block;\n  user-select: none;\n}\n", ""]);

// exports


/***/ }),
/* 638 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.save = exports.load = undefined;

var load = exports.load = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var auth, settings, data;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _route.zeroPage.getSiteInfo();

					case 2:
						_context.next = 4;
						return _route.zeroAuth.requestAuth();

					case 4:
						auth = _context.sent;
						settings = void 0;
						_context.prev = 6;
						_context.next = 9;
						return _route.zeroFS.readFile("data/users/" + auth.address + "/data.json");

					case 9:
						data = _context.sent;

						data = JSON.parse(data);
						settings = data.settings || {};
						_context.next = 17;
						break;

					case 14:
						_context.prev = 14;
						_context.t0 = _context["catch"](6);

						settings = {};

					case 17:
						return _context.abrupt("return", Object.assign({
							hideUnknownTemplate: false
						}, settings));

					case 18:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[6, 14]]);
	}));

	return function load() {
		return _ref.apply(this, arguments);
	};
}();

var save = exports.save = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(settings) {
		var auth, data;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return _route.zeroAuth.requestAuth();

					case 2:
						auth = _context2.sent;
						data = void 0;
						_context2.prev = 4;
						_context2.next = 7;
						return _route.zeroFS.readFile("data/users/" + auth.address + "/data.json");

					case 7:
						data = _context2.sent;

						data = JSON.parse(data);
						_context2.next = 14;
						break;

					case 11:
						_context2.prev = 11;
						_context2.t0 = _context2["catch"](4);

						data = {};

					case 14:

						data.settings = settings;
						data = JSON.stringify(data, null, 4);
						_context2.next = 18;
						return _route.zeroFS.writeFile("data/users/" + auth.address + "/data.json", data);

					case 18:
						_context2.next = 20;
						return _route.zeroPage.publish("data/users/" + auth.address + "/content.json");

					case 20:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this, [[4, 11]]);
	}));

	return function save(_x) {
		return _ref2.apply(this, arguments);
	};
}();

var _route = __webpack_require__(61);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;

/***/ })
]),[194]);