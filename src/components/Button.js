import React, { Component } from 'react';
import { dispatch } from '../store';

class Button extends Component {
  onClick = () => {
    dispatch('ROLL_DICE');
  }


  render () {
    return (
      <button onClick={this.onClick}>
        Roll the dice
      </button>
    )
  }
}

export default Button