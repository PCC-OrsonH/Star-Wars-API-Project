function getInfo() {
    /* Variables */
    let number = document.URL.substring(document.URL.indexOf('=') + 1);

    /* XML Call */
    let xhr = new XMLHttpRequest;
    xhr.open("GET", "https://swapi.co/api/films/" + number + "/", true);
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
    let title = document.getElementById("title");
    let opening_crawl = document.getElementById("desc");
    let director = document.getElementById("director");
    let producer = document.querySelector('#producer');
    let release_date = document.querySelector('#release_date');
    let episode_id = document.querySelector("#episodeId");

    /* Setting HTML for Main Section */
    title.innerText = `${data.title}`;
    opening_crawl.innerText = `${data.opening_crawl}`;
    director.innerText = `${data.director}`;
    producer.innerText = `${data.producer}`;
    episode_id.innerText = `${data.episode_id}`;
    release_date.innerText = `${data.release_date}`;
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
