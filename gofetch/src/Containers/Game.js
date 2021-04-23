import React, {useState, useEffect} from 'react'
import Hand from '../Components/Hand'

export default function Game(props) {

    const [whosTurn, setWhosTurn] = useState('player1')
    const [lastPlayer, setLastPlayer] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [playersSelectedPile, setPlayersSelectedPile] = useState('')
    const [playersSelectedCard, setPlayersSelectedCard] = useState('') 
    const [player1Cards, setPlayer1Cards] = useState('')
    const [player2Cards, setPlayer2Cards] = useState('')
    const [player3Cards, setPlayer3Cards] = useState('')
    const [player4Cards, setPlayer4Cards] = useState('')
    const [updateHands, setUpdateHands] = useState(false)
    

    const nextPlayersTurn = () => {
        let currentPlayerIndex = props.piles
            .findIndex((pileName) => whosTurn === pileName )

        let newIndex = currentPlayerIndex === 3 ?
            currentPlayerIndex = 0 : 
            currentPlayerIndex + 1
        const nextPlayer = props.piles[newIndex]
        
        setLastPlayer(whosTurn)
        setWhosTurn(nextPlayer)
    }

    const displayHands = () => {
        return props.piles.map(hand => {
            switch(hand){
                case 'player1':
                    return <Hand 
                        deckID={props.game.deck_id}
                        key={hand}
                        player={hand}
                        yourTurn={whosTurn === hand ? true : false}
                        cards={player1Cards}
                        getCardsFromPile={getCardsFromPile}
                        pickCard={pickCard}/>
                case 'player2':
                    return <Hand 
                        deckID={props.game.deck_id}
                        key={hand}
                        player={hand}
                        yourTurn={whosTurn === hand ? true : false}
                        cards={player2Cards}
                        getCardsFromPile={getCardsFromPile}
                        pickCard={pickCard}/>
                case 'player3':
                    return <Hand 
                        deckID={props.game.deck_id}
                        key={hand}
                        player={hand}
                        yourTurn={whosTurn === hand ? true : false}
                        cards={player3Cards}
                        getCardsFromPile={getCardsFromPile}
                        pickCard={pickCard}/>
                case 'player4':
                    return <Hand 
                        deckID={props.game.deck_id}
                        key={hand}
                        player={hand}
                        yourTurn={whosTurn === hand ? true : false}
                        cards={player4Cards}
                        getCardsFromPile={getCardsFromPile}
                        pickCard={pickCard}/>
                default:
                    console.log('sorry no hands to display')
            } 
            return null;
        })
    }

   
    const pickCard = (pile, card) => {
        if(pile === 'player1' && whosTurn === 'player1'){
            setPlayersSelectedCard(card)
        } else if(pile !== 'player1' && whosTurn === 'player1'){
            setPlayersSelectedPile(pile)
        } else {
            console.log('not your turn!')
        }
    }

    const setPlayersHands = () => {
        if(props.game.deck_id){
            props.piles.map(hand => {
                getCardsFromPile(props.game.deck_id, hand)
                    .then(cards => {
                        switch(hand){
                            case 'player1':
                                setPlayer1Cards(cards)
                                break;
                            case 'player2':
                                setPlayer2Cards(cards)
                                break;
                            case 'player3':
                                setPlayer3Cards(cards)
                                break;
                            case 'player4':
                                setPlayer4Cards(cards)
                                break;
                            default:
                                console.log('sorry theres no cards to set')
                                break;
                        }
                    })
            })
        }

        
    }

    const convertValueToNumeric = (card) => {
        let cardValue 
        switch(card){
            case 'JACK':
                cardValue = 11
                break;
            case 'QUEEN':
                cardValue = 12
                break;
            case 'KING':
                cardValue = 13
                break;
            case 'ACE':
                cardValue = 14
                break;
            default:
                cardValue = card
                break;
        }
        cardValue = parseInt(cardValue)
        return cardValue
    }

    

    const getCardsFromPile = async (deckID, player) => {
        let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${player}/list/`)
        response = await response.json()
        const playerCards = response.piles[player].cards
        return(playerCards)
    }

    const drawFromDeck = async (deckID) => {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        const cardObject = await response.json()
        const card = cardObject.cards[0]
        if(cardObject.remaining != 0){
            return card
        } else {
            setGameOver(!gameOver)
        }
        
        console.log('card from deck', card)
        
    }
    

    const findMatches = (cardValue, pile) => {
        getCardsFromPile(props.game.deck_id, pile)
            .then(cardsArray => {
                const matchingCards = cardsArray
                    .filter(card => card.value === cardValue)
                    .map(card => card.code)
                    .join(',')
                if(matchingCards){
                    moveCards(matchingCards,lastPlayer)
                } else {
                    console.log('drawing from deck')
                    drawFromDeck(props.game.deck_id)
                        .then(card =>{
                            if(card){moveCards(card.code,lastPlayer)}
                        })
                }
            })
    }

    const moveCards = (cards, recievingPlayer) => {
        console.log(`https://deckofcardsapi.com/api/deck/${props.game.deck_id}/pile/player1/list/`)
        fetch(`https://deckofcardsapi.com/api/deck/${props.game.deck_id}/pile/${recievingPlayer}/add/?cards=${cards}`)
            .then(setUpdateHands(true))
    }
    
    const sortCards = () => {

    }

    const doAiTurn = (aiPlayer) => {
        
        getCardsFromPile(props.game.deck_id, aiPlayer)
            .then(cards => {
                let pileChosen = Math.floor(Math.random()*4)
                let cardChosen = cards[Math.floor(Math.random()*cards.length)]
                let index = props.piles.findIndex((pileName) => (whosTurn === pileName))
                console.log('card', cardChosen.code, 'index', index, 'pileChosen', pileChosen)
                if(pileChosen !== index){
                    console.log('card chosen',cardChosen.code,'ai player', aiPlayer)
                    moveCards(cardChosen.code, aiPlayer)
                }
                
            })
            .then(nextPlayersTurn())
    }

    useEffect(()=> {
        console.log('turn changed', whosTurn)
        if(playersSelectedPile && playersSelectedCard){

            findMatches(playersSelectedCard, playersSelectedPile)
            setPlayersSelectedCard('')
            setPlayersSelectedPile('')
        }
        
        setPlayersHands()
        
        if(whosTurn !== 'player1'){
            doAiTurn(whosTurn)
        }


        if(updateHands){
            setUpdateHands(false)
        }
    }, [whosTurn, updateHands])

   
    
    

    return (
        <div className="game">
            <h1>Current Player : {whosTurn}</h1>
            <button onClick={() => nextPlayersTurn()}>ToggleTurn</button>
            <button onClick={() => sortCards(player1Cards)}>sort</button>
            {displayHands()}
            
        </div>
    )
}
