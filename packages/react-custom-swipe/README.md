# react-custom-swipe

Lightweight, responsive, and headless React swipe library with optional URL history synchronization and infinite looping.

[![npm version](https://img.shields.io/npm/v/react-custom-swipe.svg)](https://www.npmjs.com/package/react-custom-swipe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://yoonjonglyu.github.io/custom-swipe/)

## Installation

```bash
npm install react-custom-swipe
# or
yarn add react-custom-swipe
```

## Quick Start

### 1. Declarative Component (`Swipe`)

```tsx
import React from 'react';
import ReactSwipe from 'react-custom-swipe';

export default function CarouselExample() {
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  return (
    <ReactSwipe
      item={slides}
      config={{
        direction: 'row',
        isCarousel: true,
        isInfinite: true,
        isHistory: true, // Syncs with ?index=N and back/forward navigation
        paramName: 'index',
        historyCallback: (state) => console.log('Current slide:', state.currentStep),
      }}
      containerProps={{ className: 'my-slider-container' }}
      itemProps={{ className: 'my-slide-item' }}
    />
  );
}
```

### 2. Headless Hook (`useSwipe`)

For complete control over markup and styling:

```tsx
import React, { useRef } from 'react';
import { useSwipe } from 'react-custom-swipe';

export default function HeadlessExample() {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const ref = useRef<HTMLUListElement>(null);

  const { swipeEvents, handleSlide, changeIndex } = useSwipe(ref, items.length, {
    direction: 'row',
    isInfinite: true,
  });

  return (
    <div>
      <div className="controls">
        <button onClick={() => handleSlide('L')}>Previous</button>
        <button onClick={() => handleSlide('R')}>Next</button>
      </div>

      <ul ref={ref} {...swipeEvents} className="swipe-wrap">
        {items.map((text, idx) => (
          <li key={idx} className="swipe-item">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Component Props: `<Swipe />`
- `item`: `Array<React.ReactNode>` - Array of slides to render.
- `config`: `SwipeConfigProps` - Optional configuration options.
- `containerProps`: `React.HTMLAttributes<HTMLDivElement>` - Props passed to the wrapper `div`.
- `itemProps`: `React.HTMLAttributes<HTMLLIElement>` - Props passed to each `li` item.

### Hook: `useSwipe(ref, length, config?)`
- `ref`: `React.RefObject<HTMLElement>` - Ref attached to the slider container list.
- `length`: `number` - Number of slides.
- `config`: `ConfigProps` - Configuration options.

### `ConfigProps`
- `direction`: `'row' | 'column'` (default: `'row'`) - Swipe axis.
- `isInfinite`: `boolean` (default: `false`) - Infinite wrap-around scrolling.
- `isHistory`: `boolean` (default: `false`) - Syncs slide state with browser URL query string and history.
- `paramName`: `string` (default: `'index'`) - Query parameter name.
- `isCarousel`: `boolean` (default: `false`) - Renders default arrow buttons and dot pagination.
- `historyCallback`: `(state: SwipeStateProps) => void` - Fired upon slide transition end.

## License

MIT © [Isa (YoonJong Ryu)](https://github.com/yoonjonglyu)
