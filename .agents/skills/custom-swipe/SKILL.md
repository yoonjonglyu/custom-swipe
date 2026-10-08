---
name: custom-swipe
description: >-
  Development guidelines and custom element standards for the `custom-swipe`
  Web Components and Vanilla JS package in `packages/custom-swipe`. Use when updating Shadow DOM,
  custom element attributes, or Vanilla JS swipe helpers.
---

# `custom-swipe` Web Components Development Skill

## Overview
`custom-swipe` defines the `<custom-swipe>` Custom Element using Shadow DOM and pure DOM manipulation, enabling framework-agnostic swipe functionality.

## Key Files
- `src/Swipe.ts`: `CustomSwipe` class extending `HTMLElement`. Defines Shadow DOM template, observes attributes (`direction`, `ishistory`, `paramname`), and emits `swipecb` custom events.
- `src/useSwipe.ts`: Vanilla JS helper for binding swipe events to arbitrary DOM elements.
- `src/index.ts`: Exports `defineSwipe` and `useSwipe`.

## Guidelines
1. **Attribute Parsing**: Web component attributes are always strings. Parse boolean attributes like `ishistory` carefully (`attr !== null && attr !== 'false'`).
2. **Shadow DOM Encapsulation**: Keep default styles inside the shadow root and expose styling hooks via attributes or CSS variables.
3. **Build**:
   ```bash
   yarn build:custom
   ```
