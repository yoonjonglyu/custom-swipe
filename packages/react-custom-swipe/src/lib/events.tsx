import React from 'react';
import SwipeState from './core/state';
import { swipestart, swipeMove, swipeEnd } from './core/swipeEvents';
import OtherEvents, { ConfigProps } from './core/otherEvent';

export default function SwipeEvents(
  Container: React.RefObject<HTMLElement>,
  itemLength: number,
  config?: ConfigProps,
) {
  const index = config?.paramName ? config.paramName : 'index';
  const swipeState = new SwipeState(itemLength);
  const otherEvents = new OtherEvents(swipeState, index, config);

  const handleStart = (e: Partial<TouchEvent & MouseEvent>) => {
    swipestart(e, swipeState);
  };
  const handleMove = (e: Partial<TouchEvent & MouseEvent>) => {
    if (Container.current !== null) swipeMove(e, swipeState, Container.current);
  };
  const handleEnd = (e: Partial<TouchEvent & MouseEvent>) => {
    if (Container.current !== null) {
      swipeEnd(e, swipeState, Container.current);
      handleHistory();
    }
  };
  const handleResize = () => {
    if (Container.current !== null) otherEvents.resize(Container.current);
  };
  const handleInit = () => {
    if (Container.current !== null) otherEvents.init(Container.current);
  };
  const handleHistory = () => {
    otherEvents.changeHistory();
  };
  const handleSlide = (flag: 'L' | 'R') => {
    if (Container.current !== null) otherEvents.slide(flag, Container.current);
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
