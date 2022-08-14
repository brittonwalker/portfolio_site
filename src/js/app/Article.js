import gsap from 'gsap';

export default class Article {
  DOM = {
    el: null,
    title: null,
    btn: null,
    container: null,
    imgWrap: null,
    img: null,
    description: null,
  };
  isAnimating = false;

  constructor(el) {
    if (!el) return;

    this.DOM = {
      el: el,
      container: document.querySelector('.article__wrap'),
      title: el.querySelector('.article__title'),
      imgWrap: el.querySelector('.article__img-wrap'),
      img: el.querySelector('.article__img'),
      description: el.querySelector('.article__description'),
      trigger: document.querySelector(
        `[data-article-trigger="${el.dataset.article}"]`
      ),
    };
    this.name = this.DOM.title.innerText;
    this.experience = window.experience;
    this.isAnimating = false;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.init();
  }
  init() {
    this.DOM.trigger.addEventListener('click', () => this.show());
  }
  show() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.experience.articles.current = this;

    const { el, title, container, imgWrap, img, description } = this.DOM;

    const openTimeline = gsap.timeline({
      defaults: { duration: 0.5, ease: 'ease' },
      onComplete: () => {
        this.isAnimating = false;
      },
    });
    openTimeline
      .add(() => {
        gsap.set(title, {
          y: '100%',
          opacity: 0,
        });
        gsap.set(imgWrap, { y: '100%' });
        gsap.set(img, { y: '-100%' }, 2);
        gsap.set(description, { y: '100px', opacity: 0 });
        el.classList.add('article--current');
      })
      .to(container, {
        height: '100%',
        pointerEvents: 'auto',
        ease: 'expo',
        duration: 1,
      })
      .addLabel('start', '>')
      .to(
        title,
        {
          y: '0%',
          opacity: 1,
        },
        'start'
      )
      .to(
        description,
        {
          y: '0px',
          opacity: 1,
        },
        'start'
      )
      .to(
        [imgWrap, img],
        {
          duration: 1,
          ease: 'expo',
          y: '0%',
        },
        'start'
      );

    return openTimeline;
  }
  hide() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const { el, title, container, imgWrap, img, description } = this.DOM;

    const closeTimeline = gsap.timeline({
      defaults: { duration: 0.5, ease: 'ease' },
      onComplete: () => {
        el.classList.remove('article--current');
        this.isAnimating = false;
      },
    });

    closeTimeline
      .addLabel('start', 0)
      .add(() => {
        closeTimeline.set(container, {
          pointerEvents: 'none',
        });
      })
      .to(
        img,
        {
          duration: 1,
          ease: 'expo',
          y: '-100%',
        },
        'start'
      )
      .to(
        imgWrap,
        {
          duration: 1,
          ease: 'expo',
          y: '100%',
        },
        'start'
      )
      .to(
        title,
        {
          y: '100%',
          opacity: 0,
        },
        '-=1'
      )
      .to(
        description,
        {
          y: '100px',
          opacity: 0,
        },
        '-=1'
      );

    return closeTimeline;
  }
}
