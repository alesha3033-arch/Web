import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  if (props.show === false) {
    return null;
  }
  
  const colorClasses = {
    'red': 'alert-danger',
    'yellow': 'alert-warning',
    'green': 'alert-success'
  };
  
  return (
    <div className={`alert ${colorClasses[props.color]}`} role="alert">
      {props.text}
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
  color: PropTypes.string
};

function Exercise09() {
  return (
    <div>
      <Alert text="OMG! Something really bad has happended!" show={true} color="red" />
      <Alert text="Well, it is not that bad after all!" show={true} color="yellow" />
      <Alert text="I am supposed to be green" show={true} color="green" />
      <Alert text="This alert is hidden" show={false} color="red" />
    </div>
  );
}

export default Exercise09;
