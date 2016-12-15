//raf scroll

let lastScrollY = 0
let ticking = false

let update = () => {
  let w = window.pageYOffset
  pTit.style.opacity = (w < 55) ? 1-1.1/55*w : 0
  n.style.opacity = (w > 105 && w < 155) ? 1-1.1/50*(w-105) : (w <= 105) ? 1 : 0
  ticking = false
}

let requestTick = () => {
  if (!ticking) {
    window.requestAnimationFrame(update)
    ticking = true
  }
}

let onScroll = () => {
  lastScrollY = window.pageYOffset
  requestTick()
}

window.onscroll = onScroll

//raf scroll end