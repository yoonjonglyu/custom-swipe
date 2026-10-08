import SwipeState from './state';
export declare const swipestart: (e: Partial<TouchEvent & MouseEvent>, swipeState: SwipeState) => void;
export declare const swipeMove: (e: Partial<TouchEvent & MouseEvent>, swipeState: SwipeState, target: HTMLElement) => void;
export declare const swipeEnd: (e: Partial<TouchEvent & MouseEvent>, swipeState: SwipeState, target: HTMLElement) => void;
