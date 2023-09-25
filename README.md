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
  const ref = createRef<HTMLUListElement>();
  const { swipeEvents, handleSlide }  = useSwipe(ref, item.length, {
          isHistory: false,
          paramName: 'index',
          historyCallback: (state) => console.log('swipeState', state),
        });

  return (
    <div>
      <h1>Hook Demo</h1>
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
          {...swipeEvents}>
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
    </div>
  );
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
      4. `isButton?`: `boolean` left and right slide button.
2. useSwipe(hook)
   1. `dom`: `React.RefObject<HTMLElement>` react ref props events target.
   2. `length`: `number` swipe item length(maxlength).
   3. `config?`: `ConfigProps` swipe option config.
      1. `isHistory`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.

## Feature

1. swipe
2. infinite swipe(scroll)
3. etc

## LICENSE

MIT
