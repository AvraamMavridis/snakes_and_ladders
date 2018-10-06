import {
  STOP_DICE,
  SET_DICE,
  SET_PLAYER_PROPS,
  ADD_PLAYER
} from "./actionTypes";

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
    case STOP_DICE: {
      const playingPlayer = getPlayer(prevState.dice, prevState.playingPlayer);

      const players = { ...prevState.players };
      players[playingPlayer] = {
        ...players[playingPlayer],
        position: prevState.dice + prevState.players[playingPlayer].position,
        reason: 'fromDice'
      };

      return {
        ...prevState,
        players,
        diceState: "pause"
      };
    }

    case SET_DICE: {
      const player = prevState.playingPlayer;
      const players = { ...prevState.players };
      players[player] = {
        ...players[player],
        rolls: 1 + prevState.players[player].rolls
      };

      return {
        ...prevState,
        playingPlayer: getPlayer(payload, player),
        dice: payload,
        diceState: "rolling",
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
