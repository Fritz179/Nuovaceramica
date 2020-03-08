const path = require('path')
const express = require('express')

module.exports = (app, dirname) => {
  app.set('view engine', 'ejs')
  app.set('views', [path.join(dirname, 'home'), path.join(dirname, 'template')])

  app.use('/libraries', express.static(path.join(dirname, 'template/libraries')))
  app.use('/fonts', express.static(path.join(dirname, 'template/fonts')))

  app.use(express.static(path.join(dirname, 'home')))
  app.use(express.static(path.join(dirname, 'favicon')))

  app.get('/favicon.ico', (req, res) => res.sendFile(path.join(dirname, 'template/favicon.png')))
  app.get('/robots.txt', (req, res) => res.sendFile(path.join(dirname, 'template/robots.txt')))

  console.log('200: Express setup run succesfully!');
}
