import React, { Component } from 'react';
// import cardBack from '../../public/PNG/Cards/cardBack_blue1.png';

class Card extends Component {
  constructor(props){
    super(props);

    this.text = props.text;
    this.state = {
      clickCount: 0
    };
  }

  handleClick(){
    this.setState({clickCount: this.state.clickCount + 1});
  }

  render(){
    return (
      <div>
        <div>Hello {this.text}  React version is {0}{this.props.children}</div>
        <img src="PNG/Cards/cardBack_blue1.png" onClick={this.handleClick.bind(this)}/>
        {this.state.clickCount}
      </div>
    );
  }

}
export default Card;


