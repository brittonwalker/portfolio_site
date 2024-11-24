import TextLinesReveal from './TextLinesReveal';
import SkewScroll from './SkewScroll';
import Cursor from './Cursor';
import ImageReveal from './ImageReveal';
import Preloader from './Preloader';
import Intro from './Intro';
import Work from './Work';
import Lenis from '@studio-freight/lenis';

let instance = null;
export default class Experience {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
    window.experience = this;

    this.cursor = new Cursor();
    this.animatedELs = document.querySelectorAll('.text-reveal');
    this.animatedELs.forEach((el) => {
      new TextLinesReveal(el);
    });
    this.images = document.querySelectorAll('.float-item__thumb') || [];
    this.images.forEach((image) => {
      new ImageReveal(image);
    });

    this.intro = new Intro();
    // this.navigation = new Navigation();
    this.workTable = new Work();

    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    this.createPreloader();
  }
  createPreloader() {
    this.preloader = new Preloader();
    this.intro.on('intro:complete', () => this.preloader.onComplete());
  }
}
