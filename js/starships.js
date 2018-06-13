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
    let name = document.getElementById("name");
    let model = document.getElementById("model");
    let manufacturer = document.getElementById("manufacturer");
    let cost_in_credits = document.querySelector('#cost_in_credits');
    let length = document.querySelector('#length');
    let max_atmosphering_speed = document.querySelector("#max_atmosphering_speed");
    let crew = document.querySelector("#crew");
    let passengers = document.querySelector("#passengers");
    let cargo_capacity = document.querySelector("#cargo_capacity");
    let consumables = document.querySelector("#consumables");
    let hyperdrive_rating = document.querySelector("#hyperdrive_rating");
    let mglt = document.querySelector("#mglt");
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
    for (let x = 0; x < data.films.length; x++) {
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