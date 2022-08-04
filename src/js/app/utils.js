const imagesLoaded = require('imagesloaded');

// Preload images
const preloadImages = (selector) => {
  return new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll(selector), {}, resolve);
  });
};

const wrapLines = (elems, wrapType, wrapClass) => {
  elems.forEach((char) => {
    // add a wrap for every char (overflow hidden)
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    char.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(char);
  });
};

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export { preloadImages, wrapLines, isInViewport };
