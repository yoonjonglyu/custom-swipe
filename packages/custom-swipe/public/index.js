import SwipeCoreProvider from 'https://cdn.jsdelivr.net/npm/swipe-core-provider@1.0.10/+esm';

function useSwipe(ref, config) {
  const _config = { isHistory: true, paramName: 'index', ...config };
  const Core = SwipeCoreProvider(ref.children.length || 0, _config);
  const events = {
    onTouchStart: (e) => Core.mobileStart(e),
    onTouchMove: (e) => Core.mobileMove(e, ref),
    onTouchEnd: (e) => Core.mobileEnd(e, ref),
    onTouchCancel: (e) => Core.mobileEnd(e, ref),
    onPointerDown: (e) => Core.desktopStart(e),
    onPointerMove: (e) => Core.desktopMove(e, ref),
    onPointerUp: (e) => Core.desktopEnd(e, ref),
    onPointerLeave: (e) => Core.desktopEnd(e, ref),
    onPointerCancel: (e) => Core.desktopEnd(e, ref),
  };
  return {
    handleSlide: (flag) => Core.slidehandler(flag, ref),
    changeIndex: (index) => Core.changeIndex(index, ref),
  };
}
class SwipeItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {}
}
class CustomSwipe extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }
  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    container.setAttribute('class', 'swipe-container');
    const wrap = document.createElement('ul');
    wrap.setAttribute('class', 'swipe-wrap');
    useSwipe(wrap, {});
    container.appendChild(wrap);

    [1, 2, 3, 4, 5].map((node) => {
      const item = document.createElement('li');
      item.setAttribute('class', 'swipe-item');
      item.textContent= node;
      wrap.appendChild(item);
    });

    const style = document.createElement('style');
    style.textContent = `
    .swipe-container {
      position: relative;
      display: flex;
      padding: 0;
      overflow: hidden;
      z-index: 1;
    }
    .swipe-wrap {
      position: relative;
      z-index: 1;
      display: flex;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0;
      list-style: none;
      box-sizing: content-box;
    }
    .swipe-container .column{
      flex-direction: column !important;
    }
    .swipe-item {
      position: relative;
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      box-sizing: border-box;
    }
    .swipe-item img {
      -webkit-user-drag: none;
    }
    .swipe-carousel {
      position: absolute;
    }
    .swipe-button {
      position: absolute;
      top: 50%;
      padding: 4px 2px 3px 4px;
      font-size: 2rem;
      color: rgba(48, 48, 48, 0.582);
      border: none;
      background: none;
      z-index: 2;
      cursor: pointer;
    }
    .swipe-left-button {
      left: 18px;
    }
    .swipe-right-button {
      right: 18px;
    }
    .carousel-dots {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      padding: 0;
      font-size: 0;
      z-index: 2;
    }
    .carousel-dots li {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 3px;
      list-style: none;
      font-size: 0px;
      border: 1px solid rgb(54, 53, 53);
      background: rgba(8, 8, 8, 0.199);
      border-radius: 100%;
    }
    .carousel-dots .active {
      background: rgb(103 39 39);
    }
    `; // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(container);
  }
} // Define the new element
const defineSwipe = () => customElements.define('custom-swipe', CustomSwipe);
defineSwipe();