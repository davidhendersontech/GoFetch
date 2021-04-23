import "./App.css";
import Loading from './Components/Loading'
import Game from './Containers/Game'
import React, { Component } from "react";
// import Background from "./Components/Background";
const gameURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=0";
class App extends Component {
  componentDidMount() {
    
    this.makePiles()
      .then(res => this.setState({game: res}))
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
        return pile
        
  }
  
    
  state = {
    game: null,
    piles: [
      'player1',
      'player2',
      'player3',
      'player4'
    ]
  };

  render() {
    return (

      <div className="app">
        <h1>♤ ♧ Go Fetch! ♥︎ ♦︎</h1>
        {this.state.game ? <Game game={this.state.game} piles={this.state.piles} /> : <></>}
        

      </div>
    );
  }
}
export default App;