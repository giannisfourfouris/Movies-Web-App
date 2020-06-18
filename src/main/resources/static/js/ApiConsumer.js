
$(document).ready(function () {

   $("#search-bar").keyup(function () {
       $.get('http://www.omdbapi.com/?&apikey=638b84ba&t='+$("#search-bar").val(),
           function (data, textStatus , jqXHR) {

               renderer(data);
           });
   });
});

