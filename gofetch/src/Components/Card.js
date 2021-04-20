import React from 'react'

export default function Card(props) {

    return (
        <div className='card' onClick={() => props.pickCard(props.card.code,props.pile)} >
            
            <img src={props.pile === 'player1'? props.card.image : 'https://opengameart.org/sites/default/files/card%20back%20red.png'} width="50" height="75" alt={props.card.code} /> 
        </div>
    )
}
