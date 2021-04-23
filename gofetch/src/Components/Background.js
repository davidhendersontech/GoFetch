import React from "react";

const Background = () => {
  const one = "--i: 1";
  const two = "--i: 2";
  const three = "--i: 3";

  return (
    <div>
      <div className="glowing">
        <div style={{ one }}></div>
        <div style={{ two }}></div>
        <div style={{ three }}></div>
      </div>
      <div className="glowing">
        <div style={{ one }}></div>
        <div style={{ two }}></div>
        <div style={{ three }}></div>
      </div>
      <div className="glowing">
        <div style={{ one }}></div>
        <div style={{ two }}></div>
        <div style={{ three }}></div>
      </div>
      <div className="glowing">
        <div style={{ one }}></div>
        <div style={{ two }}></div>
        <div style={{ three }}></div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Background;
