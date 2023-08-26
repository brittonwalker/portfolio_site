import each from 'lodash/each';
import Component from './Component';
import gsap from 'gsap';
import Experience from './Experience';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__title',
        progress: '.preloader__progress',
        images: document.querySelectorAll('img'),
      },
    });

    this.length = 0;
    this.experience = new Experience();

    if (this.elements.images.length > 0) {
      this.createLoader();
    } else {
      // this.elements.progress.innerHTML = `100%`;
      this.onLoaded();
    }
  }
  createLoader() {
    each(this.elements.images, (element) => {
      element.onload = (_) => this.onAssetLoaded(element);
      element.src = element.getAttribute('data-src');
    });
  }
  onAssetLoaded() {
    this.length += 1;
    const percent = this.length / this.elements.images.length;
    this.elements.progress.innerHTML = `${Math.round(percent * 100)}%`;

    if (percent === 1) {
      this.onLoaded();
    }
  }
  onLoaded() {
    this.experience.intro.start();
  }
  onComplete() {
    return new Promise((resolve) => {
      this.animateOut = gsap.timeline({
        ease: 'power2.out',
      });
      this.animateOut.to(this.element, {
        autoAlpha: 0,
      });
      this.animateOut.call((_) => {
        document.body.classList.remove('loading');
      });
    });
  }
  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
