# react-custom-swipe

react-custom-swipe is light and simple custom React library.  
Basic Swipe and Infinite Scroll Swipe are provided as components and custom hook.  
use querystring remember item index.  
[demo](https://yoonjonglyu.github.io/react-custom-swipe/)

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
    </div>)
};
```

## PROPS

1. Swipe(component)
   1. `items`: `Array<React.ReactNode>` swipe items.
   2. `containerProps?`: `React.HTMLAttributes<HTMLDivElement>` container(Root Node) props as react components.
   3. `itemProps?`: `React.HTMLAttributes<HTMLLIElement>` swipe item box(li node) props as react components.
   4. `config?`: `ConfigProps` swipe option config.
      1. `isHistory`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.
      4. `isCarousel?`: `boolean` use carousel mode need config isHistory flag false.
2. useSwipe(hook)
   1. `dom`: `React.RefObject<HTMLElement>` react ref props events target.
   2. `length`: `number` swipe item length(maxlength).
   3. `config?`: `ConfigProps` swipe option config.
      1. `isHistory`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.
3. `useSwipe`(hook) return
   1. `swipeEvents`: `UseSwipeEvents<T>`; React Swipe Event Handlers.
   2. `handleSlide`: `(flag: 'L' | 'R') => void`; use Slide handler.
   3. `changeIndex`: `(index: number) => void`; use goto index handler.

## Feature

1. Swipe
2. Infinite swipe(scroll)
3. Carousel

## LICENSE

MIT
