// Global variables
const timeEl = document.querySelector('.clock .time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop')
const resetButton = document.getElementById('reset')

let seconds = 0;
let interval = null;
let playerTime = [0, 0, 0, 0]

// Events listeners
startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

// Update the timer
function secondsToHHMMSS(seconds) {
  
  let hh = Math.floor(seconds / 3600)
  let mm = Math.floor(seconds / 60) % 60
  let ss = seconds % 60

  return [hh, mm, ss]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

function timer() {
  seconds++;
  timeEl.innerText = secondsToHHMMSS(seconds);
}

function start() {
  if (interval) {
    return;
  }

  interval = setInterval(timer, 1000);
}

function stop() {
  clearInterval(interval);
  interval = null
}

function reset() {
  stop()
  seconds = 0
  timeEl.innerText = secondsToHHMMSS(seconds)
  playerTime = [0, 0, 0, 0]
}

// Player function
function consumeTime(){
  if (interval) {
    const res = seconds
    timeEl.innerText = secondsToHHMMSS(0)
    seconds = 0
    return res;
  } else {
    start()
    return 0
  }
}

