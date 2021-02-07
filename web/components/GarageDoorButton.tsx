import React = require('react')

const GarageDoorButton = (props) => {
  let { sendDoor, buttonText } = props;

  return (
    <button onClick={() => sendDoor()}>{buttonText}</button>
  )
};

export default GarageDoorButton
