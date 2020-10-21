const history = require('connect-history-api-fallback')
const express = require('express')
const path = require('path')

const app = express()
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'))

app.use(history())
app.use(staticFileMiddleware)

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, function (){
  console.log('Express serving on 8080')
})