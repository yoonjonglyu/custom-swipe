import type { SwipeStateProps } from './type';
export declare const getStart: (e: Partial<TouchEvent & MouseEvent>) => {
    x: number;
    y: number;
};
export declare const getMove: (e: Partial<TouchEvent & MouseEvent>, swipeState: SwipeStateProps) => {
    x: number;
    y: number;
    offset: {
        x: number;
        y: number;
    };
};
export declare const getEnd: (e: Partial<TouchEvent & MouseEvent>, swipeState: SwipeStateProps) => {
    x: number;
    y: number;
    offset: {
        x: number;
        y: number;
    };
};
