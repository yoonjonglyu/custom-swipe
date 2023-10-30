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
    this._state.currentX =
      this._state.currentStep * parseFloat(getComputedStyle(target).width);
    this._state.currentY =
      this._state.currentStep *
      parseFloat(getComputedStyle(target.children[0]).height);
    target.style.transition = 'none';
    target.style.transform =
      this._state.direction === 'row'
        ? `translateX(-${this._state.currentX}px)`
        : `translateY(-${this._state.currentY}px)`;
  };
  init = (target: HTMLElement) => {
    const params = getSearchParams();
    if (
      params[this._index] !== undefined &&
      this._state.currentStep !== parseInt(params[this._index])
    ) {
      this._state.currentStep = parseInt(params[this._index]);
      this.resize(target);
    }
  };
  changeHistory = () => {
    const params = getSearchParams();
    if (this._state.currentStep !== parseInt(params[this._index])) {
      params[this._index] = this._state.currentStep.toString();
      this._isHistory ? setHistory(params) : changeHistory(params);
      if (!!this._historyCallback) this._historyCallback(this._state);
    }
  };
  changeIndex = (value: number, target: HTMLElement) => {
    if (this._state.currentStep !== value) {
      this._state.currentStep = value;
      this.changeHistory();
      this.resize(target);
    }
  };
  slide = (flag: 'L' | 'R', target: HTMLElement) => {
    flag === 'L' ? this._state.currentStep-- : this._state.currentStep++;
    this.changeHistory();
    this.resize(target);
  };
}

export default OtherEvents;
