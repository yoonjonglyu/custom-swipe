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
    const el = ref();
    if (!el) return;
    Events = SwipeProvider(el.children.length, config);
    initCb();
  });
  onMount(() => {
    const el = ref();
    if (!el) return;
    // init
    Events = SwipeProvider(el.children.length, config);
    init = setTimeout(initCb, 0);

    if (config?.isHistory && typeof window !== 'undefined') {
      window.addEventListener('popstate', initCb);
    }

    // swipe pc
    el.addEventListener('mousedown', events.onPointerDown, {
      passive: true,
    });
    el.addEventListener('mousemove', events.onPointerMove, {
      passive: true,
    });
    el.addEventListener('mouseup', events.onPointerUp, {
      passive: true,
    });
    el.addEventListener('mouseleave', events.onPointerUp, {
      passive: true,
    });
    // swipe mobile
    el.addEventListener('touchstart', events.onTouchStart, {
      passive: true,
    });
    el.addEventListener('touchmove', events.onTouchMove, {
      passive: true,
    });
    el.addEventListener('touchend', events.onTouchEnd, {
      passive: true,
    });
    // resize
    window.addEventListener('resize', handleResize, { passive: true });
  });
  onDestroy(() => {
    // init
    clearTimeout(init);
    if (config?.isHistory && typeof window !== 'undefined') {
      window.removeEventListener('popstate', initCb);
    }
    // swipe listeners cleanup
    const el = ref();
    if (el) {
      el.removeEventListener('mousedown', events.onPointerDown);
      el.removeEventListener('mousemove', events.onPointerMove);
      el.removeEventListener('mouseup', events.onPointerUp);
      el.removeEventListener('mouseleave', events.onPointerUp);
      el.removeEventListener('touchstart', events.onTouchStart);
      el.removeEventListener('touchmove', events.onTouchMove);
      el.removeEventListener('touchend', events.onTouchEnd);
    }
    // resize
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  });

  return {
    handleSlide: (flag: 'L' | 'R') => {
      const el = ref();
      if (el) Events.slidehandler(flag, el);
    },
    changeIndex: (index: number) => {
      const el = ref();
      if (el) Events.changeIndex(index, el);
    },
  };
}

