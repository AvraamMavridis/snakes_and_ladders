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

      this.hero = new Hero(this, 'player1', 'hero', 50);
      addPlayer('player1');
      this.hero2 = new Hero(this, 'player2', 'hero2', 60);
      addPlayer('player2');
      this.dice = new Dice(this);
    }
}