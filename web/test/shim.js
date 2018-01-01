
function rqf(callback) {
  setTimeout(callback, 0);
}

global.requestAnimationFrame = rqf;
