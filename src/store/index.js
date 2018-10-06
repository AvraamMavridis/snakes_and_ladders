import { BehaviorSubject } from 'rxjs';
import reducer from './reducer';
import { setDice } from './actions';

const initialState = {
  dice: -1,
  diceState: 'hidden',
  players: {},
  playingPlayer: 'player1'
};

const action = '';

export const state = new BehaviorSubject({ state: initialState, prevState: {} });

const store = new BehaviorSubject(action);
export const dispatch = store.next.bind(store);

store.subscribe({
  next: ({action, payload}) => {
    const newState = reducer(state.value.state, action, payload);

    state.next({
      state: newState,
      prevState: state.value.state,
    });

    if(newState.playingPlayer === "player2" && newState.diceState === "pause"
      && newState.players.player1 && newState.players.player1.reason === 'fromDice'){
      setTimeout(setDice, Math.random() * 1000 + 4000)
    }
    window.__state = state.value.state;
  },
})
