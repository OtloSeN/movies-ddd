const router = require('express').Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const movieController = require('./movie/movieController');

router.get('/', movieController.getAll);

router.get('/add', movieController.getPostForm);

router.get('/movies/:id', movieController.getById);

router.post('/add', movieController.post);

router.post('/addMovies', upload.single('moviefile'), movieController.postMany);

router.delete('/delete/:id', movieController.deleteById);

module.exports = router;