import normalizeWheel from 'normalize-wheel';
import { getBreakpoints } from './utils';
export default class ArticleScroll {
  constructor({ container, wrapper, items }) {
    this.DOM = {
      container,
      wrapper,
      inner: wrapper.querySelector('.float__inner'),
      items: Array.isArray(items) ? items : [items],
    };

    this.breakpoint = getBreakpoints('xl');
    this.isMobile = null;
    this.init();
  }

  init() {
    this.setCurrentBreakpoint();
    this.setStickyELs();
    this.bindEvents();
  }

  setCurrentBreakpoint() {
    const width = window.innerWidth;
    this.isMobile = width < this.breakpoint.value;
  }

  setStickyELs = () => {
    const { container, inner } = this.DOM;
    if (!this.isMobile) {
      this.maxScrollContent = inner.offsetWidth;
      container.setAttribute(
        'style',
        'height: ' + this.maxScrollContent + 'px'
      );
    } else {
      container.removeAttribute('style');
    }
  };

  bindEvents = () => {
    window.addEventListener('wheel', (evt) => this.onScroll(evt));
    window.addEventListener('resize', () => this.onResize());
  };

  isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
  };

  onScroll = (evt) => {
    const { pixelY } = normalizeWheel(evt);
    const stickyEl = this.DOM.container;
    const scrollEl = this.DOM.wrapper;

    if (this.isElementInViewport(stickyEl)) {
      scrollEl.scrollLeft += pixelY;
    }

    // if stickyel is below viewport reset scroll
    if (!this.isElementInViewport(stickyEl)) {
      // scrollEl.scrollLeft = 0;
      // if top of stickyel is above viewport reset scroll to max
      if (stickyEl.getBoundingClientRect().top < 0) {
        scrollEl.scrollLeft = this.maxScrollContent;
      } else {
        scrollEl.scrollLeft = 0;
      }
    }
  };

  onResize = () => {
    this.setCurrentBreakpoint();
    this.setStickyELs();
  };
}
