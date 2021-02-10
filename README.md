# garage-pi

Control your garage doors using a web application running on your Raspberry Pi.

## Setup
Forked from howchoo and adapted to suit LiftMaster 1060's simple capabilities (toggle door, toggle light). Original setup instructions [on howchoo here](https://howchoo.com/g/yznmzmuxywu/how-to-control-your-garage-door-from-your-phone-using-a-raspberry-pi).

## Local testing
npm install 
npm run restart

## raspberry pi deployment
Join home network on pi with a static IP
Clone repository to pi
npm install
npm run restart
    If this fails due to architecture differences, run npm rebuild --force, then retry
