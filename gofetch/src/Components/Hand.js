import React, {useState, useEffect} from 'react'
import Card from './Card'



export default function Hand(props) {

    const [selectedCard, setSelectedCard] = useState('')
    const [selectedPile, setSelectedPile] = useState('')
    const [currentlyPicking, setCurrentlyPicking] = useState(true)
    const [cardsInHand, setCardsInHand] = useState([])

    const getCardsFromPile = async (deckID, player) => {
        let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${player}/list/`)
        response = await response.json()
        let playerCards = response.piles[player].cards
        return(playerCards)
    }

    const displayCards = () => {
        if(cardsInHand.length === 0){
            getCardsFromPile(props.deckID, props.player)
                .then(cards => setCardsInHand(cards))
        } 
       
        return cardsInHand.map(card => {     
            return <Card 
                key={card.code} 
                image={card.image} 
                code={card.code}
                value={card.value}
                pickCard={pickCard}
                pile={props.player}
            />
        })
    }
    
    const pickCard = (pile, card) => {
        if(pile === 'player1' && currentlyPicking){
            setSelectedCard(card)
            console.log(selectedCard)
        } else if(pile !== 'player1' && currentlyPicking){
            setSelectedPile(pile)
            console.log(pile)
        } else {
            console.log('not your turn!')
        }
    }

    return (
        <div className='hand'>
            <h1>{props.player}</h1>
            {displayCards()}
        </div>
    )
}
