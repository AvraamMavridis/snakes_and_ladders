import React, { Component } from "react";
import { rollDice } from "../../store/actions";
import { state } from "../../store";
import './PlayingBar.css';

class PlayingBar extends Component {
  state = {
    playingPlayer: "player1"
  };

  componentDidMount() {
    state.subscribe({
      next: ({ state }) => {
        this.setState({ playingPlayer: state.playingPlayer });
      }
    });
  }

  render() {
    return (
      <div className="playing-bar">
        <label><strong>Player: </strong>{this.state.playingPlayer}</label>
        <button onClick={rollDice}>Roll the dice</button>
      </div>
    );
  }
}

export default PlayingBar;
