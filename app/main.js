require('dotenv').config();

//setup express
const app = require('express')()
const path = require('path')
require('./setup/express.js')(app, __dirname);

app.get('/', (req, res) => {
  res.render('home/index.ejs', {dir: 'home'})
})

app.get('/fa-solid.woff2', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/fa-solid.woff2'))
})

const fotoNums = {
  stufe: [21, 6, 14, 25, 29, 28, 2, 27],
  bagno: [19, 7, 10, 11, 12, 15, 16, 17, 18, 22, 20, 3],
  piastrelle: [18, 24, 3, 4, 23, 5, 13, 1, 7, 6, 12, 21, 10, 22, 25, 19, 9, 8, 17, 0],
  resina: [16, 26, 20, 11, 15],
  tutto: [18, 24, 3, 4, 23, 5, 13, 1, 7, 6, 12, 21, 28, 29, 14, 10, 22, 25, 19, 9, 8, 17, 0, 2, 11, 15, 16, 20, 26, 27]
}

app.get('/galleria/:filter', (req, res) => {
  const filter = Object.keys(fotoNums).includes(req.params.filter) ? req.params.filter : 'tutto'
  res.render('galleria/index.ejs', {cards: fotoNums[filter], filter, dir: 'galleria'})
})

app.get('/galleria', (req, res) => {
  res.render('galleria/index.ejs', {cards: fotoNums.tutto, filter: 'tutto', dir: 'galleria'})
});

app.get('/galerie/:filter', (req, res) => {
  const filter = Object.keys(fotoNums).includes(req.params.filter) ? req.params.filter : 'tutto'
  res.render('galerie/index.ejs', {cards: fotoNums[filter], filter, dir: 'galerie'})
})

app.get('/galerie', (req, res) => {
  res.render('galerie/index.ejs', {cards: fotoNums.tutto, filter: 'tutto', dir: 'galerie'})
});

['de', 'azienda', 'firma', 'azienda_old', 'contatti', 'kontakte', 'servizi', 'dienstleistungen', 'concessionarie', 'hauser'].forEach(dir => {
  app.get(`/${dir}`, (req, res) => {
    res.render(`${dir}/index.ejs`, {dir})
  })
})

//connect the error page to all remaining requests (404)
app.get('*', (req, res) => {
  if (!res._header) {
    res.render('404')
  }
})

//connect Server to localhost
const server = app.listen(process.env.PORT || 1234, () => {
  console.log(`200: Server online on: http://localhost:${server.address().port} !!`);
})
