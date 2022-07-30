import React from 'react';
export interface SwipeProps {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    itemProps?: React.HTMLAttributes<HTMLLIElement>;
    item: Array<React.ReactNode>;
}
declare const Swipe: React.FC<SwipeProps>;
export default Swipe;
