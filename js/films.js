let title = document.querySelector('#title');
let episode_id = document.querySelector('#episode_id');
let opening_crawl = document.querySelector('#opening_crawl');
let director = document.querySelector('#director');
let producer = document.querySelector('#producer');
let release_date = document.querySelector('#release_date');
let characters = document.querySelector('#characters');
let planets = document.querySelector('#planets');
let starships = document.querySelector('#starships');
let vehicles = document.querySelector('#vehicles');
let species = document.querySelector('#species');

var number = document.URL.substring(document.URL.indexOf('=') + 1);
//var number = '1';

function getInfo() {
    axios.get('https://swapi.co/api/films/' + number + '/').then(function(response) {
        updateInfo(response.data);
    });
}

function updateInfo(data) {
    title.innerText = `Movie Title: ${data.title}`;
    episode_id.innerText = `Episode Id: ${data.episode_id}`;
    opening_crawl.innerText = `Opening Crawl: ${data.opening_crawl}`;
    director.innerText = `Director: ${data.director}`;
    producer.innerText = `Producer: ${data.producer}`;
    release_date.innerText = `Release Date: ${data.release_date}`;
    characters.innerText = `Characters: ${data.characters}`;
    planets.innerText = `Planets: ${data.planets}`;
    starships.innerText = `Starships: ${data.starships}`;
    vehicles.innerText = `Vehicles: ${data.vehicles}`;
    species.innerText = `Species: ${data.species}`;
}

button.addEventListener('click', getInfo);