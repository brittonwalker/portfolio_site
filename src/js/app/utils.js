import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config.js';
const imagesLoaded = require('imagesloaded');

// Preload images
const preloadImages = (selector) => {
  return new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll(selector), {}, resolve);
  });
};

const getBreakpoints = (breakpoint) => {
  const breakpoints = Object.keys(
    resolveConfig(tailwindConfig).theme.screens
  ).map((key) => {
    return {
      name: key,
      value: parseInt(
        resolveConfig(tailwindConfig).theme.screens[key].replace('px', '')
      ),
    };
  });
  return breakpoints.find((bp) => bp.name === breakpoint);
};

const wrapLines = (arr, wrapType, wrapClass) => {
  arr.forEach((el) => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    el.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(el);
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

export { preloadImages, wrapLines, isInViewport, getBreakpoints };
