import TextLinesReveal from './TextLinesReveal';
import SkewScroll from './SkewScroll';
import Cursor from './Cursor';
import Links from './Links';
import MomentumScrolling from './MomentumScrolling';

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

    this.init();
  }

  init() {
    this.textLinesReveal = new TextLinesReveal(
      document.querySelectorAll('.text-reveal')
    ).in();
    this.skewScroll = new SkewScroll([...document.querySelectorAll('section')]);
    this.cursor = new Cursor();
    this.pageScroll = new MomentumScrolling(false);
  }
}
