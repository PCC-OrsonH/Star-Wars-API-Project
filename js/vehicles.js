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
let vehicle_class = document.querySelector('#vehicle_class');
let pilots = document.querySelector('#pilots');
let films = document.querySelector('#films');

var number = document.URL.substring(document.URL.indexOf('=') + 1);
//var number = '14';

function getInfo() {
    axios.get('https://swapi.co/api/vehicles/' + number + '/').then(function(response) {
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
    vehicle_class.innerText = `Vehicle Class: ${data.vehicle_class}`;
    pilots.innerText = `Pilots: ${data.pilots}`;
    films.innerText = `Films: ${data.films}`;
}

button.addEventListener('click', getInfo);