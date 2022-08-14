import Article from './Article';
import gsap from 'gsap';

export default class Articles {
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
  keyboardControls = (e) => {
    if (e.keyCode === 39) {
      this.next();
    } else if (e.keyCode === 37) {
      this.prev();
    } else if (e.keyCode === 27) {
      this.close();
    }
  };
  open = async (article) => {
    if (this.current && !this.current.isAnimating) this.current.hide();
    this.current = article;
    await gsap.to(this.DOM.el, {
      height: '100%',
      pointerEvents: 'auto',
      ease: 'expo',
      duration: 1,
    });
    this.current.show();
    this.isAnimating = false;
    document.addEventListener('keydown', this.keyboardControls);
  };
  next = () => {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const { instances, current } = this;
    const index = instances.indexOf(current);
    const nextItem = instances[index + 1] || instances[0];
    if (nextItem && !current.isAnimating) {
      current.hide().then((test) => {
        nextItem.show().then(() => {
          this.isAnimating = false;
        });
      });
    } else {
      this.isAnimating = false;
    }
  };
  prev = () => {
    if (this.isAnimating) return;
    const { instances, current } = this;
    const index = instances.indexOf(current);
    const prevItem = instances[index - 1] || instances[instances.length - 1];
    if (prevItem && !current.isAnimating) {
      current.hide().then(() => {
        prevItem.show().then(() => {
          this.isAnimating = false;
        });
      });
    } else {
      this.isAnimating = false;
    }
  };
  close = () => {
    const { current } = this;
    if (this.isAnimating) return;
    if (!current.isAnimating) {
      this.isAnimating = true;
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
    document.removeEventListener('keydown', this.keyboardControls);
  };
}
