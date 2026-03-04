import React from 'react';

function Exercise05() {
  const animals = ['Horse', 'Turtle', 'Elephant', 'Monkey'];
  
  const animalsInHTML = animals.map((animal, index) => (
    <li key={index}>{animal}</li>
  ));
  
  return <ul>{animalsInHTML}</ul>;
}

export default Exercise05;
