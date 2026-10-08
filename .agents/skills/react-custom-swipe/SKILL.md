---
name: react-custom-swipe
description: >-
  Development guidelines, component patterns, and build procedures for the
  `react-custom-swipe` package in `packages/react-custom-swipe`. Use when updating React hooks,
  `<Swipe />`, `<Carousel />`, or React-specific touch event handlers.
---

# `react-custom-swipe` Development Skill

## Overview
`react-custom-swipe` provides React 18+ bindings for `swipe-core-provider`, offering both the declarative `<Swipe />` component and the headless `useSwipe` hook.

## Key Files
- `src/lib/useSwipe.ts`: React hook exposing memoized `swipeEvents`, `handleSlide`, and `changeIndex`. Listens to `popstate` for history synchronization.
- `src/lib/Swipe.tsx`: High-level wrapper component rendering an unordered list (`ul.swipe-wrap`) and optional carousel controls.
- `src/lib/Carousel.tsx`: Reusable previous/next button container and pagination dots.
- `src/lib/style.css`: Minimal required flexbox layout styles for swipe containment.

## Development Rules
1. **Never use setInterval polling**: Use `window.addEventListener('popstate', ...)` for reactive URL changes.
2. **Synthetic Event Bridging**: Pass `e.nativeEvent` to core providers to ensure consistency between touch and mouse events.
3. **Building & Types**:
   ```bash
   yarn build:react
   ```
4. **Testing in Demo**:
   Link or run with `packages/demo` to verify UX and visual smoothness.
