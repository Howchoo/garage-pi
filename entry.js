import React from 'react'
import ReactDOM from 'react-dom'
import App from './web'

import './sass/main.scss'

// Entry point to the app. Written this way for easy extendability.
ReactDOM.render(
  <App />
  , document.getElementById('garage')
);
