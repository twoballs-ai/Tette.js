import { PlatformerPlayerCharacter } from '../gameObjects/characters/PlatformerPlayerCharacter.js';

export class PlatformerGameType {
  constructor(core) {
    this.core = core;
    this.sceneManager = this.core.sceneManager;

    // Пытаемся найти игрока в текущей сцене
    this.player = this.getPlayerFromCurrentScene();

    if (!this.player) {
      throw new Error("Player is not defined in PlatformerGameType. Make sure it is added to the scene.");
    }

    this.setupControls();
    this.setupPhysics();
  }

  getPlayerFromCurrentScene() {
    const currentScene = this.sceneManager.getCurrentScene();
    if (!currentScene) {
      console.error("No current scene found.");
      return null;
    }

    // Найдем объект игрока в текущей сцене по типу PlayerCharacter
    return currentScene.gameObjects.find(obj => obj instanceof PlatformerPlayerCharacter);
  }

  setupControls() {
    this.keysPressed = {};
    window.addEventListener('keydown', (e) => {
      this.keysPressed[e.key] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keysPressed[e.key] = false;
    });
  }

  setupPhysics() {
    this.gravity = 9.8; // Устанавливаем значение гравитации (м/с²)
  }

  update(deltaTime) {
    // Обновляем ссылку на игрока в текущей сцене
    this.player = this.getPlayerFromCurrentScene();
    if (!this.player) return;

    this.handleInput(deltaTime);
    this.applyPhysics(deltaTime);
  }

  handleInput(deltaTime) {
    const SPEED_SCALE = 6000 // Скорректируйте масштаб до более разумного значения
    const deltaSeconds = deltaTime / 1000;
    
    const moveSpeed = this.player.speed * SPEED_SCALE * deltaSeconds;
  
    // Проверяем нажатие клавиш и изменяем скорость игрока
    if (this.keysPressed['ArrowLeft']) {
      this.player.velocityX = -moveSpeed;
    } else if (this.keysPressed['ArrowRight']) {
      this.player.velocityX = moveSpeed;
    } else {
      this.player.velocityX = 0;
    }
  
    // Прыжок, если нажат пробел и персонаж на земле
    if (this.keysPressed[' '] && this.player.onGround) {
      this.player.velocityY = -350; // Прыжок (в пикселях/сек)
      this.player.onGround = false;
    }
  }

  applyPhysics(deltaTime) {
    if (!this.player || typeof this.player.velocityY !== 'number') {
      console.error("Player's velocityY is not defined or not a number.");
      return;
    }
  
    // Преобразуем deltaTime в секунды
    const deltaSeconds = deltaTime / 1000;
  
    // Применение гравитации
    this.player.velocityY += this.gravity * deltaSeconds * 100; // Масштабируем значение гравитации для соответствия размеру в пикселях

    // Обновляем позицию игрока с учетом физики
    this.player.update(deltaTime);
  }
}
