import phaser from 'phaser';
import board from '../assets/board.jpg';
import dice from '../assets/dice.png';
import hero from '../assets/hero.png';
import hero2 from '../assets/hero2.png';


export default class PreloadScene extends phaser.Scene {
    constructor () {
        super({
            key: 'preloader'
        })
    }

    preload () {
      this.load.image('board', board);
      this.load.spritesheet('dice', dice, { frameWidth: 46, frameHeight: 46 });
      this.load.spritesheet('hero2', hero2, { frameWidth: 128, frameHeight: 128 });
      this.load.spritesheet('hero', hero, { frameWidth: 128, frameHeight: 128 });

      setTimeout(() => {
        this.scene.start('initscene')
      }, 1000);
    }
}