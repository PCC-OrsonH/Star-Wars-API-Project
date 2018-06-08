// Function for getting the user search
function getSearch() {
    /* Variables */

    let value = document.getElementById("search").value;

    let type = document.getElementsByTagName("select")[0].value;

    /* Calling the searching Function */

    searching(value, type);
}
// Function for validating the search
function searching(value, type) {
    /* Variables */

    let firstObject;
    let i; 
    let url;
    let c;
    let d;

    /* XML Request */
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", "https://swapi.co/api/" + type + "/", false);
    xhr.send();
    firstObject = JSON.parse(xhr.responseText);
 
    /* Searching for value */

    value = value.charAt(0).toUpperCase() + value.slice(1);
    for (i = 0; i < firstObject.results.length; i++) {
        if (firstObject.results[i].name == value) {
            url = firstObject.results[i].url;
            break;
        }
    }
 
    /* Searching for ID */ 

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
// Function for calling the API multiple times for searches
function callingAPI(value, type, search) {
    /* Variables */

    let firstObject;
    let i;
    let url;
    let c;
    let d;

    /* XMl Request */

    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", search, false); 
    xhr.send(); 
    console.log(xhr.status); 
    firstObject = JSON.parse(xhr.responseText); 

    /* Searching for value */ 

    for (i = 0; i < firstObject.results.length; i++) {
        if (firstObject.results[i].name == value) {
            url = firstObject.results[i].url;
            break;
        }
    }

    /* Searching for ID */

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
            callingAPI(value, type, firstObject.next); // Recalling the function with the new API URL
        } else {
            badSearch(value, type);
        }
    }
}
// Function for making suggestions on bad searches
function badSearch(value, type) {
    /* Variables */

    let firstLetter = value.charAt(0);
    let area = document.getElementById("suggList");
    let eMessage = document.getElementById("errorMess");

    /* Clearing and displaying sections */

    area.innerHTML = " ";
    area.style.display = "block";
    eMessage.style.display = "block";
    eMessage.innerHTML = "Whoops! Can't seem to find that " + "<br>" + "Did you mean: ";
    document.getElementsByClassName("well")[0].style.display = "block";

    // Getting the first list in the category 
    let firstObject = badCall("https://swapi.co/api/" + type + "/");

    /* Searching the List for suggestions */

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
            if (firstObject.next == null) {
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
                break;
            }
        }
    }
}
// Function for calling the API 
function badCall(search) {
    /* Variables */
    let firstObject;

    /* XML Request */

    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", search, false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    firstObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object
    return firstObject;
}
// Function for clearing the Error Message and Suggestion List
function clearing() {
    /* Clearing lists */

    document.getElementById("errorMess").style.display = "none";
    document.getElementById("suggList").style.display = "none";
    document.getElementById("suggList").innerHTML = " ";
    document.getElementsByClassName("well")[0].style.display = "none";
}
// Function for redirecting the suggested item, kill me please
function foundSomething(results, type) {
    /* Variables */

    let message;
    let url;
    let c;
    let d;
    
    /* Searching for ID */
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
    message = type + ".html?=" + c + d
    return message;
}
