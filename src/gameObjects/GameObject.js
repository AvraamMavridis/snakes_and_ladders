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

  createAnimation(key, frames, frameRate = 10){
    const cfg = {
      key,
      frames,
      frameRate,
      repeat: -1
    };

    this.scene.anims.create(cfg);
  }
}