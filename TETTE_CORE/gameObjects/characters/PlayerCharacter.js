// gameObjects/PlayerCharacter.js
import { Rectangle } from '../shapes/2d/Rectangle.js';

export class PlayerCharacter extends Rectangle {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.velocityY = 0;
    this.onGround = false;
  }
}
