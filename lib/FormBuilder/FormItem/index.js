'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _builtInRules = require('./builtInRules');

var _builtInRules2 = _interopRequireDefault(_builtInRules);

var _validateItem = require('./validateItem');

var _validateItem2 = _interopRequireDefault(_validateItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var findBuiltInRules = function findBuiltInRules(rules) {
  var newRulesToState = [];

  rules.forEach(function(rule) {
    for (var key in rule) {
      _builtInRules2.default[key] &&
        newRulesToState.push(_builtInRules2.default[key].get(rule));
    }
  });

  return newRulesToState;
};

var computeRulesFromProps = function computeRulesFromProps(rules) {
  return findBuiltInRules(rules);
};

var FormItem = (function(_React$PureComponent) {
  _inherits(FormItem, _React$PureComponent);

  function FormItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormItem);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref =
          FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      _initialiseProps.call(_this),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(
    FormItem,
    [
      {
        key: 'render',
        value: function render() {
          var _props = this.props,
            children = _props.children,
            onChangeError = _props.onChangeError,
            _props$error = _props.error;
          _props$error = _props$error === undefined ? {} : _props$error;

          var message = _props$error.message,
            props = _objectWithoutProperties(_props, [
              'children',
              'onChangeError',
              'error',
            ]);

          return children(
            _extends({}, props, {
              onChange: this.onChange,
              required: this.state.required,
              error: message,
            })
          );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
          if (nextProps.rules !== prevState.mirroredRules) {
            return {
              mirroredRules: nextProps.rules,
              rules: computeRulesFromProps(nextProps.rules),
              required: nextProps.rules.find(function(_ref2) {
                var required = _ref2.required;
                return !!required;
              })
                ? true
                : false,
            };
          }

          return null;
        },
      },
    ]
  );

  return FormItem;
})(_react2.default.PureComponent);

FormItem.propTypes = {
  type: _propTypes2.default.string,
  validate: _propTypes2.default.func,
  error: _propTypes2.default.oneOfType([
    _propTypes2.default.object,
    _propTypes2.default.string,
  ]),
  rules: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  onChangeError: _propTypes2.default.func,
};
FormItem.defaultProps = {
  rules: [],
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {
    mirroredRules: [],
    rules: [],
    required: false,
  };

  this.validatorCallback = function(_ref3, error) {
    var type = _ref3.type;

    Promise.resolve().then(function() {
      return _this2.props.onChangeError({
        type: type,
        error: error,
      });
    });
  };

  this.onChange = function(value) {
    var _props2 = _this2.props,
      type = _props2.type,
      error = _props2.error;
    var _state = _this2.state,
      rules = _state.rules,
      mirroredRules = _state.mirroredRules;

    var updates = {
      value: value,
      type: type,
    };

    _this2.props.onChange(updates);
    (0, _validateItem2.default)({
      value: value,
      type: type,
      rules: rules,
      callback: function callback() {
        for (
          var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
          _key2 < _len2;
          _key2++
        ) {
          args[_key2] = arguments[_key2];
        }

        return _this2.validatorCallback.apply(
          _this2,
          [{ type: type }].concat(args)
        );
      },
      mirroredRules: mirroredRules,
      error: error,
      onChangeError: _this2.props.onChangeError,
    });
  };
};

exports.default = FormItem;