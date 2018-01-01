(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Indicate", [], factory);
	else if(typeof exports === 'object')
		exports["Indicate"] = factory();
	else
		root["Indicate"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Feature = function () {
  function Feature(options) {
    _classCallCheck(this, Feature);

    this.options = options;
  }

  /**
   * Check if the feature is needed. Returns true if feature is applicable.
   **/


  _createClass(Feature, null, [{
    key: "check",
    value: function check(options) {
      return false;
    }
  }]);

  return Feature;
}();

exports.default = Feature;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Adds a class to an element.
 * If there is already a space at the end, none will be added.
 **/
exports.default = function (element, selector) {
  if (element.className[element.className.length - 1] !== ' ') {
    element.className += ' ' + selector;
  } else {
    element.className += selector;
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Feature2 = __webpack_require__(0);

var _Feature3 = _interopRequireDefault(_Feature2);

var _addClass = __webpack_require__(1);

var _addClass2 = _interopRequireDefault(_addClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Abstract class to provide arrow related functionality.
 **/
var Arrow = function (_Feature) {
  _inherits(Arrow, _Feature);

  function Arrow() {
    _classCallCheck(this, Arrow);

    return _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).apply(this, arguments));
  }

  _createClass(Arrow, [{
    key: 'setArrowRotation',
    value: function setArrowRotation(arrow, direction) {
      if (direction === 'top') {
        arrow.style.transform = 'rotate(90deg)';
      }
      if (direction === 'right') {
        arrow.style.transform = 'rotate(180deg)';
      }
      if (direction === 'bottom') {
        arrow.style.transform = 'rotate(270deg)';
      }
    }
  }, {
    key: 'setArrowPosition',
    value: function setArrowPosition(instance) {
      var arrowPosition = this.options.arrowPosition;

      instance.directions.map(function (direction) {
        // This feature only applies horizontally
        if (direction === 'left' || direction === 'right') {
          instance.arrows[direction].style.display = 'flex';
          instance.arrows[direction].style.alignItems = 'flex-' + arrowPosition;
        }
      });
    }
  }, {
    key: 'hideDefaultArrows',
    value: function hideDefaultArrows(arrow) {
      // Removes the default before element.
      (0, _addClass2.default)(arrow, 'idc-no-before');
    }
  }]);

  return Arrow;
}(_Feature3.default);

exports.default = Arrow;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addClass = __webpack_require__(1);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(18);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _getOffset = __webpack_require__(19);

var _getOffset2 = _interopRequireDefault(_getOffset);

var _getSize = __webpack_require__(4);

var _getSize2 = _interopRequireDefault(_getSize);

var _classNames = __webpack_require__(7);

var _classNames2 = _interopRequireDefault(_classNames);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common(element, options) {
    var _this = this;

    _classCallCheck(this, Common);

    this.element = element;
    this.options = options;
    this.initFunction = function () {
      return _this.init();
    };
    this.resizeFunction = function () {
      return _this.resize();
    };
    this.scrollFunction = function () {
      return _this.scroll();
    };
  }

  /**
   * To be called from descendants, once ready.
   **/


  _createClass(Common, [{
    key: 'init',
    value: function init() {
      this.makeElementResponsive();

      var shouldInitHorizontal = this.shouldInitHorizontal();
      var shouldInitVertical = this.shouldInitVertical();

      if (this.options.horizontal && !shouldInitHorizontal || this.options.vertical && !shouldInitVertical) {
        if (!this.initEventAdded) {
          this.initEventAdded = true;
          window.addEventListener('resize', this.initFunction);
        }
      }

      if (this.options.horizontal && this.initHorizontal || this.options.vertical && this.initVertical) {
        window.removeEventListener('resize', this.initFunction);
      }

      if (this.options.horizontal && shouldInitHorizontal && !this.initHorizontal || this.options.vertical && shouldInitVertical && !this.initVertical) {
        this.create();
        this.resize();
      }
    }

    /**
     * Creates an instance.
     **/

  }, {
    key: 'create',
    value: function create() {
      this.element.className += ' ' + _classNames2.default.elementClass;
      this.setDirections();
      this.insertFadeElements();
      this.insertArrows();
      this.registerListeners();
      this.hideInitial();

      this.hook('create');
    }

    /**
     * Updates an exising instance when new options are received.
     **/

  }, {
    key: 'update',
    value: function update(options) {
      this.options = options;
      this.setDirections();

      this.hook('update');

      this.resize();
    }

    /**
     * Cleans up the instance.
     **/

  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('resize', this.resizeFunction);
      window.removeEventListener('resize', this.initFunction);
    }

    /**
     * For regular elements no wrapper is needed.
     **/

  }, {
    key: 'makeElementResponsive',
    value: function makeElementResponsive() {
      this.parent = this.element.parentElement;
    }

    /**
     * Register the scorll, resize and arrow click listeners.
     **/

  }, {
    key: 'registerListeners',
    value: function registerListeners() {
      var _this2 = this;

      window.addEventListener('resize', this.resizeFunction);

      this.directions.map(function (direction) {
        var element = _this2.arrows ? _this2.arrows[direction] : _this2.fades[direction];
        // Note that listeners on hidden elements will not be working.
        element.addEventListener('click', function (event) {
          return _this2.handleClick(event);
        });
      });
    }

    /**
     * Adapts the scroll position after a click on a direction (arrow/fade) has
     * happened.
     **/

  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var direction = event.target.className.match(/[\w]*($|\s)/)[0].trim();

      if (direction === 'left' || direction === 'right') {
        return this.clickHorizontal(direction);
      }

      if (direction === 'top' || direction === 'bottom') {
        return this.clickVertical(direction);
      }
    }

    /**
     * Adapt elements after a scroll.
     **/

  }, {
    key: 'scroll',
    value: function scroll() {
      if (this.options.horizontal && this.fades.left) {
        this.scrollHorizontal();
      }

      if (this.options.vertical && this.fades.top) {
        this.scrollVertical();
      }
    }

    /**
     * Adapts the visibility of the horizontal elements after a scroll.
     **/

  }, {
    key: 'scrollHorizontal',
    value: function scrollHorizontal(atStart, atEnd) {
      if (atStart) {
        this.hide('left');
      } else {
        this.show('left');
      }

      if (atEnd) {
        this.hide('right');
      } else {
        this.show('right');
      }
    }

    /**
     * Adapts the visibility of the vertical elements after a scroll.
     **/

  }, {
    key: 'scrollVertical',
    value: function scrollVertical(atStart, atEnd) {
      if (atEnd) {
        this.hide('bottom');
      } else {
        this.show('bottom');
      }

      if (atStart) {
        this.hide('top');
      } else {
        this.show('top');
      }
    }

    /**
     * On page resize we need to adapt the container measurements.
     **/

  }, {
    key: 'resize',
    value: function resize() {
      var _this3 = this;

      var scrollElementBounds = this.scrollableElement.getBoundingClientRect();
      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);

      // Probably unneeded check if needed for browser compatibility
      this.elementVisibleWidth = Math.max(this.scrollableElement.clientWidth, scrollElementBounds.width);
      this.elementVisibleHeight = Math.max(this.scrollableElement.clientHeight, scrollElementBounds.height);

      this.elementWidth = scrollElementSize.width;
      this.elementHeight = scrollElementSize.height;

      window.requestAnimationFrame(function () {
        return _this3.updateElementPositions();
      });

      this.scroll();
    }

    /**
     * Hides the fades and arrows if they're not yet hidden.
     **/

  }, {
    key: 'hide',
    value: function hide(direction) {
      var hidePropertyName = 'is' + direction + 'Hidden';

      if (!this[hidePropertyName]) {
        this[hidePropertyName] = true;
        (0, _addClass2.default)(this.fades[direction], 'hide');
        if (this.arrows) {
          (0, _addClass2.default)(this.arrows[direction], 'hide');
        }
      }
    }

    /**
     * Top and left should be hidden in every case. Since this is faster than
     * resize and scroll we hide them immediately.
     **/

  }, {
    key: 'hideInitial',
    value: function hideInitial() {
      if (this.fades.top) {
        this.hide('top');
      }
      if (this.fades.left) {
        this.hide('left');
      }
    }

    /**
     * Shows the fades and arrows if they're hidden.
     **/

  }, {
    key: 'show',
    value: function show(direction) {
      var hidePropertyName = 'is' + direction + 'Hidden';

      if (this[hidePropertyName]) {
        this[hidePropertyName] = false;
        (0, _removeClass2.default)(this.fades[direction], 'hide');
        if (this.arrows) {
          (0, _removeClass2.default)(this.arrows[direction], 'hide');
        }
      }
    }

    /**
     * Inserts the fade elements for all the directions provided.
     **/

  }, {
    key: 'insertFadeElements',
    value: function insertFadeElements() {
      var _this4 = this;

      this.fades = {};

      this.directions.map(function (direction, index) {
        _this4.fades[direction] = document.createElement('div');
        _this4.fades[direction].className = _classNames2.default['fade-' + direction];
        _this4.parent.appendChild(_this4.fades[direction]);
      });
    }

    /**
     * Inserts the arrows for all the directions provided.
     **/

  }, {
    key: 'insertArrows',
    value: function insertArrows() {
      var _this5 = this;

      if (!this.options.arrows) {
        return;
      }

      this.arrows = {};

      this.directions.map(function (direction) {
        _this5.arrows[direction] = document.createElement('div');
        _this5.arrows[direction].className = _classNames2.default['arrow-' + direction];
        _this5.parent.appendChild(_this5.arrows[direction]);
      });
    }

    /**
     * Updates the fade and arrow element positions. This is only needed on
     * create and if the position or size of the container changes. Not on scroll.
     **/

  }, {
    key: 'updateElementPositions',
    value: function updateElementPositions() {
      var elementOffset = (0, _getOffset2.default)(this.scrollableElement);

      if (this.options.horizontal && this.fades.left) {
        this.setElementPositionHorizontal(this.fades.left, elementOffset, false);
        this.setElementPositionHorizontal(this.fades.right, elementOffset, true);

        if (this.arrows) {
          this.setElementPositionHorizontal(this.arrows.left, elementOffset, false);
          this.setElementPositionHorizontal(this.arrows.right, elementOffset, true);
        }
      }

      if (this.options.vertical && this.fades.top) {
        this.setElementPositionVertical(this.fades.top, elementOffset, false);
        this.setElementPositionVertical(this.fades.bottom, elementOffset, true);

        if (this.arrows) {
          this.setElementPositionVertical(this.arrows.top, elementOffset, false);
          this.setElementPositionVertical(this.arrows.bottom, elementOffset, true);
        }
      }
    }
  }, {
    key: 'setElementPositionHorizontal',
    value: function setElementPositionHorizontal(element, elementOffset, includeOffset) {
      var offset = includeOffset ? this.elementWidth + 'px - ' + this.options.fadeWidth : '0px';

      element.style.left = 'calc(' + elementOffset.left + 'px + ' + offset + ')';
      element.style.top = elementOffset.top + 'px';
      element.style.height = this.elementHeight + 'px';
    }
  }, {
    key: 'setElementPositionVertical',
    value: function setElementPositionVertical(element, elementOffset, includeOffset) {
      var offset = includeOffset ? this.elementHeight + 'px - ' + this.options.fadeWidth : '0px';

      element.style.left = elementOffset.left + 'px';
      element.style.top = 'calc(' + elementOffset.top + 'px + ' + offset + ')';
      element.style.width = this.elementWidth + 'px';
    }

    /**
     * Add the directions (top, right, bottom, left) which match the options.
     **/

  }, {
    key: 'setDirections',
    value: function setDirections() {
      this.directions = [];

      if (this.options.horizontal && this.shouldInitHorizontal()) {
        this.initHorizontal = true;
        this.directions.push('left', 'right');
      }

      if (this.options.vertical && this.shouldInitVertical()) {
        this.initVertical = true;
        this.directions.push('top', 'bottom');
      }
    }

    /**
     * Calls the feature hooks for the supplied lifecycle method.
     **/

  }, {
    key: 'hook',
    value: function hook(method) {
      var _this6 = this;

      this.options.features.forEach(function (feature) {
        return feature[method] ? feature[method](_this6) : 0;
      });
    }
  }]);

  return Common;
}();

exports.default = Common;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Returns the width and height of a DOM element using getBoundingClientRect
 * and subtracting the margins.
 **/
exports.default = function (element) {
  var boundingClientRect = element.getBoundingClientRect();
  var computedStyles = window.getComputedStyle(element);
  var bounds = {
    width: boundingClientRect.width,
    height: boundingClientRect.height
  };

  bounds.width -= parseInt(computedStyles.marginLeft) + parseInt(computedStyles.marginRight);
  bounds.height -= parseInt(computedStyles.marginTop) + parseInt(computedStyles.marginBottom);

  return bounds;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Block2 = __webpack_require__(6);

var _Block3 = _interopRequireDefault(_Block2);

var _addClass = __webpack_require__(1);

var _addClass2 = _interopRequireDefault(_addClass);

var _classNames = __webpack_require__(7);

var _classNames2 = _interopRequireDefault(_classNames);

__webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Block) {
  _inherits(Table, _Block);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
  }

  _createClass(Table, [{
    key: 'makeElementResponsive',
    value: function makeElementResponsive() {
      var parentElement = this.element.parentElement;
      var tagName = parentElement.tagName;

      if (tagName.toLowerCase() !== 'div') {
        this.addWrapper(parentElement);
      } else {
        (0, _addClass2.default)(parentElement, _classNames2.default.tableWrapper);
        this.scrollableElement = parentElement;
        this.parent = parentElement.parentElement;
      }
    }
  }, {
    key: 'addWrapper',
    value: function addWrapper(parentElement) {
      var wrapper = document.createElement('div');
      parentElement.replaceChild(wrapper, this.element);
      wrapper.className = _classNames2.default.tableWrapper;
      wrapper.appendChild(this.element);
      this.scrollableElement = wrapper;
      this.parent = wrapper.parentElement;
    }
  }]);

  return Table;
}(_Block3.default);

exports.default = Table;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Common2 = __webpack_require__(3);

var _Common3 = _interopRequireDefault(_Common2);

var _getSize = __webpack_require__(4);

var _getSize2 = _interopRequireDefault(_getSize);

__webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block = function (_Common) {
  _inherits(Block, _Common);

  function Block(element, options) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, element, options));

    _this.init();
    return _this;
  }

  _createClass(Block, [{
    key: 'shouldInitHorizontal',
    value: function shouldInitHorizontal() {
      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);

      this.elementWidth = scrollElementSize.width;

      this.elementFullWidth = this.element.scrollWidth;

      if (this.options.horizontal) {
        return this.elementFullWidth > this.elementWidth;
      }
    }
  }, {
    key: 'shouldInitVertical',
    value: function shouldInitVertical() {
      var scrollElementSize = (0, _getSize2.default)(this.element);

      this.elementHeight = scrollElementSize.height;

      this.elementFullHeight = this.element.scrollHeight;

      if (this.options.vertical) {
        return this.elementFullHeight > this.elementHeight;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.scrollableElement.removeEventListener('scroll', this.scrollFunction);
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'makeElementResponsive',
    value: function makeElementResponsive() {
      this.scrollableElement = this.element;
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'makeElementResponsive', this).call(this);
    }
  }, {
    key: 'registerListeners',
    value: function registerListeners() {
      this.scrollableElement.addEventListener('scroll', this.scrollFunction);
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'registerListeners', this).call(this);
    }

    /**
     * Scroll left of right after a click.
     **/

  }, {
    key: 'clickHorizontal',
    value: function clickHorizontal(direction) {
      var scrollLeft = this.scrollableElement.scrollLeft;
      var containerLength = this.elementVisibleWidth;

      var scrollLength = containerLength / this.options.scrollDenominator;

      if (direction === 'right') {
        this.scrollableElement.scrollLeft = scrollLeft + scrollLength;
      } else {
        this.scrollableElement.scrollLeft = scrollLeft - scrollLength;
      }
    }

    /**
     * Scroll to top or bottom after a click.
     **/

  }, {
    key: 'clickVertical',
    value: function clickVertical(direction) {
      var scrollTop = this.element.scrollTop;
      var containerLength = this.elementVisibleHeight;

      var scrollLength = containerLength / this.options.scrollDenominator;

      if (direction === 'bottom') {
        this.element.scrollTop = scrollTop + scrollLength;
      } else {
        this.element.scrollTop = scrollTop - scrollLength;
      }
    }

    /**
     * Adapts the visibility of the horizontal elements after a scroll.
     **/

  }, {
    key: 'scrollHorizontal',
    value: function scrollHorizontal() {
      var scrollLeft = this.scrollableElement.scrollLeft;
      var atStart = scrollLeft < this.options.fadeOffset;
      var atEnd = this.elementVisibleWidth + scrollLeft + this.options.fadeOffset > this.elementFullWidth;

      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'scrollHorizontal', this).call(this, atStart, atEnd);
    }

    /**
     * Adapts the visibility of the vertical elements after a scroll.
     **/

  }, {
    key: 'scrollVertical',
    value: function scrollVertical() {
      var scrollTop = this.scrollableElement.scrollTop;
      var atStart = scrollTop < this.options.fadeOffset;
      var atEnd = this.elementVisibleHeight + scrollTop + this.options.fadeOffset > this.elementFullHeight;

      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'scrollVertical', this).call(this, atStart, atEnd);
    }

    /**
     * On page resize we need to adapt the container measurements.
     **/

  }, {
    key: 'resize',
    value: function resize() {
      var scrollElementBounds = this.scrollableElement.getBoundingClientRect();

      this.elementFullWidth = Math.max(scrollElementBounds.width, this.scrollableElement.scrollWidth);
      this.elementFullHeight = Math.max(scrollElementBounds.height, this.scrollableElement.scrollHeight);

      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'resize', this).call(this);
    }
  }]);

  return Block;
}(_Common3.default);

exports.default = Block;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  classPrefix: 'idc-',
  elementClass: 'idc-element',
  'fade-top': 'idc-fade-top',
  'fade-right': 'idc-fade-right',
  'fade-bottom': 'idc-fade-bottom',
  'fade-left': 'idc-fade-left',
  'arrow-top': 'idc-arrow-top',
  'arrow-right': 'idc-arrow-right',
  'arrow-bottom': 'idc-arrow-bottom',
  'arrow-left': 'idc-arrow-left',
  tableWrapper: 'idc-table-wrapper'
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Options = __webpack_require__(9);

var _Options2 = _interopRequireDefault(_Options);

var _Block = __webpack_require__(6);

var _Block2 = _interopRequireDefault(_Block);

var _IFrame = __webpack_require__(25);

var _IFrame2 = _interopRequireDefault(_IFrame);

var _IFrameCrossOrigin = __webpack_require__(29);

var _IFrameCrossOrigin2 = _interopRequireDefault(_IFrameCrossOrigin);

var _Table = __webpack_require__(5);

var _Table2 = _interopRequireDefault(_Table);

var _isCrossOriginIframe = __webpack_require__(30);

var _isCrossOriginIframe2 = _interopRequireDefault(_isCrossOriginIframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * indicate - Scroll Indicator Plugin
 *
 * Adds horizontal fade effect to block elements, tables and iframes.
 * Intended to let the user know that there is more content so see than
 * currently fits into the visible part.
 *
 * @author Matthias Giger <matthias.giger@namics.com>
 */
var Indicate = function () {
  function Indicate(targetElements, options) {
    _classCallCheck(this, Indicate);

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      options = {};
    }

    this.targetElements = targetElements;
    this.instances = [];
    this.options = new _Options2.default(options);

    this.init();
  }

  /**
   * Initializes the instances depending on whether it's a single element or
   * an array of nodes.
   */


  _createClass(Indicate, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var elements = this.targetElements;

      if (elements) {
        if (elements.length) {
          [].map.call(elements, function (element) {
            return _this.createInstanceForElement(element);
          });
        } else {
          this.createInstanceForElement(elements);
        }
      }
    }
  }, {
    key: 'update',
    value: function update(newOptions) {
      var _this2 = this;

      this.options.update(newOptions);
      this.instances.forEach(function (instance) {
        return instance.update(_this2.options);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.instances.forEach(function (instance) {
        return instance.destroy();
      });
    }

    /**
     * Creates an instance of the appropriate class depending on the elements tag.
     */

  }, {
    key: 'createInstanceForElement',
    value: function createInstanceForElement(element) {
      var tagName = String(element.tagName).toLowerCase();

      switch (tagName) {
        case 'iframe':
          this.instances.push(this.getIframeInstance(element));
          break;
        case 'table':
          this.instances.push(new _Table2.default(element, this.options));
          break;
        default:
          this.instances.push(new _Block2.default(element, this.options));
      }
    }

    /**
     * Checks if the iframe is same or cross origin and returns the appropriate
     * instance.
     **/

  }, {
    key: 'getIframeInstance',
    value: function getIframeInstance(element) {
      if ((0, _isCrossOriginIframe2.default)(element)) {
        return new _IFrameCrossOrigin2.default(element, this.options);
      }

      return new _IFrame2.default(element, this.options);
    }
  }]);

  return Indicate;
}();

exports.default = Indicate;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6ObjectAssign = __webpack_require__(10);

var _index = __webpack_require__(11);

var features = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  // Clicking on the arrow will scroll (1 / value) of the currently visible width.
  scrollDenominator: 2,
  // The fade effect color.
  color: '#FFFFFF',
  // Should arrows be show.
  arrows: true,
  // Defines where the arrows should be positioned inside the fade effect.
  // Can be set to 'cetner', 'start' or 'end'.
  arrowPosition: 'center',
  // The face effec's width.
  fadeWidth: '20px',
  // This far away from the scroll end the effect will be removed.
  fadeOffset: 5,
  // By default horizontal scrollling is enabled.
  horizontal: true,
  // Additionally the effect can also be applied vertically.
  vertical: true,
  // Set the max-height of the wrapper.
  maxHeight: 'none'
};

var Options = function () {
  function Options(options) {
    _classCallCheck(this, Options);

    (0, _es6ObjectAssign.assign)(this, (0, _es6ObjectAssign.assign)({}, defaultOptions, options));
    this.checkFeatures();
    this.initializeFeatures();
  }

  _createClass(Options, [{
    key: 'update',
    value: function update(newOptions) {
      (0, _es6ObjectAssign.assign)(this, (0, _es6ObjectAssign.assign)({}, this, newOptions));
      this.checkFeatures();
      this.initializeFeatures();
    }

    /**
     * Checks which features are applicable and returns only those.
     **/

  }, {
    key: 'checkFeatures',
    value: function checkFeatures() {
      var _this = this;

      var featuresArray = Object.keys(features).map(function (key) {
        return features[key];
      });
      this.features = featuresArray.filter(function (feature) {
        return feature.check(_this);
      });
    }

    /**
     * Initializes the feature inststances.
     **/

  }, {
    key: 'initializeFeatures',
    value: function initializeFeatures() {
      var _this2 = this;

      this.features = this.features.map(function (Feature) {
        return new Feature(_this2);
      });
    }
  }]);

  return Options;
}();

exports.default = Options;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Color = __webpack_require__(12);

Object.defineProperty(exports, 'Color', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Color).default;
  }
});

var _ArrowPosition = __webpack_require__(13);

Object.defineProperty(exports, 'ArrowPosition', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ArrowPosition).default;
  }
});

var _ArrowUrl = __webpack_require__(14);

Object.defineProperty(exports, 'ArrowUrl', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ArrowUrl).default;
  }
});

var _ArrowMarkup = __webpack_require__(15);

Object.defineProperty(exports, 'ArrowMarkup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ArrowMarkup).default;
  }
});

var _FadeWidth = __webpack_require__(16);

Object.defineProperty(exports, 'FadeWidth', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FadeWidth).default;
  }
});

var _MaxHeight = __webpack_require__(17);

Object.defineProperty(exports, 'MaxHeight', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MaxHeight).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Feature2 = __webpack_require__(0);

var _Feature3 = _interopRequireDefault(_Feature2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets the fade color.
 **/
var Color = function (_Feature) {
  _inherits(Color, _Feature);

  function Color() {
    _classCallCheck(this, Color);

    return _possibleConstructorReturn(this, (Color.__proto__ || Object.getPrototypeOf(Color)).apply(this, arguments));
  }

  _createClass(Color, [{
    key: 'create',
    value: function create(instance) {
      this.setFadeColor(instance);
    }
  }, {
    key: 'update',
    value: function update(instance) {
      this.setFadeColor(instance);
    }
  }, {
    key: 'setFadeColor',
    value: function setFadeColor(instance) {
      var color = this.options.color;

      instance.directions.map(function (direction) {
        instance.fades[direction].style.background = 'linear-gradient(to ' + direction + ', rgba(255,255,255,0) 0%, ' + color + ' 100%)';
      });
    }
  }], [{
    key: 'check',
    value: function check(options) {
      return options.color !== '#FFFFFF';
    }
  }]);

  return Color;
}(_Feature3.default);

exports.default = Color;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Arrow2 = __webpack_require__(2);

var _Arrow3 = _interopRequireDefault(_Arrow2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets a special arrow position, default is center.
 **/
var ArrowPosition = function (_Arrow) {
  _inherits(ArrowPosition, _Arrow);

  function ArrowPosition() {
    _classCallCheck(this, ArrowPosition);

    return _possibleConstructorReturn(this, (ArrowPosition.__proto__ || Object.getPrototypeOf(ArrowPosition)).apply(this, arguments));
  }

  _createClass(ArrowPosition, [{
    key: 'create',
    value: function create(instance) {
      this.setArrowPosition(instance);
    }
  }, {
    key: 'update',
    value: function update(instance) {
      this.setArrowPosition(instance);
    }
  }], [{
    key: 'check',
    value: function check(options) {
      return options.arrowPosition !== 'center';
    }
  }]);

  return ArrowPosition;
}(_Arrow3.default);

exports.default = ArrowPosition;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Arrow2 = __webpack_require__(2);

var _Arrow3 = _interopRequireDefault(_Arrow2);

var _addClass = __webpack_require__(1);

var _addClass2 = _interopRequireDefault(_addClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Uses the provided url as a background image for the arrows.
 * The left one is expected, the others will be generated by rotation.
 **/
var ArrowUrl = function (_Arrow) {
  _inherits(ArrowUrl, _Arrow);

  function ArrowUrl() {
    _classCallCheck(this, ArrowUrl);

    return _possibleConstructorReturn(this, (ArrowUrl.__proto__ || Object.getPrototypeOf(ArrowUrl)).apply(this, arguments));
  }

  _createClass(ArrowUrl, [{
    key: 'create',
    value: function create(instance) {
      this.setArrowUrl(instance);
    }
  }, {
    key: 'update',
    value: function update(instance) {
      this.setArrowUrl(instance);
    }
  }, {
    key: 'setArrowUrl',
    value: function setArrowUrl(instance) {
      var _this2 = this;

      var arrowUrl = this.options.arrowUrl;

      instance.directions.map(function (direction) {
        var arrow = instance.arrows[direction];
        arrow.style.backgroundImage = 'url(' + arrowUrl + ')';
        arrow.style.backgroundRepeat = 'no-repeat';
        arrow.style.backgroundSize = 'contain';

        _this2.setArrowRotation(arrow, direction);
        _this2.setArrowBackgroundPosition(arrow, direction);

        // This will remove the default before element.
        (0, _addClass2.default)(arrow, 'idc-no-before');
      });
    }

    // Arrow position for vertical direction is always center.

  }, {
    key: 'setArrowBackgroundPosition',
    value: function setArrowBackgroundPosition(arrow, direction) {
      var arrowPosition = this.options.arrowPosition;

      if (arrowPosition === 'center' || direction === 'top' || direction === 'bottom') {
        arrow.style.backgroundPosition = 'center';
        return;
      }

      if (arrowPosition === 'start' || arrowPosition === 'top') {
        if (direction === 'left') {
          arrow.style.backgroundPosition = 'top';
          return;
        }
        // Because arrows are generated by rotation these have to be switched for right
        arrow.style.backgroundPosition = 'bottom';
        return;
      }

      if (arrowPosition === 'end' || arrowPosition === 'bottom') {
        if (direction === 'left') {
          arrow.style.backgroundPosition = 'bottom';
          return;
        }
        arrow.style.backgroundPosition = 'top';
      }
    }
  }], [{
    key: 'check',
    value: function check(options) {
      return Boolean(options.arrowUrl);
    }
  }]);

  return ArrowUrl;
}(_Arrow3.default);

exports.default = ArrowUrl;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Arrow2 = __webpack_require__(2);

var _Arrow3 = _interopRequireDefault(_Arrow2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Uses the provided markup as the image for the arrows.
* The left one is expected, the others will be generated by rotation.
 **/
var ArrowMarkup = function (_Arrow) {
  _inherits(ArrowMarkup, _Arrow);

  function ArrowMarkup() {
    _classCallCheck(this, ArrowMarkup);

    return _possibleConstructorReturn(this, (ArrowMarkup.__proto__ || Object.getPrototypeOf(ArrowMarkup)).apply(this, arguments));
  }

  _createClass(ArrowMarkup, [{
    key: 'create',
    value: function create(instance) {
      this.setArrowMarkup(instance);
    }
  }, {
    key: 'update',
    value: function update(instance) {
      this.setArrowMarkup(instance);
    }
  }, {
    key: 'setArrowMarkup',
    value: function setArrowMarkup(instance) {
      var _this2 = this;

      var arrowMarkup = this.options.arrowMarkup;

      instance.directions.map(function (direction) {
        var arrow = instance.arrows[direction];

        arrow.innerHTML = arrowMarkup;

        var markupNode = arrow.childNodes[0];

        _this2.setArrowRotation(markupNode, direction);
        _this2.setMarkupSize(markupNode);
        _this2.hideDefaultArrows(arrow);
      });

      this.setArrowPosition(instance);
    }
  }, {
    key: 'setMarkupSize',
    value: function setMarkupSize(markupNode) {
      var fadeWidth = this.options.fadeWidth;

      markupNode.style.width = fadeWidth;
      markupNode.style.height = fadeWidth;
    }
  }], [{
    key: 'check',
    value: function check(options) {
      return Boolean(options.arrowMarkup);
    }
  }]);

  return ArrowMarkup;
}(_Arrow3.default);

exports.default = ArrowMarkup;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Feature2 = __webpack_require__(0);

var _Feature3 = _interopRequireDefault(_Feature2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Adapts the fade width.
 **/
var FadeWidth = function (_Feature) {
  _inherits(FadeWidth, _Feature);

  function FadeWidth() {
    _classCallCheck(this, FadeWidth);

    return _possibleConstructorReturn(this, (FadeWidth.__proto__ || Object.getPrototypeOf(FadeWidth)).apply(this, arguments));
  }

  _createClass(FadeWidth, [{
    key: 'create',
    value: function create(instance) {
      this.setFadeWidth(instance);
    }
  }, {
    key: 'update',
    value: function update(instance) {
      this.setFadeWidth(instance);
    }
  }, {
    key: 'setFadeWidth',
    value: function setFadeWidth(instance) {
      var _this2 = this;

      instance.directions.map(function (direction) {
        if (direction === 'left' || direction === 'right') {
          instance.fades[direction].style.width = _this2.options.fadeWidth;
          if (instance.arrows) {
            instance.arrows[direction].style.width = _this2.options.fadeWidth;
          }
        }
        if (direction === 'top' || direction === 'bottom') {
          instance.fades[direction].style.height = _this2.options.fadeWidth;
          if (instance.arrows) {
            instance.arrows[direction].style.height = _this2.options.fadeWidth;
          }
        }
      });
    }
  }], [{
    key: 'check',
    value: function check(options) {
      return options.fadeWidth !== '20px';
    }
  }]);

  return FadeWidth;
}(_Feature3.default);

exports.default = FadeWidth;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Feature2 = __webpack_require__(0);

var _Feature3 = _interopRequireDefault(_Feature2);

var _Table = __webpack_require__(5);

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets the max height for a table wrapper.
 **/
var MaxHeight = function (_Feature) {
  _inherits(MaxHeight, _Feature);

  function MaxHeight() {
    _classCallCheck(this, MaxHeight);

    return _possibleConstructorReturn(this, (MaxHeight.__proto__ || Object.getPrototypeOf(MaxHeight)).apply(this, arguments));
  }

  _createClass(MaxHeight, [{
    key: 'create',
    value: function create(instance) {
      this.setMaxHeight(instance);
    }
  }, {
    key: 'update',
    value: function update(instance) {
      this.setMaxHeight(instance);
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight(instance) {
      if (instance instanceof _Table2.default) {
        instance.scrollableElement.style.maxHeight = this.options.maxHeight;
      }
    }
  }], [{
    key: 'check',
    value: function check(options) {
      return options.maxHeight !== 'none';
    }
  }]);

  return MaxHeight;
}(_Feature3.default);

exports.default = MaxHeight;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, selector) {
  element.className = element.className.replace(new RegExp('(?:^|\\s)' + selector + '(?:\\s|$)'), ' ');
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Gets the absolute position of the element.
 * Margins will be subtracted.
 **/
exports.default = function (element) {
  var oTop = element.offsetTop + parseInt(window.getComputedStyle(element).marginTop);
  var oLeft = element.offsetLeft + parseInt(window.getComputedStyle(element).marginLeft);

  var _x = 0;
  var _y = 0;
  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    _x += element.offsetLeft + parseInt(window.getComputedStyle(element).marginLeft);
    _y += element.offsetTop + parseInt(window.getComputedStyle(element).marginTop);
    element = element.offsetParent;
  }

  if (oTop !== _y || oLeft !== _x) {
    return {
      top: oTop,
      left: oLeft
    };
  }

  return { top: _y, left: _x };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Common2 = __webpack_require__(3);

var _Common3 = _interopRequireDefault(_Common2);

var _getSize = __webpack_require__(4);

var _getSize2 = _interopRequireDefault(_getSize);

var _getIframeScrollPosition = __webpack_require__(26);

var _getIframeScrollPosition2 = _interopRequireDefault(_getIframeScrollPosition);

var _getIframeContentDocument = __webpack_require__(27);

var _getIframeContentDocument2 = _interopRequireDefault(_getIframeContentDocument);

__webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IFrame = function (_Common) {
  _inherits(IFrame, _Common);

  function IFrame(element, options) {
    _classCallCheck(this, IFrame);

    var _this = _possibleConstructorReturn(this, (IFrame.__proto__ || Object.getPrototypeOf(IFrame)).call(this, element, options));

    _this.connectIframe();
    return _this;
  }

  _createClass(IFrame, [{
    key: 'connectIframe',
    value: function connectIframe() {
      this.scrollableElement = this.element;
      this.checkIfIframeContentsAvailable();
    }
  }, {
    key: 'shouldInitHorizontal',
    value: function shouldInitHorizontal() {
      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);

      this.elementWidth = scrollElementSize.width;
      this.elementFullWidth = this.contentDocument.body.scrollWidth;

      if (this.options.horizontal) {
        return this.elementFullWidth > this.elementWidth;
      }
    }
  }, {
    key: 'shouldInitVertical',
    value: function shouldInitVertical() {
      var scrollElementSize = (0, _getSize2.default)(this.scrollableElement);

      this.elementWidth = scrollElementSize.height;
      this.elementFullHeight = this.contentDocument.body.scrollHeight;

      if (this.options.vertical) {
        return this.elementFullHeight > this.elementHeight;
      }
    }

    /**
     * In order to get the actual parameters of the iframe contents we have to
     * check if it has already finished loading.
     **/

  }, {
    key: 'checkIfIframeContentsAvailable',
    value: function checkIfIframeContentsAvailable() {
      this.contentDocument = (0, _getIframeContentDocument2.default)(this);

      if (!this.contentDocument.readyState !== 'complete') {
        return this.delayUntilContentsAreLoaded();
      }

      this.setIframeReferences();
    }

    /**
     * Delays execution until the contentLoaded listener is called.
     **/

  }, {
    key: 'delayUntilContentsAreLoaded',
    value: function delayUntilContentsAreLoaded(callback) {
      var _this2 = this;

      if (this.contentDocument.readyState !== 'complete') {
        return setTimeout(function () {
          return _this2.delayUntilContentsAreLoaded();
        }, 300);
      }

      this.setIframeReferences();
    }

    /**
     * Sets a reference to the iframe content element, once it's loaded.
     **/

  }, {
    key: 'setIframeReferences',
    value: function setIframeReferences() {
      this.contentDocument = (0, _getIframeContentDocument2.default)(this);
      this.init();
    }
  }, {
    key: 'registerListeners',
    value: function registerListeners() {
      this.contentDocument.addEventListener('scroll', this.scrollFunction);
      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'registerListeners', this).call(this);
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.elementFullWidth = this.contentDocument.body.scrollWidth;
      this.elementFullHeight = this.contentDocument.body.scrollHeight;

      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'resize', this).call(this);
    }
  }, {
    key: 'scrollHorizontal',
    value: function scrollHorizontal() {
      var scrollLeft = (0, _getIframeScrollPosition2.default)(this.contentDocument, 'scrollLeft');
      var atStart = scrollLeft < this.options.fadeOffset;
      var atEnd = this.elementVisibleWidth + scrollLeft + this.options.fadeOffset > this.elementFullWidth;

      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'scrollHorizontal', this).call(this, atStart, atEnd);
    }
  }, {
    key: 'scrollVertical',
    value: function scrollVertical() {
      var scrollTop = (0, _getIframeScrollPosition2.default)(this.contentDocument, 'scrollTop');
      var atStart = scrollTop < this.options.fadeOffset;
      var atEnd = this.elementVisibleHeight + scrollTop + this.options.fadeOffset > this.elementFullHeight;

      _get(IFrame.prototype.__proto__ || Object.getPrototypeOf(IFrame.prototype), 'scrollVertical', this).call(this, atStart, atEnd);
    }
  }, {
    key: 'clickHorizontal',
    value: function clickHorizontal() {
      //
    }
  }, {
    key: 'clickVertical',
    value: function clickVertical() {
      //
    }
  }]);

  return IFrame;
}(_Common3.default);

exports.default = IFrame;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScrollPosition;
/**
 * Returns the scroll position. Both properties are available, but the first
 * one is correct on Chrome and Firefox, while the second one matches
 * Safari.
 **/
function getScrollPosition(contentDocument, property) {
  return Math.max(contentDocument.documentElement[property], contentDocument.body[property]);
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContentDocument;
function getContentDocument(instance) {
  return instance.element.contentDocument;
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Common2 = __webpack_require__(3);

var _Common3 = _interopRequireDefault(_Common2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IFrameCrossOrigin = function (_Common) {
  _inherits(IFrameCrossOrigin, _Common);

  function IFrameCrossOrigin(element, options) {
    _classCallCheck(this, IFrameCrossOrigin);

    var _this = _possibleConstructorReturn(this, (IFrameCrossOrigin.__proto__ || Object.getPrototypeOf(IFrameCrossOrigin)).call(this, element, options));

    _this.scrollableElement = _this.element;
    _this.registerPostMessageListener();
    return _this;
  }

  _createClass(IFrameCrossOrigin, [{
    key: 'shouldInitHorizontal',
    value: function shouldInitHorizontal() {
      return this.elementFullWidth > this.elementVisibleWidth;
    }
  }, {
    key: 'shouldInitVertical',
    value: function shouldInitVertical() {
      return this.elementFullHeight > this.elementVisibleHeight;
    }
  }, {
    key: 'registerPostMessageListener',
    value: function registerPostMessageListener() {
      var _this2 = this;

      window.addEventListener('message', function (event) {
        if (!event.data || !event.data.indicate) {
          return;
        }
        _this2.getIframeMessage(event);
      }, false);
    }
  }, {
    key: 'getIframeMessage',
    value: function getIframeMessage(event) {
      var data = event.data;

      this.elementFullWidth = data.width;
      this.elementFullHeight = data.height;
      this.scrollLeft = data.offsetLeft;
      this.scrollTop = data.offsetTop;

      if (!data.initialized) {
        this.init();
      } else {
        this.scroll();
      }
    }
  }, {
    key: 'scrollHorizontal',
    value: function scrollHorizontal() {
      var atStart = this.scrollLeft < this.options.fadeOffset;
      var atEnd = this.elementVisibleWidth + this.scrollLeft + this.options.fadeOffset > this.elementFullWidth;

      _get(IFrameCrossOrigin.prototype.__proto__ || Object.getPrototypeOf(IFrameCrossOrigin.prototype), 'scrollHorizontal', this).call(this, atStart, atEnd);
    }
  }, {
    key: 'scrollVertical',
    value: function scrollVertical() {
      var atStart = this.scrollTop < this.options.fadeOffset;
      var atEnd = this.elementVisibleHeight + this.scrollTop + this.options.fadeOffset > this.elementFullHeight;

      _get(IFrameCrossOrigin.prototype.__proto__ || Object.getPrototypeOf(IFrameCrossOrigin.prototype), 'scrollVertical', this).call(this, atStart, atEnd);
    }
  }, {
    key: 'clickHorizontal',
    value: function clickHorizontal() {
      //
    }
  }, {
    key: 'clickVertial',
    value: function clickVertial() {
      //
    }
  }]);

  return IFrameCrossOrigin;
}(_Common3.default);

exports.default = IFrameCrossOrigin;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Returns the protocol of a domain.
var extractProtocol = function extractProtocol(domain) {
  return domain.split('/')[0];
};

// Returns the subdomain of a domain.
var extractSubdomain = function extractSubdomain(domain) {
  return domain.split('/')[2];
};

// Extracts the domain name of a subdomain.
var extractDomainName = function extractDomainName(subdomain) {
  // TODO does not work for ip addresses
  var arr = subdomain.split('.');
  return arr[arr.length - 2] + '.' + arr[arr.length - 1];
};

var isExternal = function isExternal(subdomainIframe) {
  var domainName = extractDomainName(subdomainIframe);

  if (document.domain !== domainName) {
    // Not a subdomain
    return true;
  }

  // It's a subdomain, adapt domain to allow accessing contents
  document.domain = domainName;
  return false;
};

var isDifferentDomain = function isDifferentDomain(url) {
  var protocolIframe = extractProtocol(url);
  var subdomainIframe = extractSubdomain(url);

  if (window.location.protocol !== protocolIframe || window.location.host !== subdomainIframe) {
    return isExternal(subdomainIframe);
  }

  return false;
};

exports.default = function (element) {
  var url = element.getAttribute('src');
  return isDifferentDomain(url);
};

/***/ })
/******/ ])["default"];
});