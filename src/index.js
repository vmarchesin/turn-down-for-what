// code based on https://github.com/nthitz/turndownforwhatjs
const animationFrameHelper = require('./animationFrameHelper');
const embedVideo = require('./embedVideo');
const setupAnimations = require('./setupAnimations');
const { onPlayerReady, onPlayerStateChange } = require('./onPlayer');
const { addCurrStyles, getCurrClass, removeCurrStyles } = require ('./stylesHandler');

function init(affectedNodes, {
  jitterAmount,
  maxNodes,
  noDelay,
  numKeyframes,
  numTurntAnimations,
}) {
  this.firstAddition = true;
  this.player = null;
  this.turndownAt = 20;
  this.turntDown = false;
  this.affectedNodes = affectedNodes;
  this.jitterAmount = jitterAmount;
  this.maxNodes = maxNodes;
  this.noDelay = noDelay;
  this.numKeyframes = numKeyframes;
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

const turnDownForWhat = (affectedNodes = ['*'], options = {
  jitterAmount: 10,
  maxNodes: 1000,
  noDelay: false,
  numTurntAnimations: 10,
  numKeyframes: 10,
}) => {
  if (typeof window === 'undefined') {
    return;
  }

  animationFrameHelper();

  const config = {
    jitterAmount: options.jitterAmount || 10,
    maxNodes: options.maxNodes || 1000,
    noDelay: options.noDelay ||false,
    numTurntAnimations: options.numTurntAnimations || 10,
    numKeyframes: options.numKeyframes || 10,
  }

  init(affectedNodes, { ...config });
}

module.exports = turnDownForWhat;