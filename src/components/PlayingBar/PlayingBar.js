import React, { Component } from "react";
import { rollDice } from "../../store/actions";
import { state } from "../../store";
import './PlayingBar.css';

class PlayingBar extends Component {
  state = {
    playingPlayer: "player1",
    dice: -1,
  };

  componentDidMount() {
    state.subscribe({
      next: ({ state }) => {
        this.setState({ playingPlayer: state.playingPlayer, dice: state.dice });
      }
    });
  }

  getPlayerName(){
    return this.state.playingPlayer.includes('1') ? 'Player 1' : 'Player 2';
  }

  render() {
    return (
      <div className="playing-bar">
        <div className='labels-container'>
          <label><strong>Player to play: </strong>{this.getPlayerName()}</label>
          <label><strong>Last Dice: </strong>{this.state.dice}</label>
        </div>
        <div className='button-container'>
          <button onClick={rollDice}>Roll the dice</button>
        </div>
      </div>
    );
  }
}

export default PlayingBar;
