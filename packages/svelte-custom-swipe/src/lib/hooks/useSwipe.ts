import { onMount, onDestroy, afterUpdate } from 'svelte';
import SwipeProvider from 'swipe-core-provider';
import type { ConfigProps } from 'swipe-core-provider';

export interface UseSwipeProps {
  handleSlide: (flag: 'L' | 'R') => void;
  changeIndex: (index: number) => void;
}

export default function useSwipe<T extends HTMLElement>(
  ref: () => T,
  config: ConfigProps,
): UseSwipeProps {
  // svelte issue
  let Events = SwipeProvider(1,config);
  const initCb = () => Events.init(ref());
  const handleResize = () => Events.resize(ref());
  let init: any;
  const events = {
    onTouchStart: (e: TouchEvent) => Events.mobileStart(e),
    onTouchMove: (e: TouchEvent) => Events.mobileMove(e, ref()),
    onTouchEnd: (e: TouchEvent) => Events.mobileEnd(e, ref()),
    onTouchCancel: (e: TouchEvent) => Events.mobileEnd(e, ref()),
    onPointerDown: (e: MouseEvent) => Events.desktopStart(e),
    onPointerMove: (e: MouseEvent) => Events.desktopMove(e, ref()),
    onPointerUp: (e: MouseEvent) => Events.desktopEnd(e, ref()),
    onPointerLeave: (e: MouseEvent) => Events.desktopEnd(e, ref()),
    onPointerCancel: (e: MouseEvent) => Events.desktopEnd(e, ref()),
  };
  afterUpdate(() => {
    Events = SwipeProvider(ref().children.length, config);
    initCb();
  });
  onMount(() => {
    // init
    Events = SwipeProvider(ref().children.length, config);
    if (!config?.isHistory) {
      init = setTimeout(initCb, 0);
    } else init = setInterval(initCb, 10);
    // swipe pc
    ref().addEventListener('mousedown', events.onPointerDown, {
      passive: true,
    });
    ref().addEventListener('mousemove', events.onPointerMove, {
      passive: true,
    });
    ref().addEventListener('mouseup', events.onPointerUp, {
      passive: true,
    });
    ref().addEventListener('mouseleave', events.onPointerUp, {
      passive: true,
    });
    // swipe mobile
    ref().addEventListener('touchstart', events.onTouchStart, {
      passive: true,
    });
    ref().addEventListener('touchmove', events.onTouchMove, {
      passive: true,
    });
    ref().addEventListener('touchend', events.onTouchEnd, {
      passive: true,
    });
    // resize
    window.addEventListener('resize', handleResize, { passive: true });
  });
  onDestroy(() => {
    // init
    !config?.isHistory ? clearTimeout(init) : clearInterval(init);
    // resize
    if (globalThis.window) window.removeEventListener('resize', handleResize);
  });

  return {
    handleSlide: (flag: 'L' | 'R') => Events.slidehandler(flag, ref()),
    changeIndex: (index: number) => Events.changeIndex(index, ref()),
  };
}
