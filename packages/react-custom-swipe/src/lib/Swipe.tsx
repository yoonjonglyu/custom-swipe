import React, { useRef, useEffect } from 'react';
import { ConfigProps } from 'swipe-core-provider';

import useSwipe from './useSwipe';
import Carousel from './Carousel';

import './style.css';

interface SwipeConfigProps extends ConfigProps {
  isCarousel?: boolean;
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
  const ref = useRef<HTMLUListElement>(null);
  const DotsRef = useRef<HTMLUListElement>(null);

  const { swipeEvents, handleSlide } = useSwipe(ref, item.length, {
    historyCallback: (state) => {
      config?.historyCallback && config?.historyCallback(state);
      handleDot(state.currentStep);
    },
    isHistory: config?.isHistory || false,
    paramName: config?.paramName,
  });

  const handleDot = (index: number) => {
    if (DotsRef.current !== null) {
      DotsRef.current.childNodes.forEach((node: ChildNode, idx: number) => {
        const Node = node as HTMLLIElement;
        Node.className = index === idx ? 'active' : '';
      });
    }
  };

  useEffect(() => {
    const index = new URLSearchParams(location.search).get('index');
    if (index) handleDot(parseInt(index));
  }, []);

  return (
    <div
      {...containerProps}
      className={`swipe-container ${containerProps?.className}`}>
      {config?.isCarousel && !config.isHistory ? (
        <div>
          <button
            className='swipe-button swipe-left-button'
            onClick={() => handleSlide('L')}>
            〈
          </button>
          <button
            className='swipe-button swipe-right-button'
            onClick={() => handleSlide('R')}>
            〉
          </button>
          <Carousel itemLength={item.length} ref={DotsRef} />
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
