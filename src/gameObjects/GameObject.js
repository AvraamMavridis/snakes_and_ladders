import { state } from '../store';
import config from '../config';

/**
 * Base Class that every game object should inherit
 *
 * @export
 * @class GameObject
 */
export default class GameObject {
  constructor(scene) {
    this.scene = scene;
    this.state = state;
    this.config = config;

    this.stateDidUpdate = this.stateDidUpdate.bind(this);
    this.state.subscribe({ next: this.stateDidUpdate });
  }

  /**
   * Called whenever the state of the game is updated
   *
   * @memberof GameObject
   */
  stateDidUpdate(){
    throw new Error('Gameobject should implement this function');
  }

  /**
   * Create an animation
   *
   * @param {object} [config={ key, frames, frameRate = 10 }]
   * @returns {Animation}
   * @memberof GameObject
   */
  createAnimation(config){
    const cfg = {
      frameRate: 10,
      repeat: -1,
      ...config,
    };

    return this.scene.anims.create(cfg);
  }

  /**
   * Moves the gameobject
   *
   * @param {object} movement
   * @returns {Promise}
   * @memberof Hero
   */
  moveAsync(movement) {
    return new Promise(resolve => {
      this.t = this.scene.add.tween({
        targets: this._gameObject,
        onComplete: resolve,
        duration: 500,
        ...movement
      });
    });
  }

  /**
   * Clear sprite
   * 
   * @memberof Gameobject
   */
  destroy() {
    if (this._gameObject) this._gameObject.destroy();
  }
}
