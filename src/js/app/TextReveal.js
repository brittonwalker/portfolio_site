import { gsap } from 'gsap';
import SplitType from 'split-type';
import { wrapLines, isInViewport } from './utils';

export default class TextReveal {
  constructor(el) {
    this.el = el;
    this.SplitTypeInstance = new SplitType(this.el, { types: 'lines' });
    wrapLines(this.SplitTypeInstance.lines, 'div', 'oh');
    this.events();
  }
  events() {
    this.inView();
    window.addEventListener('scroll', () => this.inView());
  }
  inView() {
    if (isInViewport(this.SplitTypeInstance.lines[0])) {
      this.in();
    } else {
      this.out();
    }
  }
  in() {
    this.isVisible = true;
    gsap.staggerFrom(
      this.SplitTypeInstance.lines[0],
      { y: '150%', rotate: -5 },
      0.02,
      0
    );
  }
  out() {
    this.isVisible = false;
  }
}
