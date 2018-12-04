import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Card from './card';

class Board extends Component {

  static propTypes = {
    playerCard: PropTypes.PropTypes.shape({
      rank: PropTypes.string,
      suit: PropTypes.string
    }).isRequired,
    opponentCard: PropTypes.PropTypes.shape({
      rank: PropTypes.string,
      suit: PropTypes.string
    }).isRequired
  };

  render() {
    const {playerCard , opponentCard} = this.props;
    console.log('player card: ', playerCard);
    return(
      <div>
        <Card card={playerCard}/>
        <Card card={opponentCard}/>
      </div>
    );
  }
}

Board.prototypes = {
  playerCard: PropTypes.string.isRequired
};

export default Board;
