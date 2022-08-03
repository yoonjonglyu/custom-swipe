# react-custom-swipe

react-custom-swipe is light and simple custom React library.  
Basic Swipe and Infinite Scroll Swipe are provided as components and custom hook.  
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
        itemProps={{ style: { border: '1px solid', minHeight: '360px' } }}
      />
    </div>
  );
};
```

2. Use Hook

```jsx
import React, { createRef } from 'react';
import { useSwipe } from 'react-custom-swipe';

const App = () => {
  const ref = createRef<HTMLUListElement>();

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
          {...useSwipe(ref, item.length)}>
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
   1. `items`: `Array<React.ReactNode>`
   2. `containerProps?`: `React.HTMLAttributes<HTMLDivElement>`
   3. `itemProps?`: `React.HTMLAttributes<HTMLLIElement>`
2. useSwipe(hook)
   1. `dom`: `React.RefObject<HTMLElement>`
   2. `length`: `number`

## Feature

1. swipe
2. infinite swipe(scroll)
3. etc

## LICENSE

MIT
