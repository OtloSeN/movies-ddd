const Movie = require('../../domain/movie/movie');

async function addMovie(body) {
    let movie;
    try {
        const { title, releaseYear, format, stars } = body;

        const movieModel = new Movie({
                title,
                releaseYear,
                format,
                stars
            });

        movie = await movieModel.save();
    } catch (error) {
        console.log(error);
    }
    return movie;
}

module.exports = addMovie;