---
name: swipe-core
description: >-
  Workflows, conventions, and guidelines for developing, testing, and modifying the
  `swipe-core-provider` engine in `packages/core`. Use when touching gesture calculation,
  SwipeState state machine, History/URL sync, or adding platform-agnostic swipe features.
---

# `swipe-core-provider` Development Skill

## Overview
`swipe-core-provider` is the single source of truth for gesture mechanics, coordinate offset calculations, touch/mouse event parsing, and browser history synchronization in `custom-swipe`.

## Directory Layout
- `src/state.ts`: `SwipeState` finite state machine (`wait` -> `pending` -> `disable` -> `wait`). Handles `currentStep` boundaries and modulo loop for `isInfinite`.
- `src/swipeEvents.ts`: `swipestart`, `swipeMove`, `swipeEnd`. Calculates drag offsets, filters diagonal shake, and triggers step transitions.
- `src/swipeData.ts`: Normalizes `pageX`/`pageY` from MouseEvent and TouchEvent.
- `src/otherEvent.ts`: Resizing, index change, URL search params initialization and history pushing/replacing.
- `src/uri.ts`: SSR-safe URL and History API utility functions.
- `__tests__/`: Jest unit test suites for state, gestures, uri, and provider.

## Workflow & Guidelines
1. **Zero External Runtime Dependencies**: Keep the core lightweight and pure JavaScript/TypeScript.
2. **SSR Safety**: Always wrap `window`, `document`, `navigator`, and `location` accesses with `typeof window !== 'undefined'`.
3. **Running Tests**:
   ```bash
   yarn test:core
   ```
4. **Building**:
   ```bash
   yarn build:core
   ```
5. **Updating Types**: Edit `src/type/index.d.ts` when introducing new configuration props or state fields.
