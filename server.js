'use strict';

const express = require('express');
const gpio = require('pi-gpio');

const PORT = 80;

const app = express();
app.get('/', function(req, res) {
  // res.send('Hello, testing\n');
  res.render('index.ejs', {title: 'hello visitor'})
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
