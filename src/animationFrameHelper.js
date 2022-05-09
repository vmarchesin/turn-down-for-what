module.exports = function () {
  this.lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];

  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[`${vendors[i]}RequestAnimationFrame`];
    window.cancelAnimationFrame = window[`${vendors[i]}CancelAnimationFrame`]
                               || window[`${vendors[i]}CancelRequestAnimationFrame`];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback, element) => {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
      const timeoutFunc = window.setTimeout(function() { callback(); }, timeToCall);
      this.lastTime = currTime + timeToCall;

      return timeoutFunc;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (timeoutId) => clearTimeout(timeoutId);
  }
};