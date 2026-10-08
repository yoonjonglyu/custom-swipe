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
  const eventsInstance = React.useMemo(
    () => SwipeProvider<T>(length, config),
    [length, config?.direction, config?.isHistory, config?.paramName],
  );

  useEffect(() => {
    if (!dom.current) return;
    const initCb = () => {
      if (dom.current) eventsInstance.init(dom.current);
    };

    // Initial positioning
    const timer = setTimeout(initCb, 0);

    // Listen to history changes if isHistory is enabled
    if (config?.isHistory && typeof window !== 'undefined') {
      window.addEventListener('popstate', initCb);
    }

    return () => {
      clearTimeout(timer);
      if (config?.isHistory && typeof window !== 'undefined') {
        window.removeEventListener('popstate', initCb);
      }
    };
  }, [eventsInstance, config?.isHistory]);

  useEffect(() => {
    const handleResize = () => {
      if (dom.current) eventsInstance.resize(dom.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [eventsInstance]);

  const handleSlide = React.useCallback(
    (flag: 'L' | 'R') => {
      if (dom.current) eventsInstance.slidehandler(flag, dom.current);
    },
    [eventsInstance],
  );

  const changeIndex = React.useCallback(
    (index: number) => {
      if (dom.current) eventsInstance.changeIndex(index, dom.current);
    },
    [eventsInstance],
  );

  const events: UseSwipeEvents<T> = React.useMemo(
    () => ({
      onTouchStart: (e) => eventsInstance.mobileStart(e.nativeEvent as TouchEvent),
      onTouchMove: (e) =>
        dom.current && eventsInstance.mobileMove(e.nativeEvent as TouchEvent, dom.current),
      onTouchEnd: (e) =>
        dom.current && eventsInstance.mobileEnd(e.nativeEvent as TouchEvent, dom.current),
      onTouchCancel: (e) =>
        dom.current && eventsInstance.mobileEnd(e.nativeEvent as TouchEvent, dom.current),
      onPointerDown: (e) => eventsInstance.desktopStart(e.nativeEvent as MouseEvent),
      onPointerMove: (e) =>
        dom.current && eventsInstance.desktopMove(e.nativeEvent as MouseEvent, dom.current),
      onPointerUp: (e) =>
        dom.current && eventsInstance.desktopEnd(e.nativeEvent as MouseEvent, dom.current),
      onPointerLeave: (e) =>
        dom.current && eventsInstance.desktopEnd(e.nativeEvent as MouseEvent, dom.current),
      onPointerCancel: (e) =>
        dom.current && eventsInstance.desktopEnd(e.nativeEvent as MouseEvent, dom.current),
    }),
    [eventsInstance],
  );

  return {
    swipeEvents: events,
    handleSlide,
    changeIndex,
  };
}

