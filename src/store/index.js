import { BehaviorSubject } from 'rxjs';
import reducer from './reducer';

const initialState = {
  dice: -1,
  playerPosition: 0,
  rolls: 0,
  dice_state: 'hidden'
};

const action = '';

export const state = new BehaviorSubject(initialState);

const store = new BehaviorSubject(action);
export const dispatch = store.next.bind(store);

store.subscribe({
  next: (action, payload) => {
    console.log(action, payload);
    state.next(reducer(state.value, action, payload));
    window.__state__ = state.value;
  }
})