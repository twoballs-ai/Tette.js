// CanvasRenderer.js
import { Renderer } from '../core_logic/Renderer.js';

export class CanvasRenderer extends Renderer {
  constructor(graphicalContext) {
    super(graphicalContext);
  }

  // Очищаем экран
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Рендерим объекты сцены
  render(scene) {
    this.clear();

    // Рендерим объекты сцены
    if (scene && scene.gameObjects) {
      scene.gameObjects.forEach(entity => {
        this.drawEntity(entity);
      });
    } else {
      console.error("No game objects found in the scene!");
    }
  }

  // Рендеринг конкретного объекта
  drawEntity(entity) {
    // Если объект имеет метод render, вызываем его
    if (entity && typeof entity.render === 'function') {
      entity.render(this.context);
    } else {
      console.error("Object does not have a render method!");
    }
  }
}
