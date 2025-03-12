let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let lapTimes = [];

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
    } else {
        interval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        seconds++;
        milliseconds = 0;
    }
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    displayTime();
}

function displayTime() {
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds, 3);
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}

function reset() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTime();
    startStopButton.textContent = 'Start';
    isRunning = false;
    lapTimes = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);