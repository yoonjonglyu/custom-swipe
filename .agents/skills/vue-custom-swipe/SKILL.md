---
name: vue-custom-swipe
description: >-
  Workflows, conventions, and Vite build configuration for the `vue-custom-swipe`
  package in `packages/vue-custom-swipe`. Use when updating Vue 3 components, composables,
  or build artifacts.
---

# `vue-custom-swipe` Development Skill

## Overview
`vue-custom-swipe` provides Vue 3 bindings (`useSwipe` composable and `<Swipe>` SFC) built as both ESM and UMD bundles using Vite.

## Key Files
- `lib/composables/useSwipe.ts`: Vue 3 composable managing native event listeners via `onMounted`, `onUpdated`, and `onBeforeUnmount`.
- `lib/components/SwipeWrap.vue`: Main swipe container component.
- `lib/index.ts`: Package entry point exporting `useSwipe` and `Swipe`.
- `vite.config.ts`: Library mode build producing `vue-custom-swipe.js` and `vue-custom-swipe.umd.cjs`.

## Guidelines
1. **Always clean up listeners**: Ensure all `addEventListener` calls in `onMounted` have symmetrical `removeEventListener` calls in `onBeforeUnmount`.
2. **Defensive null checks**: `ref.value` may be unmounted during fast route transitions; always guard with `if (!ref.value) return;`.
3. **Build & Typecheck**:
   ```bash
   yarn build:vue
   ```
