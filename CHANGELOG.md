# Changelog

All notable changes to the `custom-swipe` monorepo packages will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] / [1.1.0] - 2026-10-09

### 🚀 Added
- **Infinite Looping (`isInfinite`)**: Added seamless modulo wrap-around scrolling across all packages when reaching slide boundaries.
- **Unit Testing Suite**: Implemented comprehensive Jest unit test suites for `swipe-core-provider` covering `SwipeState`, `swipeData`, `uri`, and `SwipeProvider` interfaces with 100% pass rate.
- **GitHub Actions CI**: Added continuous integration workflow (`.github/workflows/ci.yml`) matrix-testing Node.js 18 & 20 for install, unit tests, and full monorepo builds.
- **Cross-Platform Build System**: Switched Unix-specific `rm -rf` cleanup scripts to cross-platform `rimraf dist` for seamless Windows, macOS, and Linux support.
- **Antigravity IDE Agent Skills**: Created specialized workflow skills in `.agents/skills/` for `swipe-core`, `react-custom-swipe`, `vue-custom-swipe`, `svelte-custom-swipe`, and `custom-swipe`.
- **Comprehensive Documentation**: Completely revamped root `README.md` with framework-specific quick starts, Configuration API specification tables, and badges.

### ⚡ Performance & Bug Fixes
- **Eliminated 10ms Polling Interval**: Replaced high-frequency `setInterval(initCb, 10)` polling with native `window.addEventListener('popstate')` listeners in React, Vue, and Svelte wrappers, drastically saving CPU and battery.
- **Fixed Memory Leak in Svelte**: Added thorough cleanup of all DOM touch and mouse event listeners in `onDestroy`.
- **Runtime Crash Prevention**: Added defensive null guards for `target` and `target.children[0]` to prevent `TypeError: Cannot read properties of undefined` during fast mounting/unmounting.
- **Full SSR Support**: Protected all browser globals (`window`, `document`, `navigator`, `location`) with `typeof window !== 'undefined'` guards across all packages for Next.js, Nuxt, and SvelteKit SSR safety.
- **Hybrid Input & Mobile Emulation**: Removed rigid userAgent regex blocking, allowing smooth mouse drag gestures on touchscreen laptops, mouse-connected tablets, and desktop DevTools mobile emulation.
- **Web Component Boolean Parsing**: Fixed string boolean attribute parsing bug where `<custom-swipe ishistory="false">` was improperly treated as truthy.
- **Carousel + History Coexistence**: Unblocked carousel navigation buttons and dot pagination when `isHistory: true` is enabled.

### 📦 Package Releases
- `swipe-core-provider@1.1.0`
- `react-custom-swipe@1.3.0`
- `vue-custom-swipe@1.1.0`
- `svelte-custom-swipe@0.1.0`
- `custom-swipe@0.1.0`
