import { onMounted, onBeforeUnmount, Ref, onUpdated } from 'vue';
import SwipeProvider, { ConfigProps } from 'swipe-core-provider';

export interface useSwipeProps {
  handleSlide: (flag: 'L' | 'R') => void;
  changeIndex: (index: number) => void;
}

export default function useSwipe(
  ref: Ref<HTMLElement>,
  config: ConfigProps,
): useSwipeProps {
  let Events = SwipeProvider(1, config);
  const initCb = () => Events.init(ref.value);
  const handleResize = () => Events.resize(ref.value);
  let init: any;
  const events = {
    onTouchStart: (e: TouchEvent) => Events.mobileStart(e),
    onTouchMove: (e: TouchEvent) => Events.mobileMove(e, ref.value),
    onTouchEnd: (e: TouchEvent) => Events.mobileEnd(e, ref.value),
    onTouchCancel: (e: TouchEvent) => Events.mobileEnd(e, ref.value),
    onPointerDown: (e: MouseEvent) => Events.desktopStart(e),
    onPointerMove: (e: MouseEvent) => Events.desktopMove(e, ref.value),
    onPointerUp: (e: MouseEvent) => Events.desktopEnd(e, ref.value),
    onPointerLeave: (e: MouseEvent) => Events.desktopEnd(e, ref.value),
    onPointerCancel: (e: MouseEvent) => Events.desktopEnd(e, ref.value),
  };
  onUpdated(() => {
    Events = SwipeProvider(ref.value.children.length, config);
    initCb();
  });
  onMounted(() => {
    // init
    Events = SwipeProvider(ref.value.children.length, config);
    if (!config?.isHistory) {
      init = setTimeout(initCb, 0);
    } else init = setInterval(initCb, 10);
    // swipe pc
    ref.value.addEventListener('mousedown', events.onPointerDown);
    ref.value.addEventListener('mousemove', events.onPointerMove);
    ref.value.addEventListener('mouseup', events.onPointerUp);
    ref.value.addEventListener('mouseleave', events.onPointerUp);
    // swipe mobile
    ref.value.addEventListener('touchstart', events.onTouchStart);
    ref.value.addEventListener('touchmove', events.onTouchMove);
    ref.value.addEventListener('touchend', events.onTouchEnd);
    // resize
    window.addEventListener('resize', handleResize);
  });
  onBeforeUnmount(() => {
    // init
    !config?.isHistory ? clearTimeout(init) : clearInterval(init);
    // swipe
    ref.value.removeEventListener('mousedown', events.onPointerDown);
    ref.value.removeEventListener('mousemove', events.onPointerMove);
    ref.value.removeEventListener('mouseup', events.onPointerUp);
    ref.value.removeEventListener('mouseleave', events.onPointerUp);
    // swipe mobile
    ref.value.removeEventListener('touchstart', events.onTouchStart);
    ref.value.removeEventListener('touchmove', events.onTouchMove);
    ref.value.removeEventListener('touchend', events.onTouchEnd);
    // resize
    window.removeEventListener('resize', handleResize);
  });

  const handleSlide = (flag: 'L' | 'R') => {
    Events.slidehandler(flag, ref.value);
  };

  return {
    handleSlide,
    changeIndex: (index: number) => Events.changeIndex(index, ref.value),
  };
}
