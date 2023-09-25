import { SwipeStateProps } from './state';
import { getSearchParams, setHistory, changeHistory } from './uri';

export interface ConfigProps {
  isHistory: boolean;
  paramName?: string;
  historyCallback?: (state: SwipeStateProps) => void;
}

class OtherEvents {
  private _state: SwipeStateProps;
  private _index: string;
  private _config?: ConfigProps;
  constructor(state: SwipeStateProps, index: string, config?: ConfigProps) {
    this._state = state;
    this._index = index;
    this._config = config;
  }

  resize = (target: HTMLElement) => {
    this._state.currentX =
      this._state.currentStep * parseFloat(getComputedStyle(target).width);
    target.style.transition = 'none';
    target.style.transform = `translateX(-${this._state.currentX}px)`;
  };
  init = (target: HTMLElement) => {
    const params = getSearchParams();
    if (params[this._index] !== undefined) {
      this._state.currentStep = parseInt(params[this._index]);
      this.resize(target);
      this.changeHistory();
    }
  };
  changeHistory = () => {
    const params = getSearchParams();
    params[this._index] = this._state.currentStep.toString();
    this._config?.isHistory ? setHistory(params) : changeHistory(params);
    if (this._config?.historyCallback)
      this._config.historyCallback(this._state);
  };
  slide = (flag: 'L' | 'R', target: HTMLElement) => {
    flag === 'L' ? this._state.currentStep-- : this._state.currentStep++;
    this.changeHistory();
    this.init(target);
  };
}

export default OtherEvents;
