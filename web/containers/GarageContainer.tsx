import React from 'react';

import axios from 'axios'

import DoorInfo from '../components/DoorInfo'
import GarageState from '../components/GarageState'
import GarageDoorButton from '../components/GarageDoorButton'
import GarageLightButton from '../components/GarageLightButton'

class GarageContainer<DoorConfig> extends React.Component {
  public props: DoorConfig;
  public state: any;

  constructor(props) {
    super(props);
    this.props = props;
    console.log(props);

    this.state = { garageState: {}, doorId: props.doorInfo.doorId, doorName: props.doorInfo.name };

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
    axios.get(`/status/${this.state.doorId}`)
      .then(res => {
        this.setState({ garageState: res.data, doorId: this.state.doorId, doorName: this.state.doorName });
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendDoor() {
    axios.post(`/door/${this.state.doorId}`)
      .then(res => {
        console.log(res);
        this.updateStatus();
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendLight() {
    axios.post(`/light/${this.state.doorId}`)
      .then(res => {
        console.log(res);
        this.updateStatus();
      })
      .catch(err => {
        console.log(err);
      })
  }

  getGarageDoorStatus() {
    console.log("get door state");
    if (!this.state.garageState || !this.state.garageState.door) {
      return 'UNKNOWN';
    }

    if (this.state.garageState.door.open) {
      return 'OPEN';
    } else if (this.state.garageState.door.closed) {
      return 'CLOSED';
    } else {
      return 'UNKNOWN';
    }
  }

  getGarageLightStatus() {
    console.log("get light state");
    if (!this.state.garageState || !this.state.garageState.light) {
      return 'UNKNOWN';
    }

    if (this.state.garageState.light === 'on') {
      return 'ON';
    } else if (this.state.garageState.light === 'off') {
      return 'OFF';
    } else {
      return 'UNKNOWN';
    }
  }


  render() {
    return (
      <div className="garageContainer">
        <DoorInfo doorInfo={this.props} />
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
