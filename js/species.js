let name = document.querySelector('#name');
let classification = document.querySelector('#classification');
let designation = document.querySelector('#designation');
let average_height = document.querySelector('#average_height');
let skin_colors = document.querySelector('#skin_colors');
let hair_colors = document.querySelector('#hair_colors');
let eye_colors = document.querySelector('#eye_colors');
let average_lifespan = document.querySelector('#average_lifespan');
let homeworld = document.querySelector('#homeworld');
let language = document.querySelector('#language');
let people = document.querySelector('#people');
let films = document.querySelector('#films');

var number = document.URL.substring(document.URL.indexOf('=') + 1);
//var number = '14';

function getInfo() {
    axios.get('https://swapi.co/api/species/' + number + '/').then(function(response) {
        updateInfo(response.data);
    });
}

function updateInfo(data) {
    name.innerText = `Name: ${data.name}`;
    classification.innerText = `Classification: ${data.classification}`;
    designation.innerText = `Designation: ${data.designation}`;
    average_height.innerText = `Average Height: ${data.average_height}`;
    skin_colors.innerText = `Skin_colors: ${data.skin_colors}`;
    hair_colors.innerText = `Hair Colors: ${data.hair_colors}`;
    eye_colors.innerText = `Eye Colors: ${data.eye_colors}`;
    average_lifespan.innerText = `Average Lifespan: ${data.average_lifespan}`;
    homeworld.innerText = `Homeworld: ${data.homeworld}`;
    language.innerText = `Language: ${data.language}`;
    people.innerText = `People: ${data.people}`;
    films.innerText = `Films: ${data.films}`;
}

button.addEventListener('click', getInfo);