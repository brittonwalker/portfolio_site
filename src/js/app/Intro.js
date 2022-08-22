import { gsap } from 'gsap';
import { wrapLines } from './utils';

export default class Intro {
  constructor() {
    this.lines = document.querySelectorAll('.start-text');
    wrapLines(document.querySelectorAll('.start-text'), 'div', 'oh');
    gsap.set(document.querySelectorAll('.start-text'), {
      y: '150%',
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
      })
      .to(this.lines, {
        y: '0%',
        // stagger: 0.5,
      }));
  };
}
