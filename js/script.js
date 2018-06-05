// Function for getting the user search
function getSearch() {
    let value = document.getElementById("search").value;

    let type = document.getElementsByTagName("select")[0].value;

    searching(value, type);
}
// Function for validating the search
function searching(value, type) {
    let Object;

    let counter = 1;

    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://swapi.co/api/" + type + "/", false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    Object = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    console.log(Object);

    let i;
    let url;
    for (i = 0; i < Object.results.length; i++) {
        if (Object.results[i].name == value) {
            url = Object.results[i].url;
            break;
        }
        counter++;
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
            callingAPI(counter, value, type, Object.next);
        } else {
            console.log("Should be seeing this on bad searches");
        }
    }
}
// Function for calling the API multiple times for searches
function callingAPI(counter, value, type, search) {
    console.log(counter);
    let xhr = new XMLHttpRequest(); // XML Request
    console.log(search);
    xhr.open("GET", search, false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    Object = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    console.log(Object);

    let i;
    let url;
    for (i = 0; i < Object.results.length; i++) {
        if (Object.results[i].name == value) {
            url = Object.results[i].url;
            break;
        }
        counter++;
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
            callingAPI(counter, value, type, Object.next);
        } else {
            console.log("Should be seeing this on bad searches");
        }
    }
}
