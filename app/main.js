require('dotenv').config();

//setup express
const app = require('express')()
const path = require('path')
require('./setup/express.js')(app, __dirname);

app.get('/', (req, res) => {
  res.render(`azienda/index.ejs`, {dir: 'azienda'})
})

app.get('/fa-solid.woff2', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/fa-solid.woff2'))
})

/*
  https://compressimage.toolur.com/

  C, 80%, Normal, W: 600 H: 0
*/

const fotoNums = {
  // stufe: [21, 35, 6, 14, 25, 29, 28, 2, 27, 37],
  stufe: [21, 29, 37, 35, 14, 6, 25, 28, 2, 27],
  piastrelle: [18, 24, 4, 42, 13, 1, 3, 23, 5, 32, 34, 7, 12, 39, 41, 22, 19, 40, 33, 9, 10, 44, 45, 31, 8, 17, 0],
  resina: [16, 26, 20, 11, 15]
}

app.get('/galleria/:filter', (req, res) => {
  const filter = Object.keys(fotoNums).includes(req.params.filter) ? req.params.filter : 'tutto'
  res.render('galleria/index.ejs', {cards: fotoNums[filter], filter, dir: 'galleria'})
})

app.get('/galleria', (req, res) => {
  res.render('galleria/index.ejs', {cards: fotoNums.piastrelle, filter: 'piastrelle', dir: 'galleria'})
});

app.get('/fotos/:filter', (req, res) => {
  const filter = Object.keys(fotoNums).includes(req.params.filter) ? req.params.filter : 'tutto'
  res.render('fotos/index.ejs', {cards: fotoNums[filter], filter, dir: 'fotos'})
})

app.get('/fotos', (req, res) => {
  res.render('fotos/index.ejs', {cards: fotoNums.piastrelle, filter: 'piastrelle', dir: 'fotos'})
});

['azienda', 'firma', 'contatti', 'kontakt', 'servizi', 'angebot', 'concessionarie', 'partner'].forEach(dir => {
  app.get(`/${dir}`, (req, res) => {
    res.render(`${dir}/index.ejs`, {dir})
  })
})

//connect the error page to all remaining requests (404)
app.get('*', (req, res) => {
  if (!res._header) {
    res.redirect('/')
  }
})

//connect Server to localhost
const server = app.listen(process.env.PORT || 1234, () => {
  console.log(`200: Server online on: http://localhost:${server.address().port} !!`);
})
