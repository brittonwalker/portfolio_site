import gsap from 'gsap';

//  https://github.com/skaltenegger/customcursor/blob/master/website/src/js/demo3.js

export default class Cursor {
  constructor() {
    this.outerCursor = document.querySelector('.circle-cursor--outer');
    this.innerCursor = document.querySelector('.circle-cursor--inner');
    this.outerCursorBox = this.outerCursor.getBoundingClientRect();
    this.outerCursorSpeed = 0;
    this.continer = document.getElementById('.container');
    this.easing = {
      _p1: 1.70158,
      _p2: 2.5949095,
    };
    this.clientX = -100;
    this.clientY = -100;
    this.showCursor = false;

    this.initCursor();
    this.initHovers();
  }

  initCursor() {
    document.addEventListener('mousemove', this.unveilCursor.bind(this));

    document.addEventListener('mousemove', (e) => {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    });

    requestAnimationFrame(this.render.bind(this));
  }

  initHovers() {
    return;
    const linkItems = document.querySelectorAll('a');
    linkItems.forEach((item) => {
      item.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      item.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });

    const mainNavLinks = document.querySelectorAll('a');
    mainNavLinks.forEach((item) => {
      item.addEventListener('mouseenter', this.mainNavMouseEnter.bind(this));
      item.addEventListener('mouseleave', this.mainNavMouseLeave.bind(this));
    });
  }
  unveilCursor = () => {
    gsap.set(this.innerCursor, {
      x: this.clientX,
      y: this.clientY,
    });
    gsap.set(this.outerCursor, {
      x: this.clientX - this.outerCursorBox.width / 2,
      y: this.clientY - this.outerCursorBox.height / 2,
    });
    setTimeout(() => {
      this.outerCursorSpeed = 0.2;
    }, 100);
    this.showCursor = true;
  };
  render = () => {
    gsap.set(this.innerCursor, {
      x: this.clientX,
      y: this.clientY,
    });
    if (!this.isStuck) {
      gsap.to(this.outerCursor, this.outerCursorSpeed, {
        x: this.clientX - this.outerCursorBox.width / 2,
        y: this.clientY - this.outerCursorBox.height / 2,
      });
    }
    if (this.showCursor) {
      document.removeEventListener('mousemove', this.unveilCursor);
    }
    requestAnimationFrame(this.render);
  };
  handleMouseEnter = (e) => {
    this.isStuck = true;
    const target = e.currentTarget;
    const box = target.getBoundingClientRect();
    this.outerCursorOriginals = {
      width: this.outerCursorBox.width,
      height: this.outerCursorBox.height,
    };
    gsap.to(this.outerCursor, 0.2, {
      x: box.left,
      y: box.top,
      width: box.width,
      height: box.height,
      borderRadius: 0,
      opacity: 0.4,
      // borderColor: '#ff0000',
    });
  };
  handleMouseLeave = () => {
    this.isStuck = false;
    gsap.to(this.outerCursor, 0.2, {
      width: this.outerCursorOriginals.width,
      height: this.outerCursorOriginals.height,
      opacity: 1,
      borderRadius: '50%',
      // borderColor: '#ffffff',
    });
  };
  mainNavHoverTween = () =>
    gsap.to(this.outerCursor, 0.3, {
      backgroundColor: '#ffffff',
      ease: this.easing,
      paused: true,
    });
  mainNavMouseEnter = () => {
    this.outerCursorSpeed = 0;
    gsap.set(this.innerCursor, { opacity: 0 });
    this.mainNavHoverTween.play();
  };

  mainNavMouseLeave = () => {
    this.outerCursorSpeed = 0.2;
    gsap.set(this.innerCursor, { opacity: 1 });
    this.mainNavHoverTween.reverse();
  };
}
