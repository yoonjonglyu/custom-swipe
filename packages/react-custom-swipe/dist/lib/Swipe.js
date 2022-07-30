"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _useSwipe = _interopRequireDefault(require("./useSwipe"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Swipe = function Swipe(_ref) {
  var containerProps = _ref.containerProps,
      itemProps = _ref.itemProps,
      item = _ref.item;
  var ref = /*#__PURE__*/(0, _react.createRef)();
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    className: "swipe-container"
  }, containerProps, {
    style: _objectSpread({
      position: 'relative',
      display: 'flex',
      padding: 0,
      overflow: 'hidden',
      zIndex: 1
    }, containerProps === null || containerProps === void 0 ? void 0 : containerProps.style)
  }), /*#__PURE__*/_react["default"].createElement("ul", (0, _extends2["default"])({
    className: "swipe-wrap",
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      width: '100%',
      height: '100%',
      margin: '0 auto',
      padding: 0,
      listStyle: 'none',
      transitionProperty: 'transform',
      boxSizing: 'content-box'
    },
    ref: ref
  }, (0, _useSwipe["default"])(ref, item.length)), item.map(function (item, key) {
    return /*#__PURE__*/_react["default"].createElement("li", (0, _extends2["default"])({
      key: key,
      className: "swipe-item"
    }, itemProps, {
      style: _objectSpread({
        position: 'relative',
        flexShrink: 0,
        width: '100%',
        height: '100%',
        textAlign: 'center'
      }, itemProps === null || itemProps === void 0 ? void 0 : itemProps.style)
    }), item);
  })));
};

var _default = Swipe;
exports["default"] = _default;