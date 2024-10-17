// shapeFactory.js
import * as shapes2d from '../../gameObjects/shapes/2d/shape.js';
import * as shapesWebGL from '../../gameObjects/shapes/webgl/shape.js';

export function getShapeFactory(renderType) {
  if (renderType === '2d') {
    return shapes2d;
  } else if (renderType === 'webgl') {
    return shapesWebGL;
  } else {
    throw new Error('Unsupported render type: ' + renderType);
  }
}
