function checkTime() {
  if(this.turntDown) {
    return false;
  }

  requestAnimationFrame(checkTime.bind(this));
  if(this.player.getCurrentTime() > this.turndownAt) {
    this.turntDown = true;
    this.removeCurrStyles();
    this.addCurrStyles.call(this, this.affectedNodes, this.noDelay);
  }
};

function onPlayerStateChange(event) {
  if(event.data === 1) { // started
    this.addCurrStyles.call(this, this.affectedNodes, this.noDelay);
  } else if(event.data === 2 || event.data === 0) { // paused || ended
    this.removeCurrStyles();
  }
};

function onPlayerReady(event) {
  console.log('GET READY TO TURN DOWN FOR WHAT');
  event.target.playVideo();
  requestAnimationFrame(checkTime.bind(this));
};

module.exports = {
  onPlayerReady,
  onPlayerStateChange,
};