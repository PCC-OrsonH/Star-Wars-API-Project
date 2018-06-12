function getInfo() {
    /* Variables */
    let number = document.URL.substring(document.URL.indexOf('=') + 1);

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", "https://swapi.co/api/starships/" + number + "/", true);
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
    let model = document.getElementById("#model");
    let manufacturer = document.getElementById("#manufacturer");
    let cost_in_credits = document.querySelector('#cost_in_credits');
    let length = document.querySelector('#length');
    let max_atmosphering_speed = document.querySelector("#max_atmosphering_speed");
    let crew = document.querySelector("#crew");
    let passengers = document.querySelector("#passengers");
    let cargo_capacity = document.querySelector("#cargo_capacity");
    let consumables = document.querySelector("#consumables");
    let hyperdrive_rating = document.querySelector("#hyperdrive_rating");pilots
    let mglt = document.querySelector("#MGLT");
    let starship_class = document.querySelector("#starship_class");
    let pilots = document.querySelector("#pilots");
    
    /* Setting HTML for Main Section */
    name.innerText = `${data.name}`;
    model.innerText = `${data.model}`;
    manufacturer.innerText = `${data.manufacturer}`;
    cost_in_credits.innerText = `${data.cost_in_credits}`;
    length.innerText = `${data.length}`;
    max_atmosphering_speed.innerText = `${data.max_atmosphering_speed}`;
    crew.innerText = `${data.crew}`;
    passengers.innerText = `${data.passengers}`;
    cargo_capacity.innerText = `${data.cargo_capacity}`;
    consumables.innerText = `${data.consumables}`;
    hyperdrive_rating.innerText = `${data.hyperdrive_rating}`;
    mglt.innerText = `${data.mglt}`;
    starship_class.innerText = `${data.starship_class}`;
    pilots.innerText = `${data.pilots}`;
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
let model = document.querySelector('#model');
let manufacturer = document.querySelector('#manufacturer');
let cost_in_credits = document.querySelector('#cost_in_credits');
let length = document.querySelector('#length');
let max_atmosphering_speed = document.querySelector('#max_atmosphering_speed');
let crew = document.querySelector('#crew');
let passengers = document.querySelector('#passengers');
let cargo_capacity = document.querySelector('#cargo_capacity');
let consumables = document.querySelector('#consumables');
let hyperdrive_rating = document.querySelector('#hyperdrive_rating');
let MGLT = document.querySelector('#MGLT');
let starship_class = document.querySelector('#starship_class');
let pilots = document.querySelector('#pilots');
let films = document.querySelector('#films');

var number = document.URL.substring(document.URL.indexOf('=') + 1);
//var number = '14';

function getInfo() {
    axios.get('https://swapi.co/api/starships/' + number + '/').then(function(response) {
        updateInfo(response.data);
    });
}

function updateInfo(data) {
    name.innerText = `Name: ${data.name}`;
    model.innerText = `Model: ${data.model}`;
    manufacturer.innerText = `Manufacturer: ${data.manufacturer}`;
    cost_in_credits.innerText = `Cost in Credits: ${data.cost_in_credits}`;
    length.innerText = `Length: ${data.length}`;
    max_atmosphering_speed.innerText = `Max Atmosphering Speed: ${data.max_atmosphering_speed}`;
    crew.innerText = `Crew: ${data.crew}`;
    passengers.innerText = `Passengers: ${data.passengers}`;
    cargo_capacity.innerText = `Cargo Capacity: ${data.cargo_capacity}`;
    consumables.innerText = `Consumables: ${data.consumables}`;
    hyperdrive_rating.innerText = `Hyperdrive Rating: ${data.hyperdrive_rating}`;
    mglt.innerText = `MGLT: ${data.mglt}`;
    starship_class.innerText = `Starship Class: ${data.starship_class}`;
    pilots.innerText = `Pilots: ${data.pilots}`;
    films.innerText = `Films: ${data.films}`;
}

button.addEventListener('click', getInfo);*/