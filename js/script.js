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
    firstObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    let i;
    let url;
    for (i = 0; i < firstObject.results.length; i++) {
        if (firstObject.results[i].name == value) {
            url = firstObject.results[i].url;
            break;
        }
    }
    let c;
    let d;
    if (i < firstObject.results.length) {
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
        if (i == firstObject.results.length && firstObject.next != null) {
            callingAPI(value, type, Object.next);
        } else {
            badSearch(value, type);
        }
    }
}
// Function for calling the API multiple times for searches
function callingAPI(value, type, search) {
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", search, false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    firstObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    let i;
    let url;
    for (i = 0; i < firstObject.results.length; i++) {
        if (firstObject.results[i].name == value) {
            url = firstObject.results[i].url;
            break;
        }
    }
    let c;
    let d;
    if (i < firstObject.results.length) {
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
        if (i == firstObject.results.length && firstObject.next != null) {
            callingAPI(value, type, firstObject.next);
        } else {
            badSearch(value, type);
        }
    }
}
// Function for making suggestions on bad searches
function badSearch(value, type) {
    let firstLetter = value.charAt(0);

    let area = document.getElementById("suggList");
    area.innerHTML = " ";
    area.style.display = "block";
    let eMessage = document.getElementById("errorMess");
    eMessage.style.display = "block";
    eMessage.innerHTML = "Whoops! Can't seem to find that " + "<br>" + "Did you mean: ";
    document.getElementsByClassName("well")[0].style.display = "block";

    let firstObject = badCall("https://swapi.co/api/" + type + "/");

    if (type == "films") {
        for (let i = 0; i < firstObject.results.length; i++) {
            if (firstLetter == firstObject.results[i].title.charAt(0)) {
                let listItem = document.createElement("li");
                let a = document.createElement("a");
                a.innerHTML = firstObject.results[i].title;
                let url = foundSomething(firstObject.results[i], type);
                a.setAttribute("href", url);
                listItem.appendChild(a);
                area.appendChild(listItem);
            }
        }
    } else {
        while (true) {
            for (let i = 0; i < firstObject.results.length; i++) {
                if (firstLetter == firstObject.results[i].name.charAt(0)) {
                    let listItem = document.createElement("li");
                    let a = document.createElement("a");
                    a.innerHTML = firstObject.results[i].name;
                    let url = foundSomething(firstObject.results[i], type);
                    a.setAttribute("href", url);
                    listItem.appendChild(a);
                    area.appendChild(listItem);
                }
            }
            firstObject = badCall(firstObject.next);
            if(firstObject.next == null){
                break;
            }
        }
    }
}
    // Function for calling the API 
    function badCall(search) {
        let xhr = new XMLHttpRequest(); // XML Request
        xhr.open("GET", search, false); // Requesting all the pokemon in the database
        xhr.send(); // sending the request
        firstObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
        return firstObject;
    }
    // Function for clearing the Error Message and Suggestion List
    function clearing() {
        document.getElementById("errorMess").style.display = "none";
        document.getElementById("suggList").style.display = "none";
        document.getElementById("suggList").innerHTML = " ";
        document.getElementsByClassName("well")[0].style.display = "none";
    }
    // Function for redirecting the suggested item, kill me please
    function foundSomething(results, type) {
        let c;
        let d;
        url = results.url;
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
        let message = type + ".html?=" + c + d
        return message;
    }
