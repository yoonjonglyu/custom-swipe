import SwipeProvider from 'swipe-core-provider';
import type { ConfigProps } from 'swipe-core-provider';

export interface UseSwipe<T> {
  handleSlide: (flag: 'L' | 'R') => void;
  changeIndex: (index: number) => void;
}

function useSwipe<T extends HTMLElement>(
  ref: T,
  config: ConfigProps,
): UseSwipe<T> {
  const _config: ConfigProps = {
    isHistory: true,
    paramName: 'index',
    ...config,
  };
  const Core = SwipeProvider(ref.children.length || 0, _config);

  const events = {
    onTouchStart: (e: TouchEvent) => Core.mobileStart(e),
    onTouchMove: (e: TouchEvent) => Core.mobileMove(e, ref),
    onTouchEnd: (e: TouchEvent) => Core.mobileEnd(e, ref),
    onTouchCancel: (e: TouchEvent) => Core.mobileEnd(e, ref),
    onPointerDown: (e: MouseEvent) => Core.desktopStart(e),
    onPointerMove: (e: MouseEvent) => Core.desktopMove(e, ref),
    onPointerUp: (e: MouseEvent) => Core.desktopEnd(e, ref),
    onPointerLeave: (e: MouseEvent) => Core.desktopEnd(e, ref),
    onPointerCancel: (e: MouseEvent) => Core.desktopEnd(e, ref),
  };

  return {
    handleSlide: (flag: 'L' | 'R') => Core.slidehandler(flag, ref),
    changeIndex: (index: number) => Core.changeIndex(index, ref),
  };
}

export default useSwipe;
