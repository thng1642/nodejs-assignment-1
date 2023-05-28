const movie = require('./movie')
/**
 * Setup routes for web-app
 * @param {Express} app 
 */
function route(app) {

    app.use('/api/movies', movie)

    app.use((req, res, next) => {
        res.status(404).send(
            "<h1>Page not found on the server</h1>")
    })
}

module.exports = route