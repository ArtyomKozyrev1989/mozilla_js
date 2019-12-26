const textWindow = document.querySelector("input[type=text");
const clickBtn = document.getElementById("clickBtn");
const bodyDiv = document.querySelector("div.bodyDiv");

clickBtn.par


function countDown() {
    let repeatNumber = Number(textWindow.value);
    for(let i=1; i<=repeatNumber; i++){
        let x = document.createElement("p");
        x.innerText = `Count Up ${i}`;
        bodyDiv.appendChild(x);
        console.log(i);
    }
}

clickBtn.addEventListener("click", countDown);