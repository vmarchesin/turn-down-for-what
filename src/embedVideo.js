module.exports = function() {
  const parent = document.createElement('div');
  parent.style.position = 'fixed';
  parent.style.zIndex = 5000;
  parent.style.right = 0;
  parent.style.top = 0;
  parent.style.opacity = 0.2;
  const div = document.createElement('div');
  div.id = 'tdfw';
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

  tag.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(tag);

  // This function creates an <iframe> (and YouTube player) after the API code downloads.
  const onYouTubeIframeAPIReady = () => {
    this.player = new YT.Player('tdfw', {
      height: '200',
      width: '305',
      videoId: 'HMUDVMiITOU',
      playerVars: {
        start: 1,
      },
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange,
      },
    });
  }

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
};