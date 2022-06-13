const APIKEY = 'c0fed79a4fc82bb2c225ec2d212c335c';

const APIURL = `https://api.themoviedb.org/3/movie/popular?api_key=c0fed79a4fc82bb2c225ec2d212c335c&language=en-US&page=1`;
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=c0fed79a4fc82bb2c225ec2d212c335c&page=1&query=`;

const IMAGEPATH = `https://image.tmdb.org/t/p/w500`;

const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

const loader = document.querySelector('.loader');


const getMovies = async (url) => {
    loader.style.display = 'block';
    const resp = await (await fetch(url)).json();
    loader.style.display = 'none';
    showMovies(resp.results);
} 

getMovies(APIURL);

form.addEventListener('submit',event => {
    event.preventDefault();

    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
})

const showMovies = (movies) => {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `<img src="${IMAGEPATH + poster_path}" alt="${title}" />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h4>Overview : </h4>
            ${overview}
        </div>
        `;
        main.appendChild(movieEl);
    })
}

const getClassByRate = (vote) => {
    if(vote >= 8) {
        return 'green';
    } else if(vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}