// Function for getting the user search
function getSearch() {
    let value = document.getElementById("search").value;

    let type = document.getElementsByTagName("select")[0].value;

    searching(value, type);
}
// Function for validating the search
function searching(value, type) {
    let Object;
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://swapi.co/api/" + type + "/", false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    Object = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    let i;
    let url;
    for (i = 0; i < Object.results.length; i++) {
        if (Object.results[i].name == value) {
            url = Object.results[i].url;
            break;
        }
    }
    let c;
    let d;
    if (i < Object.results.length) {
        for (let x = 0; x < url.length; x++) {
            c = url.charAt(x);
            if (!isNaN(parseInt(c, 10))) {
                d = url.charAt(x + 1);
                if (!isNaN(parseInt(d, 10))) {
                    break;
                } else if (d == "/") {
                    d = " ";
                    break;
                }
            }
        }
        if (d == " ") {
            window.location = type + "html?=" + c;
        } else {
            window.location = type + "html?=" + c + d;
        }
    } else {
        if (i == Object.results.length && Object.next != null) {
            callingAPI(value, type, Object.next);
        } else {
            badSearch(value);
        }
    }
}
// Function for calling the API multiple times for searches
function callingAPI(value, type, search) {
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", search, false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    Object = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    let i;
    let url;
    for (i = 0; i < Object.results.length; i++) {
        if (Object.results[i].name == value) {
            url = Object.results[i].url;
            break;
        }
    }
    let c;
    let d;
    if (i < Object.results.length) {
        for (let x = 0; x < url.length; x++) {
            c = url.charAt(x);
            if (!isNaN(parseInt(c, 10))) {
                d = url.charAt(x + 1);
                if (!isNaN(parseInt(d, 10))) {
                    break;
                } else if (d == "/") {
                    d = " ";
                    break;
                }
            }
        }
        if (d == " ") {
            window.location = type + ".html?=" + c;
        } else {
            window.location = type + ".html?=" + c + d;
        }
    } else {
        if (i == Object.results.length && Object.next != null) {
            callingAPI(value, type, Object.next);
        } else {
            badSearch(value, type);
        }
    }
}
// Function for making suggestions on bad searches
function badSearch(value, type) {
    let firstLetter = value.charAt(0);

    let area = document.getElementById("suggList");
    area.style.display = "block";
    let eMessage = document.getElementById("errorMess");
    eMessage.style.display = "block";
    eMessage.innerHTML = "Whoops! Can't seem to find that " + "<br>" + "Did you mean: ";

    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://swapi.co/api/" + type + "/", false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    Object = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    for (let i = 0; i < Object.results.length; i++) {
        if (firstLetter == Object.results[i].name.charAt(0)) {
            let listItem = document.createElement("li");
            listItem.innerHTML = Object.results[i].name;
            area.appendChild(listItem);
        }
    }
    let xhr2 = new XMLHttpRequest(); // XML Request
    xhr2.open("GET", Object.next, false); // Requesting all the pokemon in the database
    xhr2.send(); // sending the request
    Object2 = JSON.parse(xhr2.responseText); // Declaring a variable for the JSON object
    for (let i = 0; i < Object2.results.length; i++) {
        if (firstLetter == Object2.results[i].name.charAt(0)) {
            let listItem = document.createElement("li");
            listItem.innerHTML = Object2.results[i].name;
            area.appendChild(listItem);
        }
    }
}
