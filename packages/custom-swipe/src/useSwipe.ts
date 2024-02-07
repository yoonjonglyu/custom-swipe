import SwipeProvider from 'swipe-core-provider';
import type { ConfigProps } from 'swipe-core-provider';

export interface UseSwipe<T> {
  events: UseSwipeEvents;
  handleSlide: (flag: 'L' | 'R') => void;
  changeIndex: (index: number) => void;
}

interface UseSwipeEvents {
  touchstart: Touch;
  touchmove: Touch;
  touchend: Touch;
  touchcancel: Touch;
  pointerdown: Mouse;
  pointermove: Mouse;
  pointerup: Mouse;
  pointerleave: Mouse;
  pointercancel: Mouse;
}
type Touch = (e: TouchEvent) => void;
type Mouse = (e: MouseEvent) => void;

function useSwipe<T extends HTMLElement>(
  ref: T,
  config: ConfigProps,
): UseSwipe<T> {
  const _config: ConfigProps = {
    isHistory: false,
    paramName: 'index',
    ...config,
  };
  const Core = SwipeProvider(ref.children.length || 0, _config);
  Core.init(ref);
  
  globalThis.window?.addEventListener('resize', () => Core.resize(ref));

  const events = {
    touchstart: (e: TouchEvent) => Core.mobileStart(e),
    touchmove: (e: TouchEvent) => Core.mobileMove(e, ref),
    touchend: (e: TouchEvent) => Core.mobileEnd(e, ref),
    touchcancel: (e: TouchEvent) => Core.mobileEnd(e, ref),
    pointerdown: (e: MouseEvent) => Core.desktopStart(e),
    pointermove: (e: MouseEvent) => Core.desktopMove(e, ref),
    pointerup: (e: MouseEvent) => Core.desktopEnd(e, ref),
    pointerleave: (e: MouseEvent) => Core.desktopEnd(e, ref),
    pointercancel: (e: MouseEvent) => Core.desktopEnd(e, ref),
  };

  return {
    events,
    handleSlide: (flag: 'L' | 'R') => Core.slidehandler(flag, ref),
    changeIndex: (index: number) => Core.changeIndex(index, ref),
  };
}

export default useSwipe;
