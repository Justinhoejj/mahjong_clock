class SelectSound extends HTMLElement {
  constructor() {
    super();
      this.innerHTML = `<select id="sound-select" class="sound-select">
      <option value="sfx/player-click.mp3">Key</option>
      <option value="sfx/mouse-click.mp3">Mouse</option>
      <option value="sfx/light-switch.mp3">Light</option>
      <option value="sfx/shooting-sfx.mp3">Plop</option>
    </select>`
    }
}

customElements.define("select-sound-component", SelectSound);