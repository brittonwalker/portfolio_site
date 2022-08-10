// https://codepen.io/rauldronca/pen/yQrmeE
export default class SkewScroll {
  constructor(els) {
    this.DOM = {
      els: Array.isArray(els) ? els : [els],
    };
    this.currentPos = window.pageYOffset;
    this.maxSkew = 1;
    this.minSkew = 0;

    this.update();
  }
  update = () => {
    const newPos = window.pageYOffset;
    const diff = newPos - this.currentPos;

    let skew = diff * 0.25;

    if (skew > this.maxSkew || skew < this.minSkew) {
      if (skew > this.maxSkew) {
        skew = this.maxSkew;
      }
      if (skew < this.minSkew) {
        skew = this.minSkew;
      }
    }

    this.DOM.els.forEach((el) => {
      el.style.transition = `transform .3s`;
      el.style.transform = `skewY(${skew}deg)`;
    });

    this.currentPos = newPos;

    requestAnimationFrame(this.update);
  };
}
