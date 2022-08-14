import TextLinesReveal from './TextLinesReveal';
import SkewScroll from './SkewScroll';
import Cursor from './Cursor';
import Links from './Links';
import MomentumScrolling from './MomentumScrolling';
import Navigation from './Navigation';
import SideScrollers from './SideScrollers';
import StickyScroll from './StickyScroll';
import Work from './Work';
import Articles from './Articles';

let DOM = {
  textRevealElements: document.querySelectorAll('.text-reveal'),
  links: document.querySelectorAll('a'),
};

let instance = null;

export default class Experience {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
    window.experience = this;

    this.textLinesReveal = new TextLinesReveal(
      document.querySelectorAll('.text-reveal')
    ).in();
    this.skewScroll = new SkewScroll([
      ...document.querySelectorAll('.skew-item'),
    ]);
    this.cursor = new Cursor();
    this.pageScroll = new MomentumScrolling(false);
    this.menu = new Navigation(document.querySelector('.main-nav'));
    this.workItems = new SideScrollers([
      ...document.querySelectorAll('.work__scroller'),
    ]);
    this.stickyScrollers = new StickyScroll([
      ...document.querySelectorAll('.sticky-container'),
    ]);
    this.articles = new Articles(document.querySelector('.article__wrap'));

    this.init();
  }

  init() {}
}
