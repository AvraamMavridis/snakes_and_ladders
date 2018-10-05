import GameObject from "./GameObject";
import shuffle from "lodash/shuffle";
import { setDice, stopDice } from "../store/actions";


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
    if (state.dice_state === "rolling") {
      this.animate();
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

  animate() {
    const frames = this.getFrames();
    const pausingFramesIndexes = Object.keys(this.config.pausingFrames).map(i => +i);
    const pausingFrames = frames.filter(fr => pausingFramesIndexes.includes(fr.frame));
    
    this.createAnimation({
      key: "roll",
      frames,
      duration: 2000,
    });
  
    this._gameObject.anims.play("roll");

    const f = pausingFrames[Math.floor(Math.random() * 12)];

    this.moveAsync({ x: Math.random() * 400 + 50, y: Math.random() * 400 + 50,
      onComplete: () => {
        this._gameObject.anims.stop();
        this._gameObject.setFrame(f.frame);
        stopDice();
        setDice(this.config.pausingFrames[`${f.frame}`]);
      }
    }, 1700);
  }
}
