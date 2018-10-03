import GameObject from "./GameObject";
import inRange from "lodash/inRange";
import { sleep } from '../helpers';
import { setHeroPosition } from '../store/actions';


const snakePositions = {
  98: 8,
  92: 53,
  62: 57,
  56: 15,
  51: 11
}

const laddersPositions = {
  2: {
    position: 38,
    offsetX: 50,
    offsetY: -150, 
  },
  4: {
    position: 14,
    offsetX: 150,
    offsetY: -50, 
  },
  9: 31,
  33: 85,
  52: 88,
  80: 99
}

export default class Hero extends GameObject {
  constructor(scene) {
    super(scene);
    this.createHero();
  }

  stateDidUpdate({ state, prevState }) {
    if (this.hero) {
      this.setHeroPosition(state, prevState);
    }
  }

  /**
   * Create the Hero sprite
   *
   * @param {number} [frameIndex=4]
   * @memberof Hero
   */
  createHero(frameIndex = 4){
    this.hero = this.scene.add.sprite(
      50,
      this.config.boardHeight - 75,
      "hero",
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
  createHeroAnimations(){
    const frames = this.scene.anims.generateFrameNumbers("hero");
    this.createAnimation("walkBackwards", frames.slice(0,4), 5);
    this.hero.anims.load("walkBackwards");
    this.createAnimation("walkUp", frames.slice(12,16), 5);
    this.hero.anims.load("walkUp");
    this.createAnimation("walkForward", frames.slice(4,8), 5);
    this.hero.anims.load("walkForward");
  }

  /**
   * Stop animations
   *
   * @memberof Hero
   */
  stopAnimations(){
    this.hero.anims.stop("walkForward");
    this.hero.anims.stop("walkBackwards");
    this.hero.anims.stop("walkUp");
  }

  /**
   * Clear sprite
   *
   * @memberof Hero
   */
  destroy(){
    if(this.hero) this.hero.destroy();
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
    if(prevState.heroPosition === state.heroPosition) return;

    if(!this.isOnLadders(prevState.heroPosition)){
      await this.moveHero(prevState.heroPosition, state.heroPosition);
      this.stopAnimations();
      await sleep(2000); 
    }

    if(this.isOnLadders(state.heroPosition)){
      const start = state.heroPosition;
      const end = laddersPositions[start];
      await this.moveAsync({ x: this.hero.x + end.offsetX, y: this.hero.y + end.offsetY });
      setHeroPosition(end.position);
    }
  }

  /**
   * Check if the hero is on the root of a ladder
   *
   * @param {*} pos
   * @returns
   * @memberof Hero
   */
  isOnLadders(pos){
    const posis = [...Object.keys(laddersPositions)]
      .map(p => parseInt(p));
    return posis.includes(pos)
  }

  /**
   * Move hero step by step
   *
   * @param {number} start
   * @param {number} end
   * @memberof Hero
   */
  async moveHero(start, end){
    for (let i = start; i < end; i++) {
      if (this.shouldMoveForward(i)) {
        this.hero.anims.play("walkForward");
        await this.moveForward();
      } else if (this.shouldMoveUp(i)) {
        this.hero.anims.play("walkUp");
        await this.moveUp();
      } else if (this.shouldMoveBackwards(i)) {
        this.hero.anims.play("walkBackwards");
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
