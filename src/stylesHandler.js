function addCurrStyles(nodes, noDelay) {
  const currClass = this.getCurrClass.call(this);

  nodes = Array.prototype.slice.call(document.querySelectorAll(nodes.join(', ')));
  const max = this.maxNodes < nodes.length ? this.maxNodes : nodes.length;

  for (let i = 0; i < max ; i++) {
    nodes[i].classList.add(currClass);

    let delay = `${~~(Math.random() * 1000) / 1000}ms`
    if (noDelay) {
      delay = '';
    } else if (this.firstAddition) {
      delay = `${~~(Math.random() * 10)}s`;
    }

    let css = this.animationCSS[currClass];
    if(typeof css === 'function') {
      css = css();
    }

    nodes[i].style['webkitAnimation'] = `${css} ${delay}`;
    nodes[i].style['animation'] = `${css} ${delay}`;
  }

  this.firstAddition = false;
}

function removeCurrStyles() {
  var nodes = document.querySelectorAll('*');

  nodes.forEach((node) => {
    ['tdfw_intro', 'turntDown'].forEach((cl) => {
      node.classList.remove(cl);
      node.style['webkitAnimation'] = '';
      node.style['animation'] = '';
    });
  });
}

function getCurrClass() {
  return this.player.getCurrentTime() > this.turndownAt ? 'turntDown' : 'tdfw_intro';
}

module.exports = {
  addCurrStyles,
  getCurrClass,
  removeCurrStyles,
}