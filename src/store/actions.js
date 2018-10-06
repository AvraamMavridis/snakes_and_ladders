import { dispatch } from "../store";
import {
  STOP_DICE,
  SET_DICE,
  SET_PLAYER_PROPS,
  ADD_PLAYER
} from "./actionTypes";

export function stopDice() {
  dispatch({
    action: STOP_DICE
  });
}

export function setDice(val) {
  const dice = val || Math.floor(Math.random() * 6) + 1;
  dispatch({
    action: SET_DICE,
    payload: dice,
  });
}

export function setPlayerProps(name, props) {
  dispatch({
    action: SET_PLAYER_PROPS,
    payload: {
      name,
      props,
    }
  });
}

export function addPlayer(payload) {
  dispatch({
    action: ADD_PLAYER,
    payload
  });
}
