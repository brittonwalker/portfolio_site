import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class SideScrollers {
  constructor(elems) {
    this.elems = elems;
    this.init();
  }
  init() {
    this.elems.map((el, index) => {
      const title = el.firstElementChild;
      const numberOfElsNeeded = Math.ceil(
        (window.innerWidth * 1.5) / title.clientWidth
      );
      // make array of number of elements needed and add them to the DOM
      const newElems = Array.from({ length: numberOfElsNeeded }, (v, k) => {
        const newEl = title.cloneNode(true);
        return newEl;
      });

      el.append(...newElems);

      // x: index % 2 === 0 ? '-50vh' : '50vh',

      gsap.to(el, {
        x: '-50vh',
        ease: 'none',
        delay: 0.5,
        scrollTrigger: {
          trigger: el,
          start: `top bottom-=${el.clientHeight * index}px`,
          end: () => '-=1px',
          scrub: true,
          markers: true,
        },
      });

      return el;
    });
  }
}
