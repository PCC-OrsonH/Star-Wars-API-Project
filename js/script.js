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
    for (i = 0; i < Object.results.length; i++) {
        if (Object.results[i].name == value) {
            window.location = type + ".html?=" + (counter + 1);
        }
        counter++;
    }
    if (i == Object.results.length) {
        let xhr = new XMLHttpRequest(); // XML Request
        xhr.open("GET", "", false); // Requesting all the pokemon in the database
        xhr.send(); // sending the request
        console.log(xhr.status); // Logging the status of the request
        Object = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
        console.log(Object);
    }
}
