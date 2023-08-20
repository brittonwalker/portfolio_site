import gsap from 'gsap';
// https://codepen.io/Neil98/pen/VREJZb
// https://greensock.com/forums/topic/27450-how-to-utilize-momentuminertia-in-page-scrolling/
export default class MomentumScrolling {
  constructor(initialize = true) {
    this.DOM = {
      body: document.body,
      main: document.getElementById('main'),
    };
    // For scroll positions
    this.sx = 0;
    this.sy = 0;
    // For container positions
    this.dx = 0;
    this.dy = 0;

    this.speed = 0.1;

    if (!initialize) {
      return;
    }

    this.init();
  }

  init = () => {
    const { body, main } = this.DOM;
    body.style.height = main.clientHeight + 'px';

    main.style.position = 'fixed';
    main.style.top = 0;
    main.style.left = 0;

    window.addEventListener('scroll', () => this.easeScroll());
    window.requestAnimationFrame(this.update);
  };

  easeScroll = () => {
    this.sx = window.pageXOffset;
    this.sy = window.pageYOffset;
    return this;
  };

  update = () => {
    function li(a, b, n) {
      return (1 - n) * a + n * b;
    }

    this.dx = gsap.utils.interpolate(this.dx, this.sx, this.speed);
    this.dy = gsap.utils.interpolate(this.dy, this.sy, this.speed);

    this.dx = Math.floor(this.dx * 100) / 100;
    this.dy = Math.floor(this.dy * 100) / 100;

    this.DOM.main.style.transform = `translate3d(-${this.dx}px, -${this.dy}px, 0px)`;

    window.requestAnimationFrame(this.update);
  };
}
