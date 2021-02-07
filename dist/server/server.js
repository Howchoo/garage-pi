/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server/server.ts":
/*!**************************!*\
  !*** ./server/server.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nvar rpio = require('rpio');\r\nvar express = require('express');\r\nvar app = express();\r\nvar PORT = 8080;\r\n// default: 13/22-close, 19/21-open, 11/23-relay, 12/24-light\r\nvar openPins = [\r\n    parseInt(process.env.OPEN_PIN_1) || 19,\r\n    parseInt(process.env.OPEN_PIN_2) || 21\r\n];\r\nvar closePins = [\r\n    parseInt(process.env.CLOSE_PIN_1) || 13,\r\n    parseInt(process.env.CLOSE_PIN_2) || 22\r\n];\r\nvar doorPins = [\r\n    parseInt(process.env.DOOR_PIN_1) || 11,\r\n    parseInt(process.env.DOOR_PIN_2) || 23\r\n];\r\nvar lightPins = [\r\n    parseInt(process.env.LIGHT_PIN_1) || 12,\r\n    parseInt(process.env.LIGHT_PIN_2) || 24\r\n];\r\nconsole.log(doorPins);\r\nrpio.open(openPins[0], rpio.INPUT, rpio.PULL_UP);\r\nrpio.open(closePins[0], rpio.INPUT, rpio.PULL_UP);\r\nrpio.open(doorPins[0], rpio.OUTPUT, rpio.LOW);\r\nrpio.open(lightPins[0], rpio.OUTPUT, rpio.LOW);\r\nrpio.open(openPins[1], rpio.INPUT, rpio.PULL_UP);\r\nrpio.open(closePins[1], rpio.INPUT, rpio.PULL_UP);\r\nrpio.open(doorPins[1], rpio.OUTPUT, rpio.LOW);\r\nrpio.open(lightPins[1], rpio.OUTPUT, rpio.LOW);\r\nfunction getState(doorId) {\r\n    if (doorId === void 0) { doorId = 0; }\r\n    var lightPinStatus = rpio.read(lightPins[doorId]);\r\n    var lightStatus = 'unknown';\r\n    if (lightPinStatus == rpio.HIGH) {\r\n        lightStatus = 'on';\r\n    }\r\n    else if (lightPinStatus == rpio.LOW) {\r\n        lightStatus = 'off';\r\n    }\r\n    return {\r\n        door: {\r\n            open: !rpio.read(openPins[doorId]),\r\n            close: !rpio.read(closePins[doorId])\r\n        },\r\n        light: lightStatus\r\n    };\r\n}\r\napp.get('/', function (req, res) {\r\n    res.render('index.ejs');\r\n});\r\napp.get('/status/:doorId', function (req, res) {\r\n    var doorId = parseInt(req.params[\"doorId\"]) || 0;\r\n    res.send(JSON.stringify(getState(doorId)));\r\n});\r\napp.post('/door/:doorId', function (req, res) {\r\n    // Simulate a button press\r\n    var doorId = parseInt(req.params[\"doorId\"]) || 0;\r\n    rpio.write(doorPins[doorId], rpio.HIGH);\r\n    console.log(\"door signal on\");\r\n    setTimeout(function () {\r\n        rpio.write(doorPins[doorId], rpio.LOW);\r\n        console.log(\"door signal off\");\r\n        res.send('done');\r\n    }, 500);\r\n});\r\napp.post('/light', function (req, res) {\r\n    // Simulate a button press\r\n    var doorId = parseInt(req.params[\"doorId\"]) || 0;\r\n    var lightStatus = rpio.read(lightPins[doorId]);\r\n    if (lightStatus == rpio.HIGH) {\r\n        console.log(\"light on\");\r\n        rpio.write(lightPins[doorId], rpio.LOW);\r\n    }\r\n    else {\r\n        console.log(\"light off\");\r\n        rpio.write(lightPins[doorId], rpio.HIGH);\r\n    }\r\n    res.send('done');\r\n});\r\napp.listen(PORT);\r\napp.use('/dist', express.static('dist'));\r\nconsole.log('Running on http://localhost:' + PORT);\r\n\n\n//# sourceURL=webpack://garage_pi/./server/server.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./server/server.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;