import { ROLL_DICE, STOP_DICE, SET_DICE, SET_HERO_POSITION } from './actionTypes';

export default (prevState, action, payload) => {

  switch (action) {
    case ROLL_DICE:
      return {
        ...prevState,
        rolls: prevState.rolls + 1,
        dice_state: 'rolling',
      };

    case STOP_DICE:
      return {
        ...prevState,
        dice_state: 'pause',
      };

    case SET_DICE:
      return {
        ...prevState,
        dice: payload,
        heroPosition: payload + prevState.heroPosition,
      }
    
    case SET_HERO_POSITION: 
      return {
        ...prevState,
        heroPosition: payload,
      }
  
    default:
      return prevState;
  }
}