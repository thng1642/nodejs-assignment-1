const file = require('../utils/readFile')
const path = require('path')

module.exports = class Movie {

    /**
     *  Model get trending movies
     * @param {number} page a page contain 20 movies,this is option,
     * if It's value = null, page default = 1
     * @returns movies trending for param page
     */
    static getTrending( page ) {
        const p = path.join(__dirname, '../data', 'movieList.json')
        let results = JSON.parse(file(p))
        const total_pages = Math.ceil(results.length / 20)
        const start = 20 * (page - 1)
        const end = start + 20        
        // console.log("Data from file", JSON.parse(movies))
        // ==> Filter trending movies for 'popularity' properties, with 20 movies/page
        results.sort(( a, b) => {
            return b.popularity - a.popularity
        })
        // ==> Filter programs
        results = results.filter( item => item.media_type === "movie")
        // console.log(results.at(0))
        // for(let i = 0; i < 20; i++) {

        //     console.log(`Top ${i + 1} trending:`, results.at(i));
        // }

        return {
            "results": results.slice( start, end ),
            "total_pages": total_pages,
            "page": page
        }
    }

    /**
     * Model gets top rate movies, which follower page param
     * @param {number} page  a page contain 20 movies,this is option,
     * if It's value = null, page default = 1
     * @returns movies trending for param page
     */
    static getTopRate( page ) {
        const p = path.join(__dirname, '../data', 'movieList.json')
        let results = JSON.parse(file(p))
        const total_pages = Math.ceil(results.length / 20)
        const start = 20 * (page - 1)
        const end = start + 20        
        // console.log("Data from file", JSON.parse(movies))
        // ==> Filter top rate movies for 'vote_average' properties, with 20 movies/page
        results.sort(( a, b) => {
            return b.vote_average - a.vote_average
        })

        // ==> Filter programs
        results = results.filter( item => item.media_type === "movie")
        // console.log(results.at(0))
        // for(let i = 0; i < 20; i++) {

        //     console.log(`Top ${i + 1}:`, results.at(i));
        // }

        return {
            "results": results.slice( start, end ),
            "total_pages": total_pages,
            "page": page
        }
    }

    /**
     * Get movie by 'genre_ids'-an array
     * @param {number} id genre id get from request param
     * @param {number} page a page contain 20 movies,this is option,
     * if It's value = null, page default = 1
     * @returns movies along to genre
     */
    static getMoviesClassification( id, page ) {
        const p = path.join(__dirname, '../data', 'movieList.json')
        const listMovies = JSON.parse(file(p))
        let result = listMovies.filter( item =>  item.genre_ids.includes(id) && item.media_type === 'movie')
        // result = result.filter( item)
        const total_pages = Math.ceil(result.length / 20)
        const start = 20 * (page - 1)
        const end = start + 20

        return {
            "results": result.slice( start, end ),
            "page": page,
            "total_pages": total_pages,
        }
    }


    /**
     * Get trailer of movie, which newest version.
     * @param {number} filmId Movie id to get video trailer 
     * @returns information video
     */
    static getTrailerMovie( filmId ) {

        const p = path.join(__dirname, '../data', 'videoList.json')
        const data = JSON.parse(file(p))
        let videos = []
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item.id === filmId) {
                // console.log(item.videos)
                videos = [...item.videos]
                break
            }
        }
        // console.log("Videos: ", videos.length)
        // ==> Conditions:
        // -> official = true
        videos = [...videos.filter( item => item.official === true)]
        
        // -> site = YouTube
        videos = [...videos.filter( item => item.site === 'YouTube')]
        // console.log("Videos: ", videos.length)
        // -> Trailer or Teaser (ưu tiên Trailer)
        let tmpTrailers = [...videos.filter( item => item.type === 'Trailer')]
        if (tmpTrailers.length === 0) {

            videos = [...videos.filter( item => item.type === 'Teaser')]
        } else {
            videos = [...tmpTrailers]
        }
        // -> If Result of list videos, then selects video has 'published_at' earliest
        videos.sort( (a, b) => new Date(a.published_at) - new Date(b.published_at) )

        return videos
    }
    
    /**
     * Searching movies
     * @param {string} keyword input user
     * @param {number} page default is 1
     * @returns results finding
     */
    static searchingMovie( keyword, page, genre, media, language, year ) {
        const p = path.join(__dirname, '../data', 'movieList.json')
        const data = JSON.parse(file(p))
        let results = []
        const n = data.length
        let total_pages = 0
        const start = 5 * (page - 1)
        const end = start + 5

        for (let i = 0; i < n; i++) {
            const item = data.at(i)
            const titleMovie = item.title || item.name
            if ( titleMovie.toLowerCase().includes(keyword.toLowerCase()) ) {
                results.push(item)
            }
        }
        
        
        // ==> Filter searching
        // --> Genre 
        if ( genre !== '') {
            console.log("Genre: ", genre)
            results = results.filter( item => item.genre_ids.includes(genre))
        }
        // --> Media type
        if ( media !== '' ) {
        
            console.log("Media: ", media)
            results = results.filter( item => item.media_type === media)
        }
        // --> Language
        if ( language !== '' ) {      
            console.log("Language: ", language)
            results = results.filter( item => item.original_language === language )
        }
        // --> Year
        if ( year !== '') {
            console.log("Year: ", year)

            results = results.filter( item => {
                let releaseYear = item.release_date.split('-').at(0)
                return year === releaseYear
            })
        }
        total_pages = Math.ceil(results.length / 5)
        
        return {
            "results": results.slice( start, end ),
            "page": page,
            "total_pages": total_pages,
        }
    }
    
    /**
     * Get all genre movies
     * @returns list Genre object
     */
    static getAllGenre() {
        const p = path.join(__dirname, '../data', 'genreList.json')
        const genreList = JSON.parse(file(p))
        return genreList
    }

    /**
     * Get all media type
     */
    static getAllMedia() {
        const p = path.join(__dirname, '../data', 'mediaTypeList.json')
        const mediaType = JSON.parse(file(p))
        return mediaType
    }
}