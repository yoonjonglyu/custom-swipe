import React, { useEffect } from 'react';
import SwipeProvider, { ConfigProps } from 'swipe-core-provider';

export interface UseSwipe<T> {
  swipeEvents: UseSwipeEvents<T>;
  handleSlide: (flag: 'L' | 'R') => void;
  changeIndex: (index: number) => void;
}

interface UseSwipeEvents<T> {
  onTouchStart: React.TouchEventHandler<T> | undefined;
  onTouchMove: React.TouchEventHandler<T> | undefined;
  onTouchEnd: React.TouchEventHandler<T> | undefined;
  onTouchCancel: React.TouchEventHandler<T> | undefined;
  onPointerDown: React.MouseEventHandler<T> | undefined;
  onPointerMove: React.MouseEventHandler<T> | undefined;
  onPointerUp: React.MouseEventHandler<T> | undefined;
  onPointerLeave: React.MouseEventHandler<T> | undefined;
  onPointerCancel: React.MouseEventHandler<T> | undefined;
}

export default function useSwipe<T extends HTMLElement>(
  dom: React.RefObject<T>,
  length: number,
  config?: ConfigProps,
): UseSwipe<T> {
  const Events = SwipeProvider(length, config);

  useEffect(() => {
    const initCb = () => Events.init(dom.current as T);
    let init: any;
    if (!config?.isHistory) {
      init = setTimeout(initCb, 0);
    } else init = setInterval(initCb, 10);
    return () =>
      !config?.isHistory ? clearTimeout(init) : clearInterval(init);
  });
  useEffect(() => {
    const handleResize = () => Events.resize(dom.current as T);
    if (dom.current) {
      const target = dom.current as HTMLElement;
    }
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
  } as unknown as UseSwipeEvents<T>;

  return {
    swipeEvents: events,
    handleSlide,
    changeIndex: (index: number) => Events.changeIndex(index, dom.current as T),
  };
}
