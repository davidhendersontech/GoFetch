import React,{useState, useEffect} from 'react'
import Hand from '../Components/Hand'
export default function Game(props) {


    const [yourTurn, setYourTurn] = useState(true)
    const [selectedCard, setSelectedCard] = useState('')
    const [selectedPile, setSelectedPile] = useState('')
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


    useEffect(() => {
      if(yourTurn && !currentlyMatching){ // your picking phase
        setSelectedCard('')
        setSelectedPile('')
      } else if(yourTurn && currentlyMatching){ // your matching phase
        //matching code here
      } else if(!yourTurn && !currentlyMatching){ // ai's picking phase

      } else if(!yourTurn && currentlyMatching){ // ai's matching phase

      }



    }, [yourTurn])


    return (
        <div>
            {displayCards()}
            <button onClick={()=>handleClick()}>{yourTurn ? "End your turn" : "Start your turn"}</button>
        </div>
    )
}