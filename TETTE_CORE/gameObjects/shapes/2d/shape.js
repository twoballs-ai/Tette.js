// shapes.js (может быть в папке 2d или webgl, в зависимости от реализации)
import { Rectangle } from './Rectangle.js';
import { Circle } from './Circle.js';
import { Ellipse } from './Ellipse.js';
import { Text } from './Text.js';
import { Sprite } from './Sprite.js';
import { Line } from './Line.js';
import { Polygon } from './Polygon.js';
import { BezierCurve } from './BezierCurve.js';
import { Star } from './Star.js';

// Функция для создания квадрата
export function square(params) {
  return new Rectangle(
    params.x,
    params.y,
    params.size,
    params.size,
    params.color,
    params.borderColor,
    params.borderWidth,
    params.round
  );
}

// Функция для создания прямоугольника
export function rectangle(params) {
  return new Rectangle(
    params.x,
    params.y,
    params.width,
    params.height,
    params.color,
    params.borderColor,
    params.borderWidth
  );
}

// Функция для создания круга
export function circle(params) {
  return new Circle(
    params.x,
    params.y,
    params.radius,
    0,
    2 * Math.PI,
    params.color,
    params.borderColor,
    params.borderWidth
  );
}

// Функция для создания дуги
export function arc(params) {
  return new Circle(
    params.x,
    params.y,
    params.radius,
    params.startAngle,
    params.endAngle,
    params.color,
    params.borderColor,
    params.borderWidth
  );
}

// Функция для создания эллипса
export function ellipse(params) {
  return new Ellipse(
    params.x,
    params.y,
    params.rX,
    params.rY,
    params.rot || 0,
    params.start || 0,
    params.end || 2 * Math.PI,
    params.color,
    params.borderColor,
    params.borderWidth
  );
}

// Функция для создания текста
export function text(params) {
  return new Text(
    params.text,
    params.x,
    params.y,
    params.fontsize || 16,
    params.color || 'black',
    params.fontFamily || 'Arial',
    params.borderColor,
    params.borderWidth
  );
}

// Функция для создания спрайта
export function sprite(params) {
  return new Sprite(
    params.image,
    params.x,
    params.y,
    params.width,
    params.height,
    params.preserveAspectRatio || false
  );
}

// Функция для создания линии
export function line(params) {
  return new Line(
    params.x1,
    params.y1,
    params.x2,
    params.y2,
    params.color || 'black',
    params.widthline || 1,
    params.lineRounded || 'butt'
  );
}

// Функция для создания многоугольника
export function polygon(params) {
  return new Polygon(
    params.vertices,
    params.color,
    params.borderColor,
    params.borderWidth
  );
}

// Функция для создания кривой Безье
export function bezierCurve(params) {
  return new BezierCurve(
    params.startX,
    params.startY,
    params.controlX1,
    params.controlY1,
    params.controlX2,
    params.controlY2,
    params.endX,
    params.endY,
    params.color,
    params.widthline || 1
  );
}

// Функция для создания звезды
export function star(params) {
  return new Star(
    params.x,
    params.y,
    params.radius,
    params.points,
    params.color,
    params.borderColor,
    params.borderWidth
  );
}

// Функция для создания точки
export function point(params) {
  return new Circle(
    params.x,
    params.y,
    params.size || 5,
    0,
    2 * Math.PI,
    params.color || 'black'
  );
}
