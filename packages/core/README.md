# swipe-core-provider

The lightweight, framework-agnostic swipe calculation engine and state machine powering the **Custom-Swipe** ecosystem.

## Installation

```bash
npm install swipe-core-provider
# or
yarn add swipe-core-provider
```

## Features

- **Platform-Independent**: Zero UI dependencies, pure TypeScript calculations.
- **Gesture Normalization**: Normalizes coordinates and calculates velocity/offsets for both Mouse and Touch events.
- **Directional Support**: Horizontal (`row`) and Vertical (`column`) swipe axes with orthogonal shake filtering.
- **History & URL Synchronization**: Built-in HTML5 History API integration (`pushState`/`replaceState`) for URL-synced carousels.
- **Infinite Looping**: Modulo boundary wrapping with `isInfinite: true`.
- **SSR Safe**: Safe for Node.js / server-side rendering environments.

## API Reference

### `SwipeProvider<T>(itemLength: number, config?: ConfigProps)`

Returns an object with touch/mouse event listeners and control methods:

```typescript
import SwipeProvider from 'swipe-core-provider';

const swipe = SwipeProvider(items.length, {
  direction: 'row',
  isInfinite: true,
  isHistory: true,
  paramName: 'index',
  historyCallback: (state) => console.log('Current slide:', state.currentStep),
});
```

#### Return Object Methods

- `desktopStart(e: MouseEvent)`: Start mouse drag
- `desktopMove(e: MouseEvent, container: HTMLElement)`: Process mouse move
- `desktopEnd(e: MouseEvent, container: HTMLElement)`: Complete mouse gesture
- `mobileStart(e: TouchEvent)`: Start touch gesture
- `mobileMove(e: TouchEvent, container: HTMLElement)`: Process touch drag
- `mobileEnd(e: TouchEvent, container: HTMLElement)`: Complete touch gesture
- `resize(container: HTMLElement)`: Recalculate slide offset on window resize
- `init(container: HTMLElement)`: Synchronize slide position from URL query parameter
- `slidehandler(flag: 'L' | 'R', container: HTMLElement)`: Programmatic slide advance or retreat
- `changeIndex(index: number, container: HTMLElement)`: Jump directly to an index

## License

MIT © [Isa (YoonJong Ryu)](https://github.com/yoonjonglyu)
