import normalizeWheel from 'normalize-wheel';

export default class ArticleScroll {
  constructor({ container, wrapper, items }) {
    this.DOM = {
      container,
      wrapper,
      inner: wrapper.querySelector('.float__inner'),
      items: Array.isArray(items) ? items : [items],
    };
    this.init();
  }

  init() {
    this.setStickyELs();
    this.bindEvents();
  }

  setStickyELs = () => {
    const { container, wrapper, inner } = this.DOM;
    this.maxScrollContent = inner.scrollWidth;
    container.setAttribute('style', 'height: ' + this.maxScrollContent + 'px');
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
    const { container } = this.DOM;

    const stickyEl = container;
    const inView = this.isElementInViewport(stickyEl);
    const scrollEl = this.DOM.wrapper;

    const isBelowTop = stickyEl.offsetTop < document.documentElement.scrollTop;
    const isBelowBottom =
      stickyEl.offsetTop + stickyEl.offsetHeight >
      document.documentElement.scrollTop;

    let canSideScroll = isBelowTop && isBelowBottom;

    if (canSideScroll && inView) {
      scrollEl.scrollLeft += pixelY;
    } else if (isBelowTop) {
      scrollEl.scrollLeft = scrollEl.scrollWidth;
    } else if (isBelowBottom) {
      scrollEl.scrollLeft = 0;
    }
  };

  onResize = () => {
    this.setStickyELs();
  };
}
