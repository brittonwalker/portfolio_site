import Article from './Article';
import ArticleScroll from './ArticleScroll';
import gsap from 'gsap';

export default class Articles {
  constructor(el) {
    this.DOM = {
      el: el,
      items: Array.from(el.querySelectorAll('.article')),
      controls: {
        container: el.querySelector('.article__controls'),
        close: document.querySelector('.article__close'),
        next: document.querySelector('.article__next'),
        prev: document.querySelector('.article__prev'),
      },
      counter: {
        container: el.querySelector('.article__counter'),
        current: el.querySelector('.article__counter-current'),
        total: el.querySelector('.article__counter-total'),
      },
    };
    this.scroller = new ArticleScroll({
      container: document.querySelector('.float__container'),
      wrapper: document.querySelector('.float__wrapper'),
      items: [...document.querySelectorAll('.float__container .float-item')],
    });
    this.current = null;
    this.instances = [...this.DOM.items.map((item) => new Article(item))];
    this.counterData = {
      current: 0,
      total: this.instances.length,
    };
    this.open = this.open.bind(this);
    this.init();
  }

  init() {
    const { close, next, prev } = this.DOM.controls;
    close.addEventListener('click', () => this.close());
    next.addEventListener('click', () => this.next());
    prev.addEventListener('click', () => this.prev());
    this.DOM.counter.total.innerHTML = this.counterData.total;
  }

  updateCounter = (index) => {
    this.DOM.counter.current.innerHTML = index;
  };

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
    document.body.classList.add('lock-body');
    if (this.current && !this.current.isAnimating) this.current.hide();
    this.current = article;
    const index = this.instances.indexOf(article);
    this.updateCounter(index + 1);
    const { close, next, prev } = this.DOM.controls;
    const { container: counterContainer } = this.DOM.counter;
    gsap.set([close, prev, next, counterContainer], {
      opacity: 0,
    });
    await gsap.to(this.DOM.el, {
      height: '100%',
      pointerEvents: 'auto',
      ease: 'expo',
      duration: 1,
    });
    gsap.to([close, prev, next, counterContainer], {
      opacity: 1,
      duration: 0.3,
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
      this.updateCounter(instances.indexOf(nextItem) + 1);
      current.hide().then(() => {
        this.DOM.el.scrollTo(0, 0);
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
      this.updateCounter(instances.indexOf(prevItem) + 1);
      current.hide().then(() => {
        this.DOM.el.scrollTo(0, 0);
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
    if (this.isAnimating || current.isAnimating) return;
    this.isAnimating = true;
    const { close, prev, next } = this.DOM.controls;
    const { container: counterContainer } = this.DOM.counter;
    gsap.to([next, prev, close, counterContainer], {
      opacity: 0,
      duration: 0.3,
    });
    current.hide().then(() => {
      this.isAnimating = false;
      document.body.classList.remove('lock-body');
      this.current = null;
      gsap.to('.article__wrap', {
        height: '0',
        pointerEvents: 'none',
        ease: 'expo',
        duration: 1,
      });
    });
    document.removeEventListener('keydown', this.keyboardControls);
  };
}
