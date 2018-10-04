import React, { Component, PropTypes } from 'react'
import { state } from '../../store';
import './Info.css';

export default class Info extends Component {
  state = {
    position: 1,
    rolls: 0,
  }

  componentDidMount() {
    state.subscribe({
      next: ({ state }) => {
        this.setState({ ...state.players[this.props.player]})
      }
    })
  }
  

  render () {
    return (
      <div className='player-info'>
        <h3>{this.props.player}</h3>
        <h5>Position: {this.state.position}</h5>
        <h5>Rolls: {this.state.rolls}</h5>
      </div>
    )
  }
}
