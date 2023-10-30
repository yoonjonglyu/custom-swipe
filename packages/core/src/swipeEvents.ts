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
    if (swipeState.direction === 'row') {
      if (Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)) {
        target.style.transition = 'none';
        target.style.transform = `translateX(${offset.x}px)`;
      }
    } else {
      if (Math.abs(swipeState.startY - y) > Math.abs(swipeState.startX - x)) {
        target.style.transition = 'none';
        target.style.transform = `translateY(${offset.y}px)`;
      }
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
    if (swipeState.direction === 'row') {
      if (
        (Math.abs(offset.x) >= target.clientWidth / 2 ||
          Date.now() - swipeState.swipeTime < 200) &&
        Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)
      ) {
        offset.x < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
      }
    } else {
      if (
        (Math.abs(offset.y) >= target.clientHeight / 2 ||
          Date.now() - swipeState.swipeTime < 200) &&
        Math.abs(swipeState.startY - y) > Math.abs(swipeState.startX - x)
      ) {
        offset.y < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
      }
    }
    swipeState.endSwipe(
      swipeState.currentStep * parseFloat(getComputedStyle(target).width),
      swipeState.currentStep *
        parseFloat(getComputedStyle(target.children[0]).height),
      333,
    );
    target.style.transition = '333ms';
    target.style.transform =
      swipeState.direction === 'row'
        ? `translateX(-${swipeState.currentX}px)`
        : `translateY(-${swipeState.currentY}px)`;
  }
};
