# custom-swipe

Lightweight, responsive Web Components and Vanilla JS swipe library with URL history synchronization and infinite looping.

[![npm version](https://img.shields.io/npm/v/custom-swipe.svg)](https://www.npmjs.com/package/custom-swipe)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/custom-swipe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://yoonjonglyu.github.io/custom-swipe/)

## Installation

```bash
npm install custom-swipe
# or
yarn add custom-swipe
```

## Quick Start

### 1. Web Component (`<custom-swipe>`)

```html
<script type="module">
  import { defineSwipe } from 'custom-swipe';
  defineSwipe();
</script>

<custom-swipe direction="row" ishistory="true" paramname="index">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</custom-swipe>
```

#### Observed Attributes:
- `direction`: `'row' | 'column'` (default: `'row'`)
- `ishistory`: `'true' | 'false'` (default: `'false'`)
- `paramname`: query parameter key (default: `'index'`)
- `swipecss`: custom inline CSS for Shadow DOM

#### Events:
- `swipecb`: Fired when slide transitions finish. The `event.detail` contains the `SwipeStateProps`.

```javascript
document.querySelector('custom-swipe').addEventListener('swipecb', (e) => {
  console.log('Active slide index:', e.detail.currentStep);
});
```

### 2. Vanilla JS Helper (`useSwipe`)

```javascript
import { useSwipe } from 'custom-swipe';

const element = document.querySelector('#my-slider');
const swipe = useSwipe(element, {
  direction: 'row',
  isInfinite: true,
  isHistory: true,
});

// Programmatic controls
swipe.handleSlide('R'); // Next
swipe.handleSlide('L'); // Previous
swipe.changeIndex(2);   // Jump
```

## License

MIT © [Isa (YoonJong Ryu)](https://github.com/yoonjonglyu)
