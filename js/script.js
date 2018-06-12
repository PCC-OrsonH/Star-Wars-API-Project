// Function for getting the user search
function getSearch() {
    /* Variables */
    let type = document.getElementsByTagName("select")[0].value;
    let value = document.getElementById("search").value;

    /* Calling the Function that stores the API calls */
    thisAPISux(type, value);
}
// Function for calling the API and storing the results and searching for the value :)
function thisAPISux(type, value) {
    /* Variables */
    let thing = [];
    let x = 0;

    /* Storing the first Object */
    callingAPI("https://swapi.co/api/" + type + "/");

    /* Storing the rest of the objects */
    function checking(foundObject) {
        thing[x] = foundObject;
        searching(thing[x])
    }
    
    /* Function for calling the API */
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
    
    /* Function for checking the search */
    function searching(stuff) {
        /* Variables */
        let i;
        let url = null;
        let c;
        let d;

        /* Searching for value */
        value = value.charAt(0).toUpperCase() + value.slice(1);
        for (i = 0; i < stuff.results.length; i++) {
            if (type == "films") {
                if (value == stuff.results[i].title) {
                    url = stuff.results[i].url;
                    break;
                }
            } else {
                if (value == stuff.results[i].name) {
                    url = stuff.results[i].url;
                    break;
                }
            }
        }

        /* Searching for ID */
        if (url != null) {
            for (let y = 0; y < url.length; y++) {
                c = url.charAt(y);
                if (!isNaN(parseInt(c, 10))) {
                    d = url.charAt(y + 1);
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
            if (stuff.next == null) {
                badSearch(value, thing, type);
            } else {
                x++;
                callingAPI(stuff.next);
            }
        }
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
        for (let x = 0; x < thing[i].results.length; x++) {
            if (type == "films") {
                if (firstLetter == thing[i].results[x].title.charAt(0)) {
                    /* Variables */
                    let listItem = document.createElement("li");
                    let a = document.createElement("a");
                    let url = foundSomething(thing[i].results[x], type);

                    /* Displaying the Suggestion */
                    a.innerHTML = thing[i].results[x].title;
                    a.setAttribute("href", url);
                    listItem.appendChild(a);
                    area.appendChild(listItem);
                }
            } else {
                if (firstLetter == thing[i].results[x].name.charAt(0)) {
                    /* Variables */
                    let listItem = document.createElement("li");
                    let a = document.createElement("a");
                    let url = foundSomething(thing[i].results[x], type);

                    /* Displaying the Suggestion */
                    a.innerHTML = thing[i].results[x].name;
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