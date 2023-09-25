import React, { createRef } from 'react';

import { ConfigProps } from './core/otherEvent';
import useSwipe from './useSwipe';

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
      className='swipe-container'
      {...containerProps}
      style={{
        position: 'relative',
        display: 'flex',
        padding: 0,
        overflow: 'hidden',
        zIndex: 1,
        ...containerProps?.style,
      }}>
      {config?.isButton ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 999,
          }}>
          <button onClick={() => handleSlide('L')}>L</button>
          <button onClick={() => handleSlide('R')}>R</button>
        </div>
      ) : null}
      <ul
        className='swipe-wrap'
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          width: '100%',
          height: '100%',
          margin: '0 auto',
          padding: 0,
          listStyle: 'none',
          transitionProperty: 'transform',
          boxSizing: 'content-box',
        }}
        ref={ref}
        {...swipeEvents}>
        {item.map((item, key) => {
          return (
            <li
              key={key}
              className='swipe-item'
              {...itemProps}
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                height: '100%',
                textAlign: 'center',
                boxSizing: 'border-box',
                ...itemProps?.style,
              }}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Swipe;
