const express = require('express')
const cors = require('cors')
const route = require('./routes')
const app = express()

app.use(cors())
/**
 * Reading data in body request with content-type properties is url-encoded
 */
app.use(express.urlencoded({
    extended:true
}))
/**
 * parse requests with content-type application/json
 */
app.use(express.json())
app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})
route(app)

app.listen(5000)