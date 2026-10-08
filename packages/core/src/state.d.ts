import type { SwipeStateProps } from './type';
declare class SwipeState implements SwipeStateProps {
    private _isSwipe;
    private _startXY;
    private _current;
    private _itemLength;
    private _direction;
    private _isInfinite;
    constructor(itemLength: number, direction: 'row' | 'column', isInfinite?: boolean);
    get isSwipe(): "pending" | "wait" | "disable";
    get isInfinite(): boolean;
    get startX(): number;
    get startY(): number;
    get currentX(): number;
    get currentY(): number;
    get currentStep(): number;
    get swipeTime(): number;
    get direction(): "row" | "column";
    set currentX(value: number);
    set currentY(value: number);
    set currentStep(value: number);
    startSwipe(x: number, y: number): void;
    endSwipe(currentX: number, currentY: number, disableTime: number): void;
}
export default SwipeState;
