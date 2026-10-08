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
  if (swipeState.isSwipe !== 'pending' || !target) return;
  const { x, y, offset } = getMove(e, swipeState);
  const isRowDirection = swipeState.direction === 'row';
  const shake = isRowDirection
    ? Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - x)
    : Math.abs(swipeState.startY - y) > Math.abs(swipeState.startX - x);
  if (shake) {
    target.style.transition = 'none';
    target.style.transform = isRowDirection
      ? `translateX(${offset.x}px)`
      : `translateY(${offset.y}px)`;
  }
};

export const swipeEnd = (
  e: Partial<TouchEvent & MouseEvent>,
  swipeState: SwipeState,
  target: HTMLElement,
) => {
  if (swipeState.isSwipe !== 'pending' || !target) return;
  const { x, y, offset } = getEnd(e, swipeState);
  const isRow = swipeState.direction === 'row';

  if (isRow) {
    handleRowSwipe(x, offset);
  } else {
    handleColumnSwipe(y, offset);
  }

  const targetWidth = parseFloat(getComputedStyle(target).width) || target.clientWidth || 0;
  const firstChild = target.children[0] as HTMLElement | undefined;
  const childHeight = firstChild
    ? parseFloat(getComputedStyle(firstChild).height) || firstChild.clientHeight || 0
    : target.clientHeight || 0;

  swipeState.endSwipe(
    swipeState.currentStep * targetWidth,
    swipeState.currentStep * childHeight,
    333,
  );
  target.style.transition = '333ms';
  target.style.transform = isRow
    ? `translateX(-${swipeState.currentX}px)`
    : `translateY(-${swipeState.currentY}px)`;

  function handleRowSwipe(
    currentX: number,
    off: { x: number; y: number },
  ) {
    if (
      (Math.abs(off.x) >= target.clientWidth / 2 ||
        Date.now() - swipeState.swipeTime < 200) &&
      Math.abs(swipeState.startY - y) < Math.abs(swipeState.startX - currentX)
    ) {
      off.x < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
    }
  }

  function handleColumnSwipe(
    currentY: number,
    off: { x: number; y: number },
  ) {
    if (
      (Math.abs(off.y) >= target.clientHeight / 2 ||
        Date.now() - swipeState.swipeTime < 200) &&
      Math.abs(swipeState.startY - currentY) > Math.abs(swipeState.startX - x)
    ) {
      off.y < 0 ? swipeState.currentStep-- : swipeState.currentStep++;
    }
  }
};

