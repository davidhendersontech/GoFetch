import React from 'react'
import Card from './Card'



export default function Hand(props) {
   
    const displayCards = () => {
        if(props.cards){
            return props.cards.map(card => {
                return <Card 
                    key={card.code}
                    image={card.image}
                    code={card.code}
                    value={card.value}
                    pile={props.player}
                    pickCard={props.pickCard}
                />
            })
        }
    }
        
    return (
        <div className='hand' >
            <h1>{props.player}</h1>
            {displayCards()}
        </div>
    )
}
