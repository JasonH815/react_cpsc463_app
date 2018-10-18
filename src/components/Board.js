import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
render()  {
  const {playerCard , opponentCard} = this.props;
  console.log(playerCard);
  return(
    <div className="Board">
      <Card card={playerCard}/>
      <Card card={opponentCard}/>
    </div>
  );}
}

export default Board;
