import React from "react";


export default function Card(props) {
  return (
    <div className="card" onClick={()=>props.pickCard(props.pile, props.code)}>
      
      <h3>{props.code}</h3>
      <img src={props.pile==='player1' ? props.image: 'https://i.imgur.com/DhaVE0M.jpg' } />
    </div>
  );

}
