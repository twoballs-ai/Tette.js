import { Core } from '../../TETTE_CORE/core/core_logic/Core.js';
import { SceneManager } from '../../TETTE_CORE/core/core_logic/SceneManager.js';
import { PlatformerPlayerCharacter } from '../../TETTE_CORE/gameObjects/characters/PlatformerPlayerCharacter.js'; 
import { getShape2d } from '../../TETTE_CORE/gameObjects/shapes/shape2d.js';

// Получаем объект shape2d, настроенный с renderType
const renderType = '2d'; 
const shape2d = getShape2d(renderType);
const sceneManager = new SceneManager();

// Создаем сцены 'level1' и 'level2'
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

// Создаем игрока с анимацией "бега" и включенной физикой
const player = new PlatformerPlayerCharacter({
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  color: 'red',
  health: 100,
  speed: 3,
  enablePhysics: true, // Включаем физику для игрока
  animations: {
    run: runAnimationFrames,
  }
});

// Создаем изображение пола
const myImage = new Image();
myImage.src = './floor.png';

// Создаем пол с включенной физикой
const mySpriteGrid = shape2d.spriteGrid({
  image: myImage,
  x: 0,
  y: 600,
  width: 160,
  height: 150,
  repeatX: 10,
  spacingX: 0,
  enablePhysics: true, // Включаем физику для пола
  isStatic: true,      // Делаем пол статичным объектом
});
const nebo = new Image();
nebo.src = './nebo.jpg';

nebo.onload = () => {
  const neboSprite = shape2d.sprite({
    image: nebo, // Используем загруженное изображение
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
    // preserveAspectRatio: true, // Сохраняем пропорции
    // enablePhysics: true, // Включаем физику
    isStatic: false,     // Делаем объект динамическим
  });

  // Добавляем спрайт в уровень 1
  sceneManager.addGameObjectToScene('level1', neboSprite);
};
const boxImage = new Image();
boxImage.src = './box.jpg';

boxImage.onload = () => {
  const mySprite = shape2d.sprite({
    image: boxImage, // Используем загруженное изображение
    x: 500,
    y: 150,
    width: 100,
    height: 100,
    preserveAspectRatio: true, // Сохраняем пропорции
    enablePhysics: true, // Включаем физику
    isStatic: false,     // Делаем объект динамическим
  });

  // Добавляем спрайт в уровень 1
  sceneManager.addGameObjectToScene('level1', mySprite);
};
// Добавляем игрока на сцену 'level1'
sceneManager.addGameObjectToScene('level1', player,mySpriteGrid );

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

// Устанавливаем тип игры 'platformer' (включает физику)
game.setGameType('platformer');

// Запускаем игру
game.start();
