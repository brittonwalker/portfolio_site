const { isInViewport } = require('./utils');

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
    const container = this.DOM.el.querySelector('.sticky-wrapper');
    const containerHeight = container.scrollWidth;
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
    const inView = this.isElementInViewport(this.DOM.el) ? this.DOM.el : null;

    if (!inView) {
      return;
    }

    var isPlaceHolderBelowTop =
      inView.offsetTop < document.documentElement.scrollTop;
    var isPlaceHolderBelowBottom =
      inView.offsetTop + inView.offsetHeight >
      document.documentElement.scrollTop;
    let g_canScrollHorizontally =
      isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

    if (g_canScrollHorizontally) {
      inView.querySelector('.sticky-wrapper').scrollLeft += evt.deltaY;
    }
  }
}

/**
 * By Alvaro Trigo
 * Follow me on Twitter: https://twitter.com/imac2
 */
// (function(){
// 	init();

// 	var g_containerInViewport;
// 	function init(){
// 			setStickyContainersSize();
// 			bindEvents();
// 	}

// 	function bindEvents(){
// 			window.addEventListener("wheel", wheelHandler);
// 	}

// 	function setStickyContainersSize(){
// 			document.querySelectorAll('.sticky-container').forEach(function(container){
// 					const stikyContainerHeight = container.querySelector('main').scrollWidth;
// 					container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
// 			});
// 	}

// 	function isElementInViewport (el) {
// 			const rect = el.getBoundingClientRect();
// 			return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
// 	}

// 	function wheelHandler(evt){

// 			const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
// 					return isElementInViewport(container);
// 			})[0];

// 			if(!containerInViewPort){
// 					return;
// 			}

// 			var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
// 			var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
// 			let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

// 			if(g_canScrollHorizontally){
// 					containerInViewPort.querySelector('main').scrollLeft += evt.deltaY;
// 			}
// 	}
// })();
