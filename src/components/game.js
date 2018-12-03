import React, { Component } from 'react';
import Card from './card';
//import GameButton from './game-button';
import Board from './board';
import axios from 'axios';
import Promise from 'bluebird';

function getData(response) {
  return response.data;
}

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

  createGame() {
    //create 2 players
    Promise.all([
      axios.post('http://jasonhellwig.me:3030/players').then(getData),
      axios.post('http://jasonhellwig.me:3030/players').then(getData)
    ])
      .then(([player,opponent]) => {
        this.setState({player, opponent});
        console.log('player = ', player);
        console.log('opponent = ', opponent);
      })
    //assign the players to a game
      .then(() => {
        return axios.post('http://jasonhellwig.me:3030/games', {
          playerId: this.state.player._id,
          opponentId: this.state.opponent._id,
        }).then(getData);
      })
      .then(game => {
        console.log('game = ', game);
        this.setState({game});
        //create decks for each player given gameId and playerIds
        const deckRequests = [
          axios.post('http://jasonhellwig.me:3030/decks', {
            playerId : this.state.player._id,
            gameId : this.state.game._id,
            count: 1,
            shuffle : true
          }).then(getData),
          axios.post('http://jasonhellwig.me:3030/decks', {
            playerId : this.state.opponent._id,
            gameId : this.state.game._id,
            count: 1,
            shuffle : true
          }).then(getData)
        ];
        return Promise.all(deckRequests);
      })
      .then(([playerDeck, opponentDeck]) => {
        this.setState({playerDeck, opponentDeck});
        console.log('deck ', playerDeck);
      });
  }
  resetGame() {
    axios.delete(`http://jasonhellwig.me:3030/games/${this.state.game._id}`);
    this.createGame();
  }

  drawCard() {

  }


  render() {
    const playerCard = {rank : '9', suit : 'spade'};
    const opponentCard = {rank : 'a', suit : 'heart'};

    return (
      <div>
        <div className="Opponent">
          <Card fileName="cardBack_green4.png"/>
        </div>

        <Board playerCard={playerCard} opponentCard={opponentCard} />

        <div className="Player" onClick={this.createGame.bind(this)}>
          <Card fileName="cardBack_blue4.png"/>
        </div>

      </div>
    );
  }
}

export default Game;
