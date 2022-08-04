import gsap from 'gsap';
import { isInViewport } from './utils';

export default class Links {
  constructor(links) {
    this.DOM = {
      links: Array.isArray(links) ? links : [links],
    };

    this.instances = [];

    console.log(this.DOM.links);

    this.initEvents();
  }
  initEvents() {
    this.DOM.links.forEach((link) => {
      // listen for is in viewport
      link.addEventListener('inview', (e) => {});
    });
  }
}
