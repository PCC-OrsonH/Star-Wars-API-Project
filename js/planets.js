function getInfo() {
    /* Variables */
    let number = document.URL.substring(document.URL.indexOf('=') + 1);

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", "https://swapi.co/api/planets/" + number + "/", true);
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
    let rotation_period = document.getElementById("#rotation_period");
    let orbital_period = document.getElementById("#orbital_period");
    let diameter = document.querySelector('#diameter');
    let climate = document.querySelector('#climate');
    let gravity = document.querySelector("#gravity");
    let terrain = document.querySelector("#terrain");
    let surface_water = document.querySelector("#surface_water");
    let population = document.querySelector("#population");
    let residents = document.querySelector("#residents");
    
    /* Setting HTML for Main Section */
    name.innerText = `${data.name}`;
    rotation_period.innerText = `${data.rotation_period}`;
    orbital_period.innerText = `${data.orbital_period}`;
    diameter.innerText = `${data.diameter}`;
    climate.innerText = `${data.climate}`;
    gravity.innerText = `${data.gravity}`;
    surface_water.innerText = `${data.surface_water}`;
    population.innerText = `${data.population}`;
    residents.innerText = `${data.residents}`;
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
let rotation_period = document.querySelector('#rotation_period');
let orbital_period = document.querySelector('#orbital_period');
let diameter = document.querySelector('#diameter');
let climate = document.querySelector('#climate');
let gravity = document.querySelector('#gravity');
let terrain = document.querySelector('#terrain');
let surface_water = document.querySelector('#surface_water');
let population = document.querySelector('#population');
let residents = document.querySelector('#residents');
let films = document.querySelector('#films');

var number = document.URL.substring(document.URL.indexOf('=') + 1);
//var number = '1';

function getInfo() {
    axios.get('https://swapi.co/api/planets/' + number + '/').then(function(response) {
        updateInfo(response.data);
    });
}

function updateInfo(data) {
    name.innerText = `Planet Name: ${data.name}`;
    rotation_period.innerText = `Rotation Period: ${data.rotation_period}`;
    orbital_period.innerText = `Orbital Period: ${data.orbital_period}`;
    diameter.innerText = `Planet Diameter: ${data.diameter}`;
    climate.innerText = `Climate: ${data.climate}`;
    gravity.innerText = `Gravity: ${data.gravity}`;
    terrain.innerText = `Terrain: ${data.terrain}`;
    surface_water.innerText = `Surface Water (%): ${data.surface_water}`;
	population.innerText = `Population: ${data.population}`;
    residents.innerText = `Residents: ${data.residents}`;
    films.innerText = `Films: ${data.films}`;
}

button.addEventListener('click', getInfo);*/