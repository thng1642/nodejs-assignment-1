const express = require('express')
const router = express.Router()
const movieController = require('../controllers/MovieController')
const authFunc = require('../middleware/auth')

router.use('/trending' ,authFunc)
router.get('/trending', movieController.getTrendingMovie)

router.use('/top-rate' ,authFunc)
router.get('/top-rate', movieController.getTopRateMovie)

router.use('/discover' ,authFunc)
router.get('/discover', movieController.getDiscoverMovies)

router.use('/video' ,authFunc)
router.post('/video', movieController.getTrailerMovies)

router.use('/search' ,authFunc)
router.post('/search', movieController.searchingMovies)

router.use('/genres', authFunc)
router.get('/genres', movieController.getAllGenres)

router.use('/media-type', authFunc)
router.get('/media-type', movieController.getAllMediaType)

module.exports = router