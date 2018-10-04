import GameObject from "./GameObject";
import shuffle from "lodash/shuffle";
import { setDice, stopDice } from "../store/actions";

let r = Math.random();

export default class Dice extends GameObject {
  constructor(scene) {
    super(scene);
    this._gameObject = this.create();
  }

  stateDidUpdate({ state, prevState }) {
    if (state.dice_state === "rolling") {
      this.animate();
    }

    if (state.dice_state === "pause" && prevState.dice_state === "rolling") {
      this.pause();
    }
  }

  getFrames() {
    let frames = this.scene.anims.generateFrameNumbers("dice");
    frames = frames.filter(
      fr => fr.frame > 15 && fr.frame < frames.length - 15
    );
    return shuffle(frames);
  }

  create(x = 50, y = 50) {
    return this.scene.add.sprite(x, y, "dice");
  }

  animate() {
    this.createAnimation({ key: "roll", frames: this.getFrames() });
    this._gameObjectAnim = this._gameObject.anims.load("roll");
    this._gameObject.anims.play("roll");

    setTimeout(() => {
      stopDice();
      r = Math.random();
    }, r * 100);
  }

  pause() {
    const pausingFrames = Object.keys(this.config.pausingFrames).map(i => +i);

    const myVar = setInterval(() => {
      const currentFrame = this._gameObject.anims.currentFrame.frame.name;
      if (pausingFrames.includes(currentFrame)) {
        this._gameObject.anims.stop("roll");
        setDice(this.config.pausingFrames[`${currentFrame}`]);
        clearInterval(myVar);
      }
    }, Math.floor(Math.random() * 300) + 50);
  }
}
