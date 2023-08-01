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
    this.innerHTML = playerHTMLContent(this.seconds);
    this.addEventListener('click', () => {
      // Consume current time on clock and uptdate total time
      this.seconds += consumeTime()
      this.innerHTML = playerHTMLContent(this.seconds);
    })
  }

  resetTime() {
    console.log('resetTime called')
    this.seconds = 0
    this.innerHTML = playerHTMLContent(this.seconds)
  }
}

customElements.define("player-component", Player);