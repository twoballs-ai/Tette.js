// index.js
import { Core } from '../../TETTE_CORE/core/core_logic/Core.js';
import { getShape2d } from '../../TETTE_CORE/gameObjects/shapes/shape2d.js';
import { SceneManager } from '../../TETTE_CORE/core/core_logic/SceneManager.js';

const renderType = '2d'; // Change to '2d' or 'webgl' as needed

// Get shape2d object configured with renderType
const shape2d = getShape2d(renderType);

// Создаем менеджер сцен
const sceneManager = new SceneManager();

// Создаем экземпляр Core
const game = new Core({
  canvasId: 'canvas',
  renderType: renderType,
  backgroundColor: 'rgb(210, 105, 30)',
  sceneManager: sceneManager,
});

// Создаем сцены
sceneManager.createScene('level1', 'level2');

// Уровень 1 - Прямоугольник
const playerLevel1 = shape2d.rectangle({
  x: 100,
  y: 100,
  width: 50,
  height: 100,
  color: 'green',
});

playerLevel1.update = function(deltaTime) {
  this.x += deltaTime * 0.1;
  if (this.x > 700) {
    sceneManager.changeScene('level2');
  }
};

// Добавляем прямоугольник в сцену level1
sceneManager.addGameObjectToScene('level1', playerLevel1);

// Уровень 2 - Прямоугольник
const playerLevel2 = shape2d.rectangle({
  x: 50,
  y: 50,
  width: 100,
  height: 200,
  color: 'blue',
});

playerLevel2.update = function(deltaTime) {
  this.x += deltaTime * 0.05;
  if (this.x > 700) {
    console.log('You have completed level 2!');
  }
};

// Добавляем прямоугольник в сцену level2
sceneManager.addGameObjectToScene('level2', playerLevel2);

// Начинаем с уровня 1
sceneManager.changeScene('level1');

// Запуск игры
game.start();
