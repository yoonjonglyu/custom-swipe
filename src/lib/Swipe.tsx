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
    <div className='swipe-container'>
      <ul className='swipe-wrap' ref={ref} {...SwipeEvents}>
        {item.map((item, key) => {
          return <li className='swipe-item'>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Swipe;
