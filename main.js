// Global variables
const timeEl = document.querySelector('.clock .time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset')
const playersTime = document.getElementsByTagName('player-component')

let seconds = 0;
let interval = null;
let playerTime = [0, 0, 0, 0]

// Events listeners
startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);

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
    startStopButton.innerText = 'Pause'
    startStopButton.className = 'pause-button'
}

function stopTimer() {
    clearInterval(interval);
    interval = null
    startStopButton.innerText = 'Play'
    startStopButton.className = 'play-button'
}

function reset() {
  stopTimer()
  seconds = 0
  timeEl.innerText = secondsToHHMMSS(seconds)
  resetPlayersTime()
}

// Player function return time on clock and resets to 0, starts timer if not yet started
function consumeTime(){
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

function resetPlayersTime(){
  for (var i = 0; i < playersTime.length; i++) {
    console.log(playersTime[i]); //second console output
    playersTime[i].resetTime();
  }  
}

