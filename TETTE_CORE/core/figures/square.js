import { GameObject } from '../core_logic/gameObject.js';

export class Square extends GameObject {
  constructor(x, y, size, color, borderColor = null, borderWidth = 0, round = 0) {
    super(x, y, size, size, color); // Квадрат имеет одинаковую ширину и высоту
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.round = round;
  }

  // Метод для рендеринга квадрата
  render(context) {
    context.beginPath();

    // Если нужно закруглить углы
    if (this.round > 0) {
      context.roundRect(this.x, this.y, this.width, this.height, this.round);
    } else {
      context.rect(this.x, this.y, this.width, this.height);
    }

    // Основной цвет заливки
    context.fillStyle = this.color;
    context.fill();

    // Если есть граница, рисуем её
    if (this.borderColor) {
      context.strokeStyle = this.borderColor;
      context.lineWidth = this.borderWidth;
      context.stroke();
    }

    context.closePath();
  }
}