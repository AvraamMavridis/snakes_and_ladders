import React, { Component } from 'react';
import { createGame } from './game';
import PlayingBar from './components/PlayingBar/PlayingBar';
import Info from './components/Info/Info';


export default class App extends Component {
  componentDidMount() {
    createGame(this.el);
  }

  render() {
    return (
      <div className="">
        <div className="container">
          <Info player="player1" />
          <div className='game-wrapper'>
            <div ref={el => (this.el = el)} />
            <PlayingBar />
          </div>
          <Info player="player2" />
        </div>
      </div>
    );
  }
}
