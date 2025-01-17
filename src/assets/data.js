//module contains all of the assets or data elements that are needed for the app

export const API_KEY = "185993cd5c38564dea6ddcad4c8c3ea8";  //personal key required for the TMDB API

/* Per the TMDB API reference, a show image requires 3 pieces of information - 
a base_URL, a file_size, and a file_path.  The base_URL and file_size are provided in TMDBs configuration set-up and third item is fetched from the specific movie or TV show object.  Set up the first 2 items as a variable that will then get imported into other components or pages where needed.  The specific file_path will then get appended to the URL.
*/

export const backdrop_URL = "https://image.tmdb.org/t/p/original";
export const backdrop_URL_Small = "https://image.tmdb.org/t/p/w500";

export const poster_URL = "https://image.tmdb.org/t/p/original";

/*set up an array that holds the URLs required for the API call of a specific set of TV shows. The TMDB API provides specific query parameters to extract genres or other categories of shows*/

export const API_REQUESTS = {
    requestTrendingTV: `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`,
    requestSciFiTV: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10765`,
    requestOnAirTVShows: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
    requestAnimationTVShows: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`,
    requestComedyTVShows: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35`,
    requestDramaTVShows: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18`
}


//use the tvWatchList array to store TMDB show IDs that the user wants added to their watch list
export var tvWatchList = [];

//shortens strings to prevent overflow onto other panes or images
export const truncateTitle = (str, extractLength) => {
    if (str?.length > extractLength) {
        return str.slice(0, extractLength) + "...";
    }
    else {
        return str;
    }
}

