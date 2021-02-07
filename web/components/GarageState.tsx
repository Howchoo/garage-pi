import React = require('react')

const GarageState = (props) => {
  let { getGarageDoorStatus, getGarageLightStatus } = props;

  return (
    <div className="state">
      <p><span>door: </span>{getGarageDoorStatus()}</p>
      <p><span>light: </span>{getGarageLightStatus()}</p>
    </div>
  )
};

export default GarageState
