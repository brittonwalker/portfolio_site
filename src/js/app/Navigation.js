export default class Navigation {
  constructor(element) {
    this.DOM = {
      menu: element,
      trigger: document.querySelector('.menu-trigger'),
      body: document.body,
    };
    this.init();
  }
  init() {
    const { menu, trigger, body } = this.DOM;

    trigger.addEventListener('click', () => {
      body.classList.contains('is-active') ? this.close() : this.open();
    });

    body.addEventListener('click', (e) => this.checkClick(e), true);
  }
  open() {
    const { body } = this.DOM;
    body.classList.add('is-active');
  }
  close() {
    const { body } = this.DOM;
    body.classList.remove('is-active');
  }
  checkClick(e) {
    const { menu, body, trigger } = this.DOM;
    // and is not trigger
    if (
      body.classList.contains('is-active') &&
      !menu.contains(e.target) &&
      !trigger.contains(e.target)
    ) {
      this.close();
    }
  }
}
