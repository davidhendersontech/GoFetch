import React, {useState, useEffect} from 'react'
import Hand from '../Components/Hand'

export default function Game(props) {

    const [whosTurn, setWhosTurn] = useState('player1')
    
    
    const nextPlayersTurn = () => {
        let currentPlayerIndex = props.piles
            .findIndex((pileName) => whosTurn === pileName )

        let newIndex = currentPlayerIndex === 3 ?
            currentPlayerIndex = 0 : 
            currentPlayerIndex + 1
        const nextPlayer = props.piles[newIndex]
        setWhosTurn(nextPlayer)
    }

    const displayHands = () => {
        return props.piles.map(hand => {
            return <Hand 
                deckID={props.game.deck_id}
                key={hand}
                player={hand}
                yourTurn={whosTurn === hand ? true : false}
            />
        })
    }

    const pickPile = () => {
        
    }

    

    return (
        <div className="game">
            {displayHands()}
            <button onClick={() => nextPlayersTurn()}>ToggleTurn</button>
        </div>
    )
}
