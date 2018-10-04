import phaser from 'phaser';
import PreloadScene from '../scenes/PreloadScene';
import InitScene from '../scenes/InitScene';
import config from '../config';

const defaultConfig = {
    width: config.boardWidth,
    height: config.boardHeight,
    scene: [
      PreloadScene,
      InitScene,
    ]
};

export function createGame(parent){
  const config = {
    ...defaultConfig,
    parent,
  }
  const game = new phaser.Game(config);
  return game;
};
