function getInfo() {
    /* Variables */
    let number = document.URL.substring(document.URL.indexOf('=') + 1);

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", "https://swapi.co/api/people/" + number + "/", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let newObject = JSON.parse(xhr.responseText);
            updateInfo(newObject);
        }
    }
}

function updateInfo(data) {
    /* Variables */
    let name = document.getElementById("#name");
    let height = document.getElementById("#height");
    let mass = document.getElementById("#mass");
    let hair_color = document.querySelector('#hair_color');
    let skin_color = document.querySelector('#skin_color');
    let eye_color = document.querySelector("#eye_color");
    let birth_year = document.querySelector("#birth_year");
    let gender = document.querySelector("#gender");
    
    /* Setting HTML for Main Section */
    name.innerText = `${data.name}`;
    height.innerText = `${data.height}`;
    mass.innerText = `${data.mass}`;
    hair_color.innerText = `${data.hair_color}`;
    skin_color.innerText = `${data.skin_color}`;
    eye_color.innerText = `${data.eye_color}`;
    birth_year.innerText = `${data.birth_year}`;
    gender.innerText = `${data.gender}`;
    for (let x = 0; x < data.characters.length; x++) {
        foundCharacter(data.characters[x]);
    }
}

function foundCharacter(stuff) {
    /* variables */
    let newObject;
    let url;
    let area = document.getElementById("characters");

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", stuff, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            newObject = JSON.parse(xhr.responseText);
            /* Variables */
            let listItem = document.createElement("li");
            let a = document.createElement("a");
            url = foundSomething(newObject, "people");
            
            /* Displaying Character */
            a.innerHTML = newObject.name;
            a.setAttribute("href", url);
            listItem.appendChild(a);
            area.appendChild(listItem);
        }
    }
}
/*
let name = document.querySelector('#name');
let height = document.querySelector('#height');
let mass = document.querySelector('#mass');
let hair_color = document.querySelector('#hair_color');
let skin_color = document.querySelector('#skin_color');
let eye_color = document.querySelector('#eye_color');
let birth_year = document.querySelector('#birth_year');
let gender = document.querySelector('#gender');

var number = document.URL.substring(document.URL.indexOf('=') + 1);

function getInfo() {
    axios.get('https://swapi.co/api/people/' + number + '/').then(function(response) {
        updateInfo(response.data);
    });
}

function updateInfo(data) {
    name.innerText = `Name: ${data.name}`;
    height.innerText = `Height: ${data.height}`;
    mass.innerText = `Mass: ${data.mass}`;
    hair_color.innerText = `Hair Color: ${data.hair_color}`;
    skin_color.innerText = `Skin Color: ${data.skin_color}`;
    eye_color.innerText = `Eye Color: ${data.eye_color}`;
    birth_year.innerText = `Birth Year: ${data.birth_year}`;
    gender.innerText = `Gender: ${data.gender}`;
}

button.addEventListener('click', getInfo);*/