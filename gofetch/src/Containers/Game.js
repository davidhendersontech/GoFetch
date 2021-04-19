import React, { Component } from "react";

class Game extends Component {
  componentDidMount() {
    const drawURL = `https://deckofcardsapi.com/api/deck/${this.props.deckID}/draw/?count=7`;
    fetch(drawURL).then((response) => response.json());
  }
  render() {
    return <div></div>;
  }
}

export default Game;
