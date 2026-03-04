import React from 'react';

function Exercise10() {
  const mySuperStyles = {
    color: "white",
    fontSize: "16px",
    border: "1px solid yellow",
    backgroundColor: "black",
    padding: "10px"
  };
  
  const badgeStyles = {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "5px 10px",
    borderRadius: "50%",
    border: "2px solid #dc3545",
    display: "inline-block",
    fontSize: "14px"
  };
  
  return (
    <div>
      <div style={mySuperStyles}>I am an alert</div>
      <br />
      <span style={badgeStyles}>Badge</span>
    </div>
  );
}

export default Exercise10;
