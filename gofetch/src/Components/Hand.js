    import React, { Component } from 'react'
import Card from './Card'


export default class Hand extends Component {
    
    state = {
        cards: [],
    }

    componentDidMount(){
        this.props.getCardsFromPile(this.props.deckID,this.props.pile)
        .then(e => this.setState({
            cards: e
        }))
    }

    

    displayCards() {
        
        return this.state.cards.map(card => {
            return <Card card={card} pickCard={this.props.pickCard} key={card.code} pile={this.props.pile}/>
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

