import React from 'react';

const GarageLightButton = (props) => {
  let { sendLight, buttonText } = props;

  return (
    <button onClick={() => sendLight()}>{buttonText}</button>
  )
};

export default GarageLightButton
