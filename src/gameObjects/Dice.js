import GameObject from "./GameObject";
import shuffle from "lodash/shuffle";
import { stopDice } from "../store/actions";


/**
 * Dice
 *
 * @export
 * @class Dice
 * @extends {GameObject}
 */
export default class Dice extends GameObject {
  constructor(scene, x, y, name, frameIndex){
    super(scene, x, y, name, frameIndex);
    this._gameObjectAnim = this._gameObject.anims.load("roll");
  }

  /**
   * Called whenever the store is upaded
   *
   * @param {object} { state, prevState }
   * @returns
   * @memberof Hero
   */
  stateDidUpdate({ state, prevState }) {
    this.state = state;
    if (state.diceState === "rolling") {
      this.animate(state.dice);
    }
  }

  /**
   * Generate frames out of sprite sheet
   *
   * @returns {array<Frame>}
   * @memberof Dice
   */
  getFrames() {
    let frames = this.scene.anims.generateFrameNumbers("dice");
    frames = frames.filter(
      fr => fr.frame > 15 && fr.frame < frames.length - 15
    );
    return shuffle(frames);
  }

  /**
   * Creates the dice gameobject
   *
   * @param {number} [x=50]
   * @param {number} [y=50]
   * @returns
   * @memberof Dice
   */
  create(x = 50, y = 50) {
    this._gameObject = this.scene.add.sprite(x, y, "dice");
  }

  animate(diceNumber) {
    const frames = this.getFrames();
    let pausingFrame = this.config.pausingFrames[`${diceNumber}`];
    pausingFrame = frames.find(fr => pausingFrame === fr.frame);

    this.createAnimation({
      key: "roll",
      frames,
      duration: 2000,
    });
  
    this._gameObject.anims.play("roll");
    const currentFrame = pausingFrame.frame;

    this.moveAsync({ x: Math.random() * 400 + 50, y: Math.random() * 400 + 50,
      onComplete: () => {
        this._gameObject.anims.stop();
        this._gameObject.setFrame(currentFrame);
        stopDice();
      }
    }, 1700);
  }
}
