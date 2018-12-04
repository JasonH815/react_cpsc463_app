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
      gameStarted: false
    };
  }

  // TODO game board formatting
  // TODO display the winning high-card
  // TODO hook up nextCard button
  // TODO add unit test w/ mocha
  // TODO call selenium from node
  // TODO add unit test using selenium


  /**
   * Conditionally renders the game board
   * @param playerCard
   * @param opponentCard
   * @return {*}
   */
  renderBoard() {
    console.log('state: ', this.state);
    if(this.state.gameStarted) {
      const playerCard = this.state.player.deck.currentCard;
      const opponentCard = this.state.opponent.deck.currentCard;
      return <Board playerCard={playerCard} opponentCard={opponentCard} />
    } else {
      return <p>Start a new game to start playing!</p>
    }
  }

  /**
   * Button and Handler for starting and resetting games
   * @return {*}
   */
  renderStartOrRestButton() {
      async function handleClick(){
        const {player, opponent, game} = await GameService.resetGame(this.state.game);
        this.setState({
          gameStarted: true,
          player,
          opponent,
          game
        })
      }

      if(!this.state.gameStarted) {
        return <button type="button" className="btn btn-success" onClick={handleClick.bind(this)}>Start Game</button>
      } else {
        return <button type="button" className="btn btn-warning" onClick={handleClick.bind(this)}>Reset</button>
      }
  }

  render() {
    return (
      <div>
        <div className="container-fluid justify-content-end d-flex flex-column" style={{height: '93vh'}}>
          <div className="pt-3 row justify-content-center">
            <div className="col-1">
              <div className="Opponent">
                <Card fileName="cardBack_green4.png"/>
              </div>
            </div>
          </div>
          <div className="mt-auto row justify-content-center">
            <div className="col-6 text-center">
              {this.renderBoard()}
            </div>
          </div>
          <div className="row mt-auto justify-content-center mb-2">
            <div className="col-1">
              <div className="Player">
                <Card fileName="cardBack_blue4.png"/>
              </div>
            </div>
          </div>
          <div className="row fixed-bottom bg-dark">
            <div className="col pl-4 p-2">
              {this.renderStartOrRestButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
