import SplitType from 'split-type';
import { wrapLines, isInViewport } from './utils';
import gsap from 'gsap';

export default class TextLinesReveal {
  constructor(animationElems) {
    this.DOM = {
      animationElems: Array.isArray(animationElems)
        ? animationElems
        : [animationElems],
    };

    this.SplitTypeInstances = [];
    this.lines = [];

    for (const el of this.DOM.animationElems) {
      const SplitTypeInstance = new SplitType(el, {
        split: 'lines',
      });
      wrapLines(SplitTypeInstance.lines, 'div', 'oh');
      this.lines.push(SplitTypeInstance.lines);
      this.SplitTypeInstances.push(SplitTypeInstance);
    }

    this.initEvents();
  }
  in() {
    if (this.isVisible) return;
    this.isVisible = true;

    gsap.killTweensOf(this.lines);
    return gsap
      .timeline({ defaults: { duration: 1, ease: 'ease-out' } })
      .set(this.lines, {
        y: '150%',
      })
      .to(this.lines, {
        y: '0%',
      });
  }
  out() {
    this.isVisible = false;

    gsap.killTweensOf(this.lines);
    return gsap
      .timeline({
        defaults: { duration: 0.7, ease: 'power2' },
      })
      .to(this.lines, {
        y: '-150%',
        rotate: -5,
        stagger: 0.02,
      });
  }
  initEvents() {
    gsap.set(this.lines, {
      y: '-150%',
    });

    this.SplitTypeInstances[0].elements.forEach((el) => {
      window.addEventListener('scroll', () => {
        if (isInViewport(el)) {
          this.in();
        }
      });
    });
    // window.addEventListener('resize', () => {
    //   this.lines = [];
    //   for (const instance of this.SplitTypeInstances) {
    //     instance.split();
    //     wrapLines(instance.lines, 'div', 'oh');
    //     this.lines.push(instance.lines);
    //   }
    //   if (!this.isVisible) {
    //     gsap.set(this.lines, { y: '-150%' });
    //   }
    // });
  }
}
