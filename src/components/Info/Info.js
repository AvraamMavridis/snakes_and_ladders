import React, { Component } from "react";
import { state } from "../../store";
import classNames from "classnames";
import "./Info.css";

export default class Info extends Component {
  state = {
    position: 1,
    rolls: 0,
    playingPlayer: "player1"
  };

  componentDidMount() {
    state.subscribe({
      next: ({ state }) => {
        this.setState({
          ...state.players[this.props.player],
          playingPlayer: state.playingPlayer
        });
      }
    });
  }

  getPlayerName(){
    return this.props.player === 'player1' ? 'You' : 'Computer'
  }

  render() {
    const playerContainer = classNames("player-info-container", {
      "playing-player": this.state.playingPlayer === this.props.player,
    });

    return (
      <div className="player-info">
        <div className={playerContainer}>
          <h3>{this.getPlayerName()}</h3>
          <h5>Position: {this.state.position}</h5>
          <h5>Rolls: {this.state.rolls}</h5>
        </div>
      </div>
    );
  }
}
