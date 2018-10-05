import {
  ROLL_DICE,
  STOP_DICE,
  SET_DICE,
  SET_PLAYER_PROPS,
  ADD_PLAYER
} from "./actionTypes";

export default (prevState, action, payload) => {
  switch (action) {
    case ROLL_DICE: {
      const player = prevState.playingPlayer;
      const players = { ...prevState.players };
      players[player] = {
        ...players[player],
        rolls: 1 + prevState.players[player].rolls
      };

      return {
        ...prevState,
        diceState: "rolling",
        players
      };
    }

    case STOP_DICE:
      return {
        ...prevState,
        diceState: "pause"
      };

    case SET_DICE: {
      const player = prevState.playingPlayer;
      const players = { ...prevState.players };
      players[player] = {
        ...players[player],
        position: payload + prevState.players[player].position
      };

      let playingPlayer;

      if(payload === 6){
        playingPlayer = player;
      } else {
        playingPlayer = player === 'player1' ? 'player2' : 'player1';
      }

      return {
        ...prevState,
        playingPlayer,
        dice: payload,
        players
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

    case ADD_PLAYER: {
      return {
        ...prevState,
        players: {
          ...prevState.players,
          [payload]: {
            position: 1,
            rolls: 0
          }
        }
      };
    }

    default:
      return prevState;
  }
};
