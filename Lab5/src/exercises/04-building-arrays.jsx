import React from 'react';

function Exercise04() {
  const navlinkItems = [
    <li key="1" className="nav-item">
      <a className="nav-link" href="#">Link to google.com</a>
    </li>,
    <li key="2" className="nav-item">
      <a className="nav-link" href="#">Link to facebook.com</a>
    </li>,
    <li key="3" className="nav-item">
      <a className="nav-link" href="#">Link to amazon.com</a>
    </li>
  ];
  
  const content = <ul className="nav">{navlinkItems}</ul>;
  
  return content;
}

export default Exercise04;
