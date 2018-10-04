import { dispatch } from "../store";
import {
  ROLL_DICE,
  STOP_DICE,
  SET_DICE,
  SET_PLAYER_PROPS,
  ADD_PLAYER
} from "./actionTypes";

export function rollDice() {
  dispatch({
    action: ROLL_DICE
  });
}

export function stopDice() {
  dispatch({
    action: STOP_DICE
  });
}

export function setDice(payload) {
  dispatch({
    action: SET_DICE,
    payload
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
