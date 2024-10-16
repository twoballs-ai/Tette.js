// index.js в папке examples/basic

import { Core, shape2d, KeyboardControl } from '../../TETTE_CORE/index.js';

const game = new Core('canvas', 'black', '2d', 'main');

(async () => {
  await game.setupControls('keyboard');

  const playerSquare = shape2d.square({
    x: 100,
    y: 100,
    size: 50,
    color: 'red',
  });

  game.sceneManager.addGameObjectToScene('main', playerSquare);


  game.start();
})();
