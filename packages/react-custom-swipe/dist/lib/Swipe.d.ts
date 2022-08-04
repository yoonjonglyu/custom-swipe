import React from 'react';
import { ConfigProps } from './events';
export interface SwipeProps {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    itemProps?: React.HTMLAttributes<HTMLLIElement>;
    item: Array<React.ReactNode>;
    config?: ConfigProps;
}
declare const Swipe: React.FC<SwipeProps>;
export default Swipe;
