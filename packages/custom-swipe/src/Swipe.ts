import type { ConfigProps } from 'swipe-core-provider';
import type { UseSwipe } from './useSwipe';
import useSwipe from './useSwipe';

class CustomSwipe extends HTMLElement {
  shadow: ShadowRoot;
  _template: HTMLDivElement;
  _swipeEvents: UseSwipe<HTMLUListElement> | null;
  _wrap: HTMLUListElement;
  _config: ConfigProps;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this._swipeEvents = null;
    this._config = {};
    this._template = this.createTemplate();
    this._wrap = this.createWrap();
    this.setTemplate();
  }

  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {
    this.clearSwipe();
  }
  static get observedAttributes() {
    return [
      'children',
      'direction',
      'ishistory',
      'swipecss',
      'paramname'
    ];
  }
  attributeChangedCallback(name: string, oldValue: String, newValue: string) {
    this.render();
  }

  render() {
    this._config = this.getConfig();
    const wrap = this.shadow.querySelector('.swipe-wrap') as HTMLUListElement;
    wrap.innerHTML = '';
    Object.values(this.children).forEach((item) => {
      const itemNode = this.createItem();
      itemNode.appendChild(item.cloneNode(true));
      wrap.appendChild(itemNode);
    });
    this._config.direction === 'column'
      ? wrap.setAttribute('class', 'swipe-wrap column')
      : wrap.setAttribute('class', 'swipe-wrap row');
    this.clearSwipe();
    this.setSwipe();
  }
  setTemplate() {
    this.setStyle();
    this._template.appendChild(this._wrap);
    this.shadow.appendChild(this._template.cloneNode(true));
  }
  setStyle() {
    const inlineCSS = this.getAttribute('swipecss') || '';
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
    ${inlineCSS}
    `;
    this.shadow.appendChild(style);
  }
  createTemplate() {
    const template = document.createElement('div');
    template.setAttribute('class', 'swipe-container');
    return template;
  }
  createWrap() {
    const wrap = document.createElement('ul');
    wrap.setAttribute('class', 'swipe-wrap');
    return wrap;
  }
  createItem() {
    const item = document.createElement('li');
    item.setAttribute('class', 'swipe-item');
    return item;
  }

  setSwipe() {
    const wrap = this.shadow.querySelector('.swipe-wrap') as HTMLUListElement;
    const events = useSwipe(wrap, this._config);
    this._swipeEvents = events;
    window.addEventListener('resize', this._swipeEvents.resize, {
      passive: true,
    });
    for (const [key, value] of Object.entries(this._swipeEvents.events)) {
      wrap.addEventListener(key, value, { passive: true });
    }
    setTimeout(this._swipeEvents.init, 0);
  }
  clearSwipe() {
    if (this._swipeEvents === null) return;
    const wrap = this.shadow.querySelector('.swipe-wrap') as HTMLUListElement;
    window.removeEventListener('resize', this._swipeEvents.resize);
    for (const [key, value] of Object.entries(this._swipeEvents.events)) {
      wrap.removeEventListener(key, value);
    }
  }
  getConfig() {
    const isHistory: boolean = !!(this.getAttribute('ishistory') || false);
    const paramName = this.getAttribute('paramname') || 'index';
    const direction: 'column' | 'row' =
      this.getAttribute('direction') === 'column' ? 'column' : 'row';
    const historyCallback = (state: any) =>
      this.dispatchEvent(this.createSwipeEvents(state));
      
    return {
      isHistory,
      paramName,
      direction,
      historyCallback,
    };
  }
  createSwipeEvents(args: any) {
    return new CustomEvent('swipecb', {
      detail: args,
      composed: true,
      bubbles: true,
    });
  }
}

// Define the new element
const defineSwipe = () => customElements.define('custom-swipe', CustomSwipe);
export default defineSwipe;
