let name = document.querySelector('#name');
let height = document.querySelector('#height');
let mass = document.querySelector('#mass');
let hair_color = document.querySelector('#hair_color');
let skin_color = document.querySelector('#skin_color');
let eye_color = document.querySelector('#eye_color');
let birth_year = document.querySelector('#birth_year');
let gender = document.querySelector('#gender');

var number = '14';

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

button.addEventListener('click', getInfo);