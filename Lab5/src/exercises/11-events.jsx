import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  const handleClick = () => {
    console.log('I was clicked!');
  };
  
  return (
    <div className="alert alert-warning" role="alert" onClick={handleClick}>
      {props.text} (Click me!)
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string
};

function Exercise11() {
  return (
    <div>
      <Alert text="Click this alert and check the console" />
    </div>
  );
}

export default Exercise11;
