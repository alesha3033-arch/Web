import React from 'react';

function Exercise06() {
  const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];
  
  const mappingFunction = (item, index) => {
    return <li key={index} className="list-group-item">{item}</li>;
  };
  
  const htmlList = planets.map(mappingFunction);
  
  return <ul className="list-group m-5">{htmlList}</ul>;
}

export default Exercise06;
