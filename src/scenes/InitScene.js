import phaser from 'phaser';
import config from '../config';
import shuffle from 'lodash/shuffle';
import { state, dispatch } from '../store';

export default class InitScene extends phaser.Scene {
    constructor () {
        super({
            key: 'initscene'
        })

        state.subscribe({
          next: state => {
            if(state.dice_state === 'rolling'){
              this.animateDice();
            }

            if(state.dice_state === 'pause') {
              this.pauseDice();
            }
          },
        })
    }

    getDiceFrames = () => {
      let frames = this.anims.generateFrameNumbers('dice');
      frames = frames.filter(fr => fr.frame > 15 && fr.frame < frames.length - 15);
      return shuffle(frames);
    }

    createDiceAnimation = () => {
      const cfg = {
        key: 'roll',
        frames: this.getDiceFrames(),
        frameRate: 10,
        repeat: -1
      };

      this.anims.create(cfg);
    }

    animateDice = () => {
      if(this.dice) this.dice.destroy();

      this.dice = this.add.sprite(500 * Math.random(), 500 * Math.random(), 'dice');
      this.createDiceAnimation();
      this.diceAnim = this.dice.anims.load('roll');
      this.dice.anims.play('roll');

      setTimeout(() => {
        dispatch('STOP_DICE');
      }, Math.random() * 2000);
    }

    pauseDice = () => {
      const pausingFrames = Object.keys(config.pausingFrames).map(i => +i);

      const myVar = setInterval(() => {
        const currentFrame = this.dice.anims.currentFrame.frame.name;
        if(pausingFrames.includes(currentFrame)){
          this.dice.anims.stop('roll');
          dispatch('SET_LAST_DICE', config.pausingFrames[`${currentFrame}`]);
          clearInterval(myVar);
        }
      }, 100);
    }

    create () {
      this.staticBg = this.add.image(config.boardWidth/2, config.boardHeight/2, 'board')
      this.staticBg.scaleY = 0.5;
      this.staticBg.scaleX = 0.5;
    }
}