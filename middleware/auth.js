const file = require('../utils/readFile')
const path = require('path')

function authenticationUser( req, res, next ) {

    // const auth = req.body.auth
    const userId = req.query.userId
    const token = req.query.token
    
    // auth === undefined
    if ( userId === undefined && token === undefined ) {
        res.status(401).send("Unauthorized")
    } else {

        const p = path.join(__dirname, '../data', 'userToken.json')
        const data = JSON.parse(file(p))
        // console.log("tokes", data)
        // console.log("Authentication: ", auth)
        next()
    }
}
module.exports = authenticationUser