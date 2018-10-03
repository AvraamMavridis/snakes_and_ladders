import phaser from 'phaser';
import board from '../assets/board.jpg';
import dice from '../assets/dice.png';

export default class PreloadScene extends phaser.Scene {
    constructor () {
        super({
            key: 'preloader'
        })
    }

    preload () {
      this.load.image('board', board);
      this.load.spritesheet('dice', dice, { frameWidth: 46, frameHeight: 46 });

      setTimeout(() => {
        this.scene.start('initscene')
      }, 1000);
    }
}