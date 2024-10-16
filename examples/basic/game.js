// index.js
import { Core } from '../../TETTE_CORE/core/core_logic/Core.js';
import { shape2d } from '../../TETTE_CORE/shapes/shape2d.js';
import { SceneManager } from '../../TETTE_CORE/core/core_logic/SceneManager.js';

// Создаем менеджер сцен
const sceneManager = new SceneManager();

// Создаем экземпляр Core
const game = new Core({
  canvasId: 'canvas',
  renderType: '2d',
  backgroundColor: 'black',
  sceneManager: sceneManager,
});

// Уровень 1
const playerLevel1 = shape2d.square({
  x: 100,
  y: 100,
  size: 50,
  color: 'red',
});

playerLevel1.update = function(deltaTime) {
  this.x += deltaTime * 0.1;
  if (this.x > 700) {
    sceneManager.changeScene('level2');
  }
};

const player2Level1 = shape2d.circle({
  x: 150,
  y: 150,
  radius: 50,
  color: 'green',
  borderColor: 'black',
  borderWidth: 2
});


player2Level1.update = function(deltaTime) {
  this.x += deltaTime * 0.1;
  if (this.x > 700) {
    sceneManager.changeScene('level2');
  }
};
const ellipseObj = shape2d.ellipse({
  x: 200,
  y: 400,
  rX: 100,
  rY: 50,
  color: 'blue',
  borderColor: 'white',
  borderWidth: 2
});

ellipseObj.update = function(deltaTime) {
  this.x += deltaTime * 0.1;
  if (this.x > 700) {
    sceneManager.changeScene('level2');
  }
};

sceneManager.createScene('level1');
sceneManager.addGameObjectToScene('level1', playerLevel1);
sceneManager.addGameObjectToScene('level1', player2Level1);
sceneManager.addGameObjectToScene('level1', ellipseObj);
// Уровень 2
const playerLevel2 = shape2d.rectangle({
  x: 50,
  y: 50,
  width:100,
  height:200,
  color: 'blue',
});

playerLevel2.update = function(deltaTime) {
  this.x += deltaTime * 0.05;
  if (this.x > 700) {
    console.log('You have completed level 2!');
  }
};

sceneManager.createScene('level2');
sceneManager.addGameObjectToScene('level2', playerLevel2);

// Начинаем с уровня 1
sceneManager.changeScene('level1');

// Запуск игры
game.start();
