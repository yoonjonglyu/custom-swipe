import React, { forwardRef } from 'react';

export interface CarouselProps {
  itemLength: number;
}

const Carousel = forwardRef<HTMLUListElement, CarouselProps>(
  ({ itemLength }, ref) => {
    return (
      <ul className='carousel-dots' ref={ref}>
        {new Array(itemLength).fill(true).map((_, idx) => {
          return (
            <li key={idx}>
              {idx}
            </li>
          );
        })}
      </ul>
    );
  },
);

export default Carousel;

