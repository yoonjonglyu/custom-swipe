"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SwipeEvents;

var _uri = require("./uri");

function SwipeEvents(Container, itemLength) {
  var swipeState = {
    isSwipe: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentStep: 0,
    swipeTime: 0
  };
  /**
   * @description 스와이프 기능(플립액션)과 리사이즈 관련 된 로직들
   */

  var handleStart = function handleStart(e) {
    if (swipeState.isSwipe === false) {
      var x = e.type === 'touchstart' && e.targetTouches ? e.targetTouches[0].pageX : e.pageX || 0;
      var y = e.type === 'touchstart' && e.targetTouches ? e.targetTouches[0].pageY : e.pageY || 0;
      swipeState.startX = x;
      swipeState.startY = y;
      swipeState.isSwipe = true;
      swipeState.swipeTime = Date.now();
    }
  };

  var handleMove = function handleMove(e) {
    if (swipeState.isSwipe && Container.current !== null) {
      var x = e.type === 'touchmove' && e.targetTouches ? e.targetTouches[0].pageX : e.pageX || 0;
      var y = e.type === 'touchmove' && e.targetTouches ? e.targetTouches[0].pageY : e.pageY || 0;
      var offset = x - swipeState.startX - swipeState.currentX;

      if (Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)) {
        Container.current.style.transition = 'none';
        Container.current.style.transform = "translateX(".concat(offset, "px)");
      }
    }
  };

  var handleEnd = function handleEnd(e) {
    if (swipeState.isSwipe && Container.current !== null) {
      var x = e.type === 'touchend' && e.changedTouches ? e.changedTouches[0].pageX : e.pageX || 0;
      var y = e.type === 'touchend' && e.changedTouches ? e.changedTouches[0].pageY : e.pageY || 0;
      var offset = swipeState.startX - x;

      if ((Math.abs(offset) >= Container.current.clientWidth / 2 || Date.now() - swipeState.swipeTime < 200) && Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)) {
        if (offset < 0 && swipeState.currentStep > 0) swipeState.currentStep--;else if (offset > 0 && swipeState.currentStep < itemLength - 1) swipeState.currentStep++;
      }

      swipeState.isSwipe = null;
      swipeState.swipeTime = 0;
      swipeState.currentX = swipeState.currentStep * parseFloat(getComputedStyle(Container.current).width);
      Container.current.style.transition = '333ms';
      Container.current.style.transform = "translateX(-".concat(swipeState.currentX, "px)");
      handleHistory();
      setTimeout(function () {
        return swipeState.isSwipe = false;
      }, 333);
    }
  };

  var handleResize = function handleResize() {
    if (Container.current !== null) {
      swipeState.currentX = swipeState.currentStep * parseFloat(getComputedStyle(Container.current).width);
      Container.current.style.transition = 'none';
      Container.current.style.transform = "translateX(-".concat(swipeState.currentX, "px)");
    }
  };

  var handleInit = function handleInit() {
    var params = (0, _uri.getSearchParams)();

    if (params['index'] !== undefined) {
      swipeState.currentStep = parseInt(params['index']);
      handleResize();
    } else handleHistory();
  };

  var handleHistory = function handleHistory() {
    var params = (0, _uri.getSearchParams)();
    params['index'] = swipeState.currentStep.toString();
    (0, _uri.setHistory)(params);
  };

  return {
    desktopStart: function desktopStart(e) {
      !/iPhone|iPad|Android/g.test(navigator.userAgent) && handleStart(e);
    },
    desktopMove: function desktopMove(e) {
      !/iPhone|iPad|Android/g.test(navigator.userAgent) && handleMove(e);
    },
    desktopEnd: function desktopEnd(e) {
      !/iPhone|iPad|Android/g.test(navigator.userAgent) && handleEnd(e);
    },
    mobileStart: function mobileStart(e) {
      handleStart(e);
    },
    mobileMove: function mobileMove(e) {
      handleMove(e);
    },
    mobileEnd: function mobileEnd(e) {
      handleEnd(e);
    },
    resize: function resize() {
      handleResize();
    },
    init: function init() {
      return handleInit();
    }
  };
}