import React from "react";


export default function Card(props) {
  return (
    <div className="card">
      <h3>{props.code}</h3>
      <img src={props.image} />
    </div>
  );

}
