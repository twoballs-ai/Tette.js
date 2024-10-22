export class RigidBody2d {
    constructor({ mass = 1, friction = 0.9, isStatic = false } = {}) {
      this.mass = mass;
      this.friction = friction;
      this.isStatic = isStatic; // Статический объект не двигается (например, пол)
      this.velocityX = 0;
      this.velocityY = 0;
      this.onGround = false;
    }
  }