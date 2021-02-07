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
    console.log(this.state.garageState.doorOpen);
    if (!this.state.garageState) {
      return 'UNKNOWN';
    }

    if (this.state.garageState.doorOpen === true) {
      return 'OPEN';
    } else if (this.state.garageState.doorOpen === false) {
      return 'CLOSED';
    } else {
      return 'UNKNOWN';
    }
  }

  getGarageLightStatus() {
    console.log("get light state");
    console.log(this.state.garageState.lightOn);
    if (!this.state.garageState) {
      return 'UNKNOWN';
    }
    if (this.state.garageState.lightOn === true) {
      return 'ON';
    } else if (this.state.garageState.lightOn === false) {
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
