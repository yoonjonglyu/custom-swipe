# svelte-custom-swipe

Lightweight, responsive, and headless Svelte 4+ swipe library with URL history synchronization and infinite looping.

[![npm version](https://img.shields.io/npm/v/svelte-custom-swipe.svg)](https://www.npmjs.com/package/svelte-custom-swipe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://yoonjonglyu.github.io/custom-swipe/)

## Installation

```bash
npm install svelte-custom-swipe
# or
yarn add svelte-custom-swipe
```

## Quick Start

### 1. Component (`Swipe`)

```svelte
<script>
  import Swipe from 'svelte-custom-swipe';

  const items = ['Slide 1', 'Slide 2', 'Slide 3'];
  const config = {
    direction: 'row',
    isCarousel: true,
    isInfinite: true,
    isHistory: true,
  };
</script>

<Swipe item={items} {config}>
  <svelte:fragment slot="swipeitem" let:swipe>
    <div>{swipe}</div>
  </svelte:fragment>
</Swipe>
```

### 2. Hook (`useSwipe`)

```svelte
<script>
  import { useSwipe } from 'svelte-custom-swipe';

  let listRef;
  const { handleSlide, changeIndex } = useSwipe(() => listRef, {
    direction: 'row',
    isInfinite: true,
  });
</script>

<div>
  <button on:click={() => handleSlide('L')}>Prev</button>
  <button on:click={() => handleSlide('R')}>Next</button>

  <ul bind:this={listRef} class="swipe-wrap">
    <li class="swipe-item">Slide 1</li>
    <li class="swipe-item">Slide 2</li>
    <li class="swipe-item">Slide 3</li>
  </ul>
</div>
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
