import gsap from 'gsap';
import EventEmitter from './EventEmitter';
import Experience from './Experience';
import { isInViewport } from './utils';

export default class WorkController extends EventEmitter {
  constructor() {
    super();
    return;
    this.experience = new Experience();
    this.element = document.querySelector('.work-table');
    this.items = this.element.querySelectorAll('.work-table__item');
    this.tableToggler = document.querySelector(
      '.work-grid__horizontal:not(.--selected)'
    );
    this.cardToggler = document.querySelector(
      '.work-grid__vertical:not(.--selected)'
    );
    console.log(this.tableToggler, this.cardToggler);
    this.cardSection = document.querySelector('.work-section');
    this.events();
    this.setup();
  }
  setup() {
    gsap.set(this.items, {
      autoAlpha: 0,
    });
    gsap.set(this.element, {
      y: '150px',
      autoAlpha: 0,
    });
  }
  showContainer() {
    gsap.to([this.element, this.items[0]], {
      y: 0,
      autoAlpha: 1,
    });
  }
  events() {
    this.experience.intro.on('intro:complete', () => {
      this.showContainer();
    });
    window.addEventListener('scroll', this.onScroll);
    this.tableToggler.addEventListener('click', this.onTableTogglerClick);
    this.cardToggler.addEventListener('click', this.onCardTogglerClick);
  }
  onTableTogglerClick = () => {
    this.cardSection.style.display = 'none';
    this.element.style.display = 'block';
    window.scrollTo(0, this.element.offsetTop);
  };
  onCardTogglerClick = () => {
    this.element.style.display = 'none';
    this.cardSection.style.display = 'block';
    window.scrollTo(0, this.cardSection.offsetTop);
  };
  onScroll = () => {
    this.items.forEach((item) => {
      if (isInViewport(item)) {
        gsap.to(item, {
          autoAlpha: 1,
        });
      }
    });
  };
}
