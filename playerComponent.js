const initPlayerHTMLContent = `
        <div class="player-component-wraper">
          <p class="player-time">
            Press to start
          </p>
        </div>`;
const audio = new Audio('./sfx/player-click.mp3');
    

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
      if (this.seconds == 0) {
        // Turn off glowing animation on first click
        this.glow(false)
      }
      this.seconds += consumeTime();
      this.onClickEffects()
      this.innerHTML = playerHTMLContent(this.seconds);
    })
  }

  onClickEffects() {
    audio.play()
    return
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
    this.glow(true)
  };
}

customElements.define("player-component", Player);