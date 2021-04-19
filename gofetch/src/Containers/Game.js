import React from 'react'
import Hand from '../Components/Hand'

export default function Game(props) {

  const displayCards = () => {
    let pilesArray = [];
    if(props.game){
      for(let pile in props.game.piles){
        pilesArray.push(pile)
      }
      return pilesArray.map(pile => {
       return <Hand pile={pile} key={pile} deckID={props.game.deck_id}/>
      })
    } 
  }

  return (
    <div>
      {displayCards()}
    </div>
  )
}
