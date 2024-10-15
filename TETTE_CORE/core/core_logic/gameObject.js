export class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x;  // Позиция по X
    this.y = y;  // Позиция по Y
    this.width = width;  // Ширина объекта
    this.height = height;  // Высота объекта
    this.color = color;  // Цвет объекта
    this.speedX = 0;  // Скорость перемещения по оси X
    this.speedY = 0;  // Скорость перемещения по оси Y
  }

  // Метод для обновления позиции объекта
  update(deltaTime) {
    // Обновляем позицию на основе скорости и времени
    this.x += this.speedX * deltaTime / 1000;  // Скорость в пикселях/секунду
    this.y += this.speedY * deltaTime / 1000;
  }

  // Метод для рендеринга объекта (будет переопределяться в дочерних классах)
  render(context) {
    // Этот метод будет реализован в конкретных примитивах (например, квадрат, круг)
    // context — это контекст 2D/WebGL, передаваемый для рендеринга
  }
}
