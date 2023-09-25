import React, { forwardRef } from 'react';

export interface CarouselProps {
  itemLength: number;
  ref: React.ForwardedRef<HTMLUListElement>;
}

const Carousel: React.FC<CarouselProps> = forwardRef(
  ({ itemLength }, ref: React.ForwardedRef<HTMLUListElement>) => {
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
