'use strict';

const express = require('express');
const rpio = require('rpio');

const app = express();
const PORT = 80;

// default: 13-close, 19-open, 11-relay
const openPin = process.env.OPEN_PIN || 19;
const closePin = process.env.CLOSE_PIN || 13;
const relayPin = process.env.RELAY_PIN || 11;

rpio.open(openPin, rpio.INPUT, rpio.PULL_UP);
rpio.open(closePin, rpio.INPUT, rpio.PULL_UP);
rpio.open(relayPin, rpio.OUTPUT, rpio.HIGH);


function getState() {
  return {
    open: !rpio.read(openPin),
    close: !rpio.read(closePin)
  }
}
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/status', function(req, res) {
  res.send(JSON.stringify(getState()));
});

app.get('/relay', function(req, res) {
  // Simulate a button press
  rpio.write(relayPin, rpio.LOW);
  setTimeout(function() {
    rpio.write(relayPin, rpio.HIGH);
    res.send('done');
  }, 1000);
});


app.listen(PORT);
app.use('/assets', express.static('assets'))
console.log('Running on http://localhost:' + PORT);
