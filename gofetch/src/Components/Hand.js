import React, { Component } from 'react'
import Card from './Card'


export default class Hand extends Component {
    
    state = {
        cards: []
    }

    componentDidMount(){
        const pileURL = `https://deckofcardsapi.com/api/deck/${this.props.deckID}/pile/${this.props.pile}/list/`
        fetch(pileURL)
        .then(res => res.json())
        .then(res => {
            this.setState({
                cards: res.piles[this.props.pile].cards
            })
        }) 
    }

    displayCards() {
        return this.state.cards.map(card => {
            return <Card card={card} />
        })
        
    }

    render() {
        return (
            <div>
                <h1>{this.props.pile}</h1>
                {this.displayCards()}
            </div>
        )
    }
}

