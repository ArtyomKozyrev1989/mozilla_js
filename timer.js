const startBtn = document.querySelector("button#startBtn");
const stopBtn = document.querySelector("button#stopBtn");
const resetBtn = document.querySelector("button#resetBtn");
const resultField = document.querySelector("p#result");
let timerHandler = null;
let secondsLeft = 0;
let active = false;

let startCount = function() {
    startBtn.disabled = true;
    if (!active) {
        timerHandler = setInterval(() => {
            secondsLeft += 1;
            resultField.innerText = `Seconds left: ${secondsLeft}`;
            active = true;
        }, 1000);
    }
};

let stopCount = function() {
    if(active) {
        clearInterval(timerHandler);
        active = false;
        startBtn.disabled = false;
    }
};

let resetCounter = function() {
    if(timerHandler) {
        secondsLeft = 0;
        resultField.innerText = `Seconds left: ${secondsLeft}`;
        clearInterval(timerHandler);
        active = false;
        startBtn.disabled = false;
    }
};

startBtn.addEventListener("click", startCount);
stopBtn.addEventListener("click", stopCount);
resetBtn.addEventListener("click", resetCounter);