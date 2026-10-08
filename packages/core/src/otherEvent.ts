import type { ConfigProps, SwipeStateProps } from './type';
import { getSearchParams, setHistory, changeHistory } from './uri';

class OtherEvents {
  private _state: SwipeStateProps;
  private _index: string;
  private _isHistory: boolean;
  private _historyCallback?: (state: SwipeStateProps) => void;
  constructor(state: SwipeStateProps, config?: Omit<ConfigProps, 'direction'>) {
    this._state = state;
    this._index = config?.paramName || 'index';
    this._isHistory = config?.isHistory || false;
    this._historyCallback = config?.historyCallback;
  }

  resize = (target: HTMLElement) => {
    if (!target) return;
    const targetWidth = parseFloat(getComputedStyle(target).width) || target.clientWidth || 0;
    const firstChild = target.children[0] as HTMLElement | undefined;
    const childHeight = firstChild
      ? parseFloat(getComputedStyle(firstChild).height) || firstChild.clientHeight || 0
      : target.clientHeight || 0;

    this._state.currentX = this._state.currentStep * targetWidth;
    this._state.currentY = this._state.currentStep * childHeight;
    target.style.transition = 'none';
    target.style.transform =
      this._state.direction === 'row'
        ? `translateX(-${this._state.currentX}px)`
        : `translateY(-${this._state.currentY}px)`;
  };
  init = (target: HTMLElement) => {
    if (!target) return;
    const params = getSearchParams();
    if (params[this._index] !== undefined) {
      const parsed = parseInt(params[this._index], 10);
      if (!Number.isNaN(parsed) && this._state.currentStep !== parsed) {
        this._state.currentStep = parsed;
        this.resize(target);
      }
    }
  };
  changeHistory = () => {
    const params = getSearchParams();
    if (this._state.currentStep !== parseInt(params[this._index], 10)) {
      params[this._index] = this._state.currentStep.toString();
      this._isHistory ? setHistory(params) : changeHistory(params);
      if (this._historyCallback) this._historyCallback(this._state);
    }
  };
  changeIndex = (value: number, target: HTMLElement) => {
    if (!target) return;
    if (this._state.currentStep !== value) {
      this._state.currentStep = value;
      this.changeHistory();
      this.resize(target);
    }
  };
  slide = (flag: 'L' | 'R', target: HTMLElement) => {
    if (!target) return;
    const prev = this._state.currentStep;
    flag === 'L' ? this._state.currentStep-- : this._state.currentStep++;
    if (this._state.currentStep !== prev) {
      this.changeHistory();
      this.resize(target);
    }
  };
}

export default OtherEvents;

