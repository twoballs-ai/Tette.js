import { Square } from './square.js';
// import { Circle } from './circle.js';
// import { Rectangle } from './rectangle.js';

const shape2d = {
  // Метод для создания квадрата через объект параметров
  square: function ({ x, y, width, height, color, borderColor = null, borderWidth = 0, round = 0 }) {
    return new Square(x, y, width, color, borderColor, borderWidth, round);
  },

  // Аналогично можно реализовать создание круга и прямоугольника
  // circle: function ({ x, y, radius, color, borderColor = null, borderWidth = 0 }) {
  //   return new Circle(x, y, radius, color, borderColor, borderWidth);
  // },

  // rectangle: function ({ x, y, width, height, color, borderColor = null, borderWidth = 0 }) {
  //   return new Rectangle(x, y, width, height, color, borderColor, borderWidth);
  // },
};

export { shape2d };