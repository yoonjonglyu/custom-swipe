<p align="center"><img src="https://github.com/yoonjonglyu/custom-swipe/blob/main/swipe.png"title="custom_swipe_logo" alt="swipe_logo" />
</p>
<p algin="center">

# custom-swipe

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
yarn add custom-swipe
```

2.npm

```shell
npm install custom-swipe
```

## Use Example

1. Use Component

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>swipe</h1>
    <custom-swipe
      direction="column"
      swipecss=".swipe-container{height: 200px; background: blue;} .item {width: 100%;
  height: 200px;
  background-color: aqua;
  border: red 1px solid;} "
      paramname="index"
      isHistory="false"
    >
      <p class="item">1</p>
      <p class="item">2</p>
      <p class="item">3</p>
    </custom-swipe>
  </body>
  <script type="module">
    import {
      useSwipe,
      defineSwipe,
    } from 'https://cdn.jsdelivr.net/npm/custom-swipe@0.0.1/+esm';
    defineSwipe();
    const swipe = document.querySelector('custom-swipe');
    swipe.addEventListener('swipecb', (e) => {
      console.log(e.detail);
    });
  </script>
</html>

```

2. Use Hook

```js
import { useSwipe } from 'custom-swipe';

const swipeWrap = document.querySelector('.swipe-wrap');
const { events, resize, init } = useSwipe(wrap, {
  isHistory: false,
  paramName: 'index',
  direction: 'row',
  historyCallback: (state) => console.log(state),
});
window.addEventListener('resize', resize, {
  passive: true,
});
for (const [key, value] of Object.entries(events)) {
  wrap.addEventListener(key, value, { passive: true });
}
setTimeout(init, 0);
```

## PROPS

1. custom-swipe(component)
   1. `children`: `HTMLElement` swipe items.
   2. `config?`: `ConfigProps` swipe option config.
      1. `isHistory?`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `direction?`: `row | column` use vertical swipe option.(default: row).
   3. `swipecb`: `CustomEvents` type 'swipecb' swipe end to cb user custom event. detail is swipe state.
2. useSwipe(hook)
   1. `dom`: `HTMLElement` events target.
   2. `config?`: `ConfigProps` swipe option config.
      1. `isHistory?`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.
      4. `direction?`: `row | column` use vertical swipe option.(default: row)
3. `useSwipe`(hook) return
   1. `swipeEvents`: `UseSwipeEvents<T>`; React Swipe Event handlers.
   2. `handleSlide`: `(flag: 'L' | 'R') => void`; use Slide handler.
   3. `changeIndex`: `(index: number) => void`; use goto index handler.
   4. `resize`: `VoidFunction`swipe resize events handler.
   5. `init`: `VoidFunction` swipe init events handler.

## Features

1. swipe
2. Infinite swipe(scroll)

## LICENSE

MIT
