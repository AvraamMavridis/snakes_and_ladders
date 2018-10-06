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

/**
 * Create the game
 *
 * @export
 * @param {DOM.Element} parent
 * @returns {Phaser.Game}
 */
export function createGame(parent){
  const config = {
    ...defaultConfig,
    parent,
  }
  return new phaser.Game(config);
};
