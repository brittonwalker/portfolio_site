import { gsap } from 'gsap';

export default class ImageReveal {
  constructor(el) {
    this.DOM = {
      el,
      img: el.querySelector('img'),
    };
    this.init();
  }
  init() {
    const { el, img } = this.DOM;
    gsap.set(el, { y: '100%' });
    gsap.set(img, { y: '-100%' }, 2);
    window.addEventListener('scroll', () => {
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top <= window.innerHeight && rect.left <= window.innerWidth;
      if (inView) {
        gsap.to(el, { y: 0, duration: 1, ease: 'slow' });
        gsap.to(img, { y: 0, duration: 1, ease: 'slow' });
      }
    });
  }
}
