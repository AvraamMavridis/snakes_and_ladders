import GameObject from "./GameObject";
import inRange from "lodash/inRange";
import { sleep } from "../helpers";
import { setPlayerProps } from "../store/actions";

/**
 * Player Character
 *
 * @export
 * @class Hero
 * @extends {GameObject}
 */
export default class Hero extends GameObject {
  constructor(...args) {
    super(...args);
    this.__initX = args[1];
    this.__initY = args[2];
    this._gameObject.scaleX = 0.7;
    this._gameObject.scaleY = 0.7;
    this.createHeroAnimations();
  }

  /**
   * Called whenever the store is upaded
   *
   * @param {object} { state, prevState }
   * @returns
   * @memberof Hero
   */
  stateDidUpdate({ state, prevState }) {
    this.setHeroPosition(state, prevState);

    if(state.players[this.name].position === 1 && this.__initX && this.__initY){
      this._gameObject.setX(this.__initX);
      this._gameObject.setY(this.__initY);
      this.createHeroAnimations();
    }
  }

  /**
   * Returns the character position in the board
   *
   * @param {object} state
   * @returns {number}
   * @memberof Hero
   */
  getHeroPosition(state) {
    const player = state.players[this.name];
    return player ? state.players[this.name].position : 1;
  }

  /**
   * Create and load the various animations for the Hero
   *
   * @memberof Hero
   */
  createHeroAnimations() {
    const frames = this.scene.anims.generateFrameNumbers(this.sprite);
    this.createAnimation({
      key: `${this.name}walkBackwards`,
      frames: frames.slice(0, 4),
      frameRate: 5
    });
    this._gameObject.anims.load(`${this.name}walkBackwards`);
    this.createAnimation({
      key: `${this.name}walkUp`,
      frames: frames.slice(12, 16),
      frameRate: 5
    });
    this._gameObject.anims.load(`${this.name}walkUp`);
    this.createAnimation({
      key: `${this.name}walkForward`,
      frames: frames.slice(4, 8),
      frameRate: 5
    });
    this._gameObject.anims.load(`${this.name}walkForward`);
  }

  /**
   * Stop animations
   *
   * @memberof Hero
   */
  stopAnimations() {
    this._gameObject.anims.stop(`${this.name}walkForward`);
    this._gameObject.anims.stop(`${this.name}walkBackwards`);
    this._gameObject.anims.stop(`${this.name}walkUp`);
  }

  /**
   * Determines if the Hero can be moved forward
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Hero
   */
  shouldMoveForward(pos) {
    const ranges = [[1, 10], [21, 30], [41, 50], [61, 70], [81, 90]];
    return this.isInAnyRange(pos, ranges);
  }

  /**
   * Determines if the Hero can be moved backwards
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Hero
   */
  shouldMoveBackwards(pos) {
    const ranges = [[11, 20], [31, 40], [51, 60], [71, 80], [91, 100]];
    return this.isInAnyRange(pos, ranges);
  }

  /**
   * Checks if the Hero position is in any of the passed ranges
   *
   * @param {number} pos
   * @param {array<[]>} ranges
   * @returns {boolean}
   * @memberof Hero
   */
  isInAnyRange(pos, ranges) {
    const inR = range => inRange(pos, ...range);
    return ranges.some(inR);
  }

  /**
   * Checks if the Hero should move upwards
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Hero
   */
  shouldMoveUp(pos) {
    const corners = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    return corners.includes(pos);
  }

  /**
   * Moves the Hero in the board after dice roll
   *
   * @param {object} state
   * @param {object} prevState
   * @memberof Hero
   */
  async setHeroPosition(state, prevState) {
    const currentPosition = this.getHeroPosition(state);
    const prevPosition = this.getHeroPosition(prevState);

    if (currentPosition === prevPosition) return;

    if (!this.isOnLadders(prevPosition) && !this.isOnSnakes(prevPosition)) {
      await this.moveHero(prevPosition, currentPosition);
      this.stopAnimations();
      await sleep(100);
    }

    if (this.isOnLadders(currentPosition)) {
      const start = currentPosition;
      const end = this.config.laddersPositions[start];
      await this.moveAsync({
        x: this._gameObject.x + end.offsetX,
        y: this._gameObject.y + end.offsetY
      });

      setPlayerProps(this.name, { position: end.position, reason: 'fromLadder' });
    }

    if (this.isOnSnakes(currentPosition)) {
      const start = currentPosition;
      const end = this.config.snakePositions[start];
      await this.moveAsync({
        x: this._gameObject.x + end.offsetX,
        y: this._gameObject.y + end.offsetY
      });

      setPlayerProps(this.name, { position: end.position, reason: 'fromSname' });
    }

    if(currentPosition > 100) {
      setPlayerProps(this.name, { position: 200 - currentPosition, reason: 'greater100' });
    }
  }

  /**
   * Check if the hero is on the root of a ladder
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Hero
   */
  isOnLadders(pos) {
    const posis = [...Object.keys(this.config.laddersPositions)].map(p =>
      parseInt(p)
    );
    return posis.includes(pos);
  }

  /**
   * Check if the hero is on the head of a snake
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Hero
   */
  isOnSnakes(pos) {
    const posis = [...Object.keys(this.config.snakePositions)].map(p =>
      parseInt(p)
    );
    return posis.includes(pos);
  }

  /**
   * Move hero step by step
   *
   * @param {number} start
   * @param {number} end
   * @memberof Hero
   */
  async moveHero(start, end) {
    end = end > 100 ? end + 1 : end;
  
    for (let i = start; i < end; i++) {
      const current = i;
      const move = i > 100 ? (200 - i) : i;

      if (this.shouldMoveForward(move) && current <= 100) {
        this._gameObject.anims.play(`${this.name}walkForward`);
        await this.moveForward();
      } else if (this.shouldMoveUp(move) && current <= 100) {
        this._gameObject.anims.play(`${this.name}walkUp`);
        await this.moveUp();
      } else if (this.shouldMoveBackwards(move) && current <= 100) {
        this._gameObject.anims.play(`${this.name}walkBackwards`);
        await this.moveBackwards();
      } else if(current > 100) {
        this._gameObject.anims.play(`${this.name}walkForward`);
        await this.moveForward();
      }
    }
  }

  /**
   * Moves Hero backwards in the board
   *
   * @param {number} [offsetX=50]
   * @returns {Promise}
   * @memberof Hero
   */
  moveBackwards(offsetX = 50) {
    const newPosition = this._gameObject.x - offsetX;
    return this.moveAsync({ x: newPosition });
  }

  /**
   * Moves Hero Forward in the board
   *
   * @param {number} [offsetX=50]
   * @returns {Promise}
   * @memberof Hero
   */
  moveForward(offsetX = 50) {
    const newPosition = this._gameObject.x + offsetX;
    return this.moveAsync({ x: newPosition });
  }

  /**
   * Moves Hero up in the board
   *
   * @param {number} [offsetX=50]
   * @returns {Promise}
   * @memberof Hero
   */
  moveUp(offsetY = 50) {
    const newPosition = this._gameObject.y - offsetY;
    return this.moveAsync({ y: newPosition });
  }
}
