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
   * @returns boolean
   * @memberof Hero
   */
  shouldMoveForward(pos) {
    const inR = range => inRange(pos, ...range);
    const ranges = [[1, 10], [21, 30], [41, 50], [61, 70], [81, 90]];
    return ranges.some(inR);
  }

  setHeroPosition(state, prevState) {
    const heroBoardPositions = state.heroPosition - prevState.heroPosition;

    if (this.shouldMoveForward(state.heroPosition)) {
      this.moveForward(heroBoardPositions * 50);
    }
  }

  moveForward(offsetX = 0) {
    const newPosition = this.hero.x + offsetX;

    this.scene.add.tween({
      targets: this.hero,
      x: newPosition
    });
  }

  move(x, y) {
    this.hero.x = x || this.hero.x;
    this.hero.y = y || this.hero.y;
  }
}
