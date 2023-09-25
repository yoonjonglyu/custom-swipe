import SwipeState from './state';
import { getStart, getMove, getEnd } from './swipeData';

export const swipestart = (
  e: Partial<TouchEvent & MouseEvent>,
  swipeState: SwipeState,
) => {
  if (swipeState.isSwipe === 'wait') {
    const { x, y } = getStart(e);
    swipeState.startSwipe(x, y);
  }
};
export const swipeMove = (
  e: Partial<TouchEvent & MouseEvent>,
  swipeState: SwipeState,
  target: HTMLElement,
) => {
  if (swipeState.isSwipe === 'pending') {
    const { x, y, offset } = getMove(e, swipeState);
    if (Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)) {
      target.style.transition = 'none';
      target.style.transform = `translateX(${offset}px)`;
    }
  }
};
export const swipeEnd = (
  e: Partial<TouchEvent & MouseEvent>,
  swipeState: SwipeState,
  target: HTMLElement,
) => {
  if (swipeState.isSwipe === 'pending') {
    const { x, y, offset } = getEnd(e, swipeState);

    if (
      (Math.abs(offset) >= target.clientWidth / 2 ||
        Date.now() - swipeState.swipeTime < 200) &&
      Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)
    ) {
      offset < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
    }

    swipeState.endSwipe(
      swipeState.currentStep * parseFloat(getComputedStyle(target).width),
      333,
    );
    target.style.transition = '333ms';
    target.style.transform = `translateX(-${swipeState.currentX}px)`;
  }
};
