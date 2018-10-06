import phaser from 'phaser';
import board from '../assets/board.jpg';
import dice from '../assets/dice.png';
import hero from '../assets/hero.png';
import hero2 from '../assets/hero2.png';


/**
 * The sence is just for preloading some assets before the game
 * starts
 *
 * @export
 * @class PreloadScene
 * @extends {phaser.Scene}
 */
export default class PreloadScene extends phaser.Scene {
    constructor () {
        super({
            key: 'preloader'
        })
    }

    /**
     * Preload assets
     *
     * @memberof PreloadScene
     */
    preload () {
      this.load.image('board', board);
      this.load.spritesheet('dice', dice, { frameWidth: 46, frameHeight: 46 });
      this.load.spritesheet('player2', hero2, { frameWidth: 128, frameHeight: 128 });
      this.load.spritesheet('player1', hero, { frameWidth: 128, frameHeight: 128 });

      setTimeout(() => {
        // switch to the actual scene
        this.scene.start('initscene')
      }, 1500);
    }
}
