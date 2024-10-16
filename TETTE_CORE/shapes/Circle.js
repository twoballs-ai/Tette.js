import { GameObject } from '../core/core_logic/gameObject.js';

export class Circle extends GameObject {
  constructor(x, y, radius, color, borderColor = null, borderWidth = 0) {
    super(x, y, radius * 2, radius * 2, color); // Для круга ширина и высота - это диаметр
    this.radius = radius;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }

  // Метод для рендеринга круга
  render(context) {
    context.beginPath();

    // Рисуем круг
    context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);

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
