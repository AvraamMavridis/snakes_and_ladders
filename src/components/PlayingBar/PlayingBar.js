import React, { Component } from "react";
import { setDice } from "../../store/actions";
import { state } from "../../store";
import "./PlayingBar.css";

window.__setDice = setDice;

class PlayingBar extends Component {
  state = {
    playingPlayer: "player1",
    dice: -1,
    diceState: "stop"
  };

  componentDidMount() {
    state.subscribe({
      next: ({ state }) => {
        this.setState({
          playingPlayer: state.playingPlayer,
          dice: state.dice,
          diceState: state.diceState
        });
      }
    });
  }

  getPlayerName() {
    return this.state.playingPlayer.includes("1") ? "You" : "Computer";
  }

  render() {
    const player = this.getPlayerName();

    return (
      <div className="playing-bar">
        <div className="labels-container">
          <label>
            <strong>Playing next: </strong>
            <span className={player.toLowerCase()}>{player}</span>
          </label>
          <label>
            <strong>Last Dice: </strong>
            {this.state.dice > 0 ? this.state.dice : "-"}
          </label>
        </div>
        <div className="button-container">
          <button
            disabled={
              this.state.diceState === "rolling" ||
              this.state.playingPlayer === "player2"
            }
            onClick={() => setDice()}
          >
            Roll the dice
          </button>
        </div>
      </div>
    );
  }
}

export default PlayingBar;
