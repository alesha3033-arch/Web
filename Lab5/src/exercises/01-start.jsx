import React from 'react';

function Exercise01() {
  let age = 12;
  let name = "John";
  
  let output = <span>{name} is <strong>{age}</strong> years old</span>;
  
  return <div id="myDiv">{output}</div>;
}

export default Exercise01;
