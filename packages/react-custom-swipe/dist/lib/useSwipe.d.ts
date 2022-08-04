import React from 'react';
import { ConfigProps } from './events';
export interface UseSwipeEvents<T> {
    onTouchStart: React.TouchEventHandler<T>;
    onTouchMove: React.TouchEventHandler<T>;
    onTouchEnd: React.TouchEventHandler<T>;
    onTouchCancel: React.TouchEventHandler<T>;
    onPointerDown: React.PointerEventHandler<T>;
    onPointerMove: React.PointerEventHandler<T>;
    onPointerUp: React.PointerEventHandler<T>;
}
export default function useSwipe(dom: React.RefObject<HTMLElement>, length: number, config?: ConfigProps): UseSwipeEvents<HTMLElement | null>;
