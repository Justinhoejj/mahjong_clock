const initPlayerHTMLContent = `
        <div class="player-component-wraper player-start-text">
          <p class="player-text">
            Press To Start
          </p>
        </div>`;


class Player extends HTMLElement {
  constructor() {
    super();
    this.secondsPassed = 0
    this.timeLimit = 0
    this.audio = new Audio('./sfx/player-click.mp3');
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
      let timeToConsume = consumeTime();
      this.onClickEffects()
      this.secondsPassed += timeToConsume
      this.innerHTML = this.playerHTMLContent(this.timeLimit - this.secondsPassed, timeToConsume, this.timeLimit);
    })
  }

  setAudioPath(path) {
    this.audio = new Audio(path)
  }
  timeConsumedComponent(timeConsumed) {
    return `<div class="player-consumed-time-animated">
              <p id="player-consumed-time-value">-${timeConsumed}</p>
            </div>`
  }

  onClickEffects() {
    this.audio.play()
    return
  }

  glow(on) {
    if (on) {
      this.style.animation = 'glowing 4s infinite';
    } else {
      this.style.animation = null;
    };
  };

  resetTime() {
    this.secondsPassed = 0;
    this.innerHTML = initPlayerHTMLContent;
    this.glow(true)
  };

  playerHTMLContent(seconds, timeConsumed, timeLimit) {
    if (seconds < 0) {
      this.className += ' player-component-time-exceeded'
      return `<div class="player-component-wraper">
              ${this.timeConsumedComponent(timeConsumed)}
              <p class="player-time-value">
                - ${secondsToHHMMSS(seconds * - 1)}
              </p>
            </div>`;  
    }
    if (seconds / timeLimit < 0.2 || seconds < 60) {
      // Render exceeded time limit
      return `<div class="player-component-wraper">
              ${this.timeConsumedComponent(timeConsumed)}
              <p class="player-time-flash-red">
                ${secondsToHHMMSS(seconds)}
              </p>
            </div>`;  
    }
  
    return `<div class="player-component-wraper">
            ${this.timeConsumedComponent(timeConsumed)}
            <p class="player-time">
              ${secondsToHHMMSS(seconds)}
            </p>
            </div>`;
  }
}

customElements.define("player-component", Player);