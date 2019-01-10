module.exports = function() {
  let introKeyframes = [];
  let turntKeyframes = new Array(this.numTurntAnimations).fill('');
  const jitterAmount = 10;

  for(let i = 0; i <= this.numKeyframes; i++) {
    const percentage = i / this.numKeyframes * 100 + '%';

    const keyFrameX = ~~((Math.random() - 0.5) * jitterAmount) || 1;
    const keyFrameY = ~~((Math.random() - 0.5) * jitterAmount) || 1;
    const keyframe = `-webkit-transform: translate(${keyFrameX}px, ${keyFrameY}px); transform: translate(${keyFrameX}px, ${keyFrameY}px);`;

    introKeyframes.push(`${percentage} { ${keyframe} }`);

    for(let j = 0; j < this.numTurntAnimations; j++) {
      const turnAnimationX = ~~((Math.random() - 0.5) * jitterAmount) || 1;
      const turnAnimationY = ~~((Math.random() - 0.5) * jitterAmount) || 1;
      const rotateAmount = ~~(i / this.numKeyframes * 360);
      const rotateDirection = String.fromCharCode(88 + ~~ (Math.random() * 2));

      const turnKeyFrame = `-webkit-transform: translate(${turnAnimationX}px, ${turnAnimationY}px) rotate${rotateDirection}(${rotateAmount}deg); transform: translate(${turnAnimationX}px, ${turnAnimationY}px) rotate${rotateDirection}(${rotateAmount}deg);`;

      turntKeyframes[j] += `${percentage} { ${turnKeyFrame} }`;
    }
  }

  let introKeyFrameDef = `@-webkit-keyframes tdfwIntro { ${introKeyframes.join('\n')} } @keyframes tdfwIntro { ${introKeyframes.join('\n')} }`;

  turntKeyframes.forEach((_, i) => {
    introKeyFrameDef += `@-webkit-keyframes turntDown${i} { ${turntKeyframes[i]} } @keyframes turntDown${i} { ${turntKeyframes[i]} }`;
  });

  const introClass = `.tdfw_intro { -webkit-animation: tdfw 1s infinite; animation: tdfw 1s infinite; }`;

  const style = document.createElement('style');
  style.textContent = introKeyFrameDef;
  document.body.appendChild(style);
}