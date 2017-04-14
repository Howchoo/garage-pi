import React, { Component } from 'react'
import axios from 'axios'

import GarageState from '../components/GarageState'
import GarageButton from '../components/GarageButton'

class GarageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { garageState: '' };

    this.updateStatus = this.updateStatus.bind(this);
    this.sendRelay = this.sendRelay.bind(this);
    this.getGarageStatus = this.getGarageStatus.bind(this);
  }

  componentDidMount() {
    // this.updateStatus();
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

  sendRelay() {
    axios.get('/relay')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  getGarageStatus() {
    let { garageState } = this.state;

    if (!garageState) {
      return '';
    }

    if (garageState.open) {
      return 'Open';
    } else if (garageState.close) {
      return 'Closed';
    } else {
      return 'Partially open';
    }
  }

  render() {
    let { garageState } = this.state;

    return (
      <div>
        <GarageState getGarageStatus={this.getGarageStatus} />
        <GarageButton
          buttonText={garageState.open ? 'Close' : 'Open'}
          sendRelay={this.sendRelay} />
      </div>
    )
  }
}

export default GarageContainer