import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import GameButton from './components/GameButton';
import Board from './components/Board';
class App extends Component {

  render() {
    const playerCard = {rank : "8", suit : "club"};
    const opponentCard = {rank : "a", suit : "heart"};

    return (
      <div>
        <div className="Opponent">
          <Card fileName="/cardBack_green1.png"/>
        </div>

        <Board playerCard={playerCard} opponentCard={opponentCard} />

        <div className="Player">
          <Card fileName="/cardBack_blue1.png"/>
        </div>
      </div>

    //<GameButton/>
    );
  }
}

export default App;
