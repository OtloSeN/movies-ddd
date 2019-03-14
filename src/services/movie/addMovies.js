const Movie = require('../../domain/movie/movie');

async function addMovies(movieList) {
    let movies;
    try {
        movies = await Movie.insertMany(movieList);
    } catch (error) {
        console.log(error);
    }
    return movies;
}

module.exports = addMovies;