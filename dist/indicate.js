/**
 * indicate 1.0.0
 * 
 * Indicate Plugin
 * 
 * License: MIT
 * Author: Matthias Giger
 * Repository: https://github.com/naminho/indicate
 */

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Indicate = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Regular = function Regular() {
    _classCallCheck(this, Regular);

    console.log('Regular constructor');
  };

  var IFrame = function (_Regular) {
    _inherits(IFrame, _Regular);

    function IFrame() {
      _classCallCheck(this, IFrame);

      var _this = _possibleConstructorReturn(this, (IFrame.__proto__ || Object.getPrototypeOf(IFrame)).call(this));

      console.log('Iframe constructor');
      return _this;
    }

    return IFrame;
  }(Regular);

  var Table = function (_Regular2) {
    _inherits(Table, _Regular2);

    function Table() {
      _classCallCheck(this, Table);

      var _this2 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this));

      console.log('Table constructor');
      return _this2;
    }

    return Table;
  }(Regular);

  var Indicate = exports.Indicate = function () {
    function Indicate(targetElements, options) {
      _classCallCheck(this, Indicate);

      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
        options = {};
      }

      console.log('element', targetElements, typeof targetElements === 'undefined' ? 'undefined' : _typeof(targetElements));

      this.targetElements = targetElements;
      this.instances = [];
      this.options = options;

      // TODO create several instances in case element is an array

      this.init();
      console.log('instances', this.instances);
    }

    /**
     * Initializes the instances depending on whether it's a single element or
     * an array of nodes.
     */


    _createClass(Indicate, [{
      key: 'init',
      value: function init() {
        var _this3 = this;

        var elements = this.targetElements;

        if (elements) {
          if (elements.length) {
            [].map.call(elements, function (element) {
              return _this3.createInstanceForElement(element);
            });
          } else {
            this.createInstanceForElement(elements);
          }
        }
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
            this.instances.push(new IFrame());
            break;
          case 'table':
            this.instances.push(new Table());
          default:
            this.instances.push(new Regular());
        }
      }
    }]);

    return Indicate;
  }();
});