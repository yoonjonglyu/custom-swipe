import React, { createRef } from 'react';

import useSwipe from './useSwipe';

export interface SwipeProps {
  item: Array<React.ReactNode>;
}

const Swipe: React.FC<SwipeProps> = (props) => {
  const { item } = props;
  const ref = createRef<HTMLUListElement>();
  const SwipeEvents = useSwipe(ref, 5);

  return (
    <div
      className='swipe-container'
      style={{
        position: 'relative',
        display: 'flex',
        padding: 0,
        overflow: 'hidden',
        zIndex: 1,
      }}>
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
        {...SwipeEvents}>
        {item.map((item, key) => {
          return (
            <li
              key={key}
              className='swipe-item'
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                height: '100%',
                textAlign: 'center',
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
