import { Core } from '../../TETTE_CORE/core/core_logic/core.js';
import { shape2d } from '../../TETTE_CORE/core/figures/shape2d.js';

// Инициализация движка
const game = new Core('gameCanvas', 'white', '2d');

// Ссылки на элементы интерфейса
const addSquareBtn = document.getElementById('addSquareBtn');
const addCircleBtn = document.getElementById('addCircleBtn');
const sizeSlider = document.getElementById('sizeSlider');
const colorPicker = document.getElementById('colorPicker');
const clearCanvasBtn = document.getElementById('clearCanvasBtn');

let selectedColor = colorPicker.value;
let selectedSize = sizeSlider.value;

// Обновление цвета
colorPicker.addEventListener('input', (e) => {
  selectedColor = e.target.value;
});

// Обновление размера
sizeSlider.addEventListener('input', (e) => {
  selectedSize = e.target.value;
});

// Добавление квадрата
addSquareBtn.addEventListener('click', () => {
  const square = shape2d.square({
    x: Math.random() * game.canvas.width,
    y: Math.random() * game.canvas.height,
    width: selectedSize,
    height: selectedSize,
    color: selectedColor
  });
  game.sceneManager.addGameObjectToScene('main', square);
});

// Добавление окружности
addCircleBtn.addEventListener('click', () => {
  const circle = shape2d.circle({
    x: Math.random() * game.canvas.width,
    y: Math.random() * game.canvas.height,
    radius: selectedSize / 2,
    color: selectedColor
  });
  game.sceneManager.addGameObjectToScene('main', circle);
});

// Очистка сцены
clearCanvasBtn.addEventListener('click', () => {
  game.sceneManager.clearScene('main');
});

// Запуск игрового цикла
game.start();
