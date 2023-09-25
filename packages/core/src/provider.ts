import SwipeState from './state';
import { swipestart, swipeMove, swipeEnd } from './swipeEvents';
import OtherEvents, { ConfigProps } from './otherEvent';
import { checkMobile } from './checkUserAgent';

export default function SwipeProvider<T extends HTMLElement>(
  itemLength: number,
  config?: ConfigProps,
) {
  const index = config?.paramName ? config.paramName : 'index';
  const swipeState = new SwipeState(itemLength);
  const otherEvents = new OtherEvents(swipeState, index, config);

  return {
    desktopStart: (e: MouseEvent) => {
      if (!checkMobile()) swipestart(e, swipeState);
    },
    desktopMove: (e: MouseEvent, Container: T) => {
      if (!checkMobile()) swipeMove(e, swipeState, Container);
    },
    desktopEnd: (e: MouseEvent, Container: T) => {
      if (!checkMobile()) {
        swipeEnd(e, swipeState, Container);
        otherEvents.changeHistory();
      }
    },
    mobileStart: (e: TouchEvent) => {
      swipestart(e, swipeState);
    },
    mobileMove: (e: TouchEvent, Container: T) => {
      swipeMove(e, swipeState, Container);
    },
    mobileEnd: (e: TouchEvent, Container: T) => {
      swipeEnd(e, swipeState, Container);
      otherEvents.changeHistory();
    },
    resize: (Container: T) => otherEvents.resize(Container),
    init: (Container: T) => otherEvents.init(Container),
    slidehandler: (flag: 'L' | 'R', Container: T) =>
      otherEvents.slide(flag, Container),
    changeIndex: (index: number) => otherEvents.changeIndex(index),
  };
}
