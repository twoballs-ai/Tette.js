// PlatformerPlayerCharacter.js
import { RigidBody2d } from '../../core/physics/RigidBody2d.js';

export class PlatformerPlayerCharacter {
  constructor({
    x,
    y,
    width,
    height,
    color,
    sprite,
    animations = {},
    health = 100,
    speed = 30,
    enablePhysics = false, // Добавляем параметр enablePhysics с значением по умолчанию false
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.health = health;
    this.speed = speed;
    this.currentFrameIndex = 0;
    this.frameDuration = 100;
    this.elapsedTime = 0;
    this.facingDirection = 1;

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
      attack: animations.attack || [],
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

    // Добавляем физику только если enablePhysics === true
    if (enablePhysics) {
      // Добавляем rigidBody
      this.rigidBody = new RigidBody2d({
        mass: 1,
        friction: 0.9,
        isStatic: false,
      });

      // Инициализируем позиции
      this.rigidBody.x = this.x;
      this.rigidBody.y = this.y;
      this.rigidBody.width = this.width;
      this.rigidBody.height = this.height;
    } else {
      this.rigidBody = null; // Если физика не нужна, rigidBody не создаётся
    }
  }

  setAnimation(animationName) {
    if (
      this.animations[animationName] &&
      this.animations[animationName].length > 0
    ) {
      if (this.currentAnimation !== animationName) {
        this.currentAnimation = animationName;
        this.currentFrameIndex = 0;
        this.elapsedTime = 0;
      }
    }
  }

  update(deltaTime) {
    if (this.rigidBody) {
      // Если физика включена, обновляем позиции из rigidBody
      this.x = this.rigidBody.x;
      this.y = this.rigidBody.y;

      // Определяем направление взгляда на основе скорости
      if (this.rigidBody.velocityX > 0) {
        this.facingDirection = 1;
      } else if (this.rigidBody.velocityX < 0) {
        this.facingDirection = -1;
      }

      // Обработка анимаций на основе движения
      if (!this.rigidBody.onGround) {
        this.setAnimation('jump');
      } else if (this.rigidBody.velocityX !== 0) {
        this.setAnimation('run');
      } else {
        this.setAnimation('idle');
      }
    } else {
      // Если физика не включена, можно добавить альтернативную логику обновления
      // Например, обновление позиции на основе скорости без физики
    }

    // Обновление анимаций
    const activeFrames = this.currentAnimation
      ? this.animations[this.currentAnimation]
      : [];
    if (activeFrames.length > 0) {
      this.elapsedTime += deltaTime;
      if (this.elapsedTime >= this.frameDuration) {
        this.elapsedTime = 0;
        this.currentFrameIndex =
          (this.currentFrameIndex + 1) % activeFrames.length;
      }
    }
  }

  render(context) {
    context.save();

    // Инвертируем изображение при движении влево
    if (this.facingDirection === -1) {
      context.translate(this.x + this.width / 2, this.y);
      context.scale(-1, 1);
      context.translate(-this.width / 2, 0);
    } else {
      context.translate(this.x, this.y);
    }

    // Рисуем спрайт или анимацию
    if (this.sprite && this.sprite.complete) {
      context.drawImage(this.sprite, 0, 0, this.width, this.height);
    } else {
      const activeFrames = this.currentAnimation
        ? this.animations[this.currentAnimation]
        : [];
      if (
        activeFrames.length > 0 &&
        activeFrames[this.currentFrameIndex].complete
      ) {
        context.drawImage(
          activeFrames[this.currentFrameIndex],
          0,
          0,
          this.width,
          this.height
        );
      } else {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
      }
    }

    context.restore();
  }
}
