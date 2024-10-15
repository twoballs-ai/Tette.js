// index.js в папке examples/basic

import { Core, shape2d, KeyboardControl } from 'tette';

const game = new Core('canvas', 'black', '2d', 'main', 'keyboard');

(async () => {
  await game.setupControls('keyboard');

  const playerSquare = shape2d.square({
    x: 100,
    y: 100,
    size: 50,
    color: 'red',
  });

  game.sceneManager.addGameObjectToScene('main', playerSquare);

  playerSquare.update = function (deltaTime) {
    const speed = 200;
    if (game.controls.isKeyPressed('ArrowLeft')) {
      this.x -= speed * deltaTime / 1000;
    }
    if (game.controls.isKeyPressed('ArrowRight')) {
      this.x += speed * deltaTime / 1000;
    }
    if (game.controls.isKeyPressed('ArrowUp')) {
      this.y -= speed * deltaTime / 1000;
    }
    if (game.controls.isKeyPressed('ArrowDown')) {
      this.y += speed * deltaTime / 1000;
    }
  };

  game.start();
})();
