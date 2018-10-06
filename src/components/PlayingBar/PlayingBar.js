import React, { Component, Fragment } from "react";
import { setDice, resetGame } from "../../store/actions";
import { state } from "../../store";
import "./PlayingBar.css";

window.__setDice = setDice;

class PlayingBar extends Component {
  state = {
    playingPlayer: "player1",
    dice: -1,
    diceState: "stop",
    isOn100: undefined
  };

  componentDidMount() {
    state.subscribe({
      next: ({ state }) => {
        this.setState({
          playingPlayer: state.playingPlayer,
          dice: state.dice,
          diceState: state.diceState,
          isOn100: state.isOn100,
        });
      }
    });
  }

  getPlayerName() {
    return this.state.playingPlayer.includes("1") ? "You" : "Computer";
  }

  render() {
    const player = this.getPlayerName();
    const { diceState, playingPlayer, isOn100 } = this.state;

    return (
      <div className="playing-bar">
        <div className="labels-container">
          {isOn100 ? (
            <span className='winner'>{`Winner: ${isOn100}`}</span>
          ) : (
            <Fragment>
              <label>
                <strong>Playing next: </strong>
                <span className={player.toLowerCase()}>{player}</span>
              </label>
              <label>
                <strong>Last Dice: </strong>
                {this.state.dice > 0 ? this.state.dice : "-"}
              </label>
            </Fragment>
          )}
        </div>
        <div className="button-container">
          <button
            disabled={
              (diceState === "rolling" || playingPlayer === "player2")
              && !isOn100
            }
            onClick={() => isOn100 ? resetGame() : setDice()}
          >
            { isOn100 ? 'Start new game' :  'Roll the dice' }
          </button>
        </div>
      </div>
    );
  }
}

export default PlayingBar;
