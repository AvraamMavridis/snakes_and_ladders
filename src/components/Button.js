import React, { Component } from 'react';
import { rollDice } from '../store/actions';

class Button extends Component {
  render () {
    return (
      <button onClick={rollDice}>
        Roll the dice
      </button>
    )
  }
}

export default Button