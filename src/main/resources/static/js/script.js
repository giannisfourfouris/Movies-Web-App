//var jsonObject  = {"Title":"Titanic","Year":"1997","Rated":"PG-13","Released":"19 Dec 1997","Runtime":"194 min","Genre":"Drama, Romance","Director":"James Cameron","Writer":"James Cameron","Actors":"Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates","Plot":"A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.","Language":"English, Swedish, Italian","Country":"USA","Awards":"Won 11 Oscars. Another 114 wins & 83 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.8/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"75/100"}],"Metascore":"75","imdbRating":"7.8","imdbVotes":"1,004,959","imdbID":"tt0120338","Type":"movie","DVD":"10 Sep 2012","BoxOffice":"N/A","Production":"Paramount Pictures","Website":"N/A","Response":"True"};
var jsonObject;
var wid;

function renderer(data) {
    boxes = document.querySelectorAll(".div-cell");
    for (i = 0; i < boxes.length; i++) {
        boxes[i].style.display = "none";
    }

    jsonObject = data;
    var parent = document.getElementById('div-cell');
    var child = document.getElementById('bookmark-button');
    var list = document.getElementsByClassName('li');
    var image = document.getElementById('poster-image');
    var childOfChild = document.getElementById('addImage');
    initializeList(jsonObject);
    parent.addEventListener('click', function (event) {
        //event.stopPropagation();
        //event.preventDefault();
        if (event.target === parent || Array.from(list).includes(event.target)) {
            let element = document.getElementById("div-cell");

            if (wid === 0) {
                image.style.width = "130%";
                element.style.width = "80%";
                element.style.height = "90%";
                // deleteAllList();
                // initializeList(jsonObject);
                addDetailsToList();
                wid = 1;
                console.log("1");

            } else if (wid === 1) {
                image.style.width = "80%";
                element.style.width = "80%";
                element.style.height = "initial";
                //deleteDetailsFromList();
                // deleteAllList();
                // initializeList(jsonObject);
                initializeListWid1();
                console.log("2");
                wid = 0;

            }
        }
        // if (event.target === child) {
        //     alert("i am the child");
        // }
        // if (event.target === childOfChild) {
        //     alert('Ok bill');
        //     addBookmark(jsonObject["imdbID"]);
        // }

    }, true);
}

function addBookm() {
    // alert(jsonObject["imdbID"]);
    if (document.cookie) {
        addBookmark(jsonObject["imdbID"]);
        alert("Succesfully Added!");
    } else {
        alert('You must first logIn in order to add bookmark');
    }

}

function addBookmark(movieId) {
    $.ajax({
        url: '/bookmark',
        type: 'POST',
        data: JSON.stringify({"MovieId": movieId}),
        dataType: 'text',
        contentType: 'application/json',
        success: function (result) {
            console.log("success");
        }
    });
}

function initializeList(localJsonObject) {
    wid = 0;

    let element = document.getElementById("div-cell");
    var image = document.getElementById('poster-image');
    image.style.width = "80%";
    element.style.width = "80%";
    element.style.height = "initial";

    document.getElementById("poster-image").src = localJsonObject.Poster;
    deleteAllList()
    var listLi = ["Title", "imdbID", "Year", "Genre", "imdbRating"];
    let ul = document.getElementById("movie-list");
    if (localJsonObject['Response'] == 'True') {
        boxes = document.querySelectorAll(".div-cell");
        for (i = 0; i < boxes.length; i++) {
            boxes[i].style.display = "table-cell";
        }
        document.getElementById("poster-image").style.display = 'block';
        document.getElementById("bookmark-button").style.display = 'block';
        var localJson = parseJson(localJsonObject);
        for (element in localJson) {
            if (listLi.includes(element)) {
                let li = document.createElement("li");
                li.className = ("li init");
                if (element === "Title") {
                    li.classList.add("movie-title-list");
                }
                li.appendChild(document.createTextNode(element + " : " + localJson[element]));
                ul.appendChild(li);
            }
        }
    }
}

function initializeListWid1() {
    deleteAllList()
    var listLi = ["Title", "imdbID", "Year", "Genre", "imdbRating"];
    let ul = document.getElementById("movie-list");
    var localJson = parseJson(jsonObject);
    for (element in localJson) {
        if (listLi.includes(element)) {
            let li = document.createElement("li");
            li.className = ("li init");
            if (element === "Title") {
                li.classList.add("movie-title-list");
            }
            li.appendChild(document.createTextNode(element + " : " + localJson[element]));
            ul.appendChild(li);
        }
    }
}

function addDetailsToList() {
    deleteAllList()
    var listLi = ["Poster", "Response"];
    let ul = document.getElementById("movie-list");
    var localJson = parseJson(jsonObject);
    for (element in localJson) {
        if (!listLi.includes(element)) {
            let li = document.createElement("li");
            li.className = ("li new");
            li.appendChild(document.createTextNode(element + " : " + localJson[element]));
            ul.appendChild(li);
        }
    }
}

function deleteAllList() {
    let ul = document.getElementById("movie-list");
    x = document.querySelectorAll(".li");
    for (i = 0; i < x.length; i++) {
        ul.removeChild(x[i]);
    }
}

function deleteDetailsFromList() {
    let ul = document.getElementById("movie-list");
    x = document.querySelectorAll(".new");
    for (i = 0; i < x.length; i++) {
        ul.removeChild(x[i]);
    }
}

function parseJson(myJson) {
    for (i in myJson) {
        if (myJson[i] == "N/A") {
            delete myJson[i];
        }
    }
    delete myJson["Ratings"];
    return myJson;
}
