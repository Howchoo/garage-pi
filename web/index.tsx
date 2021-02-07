import React from 'react';
import GarageContainer from './containers/GarageContainer';

const MAX_DOOR_INDEX = 1;

export default class App extends React.Component {
  render() {
    let garageContainers = (
      <GarageContainer />
    );
    return garageContainers;
  }
}
