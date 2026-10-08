import type { ConfigProps } from './type';
export default function SwipeProvider<T extends HTMLElement>(itemLength: number, config?: ConfigProps): {
    desktopStart: (e: MouseEvent) => void;
    desktopMove: (e: MouseEvent, Container: T) => void;
    desktopEnd: (e: MouseEvent, Container: T) => void;
    mobileStart: (e: TouchEvent) => void;
    mobileMove: (e: TouchEvent, Container: T) => void;
    mobileEnd: (e: TouchEvent, Container: T) => void;
    resize: (Container: T) => void;
    init: (Container: T) => void;
    slidehandler: (flag: 'L' | 'R', Container: T) => void;
    changeIndex: (index: number, Container: T) => void;
};
