const xList = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const yList = ["the soup kitchen", "Disneyland", "the White House"];
const zList = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];


const pressBtn = document.getElementById("pressBtn");
const heroName = document.getElementById("heroName");
const resultP = document.getElementById("resultP");

function getRandomFromOneToThreeInteger() {
    return Math.floor(3 * Math.random());
}


function generateText() {
    let choiceListIndex = getRandomFromOneToThreeInteger();
    let insertx = xList[choiceListIndex];
    let inserty = yList[choiceListIndex];
    let insertz = zList[choiceListIndex];
    let bob = "Bob";
    let temperature = "94 fahrenheit";
    let weight = "300 pounds";
    let country =  document.querySelector('input[name="country"]:checked').value;

    if (country === "en") {
        temperature = "10 Cel";
        weight = "1000 Kg";
    }

    if (heroName.value) {
        bob = heroName.value;
    }

    let text = `It was ${ temperature } outside, so ${ insertx } went for a walk. When they got to ${ inserty },
 they stared in horror for a few moments, then ${ insertz }. ${ bob } saw the whole thing, 
 but was not surprised — ${ insertx } weighs ${ weight }, and it was a hot day.`;

    resultP.innerText = text;

}


pressBtn.addEventListener("click", generateText)



