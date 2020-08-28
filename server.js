'use strict';

const express = require('express');
const rpio = require('rpio');

const app = express();
const PORT = 8080;

// default: 13-close, 19-open, 11-relay
const openPin = process.env.OPEN_PIN || 19;
const closePin = process.env.CLOSE_PIN || 13;
const doorPin = process.env.DOOR_PIN || 11;
const lightPin = process.env.LIGHT_PIN || 12;

rpio.open(openPin, rpio.INPUT, rpio.PULL_UP);
rpio.open(closePin, rpio.INPUT, rpio.PULL_UP);
rpio.open(doorPin, rpio.OUTPUT, rpio.LOW);
rpio.open(lightPin, rpio.OUTPUT, rpio.LOW);


function getState() {
  var lightPinStatus = rpio.read(lightPin);
  var lightStatus = 'unknown'
  if (lightPinStatus == rpio.HIGH) {
    lightStatus = 'on'
  } else if (lightPinStatus == rpio.LOW) {
    lightStatus = 'off'
  }

  return {
    door: {
      open: !rpio.read(openPin),
      close: !rpio.read(closePin)
    },
    light: lightStatus
  }
}

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/status', function(req, res) {
  res.send(JSON.stringify(getState()));
});

app.get('/door', function(req, res) {
  // Simulate a button press
  rpio.write(doorPin, rpio.HIGH);
  console.log("door signal on");
  setTimeout(function() {
    rpio.write(doorPin, rpio.LOW);
    console.log("door signal off");    
    res.send('done');
  }, 500);
});

app.get('/light', function(req, res) {
  // Simulate a button press
  var lightStatus = rpio.read(lightPin);
  if (lightStatus == rpio.HIGH) {
    console.log("light on");
    rpio.write(lightPin, rpio.LOW);
  } else {
    console.log("light off");
    rpio.write(lightPin, rpio.HIGH);
  }
  res.send('done');
});


app.listen(PORT);
app.use('/assets', express.static('assets'))
console.log('Running on http://localhost:' + PORT);
