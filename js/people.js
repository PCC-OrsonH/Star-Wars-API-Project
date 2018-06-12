function getInfo() {
    /* Variables */
    let number = document.URL.substring(document.URL.indexOf('=') + 1);

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", "https://swapi.co/api/people/" + number + "/", true);
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
    let height = document.getElementById("height");
    let mass = document.getElementById("mass");
    let hair_color = document.querySelector('#hair_color');
    let skin_color = document.querySelector('#skin_color');
    let eye_color = document.querySelector("#eye_color");
    let birth_year = document.querySelector("#birth_year");
    let gender = document.querySelector("#gender");
    
    /* Setting HTML for Main Section */
    name.innerText = `${data.name}`;
    height.innerText = `${data.height}`;
    mass.innerText = `${data.mass}`;
    hair_color.innerText = `${data.hair_color}`;
    skin_color.innerText = `${data.skin_color}`;
    eye_color.innerText = `${data.eye_color}`;
    birth_year.innerText = `${data.birth_year}`;
    gender.innerText = `${data.gender}`;
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