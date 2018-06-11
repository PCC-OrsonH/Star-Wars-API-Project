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

button.addEventListener('click', getInfo);