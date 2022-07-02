import React from 'react';

export interface SwipeProps {
  item: Array<React.ReactNode>;
}

const Swipe: React.FC<SwipeProps> = (props) => {
  const { item } = props;

  return (
    <div className='swipe-container'>
      <ul className='swipe-wrap'>
        {item.map((item, key) => {
          return <li className='swipe-item'>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Swipe;
