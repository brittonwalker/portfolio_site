import gsap from 'gsap';
import EventEmitter from './EventEmitter';
import Experience from './Experience';
import { isInViewport } from './utils';

export default class Work extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.elements = document.querySelectorAll('.work li');
    this.init();
  }
  init() {
    // hide elements not in viewport
    this.elements.forEach((el) => {
      if (!isInViewport(el)) {
        gsap.set(el, {
          autoAlpha: 0,
        });
      }
    });
    // add event listeners
    window.addEventListener('scroll', () => this.onScroll());
  }
  onScroll() {
    this.elements.forEach((el) => {
      if (isInViewport(el)) {
        gsap.to(el, {
          autoAlpha: 1,
          duration: 0.5,
        });
      }
    });
  }
}
