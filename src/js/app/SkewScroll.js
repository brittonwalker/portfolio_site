// https://codepen.io/rauldronca/pen/yQrmeE
export default class SkewScroll {
  constructor(els) {
    this.DOM = {
      els: Array.isArray(els) ? els : [els],
    };
    this.currentPos = window.pageYOffset;

    this.update();
  }
  update = () => {
    const newPos = window.pageYOffset;
    const diff = newPos - this.currentPos;
    const speed = diff * 0.15;

    this.DOM.els.forEach((el) => {
      el.style.transition = `transform .3s`;
      el.style.transform = speed > 0 ? `skewY(${speed}deg)` : `skewY(0)`;
    });

    this.currentPos = newPos;

    requestAnimationFrame(this.update);
  };
}
