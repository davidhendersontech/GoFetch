import React from 'react'

export default function Card(props) {
    return (
        <div>
            {props.card.code}
            <img src={props.card.image} width="50" height="75" />
        </div>
    )
}
