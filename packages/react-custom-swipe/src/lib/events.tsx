import React from 'react';
import { getSearchParams, setHistory, changeHistory } from './uri';
import SwipeState, { SwipeStateProps } from './core/state';

export interface ConfigProps {
  isHistory: boolean;
  paramName?: string;
  historyCallback?: (state: SwipeStateProps) => void;
}

export default function SwipeEvents(
  Container: React.RefObject<HTMLElement>,
  itemLength: number,
  config?: ConfigProps,
) {
  const swipeState = new SwipeState(itemLength);
  const index = config?.paramName ? config.paramName : 'index';

  const handleStart = (e: Partial<TouchEvent & MouseEvent>) => {
    if (swipeState.isSwipe === 'wait') {
      const x = e.targetTouches ? e.targetTouches[0].pageX : e.pageX || 0;
      const y = e.targetTouches ? e.targetTouches[0].pageY : e.pageY || 0;
      swipeState.startSwipe(x, y);
    }
  };
  const handleMove = (e: Partial<TouchEvent & MouseEvent>) => {
    if (swipeState.isSwipe === 'pending' && Container.current !== null) {
      const x = e.targetTouches ? e.targetTouches[0].pageX : e.pageX || 0;
      const y = e.targetTouches ? e.targetTouches[0].pageY : e.pageY || 0;
      const offset = x - swipeState.startX - swipeState.currentX;
      if (Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)) {
        Container.current.style.transition = 'none';
        Container.current.style.transform = `translateX(${offset}px)`;
      }
    }
  };
  const handleEnd = (e: Partial<TouchEvent & MouseEvent>) => {
    if (swipeState.isSwipe === 'pending' && Container.current !== null) {
      const x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX || 0;
      const y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY || 0;
      const offset = swipeState.startX - x;

      if (
        (Math.abs(offset) >= Container.current.clientWidth / 2 ||
          Date.now() - swipeState.swipeTime < 200) &&
        Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)
      ) {
        offset < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
      }

      swipeState.endSwipe(
        swipeState.currentStep *
          parseFloat(getComputedStyle(Container.current).width),
        333,
      );
      Container.current.style.transition = '333ms';
      Container.current.style.transform = `translateX(-${swipeState.currentX}px)`;
      handleHistory();
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
  const handleInit = () => {
    const params = getSearchParams();
    if (params[index] !== undefined && parseInt(params[index]) < itemLength) {
      swipeState.currentStep = parseInt(params[index]);
      handleResize();
    } else handleHistory();
  };
  const handleHistory = () => {
    const params = getSearchParams();
    params[index] = swipeState.currentStep.toString();
    config?.isHistory ? setHistory(params) : changeHistory(params);
    if (config?.historyCallback) config.historyCallback(swipeState);
  };
  const handleSlide = (flag: 'L' | 'R') => {
    flag === 'L' ? swipeState.currentStep-- : swipeState.currentStep++;
    handleHistory();
    handleInit();
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
    init: () => handleInit(),
    slidehandler: (flag: 'L' | 'R') => {
      handleSlide(flag);
    },
  };
}
