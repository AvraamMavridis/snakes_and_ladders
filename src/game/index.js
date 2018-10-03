import phaser from 'phaser';
import PreloadScene from '../scenes/PreloadScene';
import InitScene from '../scenes/InitScene';
import config from '../config';

const defaultConfig = {
    width: config.boardWidth,
    height: config.boardHeight,
    parent: 'game-container',
    scene: [
      PreloadScene,
      InitScene,
    ]
};

export function createGame(config = defaultConfig){
  return new phaser.Game(config);
};