import GameObject from "./GameObject";
import shuffle from "lodash/shuffle";
import { setDice, stopDice } from "../store/actions";

let r = Math.random();

export default class Dice extends GameObject {
  constructor(scene) {
    super(scene);
    this.dice = this.create();
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

  destroy() {
    this.dice.destroy();
  }

  animate() {
    this.createAnimation("roll", this.getFrames());
    this.diceAnim = this.dice.anims.load("roll");
    this.dice.anims.play("roll");

    setTimeout(() => {
      stopDice();
      r = Math.random();
    }, r * 2000);
  }

  pause() {
    const pausingFrames = Object.keys(this.config.pausingFrames).map(i => +i);

    const myVar = setInterval(() => {
      const currentFrame = this.dice.anims.currentFrame.frame.name;
      if (pausingFrames.includes(currentFrame)) {
        this.dice.anims.stop("roll");
        setDice(this.config.pausingFrames[`${currentFrame}`]);
        clearInterval(myVar);
      }
    }, Math.floor(Math.random() * 300) + 50);
  }
}
