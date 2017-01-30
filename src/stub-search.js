module.exports = function stubSearh(title) {
  const results = goodTitle(title) ? [{
    url: 'http://www.goodreads.com',
    availability: [{
      library: 'Bristol',
      status: 'On Shelf'
    }, {
      library: 'Bath',
      status: 'On Shelf'
    }]
  }] : []

  return Promise.resolve(results)
}

function goodTitle(title) {
  return title.length && title.match(/^[a-m]/i)
}