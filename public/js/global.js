/* Generated by Babel */
//raf scroll

"use strict";

var lastScrollY = 0;
var ticking = false;

var update = function update() {
  var w = window.pageYOffset;
  pTit.style.opacity = w < 55 ? 1 - 1.1 / 55 * w : 0;
  n.style.opacity = w > 105 && w < 155 ? 1 - 1.1 / 50 * (w - 105) : w <= 105 ? 1 : 0;
  ticking = false;
};

var requestTick = function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(update);
    ticking = true;
  }
};

var onScroll = function onScroll() {
  lastScrollY = window.pageYOffset;
  requestTick();
};

window.onscroll = onScroll;

//raf scroll end