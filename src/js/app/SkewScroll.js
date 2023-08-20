// https://codepen.io/rauldronca/pen/yQrmeE
import { isInViewport } from './utils';
export default class SkewScroll {
  constructor(els, options = {}) {
    this.DOM = {
      els: Array.isArray(els) ? els : [els],
    };
    this.currentPos = window.pageYOffset;
    this.options = {
      ...{
        direction: 'skewY',
        maxSkew: 1,
        minSkew: 0,
        speed: 0.25,
      },
      ...options,
    };

    this.update();
  }
  update = () => {
    const newPos = window.pageYOffset;
    const diff = newPos - this.currentPos;
    const { direction, maxSkew, minSkew, speed } = this.options;

    let skew = diff * speed;

    if (skew > maxSkew || skew < minSkew) {
      if (skew > maxSkew) {
        skew = maxSkew;
      }
      if (skew < minSkew) {
        skew = minSkew;
      }
    }

    this.DOM.els.forEach((el) => {
      el.style.transition = `transform .3s`;
      el.style.transform = `${direction}(${skew}deg)`;
    });

    this.currentPos = newPos;

    requestAnimationFrame(this.update);
  };
}
