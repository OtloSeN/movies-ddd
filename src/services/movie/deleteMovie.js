const Movie = require('../../domain/movie/movie');

async function deleteMovie(id) {
    let movie;
    try {
        movie = await Movie.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    return movie;
}

module.exports = deleteMovie;