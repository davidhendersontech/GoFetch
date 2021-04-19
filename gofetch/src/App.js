import "./App.css";
import Game from "./Containers/Game";
import React, { Component } from "react";
const gameURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=0";

class App extends Component {
  componentDidMount() {
    this.makePiles()
  }

  async makePiles() {
        let res = await fetch(gameURL);         //create new deck
        let deck = await res.json()
        let deckID = deck.deck_id
        const deckURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=7`
        let pile = {}
        for(let i=1; i <= 4; i++){                    //put seven cards into 4 piles
          let drawnCardsRes = await fetch(deckURL)    
          let drawnCards = await drawnCardsRes.json()  
          let playerNumber = `player${i}`             
          let pileURL = `https://deckofcardsapi.com/api/deck/${deckID}/pile/${playerNumber}/add/?cards=`
          let cards = ''
          
          for(let card of drawnCards.cards) {
            cards = card.code +','+ cards  
          }
          let pileRes = await fetch(pileURL + cards)
          pile = await pileRes.json() 
        }
        this.setState({  //put piles into game state
          game: pile
        })
  }


  state = {
    game: {},
  };

   render() {
    return (
      <div>
        <Game 
          game={this.state.game}
        />
      </div>
    );
  }
}
export default App;
