import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Game from './components/Game';
class App extends Component {

  render() {
    return (
      <Game />
    );
  }
}

export default App;
