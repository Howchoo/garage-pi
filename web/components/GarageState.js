import React from 'react';

const GarageState = (props) => {
  let { getGarageDoorStatus, getGarageLightStatus } = props;

  return (
    <div className="state">
      <p><span>The garage door is: </span>{getGarageDoorStatus()}</p>
      <p><span>The garage light is: </span>{getGarageLightStatus()}</p>
    </div>
  )
};

export default GarageState
