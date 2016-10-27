$(document).on('pageinit', '#home', function(){
  var url = 'https://api.themoviedb.org/3/',
     mode = 'search/movie?',
     movieName = '&query=Batman',
     key = 'api_key=57f1baa9220b890cc58e2fc0cafc8c7c'
     language = '&language=en-US';

    $.ajax({
        url: url + mode + key + movieName ,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });
});

$(document).on('pagebeforeshow', '#headline', function(){
    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {
        if(row.id == movieInfo.id) {
            $('#movie-data').append('<li><img src="https://image.tmdb.org/t/p/w185'+row.poster_path+'"></li>');
            $('#movie-data').append('<li>Title: '+row.original_title+'</li>');
            $('#movie-data').append('<li>Release date: '+row.release_date+'</li>');
            $('#movie-data').append('<li>Popularity: '+row.popularity+'</li>');
            $('#movie-data').append('<li>Average : '+row.vote_average+'</li>');
            $('#movie-data').listview('refresh');
        }
    });
});

$(document).on('vclick', '#movie-list li a', function(){
    movieInfo.id = $(this).attr('data-id');
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
});

var movieInfo = {
    id : null,
    result : null
}

var ajax = {
    parseJSONP:function(result){
        movieInfo.result = result.results;
        $.each(result.results, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="" data-id="' + row.id + '"><img src="https://image.tmdb.org/t/p/w185'+row.poster_path+'"/><h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p></a></li>');
        });
        $('#movie-list').listview('refresh');
    }
}
