import Article from './Article';
import gsap from 'gsap';

export default class Articles {
  DOM = {
    el: null,
    items: null,
  };
  constructor(el) {
    this.DOM = {
      el: el,
      items: Array.from(el.querySelectorAll('.article')),
      controls: {
        close: document.querySelector('.article__close'),
        next: document.querySelector('.article__next'),
        prev: document.querySelector('.article__prev'),
      },
    };
    this.current = null;
    this.instances = [...this.DOM.items.map((item) => new Article(item))];
    this.open = this.open.bind(this);
    this.init();
  }
  init() {
    const { close, next, prev } = this.DOM.controls;
    close.addEventListener('click', () => this.close());
    next.addEventListener('click', () => this.next());
    prev.addEventListener('click', () => this.prev());
  }
  open(article) {
    if (this.current) this.current.hide();
    this.current = article;
    return gsap
      .to(this.DOM.el, {
        height: '100%',
        pointerEvents: 'auto',
        ease: 'expo',
        duration: 1,
      })
      .then(() => {
        this.current.show();
      });
  }
  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const { instances, current } = this;
    const index = instances.indexOf(current);
    const nextItem = instances[index + 1];
    if (nextItem) {
      current.hide().then((test) => {
        nextItem.show().then(() => {
          this.isAnimating = false;
        });
      });
    } else {
      this.isAnimating = false;
    }
  }
  prev() {
    if (this.isAnimating) return;
    const { instances, current } = this;
    const index = instances.indexOf(current);
    const prevItem = instances[index - 1];
    if (prevItem) {
      current.hide().then(() => {
        prevItem.show().then(() => {
          this.isAnimating = false;
        });
      });
    } else {
      this.isAnimating = false;
    }
  }
  close() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const { current } = this;
    current.hide().then(() => {
      this.isAnimating = false;
      this.current = null;
      gsap.to('.article__wrap', {
        height: '0',
        pointerEvents: 'none',
        ease: 'expo',
        duration: 1,
      });
    });
  }
}
