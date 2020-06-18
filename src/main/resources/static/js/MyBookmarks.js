var numOfMovies;
$(document).ready(function () {
    getMybookmarks();

    function createMovieCell(title, movieId) {
        let div_box = $("#div-box");
        let div_cell = document.createElement("div");
        div_cell.className = ("div-cell");
        div_cell.id = (movieId);

        let minusImage = document.createElement("img");
        minusImage.src = "img/remove.png";
        minusImage.className = "bookmark-button";
        minusImage.id = ('minusImage-' + movieId);
        div_cell.append(minusImage);
        let movieTitle = document.createElement("h2");
        movieTitle.className = "h2-title";
        movieTitle.id = ("h2-" + movieId);
        movieTitle.append(title);
        ul = document.createElement("ul");
        ul.id = ("movie-list" + movieId);
        div_cell.append(movieTitle);
        div_cell.append(ul);
        div_box.append(div_cell);

    }

    function getMybookmarks() {
        $.get("/bookmark", function (data) {
            console.log(data);
            numOfMovies = 0;
            for (movie in data) {
                numOfMovies = numOfMovies + 1;
                console.log(data[movie]);
                console.log(data[movie]["movieId"]);
                getMovieTitle(data[movie]["movieId"]);
            }
            document.getElementById("bookmarkMessage").innerHTML = 'You have ' + numOfMovies + ' movies added!'
        });
    }

    function getMovieTitle(movieId) {
        $.get('http://www.omdbapi.com/?apikey=638b84ba&i=' + movieId,
            function (data, textStatus, jqXHR) {
                data["Title"];
                console.log('bill');
                console.log(data);
                createMovieCell(data["Title"], movieId);
                onClickCell(movieId);
            });
    }

    document.querySelectorAll('.div-box').forEach(item => {
        item.addEventListener('click', function (event) {
            var parent = document.getElementsByClassName('div-cell');
            var child = document.getElementsByClassName('bookmark-button');
            for (var i = 0; i < parent.length; i++) {

                parent[i].addEventListener('click', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if ($(event.target).hasClass("bookmark-button")) {
                        alert('Succesfully Deleted!');
                        deleteBookmark(this.id);
                        document.getElementById(this.id).remove();
                        numOfMovies = numOfMovies - 1;
                        document.getElementById("bookmarkMessage").innerHTML = 'You have ' + numOfMovies + ' movies added!'
                    }

                }, true);
            }
        })
    });

    /**needs to be done**/
    function deleteBookmark(movieId) {
        $.ajax({
            url: '/bookmark',
            type: 'DELETE',
            data: JSON.stringify({"MovieId": movieId}),
            dataType: 'text',
            contentType: 'application/json',
            success: function (result) {
                console.log("success");
            }
        });
    }

});


function onClickCell(movieId) {

    $.get('http://www.omdbapi.com/?apikey=638b84ba&i=' + movieId,
        function (data, textStatus, jqXHR) {
            let ul = document.getElementById("movie-list" + movieId);
            var localJson = parseJson(data);
            //create image poster
            let li = document.createElement("li");
            li.className = ("li image");
            let poster = document.createElement("img");
            poster.className = ("poster-image");
            poster.src = localJson['Poster'];
            poster.alt='Poster Image';
            poster.style.width = "20%";
            li.appendChild(poster);
            ul.appendChild(li);
            delete localJson['Poster'];
            //end of create image poster
            for (element in localJson) {
                let li = document.createElement("li");
                li.className = ("li init");
                li.appendChild(document.createTextNode(element + " : " + localJson[element]));
                ul.appendChild(li);
            }
        });
}

function getMoviesDetails(movieId) {
    let title = null;
    $.get('http://www.omdbapi.com/?apikey=638b84ba&i=' + movieId,
        function (data, textStatus, jqXHR) {
            title = data["Title"];
            console.log(data);
        });
    return title;
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

