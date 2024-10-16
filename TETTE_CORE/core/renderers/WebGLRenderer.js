import { Renderer } from '../core_logic/Renderer.js';

export class WebGLRenderer extends Renderer {
  constructor(graphicalContext, backgroundColor) {
    super(graphicalContext);
    this.backgroundColor = backgroundColor;
    if (!this.backgroundColor) {
      throw new Error('Background color is required for WebGLRenderer.'); // Ошибка, если цвет фона не передан
    }

    // Инициализация WebGL
    this.initializeWebGL();
  }

  initializeWebGL() {
    // Устанавливаем цвет фона
    this.context.clearColor(
      this.hexToR(this.backgroundColor) / 255,
      this.hexToG(this.backgroundColor) / 255,
      this.hexToB(this.backgroundColor) / 255,
      1.0
    );
  }

  // Конвертация HEX-цвета в RGB
  hexToR(hex) {
    return parseInt(hex.slice(1, 3), 16);
  }

  hexToG(hex) {
    return parseInt(hex.slice(3, 5), 16);
  }

  hexToB(hex) {
    return parseInt(hex.slice(5, 7), 16);
  }

  // Очищаем экран
  clear() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT); // Очищаем цвет и глубину
  }

  // Рендерим объекты сцены
  render(scene) {
    this.clear();

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
