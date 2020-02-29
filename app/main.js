require('dotenv').config();

//setup express
const app = require('express')()
const path = require('path')
require('./setup/express.js')(app, __dirname);

app.get('/', (req, res) => {
  res.render('home/index.ejs')
})

app.get('/fa-solid.woff2', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/fa-solid.woff2'))
})

const fotoDesc = require('./setup/fotoDesc.json').map((desc, i) => ({...desc, i}))
fotoDesc.for
const fotoNums = {
  stufe: [2, 6, 14, 21, 25],
  bagno: [3, 7, 10, 11, 12, 15, 16, 17, 18, 19, 20, 22],
  entrate: [4, 5, 24, 23],
  all: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
}

app.get('/galleria/:filter', (req, res) => {
  const filter = Object.keys(fotoNums).includes(req.params.filter) ? req.params.filter : 'all'
  res.render('galleria/index.ejs', {cards: fotoNums[filter].map(num => fotoDesc[num]), filter})
})

app.get('/galleria', (req, res) => {
  res.render('galleria/index.ejs', {cards: fotoNums.all.map(num => fotoDesc[num]), filter: 'all'})
});

['ditta', 'locazione', 'servizi'].forEach(dir => {
  app.get(`/${dir}`, (req, res) => {
    res.render(`${dir}/index.ejs`)
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
