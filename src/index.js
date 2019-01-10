// code based on https://github.com/nthitz/turndownforwhatjs
const animationFrameHelper = require('./animationFrameHelper');
const embedVideo = require('./embedVideo');
const setupAnimations = require('./setupAnimations');
const { onPlayerReady, onPlayerStateChange } = require('./onPlayer');
const { addCurrStyles, getCurrClass, removeCurrStyles } = require ('./stylesHandler');

function init(affectedNodes, {
  maxNodes,
  noDelay,
  numKeyframes,
  numTurntAnimations,
}) {
  this.turndownAt = 20;
  this.turntDown = false;
  this.firstAddition = true;
  this.player = null;
  this.noDelay = noDelay;
  this.maxNodes = maxNodes;
  this.numKeyframes = numKeyframes;
  this.affectedNodes = affectedNodes;
  this.numTurntAnimations = numTurntAnimations;
  this.animationCSS = {
    'tdfw_intro': 'tdfwIntro 1s infinite ease-in-out',
    'turntDown': () => `turntDown${~~(Math.random() * this.numTurntAnimations)} 5s infinite ease-in-out`,
  };

  this.onPlayerReady = onPlayerReady;
  this.onPlayerStateChange = onPlayerStateChange;
  this.addCurrStyles = addCurrStyles;
  this.getCurrClass = getCurrClass;
  this.removeCurrStyles = removeCurrStyles;

  (() => {
    if(typeof window.tdfw_TDFW !== 'undefined') {
      return;
    }
    window.tdfw_TDFW = true;

    embedVideo.call(this);
    setupAnimations.call(this);
  })();
};

const turnDownForWhat = (affectedNodes = ['*'], {
  maxNodes = 1000,
  noDelay = false,
  numTurntAnimations = 10,
  numKeyframes = 10,
}) => {
  animationFrameHelper();
  init(affectedNodes, { maxNodes, noDelay, numKeyframes, numTurntAnimations });
}

module.exports = turnDownForWhat;