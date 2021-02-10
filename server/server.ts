import { Request, Response } from 'express'

const rpio = __non_webpack_require__('rpio');
const express = __non_webpack_require__('express');

const app = express();
const PORT = 8080;

let doorOpen: boolean[] = [false, false];

// default: 13/18-close, 31/32-open, 
//open and close pins are reserved for safety mechanisms which are currently unsupported
const openPins: number[] = [
  parseInt(process.env.OPEN_PIN_1) || 31,
  parseInt(process.env.OPEN_PIN_2) || 32
];
const closePins = [
  parseInt(process.env.CLOSE_PIN_1) || 13,
  parseInt(process.env.CLOSE_PIN_2) || 18
];

// default: 11/15-relay, 12/16-light
const doorPins = [
  parseInt(process.env.DOOR_PIN_1) || 11,
  parseInt(process.env.DOOR_PIN_2) || 15
];
const lightPins = [
  parseInt(process.env.LIGHT_PIN_1) || 12,
  parseInt(process.env.LIGHT_PIN_2) || 16
];

rpio.open(openPins[0], rpio.INPUT, rpio.PULL_UP);
rpio.open(closePins[0], rpio.INPUT, rpio.PULL_UP);
rpio.open(doorPins[0], rpio.OUTPUT, rpio.LOW);
rpio.open(lightPins[0], rpio.OUTPUT, rpio.LOW);
rpio.open(openPins[1], rpio.INPUT, rpio.PULL_UP);
rpio.open(closePins[1], rpio.INPUT, rpio.PULL_UP);
rpio.open(doorPins[1], rpio.OUTPUT, rpio.LOW);
rpio.open(lightPins[1], rpio.OUTPUT, rpio.LOW);

function getState(doorId: number = 0) {
  let lightPinStatus = rpio.read(lightPins[doorId]);
  let lightStatus = undefined;
  if (lightPinStatus == rpio.HIGH) {
    lightStatus = true;
  } else if (lightPinStatus == rpio.LOW) {
    lightStatus = false;
  }

  const newState = {
    doorOpen: doorOpen[doorId],
    lightOn: lightStatus
  }
  console.log(newState);
  return newState;
}

app.get('/', (req: Request, res: Response) => {
  res.render('index.ejs');
});

app.get('/status/:doorId', (req: Request, res: Response) => {
  console.log(req.params.doorId);
  const doorId: number = parseInt(req.params["doorId"]) || 0;
  res.send(JSON.stringify(getState(doorId)));
});

app.post('/door/:doorId', (req: Request, res: Response) => {
  // Simulate a button press
  const doorId: number = parseInt(req.params["doorId"]) || 0;
  rpio.write(doorPins[doorId], rpio.HIGH);
  console.log(`door signal on for ${doorId}`);
  setTimeout(() => {
    rpio.write(doorPins[doorId], rpio.LOW);
    console.log(`door signal off for ${doorId}`);
    doorOpen[doorId] = !doorOpen[doorId];
    res.send('done');
  }, 500);
});

app.post('/light/:doorId', (req: Request, res: Response) => {
  // Simulate a button press
  const doorId: number = parseInt(req.params["doorId"]) || 0;
  let lightStatus = rpio.read(lightPins[doorId]);
  if (lightStatus == rpio.HIGH) {
    console.log(`light on for ${doorId}`);
    rpio.write(lightPins[doorId], rpio.LOW);
  } else {
    console.log(`light off for ${doorId}`);
    rpio.write(lightPins[doorId], rpio.HIGH);
  }
  res.send('done');
});


app.listen(PORT);
app.use('/dist/web', express.static('dist/web'))
console.log('Running on http://localhost:' + PORT);
