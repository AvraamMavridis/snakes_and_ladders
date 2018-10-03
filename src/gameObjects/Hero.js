import GameObject from "./GameObject";
import inRange from "lodash/inRange";

export default class Hero extends GameObject {
  constructor(scene) {
    super(scene);
    this.hero = this.scene.add.sprite(
      50,
      this.config.boardHeight - 75,
      "hero",
      4
    );
    this.hero.scaleX = 0.7;
    this.hero.scaleY = 0.7;
  }

  stateDidUpdate({ state, prevState }) {
    if (this.hero) {
      this.setHeroPosition(state, prevState);
    }
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
   * @returns
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
    const heroBoardPositions = state.heroPosition - prevState.heroPosition;
    let moveForward = 0;

    for (let i = prevState.heroPosition; i < state.heroPosition; i++) {
      if (this.shouldMoveForward(i)) {
        await this.moveForward();
      } else if (this.shouldMoveUp(i)) {
        await this.moveUp();
      } else if (this.shouldMoveBackwards(i)) {
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
      this.scene.add.tween({
        targets: this.hero,
        onComplete: resolve,
        ...movement
      });
    });
  }
}
