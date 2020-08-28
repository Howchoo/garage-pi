import React, { Component } from 'react'
import axios from 'axios'

import GarageState from '../components/GarageState'
import GarageDoorButton from '../components/GarageDoorButton'
import GarageLightButton from '../components/GarageLightButton'

class GarageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { garageState: '' };

    this.updateStatus = this.updateStatus.bind(this);
    this.sendDoor = this.sendDoor.bind(this);
    this.sendLight = this.sendLight.bind(this);
    this.getGarageDoorStatus = this.getGarageDoorStatus.bind(this);
    this.getGarageLightStatus = this.getGarageLightStatus.bind(this);
  }

  componentDidMount() {
    this.updateStatus();
  }

  updateStatus() {
    axios.get('/status')
      .then(res => {
        this.setState({ garageState: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendDoor() {
    axios.get('/door')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendLight() {
    axios.get('/light')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  getGarageDoorStatus() {
    let { garageState } = this.state;
    console.log("get door state");
    if (!garageState || !garageState.door) {
      return 'UNKNOWN';
    }

    if (garageState.door === 'open') {
      return 'OPEN';
    } else if (garageState.door === 'closed') {
      return 'CLOSED';
    } else {
      return 'UNKNOWN';
    }
  }

  getGarageLightStatus() {
    let { garageState } = this.state;
    console.log("get light state");
    if (!garageState || !garageState.light) {
      return 'UNKNOWN';
    }

    if (garageState.light === 'on') {
      return 'ON';
    } else if (garageState.door === 'off') {
      return 'OFF';
    } else {
      return 'UNKNOWN';
    }
  }


  render() {
    let { garageState } = this.state;

    return (
      <div>
        <GarageDoorButton
          buttonText={'toggle door'}
          sendDoor={this.sendDoor} />
        <GarageLightButton
          buttonText={'toggle light'}
          sendLight={this.sendLight} />
        <GarageState getGarageDoorStatus={this.getGarageDoorStatus} getGarageLightStatus={this.getGarageLightStatus} />
      </div>
    )
  }
}

export default GarageContainer
