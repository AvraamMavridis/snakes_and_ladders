import React, { Component } from "react";
import { createGame } from "./game";
import PlayingBar from "./components/PlayingBar/PlayingBar";
import Info from "./components/Info/Info";
import Rules from "./components/Rules/Rules";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import "./App.css";

export default class App extends Component {
  componentDidMount() {
    createGame(this.el);
  }

  render() {
    return (
      <div className="">
        <div className="container">
          <div>
            <Rules />
            <Info player="player1" />
          </div>
          <div className="game-wrapper">
            <h2>Snakes and Ladders</h2>
            <div ref={el => (this.el = el)} />
            <PlayingBar />
          </div>
          <div>
            <Info player="player2" />
            <PersonalInfo />
          </div>
        </div>
      </div>
    );
  }
}
