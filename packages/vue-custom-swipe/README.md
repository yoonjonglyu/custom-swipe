# vue-custom-swipe

Lightweight, responsive, and headless Vue 3 swipe library with URL history synchronization and infinite looping.

[![npm version](https://img.shields.io/npm/v/vue-custom-swipe.svg)](https://www.npmjs.com/package/vue-custom-swipe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://yoonjonglyu.github.io/custom-swipe/)

## Installation

```bash
npm install vue-custom-swipe
# or
yarn add vue-custom-swipe
```

## Quick Start

### 1. Component (`Swipe`)

```vue
<script setup>
import { Swipe } from 'vue-custom-swipe';
import 'vue-custom-swipe/dist/index.css';

const config = {
  direction: 'row',
  isCarousel: true,
  isInfinite: true,
  isHistory: true,
  paramName: 'index',
};
</script>

<template>
  <Swipe :config="config">
    <li class="swipe-item">Slide 1</li>
    <li class="swipe-item">Slide 2</li>
    <li class="swipe-item">Slide 3</li>
  </Swipe>
</template>
```

### 2. Composable (`useSwipe`)

```vue
<script setup>
import { ref } from 'vue';
import { useSwipe } from 'vue-custom-swipe';

const listRef = ref(null);
const { handleSlide, changeIndex } = useSwipe(listRef, {
  direction: 'row',
  isInfinite: true,
});
</script>

<template>
  <div>
    <button @click="handleSlide('L')">Prev</button>
    <button @click="handleSlide('R')">Next</button>

    <ul ref="listRef" class="swipe-wrap">
      <li class="swipe-item">Slide 1</li>
      <li class="swipe-item">Slide 2</li>
      <li class="swipe-item">Slide 3</li>
    </ul>
  </div>
</template>
```

## Configuration API (`ConfigProps`)

- `direction`: `'row' | 'column'` (default: `'row'`) - Swipe axis.
- `isInfinite`: `boolean` (default: `false`) - Infinite looping.
- `isHistory`: `boolean` (default: `false`) - Browser URL query string and history synchronization.
- `paramName`: `string` (default: `'index'`) - Query parameter name.
- `isCarousel`: `boolean` (default: `false`) - Renders navigation buttons and pagination dots.
- `historyCallback`: `(state: SwipeStateProps) => void` - Callback on transition end.

## License

MIT © [Isa (YoonJong Ryu)](https://github.com/yoonjonglyu)
