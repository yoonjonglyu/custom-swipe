import type { SwipeStateProps } from './type';

class SwipeState implements SwipeStateProps {
  private _isSwipe: 'pending' | 'wait' | 'disable';
  private _startXY: { x: number; y: number };
  private _current: {
    currentX: number;
    currentY: number;
    currentStep: number;
    swipeTime: number;
  };
  private _itemLength: number;
  private _direction: 'row' | 'column';
  private _isInfinite: boolean;

  constructor(itemLength: number, direction: 'row' | 'column', isInfinite = false) {
    this._isSwipe = 'wait';
    this._startXY = { x: 0, y: 0 };
    this._current = { currentX: 0, currentY: 0, currentStep: 0, swipeTime: 0 };
    this._itemLength = itemLength;
    this._direction = direction;
    this._isInfinite = isInfinite;
  }

  get isSwipe() {
    return this._isSwipe;
  }
  get isInfinite() {
    return this._isInfinite;
  }
  get startX() {
    return this._startXY.x;
  }
  get startY() {
    return this._startXY.y;
  }
  get currentX() {
    return this._current.currentX;
  }
  get currentY() {
    return this._current.currentY;
  }
  get currentStep() {
    return this._current.currentStep;
  }
  get swipeTime() {
    return this._current.swipeTime;
  }
  get direction() {
    return this._direction;
  }
  set currentX(value: number) {
    this._current.currentX = value;
  }
  set currentY(value: number) {
    this._current.currentY = value;
  }
  set currentStep(value: number) {
    if (this._itemLength <= 0) return;
    if (this._isInfinite) {
      this._current.currentStep =
        ((value % this._itemLength) + this._itemLength) % this._itemLength;
    } else if (value >= 0 && value < this._itemLength) {
      this._current.currentStep = value;
    }
  }

  startSwipe(x: number, y: number) {
    this._startXY.x = x;
    this._startXY.y = y;
    this._isSwipe = 'pending';
    this._current.swipeTime = Date.now();
  }
  endSwipe(currentX: number, currentY: number, disableTime: number) {
    this._current.swipeTime = 0;
    this._isSwipe = 'disable';
    this._current.currentX = currentX;
    this._current.currentY = currentY;
    setTimeout(() => (this._isSwipe = 'wait'), disableTime);
  }
}

export default SwipeState;
