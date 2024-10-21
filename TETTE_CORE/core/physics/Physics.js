export class Physics {
    constructor(gravity = 9.8) {
      this.gravity = gravity;
    }
  
    applyGravity(player, deltaTime) {
      const deltaSeconds = deltaTime / 1000;
      player.velocityY += this.gravity * deltaSeconds * 100; // Масштабируем значение гравитации
    }
  
    applyMovement(player, deltaTime) {
      const deltaSeconds = deltaTime / 1000;
      player.x += player.velocityX * deltaSeconds;
      player.y += player.velocityY * deltaSeconds;
      
      // Ограничение снизу (симуляция пола)
      const groundLevel = 500;
      if (player.y >= groundLevel) {
        player.y = groundLevel;
        player.velocityY = 0;
        player.onGround = true;
      }
    }
  }
  