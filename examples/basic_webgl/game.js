// index.js
import { Core } from '../../TETTE_CORE/core/core_logic/Core.js';
import { getShape2d } from '../../TETTE_CORE/gameObjects/shapes/shape2d.js';
import { SceneManager } from '../../TETTE_CORE/core/core_logic/SceneManager.js';


const renderType = 'webgl'; // Change to '2d' or 'webgl' as needed

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
  // gameType: 'platformer',
});

sceneManager.createScene('level1','level2');
const playerLevel1 = shape2d.rectangle({
  x: 50,
  y: 50,
  width:100,
  height:200,
  color: 'rgb(147, 197, 114)',
});

playerLevel1.update = function(deltaTime) {

  this.x += deltaTime * 0.1;
  console.log(this.x)
  if (this.x > 700) {
    sceneManager.changeScene('level2');
  }
};
sceneManager.addGameObjectToScene('level1', playerLevel1);

// Уровень 2
const playerLevel2 = shape2d.rectangle({
  x: 150,
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


// sceneManager.createScene('level2');
sceneManager.addGameObjectToScene('level2',  playerLevel2);
// sceneManager.addGameObjectToScene('level2', mySprite);

// Начинаем с уровня 1
sceneManager.changeScene('level1');

// Запуск игры
game.start();
