class BindKey extends HTMLElement {
  constructor() {
    super();
    this.makePassive()
  }

  // 3 States button, remove and passive
  makePassive() {
    this.keyCode = null
    this.innerHTML = `<div class="bind-button-passive">
      <button>
        Click To Bind
      </button>
    </div>`
    this.onclick = () => { this.makeBind() }
  }

  makeRemove() {
    this.innerHTML = `<div class="bind-button-remove">
      <button class="bind-button-remove">
        Unbind ${this.keyCode}
      </button>
    </div>`
    this.onclick = () => {
      removeKeyBinding(this.keyCode);
      this.makePassive()
    }
  }

  makeBind() {
    this.onclick = null
    this.innerHTML = `<button class="bind-button-active">
        Press Key Now
    </button>`
    setIsBinding(true)
    const bindKeyAndRemoveListener = (e) => {
      this.keyCode = e.code
      document.removeEventListener("keydown", bindKeyAndRemoveListener);
      setIsBinding(false)
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