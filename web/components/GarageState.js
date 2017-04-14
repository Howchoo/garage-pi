import React from 'react';

const GarageState = (props) => {
  let { getGarageStatus } = props;

  return (
    <div className="state">
      <span>The garage door is</span>
      <p>{getGarageStatus()}</p>
    </div>
  )
};

export default GarageState
