import React from 'react';
import { DoorConfig } from './models/DoorConfig';
import GarageContainer from './containers/GarageContainer';

const doorConfig: DoorConfig[] = [
  {
    doorId: 0,
    name: "LEFT"
  },
  {
    doorId: 1,
    name: "RIGHT"
  }
];

export default class App extends React.Component {
  render() {
    let garageContainers = (
      <div className="garageContainers">
        <GarageContainer doorInfo={doorConfig[0]} doorCount={doorConfig.length} />
        <GarageContainer doorInfo={doorConfig[1]} doorCount={doorConfig.length} />
      </div>
    );
    return garageContainers;
  }
}
