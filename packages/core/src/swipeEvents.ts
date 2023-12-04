import SwipeState from './state';
import { getStart, getMove, getEnd } from './swipeData';

export const swipestart = (
  e: Partial<TouchEvent & MouseEvent>,
  swipeState: SwipeState,
) => {
  if (swipeState.isSwipe !== 'wait') return;
  const { x, y } = getStart(e);
  swipeState.startSwipe(x, y);
};
export const swipeMove = (
  e: Partial<TouchEvent & MouseEvent>,
  swipeState: SwipeState,
  target: HTMLElement,
) => {
  if (swipeState.isSwipe !== 'pending') return;
  const { x, y, offset } = getMove(e, swipeState);
  const shake =
    swipeState.direction === 'row'
      ? Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)
      : Math.abs(swipeState.startY - y) > Math.abs(swipeState.startX - x);
  if (shake) {
    target.style.transition = 'none';
    target.style.transform =
      swipeState.direction === 'row'
        ? `translateX(${offset.x}px)`
        : `translateY(${offset.y}px)`;
  }
};
export const swipeEnd = (
  e: Partial<TouchEvent & MouseEvent>,
  swipeState: SwipeState,
  target: HTMLElement,
) => {
  if (swipeState.isSwipe !== 'pending') return;
  const { x, y, offset } = getEnd(e, swipeState);
  swipeState.direction === 'row'
    ? verticalSwipe(x, y, offset)
    : horizontalSwipe(x, y, offset);
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

  function verticalSwipe(
    x: number,
    y: number,
    offset: { x: number; y: number },
  ) {
    if (
      (Math.abs(offset.x) >= target.clientWidth / 2 ||
        Date.now() - swipeState.swipeTime < 200) &&
      Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)
    ) {
      offset.x < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
    }
  }
  function horizontalSwipe(
    x: number,
    y: number,
    offset: { x: number; y: number },
  ) {
    if (
      (Math.abs(offset.y) >= target.clientHeight / 2 ||
        Date.now() - swipeState.swipeTime < 200) &&
      Math.abs(swipeState.startY - y) > Math.abs(swipeState.startX - x)
    ) {
      offset.y < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
    }
  }
};
