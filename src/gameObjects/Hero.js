import GameObject from "./GameObject";
import inRange from "lodash/inRange";
import { sleep } from "../helpers";
import { setPlayerProps } from "../store/actions";

export default class Hero extends GameObject {
  constructor(scene, name, sprite, initialPositionX = 50) {
    super(scene);
    this.name = name;
    this.sprite = sprite;
    this.createHero(4, initialPositionX);
  }

  /**
   * Called whenever the store is upaded
   *
   * @param {object} { state, prevState }
   * @returns
   * @memberof Hero
   */
  stateDidUpdate({ state, prevState }) {
    if (prevState.playingPlayer !== this.name) return;

    if (this.hero) {
      this.setHeroPosition(state, prevState);
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
   * Create the Hero sprite
   *
   * @param {number} [frameIndex=4]
   * @param {number} [initialPositionX=50]
   * @memberof Hero
   */
  createHero(frameIndex = 4, initialPositionX = 50) {
    this.hero = this.scene.add.sprite(
      initialPositionX,
      this.config.boardHeight - 75,
      this.sprite,
      frameIndex
    );
    this.hero.scaleX = 0.7;
    this.hero.scaleY = 0.7;
    this.createHeroAnimations();
  }

  /**
   * Create and load the various animations for the Hero
   *
   * @memberof Hero
   */
  createHeroAnimations() {
    const frames = this.scene.anims.generateFrameNumbers(this.sprite);
    this.createAnimation(`${this.name}walkBackwards`, frames.slice(0, 4), 5);
    this.hero.anims.load(`${this.name}walkBackwards`);
    this.createAnimation(`${this.name}walkUp`, frames.slice(12, 16), 5);
    this.hero.anims.load(`${this.name}walkUp`);
    this.createAnimation(`${this.name}walkForward`, frames.slice(4, 8), 5);
    this.hero.anims.load(`${this.name}walkForward`);
  }

  /**
   * Stop animations
   *
   * @memberof Hero
   */
  stopAnimations() {
    this.hero.anims.stop(`${this.name}walkForward`);
    this.hero.anims.stop(`${this.name}walkBackwards`);
    this.hero.anims.stop(`${this.name}walkUp`);
  }

  /**
   * Clear sprite
   *
   * @memberof Hero
   */
  destroy() {
    if (this.hero) this.hero.destroy();
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

    if (!this.isOnLadders(prevPosition)) {
      await this.moveHero(prevPosition, currentPosition);
      this.stopAnimations();
      await sleep(2000);
    }

    if (this.isOnLadders(currentPosition)) {
      const start = currentPosition;
      const end = this.config.laddersPositions[start];
      await this.moveAsync({
        x: this.hero.x + end.offsetX,
        y: this.hero.y + end.offsetY
      });

      setPlayerProps(this.name, { position: end.position });
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
   * Move hero step by step
   *
   * @param {number} start
   * @param {number} end
   * @memberof Hero
   */
  async moveHero(start, end) {
    for (let i = start; i < end; i++) {
      if (this.shouldMoveForward(i)) {
        this.hero.anims.play(`${this.name}walkForward`);
        await this.moveForward();
      } else if (this.shouldMoveUp(i)) {
        this.hero.anims.play(`${this.name}walkUp`);
        await this.moveUp();
      } else if (this.shouldMoveBackwards(i)) {
        this.hero.anims.play(`${this.name}walkBackwards`);
        await this.moveBackwards();
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
    const newPosition = this.hero.x - offsetX;
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
    const newPosition = this.hero.x + offsetX;
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
    const newPosition = this.hero.y - offsetY;
    return this.moveAsync({ y: newPosition });
  }

  /**
   * Moves Hero
   *
   * @param {object} movement
   * @returns {Promise}
   * @memberof Hero
   */
  moveAsync(movement) {
    return new Promise(resolve => {
      this.t = this.scene.add.tween({
        targets: this.hero,
        onComplete: resolve,
        duration: 500,
        ...movement
      });
    });
  }
}
