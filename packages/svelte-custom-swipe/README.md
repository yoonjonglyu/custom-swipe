<p align="center"><img src="https://github.com/yoonjonglyu/custom-swipe/blob/main/swipe.png"title="custom_swipe_logo" alt="swipe_logo" />
</p>
<p algin="center">

# svelte-custom-swipe
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
yarn add svelte-custom-swipe
```

2.npm

```shell
npm install svelte-custom-swipe
```

## Use Example

0. Fix SSR Cannot use import statement outside a Module
```js
// vite config
export default defineConfig({
	plugins: [sveltekit()],
  // ...
	ssr: {
		noExternal: ['swipe-core-provider']// ssr Cannot use import statement outside a module 
	}
});
```

1. Use Component

```jsx
<script lang="ts">
import Swipe from 'svelte-custom-swipe';
const item = [
    'https://yoonjonglyu.github.io/custom-swipe/assets/c1dbbdc1b473d757ed94a80d6cff51f5.jpg',
    'https://yoonjonglyu.github.io/custom-swipe/assets/3f394bd7102b8da522047a82fd90f3e8.jpg',
    'https://yoonjonglyu.github.io/custom-swipe/assets/580b2619aaaa962d2fe3d9714de50cf7.jpg',
  ];
</script>
<Swipe {item}>
  <img slot="swipeitem" let:swipe src={swipe} alt={swipe} />
</Swipe>
```

2. Use Hook

```jsx
<script lang="ts" setup>
import { ref } from 'vue';
import { useSwipe, UseSwipeProps } from 'vue-custom-swipe';


const { config } = defineProps<{ config: UseSwipeProps }>();
const swipeRef = ref();
const { handleSlide, changeIndex } = useSwipe(swipeRef, { ...config });

</script>

<template>
  <div class='swipe-container'>
    <ul class='swipe-wrap' ref="swipeRef">
      <li class="swipe-item" v-for="i in items" :key="i">
        <img :src="i" alt="img" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.swipe-container {
  position: relative;
  display: flex;
  padding: 0;
  overflow: hidden;
  z-index: 1;
}
.swipe-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  box-sizing: content-box;
}
.swipe-container .column {
  flex-direction: column !important;
}
.swipe-item {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;

}
img {
-webkit-user-drag: none;
}
</style>
```

## PROPS

1. SwipeWrap(components)
   1. `config?`: `ConfigProps` swipe option config.
      1. `isHistory`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.
      4. `isCarousel?`: `boolean` use carousel mode need config isHistory flag false.
      5. `direction?`: `row | column` use vertical swipe option.(default: row)
2. useSwipe(composable)
   1. `dom`: `Ref<HTMLElement>` Vue ref props events target.
   2. `config?`: `ConfigProps` swipe option config.
      1. `isHistory`: `boolean` history change or push(default: false)(true ? push : replace).
      2. `paramName?`: `string` querystring key name(default: index).
      3. `historyCallback?`: `(state: SwipeStateProps) => void` swipeEnd event custom callback props swipe state.
      4. `direction?`: `row | column` use vertical swipe option.(default: row)
3. `useSwipe`(composable) return
   1. `handleSlide`: `(flag: 'L' | 'R') => void`; use Slide handler.
   2. `changeIndex`: `(index: number) => void`; use goto index handler.

## Features

1. Swipe
2. Infinite swipe(scroll)
3. Carousel

## LICENSE

MIT
