// ShapeFactory.js
import * as shapes2d from '../../gameObjects/shapes/2d/shape.js';
import * as shapesWebGL from '../../gameObjects/shapes/webgl/shape.js';

export function getShapeFactory(renderType) {

  if (renderType === '2d') {
    
    return shapes2d.getShapes(renderType);
  } else if (renderType === 'webgl') {
    console.log(renderType)
    return shapesWebGL.getShapes(renderType);
  } else {
    throw new Error('Unsupported render type: ' + renderType);
  }
}