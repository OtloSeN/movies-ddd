const Movie = require('../../domain/movie/movie');

async function getAllMovies(sort, search) {
    let movies;
    try {
        movies = await Movie.find(search)
            .collation({ locale: 'en', caseFirst: 'upper' })
            .sort(sort);
    } catch (error) {
        console.log(error);
    }
    return movies;
}

module.exports = getAllMovies;