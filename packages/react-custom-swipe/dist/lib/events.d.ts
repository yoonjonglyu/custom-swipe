import React from 'react';
interface SwipeStateProps {
    isSwipe: boolean | null;
    startX: number;
    startY: number;
    currentX: number;
    currentStep: number;
    swipeTime: number;
}
export interface ConfigProps {
    isHistory: boolean;
    paramName?: string;
    historyCallback?: (state: SwipeStateProps) => void;
}
export default function SwipeEvents(Container: React.RefObject<HTMLElement>, itemLength: number, config?: ConfigProps): {
    desktopStart: (e: MouseEvent) => void;
    desktopMove: (e: MouseEvent) => void;
    desktopEnd: (e: MouseEvent) => void;
    mobileStart: (e: TouchEvent) => void;
    mobileMove: (e: TouchEvent) => void;
    mobileEnd: (e: TouchEvent) => void;
    resize: () => void;
    init: () => void;
};
export {};
