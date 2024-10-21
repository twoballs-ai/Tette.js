export class PlatformerPlayerCharacter {
  constructor({ x, y, width, height, color, sprite, animationFrames = [], health = 100, speed = 30 }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocityY = 0;
    this.velocityX = 0;
    this.onGround = false;
    this.health = health;
    this.speed = speed;
    this.currentFrameIndex = 0;
    this.animationFrames = [];
    this.frameDuration = 100;
    this.elapsedTime = 0;
    this.facingDirection = 1; // 1 для вправо, -1 для влево

    if (sprite) {
      this.sprite = new Image();
      this.sprite.src = sprite;
    }

    if (animationFrames.length > 0) {
      this.animationFrames = animationFrames.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });
    }
  }

  update(deltaTime) {
    const deltaSeconds = deltaTime / 1000;

    // Обновляем позицию на основе скорости
    this.x += this.velocityX * deltaSeconds;
    this.y += this.velocityY * deltaSeconds;

    // Проверяем направление движения и устанавливаем facingDirection
    if (this.velocityX > 0) {
      this.facingDirection = 1; // Вправо
    } else if (this.velocityX < 0) {
      this.facingDirection = -1; // Влево
    }

    // Ограничение снизу (симуляция пола)
    const groundLevel = 500;
    if (this.y >= groundLevel) {
      this.y = groundLevel;
      this.velocityY = 0;
      this.onGround = true;
    }

    // Обновляем текущий кадр анимации только если персонаж движется
    if (this.animationFrames.length > 0 && this.velocityX !== 0) {
      this.elapsedTime += deltaTime;
      if (this.elapsedTime >= this.frameDuration) {
        this.elapsedTime = 0;
        this.currentFrameIndex = (this.currentFrameIndex + 1) % this.animationFrames.length;
      }
    }
  }

  render(context) {
    context.save(); // Сохраняем текущий контекст

    // Если facingDirection -1, отражаем изображение по оси X
    if (this.facingDirection === -1) {
      context.translate(this.x + this.width / 2, this.y);
      context.scale(-1, 1); // Отражение по оси X
      context.translate(-this.width / 2, 0);
    } else {
      context.translate(this.x, this.y);
    }

    if (this.animationFrames.length > 0 && this.animationFrames[this.currentFrameIndex].complete) {
      context.drawImage(this.animationFrames[this.currentFrameIndex], 0, 0, this.width, this.height);
    } else if (this.sprite && this.sprite.complete) {
      context.drawImage(this.sprite, 0, 0, this.width, this.height);
    } else {
      context.fillStyle = this.color;
      context.fillRect(0, 0, this.width, this.height);
    }

    context.restore(); // Восстанавливаем контекст
  }
}
