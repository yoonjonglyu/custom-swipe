import React from 'react';

import SwipeEvents, { ConfigProps } from './events';

export interface UseSwipeEvents<T> {
  onTouchStart: React.TouchEventHandler<T>;
  onTouchMove: React.TouchEventHandler<T>;
  onTouchEnd: React.TouchEventHandler<T>;
  onTouchCancel: React.TouchEventHandler<T>;
  onPointerDown: React.PointerEventHandler<T>;
  onPointerMove: React.PointerEventHandler<T>;
  onPointerUp: React.PointerEventHandler<T>;
}

export default function useSwipe(
  dom: React.RefObject<HTMLElement>,
  length: number,
  config?: ConfigProps,
) {
  const Events = SwipeEvents(dom, length, config);
  if (window) window.addEventListener('resize', Events.resize);
  setTimeout(() => Events.init(), 0);

  return {
    onTouchStart: Events.mobileStart,
    onTouchMove: Events.mobileMove,
    onTouchEnd: Events.mobileEnd,
    onTouchCancel: Events.mobileEnd,
    onPointerDown: Events.desktopStart,
    onPointerMove: Events.desktopMove,
    onPointerUp: Events.desktopEnd,
    onPointerLeave: Events.desktopEnd,
    onPointerCancel: Events.desktopEnd,
  } as unknown as UseSwipeEvents<typeof dom.current>;
}
