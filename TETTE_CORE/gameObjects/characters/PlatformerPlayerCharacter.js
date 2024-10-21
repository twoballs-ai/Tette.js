export class PlatformerPlayerCharacter {
  constructor({ x, y, width, height, color, sprite, animations = {}, health = 100, speed = 30 }) {
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
    this.frameDuration = 100;
    this.elapsedTime = 0;
    this.facingDirection = 1; // 1 для вправо, -1 для влево

    // Проверяем наличие спрайта
    this.sprite = sprite ? new Image() : null;
    if (this.sprite) {
      this.sprite.src = sprite;
    }

    // Устанавливаем предустановленные анимации
    this.animations = {
      idle: animations.idle || [],
      run: animations.run || [],
      jump: animations.jump || [],
      attack: animations.attack || []
    };

    if (this.animations.idle.length === 0) {
      this.animations.idle = this.animations.run;
    }

    this.currentAnimation = this.sprite ? null : 'idle';

    for (let key in this.animations) {
      if (this.animations[key].length > 0) {
        this.animations[key] = this.animations[key].map((src) => {
          const img = new Image();
          img.src = src;
          return img;
        });
      }
    }
  }

  setAnimation(animationName) {
    if (this.animations[animationName] && this.animations[animationName].length > 0) {
      if (this.currentAnimation !== animationName) {
        console.log(`Смена анимации на: ${animationName}`);
        this.currentAnimation = animationName;
        this.currentFrameIndex = 0;
        this.elapsedTime = 0;
      }
    }
  }
  
  update(deltaTime) {
    const deltaSeconds = deltaTime / 1000;
    this.x += this.velocityX * deltaSeconds;
    this.y += this.velocityY * deltaSeconds;

    if (this.velocityX > 0) {
      this.facingDirection = 1;
    } else if (this.velocityX < 0) {
      this.facingDirection = -1;
    }

    // Ограничение снизу (симуляция пола)
    const groundLevel = 500;
    if (this.y >= groundLevel) {
      this.y = groundLevel;
      this.velocityY = 0;
      this.onGround = true;
    }

    if (this.velocityX !== 0) {
      this.setAnimation('run');
    } else if (this.velocityY !== 0 && !this.onGround) {
      this.setAnimation('jump');
    } else {
      this.setAnimation('idle');
    }

    const activeFrames = this.currentAnimation ? this.animations[this.currentAnimation] : [];
    if (activeFrames.length > 0) {
      this.elapsedTime += deltaTime;
      if (this.elapsedTime >= this.frameDuration) {
        this.elapsedTime = 0;
        this.currentFrameIndex = (this.currentFrameIndex + 1) % activeFrames.length;
      }
    }
  }

  render(context) {
    context.save();

    if (this.facingDirection === -1) {
      context.translate(this.x + this.width / 2, this.y);
      context.scale(-1, 1);
      context.translate(-this.width / 2, 0);
    } else {
      context.translate(this.x, this.y);
    }

    if (this.sprite && this.sprite.complete) {
      context.drawImage(this.sprite, 0, 0, this.width, this.height);
    } else {
      const activeFrames = this.currentAnimation ? this.animations[this.currentAnimation] : [];
      if (activeFrames.length > 0 && activeFrames[this.currentFrameIndex].complete) {
        context.drawImage(activeFrames[this.currentFrameIndex], 0, 0, this.width, this.height);
      } else {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
      }
    }

    context.restore();
  }
}
