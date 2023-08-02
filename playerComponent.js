const initPlayerHTMLContent = `
        <div class="player-component-wraper">
          <p class="player-text">
            Press To Start
          </p>
        </div>`;
const audio = new Audio('./sfx/player-click.mp3');
    

function playerHTMLContent(seconds) {
  if (seconds < 0) {
    // Render exceeded time limit
    return `<div class="player-component-wraper">
            <p class="player-time-flash-red">
              - ${secondsToHHMMSS(seconds * - 1)}
            </p>
          </div>`;  
  }
  return `<div class="player-component-wraper">
            <p class="player-time">
              ${secondsToHHMMSS(seconds)}
            </p>
          </div>`;
}

class Player extends HTMLElement {
  constructor() {
    super();
    this.secondsPassed = 0
    this.timeLimit = 0
    this.innerHTML = initPlayerHTMLContent;
    this.glow(true)
    this.addEventListener('click', () => {
      // Consume current time on clock and uptdate total time
      if (this.secondsPassed == 0) {
        // Turn off glowing animation on first click
        this.glow(false)
        // Get time limit
        this.timeLimit = retrieveAndDisableTimeLimit()
      }
      this.secondsPassed += consumeTime();
      this.onClickEffects()
      this.innerHTML = playerHTMLContent(this.timeLimit - this.secondsPassed);
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
    this.secondsPassed = 0;
    this.innerHTML = initPlayerHTMLContent;
    this.glow(true)
  };
}

customElements.define("player-component", Player);