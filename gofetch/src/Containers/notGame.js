import React,{useState, useEffect} from 'react'
import Hand from '../Components/Hand'
export default function Game(props) {


    const [yourTurn, setYourTurn] = useState(true)
    const [selectedCard, setSelectedCard] = useState('')
    const [selectedPile, setSelectedPile] = useState('')
    const [cardsToMove, setCardsToMove] = useState('')
    const [currentlyMatching, setCurrentlyMatching] = useState(false)

    const handleClick = () => {
        if(yourTurn){
            setYourTurn(!yourTurn)
            setCurrentlyMatching(!currentlyMatching)
        } else {
            setYourTurn(!yourTurn)
        }
    }
    const displayCards = () => {
        let pilesArray = [];
        if(props.game){
          for(let pile in props.game.piles){
            pilesArray.push(pile)
          }
          
          return pilesArray.map(pile => {
            let cards = []
            getCardsFromPile(props.game.deck_id,pile)
              .then(cardsReturn => cards = cardsReturn)
            return <Hand 
              pile={pile} 
              key={pile} 
              deckID={props.game.deck_id} 
              pickCard={pickCard}
              getCardsFromPile={getCardsFromPile}
            />
          })
        } 
      }

    const displayHands = () => {
      if(props.game){
        for(let pile in props.game.piles){
          getCardsFromPile(props.game.deck_id,pile)
          .then(cards => console.log(pile,cards))
        }
      }
     
    }

    const pickCard = (card,pile) => {
        if(pile === 'player1' && yourTurn){
          setSelectedCard(card)
        } else if (pile !== 'player1' && yourTurn){
          setSelectedPile(pile)
        } else {
          console.log("It's not your turn!")
        }
    }

    const getCardsFromPile = async (deckID,pile) => {
        const pileURL = `https://deckofcardsapi.com/api/deck/${deckID}/pile/${pile}/list/`
        let res = await fetch(pileURL)
        res = await res.json()
        return res.piles[pile].cards
    }
    const getCardsFromPileAlt = (deckID,pile) => {
      
      const pileURL = `https://deckofcardsapi.com/api/deck/${deckID}/pile/${pile}/list/`
      fetch(pileURL)
        .then(res => res.json())
        .then(res => res.piles[pile].cards)
        .then(console.log)
    }

    const getMatchesInPile = async (card,pile)=> {
     
      
      getCardsFromPile(props.game.deck_id, pile)
      .then(cardsInHand => {
        let cardWithoutSuit = card.substring(0,1)
        const matchingCards = cardsInHand
          .filter(card => card.code.substring(0,1)  === cardWithoutSuit)
          .map(card => card.code)
          .join(',')
        setCardsToMove(matchingCards)
        console.log('inside',cardsToMove,'matching',matchingCards)
      })
      
    }


    useEffect(() => {
      if(yourTurn){
        console.log('pick a card and a player')
      } else {
        if(selectedPile && selectedCard){
          getMatchesInPile(selectedCard,selectedPile)
          .then(()=>{
            
          })
          
        } else {
          console.log('please choose a card and a player')
        }
      }
      setSelectedPile('')
      setSelectedCard('')

    }, [yourTurn])


    return (
        <div>
            {getCardsFromPileAlt(props.game.deck_id,'player1')}
            {displayCards()}
            <button onClick={()=>handleClick()}>{yourTurn ? "End your turn" : "Start your turn"}</button>
        </div>
    )
}