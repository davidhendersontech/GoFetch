import React from "react";

export default function Card({image, code, value, pile, pickCard }) {

    return (
        <div className='card' onClick={() => pickCard(pile,code)}  >
                {code}
            {/* <img src={props.pile === 'player1'? props.card.image : 'https://opengameart.org/sites/default/files/card%20back%20red.png'} width="50" height="75" alt={props.card.code} />  */}
        </div>
    )
}
