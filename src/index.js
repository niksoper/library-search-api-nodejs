const express = require('express')
const app = express()
const librarySearch = require('./stub-search')

app.set('port', process.env.PORT || 5000)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

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

app.listen(app.get('port'), () => {
  console.log('Library search API is running on port', app.get('port'));
})