const upperUL = document.body.querySelector("ul"); // find ul element

// create request here:

let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
let requestAPI = new XMLHttpRequest();
requestAPI.responseType = "json";
requestAPI.open("GET", requestURL);
requestAPI.send();

// get json here:

requestAPI.onload = function () {
    const members = requestAPI.response['members'];
    for (let i=0; i<members.length; i++) {
        let heroName = document.createElement('li');
        heroName.innerText = members[i]['name'];
        heroName.style.color = "red";
        upperUL.appendChild(heroName);

        let abilitiesArray = document.createElement('ul');
        abilitiesArray.style.color = "black";
        abilitiesArray.className = "abilityList"
        heroName.appendChild(abilitiesArray);

        for (let j=0; j<members[i]['powers'].length; j++) {
            let ability = document.createElement('li');
            ability.innerText = members[i]['powers'][j];
            abilitiesArray.appendChild(ability);
        };
    };
}







