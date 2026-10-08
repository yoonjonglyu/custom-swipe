import type { ConfigProps, SwipeStateProps } from './type';
declare class OtherEvents {
    private _state;
    private _index;
    private _isHistory;
    private _historyCallback?;
    constructor(state: SwipeStateProps, config?: Omit<ConfigProps, 'direction'>);
    resize: (target: HTMLElement) => void;
    init: (target: HTMLElement) => void;
    changeHistory: () => void;
    changeIndex: (value: number, target: HTMLElement) => void;
    slide: (flag: 'L' | 'R', target: HTMLElement) => void;
}
export default OtherEvents;
