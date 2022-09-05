import { gsap } from 'gsap';
import SplitType from 'split-type';
import EventEmitter from './EventEmitter';
import { wrapLines } from './utils';

export default class Intro extends EventEmitter {
  constructor() {
    super();
    this.lines = document.querySelectorAll('.start-text');
    this.SplitTypeInstance = new SplitType(this.lines, { types: 'lines' });
    wrapLines(this.SplitTypeInstance.lines, 'div', 'oh');
    gsap.set(this.SplitTypeInstance.lines, {
      // y: '150%',
      autoAlpha: 0,
    });
    gsap.set('.start-paragraph', {
      autoAlpha: 0,
    });
    this.tl = null;
  }

  start = () => {
    return (this.tl = gsap
      .timeline({
        defaults: {
          duration: 1,
          ease: 'ease-linear',
        },
        onComplete: () => {
          document.body.classList.remove('loading');
          this.trigger('intro:complete');
        },
      })
      .to([this.SplitTypeInstance.lines, '.start-paragraph'], {
        // y: '0%',
        autoAlpha: 1,
      })).to('.start-paragraph', {
      autoAlpha: 1,
    });
  };
}
