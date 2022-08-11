const { isInViewport } = require('./utils');
//codepen.io/alvarotrigo/pen/VwWMjVp?editors=1111

//TODO make this work with multiple elements

export default class StickyScroll {
  constructor(el) {
    this.DOM = {
      el: el[0],
    };
    this.init();
  }
  init() {
    this.setStickyELs();
    this.bindEvents();
  }
  setStickyELs() {
    const wrapper = this.DOM.el.querySelector('.sticky-wrapper');
    const containerHeight = wrapper.scrollWidth;
    this.DOM.el.setAttribute('style', 'height: ' + containerHeight + 'px');
  }
  bindEvents = () => {
    window.addEventListener('wheel', (evt) => this.onScroll(evt));
  };
  isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
  };
  onScroll(evt) {
    const stickyEl = this.isElementInViewport(this.DOM.el) ? this.DOM.el : null;

    if (!stickyEl) {
      return;
    }

    const scrollEl = stickyEl.querySelector('.sticky-wrapper');

    const isBelowTop = stickyEl.offsetTop < document.documentElement.scrollTop;
    const isBelowBottom =
      stickyEl.offsetTop + stickyEl.offsetHeight >
      document.documentElement.scrollTop;

    let canSideScroll = isBelowTop && isBelowBottom;

    if (canSideScroll) {
      scrollEl.scrollLeft += evt.deltaY;
    }
  }
}
