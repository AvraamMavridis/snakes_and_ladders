import { BehaviorSubject } from 'rxjs';
import reducer from './reducer';

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
    state.next({
      state: reducer(state.value.state, action, payload),
      prevState: state.value.state,
    });
    window.state = state.value.state;
  }
})
