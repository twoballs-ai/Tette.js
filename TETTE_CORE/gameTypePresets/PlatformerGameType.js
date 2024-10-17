// gameTypes/PlatformerGameType.js
import { PlayerCharacter } from '../gameObjects/characters/PlayerCharacter.js';
export class PlatformerGameType {
  constructor(core) {
    this.core = core;
    this.setupControls();
    this.setupPhysics();
    this.setupPlayer();
  }

  setupControls() {
    // Настройка управления для платформера
    this.keysPressed = {};
    window.addEventListener('keydown', (e) => {
      this.keysPressed[e.key] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keysPressed[e.key] = false;
    });
  }

  setupPhysics() {
    // Инициализация физики
    this.gravity = 0.5;
  }

  setupPlayer() {
    // Создание игрока и добавление его на сцену
    this.player = new PlayerCharacter(100, 100, 50, 50, 'red');
    this.core.sceneManager.addGameObjectToScene('level1', this.player);
  }

  update(deltaTime) {
    // Обновление состояния игры
    this.handleInput(deltaTime);
    this.applyPhysics(deltaTime);
  }

  handleInput(deltaTime) {
    // Обработка ввода пользователя
    const speed = deltaTime * 0.1;
    if (this.keysPressed['ArrowLeft']) {
      this.player.x -= speed;
    }
    if (this.keysPressed['ArrowRight']) {
      this.player.x += speed;
    }
    if (this.keysPressed['Space'] && this.player.onGround) {
      this.player.velocityY = -10; // Прыжок
      this.player.onGround = false;
    }
  }

  applyPhysics(deltaTime) {
    // Применение физики к игроку
    this.player.velocityY += this.gravity;
    this.player.y += this.player.velocityY;

    // Проверка столкновения с землёй
    const groundLevel = 500; // Уровень земли
    if (this.player.y >= groundLevel) {
      this.player.y = groundLevel;
      this.player.velocityY = 0;
      this.player.onGround = true;
    }
  }
}
