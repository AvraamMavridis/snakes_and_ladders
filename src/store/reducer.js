import {
  RESET_GAME,
  STOP_DICE,
  SET_DICE,
  SET_PLAYER_PROPS,
} from "./actionTypes";
import initialState from './initialState';
import config from '../config';

/**
 * Returns the player that should play
 * in the next turn
 *
 * @param {number} dice
 * @param {string} current
 * @returns {string}
 */
const getPlayer = (dice, currentPlayer) => {
  let playingPlayer;

  if(dice === config.diceRerollPosition){
    playingPlayer = currentPlayer;
  } else {
    playingPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  }

  return playingPlayer;
}

/**
 * Modifies the state of the game
 *
 * @param {object} prevState
 * @param {string} action
 * @param {payload} payload
 * @returns {string}
 */
export default (prevState, action, payload) => {
  switch (action) {
    case RESET_GAME: {
      return {
        ...initialState,
      }
    }

    case STOP_DICE: {
      const playingPlayer = getPlayer(prevState.dice, prevState.playingPlayer);

      const players = { ...prevState.players };
      players[playingPlayer] = {
        ...players[playingPlayer],
        position: prevState.dice + prevState.players[playingPlayer].position,
        reason: 'fromDice'
      };

      let isOn100;
      if (players.player1.position === config.winningPosition) {
        isOn100 = "You";
      } else if (players.player2.position === config.winningPosition) {
        isOn100 = "Computer";
      }

      return {
        ...prevState,
        players,
        diceState: "pause",
        isOn100
      };
    }

    case SET_DICE: {
      const player = prevState.playingPlayer;
      const players = { ...prevState.players };
      players[player] = {
        ...players[player],
        rolls: 1 + prevState.players[player].rolls
      };

      let isOn100;
      if (players.player1.position === config.winningPosition) {
        isOn100 = "You";
      } else if (players.player2.position === config.winningPosition) {
        isOn100 = "Computer";
      }

      return {
        ...prevState,
        playingPlayer: getPlayer(payload, player),
        dice: payload,
        diceState: "rolling",
        players,
        isOn100
      };
    }

    case SET_PLAYER_PROPS:
      const players = { ...prevState.players };
      players[payload.name] = {
        ...players[payload.name],
        ...payload.props
      };

      return {
        ...prevState,
        players
      };

    default:
      return prevState;
  }
};
