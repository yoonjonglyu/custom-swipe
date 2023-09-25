import React, { createRef } from 'react';

import { ConfigProps } from 'swipe-core-provider';
import useSwipe from './useSwipe';

import './style.css';

interface SwipeConfigProps extends ConfigProps {
  isButton?: boolean;
}

export interface SwipeProps {
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  itemProps?: React.HTMLAttributes<HTMLLIElement>;
  item: Array<React.ReactNode>;
  config?: SwipeConfigProps;
}

const Swipe: React.FC<SwipeProps> = ({
  containerProps,
  itemProps,
  item,
  config,
}) => {
  const ref = createRef<HTMLUListElement>();
  const { swipeEvents, handleSlide } = useSwipe(ref, item.length, config);

  return (
    <div
      {...containerProps}
      className={`swipe-container ${containerProps?.className}`}>
      {config?.isButton ? (
        <div>
          <button
            className='swipe-left-button'
            onClick={() => handleSlide('L')}>
            L
          </button>
          <button
            className='swipe-right-button'
            onClick={() => handleSlide('R')}>
            R
          </button>
        </div>
      ) : null}
      <ul className='swipe-wrap' ref={ref} {...swipeEvents}>
        {item.map((item, key) => {
          return (
            <li
              key={key}
              {...itemProps}
              className={`swipe-item ${itemProps?.className}`}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Swipe;
