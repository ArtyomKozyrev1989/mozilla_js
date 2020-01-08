const startBtn = document.querySelector("span#stepIndicator button");
const spinner = document.querySelector("div#spinner");
const readyMakeStep = document.querySelector("span#stepIndicator p");

startBtn.addEventListener("click", () => {
    spinner.style.display = "inline-block";
    startBtn.disabled = true;


    let sleepSeconds = randomInteger();
    setTimeout(() => {
        readyMakeStep.style.display = "inline-block";
        spinner.style.display = "none";
        startBtn.style.display = "none";
        startBtn.disabled = false;
        document.addEventListener("keydown", waitKeyStroke);
    }, sleepSeconds * 1000);

});

let randomInteger = function () {
    return 1 + Math.floor(Math.random() * 10);
};

let waitKeyStroke = function (e) {
    readyMakeStep.innerText ="Players Go!";
    switch (e.code) {
        case "KeyA":
            readyMakeStep.innerText = "Player 1 Won!";
            document.removeEventListener("keydown", waitKeyStroke);
            setTimeout(prepareField, 5000);
            break;
        case "KeyL":
            readyMakeStep.innerText = "Player 2 Won!";
            document.removeEventListener("keydown", waitKeyStroke);
            setTimeout(prepareField, 5000);
            break;
        default:
            alert(`Wrong Key: ${e.code}`);
    }
};

let prepareField = function () {
    startBtn.style.display = "inline-block";
    readyMakeStep.style.display = "none";
    readyMakeStep.innerText ="Players Go!";
};