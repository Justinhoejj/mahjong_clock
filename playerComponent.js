const initPlayerHTMLContent = `
        <div class="player-component-wraper">
          <p class="player-time">
            Press to start
          </p>
        </div>`;

function playerHTMLContent(seconds) {
  return `<div class="player-component-wraper">
            <p class="player-time">
              ${secondsToHHMMSS(seconds)}
            </p>
          </div>`;
}

class Player extends HTMLElement {
  constructor() {
    super();
    this.seconds = 0
    this.innerHTML = initPlayerHTMLContent;
    this.glow(true)
    this.addEventListener('click', () => {
      // Consume current time on clock and uptdate total time
      this.seconds += consumeTime();
      this.innerHTML = playerHTMLContent(this.seconds);
      this.glow(false)
    })
  }

  glow(on) {
    if (on) {
      this.style.animation = 'glowing 1300ms infinite';
    } else {
      this.style.animation = null;
    };
  };

  resetTime() {
    this.seconds = 0;
    this.innerHTML = initPlayerHTMLContent;
  };
}

customElements.define("player-component", Player);