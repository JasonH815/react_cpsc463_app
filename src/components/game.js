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

  // TODO hook add new game/reset buttons
  // TODO hook up decks/cards to game board
  // TODO hook up nextCard button
  // TODO display the winning high-card
  // TODO add unit test w/ mocha
  // TODO call selenium from node
  // TODO add unit test using selenium


  /**
   * Conditionally renders the game board
   * @param playerCard
   * @param opponentCard
   * @return {*}
   */
  static renderBoard(playerCard, opponentCard) {
    if(playerCard && opponentCard) {
      return <Board playerCard={playerCard} opponentCard={opponentCard} />
    } else {
      return <p>Start a new game to start playing!</p>
    }
  }


  render() {
    const playerCard = null;
    const opponentCard = null;
    // const playerCard = {rank : '9', suit : 'spade'};
    // const opponentCard = {rank : 'a', suit : 'heart'};

    return (
      <div>
        <div className="container-fluid justify-content-end d-flex flex-column" style={{height: '100vh'}}>
          <div className="row justify-content-center">
            <div className="col-1">
              <div className="Opponent">
                <Card fileName="cardBack_green4.png"/>
              </div>
            </div>
          </div>
          <div className="mt-auto row justify-content-center">
            <div className="col-6 text-center">
              {Game.renderBoard(playerCard, opponentCard)}
            </div>
          </div>
          <div className="row mt-auto justify-content-center mb-lg-5">
            <div className="col-1">
              <div className="Player" onClick={GameService.createGame.bind(this)}>
                <Card fileName="cardBack_blue4.png"/>
              </div>
            </div>
          </div>
          <div className="row fixed-bottom bg-dark">
            <div className="col pl-5">
              <button type="button" className="btn btn-danger">Reset</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
