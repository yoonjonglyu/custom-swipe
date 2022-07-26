import React from 'react';

export default function SwipeEvents(
  Container: React.RefObject<HTMLElement>,
  itemLength: number,
) {
  let isSwipe = false;
  let initOffset = 0;
  let currentStep = 0;
  let currentOffset = 0;
  let swipeTime = 0;

  /**
   * @description 스와이프 기능(플립액션)과 리사이즈 관련 된 로직들
   */
  const handleStart = (e: Partial<TouchEvent & MouseEvent>) => {
    const x =
      e.type === 'touchstart' && e.targetTouches
        ? e.targetTouches[0].pageX
        : e.pageX || 0;
    initOffset = x;
    isSwipe = true;
    swipeTime = Date.now();
  };
  const handleMove = (e: Partial<TouchEvent & MouseEvent>) => {
    if (isSwipe) {
      const x =
        e.type === 'touchmove' && e.targetTouches
          ? e.targetTouches[0].pageX
          : e.pageX || 0;

      const offset = x - initOffset - currentOffset;
      if (Container.current) {
        Container.current.style.transition = 'none';
        Container.current.style.transform = `translateX(${offset}px)`;
      }
    }
  };
  const handleEnd = (e: Partial<TouchEvent & MouseEvent>) => {
    if (isSwipe) {
      const x =
        e.type === 'touchend' && e.changedTouches
          ? e.changedTouches[0].pageX
          : e.pageX || 0;
      const viewport = e.target as any;
      const offset = initOffset - x;
      if (
        Math.abs(offset) >= viewport.clientWidth / 2 ||
        Date.now() - swipeTime < 200
      ) {
        if (offset < 0 && currentStep > 0) {
          currentStep--;
          currentOffset = currentStep * viewport.clientWidth;
        } else if (offset > 0 && currentStep < itemLength - 1) {
          currentStep++;
          currentOffset = currentStep * viewport.clientWidth;
        }
      }
      if (Container.current) {
        Container.current.style.transition = '400ms';
        Container.current.style.transform = `translateX(-${currentOffset}px)`;
      }
      isSwipe = false;
      swipeTime = 0;
    }
  };
  const handleResize = (e: Event) => {
    const viewport = e.target as any;
    currentOffset = currentStep * viewport.innerWidth;
    if (Container.current) {
      Container.current.style.transition = 'none';
      Container.current.style.transform = `translateX(-${currentOffset}px)`;
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
    resize: (e: Event) => {
      handleResize(e);
    },
  };
}
