import React, { Component } from 'react';
import { createGame } from './game';
import Button from './components/Button';


export default class App extends Component {
  componentDidMount() {
    createGame();
  }

  render() {
    return (
      <div className="">
        <div className="game-container" />
        <Button />
      </div>
    );
  }
}