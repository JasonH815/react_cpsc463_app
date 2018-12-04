import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


class Card extends Component {

  static propTypes = {
    card: PropTypes.shape({
      rank: PropTypes.string,
      suit: PropTypes.string
    }),
    fileName: PropTypes.string
  };

  static getFileName({rank, suit}) {
    return `/card${_.capitalize(suit)}s${_.capitalize(rank)}.png`;
  }

  render() {
    const fileLocation = '/media/png/Cards/';
    const {card, fileName} = this.props;

    if (fileName) {
      return (<img src={fileLocation + fileName} className="card" alt="card"/>);
    } else {
      return (<img src={fileLocation + Card.getFileName(card)} className="card" alt="card"/>);
    }

  }
}

export default Card;
