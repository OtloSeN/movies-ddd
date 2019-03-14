const path = require('path');
const fs = require('fs');

const MovieCases = require('../../../services/movie');

const parseMovies = require('../utils/parserMovies');
const getQueries = require('../utils/getQueries');
const validateMovie = require('../utils/validateMovie');

module.exports = {
    getAll,
    getById,
    getPostForm,
    post,
    postMany,
    deleteById
}

async function getAll(req, res) {    
    const { sort, search } = getQueries(req.query);

    const movies = await MovieCases.getAllMovies(sort, search);    
    
    res.render('pages/index', { movies, queries: req.query });
}


async function getById(req, res) {
    const id = req.params.id;
    const movie = await MovieCases.getMovieById(id);
    
    if(!movie) return res.status(404).send('NOT FOUND');

    res.render('pages/single', { movie });
}


function getPostForm(req, res) {
    res.render('pages/create');
}

async function post(req, res) {
    const { error } = validateMovie(req.body);

    if (error) return res.send(error);

    const movie = await MovieCases.addMovie(req.body);

    res.send(movie);
}

async function postMany(req, res) {
    if(!req.file) return res.status(400).render('pages/create', { error: 'Choose a file.' });

    const extname = path.extname(req.file.originalname);
    const _path = path.resolve(`uploads/${req.file.filename}`);

    if(extname !== '.txt') {
        fs.unlink(_path, err => {
            if (err) throw err;
        });
        return res.status(400).render('pages/create', { error: 'Only text documents are allowed' });
    }

    fs.readFile(_path, 'utf-8', async (err, data) => {
        if (err) throw err;

        const movies = parseMovies(data);

        await MovieCases.addMovies(movies);
        
        res.redirect('/');
    });
}

async function deleteById(req, res) {
    const id = req.params.id;

    const deletedMovie = await MovieCases.deleteMovie(id);

    res.send(deletedMovie);
}
