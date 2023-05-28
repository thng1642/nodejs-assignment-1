const movieModel = require('../models/Movie')

class MovieController {

    /**
     * [GET] /api/movies/trending
     */
    getTrendingMovie( req, res ) {

        let param = req.query.page
        // console.log("Param: ", param)
        if ( param === undefined ) {
            param = 1
        }
        const result = movieModel.getTrending( param )
        res.status(200).json(result)
    }

    /**
     * [GET]  /api/movies/top-rate
     */
    getTopRateMovie( req, res ) {
        // console.log("Top rate api")
        let param = req.query.page
        // console.log("Param: ", param)
        if ( param === undefined ) {
            param = 1
        }
        const result = movieModel.getTopRate( param )
        res.status(200).json(result)
    }
    /**
     * [GET] /api/movies/discover
     */
    getDiscoverMovies( req, res ) {
        
        let page = parseInt(req.query.page)
        if ( page === undefined ) {
            page = 1
        }
        
        // console.log("Genre: ",  genre)
        
        // ==> Checking: Have genre param in request ?
        if ( req.query.genre === undefined ) {
            res.status(400).send('Not found gerne parram')
            return
        }
        // ==> END

        let genre = parseInt(req.query.genre)
        // ==> Checking: genre id existed yet ?
        const genreList = movieModel.getAllGenre()
        const genreObj = genreList.filter( item => item.id === genre ).at(0)

        if (genreObj === undefined) {
            res.status(400).send('Not found that genre id')
            return
        }
        // ==> END

        const result = movieModel.getMoviesClassification( genre, page )
        result.genre_name = genreObj.name
        res.json(result)
    }

    /**
     * [POST] /api/movies/video
     */
    getTrailerMovies( req, res ) {
        
        const filmId = req.body.film_id
        // Checking: Have file_id in body request
        if ( filmId === undefined ) {
            res.status(400).send("Not found film_id param")
        } else {
            const result = movieModel.getTrailerMovie(filmId)
            if ( result.length === 0 ) {
                res.status(400).send("Not found video")
            } else {
                
                res.json(result.at(0))
            }
        }
        // console.log(typeof filmId)
    }

    /**
     * [POST] /api/movies/search
     * */   
    searchingMovies( req, res ) {
        const keyword = req.body.keyword
        // console.log("keyword: ", keyword)
        if (keyword === undefined) {
            res.status(400).send("Not found keyword parram")
        } else {
            const genre = req.body.genre
            const media = req.body.media
            const language = req.body.language
            const year = req.body.year
            res.json(movieModel.searchingMovie( keyword, 1, genre, media, language, year))
        }
    }

    /**
     * [GET] /api/movies/genres
     */
    getAllGenres( req, res ) {
        res.json(movieModel.getAllGenre())
    }

    /**
     * [GET] /api/movies/media-type
     */
    getAllMediaType( req, res ) {
        res.json(movieModel.getAllMedia())
    }
}

module.exports = new MovieController