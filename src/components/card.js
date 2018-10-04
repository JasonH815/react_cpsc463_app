import React, { Component } from 'react';
import cardBack from '../media/png/Cards/cardBack_blue1.png';
import axios from 'axios';


class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      cardCount: 0,
      clickCount: 0
    };
  }

  handleClick(){
    this.setState({clickCount: this.state.clickCount + 1});

    axios.post('http://jasonhellwig.me:3030/decks', {
      playerId : "1",
      gameId : "1",
      count: 1,
      shuffle : true
    })

    .then(function(response) {
      console.log(response);
      this.setState({cardCount: response.data.cards.length});
    }.bind(this))

    .catch(function(error) {
      console.log(error);
    });
  }

  render(){
    return (
      <div>
        <img src={cardBack} onClick={this.handleClick.bind(this)}/>
         clicked = {this.state.clickCount}
         card count = {this.state.cardCount}
      </div>
    );
  }

}
export default Card;
