import { gsap } from 'gsap';
import SplitType from 'split-type';
import EventEmitter from './EventEmitter';
import { wrapLines } from './utils';
import Experience from './Experience';

export default class Intro extends EventEmitter {
  constructor() {
    super();
    this.lines = document.querySelectorAll('.start-text');
    this.SplitTypeInstance = new SplitType(this.lines, { types: 'lines' });
    wrapLines(this.SplitTypeInstance.lines, 'div', 'oh');
    gsap.set(this.SplitTypeInstance.lines, {
      y: '150%',
      autoAlpha: 0,
    });
    this.tl = null;
    this.experience = new Experience();
  }

  start = () => {
    return (this.tl = gsap
      .timeline({
        defaults: {
          duration: 1,
          ease: 'expo.out',
        },
        onComplete: () => {
          this.trigger('intro:complete');
        },
      })
      .to([this.SplitTypeInstance.lines], {
        y: '0%',
        autoAlpha: 1,
      }));
  };
}
