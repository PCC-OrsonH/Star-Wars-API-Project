function getInfo() {
    /* Variables */
    let number = document.URL.substring(document.URL.indexOf('=') + 1);

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", "https://swapi.co/api/species/" + number + "/", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let newObject = JSON.parse(xhr.responseText);
            console.log(newObject);
            updateInfo(newObject);
        }
    }
}

function updateInfo(data) {
    /* Variables */
    let name = document.getElementById("name");
    let classification = document.getElementById("classification");
    let designation = document.getElementById("designation");
    let average_height = document.querySelector('#average_height');
    let skin_colors = document.querySelector('#skin_colors');
    let hair_colors = document.querySelector("#hair_colors");
    let eye_colors = document.querySelector("#eye_colors");
    let average_lifespan = document.querySelector("#average_lifespan");
    let homeworld = document.querySelector("#homeworld");
    let language = document.querySelector("#language");
    
    /* Setting HTML for Main Section */
    name.innerText = `${data.name}`;
    classification.innerText = `${data.classification}`;
    designation.innerText = `${data.designation}`;
    average_height.innerText = `${data.average_height}`;
    skin_colors.innerText = `${data.skin_colors}`;
    hair_colors.innerText = `${data.hair_colors}`;
    eye_colors.innerText = `${data.eye_colors}`;
    average_lifespan.innerText = `${data.average_lifespan}`;
    language.innerText = `${data.language}`;

    /* XML Request */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", data.homeworld, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let newObject = JSON.parse(xhr.responseText);
            homeworld.innerHTML = `${newObject.name}`;
        }
    }
    for (let x = 0; x < data.people.length; x++) {
        foundCharacter(data.people[x]);
    }
    for(let x = 0; x < data.films.length; x++){
        foundMovie(data.films[x]);
    }
}
function foundMovie(stuff) {
    /* variables */
    let newObject;
    let id;
    let area = document.getElementById("movies");

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", stuff, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            newObject = JSON.parse(xhr.responseText);
            /* Variables */
            let image = document.createElement("img");
            let a = document.createElement("a");
            let div = document.createElement("div");
            let url;

            /* Setting Attributes */
            switch(newObject.episode_id){
                case 1:
                image.setAttribute("src", "images/phantom-menace.jpg");
                break;
                case 2:
                image.setAttribute("src", "images/attack-of-the-clones.jpg");
                break;
                case 3:
                image.setAttribute("src", "images/revenge-of-the-sith.jpg");
                break;
                case 4:
                image.setAttribute("src", "images/a-new-hope.jpg");
                break;
                case 5:
                image.setAttribute("src", "images/empire-strikes-back.jpg");
                break; 
                case 6:
                image.setAttribute("src", "images/return-of-the-jedi.jpg");
                break;
                case 7:
                image.setAttribute("src", "images/force-awakens-poster.jpg");
                break;
            }
            url = foundSomething(newObject, "films");
            a.setAttribute("href", url);
            div.setAttribute("class", "col-xs-12 col-sm-6 col-md-4");

            /* Displaying */
            a.appendChild(image);
            div.appendChild(a);
            area.appendChild(div);
        }
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