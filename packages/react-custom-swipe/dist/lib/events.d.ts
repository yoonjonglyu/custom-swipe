import React from 'react';
export default function SwipeEvents(Container: React.RefObject<HTMLElement>, itemLength: number): {
    desktopStart: (e: MouseEvent) => void;
    desktopMove: (e: MouseEvent) => void;
    desktopEnd: (e: MouseEvent) => void;
    mobileStart: (e: TouchEvent) => void;
    mobileMove: (e: TouchEvent) => void;
    mobileEnd: (e: TouchEvent) => void;
    resize: (e: Event) => void;
};
