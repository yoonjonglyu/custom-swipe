"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
Object.defineProperty(exports, "useSwipe", {
  enumerable: true,
  get: function get() {
    return _useSwipe["default"];
  }
});

var _useSwipe = _interopRequireDefault(require("./lib/useSwipe"));

var _Swipe = _interopRequireDefault(require("./lib/Swipe"));

var _default = _Swipe["default"];
exports["default"] = _default;