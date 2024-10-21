import { Core } from '../../TETTE_CORE/core/core_logic/Core.js';
import { SceneManager } from '../../TETTE_CORE/core/core_logic/SceneManager.js';
import { PlatformerPlayerCharacter } from '../../TETTE_CORE/gameObjects/characters/PlatformerPlayerCharacter.js'; 
import { getShape2d } from '../../TETTE_CORE/gameObjects/shapes/shape2d.js';


// Get shape2d object configured with renderType

const renderType = '2d'; 
const shape2d = getShape2d(renderType);
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
  speed: 3,
  animations: {
    // idle: ['./idle_animation/idle-1.png', './idle_animation/idle-2.png'],
    run: runAnimationFrames,
    // jump: ['./jump_animation/jump-1.png'],
    // attack: ['./attack_animation/attack-1.png', './attack_animation/attack-2.png']
  }
});

const myImage = new Image();
myImage.src = './floor.png';

myImage.onload = () => {
  const mySprite = shape2d.sprite({
    image: myImage, // Используем загруженное изображение
    x: 200,
    y: 550,
    width: 300,
    height: 200,
    // preserveAspectRatio: true, // Сохранение пропорций
    repeatX: true, // Повторение по горизонтали
    repeatY: true, // Не повторять по вертикали
    repeatCountX: 1, // Повторить 5 раз по горизонтали
    repeatCountY: 1, // Не повторять по вертикали
  });

  // Добавляем спрайт на сцену 'level1'
  sceneManager.addGameObjectToScene('level1', mySprite);
};

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
