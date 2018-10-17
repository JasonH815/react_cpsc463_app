import React, { Component } from 'react';
import axios from 'axios';


class GameButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickCount: 0,
      cardCount: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({clickCount: this.state.clickCount + 1});
    let that = this;
    axios.delete('http://jasonhellwig.me:3030/decks')
    .then(function(res) {
      console.log(res);
      axios.post('http://jasonhellwig.me:3030/decks', {
        playerId : "1",
        gameId : "1",
        count: 1,
        shuffle : true
      })
      .then(function(res) {
        console.log(res);
        axios.post('http://jasonhellwig.me:3030/decks', {
          playerId : "2",
          gameId : "1",
          count: 1,
          shuffle : true
        })
        .then(function(res) {
          console.log(res);
          that.setState({cardCount: res.data.cards.length});
        }.bind(that))
      })

    })





}

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.clickCount}
        </button>
        <p>
          {this.state.cardCount}
        </p>
      </div>
    );
  }

}
export default GameButton;
