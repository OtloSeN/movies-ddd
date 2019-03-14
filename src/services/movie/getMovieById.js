const Movie = require('../../domain/movie/movie');

async function getMovieById(id) {
    let movie;
    try {
        movie = await Movie.findById(id);
    } catch (error) {
        console.log(error);
    }
    return movie;
}

module.exports = getMovieById;