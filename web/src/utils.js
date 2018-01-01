
// https://developer.mozilla.org/en-US/docs/Web/Events/resize
function createResizeHandler() {
  const callbacks = [];
  let running = false;

  // run the actual callbacks
  function runCallbacks(e) {
    callbacks.forEach(cb => cb(e));
    running = false;
  }

  // fired on resize event
  function resize(e) {
    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => runCallbacks(e));
      } else {
        setTimeout(() => runCallbacks(e), 66);
      }
    }
  }

  // adds callback to loop
  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
  }

  return {
    // public method to add additional callback
    add(callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    },
  };
}

export const optimizedResize = createResizeHandler();

export const MOBILE_MAX_WIDTH = 960;

export function isMobileViewEnabled(width) {
  return width < MOBILE_MAX_WIDTH;
}
