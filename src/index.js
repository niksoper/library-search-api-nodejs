const express = require('express')
const http = require('http')
const app = express()
const librarySearch = require('library-search')

app.route('/available-books')
  .get(function(req, res, next) {
    if (!req.query.title) {
      res.status(400).json({ message: 'A title must be provided in the query string.' })
    }
  
    const titleDecoded = decodeURIComponent(req.query.title)
    librarySearch(titleDecoded)
      .then(results => res.json(results))
      .catch(error => {
        res.status(500).json({ error })
      })
  })
    
const port = 8080

console.log(`Listening on port ${port}...`)

http.createServer(app).listen(port)