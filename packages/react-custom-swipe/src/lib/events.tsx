import React from 'react';

interface SwipeStateProps {
  isSwipe: boolean | null;
  startX: number;
  startY: number;
  currentX: number;
  currentStep: number;
  swipeTime: number;
}

export default function SwipeEvents(
  Container: React.RefObject<HTMLElement>,
  itemLength: number,
) {
  const swipeState = {
    isSwipe: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentStep: 0,
    swipeTime: 0,
  } as SwipeStateProps;

  /**
   * @description 스와이프 기능(플립액션)과 리사이즈 관련 된 로직들
   */
  const handleStart = (e: Partial<TouchEvent & MouseEvent>) => {
    if (swipeState.isSwipe === false) {
      const x =
        e.type === 'touchstart' && e.targetTouches
          ? e.targetTouches[0].pageX
          : e.pageX || 0;
      const y =
        e.type === 'touchstart' && e.targetTouches
          ? e.targetTouches[0].pageY
          : e.pageY || 0;
      swipeState.startX = x;
      swipeState.startY = y;
      swipeState.isSwipe = true;
      swipeState.swipeTime = Date.now();
    }
  };
  const handleMove = (e: Partial<TouchEvent & MouseEvent>) => {
    if (swipeState.isSwipe && Container.current !== null) {
      const x =
        e.type === 'touchmove' && e.targetTouches
          ? e.targetTouches[0].pageX
          : e.pageX || 0;
      const y =
        e.type === 'touchmove' && e.targetTouches
          ? e.targetTouches[0].pageY
          : e.pageY || 0;
      const offset = x - swipeState.startX - swipeState.currentX;
      if (Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)) {
        Container.current.style.transition = 'none';
        Container.current.style.transform = `translateX(${offset}px)`;
      }
    }
  };
  const handleEnd = (e: Partial<TouchEvent & MouseEvent>) => {
    if (swipeState.isSwipe && Container.current !== null) {
      const x =
        e.type === 'touchend' && e.changedTouches
          ? e.changedTouches[0].pageX
          : e.pageX || 0;
      const y =
        e.type === 'touchend' && e.changedTouches
          ? e.changedTouches[0].pageY
          : e.pageY || 0;
      const offset = swipeState.startX - x;

      if (
        (Math.abs(offset) >= Container.current.clientWidth / 2 ||
          Date.now() - swipeState.swipeTime < 200) &&
        Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)
      ) {
        if (offset < 0 && swipeState.currentStep > 0) swipeState.currentStep--;
        else if (offset > 0 && swipeState.currentStep < itemLength - 1)
          swipeState.currentStep++;
      }
      swipeState.isSwipe = null;
      swipeState.swipeTime = 0;
      swipeState.currentX =
        swipeState.currentStep *
        parseFloat(getComputedStyle(Container.current).width);
      Container.current.style.transition = '333ms';
      Container.current.style.transform = `translateX(-${swipeState.currentX}px)`;
      setTimeout(() => (swipeState.isSwipe = false), 333);
    }
  };
  const handleResize = () => {
    if (Container.current !== null) {
      swipeState.currentX =
        swipeState.currentStep *
        parseFloat(getComputedStyle(Container.current).width);
      Container.current.style.transition = 'none';
      Container.current.style.transform = `translateX(-${swipeState.currentX}px)`;
    }
  };

  return {
    desktopStart: (e: MouseEvent) => {
      !/iPhone|iPad|Android/g.test(navigator.userAgent) && handleStart(e);
    },
    desktopMove: (e: MouseEvent) => {
      !/iPhone|iPad|Android/g.test(navigator.userAgent) && handleMove(e);
    },
    desktopEnd: (e: MouseEvent) => {
      !/iPhone|iPad|Android/g.test(navigator.userAgent) && handleEnd(e);
    },
    mobileStart: (e: TouchEvent) => {
      handleStart(e);
    },
    mobileMove: (e: TouchEvent) => {
      handleMove(e);
    },
    mobileEnd: (e: TouchEvent) => {
      handleEnd(e);
    },
    resize: () => {
      handleResize();
    },
  };
}
