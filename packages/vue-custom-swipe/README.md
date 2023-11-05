# vue-custom-swipe

vue-custom-swipe is light and simple custom Vue library.  
Basic Swipe and Infinite Scroll Swipe are provided as components and composable.  
use querystring remember item index.  
[demo](https://yoonjonglyu.github.io/custom-swipe/)

## Install

1.yarn

```shell
yarn add vue-custom-swipe
```

2.npm

```shell
npm install vue-custom-swipe
```

## Use Example

1. Use Component

```jsx
<script lang="ts" setup>
import { SwipeItem, SwipeWrap } from 'vue-custom-swipe';

defineProps<{ items: Array<any> }>();
const swipeConfig = {
  isHistory: false, // default false
  paramName: 'index', // default index
  historyCallback: (state: any) => { console.log(state) },
  isCarousel: false, // defalut false
  direction: 'row' // default row
};
</script>

<template>
  <SwipeWrap :config="swipeConfig">
    <SwipeItem v-for="i in items" :key="i">
      {{ i }}
    </SwipeItem>
  </SwipeWrap>
</template>

<style scoped></style>
```

2. Use Composable

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

## Feature

1. Swipe
2. Infinite swipe(scroll)
3. Basic Carousel

## LICENSE

MIT
