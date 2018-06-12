let name = document.querySelector('#name');
let rotation_period = document.querySelector('#rotation_period');
let orbital_period = document.querySelector('#orbital_period');
let diameter = document.querySelector('#diameter');
let climate = document.querySelector('#climate');
let gravity = document.querySelector('#gravity');
let terrain = document.querySelector('#terrain');
let surface_water = document.querySelector('#surface_water');
let population = document.querySelector('#population');

var number = '1';

function getInfo() {
    axios.get('https://swapi.co/api/planets/' + number + '/').then(function(response) {
        updateInfo(response.data);
    });
}

function updateInfo(data) {
    name.innerText = `Name: ${data.name}`;
    rotation_period.innerText = `Height: ${data.rotation_period}`;
    orbital_period.innerText = `Mass: ${data.orbital_period}`;
    diameter.innerText = `Hair Color: ${data.diameter}`;
    climate.innerText = `Skin Color: ${data.climate}`;
    gravity.innerText = `Eye Color: ${data.gravity}`;
    terrain.innerText = `Birth Year: ${data.terrain}`;
    surface_water.innerText = `Gender: ${data.surface_water}`;
	population.innerText = `Gender: ${data.population}`;
}

button.addEventListener('click', getInfo);