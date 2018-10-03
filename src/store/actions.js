import { dispatch } from '../store';
import { ROLL_DICE, STOP_DICE, SET_DICE, SET_HERO_POSITION } from './actionTypes';

export function rollDice(){
  dispatch({
    action: ROLL_DICE,
  });
}

export function stopDice(){
  dispatch({
    action: STOP_DICE,
  });
}

export function setDice(payload) {
  dispatch({
    action: SET_DICE,
    payload,
  });
}

export function setHeroPosition(payload) {
  dispatch({
    action: SET_HERO_POSITION,
    payload,
  });
}