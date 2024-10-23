// PlatformerGameType.js
import { GameType } from './GameType.js';
import { PlatformerPlayerCharacter } from '../gameObjects/characters/PlatformerPlayerCharacter.js';
import { KeyboardControl } from '../core/controls/keyboardControl.js';

export class PlatformerGameType extends GameType {
  constructor(core) {
    super(core);
    this.player = this.getPlayerFromCurrentScene();
    this.keyboardControl = new KeyboardControl();
  }

  getPlayerFromCurrentScene() {
    const currentScene = this.sceneManager.getCurrentScene();
    if (!currentScene) {
      console.error("No current scene found.");
      return null;
    }
    return currentScene.gameObjects.find(obj => obj instanceof PlatformerPlayerCharacter);
  }

  handleGameTypeSpecificLogic(deltaTime) {
    // Обработка ввода для игрока
    if (this.player && this.player.rigidBody) {
      this.handleInput(deltaTime);
    }
  }

  handleInput(deltaTime) {
    const rigidBody = this.player.rigidBody;
    const SPEED_SCALE = 6000;
    const deltaSeconds = deltaTime / 1000;
    const moveSpeed = this.player.speed * SPEED_SCALE * deltaSeconds;

    if (this.keyboardControl.isKeyPressed('ArrowLeft')) {
      rigidBody.velocityX = -moveSpeed;
    } else if (this.keyboardControl.isKeyPressed('ArrowRight')) {
      rigidBody.velocityX = moveSpeed;
    } else {
      rigidBody.velocityX = 0;
    }

    if (this.keyboardControl.isKeyPressed(' ') && rigidBody.onGround) {
      rigidBody.velocityY = -600; // Скорость прыжка
      rigidBody.onGround = false;
    }
  }
}
