import {
  RESET_GAME,
  STOP_DICE,
  SET_DICE,
  SET_PLAYER_PROPS,
} from "./actionTypes";
import initialState from './initialState';

const getPlayer = (dice, current) => {
  let playingPlayer;

  if(dice === 6){
    playingPlayer = current;
  } else {
    playingPlayer = current === 'player1' ? 'player2' : 'player1';
  }

  return playingPlayer;
}

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
      if (players.player1.position === 100) {
        isOn100 = "You";
      } else if (players.player2.position === 100) {
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
      if (players.player1.position === 100) {
        isOn100 = "You";
      } else if (players.player2.position === 100) {
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
