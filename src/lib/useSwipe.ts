import React from 'react';

import SwipeEvents from './events';

export interface UseSwipeEvents<T> {
  onTouchStart: React.TouchEventHandler<T>;
  onTouchMove: React.TouchEventHandler<T>;
  onTouchEnd: React.TouchEventHandler<T>;
  onTouchCancel: React.TouchEventHandler<T>;
  onPointerDown: React.MouseEventHandler<T>;
  onPointerMove: React.MouseEventHandler<T>;
  onPointerUp: React.MouseEventHandler<T>;
}

export default function useSwipe(
  dom: React.RefObject<HTMLElement>,
  length: number,
) {
  const Events = dom.current
    ? SwipeEvents(dom.current, length)
    : SwipeEvents(document.createElement('div'), length);

  return {
    onTouchStart: Events.mobileStart,
    onTouchMove: Events.mobileMove,
    onTouchEnd: Events.mobileEnd,
    onTouchCancel: Events.mobileEnd,
    onPointerDown: Events.desktopStart,
    onPointerMove: Events.desktopMove,
    onPointerUp: Events.desktopEnd,
  } as unknown as UseSwipeEvents<typeof dom.current>;
}
