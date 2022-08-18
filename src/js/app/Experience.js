import TextLinesReveal from './TextLinesReveal';
import SkewScroll from './SkewScroll';
import Cursor from './Cursor';
import MomentumScrolling from './MomentumScrolling';
import Navigation from './Navigation';
import SideScrollers from './SideScrollers';
import StickyScroll from './StickyScroll';
import Articles from './Articles';

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
    // this.textLinesReveal = new TextLinesReveal(
    //   document.querySelectorAll('.text-reveal')
    // );
    // this.skewScroll = new SkewScroll([
    //   ...document.querySelectorAll('.skew-item'),
    // ]);

    // this.stickyScrollers = new StickyScroll([
    //   ...document.querySelectorAll('.sticky-container'),
    // ]);
  }
}
