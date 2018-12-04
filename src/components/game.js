import React, { Component } from 'react';
import Card from './card';
//import GameButton from './game-button';
import Board from './board';
import GameService from '../services/game';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      opponent: null,
      game: null,
      playerDeck: null,
      opponentDeck: null
    };
  }

  // TODO deck has a currentCard index
  // TODO implement next card method on backend
  // TODO add unit test w/ mocha
  // TODO call selenium from node
  // TODO add unit test using selenium


  render() {
    const playerCard = {rank : '9', suit : 'spade'};
    const opponentCard = {rank : 'a', suit : 'heart'};

    return (
      <div>
        <div className="Opponent">
          <Card fileName="cardBack_green4.png"/>
        </div>

        <Board playerCard={playerCard} opponentCard={opponentCard} />

        <div className="Player" onClick={GameService.createGame.bind(this)}>
          <Card fileName="cardBack_blue4.png"/>
        </div>

      </div>
    );
  }
}

export default Game;
