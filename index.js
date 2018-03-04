const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const PORT = process.env.PORT || 5000;
const Storage = require('@google-cloud/storage');


express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.sendFile('index.html'))
  .use(favicon(path.join(__dirname,'public','images','favicon.ico')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
