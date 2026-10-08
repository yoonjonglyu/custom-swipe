---
name: svelte-custom-swipe
description: >-
  Development guidelines and build procedures for the `svelte-custom-swipe` package
  in `packages/svelte-custom-swipe`. Use when updating Svelte 4+ components, hooks, or package exports.
---

# `svelte-custom-swipe` Development Skill

## Overview
`svelte-custom-swipe` provides Svelte 4+ bindings (`useSwipe` hook function and `<Swipe>` component) packaged with `@sveltejs/package`.

## Key Files
- `src/lib/hooks/useSwipe.ts`: Hook accepting a getter function `ref: () => T` to attach native event handlers and cleanup in `onDestroy`.
- `src/lib/components/Swipe.svelte`: Svelte swipe container with slot support (`let:swipe`).
- `src/lib/index.ts`: Package entry point.

## Guidelines
1. **Memory Leak Prevention**: In `onDestroy`, remove all event listeners (`mousedown`, `mousemove`, `mouseup`, `touchstart`, `touchmove`, `touchend`, `resize`, `popstate`).
2. **SSR Safety**: Check `typeof window !== 'undefined'` before accessing `window` or `location`.
3. **Build & Package**:
   ```bash
   yarn build:svelte
   ```
