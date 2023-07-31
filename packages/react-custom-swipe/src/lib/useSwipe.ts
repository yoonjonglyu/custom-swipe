import React, { useEffect } from 'react';

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

export default function useSwipe<T extends HTMLElement>(
  dom: React.RefObject<T>,
  length: number,
  config?: ConfigProps,
): UseSwipeEvents<T> {
  const Events = SwipeEvents(dom, length, config);

  useEffect(() => {
    const init = setTimeout(() => Events.init(), 0);
    return () => clearTimeout(init);
  });

  useEffect(() => {
    const handleResize = () => Events.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  } as unknown as UseSwipeEvents<T>;
}
