export class Physics {
  constructor(gravity = 9.8) {
    this.gravity = gravity;
  }

  applyGravity(rigidBody, deltaTime) {
    if (!rigidBody || rigidBody.isStatic) return; // Проверяем, есть ли rigidBody и не является ли объект статическим

    const deltaSeconds = deltaTime / 1000;
    rigidBody.velocityY += this.gravity * deltaSeconds * 100; // Масштабируем значение гравитации
  }

  applyMovement(rigidBody, deltaTime) {
    if (!rigidBody || rigidBody.isStatic) return; // Проверяем, есть ли rigidBody и не является ли объект статическим

    const deltaSeconds = deltaTime / 1000;
    rigidBody.velocityX *= rigidBody.friction; // Применение трения к движению
    rigidBody.velocityY *= rigidBody.friction;

    rigidBody.x += rigidBody.velocityX * deltaSeconds;
    rigidBody.y += rigidBody.velocityY * deltaSeconds;
  }

  checkCollisions(player, objects) {
    objects.forEach(object => {
      if (object.rigidBody && this.isColliding(player, object)) { // Проверяем наличие rigidBody
        this.resolveCollision(player, object);
      }
    });
  }

  isColliding(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }

  resolveCollision(player, object) {
    if (object.rigidBody.isStatic) {
      // Столкновение с полом или статическим объектом
      if (player.rigidBody.velocityY > 0) { // Если игрок падает
        player.rigidBody.y = object.y - player.height; // Останавливаем на поверхности объекта
        player.rigidBody.velocityY = 0; // Обнуляем вертикальную скорость
        player.rigidBody.onGround = true;
      }
    }
  }
}
