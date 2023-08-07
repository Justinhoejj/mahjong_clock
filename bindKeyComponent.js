class BindKey extends HTMLElement {
  constructor() {
    super();
    this.makePassive()
  }

  // 3 States button, remove and passive
  makePassive() {
    this.keyCode = null
    this.innerHTML = `<button>
    Click To Bind
  </button>`
    this.onclick = () => { this.makeBind() }
  }

  makeRemove() {
    this.innerHTML = `<button class="bind-button-remove">Unbind ${this.keyCode}</button>`
    this.onclick = () => { 
      removeKeyBinding(this.keyCode);
      this.makePassive()
    }
  }

  makeBind() {
    this.innerHTML = `<button>
        Press Key Now
    </button>`
    const bindKeyAndRemoveListener = (e) => {
      this.keyCode = e.code
      document.removeEventListener("keydown", bindKeyAndRemoveListener);
      if (addKeyBinding(this.keyCode)) {
        // Set state to removal
        this.makeRemove()
      } else {
        this.makePassive()
      }
    }
    document.addEventListener("keydown", bindKeyAndRemoveListener);
  }

  
}

customElements.define("bind-key-component", BindKey);