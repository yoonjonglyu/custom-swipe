"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSwipe;

var _events = _interopRequireDefault(require("./events"));

function useSwipe(dom, length, config) {
  var Events = (0, _events["default"])(dom, length, config);
  window.addEventListener('resize', Events.resize);
  setTimeout(function () {
    return Events.init();
  }, 0);
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