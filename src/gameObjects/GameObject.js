import { state } from '../store';
import config from '../config';

export default class GameObject {
  constructor(scene) {
    this.scene = scene;
    this.state = state;
    this.config = config;

    this.stateDidUpdate = this.stateDidUpdate.bind(this);
    this.state.subscribe({ next: this.stateDidUpdate });
  }

  stateDidUpdate(){
    throw new Error('Gameobject should implement this function');
  }
}