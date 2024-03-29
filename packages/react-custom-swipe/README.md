
<p align="center"><img src="https://github.com/yoonjonglyu/custom-swipe/blob/main/swipe.png"title="custom_swipe_logo" alt="swipe_logo" />
</p>
<p algin="center">

# react-custom-swipe

# Custom-Swipe: A Lightweight and Headless Frontend Library

Custom-Swipe is a versatile solution designed for seamless user interactions in web applications. Whether you're building a responsive web app or enhancing the user experience on various devices, Custom-Swipe offers a range of swipe features. It serves as both a basic component for easy integration and a powerful headless hook for developers seeking granular control.

## Key Features

- **Lightweight:** Minimize your bundle size with our lightweight library.
- **Responsive:** Ensure smooth interactions across various devices and screen sizes.
- **Customizable:** Tailor swipe behavior to suit your application's specific needs.
- **Headless Hook:** For developers who prefer a programmatic approach, our headless hook provides extensive control over swipe events.

Explore the possibilities with Custom-Swipe and elevate your frontend development experience.
[demo](https://yoonjonglyu.github.io/custom-swipe/)

## Install

1.yarn

```shell
yarn add react-custom-swipe
```

2.npm

```shell
npm install react-custom-swipe
```

## Use Example

1. Use Component

```jsx
import React from 'react';
import ReactSwipe from 'react-custom-swipe';

const App = () => {
  return (
    <div>
      <h1>Component Demo</h1>
      <ReactSwipe
        item={[1, 2, 3, 4, 5, <div>item</div>, <img src={'src'} alt={'src'} />]}
        containerProps={{ style: { border: '1px solid' } }}
        itemProps={{ style: { border: '1px solid' } }}
        config={{
          isHistory: false,
          paramName: 'index',
          historyCallback: (state) => console.log('swipeState', state),
          isCarousel: true,
        }}
      />
    </div>
  );
};
```

2. Use Hook

```jsx
import React, { createRef, useState } from 'react';
import { useSwipe } from 'react-custom-swipe';

const App = () => {
  const [item, setItem] = useState([<div>test</div>, <div>test2</div>, 1, '2']);
  const ref = useRef<HTMLUListElement>(null);
  const DotsRef = useRef<HTMLUListElement>(null);

  const { swipeEvents, handleSlide, changeIndex } = useSwipe(ref, item.length, {
    ...config,
    historyCallback: (state) => {
      config?.historyCallback && config?.historyCallback(state);
      handleDot(state.currentStep);
    },
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
    </div>)
};
```

## PROPS

1. Swipe(component)
   1. `items`: `Array<React.ReactNode>` swipe items.
   2. `containerProps?`: `React.HTMLAttributes<HTMLDivElement>` container(Root Node) props as react components.
   3. `itemProps?`: `React.HTMLAttributes<HTMLLIElement>` swipe item box(li node) props as react components.
   4. `config?`: `ConfigProps` swipe option config.
      1. `isHistory?`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.
      4. `isCarousel?`: `boolean` use carousel mode need config isHistory flag false.
      5. `direction?`: `row | column` use vertical swipe option.(default: row)
2. useSwipe(hook)
   1. `dom`: `React.RefObject<HTMLElement>` react ref props events target.
   2. `length`: `number` swipe item length(maxlength).
   3. `config?`: `ConfigProps` swipe option config.
      1. `isHistory?`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.
      4. `direction?`: `row | column` use vertical swipe option.(default: row)
3. `useSwipe`(hook) return
   1. `swipeEvents`: `UseSwipeEvents<T>`; React Swipe Event Handlers.
   2. `handleSlide`: `(flag: 'L' | 'R') => void`; use Slide handler.
   3. `changeIndex`: `(index: number) => void`; use goto index handler.

## Features

1. Swipe
2. Infinite swipe(scroll)
3. Carousel

## LICENSE

MIT
