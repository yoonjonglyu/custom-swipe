import type { ConfigProps } from './type';
import SwipeState from './state';
import { swipestart, swipeMove, swipeEnd } from './swipeEvents';
import OtherEvents from './otherEvent';


export default function SwipeProvider<T extends HTMLElement>(
  itemLength: number,
  config?: ConfigProps,
) {
  const direction = config?.direction || 'row';
  const swipeState = new SwipeState(itemLength, direction);
  const otherEvents = new OtherEvents(swipeState, config);

  let lastTouchTime = 0;

  return {
    desktopStart: (e: MouseEvent) => {
      if (Date.now() - lastTouchTime < 500) return;
      swipestart(e, swipeState);
    },
    desktopMove: (e: MouseEvent, Container: T) => {
      if (Date.now() - lastTouchTime < 500) return;
      swipeMove(e, swipeState, Container);
    },
    desktopEnd: (e: MouseEvent, Container: T) => {
      if (Date.now() - lastTouchTime < 500) return;
      swipeEnd(e, swipeState, Container);
      otherEvents.changeHistory();
    },
    mobileStart: (e: TouchEvent) => {
      lastTouchTime = Date.now();
      swipestart(e, swipeState);
    },
    mobileMove: (e: TouchEvent, Container: T) => {
      lastTouchTime = Date.now();
      swipeMove(e, swipeState, Container);
    },
    mobileEnd: (e: TouchEvent, Container: T) => {
      lastTouchTime = Date.now();
      swipeEnd(e, swipeState, Container);
      otherEvents.changeHistory();
    },

    resize: (Container: T) => otherEvents.resize(Container),
    init: (Container: T) => otherEvents.init(Container),
    slidehandler: (flag: 'L' | 'R', Container: T) =>
      otherEvents.slide(flag, Container),
    changeIndex: (index: number, Container: T) =>
      otherEvents.changeIndex(index, Container),
  };
}
