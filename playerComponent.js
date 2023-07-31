const playerContent = `<button id='consume'>0</button>`;

class Player extends HTMLElement {
  constructor() {
    super();
    this.seconds = 0 
    this.innerHTML = playerContent;
    this.addEventListener('click', () => {
      console.log('clicked');
      this.seconds += consumeTime()
      this.innerHTML = `<button id='consume'>${secondsToHHMMSS(this.seconds)}</button>`
    })
  }
}

customElements.define("player-component", Player);