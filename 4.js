const activeImg = document.querySelector("div.activeImg img");
const otherImgs = document.querySelectorAll("div.imgChoices img");
const btn = document.getElementById("darkerBtn");


function chooseImg(e) {
    let chooseImg = e.target.src;
    activeImg.src = chooseImg;
}

function changeLightness() {
    if (btn.value === "darker"){
       activeImg.setAttribute("id", "darkerImg");
       btn.value = "lighter";
    }
    else {
        activeImg.setAttribute("id", "x");
        btn.value = "darker";
    }
}


for (let i=0; i <= otherImgs.length - 1; i++) {
    otherImgs[i].addEventListener("click", chooseImg);
}

btn.onclick = changeLightness;


