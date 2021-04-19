import "./App.css";
import Game from "./Containers/Game";
import React, { Component } from "react";
const gameURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=0";

class App extends Component {
  componentDidMount() {
    fetch(gameURL)
      .then((response) => response.json())
      .then((deck) => {
        this.setState({ deckID: deck.deck_id });
      });
  }

  state = {
    deckID: [],
  };

  render() {
    return (
      <div>
        <Game deckID={this.state.deckID} />
      </div>
    );
  }
}
export default App;
