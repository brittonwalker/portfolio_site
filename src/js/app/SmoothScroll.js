import gsap from 'gsap';

export default class SmoothScroll {
  constructor({ element, speed = 0.1 } = {}) {
    this.element = element;
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      speed: 0.5,
      limit: 0,
    };
    this.addEventListeners();
  }
  onMouseWheel(e) {
    const { deltaY } = e;
    this.scroll.target += deltaY;
    this.update();
  }
  update() {
    this.scroll.current = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );
    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      this.scroll.speed
    );
    this.element.style.transform = `translateY(-${this.scroll.current}px)`;
    requestAnimationFrame(this.update.bind(this));
  }
  onResize() {
    this.scroll.limit = this.element.clientHeight - window.innerHeight;
    console.log(this.element.clientHeight);
  }
  addEventListeners() {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('wheel', this.onMouseWheel.bind(this));
  }
  removeEventListeners() {
    window.removeEventListener('wheel', this.onMouseWheel.bind(this));
  }
}
