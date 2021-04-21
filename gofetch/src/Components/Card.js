import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <h3>{props.card.code}</h3>
      <img src={props.card.image} />
    </div>
  );
}
