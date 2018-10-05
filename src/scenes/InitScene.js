import phaser from 'phaser';
import config from '../config';
import { addPlayer } from '../store/actions';
import Hero from '../gameObjects/Hero';
import Dice from '../gameObjects/Dice';

export default class InitScene extends phaser.Scene {
    constructor () {
        super({
            key: 'initscene'
        })
    }

    create () {
      this.staticBg = this.add.image(config.boardWidth/2, config.boardHeight/2, 'board')
      this.staticBg.scaleY = 0.5;
      this.staticBg.scaleX = 0.5;

      this.hero = new Hero(this, 60, config.boardHeight - 75, 'player1', 0);
      addPlayer('player1');
      this.hero2 = new Hero(this, 50, config.boardHeight - 75, 'player2', 0);
      addPlayer('player2');
      this.dice = new Dice(this, 100, 100, 'dice', 0);
    }
}
