import TextLinesReveal from './TextLinesReveal';
import SkewScroll from './SkewScroll';
import Cursor from './Cursor';
import MomentumScrolling from './MomentumScrolling';
import Navigation from './Navigation';
import SideScrollers from './SideScrollers';
import StickyScroll from './StickyScroll';
import Articles from './Articles';
import ImageReveal from './ImageReveal';
import Preloader from './Preloader';
import Intro from './Intro';
import SmoothScroll from './SmoothScroll';
import WorkController from './WorkController';

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
    // this.workTable = new WorkController();

    this.createPreloader();
  }
  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.on('preloaded', () => this.onPreloaded());
  }
  onPreloaded() {
    this.preloader.destroy();
    this.intro.start();
  }
}
