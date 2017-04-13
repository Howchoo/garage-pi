'use strict';

const express = require('express');
const rpio = require('rpio');

const app = express();
const PORT = 80;

rpio.open(19, rpio.INPUT, rpio.PULL_UP);
rpio.open(13, rpio.INPUT, rpio.PULL_UP);
rpio.open(11, rpio.OUTPUT, rpio.HIGH);


function getState() {
  // 13-close, 19-open
  return {
    open: !rpio.read(19),
    close: !rpio.read(13)
  }
}
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/status', function(req, res) {
  console.log('/status', getState());
  res.send(JSON.stringify(getState()));
});

app.get('/relay', function(req, res) {
  // Simulate a button press
  rpio.write(11, rpio.LOW);
  setTimeout(function() {
    rpio.write(11, rpio.HIGH);
    res.send('done');
  }, 1000);
});


app.listen(PORT);
app.use('/assets', express.static('assets'))
console.log('Running on http://localhost:' + PORT);
