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
    }),
      (this.articles = new Articles(document.querySelector('.article__wrap')));
    this.pageScroll = new MomentumScrolling(false);
    this.menu = new Navigation(document.querySelector('.main-nav'));
    this.workItems = new SideScrollers([
      ...document.querySelectorAll('.work__scroller'),
    ]);
    this.images = document.querySelectorAll('.float-item__thumb');
    this.images.forEach((image) => {
      new ImageReveal(image);
    });

    this.intro = new Intro();

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
