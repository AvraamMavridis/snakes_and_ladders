import { state } from '../store';
import config from '../config';

/**
 * Base Class that every game object should inherit
 *
 * @export
 * @class GameObject
 */
export default class GameObject {
  constructor(scene, x, y, name, frameIndex) {
    this.scene = scene;
    this.state = state;
    this.config = config;
    this.name = name;
    this.sprite = name;
    this.init(x, y, name, frameIndex);

    this.stateDidUpdate = this.stateDidUpdate.bind(this);
    this.state.subscribe({ next: this.stateDidUpdate });
    this._gameObject.on('animationcomplete', this.onAnimationComplete)
  }

  /**
   * Creates the gameobject
   *
   * @param {number} [x=50]
   * @param {number} [y=50]
   * @returns
   * @memberof Dice
   */
  init(x = 50, y = 50, name = 'gameobject', frameIndex = 0) {
    this._gameObject = this.scene.add.sprite(x, y, name, frameIndex);
  }

  /**
   * Called whenever the state of the game is updated
   *
   * @memberof GameObject
   */
  stateDidUpdate(){
    throw new Error('Gameobject should implement this function');
  }

  onAnimationComplete(){
    console.info('Can be implemented by dirived classes')
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

    if(cfg.duration) {
      delete cfg.frameRate;
      delete cfg.repeat;
    }

    return this.scene.anims.create(cfg);
  }

  /**
   * Moves the gameobject
   *
   * @param {object} movement
   * @returns {Promise}
   * @memberof Hero
   */
  moveAsync(movement, duration) {
    return new Promise(resolve => {
      this.t = this.scene.add.tween({
        targets: this._gameObject,
        onComplete: resolve,
        duration: duration || 500,
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
