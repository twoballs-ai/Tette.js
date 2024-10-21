import { Core } from '../../TETTE_CORE/core/core_logic/Core.js';
import { SceneManager } from '../../TETTE_CORE/core/core_logic/SceneManager.js';
import { PlatformerPlayerCharacter } from '../../TETTE_CORE/gameObjects/characters/PlatformerPlayerCharacter.js'; 

const renderType = '2d'; 

const sceneManager = new SceneManager();

// Создаем сцену 'level1' и 'level2'
sceneManager.createScene('level1', 'level2');

// Загружаем кадры для анимации "бега"
const runAnimationFrames = [
  './run_animation/run-1.png',
  './run_animation/run-2.png',
  './run_animation/run-3.png',
  './run_animation/run-4.png',
  './run_animation/run-5.png',
  './run_animation/run-6.png',
  './run_animation/run-7.png',
  './run_animation/run-8.png',
];

// Создаем игрока с анимацией "бега"
const player = new PlatformerPlayerCharacter({
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  color: 'red',
  health: 100,
  speed: 1,
  animationFrames: runAnimationFrames, // Передаем массив кадров
  // sprite: 'path/to/single/sprite.png', // Или используем одиночный спрайт
});



// Добавляем игрока на сцену 'level1'
sceneManager.addGameObjectToScene('level1', player);

// Переключаемся на сцену 'level1'
sceneManager.changeScene('level1');

// Создаем экземпляр Core
const game = new Core({
  canvasId: 'canvas',
  renderType: renderType,
  backgroundColor: 'gray',
  sceneManager: sceneManager,
  width: window.innerWidth,
  height: window.innerHeight,
});

game.setGameType('platformer');
game.start();
