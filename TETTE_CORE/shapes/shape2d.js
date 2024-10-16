import { Rectangle } from './Rectangle.js';  
import { Circle } from './Circle.js';
import { Ellipse } from './Ellipse.js';  // Подключаем класс Ellipse

const shape2d = {
  // Метод для создания квадрата
  square: function ({ x, y, size, color, borderColor = null, borderWidth = 0, round = 0 }) {
    return new Rectangle(x, y, size, size, color, borderColor, borderWidth, round);
  },

  // Метод для создания прямоугольника
  rectangle: function ({ x, y, width, height, color, borderColor = null, borderWidth = 0 }) {
    return new Rectangle(x, y, width, height, color, borderColor, borderWidth);
  },

  // Метод для создания круга
  circle: function ({ x, y, radius, color, borderColor = null, borderWidth = 0 }) {
    return new Circle(x, y, radius, color, borderColor, borderWidth);
  },

  // Метод для создания эллипса
  ellipse: function ({ x, y, rX, rY, rot = 0, start = 0, end = 2, color, borderColor = null, borderWidth = 0 }) {
    return new Ellipse(x, y, rX, rY, rot, start, end, color, borderColor, borderWidth);
  }
};

export { shape2d };
