"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSwipe;

var _events = _interopRequireDefault(require("./events"));

function useSwipe(dom, length) {
  var Events = (0, _events["default"])(dom, length);
  window.addEventListener('resize', Events.resize);
  return {
    onTouchStart: Events.mobileStart,
    onTouchMove: Events.mobileMove,
    onTouchEnd: Events.mobileEnd,
    onTouchCancel: Events.mobileEnd,
    onPointerDown: Events.desktopStart,
    onPointerMove: Events.desktopMove,
    onPointerUp: Events.desktopEnd,
    onPointerLeave: Events.desktopEnd,
    onPointerCancel: Events.desktopEnd
  };
}