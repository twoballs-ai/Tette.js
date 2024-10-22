import { PlatformerPlayerCharacter } from '../gameObjects/characters/PlatformerPlayerCharacter.js';
import { KeyboardControl } from '../core/controls/keyboardControl.js';
import { Physics } from '../core/physics/Physics.js';

export class PlatformerGameType {
  constructor(core) {
    this.core = core;
    this.sceneManager = this.core.sceneManager;
    this.player = this.getPlayerFromCurrentScene();

    if (!this.player) {
      throw new Error("Player is not defined in PlatformerGameType. Make sure it is added to the scene.");
    }

    this.keyboardControl = new KeyboardControl();
    this.physics = new Physics();

    this.setupControls();
  }

  getPlayerFromCurrentScene() {
    const currentScene = this.sceneManager.getCurrentScene();
    if (!currentScene) {
      console.error("No current scene found.");
      return null;
    }

    return currentScene.gameObjects.find(obj => obj instanceof PlatformerPlayerCharacter);
  }

  setupControls() {
    // Контроллер клавиатуры уже инициализирован в KeyboardControl
  }

update(deltaTime) {
  this.player = this.getPlayerFromCurrentScene();
  if (!this.player || !this.player.rigidBody) return;

  this.handleInput(deltaTime);

  // Применяем физику для игрока
  this.physics.applyGravity(this.player.rigidBody, deltaTime);
  this.physics.applyMovement(this.player.rigidBody, deltaTime);

  // Проверка столкновений с другими объектами
  const currentScene = this.sceneManager.getCurrentScene();
  const objects = currentScene.gameObjects.filter(obj => obj !== this.player);

  // Проверяем столкновения игрока с объектами
  this.physics.checkCollisions(this.player, objects);
}
  handleInput(deltaTime) {
    const SPEED_SCALE = 6000;
    const deltaSeconds = deltaTime / 1000;
    const moveSpeed = this.player.speed * SPEED_SCALE * deltaSeconds;

    if (this.keyboardControl.isKeyPressed('ArrowLeft')) {
      this.player.velocityX = -moveSpeed;
    } else if (this.keyboardControl.isKeyPressed('ArrowRight')) {
      this.player.velocityX = moveSpeed;
    } else {
      this.player.velocityX = 0;
    }

    if (this.keyboardControl.isKeyPressed(' ') && this.player.onGround) {
      this.player.velocityY = -350; // Параметр прыжка
      this.player.onGround = false;
    }
  }
}
