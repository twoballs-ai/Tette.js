// shape2d.js
import { getShapeFactory } from '../../core/core_logic/ShapeFactory.js';

export function getShape2d(renderType) {
  const shapeFactory = getShapeFactory(renderType);
  return {
    // Метод для создания квадрата
    square: shapeFactory.square,

    // Метод для создания прямоугольника
    rectangle: shapeFactory.rectangle,

    // Метод для создания круга
    circle: shapeFactory.circle,

    // Метод для создания дуги
    arc: shapeFactory.arc,

    // Метод для создания эллипса
    ellipse: shapeFactory.ellipse,

    // Метод для создания текста
    text: shapeFactory.text,

    // Метод для создания спрайта
    sprite: shapeFactory.sprite,

    // Метод для создания линии
    line: shapeFactory.line,

    // Метод для создания многоугольника
    polygon: shapeFactory.polygon,

    // Метод для создания кривой Безье
    bezierCurve: shapeFactory.bezierCurve,

    // Метод для создания звезды
    star: shapeFactory.star,

    // Метод для создания точки
    point: shapeFactory.point,
  };
}
