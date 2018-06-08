// Class for storing the searches, this API seriously so bad i have to use OOP to make it faster : )
class Result {
    /* Constructor */
    constructor(stuff) {
        this.thing = stuff;
    }

    /* Methods */
    getStuff() {
        return this.thing;
    }
}
// Function for calling the API and storing the results
function thisAPISux(type) {
    /* Variables */
    let firstObject;
    let thing = [];
    let x = 0;

    /* Storing the first Object */
    callingAPI("https://swapi.co/api/" + type + "/");

    /* Storing the rest of the objects */
    function checking(foundObject) {
        if (foundObject.next == null) {
            thing[x] = new Result(foundObject);
            searching(thing, type); // Searching for the search value
        } else {
            thing[x] = new Result(foundObject);
            x++;
            callingAPI(foundObject.next);
        }
    }
    // Function for calling the API 
    function callingAPI(search) {
        /* Variables */
        let foundObject

        /* XML Request */
        let xhr = new XMLHttpRequest();
        xhr.open("GET", search, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState === this.DONE) {
                foundObject = JSON.parse(xhr.responseText);
                checking(foundObject);
            }
        }
    }
}
// Function for getting the user search
function getSearch() {
    /* Variables */
    let type = document.getElementsByTagName("select")[0].value;

    /* Calling the Function that stores the API calls */
    thisAPISux(type);
}
// Function for validating the search
function searching(thing, type) {
    /* Variables */
    let i;
    let x;
    let url = null;
    let c;
    let d;
    let value;

    /* Searching for value */
    value = document.getElementById("search").value;
    value = value.charAt(0).toUpperCase() + value.slice(1);
    for (i = 0; i < thing.length; i++) {
        for (x = 0; x < thing[i].thing.results.length; x++) {
            if (type == "films") {
                if (value == thing[i].thing.results[x].title) {
                    url = thing[i].thing.results[x].url;
                    break;
                }
            } else {
                if (value == thing[i].thing.results[x].name) {
                    url = thing[i].thing.results[x].url;
                    break;
                }
            }
        }
        if (x < thing[i].thing.results.length) {
            break;
        }
    }

    /* Searching for ID */
    if (url != null) {
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
        badSearch(value, thing, type);
    }
}
// Function for making suggestions on bad searches
function badSearch(value, thing, type) {
    /* Variables */
    let firstLetter = value.charAt(0).toUpperCase();
    let area = document.getElementById("suggList");
    let eMessage = document.getElementById("errorMess");

    /* Clearing and displaying sections */

    area.innerHTML = " ";
    area.style.display = "block";
    eMessage.style.display = "block";
    eMessage.innerHTML = "Whoops! Can't seem to find that " + "<br>" + "Did you mean: ";
    document.getElementsByClassName("well")[0].style.display = "block";

    /* Searching for suggestions */
    for (let i = 0; i < thing.length; i++) {
        for (let x = 0; x < thing[i].thing.results.length; x++) {
            if (type == "films") {
                if (firstLetter == thing[i].thing.results[x].title.charAt(0)) {
                    /* Variables */
                    let listItem = document.createElement("li");
                    let a = document.createElement("a");
                    let url = foundSomething(thing[i].thing.results[x], type);

                    /* Displaying the Suggestion */
                    a.innerHTML = thing[i].thing.results[x].name || thing[i].thing.results[x].title;
                    a.setAttribute("href", url);
                    listItem.appendChild(a);
                    area.appendChild(listItem);
                }
            } else {
                if (firstLetter == thing[i].thing.results[x].name.charAt(0)) {
                    /* Variables */
                    let listItem = document.createElement("li");
                    let a = document.createElement("a");
                    let url = foundSomething(thing[i].thing.results[x], type);

                    /* Displaying the Suggestion */
                    a.innerHTML = thing[i].thing.results[x].name || thing[i].thing.results[x].title;
                    a.setAttribute("href", url);
                    listItem.appendChild(a);
                    area.appendChild(listItem);
                }
            }
        }
    }
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