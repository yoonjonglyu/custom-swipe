import React, { useEffect } from 'react';

import SwipeProvider from './core/provider';
import { ConfigProps } from './core/otherEvent';

export interface UseSwipe<E> {
  swipeEvents: UseSwipeEvents<E>;
  handleSlide: (flag: 'L' | 'R') => void;
}

type SwipeEventHandler<E> = (e: E) => void;

interface UseSwipeEvents<E> {
  onTouchStart: SwipeEventHandler<E>;
  onTouchMove: SwipeEventHandler<E>;
  onTouchEnd: SwipeEventHandler<E>;
  onTouchCancel: SwipeEventHandler<E>;
  onPointerDown: SwipeEventHandler<E>;
  onPointerMove: SwipeEventHandler<E>;
  onPointerUp: SwipeEventHandler<E>;
  onPointerLeave: SwipeEventHandler<E>;
  onPointerCancel: SwipeEventHandler<E>;
}

export default function useSwipe<T extends HTMLElement>(
  dom: React.RefObject<T>,
  length: number,
  config?: ConfigProps,
): UseSwipe<TouchEvent | MouseEvent> {
  const Events = SwipeProvider(length, config);

  useEffect(() => {
    const init = setTimeout(() => Events.init(dom.current as T), 0);
    return () => clearTimeout(init);
  });
  useEffect(() => {
    const handleResize = () => Events.resize(dom.current as T);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [length]);

  const handleSlide = (flag: 'L' | 'R') => {
    Events.slidehandler(flag, dom.current as T);
  };

  const events = {
    onTouchStart: (e: TouchEvent) => Events.mobileStart(e),
    onTouchMove: (e: TouchEvent) => Events.mobileMove(e, dom.current as T),
    onTouchEnd: (e: TouchEvent) => Events.mobileEnd(e, dom.current as T),
    onTouchCancel: (e: TouchEvent) => Events.mobileEnd(e, dom.current as T),
    onPointerDown: (e: MouseEvent) => Events.desktopStart(e),
    onPointerMove: (e: MouseEvent) => Events.desktopMove(e, dom.current as T),
    onPointerUp: (e: MouseEvent) => Events.desktopEnd(e, dom.current as T),
    onPointerLeave: (e: MouseEvent) => Events.desktopEnd(e, dom.current as T),
    onPointerCancel: (e: MouseEvent) => Events.desktopEnd(e, dom.current as T),
  } as UseSwipeEvents<TouchEvent | MouseEvent>;

  return { swipeEvents: events, handleSlide };
}
