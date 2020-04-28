require('dotenv').config();

//setup express
const app = require('express')()
const path = require('path')
require('./setup/express.js')(app, __dirname);

app.get('/', (req, res) => {
  res.redirect('/azienda')
})

app.get('/fa-solid.woff2', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/fa-solid.woff2'))
})

const fotoNums = {
  stufe: [21, 35, 6, 14, 25, 29, 28, 2, 27],
  piastrelle: [18, 24, 4, 31, 13, 34, 3, 23, 5, 32, 1, 7, 12, 33, 10, 22, 19, 9, 8, 17, 0],
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
