import { GameObject } from '../gameObject.js';

export class Sprite extends GameObject {
  constructor(
    image,
    x,
    y,
    width,
    height,
    preserveAspectRatio = false,
    enablePhysics = false,
    isStatic = false
  ) {
    // Передаем параметры через объект, как ожидает GameObject
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      color: null,          // Цвет можно задать null, так как это спрайт
      enablePhysics: enablePhysics,
      isStatic: isStatic
    });

    this.image = image;
    this.preserveAspectRatio = preserveAspectRatio;
  }

  // Метод для обновления позиции объекта
  update(deltaTime) {
    if (this.rigidBody) {
      // Обновляем позиции из физического тела
      this.x = this.rigidBody.x;
      this.y = this.rigidBody.y;
    }
  }

  // Метод для рендеринга спрайта
  render(context) {
    if (this.image.complete) {
      let renderWidth = this.width;
      let renderHeight = this.height;

      if (this.preserveAspectRatio) {
        const aspectRatio = this.image.width / this.image.height;
        if (this.width / this.height > aspectRatio) {
          renderWidth = this.height * aspectRatio;
        } else {
          renderHeight = this.width / aspectRatio;
        }
      }

      context.drawImage(this.image, this.x, this.y, renderWidth, renderHeight);
    }
  }
}
