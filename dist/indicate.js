(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Indicate", [], factory);
	else if(typeof exports === 'object')
		exports["Indicate"] = factory();
	else
		root["Indicate"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Indicate.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Indicate.js":
/*!*********************!*\
  !*** ./Indicate.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Options = __webpack_require__(/*! ./src/Options */ \"./src/Options.js\");\n\nvar _Options2 = _interopRequireDefault(_Options);\n\nvar _Block = __webpack_require__(/*! ./src/Block */ \"./src/Block.js\");\n\nvar _Block2 = _interopRequireDefault(_Block);\n\nvar _IFrame = __webpack_require__(/*! ./src/IFrame */ \"./src/IFrame.js\");\n\nvar _IFrame2 = _interopRequireDefault(_IFrame);\n\nvar _IFrameCrossOrigin = __webpack_require__(/*! ./src/IFrameCrossOrigin */ \"./src/IFrameCrossOrigin.js\");\n\nvar _IFrameCrossOrigin2 = _interopRequireDefault(_IFrameCrossOrigin);\n\nvar _Table = __webpack_require__(/*! ./src/Table */ \"./src/Table.js\");\n\nvar _Table2 = _interopRequireDefault(_Table);\n\nvar _isCrossOriginIframe = __webpack_require__(/*! ./src/helpers/is-cross-origin-iframe */ \"./src/helpers/is-cross-origin-iframe.js\");\n\nvar _isCrossOriginIframe2 = _interopRequireDefault(_isCrossOriginIframe);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * indicate - Scroll Indicator Plugin\n *\n * Adds horizontal fade effect to block elements, tables and iframes.\n * Intended to let the user know that there is more content so see than\n * currently fits into the visible part.\n *\n * @author Matthias Giger <matthias.giger@namics.com>\n */\nvar Indicate = function () {\n  function Indicate(targetElements, options) {\n    _classCallCheck(this, Indicate);\n\n    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {\n      options = {};\n    }\n\n    this.targetElements = targetElements;\n    this.instances = [];\n    this.options = new _Options2.default(options);\n\n    this.init();\n  }\n\n  /**\n   * Initializes the instances depending on whether it's a single element or\n   * an array of nodes.\n   */\n\n\n  _createClass(Indicate, [{\n    key: 'init',\n    value: function init() {\n      var _this = this;\n\n      var elements = this.targetElements;\n\n      if (elements) {\n        if (elements.length) {\n          [].map.call(elements, function (element) {\n            return _this.createInstanceForElement(element);\n          });\n        } else {\n          this.createInstanceForElement(elements);\n        }\n      }\n    }\n  }, {\n    key: 'update',\n    value: function update(newOptions) {\n      var _this2 = this;\n\n      this.options.update(newOptions);\n      this.instances.forEach(function (instance) {\n        return instance.update(_this2.options);\n      });\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.instances.forEach(function (instance) {\n        return instance.destroy();\n      });\n    }\n\n    /**\n     * Creates an instance of the appropriate class depending on the elements tag.\n     */\n\n  }, {\n    key: 'createInstanceForElement',\n    value: function createInstanceForElement(element) {\n      var tagName = String(element.tagName).toLowerCase();\n\n      switch (tagName) {\n        case 'iframe':\n          this.instances.push(this.getIframeInstance(element));\n          break;\n        case 'table':\n          this.instances.push(new _Table2.default(element, this.options));\n          break;\n        default:\n          this.instances.push(new _Block2.default(element, this.options));\n      }\n    }\n\n    /**\n     * Checks if the iframe is same or cross origin and returns the appropriate\n     * instance.\n     **/\n\n  }, {\n    key: 'getIframeInstance',\n    value: function getIframeInstance(element) {\n      if ((0, _isCrossOriginIframe2.default)(element)) {\n        return new _IFrameCrossOrigin2.default(element, this.options);\n      }\n\n      return new _IFrame2.default(element, this.options);\n    }\n  }]);\n\n  return Indicate;\n}();\n\nexports.default = Indicate;\n\n//# sourceURL=webpack://Indicate/./Indicate.js?");

/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Code refactored from Mozilla Developer Network:\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign\n */\n\n\n\nfunction assign(target, firstSource) {\n  if (target === undefined || target === null) {\n    throw new TypeError('Cannot convert first argument to object');\n  }\n\n  var to = Object(target);\n  for (var i = 1; i < arguments.length; i++) {\n    var nextSource = arguments[i];\n    if (nextSource === undefined || nextSource === null) {\n      continue;\n    }\n\n    var keysArray = Object.keys(Object(nextSource));\n    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {\n      var nextKey = keysArray[nextIndex];\n      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);\n      if (desc !== undefined && desc.enumerable) {\n        to[nextKey] = nextSource[nextKey];\n      }\n    }\n  }\n  return to;\n}\n\nfunction polyfill() {\n  if (!Object.assign) {\n    Object.defineProperty(Object, 'assign', {\n      enumerable: false,\n      configurable: true,\n      writable: true,\n      value: assign\n    });\n  }\n}\n\nmodule.exports = {\n  assign: assign,\n  polyfill: polyfill\n};\n\n//# sourceURL=webpack://Indicate/./node_modules/es6-object-assign/index.js?");

/***/ }),

/***/ "./src/Block.js":
/*!**********************!*\
  !*** ./src/Block.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _Common2 = __webpack_require__(/*! ./Common */ \"./src/Common.js\");\n\nvar _Common3 = _interopRequireDefault(_Common2);\n\nvar _getSize = __webpack_require__(/*! ./helpers/getSize */ \"./src/helpers/getSize.js\");\n\nvar _getSize2 = _interopRequireDefault(_getSize);\n\n__webpack_require__(/*! ./styles/block.scss */ \"./src/styles/block.scss\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Block = function (_Common) {\n  _inherits(Block, _Common);\n\n  function Block(element, options) {\n    _classCallCheck(this, Block);\n\n    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, element, options));\n\n    _this.init();\n    return _this;\n  }\n\n  _createClass(Block, [{\n    key: 'shouldInitHorizontal',\n    value: function shouldInitHorizontal() {\n      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);\n\n      this.elementWidth = scrollElementSize.width;\n\n      this.elementFullWidth = this.element.scrollWidth;\n\n      if (this.options.horizontal) {\n        return this.elementFullWidth > this.elementWidth;\n      }\n    }\n  }, {\n    key: 'shouldInitVertical',\n    value: function shouldInitVertical() {\n      var scrollElementSize = (0, _getSize2.default)(this.element);\n\n      this.elementHeight = scrollElementSize.height;\n\n      this.elementFullHeight = this.element.scrollHeight;\n\n      if (this.options.vertical) {\n        return this.elementFullHeight > this.elementHeight;\n      }\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.scrollableElement.removeEventListener('scroll', this.scrollFunction);\n      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'destroy', this).call(this);\n    }\n  }, {\n    key: 'makeElementResponsive',\n    value: function makeElementResponsive() {\n      this.scrollableElement = this.element;\n      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'makeElementResponsive', this).call(this);\n    }\n  }, {\n    key: 'registerListeners',\n    value: function registerListeners() {\n      this.scrollableElement.addEventListener('scroll', this.scrollFunction);\n      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'registerListeners', this).call(this);\n    }\n\n    /**\n     * Scroll left of right after a click.\n     **/\n\n  }, {\n    key: 'clickHorizontal',\n    value: function clickHorizontal(direction) {\n      var scrollLeft = this.scrollableElement.scrollLeft;\n      var containerLength = this.elementVisibleWidth;\n\n      var scrollLength = containerLength / this.options.scrollDenominator;\n\n      if (direction === 'right') {\n        this.scrollableElement.scrollLeft = scrollLeft + scrollLength;\n      } else {\n        this.scrollableElement.scrollLeft = scrollLeft - scrollLength;\n      }\n    }\n\n    /**\n     * Scroll to top or bottom after a click.\n     **/\n\n  }, {\n    key: 'clickVertical',\n    value: function clickVertical(direction) {\n      var scrollTop = this.element.scrollTop;\n      var containerLength = this.elementVisibleHeight;\n\n      var scrollLength = containerLength / this.options.scrollDenominator;\n\n      if (direction === 'bottom') {\n        this.element.scrollTop = scrollTop + scrollLength;\n      } else {\n        this.element.scrollTop = scrollTop - scrollLength;\n      }\n    }\n\n    /**\n     * Adapts the visibility of the horizontal elements after a scroll.\n     **/\n\n  }, {\n    key: 'scrollHorizontal',\n    value: function scrollHorizontal() {\n      var scrollLeft = this.scrollableElement.scrollLeft;\n      var atStart = scrollLeft < this.options.fadeOffset;\n      var atEnd = this.elementVisibleWidth + scrollLeft + this.options.fadeOffset > this.elementFullWidth;\n\n      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'scrollHorizontal', this).call(this, atStart, atEnd);\n    }\n\n    /**\n     * Adapts the visibility of the vertical elements after a scroll.\n     **/\n\n  }, {\n    key: 'scrollVertical',\n    value: function scrollVertical() {\n      var scrollTop = this.scrollableElement.scrollTop;\n      var atStart = scrollTop < this.options.fadeOffset;\n      var atEnd = this.elementVisibleHeight + scrollTop + this.options.fadeOffset > this.elementFullHeight;\n\n      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'scrollVertical', this).call(this, atStart, atEnd);\n    }\n\n    /**\n     * On page resize we need to adapt the container measurements.\n     **/\n\n  }, {\n    key: 'resize',\n    value: function resize() {\n      var scrollElementBounds = this.scrollableElement.getBoundingClientRect();\n\n      this.elementFullWidth = Math.max(scrollElementBounds.width, this.scrollableElement.scrollWidth);\n      this.elementFullHeight = Math.max(scrollElementBounds.height, this.scrollableElement.scrollHeight);\n\n      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'resize', this).call(this);\n    }\n  }]);\n\n  return Block;\n}(_Common3.default);\n\nexports.default = Block;\n\n//# sourceURL=webpack://Indicate/./src/Block.js?");

/***/ }),

/***/ "./src/Common.js":
/*!***********************!*\
  !*** ./src/Common.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _addClass = __webpack_require__(/*! ./helpers/addClass */ \"./src/helpers/addClass.js\");\n\nvar _addClass2 = _interopRequireDefault(_addClass);\n\nvar _removeClass = __webpack_require__(/*! ./helpers/removeClass */ \"./src/helpers/removeClass.js\");\n\nvar _removeClass2 = _interopRequireDefault(_removeClass);\n\nvar _getOffset = __webpack_require__(/*! ./helpers/getOffset */ \"./src/helpers/getOffset.js\");\n\nvar _getOffset2 = _interopRequireDefault(_getOffset);\n\nvar _getSize = __webpack_require__(/*! ./helpers/getSize */ \"./src/helpers/getSize.js\");\n\nvar _getSize2 = _interopRequireDefault(_getSize);\n\nvar _classNames = __webpack_require__(/*! ./constants/classNames */ \"./src/constants/classNames.js\");\n\nvar _classNames2 = _interopRequireDefault(_classNames);\n\n__webpack_require__(/*! ./styles/common.scss */ \"./src/styles/common.scss\");\n\n__webpack_require__(/*! ./styles/fades.scss */ \"./src/styles/fades.scss\");\n\n__webpack_require__(/*! ./styles/arrows.scss */ \"./src/styles/arrows.scss\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Common = function () {\n  function Common(element, options) {\n    var _this = this;\n\n    _classCallCheck(this, Common);\n\n    this.element = element;\n    this.options = options;\n    this.initFunction = function () {\n      return _this.init();\n    };\n    this.resizeFunction = function () {\n      return _this.resize();\n    };\n    this.scrollFunction = function () {\n      return _this.scroll();\n    };\n  }\n\n  /**\n   * To be called from descendants, once ready.\n   **/\n\n\n  _createClass(Common, [{\n    key: 'init',\n    value: function init() {\n      this.makeElementResponsive();\n\n      var shouldInitHorizontal = this.shouldInitHorizontal();\n      var shouldInitVertical = this.shouldInitVertical();\n\n      if (this.options.horizontal && !shouldInitHorizontal || this.options.vertical && !shouldInitVertical) {\n        if (!this.initEventAdded) {\n          this.initEventAdded = true;\n          window.addEventListener('resize', this.initFunction);\n        }\n      }\n\n      if (this.options.horizontal && this.initHorizontal || this.options.vertical && this.initVertical) {\n        window.removeEventListener('resize', this.initFunction);\n      }\n\n      if (this.options.horizontal && shouldInitHorizontal && !this.initHorizontal || this.options.vertical && shouldInitVertical && !this.initVertical) {\n        this.create();\n        this.resize();\n      }\n    }\n\n    /**\n     * Creates an instance.\n     **/\n\n  }, {\n    key: 'create',\n    value: function create() {\n      this.element.className += ' ' + _classNames2.default.elementClass;\n      this.setDirections();\n      this.insertFadeElements();\n      this.insertArrows();\n      this.registerListeners();\n      this.hideInitial();\n\n      this.hook('create');\n    }\n\n    /**\n     * Updates an exising instance when new options are received.\n     **/\n\n  }, {\n    key: 'update',\n    value: function update(options) {\n      this.options = options;\n      this.setDirections();\n\n      this.hook('update');\n\n      this.resize();\n    }\n\n    /**\n     * Cleans up the instance.\n     **/\n\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      window.removeEventListener('resize', this.resizeFunction);\n      window.removeEventListener('resize', this.initFunction);\n    }\n\n    /**\n     * For regular elements no wrapper is needed.\n     **/\n\n  }, {\n    key: 'makeElementResponsive',\n    value: function makeElementResponsive() {\n      this.parent = this.element.parentElement;\n    }\n\n    /**\n     * Register the scorll, resize and arrow click listeners.\n     **/\n\n  }, {\n    key: 'registerListeners',\n    value: function registerListeners() {\n      var _this2 = this;\n\n      window.addEventListener('resize', this.resizeFunction);\n\n      this.directions.map(function (direction) {\n        var element = _this2.arrows ? _this2.arrows[direction] : _this2.fades[direction];\n        // Note that listeners on hidden elements will not be working.\n        element.addEventListener('click', function (event) {\n          return _this2.handleClick(event);\n        });\n      });\n    }\n\n    /**\n     * Adapts the scroll position after a click on a direction (arrow/fade) has\n     * happened.\n     **/\n\n  }, {\n    key: 'handleClick',\n    value: function handleClick(event) {\n      var direction = event.target.className.match(/[\\w]*($|\\s)/)[0].trim();\n\n      if (direction === 'left' || direction === 'right') {\n        return this.clickHorizontal(direction);\n      }\n\n      if (direction === 'top' || direction === 'bottom') {\n        return this.clickVertical(direction);\n      }\n    }\n\n    /**\n     * Adapt elements after a scroll.\n     **/\n\n  }, {\n    key: 'scroll',\n    value: function scroll() {\n      if (this.options.horizontal && this.fades.left) {\n        this.scrollHorizontal();\n      }\n\n      if (this.options.vertical && this.fades.top) {\n        this.scrollVertical();\n      }\n    }\n\n    /**\n     * Adapts the visibility of the horizontal elements after a scroll.\n     **/\n\n  }, {\n    key: 'scrollHorizontal',\n    value: function scrollHorizontal(atStart, atEnd) {\n      if (atStart) {\n        this.hide('left');\n      } else {\n        this.show('left');\n      }\n\n      if (atEnd) {\n        this.hide('right');\n      } else {\n        this.show('right');\n      }\n    }\n\n    /**\n     * Adapts the visibility of the vertical elements after a scroll.\n     **/\n\n  }, {\n    key: 'scrollVertical',\n    value: function scrollVertical(atStart, atEnd) {\n      if (atEnd) {\n        this.hide('bottom');\n      } else {\n        this.show('bottom');\n      }\n\n      if (atStart) {\n        this.hide('top');\n      } else {\n        this.show('top');\n      }\n    }\n\n    /**\n     * On page resize we need to adapt the container measurements.\n     **/\n\n  }, {\n    key: 'resize',\n    value: function resize() {\n      var _this3 = this;\n\n      var scrollElementBounds = this.scrollableElement.getBoundingClientRect();\n      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);\n\n      // Probably unneeded check if needed for browser compatibility\n      this.elementVisibleWidth = Math.max(this.scrollableElement.clientWidth, scrollElementBounds.width);\n      this.elementVisibleHeight = Math.max(this.scrollableElement.clientHeight, scrollElementBounds.height);\n\n      this.elementWidth = scrollElementSize.width;\n      this.elementHeight = scrollElementSize.height;\n\n      window.requestAnimationFrame(function () {\n        return _this3.updateElementPositions();\n      });\n\n      this.scroll();\n    }\n\n    /**\n     * Hides the fades and arrows if they're not yet hidden.\n     **/\n\n  }, {\n    key: 'hide',\n    value: function hide(direction) {\n      var hidePropertyName = 'is' + direction + 'Hidden';\n\n      if (!this[hidePropertyName]) {\n        this[hidePropertyName] = true;\n        (0, _addClass2.default)(this.fades[direction], 'hide');\n        if (this.arrows) {\n          (0, _addClass2.default)(this.arrows[direction], 'hide');\n        }\n      }\n    }\n\n    /**\n     * Top and left should be hidden in every case. Since this is faster than\n     * resize and scroll we hide them immediately.\n     **/\n\n  }, {\n    key: 'hideInitial',\n    value: function hideInitial() {\n      if (this.fades.top) {\n        this.hide('top');\n      }\n      if (this.fades.left) {\n        this.hide('left');\n      }\n    }\n\n    /**\n     * Shows the fades and arrows if they're hidden.\n     **/\n\n  }, {\n    key: 'show',\n    value: function show(direction) {\n      var hidePropertyName = 'is' + direction + 'Hidden';\n\n      if (this[hidePropertyName]) {\n        this[hidePropertyName] = false;\n        (0, _removeClass2.default)(this.fades[direction], 'hide');\n        if (this.arrows) {\n          (0, _removeClass2.default)(this.arrows[direction], 'hide');\n        }\n      }\n    }\n\n    /**\n     * Inserts the fade elements for all the directions provided.\n     **/\n\n  }, {\n    key: 'insertFadeElements',\n    value: function insertFadeElements() {\n      var _this4 = this;\n\n      this.fades = {};\n\n      this.directions.map(function (direction, index) {\n        _this4.fades[direction] = document.createElement('div');\n        _this4.fades[direction].className = _classNames2.default['fade-' + direction];\n        _this4.parent.appendChild(_this4.fades[direction]);\n      });\n    }\n\n    /**\n     * Inserts the arrows for all the directions provided.\n     **/\n\n  }, {\n    key: 'insertArrows',\n    value: function insertArrows() {\n      var _this5 = this;\n\n      if (!this.options.arrows) {\n        return;\n      }\n\n      this.arrows = {};\n\n      this.directions.map(function (direction) {\n        _this5.arrows[direction] = document.createElement('div');\n        _this5.arrows[direction].className = _classNames2.default['arrow-' + direction];\n        _this5.parent.appendChild(_this5.arrows[direction]);\n      });\n    }\n\n    /**\n     * Updates the fade and arrow element positions. This is only needed on\n     * create and if the position or size of the container changes. Not on scroll.\n     **/\n\n  }, {\n    key: 'updateElementPositions',\n    value: function updateElementPositions() {\n      var elementOffset = (0, _getOffset2.default)(this.scrollableElement);\n\n      if (this.options.horizontal && this.fades.left) {\n        this.setElementPositionHorizontal(this.fades.left, elementOffset, false);\n        this.setElementPositionHorizontal(this.fades.right, elementOffset, true);\n\n        if (this.arrows) {\n          this.setElementPositionHorizontal(this.arrows.left, elementOffset, false);\n          this.setElementPositionHorizontal(this.arrows.right, elementOffset, true);\n        }\n      }\n\n      if (this.options.vertical && this.fades.top) {\n        this.setElementPositionVertical(this.fades.top, elementOffset, false);\n        this.setElementPositionVertical(this.fades.bottom, elementOffset, true);\n\n        if (this.arrows) {\n          this.setElementPositionVertical(this.arrows.top, elementOffset, false);\n          this.setElementPositionVertical(this.arrows.bottom, elementOffset, true);\n        }\n      }\n    }\n  }, {\n    key: 'setElementPositionHorizontal',\n    value: function setElementPositionHorizontal(element, elementOffset, includeOffset) {\n      var offset = includeOffset ? this.elementWidth + 'px - ' + this.options.fadeWidth : '0px';\n\n      element.style.left = 'calc(' + elementOffset.left + 'px + ' + offset + ')';\n      element.style.top = elementOffset.top + 'px';\n      element.style.height = this.elementHeight + 'px';\n    }\n  }, {\n    key: 'setElementPositionVertical',\n    value: function setElementPositionVertical(element, elementOffset, includeOffset) {\n      var offset = includeOffset ? this.elementHeight + 'px - ' + this.options.fadeWidth : '0px';\n\n      element.style.left = elementOffset.left + 'px';\n      element.style.top = 'calc(' + elementOffset.top + 'px + ' + offset + ')';\n      element.style.width = this.elementWidth + 'px';\n    }\n\n    /**\n     * Add the directions (top, right, bottom, left) which match the options.\n     **/\n\n  }, {\n    key: 'setDirections',\n    value: function setDirections() {\n      this.directions = [];\n\n      if (this.options.horizontal && this.shouldInitHorizontal()) {\n        this.initHorizontal = true;\n        this.directions.push('left', 'right');\n      }\n\n      if (this.options.vertical && this.shouldInitVertical()) {\n        this.initVertical = true;\n        this.directions.push('top', 'bottom');\n      }\n    }\n\n    /**\n     * Calls the feature hooks for the supplied lifecycle method.\n     **/\n\n  }, {\n    key: 'hook',\n    value: function hook(method) {\n      var _this6 = this;\n\n      this.options.features.forEach(function (feature) {\n        return feature[method] ? feature[method](_this6) : 0;\n      });\n    }\n  }]);\n\n  return Common;\n}();\n\nexports.default = Common;\n\n//# sourceURL=webpack://Indicate/./src/Common.js?");

/***/ }),

/***/ "./src/IFrame.js":
/*!***********************!*\
  !*** ./src/IFrame.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _Common2 = __webpack_require__(/*! ./Common */ \"./src/Common.js\");\n\nvar _Common3 = _interopRequireDefault(_Common2);\n\nvar _getSize = __webpack_require__(/*! ./helpers/getSize */ \"./src/helpers/getSize.js\");\n\nvar _getSize2 = _interopRequireDefault(_getSize);\n\nvar _getIframeScrollPosition = __webpack_require__(/*! ./helpers/get-iframe-scroll-position */ \"./src/helpers/get-iframe-scroll-position.js\");\n\nvar _getIframeScrollPosition2 = _interopRequireDefault(_getIframeScrollPosition);\n\nvar _getIframeContentDocument = __webpack_require__(/*! ./helpers/get-iframe-content-document */ \"./src/helpers/get-iframe-content-document.js\");\n\nvar _getIframeContentDocument2 = _interopRequireDefault(_getIframeContentDocument);\n\n__webpack_require__(/*! ./styles/iframe.scss */ \"./src/styles/iframe.scss\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar IFrame = function (_Common) {\n  _inherits(IFrame, _Common);\n\n  function IFrame(element, options) {\n    _classCallCheck(this, IFrame);\n\n    var _this = _possibleConstructorReturn(this, (IFrame.__proto__ || Object.getPrototypeOf(IFrame)).call(this, element, options));\n\n    _this.connectIframe();\n    return _this;\n  }\n\n  _createClass(IFrame, [{\n    key: 'connectIframe',\n    value: function connectIframe() {\n      this.scrollableElement = this.element;\n      this.checkIfIframeContentsAvailable();\n    }\n  }, {\n    key: 'shouldInitHorizontal',\n    value: function shouldInitHorizontal() {\n      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);\n\n      this.elementWidth = scrollElementSize.width;\n      this.elementFullWidth = this.contentDocument.body.scrollWidth;\n\n      if (this.options.horizontal) {\n        return this.elementFullWidth > this.elementWidth;\n      }\n    }\n  }, {\n    key: 'shouldInitVertical',\n    value: function shouldInitVertical() {\n      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);\n\n      this.elementWidth = scrollElementSize.height;\n      this.elementFullHeight = this.contentDocument.body.scrollHeight;\n\n      if (this.options.vertical) {\n        return this.elementFullHeight > this.elementHeight;\n      }\n    }\n\n    /**\n     * In order to get the actual parameters of the iframe contents we have to\n     * check if it has already finished loading.\n     **/\n\n  }, {\n    key: 'checkIfIframeContentsAvailable',\n    value: function checkIfIframeContentsAvailable() {\n      this.contentDocument = (0, _getIframeContentDocument2.default)(this);\n\n      if (!this.contentDocument.readyState !== 'complete') {\n        return this.delayUntilContentsAreLoaded();\n      }\n\n      this.setIframeReferences();\n    }\n\n    /**\n     * Delays execution until the contentLoaded listener is called.\n     **/\n\n  }, {\n    key: 'delayUntilContentsAreLoaded',\n    value: function delayUntilContentsAreLoaded(callback) {\n      var _this2 = this;\n\n      if (this.contentDocument.readyState !== 'complete') {\n        return setTimeout(function () {\n          return _this2.delayUntilContentsAreLoaded();\n        }, 300);\n      }\n\n      this.setIframeReferences();\n    }\n\n    /**\n     * Sets a reference to the iframe content element, once it's loaded.\n     **/\n\n  }, {\n    key: 'setIframeReferences',\n    value: function setIframeReferences() {\n      this.contentDocument = (0, _getIframeContentDocument2.default)(this);\n      this.init();\n    }\n  }, {\n    key: 'registerListeners',\n    value: function registerListeners() {\n      this.contentDocument.addEventListener('scroll', this.scrollFunction);\n      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'registerListeners', this).call(this);\n    }\n  }, {\n    key: 'resize',\n    value: function resize() {\n      this.elementFullWidth = this.contentDocument.body.scrollWidth;\n      this.elementFullHeight = this.contentDocument.body.scrollHeight;\n\n      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'resize', this).call(this);\n    }\n  }, {\n    key: 'scrollHorizontal',\n    value: function scrollHorizontal() {\n      var scrollLeft = (0, _getIframeScrollPosition2.default)(this.contentDocument, 'scrollLeft');\n      var atStart = scrollLeft < this.options.fadeOffset;\n      var atEnd = this.elementVisibleWidth + scrollLeft + this.options.fadeOffset > this.elementFullWidth;\n\n      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'scrollHorizontal', this).call(this, atStart, atEnd);\n    }\n  }, {\n    key: 'scrollVertical',\n    value: function scrollVertical() {\n      var scrollTop = (0, _getIframeScrollPosition2.default)(this.contentDocument, 'scrollTop');\n      var atStart = scrollTop < this.options.fadeOffset;\n      var atEnd = this.elementVisibleHeight + scrollTop + this.options.fadeOffset > this.elementFullHeight;\n\n      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'scrollVertical', this).call(this, atStart, atEnd);\n    }\n  }, {\n    key: 'clickHorizontal',\n    value: function clickHorizontal() {\n      //\n    }\n  }, {\n    key: 'clickVertical',\n    value: function clickVertical() {\n      //\n    }\n  }]);\n\n  return IFrame;\n}(_Common3.default);\n\nexports.default = IFrame;\n\n//# sourceURL=webpack://Indicate/./src/IFrame.js?");

/***/ }),

/***/ "./src/IFrameCrossOrigin.js":
/*!**********************************!*\
  !*** ./src/IFrameCrossOrigin.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _Common2 = __webpack_require__(/*! ./Common */ \"./src/Common.js\");\n\nvar _Common3 = _interopRequireDefault(_Common2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar IFrameCrossOrigin = function (_Common) {\n  _inherits(IFrameCrossOrigin, _Common);\n\n  function IFrameCrossOrigin(element, options) {\n    _classCallCheck(this, IFrameCrossOrigin);\n\n    var _this = _possibleConstructorReturn(this, (IFrameCrossOrigin.__proto__ || Object.getPrototypeOf(IFrameCrossOrigin)).call(this, element, options));\n\n    _this.scrollableElement = _this.element;\n    _this.registerPostMessageListener();\n    return _this;\n  }\n\n  _createClass(IFrameCrossOrigin, [{\n    key: 'shouldInitHorizontal',\n    value: function shouldInitHorizontal() {\n      return this.elementFullWidth > this.elementVisibleWidth;\n    }\n  }, {\n    key: 'shouldInitVertical',\n    value: function shouldInitVertical() {\n      return this.elementFullHeight > this.elementVisibleHeight;\n    }\n  }, {\n    key: 'registerPostMessageListener',\n    value: function registerPostMessageListener() {\n      var _this2 = this;\n\n      window.addEventListener('message', function (event) {\n        if (!event.data || !event.data.indicate) {\n          return;\n        }\n        _this2.getIframeMessage(event);\n      }, false);\n    }\n  }, {\n    key: 'getIframeMessage',\n    value: function getIframeMessage(event) {\n      var data = event.data;\n\n      this.elementFullWidth = data.width;\n      this.elementFullHeight = data.height;\n      this.scrollLeft = data.offsetLeft;\n      this.scrollTop = data.offsetTop;\n\n      if (!data.initialized) {\n        this.init();\n      } else {\n        this.scroll();\n      }\n    }\n  }, {\n    key: 'scrollHorizontal',\n    value: function scrollHorizontal() {\n      var atStart = this.scrollLeft < this.options.fadeOffset;\n      var atEnd = this.elementVisibleWidth + this.scrollLeft + this.options.fadeOffset > this.elementFullWidth;\n\n      _get(IFrameCrossOrigin.prototype.__proto__ || Object.getPrototypeOf(IFrameCrossOrigin.prototype), 'scrollHorizontal', this).call(this, atStart, atEnd);\n    }\n  }, {\n    key: 'scrollVertical',\n    value: function scrollVertical() {\n      var atStart = this.scrollTop < this.options.fadeOffset;\n      var atEnd = this.elementVisibleHeight + this.scrollTop + this.options.fadeOffset > this.elementFullHeight;\n\n      _get(IFrameCrossOrigin.prototype.__proto__ || Object.getPrototypeOf(IFrameCrossOrigin.prototype), 'scrollVertical', this).call(this, atStart, atEnd);\n    }\n  }, {\n    key: 'clickHorizontal',\n    value: function clickHorizontal() {\n      //\n    }\n  }, {\n    key: 'clickVertial',\n    value: function clickVertial() {\n      //\n    }\n  }]);\n\n  return IFrameCrossOrigin;\n}(_Common3.default);\n\nexports.default = IFrameCrossOrigin;\n\n//# sourceURL=webpack://Indicate/./src/IFrameCrossOrigin.js?");

/***/ }),

/***/ "./src/Options.js":
/*!************************!*\
  !*** ./src/Options.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _es6ObjectAssign = __webpack_require__(/*! es6-object-assign */ \"./node_modules/es6-object-assign/index.js\");\n\nvar _index = __webpack_require__(/*! ./features/index */ \"./src/features/index.js\");\n\nvar features = _interopRequireWildcard(_index);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar defaultOptions = {\n  // Clicking on the arrow will scroll (1 / value) of the currently visible width.\n  scrollDenominator: 2,\n  // The fade effect color.\n  color: '#FFFFFF',\n  // Should arrows be show.\n  arrows: true,\n  // Defines where the arrows should be positioned inside the fade effect.\n  // Can be set to 'cetner', 'start' or 'end'.\n  arrowPosition: 'center',\n  // The face effec's width.\n  fadeWidth: '20px',\n  // This far away from the scroll end the effect will be removed.\n  fadeOffset: 5,\n  // By default horizontal scrollling is enabled.\n  horizontal: true,\n  // Additionally the effect can also be applied vertically.\n  vertical: true,\n  // Set the max-height of the wrapper.\n  maxHeight: 'none'\n};\n\nvar Options = function () {\n  function Options(options) {\n    _classCallCheck(this, Options);\n\n    (0, _es6ObjectAssign.assign)(this, (0, _es6ObjectAssign.assign)({}, defaultOptions, options));\n    this.checkFeatures();\n    this.initializeFeatures();\n  }\n\n  _createClass(Options, [{\n    key: 'update',\n    value: function update(newOptions) {\n      (0, _es6ObjectAssign.assign)(this, (0, _es6ObjectAssign.assign)({}, this, newOptions));\n      this.checkFeatures();\n      this.initializeFeatures();\n    }\n\n    /**\n     * Checks which features are applicable and returns only those.\n     **/\n\n  }, {\n    key: 'checkFeatures',\n    value: function checkFeatures() {\n      var _this = this;\n\n      var featuresArray = Object.keys(features).map(function (key) {\n        return features[key];\n      });\n      this.features = featuresArray.filter(function (feature) {\n        return feature.check(_this);\n      });\n    }\n\n    /**\n     * Initializes the feature inststances.\n     **/\n\n  }, {\n    key: 'initializeFeatures',\n    value: function initializeFeatures() {\n      var _this2 = this;\n\n      this.features = this.features.map(function (Feature) {\n        return new Feature(_this2);\n      });\n    }\n  }]);\n\n  return Options;\n}();\n\nexports.default = Options;\n\n//# sourceURL=webpack://Indicate/./src/Options.js?");

/***/ }),

/***/ "./src/Table.js":
/*!**********************!*\
  !*** ./src/Table.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Block2 = __webpack_require__(/*! ./Block */ \"./src/Block.js\");\n\nvar _Block3 = _interopRequireDefault(_Block2);\n\nvar _addClass = __webpack_require__(/*! ./helpers/addClass */ \"./src/helpers/addClass.js\");\n\nvar _addClass2 = _interopRequireDefault(_addClass);\n\nvar _classNames = __webpack_require__(/*! ./constants/classNames */ \"./src/constants/classNames.js\");\n\nvar _classNames2 = _interopRequireDefault(_classNames);\n\n__webpack_require__(/*! ./styles/table.scss */ \"./src/styles/table.scss\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Table = function (_Block) {\n  _inherits(Table, _Block);\n\n  function Table() {\n    _classCallCheck(this, Table);\n\n    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));\n  }\n\n  _createClass(Table, [{\n    key: 'makeElementResponsive',\n    value: function makeElementResponsive() {\n      var parentElement = this.element.parentElement;\n      var tagName = parentElement.tagName;\n\n      if (tagName.toLowerCase() !== 'div') {\n        this.addWrapper(parentElement);\n      } else {\n        (0, _addClass2.default)(parentElement, _classNames2.default.tableWrapper);\n        this.scrollableElement = parentElement;\n        this.parent = parentElement.parentElement;\n      }\n    }\n  }, {\n    key: 'addWrapper',\n    value: function addWrapper(parentElement) {\n      var wrapper = document.createElement('div');\n      parentElement.replaceChild(wrapper, this.element);\n      wrapper.className = _classNames2.default.tableWrapper;\n      wrapper.appendChild(this.element);\n      this.scrollableElement = wrapper;\n      this.parent = wrapper.parentElement;\n    }\n  }]);\n\n  return Table;\n}(_Block3.default);\n\nexports.default = Table;\n\n//# sourceURL=webpack://Indicate/./src/Table.js?");

/***/ }),

/***/ "./src/constants/classNames.js":
/*!*************************************!*\
  !*** ./src/constants/classNames.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  classPrefix: 'idc-',\n  elementClass: 'idc-element',\n  'fade-top': 'idc-fade-top',\n  'fade-right': 'idc-fade-right',\n  'fade-bottom': 'idc-fade-bottom',\n  'fade-left': 'idc-fade-left',\n  'arrow-top': 'idc-arrow-top',\n  'arrow-right': 'idc-arrow-right',\n  'arrow-bottom': 'idc-arrow-bottom',\n  'arrow-left': 'idc-arrow-left',\n  tableWrapper: 'idc-table-wrapper'\n};\n\n//# sourceURL=webpack://Indicate/./src/constants/classNames.js?");

/***/ }),

/***/ "./src/features/Arrow.js":
/*!*******************************!*\
  !*** ./src/features/Arrow.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Feature2 = __webpack_require__(/*! ./Feature */ \"./src/features/Feature.js\");\n\nvar _Feature3 = _interopRequireDefault(_Feature2);\n\nvar _addClass = __webpack_require__(/*! ./../helpers/addClass */ \"./src/helpers/addClass.js\");\n\nvar _addClass2 = _interopRequireDefault(_addClass);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Abstract class to provide arrow related functionality.\n **/\nvar Arrow = function (_Feature) {\n  _inherits(Arrow, _Feature);\n\n  function Arrow() {\n    _classCallCheck(this, Arrow);\n\n    return _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).apply(this, arguments));\n  }\n\n  _createClass(Arrow, [{\n    key: 'setArrowRotation',\n    value: function setArrowRotation(arrow, direction) {\n      if (direction === 'top') {\n        arrow.style.transform = 'rotate(90deg)';\n      }\n      if (direction === 'right') {\n        arrow.style.transform = 'rotate(180deg)';\n      }\n      if (direction === 'bottom') {\n        arrow.style.transform = 'rotate(270deg)';\n      }\n    }\n  }, {\n    key: 'setArrowPosition',\n    value: function setArrowPosition(instance) {\n      var arrowPosition = this.options.arrowPosition;\n\n      instance.directions.map(function (direction) {\n        // This feature only applies horizontally\n        if (direction === 'left' || direction === 'right') {\n          instance.arrows[direction].style.display = 'flex';\n          instance.arrows[direction].style.alignItems = 'flex-' + arrowPosition;\n        }\n      });\n    }\n  }, {\n    key: 'hideDefaultArrows',\n    value: function hideDefaultArrows(arrow) {\n      // Removes the default before element.\n      (0, _addClass2.default)(arrow, 'idc-no-before');\n    }\n  }]);\n\n  return Arrow;\n}(_Feature3.default);\n\nexports.default = Arrow;\n\n//# sourceURL=webpack://Indicate/./src/features/Arrow.js?");

/***/ }),

/***/ "./src/features/ArrowMarkup.js":
/*!*************************************!*\
  !*** ./src/features/ArrowMarkup.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Arrow2 = __webpack_require__(/*! ./Arrow */ \"./src/features/Arrow.js\");\n\nvar _Arrow3 = _interopRequireDefault(_Arrow2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n* Uses the provided markup as the image for the arrows.\n* The left one is expected, the others will be generated by rotation.\n **/\nvar ArrowMarkup = function (_Arrow) {\n  _inherits(ArrowMarkup, _Arrow);\n\n  function ArrowMarkup() {\n    _classCallCheck(this, ArrowMarkup);\n\n    return _possibleConstructorReturn(this, (ArrowMarkup.__proto__ || Object.getPrototypeOf(ArrowMarkup)).apply(this, arguments));\n  }\n\n  _createClass(ArrowMarkup, [{\n    key: 'create',\n    value: function create(instance) {\n      this.setArrowMarkup(instance);\n    }\n  }, {\n    key: 'update',\n    value: function update(instance) {\n      this.setArrowMarkup(instance);\n    }\n  }, {\n    key: 'setArrowMarkup',\n    value: function setArrowMarkup(instance) {\n      var _this2 = this;\n\n      var arrowMarkup = this.options.arrowMarkup;\n\n      instance.directions.map(function (direction) {\n        var arrow = instance.arrows[direction];\n\n        arrow.innerHTML = arrowMarkup;\n\n        var markupNode = arrow.childNodes[0];\n\n        _this2.setArrowRotation(markupNode, direction);\n        _this2.setMarkupSize(markupNode);\n        _this2.hideDefaultArrows(arrow);\n      });\n\n      this.setArrowPosition(instance);\n    }\n  }, {\n    key: 'setMarkupSize',\n    value: function setMarkupSize(markupNode) {\n      var fadeWidth = this.options.fadeWidth;\n\n      markupNode.style.width = fadeWidth;\n      markupNode.style.height = fadeWidth;\n    }\n  }], [{\n    key: 'check',\n    value: function check(options) {\n      return Boolean(options.arrowMarkup);\n    }\n  }]);\n\n  return ArrowMarkup;\n}(_Arrow3.default);\n\nexports.default = ArrowMarkup;\n\n//# sourceURL=webpack://Indicate/./src/features/ArrowMarkup.js?");

/***/ }),

/***/ "./src/features/ArrowPosition.js":
/*!***************************************!*\
  !*** ./src/features/ArrowPosition.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Arrow2 = __webpack_require__(/*! ./Arrow */ \"./src/features/Arrow.js\");\n\nvar _Arrow3 = _interopRequireDefault(_Arrow2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Sets a special arrow position, default is center.\n **/\nvar ArrowPosition = function (_Arrow) {\n  _inherits(ArrowPosition, _Arrow);\n\n  function ArrowPosition() {\n    _classCallCheck(this, ArrowPosition);\n\n    return _possibleConstructorReturn(this, (ArrowPosition.__proto__ || Object.getPrototypeOf(ArrowPosition)).apply(this, arguments));\n  }\n\n  _createClass(ArrowPosition, [{\n    key: 'create',\n    value: function create(instance) {\n      this.setArrowPosition(instance);\n    }\n  }, {\n    key: 'update',\n    value: function update(instance) {\n      this.setArrowPosition(instance);\n    }\n  }], [{\n    key: 'check',\n    value: function check(options) {\n      return options.arrowPosition !== 'center';\n    }\n  }]);\n\n  return ArrowPosition;\n}(_Arrow3.default);\n\nexports.default = ArrowPosition;\n\n//# sourceURL=webpack://Indicate/./src/features/ArrowPosition.js?");

/***/ }),

/***/ "./src/features/ArrowUrl.js":
/*!**********************************!*\
  !*** ./src/features/ArrowUrl.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Arrow2 = __webpack_require__(/*! ./Arrow */ \"./src/features/Arrow.js\");\n\nvar _Arrow3 = _interopRequireDefault(_Arrow2);\n\nvar _addClass = __webpack_require__(/*! ./../helpers/addClass */ \"./src/helpers/addClass.js\");\n\nvar _addClass2 = _interopRequireDefault(_addClass);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Uses the provided url as a background image for the arrows.\n * The left one is expected, the others will be generated by rotation.\n **/\nvar ArrowUrl = function (_Arrow) {\n  _inherits(ArrowUrl, _Arrow);\n\n  function ArrowUrl() {\n    _classCallCheck(this, ArrowUrl);\n\n    return _possibleConstructorReturn(this, (ArrowUrl.__proto__ || Object.getPrototypeOf(ArrowUrl)).apply(this, arguments));\n  }\n\n  _createClass(ArrowUrl, [{\n    key: 'create',\n    value: function create(instance) {\n      this.setArrowUrl(instance);\n    }\n  }, {\n    key: 'update',\n    value: function update(instance) {\n      this.setArrowUrl(instance);\n    }\n  }, {\n    key: 'setArrowUrl',\n    value: function setArrowUrl(instance) {\n      var _this2 = this;\n\n      var arrowUrl = this.options.arrowUrl;\n\n      instance.directions.map(function (direction) {\n        var arrow = instance.arrows[direction];\n        arrow.style.backgroundImage = 'url(' + arrowUrl + ')';\n        arrow.style.backgroundRepeat = 'no-repeat';\n        arrow.style.backgroundSize = 'contain';\n\n        _this2.setArrowRotation(arrow, direction);\n        _this2.setArrowBackgroundPosition(arrow, direction);\n\n        // This will remove the default before element.\n        (0, _addClass2.default)(arrow, 'idc-no-before');\n      });\n    }\n\n    // Arrow position for vertical direction is always center.\n\n  }, {\n    key: 'setArrowBackgroundPosition',\n    value: function setArrowBackgroundPosition(arrow, direction) {\n      var arrowPosition = this.options.arrowPosition;\n\n      if (arrowPosition === 'center' || direction === 'top' || direction === 'bottom') {\n        arrow.style.backgroundPosition = 'center';\n        return;\n      }\n\n      if (arrowPosition === 'start' || arrowPosition === 'top') {\n        if (direction === 'left') {\n          arrow.style.backgroundPosition = 'top';\n          return;\n        }\n        // Because arrows are generated by rotation these have to be switched for right\n        arrow.style.backgroundPosition = 'bottom';\n        return;\n      }\n\n      if (arrowPosition === 'end' || arrowPosition === 'bottom') {\n        if (direction === 'left') {\n          arrow.style.backgroundPosition = 'bottom';\n          return;\n        }\n        arrow.style.backgroundPosition = 'top';\n      }\n    }\n  }], [{\n    key: 'check',\n    value: function check(options) {\n      return Boolean(options.arrowUrl);\n    }\n  }]);\n\n  return ArrowUrl;\n}(_Arrow3.default);\n\nexports.default = ArrowUrl;\n\n//# sourceURL=webpack://Indicate/./src/features/ArrowUrl.js?");

/***/ }),

/***/ "./src/features/Color.js":
/*!*******************************!*\
  !*** ./src/features/Color.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Feature2 = __webpack_require__(/*! ./Feature */ \"./src/features/Feature.js\");\n\nvar _Feature3 = _interopRequireDefault(_Feature2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Sets the fade color.\n **/\nvar Color = function (_Feature) {\n  _inherits(Color, _Feature);\n\n  function Color() {\n    _classCallCheck(this, Color);\n\n    return _possibleConstructorReturn(this, (Color.__proto__ || Object.getPrototypeOf(Color)).apply(this, arguments));\n  }\n\n  _createClass(Color, [{\n    key: 'create',\n    value: function create(instance) {\n      this.setFadeColor(instance);\n    }\n  }, {\n    key: 'update',\n    value: function update(instance) {\n      this.setFadeColor(instance);\n    }\n  }, {\n    key: 'setFadeColor',\n    value: function setFadeColor(instance) {\n      var color = this.options.color;\n\n      instance.directions.map(function (direction) {\n        instance.fades[direction].style.background = 'linear-gradient(to ' + direction + ', rgba(255,255,255,0) 0%, ' + color + ' 100%)';\n      });\n    }\n  }], [{\n    key: 'check',\n    value: function check(options) {\n      return options.color !== '#FFFFFF';\n    }\n  }]);\n\n  return Color;\n}(_Feature3.default);\n\nexports.default = Color;\n\n//# sourceURL=webpack://Indicate/./src/features/Color.js?");

/***/ }),

/***/ "./src/features/FadeWidth.js":
/*!***********************************!*\
  !*** ./src/features/FadeWidth.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Feature2 = __webpack_require__(/*! ./Feature */ \"./src/features/Feature.js\");\n\nvar _Feature3 = _interopRequireDefault(_Feature2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Adapts the fade width.\n **/\nvar FadeWidth = function (_Feature) {\n  _inherits(FadeWidth, _Feature);\n\n  function FadeWidth() {\n    _classCallCheck(this, FadeWidth);\n\n    return _possibleConstructorReturn(this, (FadeWidth.__proto__ || Object.getPrototypeOf(FadeWidth)).apply(this, arguments));\n  }\n\n  _createClass(FadeWidth, [{\n    key: 'create',\n    value: function create(instance) {\n      this.setFadeWidth(instance);\n    }\n  }, {\n    key: 'update',\n    value: function update(instance) {\n      this.setFadeWidth(instance);\n    }\n  }, {\n    key: 'setFadeWidth',\n    value: function setFadeWidth(instance) {\n      var _this2 = this;\n\n      instance.directions.map(function (direction) {\n        if (direction === 'left' || direction === 'right') {\n          instance.fades[direction].style.width = _this2.options.fadeWidth;\n          if (instance.arrows) {\n            instance.arrows[direction].style.width = _this2.options.fadeWidth;\n          }\n        }\n        if (direction === 'top' || direction === 'bottom') {\n          instance.fades[direction].style.height = _this2.options.fadeWidth;\n          if (instance.arrows) {\n            instance.arrows[direction].style.height = _this2.options.fadeWidth;\n          }\n        }\n      });\n    }\n  }], [{\n    key: 'check',\n    value: function check(options) {\n      return options.fadeWidth !== '20px';\n    }\n  }]);\n\n  return FadeWidth;\n}(_Feature3.default);\n\nexports.default = FadeWidth;\n\n//# sourceURL=webpack://Indicate/./src/features/FadeWidth.js?");

/***/ }),

/***/ "./src/features/Feature.js":
/*!*********************************!*\
  !*** ./src/features/Feature.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Feature = function () {\n  function Feature(options) {\n    _classCallCheck(this, Feature);\n\n    this.options = options;\n  }\n\n  /**\n   * Check if the feature is needed. Returns true if feature is applicable.\n   **/\n\n\n  _createClass(Feature, null, [{\n    key: \"check\",\n    value: function check(options) {\n      return false;\n    }\n  }]);\n\n  return Feature;\n}();\n\nexports.default = Feature;\n\n//# sourceURL=webpack://Indicate/./src/features/Feature.js?");

/***/ }),

/***/ "./src/features/MaxHeight.js":
/*!***********************************!*\
  !*** ./src/features/MaxHeight.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Feature2 = __webpack_require__(/*! ./Feature */ \"./src/features/Feature.js\");\n\nvar _Feature3 = _interopRequireDefault(_Feature2);\n\nvar _Table = __webpack_require__(/*! ./../Table */ \"./src/Table.js\");\n\nvar _Table2 = _interopRequireDefault(_Table);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Sets the max height for a table wrapper.\n **/\nvar MaxHeight = function (_Feature) {\n  _inherits(MaxHeight, _Feature);\n\n  function MaxHeight() {\n    _classCallCheck(this, MaxHeight);\n\n    return _possibleConstructorReturn(this, (MaxHeight.__proto__ || Object.getPrototypeOf(MaxHeight)).apply(this, arguments));\n  }\n\n  _createClass(MaxHeight, [{\n    key: 'create',\n    value: function create(instance) {\n      this.setMaxHeight(instance);\n    }\n  }, {\n    key: 'update',\n    value: function update(instance) {\n      this.setMaxHeight(instance);\n    }\n  }, {\n    key: 'setMaxHeight',\n    value: function setMaxHeight(instance) {\n      if (instance instanceof _Table2.default) {\n        instance.scrollableElement.style.maxHeight = this.options.maxHeight;\n      }\n    }\n  }], [{\n    key: 'check',\n    value: function check(options) {\n      return options.maxHeight !== 'none';\n    }\n  }]);\n\n  return MaxHeight;\n}(_Feature3.default);\n\nexports.default = MaxHeight;\n\n//# sourceURL=webpack://Indicate/./src/features/MaxHeight.js?");

/***/ }),

/***/ "./src/features/index.js":
/*!*******************************!*\
  !*** ./src/features/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Color = __webpack_require__(/*! ./Color */ \"./src/features/Color.js\");\n\nObject.defineProperty(exports, 'Color', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_Color).default;\n  }\n});\n\nvar _ArrowPosition = __webpack_require__(/*! ./ArrowPosition */ \"./src/features/ArrowPosition.js\");\n\nObject.defineProperty(exports, 'ArrowPosition', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_ArrowPosition).default;\n  }\n});\n\nvar _ArrowUrl = __webpack_require__(/*! ./ArrowUrl */ \"./src/features/ArrowUrl.js\");\n\nObject.defineProperty(exports, 'ArrowUrl', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_ArrowUrl).default;\n  }\n});\n\nvar _ArrowMarkup = __webpack_require__(/*! ./ArrowMarkup */ \"./src/features/ArrowMarkup.js\");\n\nObject.defineProperty(exports, 'ArrowMarkup', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_ArrowMarkup).default;\n  }\n});\n\nvar _FadeWidth = __webpack_require__(/*! ./FadeWidth */ \"./src/features/FadeWidth.js\");\n\nObject.defineProperty(exports, 'FadeWidth', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_FadeWidth).default;\n  }\n});\n\nvar _MaxHeight = __webpack_require__(/*! ./MaxHeight */ \"./src/features/MaxHeight.js\");\n\nObject.defineProperty(exports, 'MaxHeight', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_MaxHeight).default;\n  }\n});\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack://Indicate/./src/features/index.js?");

/***/ }),

/***/ "./src/helpers/addClass.js":
/*!*********************************!*\
  !*** ./src/helpers/addClass.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n/**\n * Adds a class to an element.\n * If there is already a space at the end, none will be added.\n **/\nexports.default = function (element, selector) {\n  if (element.className[element.className.length - 1] !== ' ') {\n    element.className += ' ' + selector;\n  } else {\n    element.className += selector;\n  }\n};\n\n//# sourceURL=webpack://Indicate/./src/helpers/addClass.js?");

/***/ }),

/***/ "./src/helpers/get-iframe-content-document.js":
/*!****************************************************!*\
  !*** ./src/helpers/get-iframe-content-document.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getContentDocument;\nfunction getContentDocument(instance) {\n  return instance.element.contentDocument;\n}\n\n//# sourceURL=webpack://Indicate/./src/helpers/get-iframe-content-document.js?");

/***/ }),

/***/ "./src/helpers/get-iframe-scroll-position.js":
/*!***************************************************!*\
  !*** ./src/helpers/get-iframe-scroll-position.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getScrollPosition;\n/**\n * Returns the scroll position. Both properties are available, but the first\n * one is correct on Chrome and Firefox, while the second one matches\n * Safari.\n **/\nfunction getScrollPosition(contentDocument, property) {\n  return Math.max(contentDocument.documentElement[property], contentDocument.body[property]);\n}\n\n//# sourceURL=webpack://Indicate/./src/helpers/get-iframe-scroll-position.js?");

/***/ }),

/***/ "./src/helpers/getOffset.js":
/*!**********************************!*\
  !*** ./src/helpers/getOffset.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n/**\n * Gets the absolute position of the element.\n * Borders will be subtracted.\n **/\nexports.default = function (element) {\n  var oTop = element.offsetTop + parseInt(window.getComputedStyle(element).borderTop);\n  var oLeft = element.offsetLeft + parseInt(window.getComputedStyle(element).borderLeft);\n\n  var _x = 0;\n  var _y = 0;\n  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {\n    _x += element.offsetLeft + parseInt(window.getComputedStyle(element).borderLeft);\n    _y += element.offsetTop + parseInt(window.getComputedStyle(element).borderTop);\n    element = element.offsetParent;\n  }\n\n  if (oTop !== _y || oLeft !== _x) {\n    return {\n      top: oTop,\n      left: oLeft\n    };\n  }\n\n  return { top: _y, left: _x };\n};\n\n//# sourceURL=webpack://Indicate/./src/helpers/getOffset.js?");

/***/ }),

/***/ "./src/helpers/getSize.js":
/*!********************************!*\
  !*** ./src/helpers/getSize.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n/**\n * Returns the width and height of a DOM element using getBoundingClientRect\n * and subtracting the margins.\n **/\nexports.default = function (element) {\n  var boundingClientRect = element.getBoundingClientRect();\n  var computedStyles = window.getComputedStyle(element);\n  var bounds = {\n    width: boundingClientRect.width,\n    height: boundingClientRect.height\n  };\n\n  bounds.width -= parseInt(computedStyles.borderLeft) + parseInt(computedStyles.borderRight);\n  bounds.height -= parseInt(computedStyles.borderTop) + parseInt(computedStyles.borderBottom);\n\n  // Round, since other browser functions will round too.\n  bounds.width = Math.ceil(bounds.width);\n  bounds.height = Math.ceil(bounds.height);\n\n  return bounds;\n};\n\n//# sourceURL=webpack://Indicate/./src/helpers/getSize.js?");

/***/ }),

/***/ "./src/helpers/is-cross-origin-iframe.js":
/*!***********************************************!*\
  !*** ./src/helpers/is-cross-origin-iframe.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// Returns the protocol of a domain.\nvar extractProtocol = function extractProtocol(domain) {\n  return domain.split('/')[0];\n};\n\n// Returns the subdomain of a domain.\nvar extractSubdomain = function extractSubdomain(domain) {\n  return domain.split('/')[2];\n};\n\n// Extracts the domain name of a subdomain.\nvar extractDomainName = function extractDomainName(subdomain) {\n  // TODO does not work for ip addresses\n  var arr = subdomain.split('.');\n  return arr[arr.length - 2] + '.' + arr[arr.length - 1];\n};\n\nvar isExternal = function isExternal(subdomainIframe) {\n  var domainName = extractDomainName(subdomainIframe);\n\n  if (document.domain !== domainName) {\n    // Not a subdomain\n    return true;\n  }\n\n  // It's a subdomain, adapt domain to allow accessing contents\n  document.domain = domainName;\n  return false;\n};\n\nvar isDifferentDomain = function isDifferentDomain(url) {\n  var protocolIframe = extractProtocol(url);\n  var subdomainIframe = extractSubdomain(url);\n\n  if (window.location.protocol !== protocolIframe || window.location.host !== subdomainIframe) {\n    return isExternal(subdomainIframe);\n  }\n\n  return false;\n};\n\nexports.default = function (element) {\n  var url = element.getAttribute('src');\n  return isDifferentDomain(url);\n};\n\n//# sourceURL=webpack://Indicate/./src/helpers/is-cross-origin-iframe.js?");

/***/ }),

/***/ "./src/helpers/removeClass.js":
/*!************************************!*\
  !*** ./src/helpers/removeClass.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (element, selector) {\n  element.className = element.className.replace(new RegExp('(?:^|\\\\s)' + selector + '(?:\\\\s|$)'), ' ');\n};\n\n//# sourceURL=webpack://Indicate/./src/helpers/removeClass.js?");

/***/ }),

/***/ "./src/styles/arrows.scss":
/*!********************************!*\
  !*** ./src/styles/arrows.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://Indicate/./src/styles/arrows.scss?");

/***/ }),

/***/ "./src/styles/block.scss":
/*!*******************************!*\
  !*** ./src/styles/block.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://Indicate/./src/styles/block.scss?");

/***/ }),

/***/ "./src/styles/common.scss":
/*!********************************!*\
  !*** ./src/styles/common.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://Indicate/./src/styles/common.scss?");

/***/ }),

/***/ "./src/styles/fades.scss":
/*!*******************************!*\
  !*** ./src/styles/fades.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://Indicate/./src/styles/fades.scss?");

/***/ }),

/***/ "./src/styles/iframe.scss":
/*!********************************!*\
  !*** ./src/styles/iframe.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://Indicate/./src/styles/iframe.scss?");

/***/ }),

/***/ "./src/styles/table.scss":
/*!*******************************!*\
  !*** ./src/styles/table.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://Indicate/./src/styles/table.scss?");

/***/ })

/******/ })["default"];
});