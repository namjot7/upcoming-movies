// Variables
const POPULAR_API =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const movieBox = document.querySelector('#movie-box');


// Functions

const getMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    // console.log(response)
    console.log(data)   // object of movies
    showMovies(data)
}
// Initial call
getMovies(POPULAR_API);

const showMovies = (data) => {
    movieBox.innerHTML = ''   // Clear movies from the page when searching

    // data is an object, results is property in the object
    data.results.forEach(result => {          // array.prototype.forEach
        console.log(result)     // Multiple objects are created for each item

        //  Display Image (Ternary Operator)
        const imagePath = result.poster_path === null ? 'edited.png' : IMGPATH + result.poster_path;

        // Approx Rating
        const imdb = result.vote_average;
        const aprx_rating = imdb.toPrecision(2);

        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = ` 
        <img src='${imagePath}'>
        <div class='overlay'>
            <div class='title'>
                <span>${result.original_title}</span>
                <span id='rating'>${aprx_rating}</span>
            </div>
            <h3>Overview:</h3>
            <p> ${result.overview}</p>
        </div>  `;
        movieBox.appendChild(box);
    });
}

document.querySelector('#search').addEventListener('keyup', (kbevent) => {
    // console.log(kbevent.target.value)

    // Search movies
    if (kbevent.target.value != '') getMovies(SEARCH_API + kbevent.target.value);

    // Default popular movies
    else getMovies(POPULAR_API);
})
