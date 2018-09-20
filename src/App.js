import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Card from './components/card';

const animal = 'rabbit';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card text={'test'}/>
      </div>
    );
  }
}

export default App;
