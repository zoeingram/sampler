const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use(favicon(path.join(__dirname,'public','images','favicon.ico')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
