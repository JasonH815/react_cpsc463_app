import React, { Component } from 'react';


class Card extends Component {

  getFileName({rank, suit}) {
    return `/card${suit}s${rank}.png`;
  }

  render() {
    const fileLocation = '/media/png/Cards/';
    const {card, fileName} = this.props;

    if (fileName) {
      return (<img src={fileLocation + fileName} className="card" alt="card"/>);
    } else {
      return (<img src={fileLocation + this.getFileName(card)} className="card" alt="card"/>);
    }

  }
}

export default Card;
