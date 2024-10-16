import { Renderer } from '../core/core_logic/Renderer.js';

export class CanvasRenderer extends Renderer {
  constructor() {
    super('2d'); // Указываем тип контекста
  }

  initialize(canvasElement) {
    super.initialize(canvasElement);
    // Дополнительная инициализация, если необходимо
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render(scene) {
    this.clear();
    const entities = scene.getEntities();
    entities.forEach((entity) => {
      this.drawEntity(entity);
    });
  }

  drawEntity(entity) {
    const graphicsComponent = entity.getComponent('Graphics');
    if (graphicsComponent && typeof graphicsComponent.draw === 'function') {
      graphicsComponent.draw(this.context);
    }
  }
}