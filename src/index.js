// code based on https://github.com/nthitz/turndownforwhatjs

const animationFrameHelper = function () {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];

  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[vendors[i]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[i]+'CancelAnimationFrame']
                               || window[vendors[i]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback, element) => {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => clearTimeout(id);
  }
};


const _init = (affectedNodes, noDelay) => {
  let player;
  const turndownAt = 20;
  const numTurntAnimations = 10;
  let turntDown = false;
  const maxNodes = 1000;
  let firstAddition = true;

  const animationCSS = {
    'tdfw_intro': 'tdfwIntro 1s infinite ease-in-out',
    'turntDown': () => `turntDown${~~(Math.random() * numTurntAnimations)} 5s infinite ease-in-out`,
  };

  const embedVideo = () => {
    const parent = document.createElement('div');
    parent.style.position = 'fixed';
    parent.style.zIndex = 5000;
    parent.style.right = 0;
    parent.style.top = 0;
    parent.style.opacity = 0.2;
    const div = document.createElement('div');
    div.id = "tdfw";
    parent.appendChild(div);
    document.body.appendChild(parent)
    parent.onmouseover = function() {
      parent.style.opacity = 1;
    };
    parent.onmouseout = function() {
      parent.style.opacity = 0.2;
    };
    parent.style.webkitTransition = 'opacity 0.3s ease-in-out';
    parent.style.transition = 'opacity 0.3s ease-in-out';

    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('tdfw', {
        height: '200',
        width: '305',
        videoId: 'HMUDVMiITOU',
        playerVars: {
          start: 1,
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        },
      });
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  };

  const onPlayerReady = (event) => {
    console.log('GET READY TO TURN DOWN FOR WHAT');
    event.target.playVideo();
    requestAnimationFrame(checkTime);
  };

  const checkTime = () => {
    if(turntDown) {
      return false;
    }

    requestAnimationFrame(checkTime);
    if(player.getCurrentTime() > turndownAt) {
      turntDown = true;
      removeCurrStyles();
      addCurrStyles(affectedNodes, noDelay);
    }
  };

  const onPlayerStateChange = (event) => {
    if(event.data === 1) { // started
      addCurrStyles(affectedNodes, noDelay);
    } else if(event.data === 2 || event.data === 0) { // paused || ended
      removeCurrStyles();
    }
  };

  const setupAnimations = () => {
    const numKeyFrames = 10;
    let introKeyFrames = [];
    let turntKeyFrames = new Array(numTurntAnimations).fill('');
    const jitterAmount = 10;

    for(let i = 0; i <= numKeyFrames; i++) {
      const percentage = i / numKeyFrames * 100 + '%';

      const keyFrameX = ~~((Math.random() - 0.5) * jitterAmount) || 1;
      const keyFrameY = ~~((Math.random() - 0.5) * jitterAmount) || 1;
      const keyframe = `-webkit-transform: translate(${keyFrameX}px, ${keyFrameY}px); transform: translate(${keyFrameX}px, ${keyFrameY}px);`;

      introKeyFrames.push(`${percentage} { ${keyframe} }`);

      for(let j = 0; j < numTurntAnimations; j++) {
        const turnAnimationX = ~~((Math.random() - 0.5) * jitterAmount) || 1;
        const turnAnimationY = ~~((Math.random() - 0.5) * jitterAmount) || 1;
        const rotateAmount = ~~(i / numKeyFrames * 360);
        const rotateDirection = String.fromCharCode(88 + ~~ (Math.random() * 2));

        const turnKeyFrame = `-webkit-transform: translate(${turnAnimationX}px, ${turnAnimationY}px) rotate${rotateDirection}(${rotateAmount}deg); transform: translate(${turnAnimationX}px, ${turnAnimationY}px) rotate${rotateDirection}(${rotateAmount}deg);`;

        turntKeyFrames[j] += `${percentage} { ${turnKeyFrame} }`;
      }
    }

    let introKeyFrameDef = `@-webkit-keyframes tdfwIntro { ${introKeyFrames.join('\n')} } @keyframes tdfwIntro { ${introKeyFrames.join('\n')} }`;

    turntKeyFrames.forEach((_, i) => {
      introKeyFrameDef += `@-webkit-keyframes turntDown${i} { ${turntKeyFrames[i]} } @keyframes turntDown${i} { ${turntKeyFrames[i]} }`;
    });

    const introClass = `.tdfw_intro { -webkit-animation: tdfw 1s infinite; animation: tdfw 1s infinite; }`;

    const style = document.createElement('style');
    style.textContent = introKeyFrameDef;
    document.body.appendChild(style);
  }

  const addCurrStyles = (nodes, noDelay) => {
    const currClass = getCurrClass();

    nodes = Array.prototype.slice.call(document.querySelectorAll(nodes.join(', ')));
    const max = maxNodes < nodes.length ? maxNodes : nodes.length;

    for (let i = 0; i < max ; i++) {
      nodes[i].classList.add(currClass);

      let delay = Math.round(Math.random() * 1000) / 1000 + 'ms';
      if (noDelay) {
        delay = '';
      } else if (firstAddition) {
        delay = ~~ (Math.random() * 10) + 's';
      }

      let css = animationCSS[currClass];
      if(typeof css === 'function') {
        css = css();
      }

      nodes[i].style['webkitAnimation'] = `${css} ${delay}`;
      nodes[i].style['animation'] = `${css} ${delay}`;
    }

    firstAddition = false;
  }

  const removeCurrStyles = () => {
    const classes = allClasses();
    var nodes = document.querySelectorAll('*');

    nodes.forEach((node) => {
      classes.forEach((cl) => {
        node.classList.remove(cl);
        node.style['webkitAnimation'] = '';
        node.style['animation'] = '';
      });
    });
  }

  const allClasses = () => ['tdfw_intro', 'turntDown'];

  const getCurrClass = () => player.getCurrentTime() > turndownAt ? 'turntDown' : 'tdfw_intro';

  (function () {
    if(typeof window.tdfw_TDFW !== 'undefined') {
      return;
    }
    window.tdfw_TDFW = true;

    embedVideo()
    setupAnimations()
  })();
};

const turnDownForWhat = (affectedNodes = ['*'], noDelay = false) => {
  animationFrameHelper();
  _init(affectedNodes, noDelay);
}

module.exports = turnDownForWhat;