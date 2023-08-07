// Global variables
const timeLimitInput = document.getElementById('time-limit');
const timeEl = document.getElementById('time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset')
const playersTime = document.getElementsByTagName('player-component')
const playerTop = document.querySelector('.player-top')
const playerLeft = document.querySelector('.player-left')
const playerRight = document.querySelector('.player-right')
const playerBottom = document.querySelector('.player-bottom')

let seconds = 0;
let interval = null;
let gameInProgress = false;
let keyBindingCache = {};
let isBinding = false


// Events listeners
document.addEventListener('keydown', clickRelevantButton)
startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
timeLimitInput.addEventListener('keydown', (e) => {
  console.log(e.target.value)
  if (e.key == '-') {
    e.preventDefault();
    return false;
  }
})

// Util for formatting time
function secondsToHHMMSS(seconds) {

  let hh = Math.floor(seconds / 3600)
  let mm = Math.floor(seconds / 60) % 60
  let ss = seconds % 60

  return [hh, mm, ss]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

// Time limit function
function retrieveAndDisableTimeLimit() {
  timeLimitInput.disabled = true
  timeLimitInput.className = 'time-limit-input-disabled'
  return timeLimitInput.value
}

function enableTimeLimit() {
  timeLimitInput.disabled = false
  timeLimitInput.className = 'time-limit-input-enabled'
}

// Timer functions
function timer() {
  seconds++;
  timeEl.innerText = secondsToHHMMSS(seconds);
}

function startStop() {
  if (interval) {
    stopTimer()
  } else {
    startTimer()
  }
}
function startTimer() {
  interval = setInterval(timer, 1000);
  startStopButton.className = 'pause-button'
  timeEl.className = 'time time-start'
  timeEl.style.animationPlayState = "running";

  // Once timer has started disable time limit change, only enable upon reset
  if (!gameInProgress) {
    configureAudioAndDisableInputs(true)
    retrieveAndDisableTimeLimit()
  }

}

function stopTimer() {
  clearInterval(interval);
  interval = null
  startStopButton.className = 'play-button'
  timeEl.style.animationPlayState = "paused";
}

function reset() {
  stopTimer()
  seconds = 0
  timeEl.innerText = secondsToHHMMSS(seconds)
  timeEl.className = 'time'
  resetPlayersTime()
  enableTimeLimit()
}

// Player function return time on clock and resets to 0, starts timer if not yet started
function consumeTime() {
  if (interval) {
    const res = seconds
    timeEl.innerText = secondsToHHMMSS(0)
    seconds = 0
    return res;
  } else {
    startTimer()
    return 0
  }
}

function resetPlayersTime() {
  for (var i = 0; i < playersTime.length; i++) {
    playersTime[i].resetTime();
  }
  configureAudioAndDisableInputs(false)
}

function configureAudioAndDisableInputs(shouldDisable) {
  // Audio Inputs
  const audioInputTop = document.querySelector('.top-sound-input select[id="sound-select"]')
  const audioInputRight = document.querySelector('.right-sound-input select[id="sound-select"]')
  const audioInputBottom = document.querySelector('.bottom-sound-input select[id="sound-select"]')
  const audioInputLeft = document.querySelector('.left-sound-input select[id="sound-select"]')
  if (shouldDisable) {
    audioInputTop.disabled = true
    audioInputRight.disabled = true
    audioInputBottom.disabled = true
    audioInputLeft.disabled = true

    playerTop.setAudioPath(audioInputTop.value)
    playerLeft.setAudioPath(audioInputLeft.value)
    playerRight.setAudioPath(audioInputRight.value)
    playerBottom.setAudioPath(audioInputBottom.value)

    gameInProgress = true
  } else {
    gameInProgress = false
    audioInputTop.disabled = false
    audioInputRight.disabled = false
    audioInputBottom.disabled = false
    audioInputLeft.disabled = false
  }
}

function clickRelevantButton(e) {
  if (isBinding) {
    return
  }
  if (keyBindingCache[e.code]) {
    keyBindingCache[e.code].click()
  }
}

function addKeyBinding(keyCode) {
  if (keyCode in keyBindingCache) {
    alert("Key already in use, use another key.")
    return false;
  }

  const keyBindingTop = document.querySelector('bind-key-component[id="top-bind-component"]')
  if (keyBindingTop.keyCode) {
    keyBindingCache[keyBindingTop.keyCode] = playerTop
  }
  const keyBindingRight = document.querySelector('bind-key-component[id="right-bind-component"]')
  if (keyBindingRight.keyCode) {
    keyBindingCache[keyBindingRight.keyCode] = playerRight
  }
  const keyBindingBottom = document.querySelector('bind-key-component[id="bottom-bind-component"]')
  if (keyBindingBottom.keyCode) {
    keyBindingCache[keyBindingBottom.keyCode] = playerBottom
  }
  const keyBindingLeft = document.querySelector('bind-key-component[id="left-bind-component"]')
  if (keyBindingLeft.keyCode) {
    keyBindingCache[keyBindingLeft.keyCode] = playerLeft
  }
  return true
}

function removeKeyBinding(keyCode) {
  delete keyBindingCache[keyCode]
}

function setIsBinding(bool) {
  isBinding = bool
}