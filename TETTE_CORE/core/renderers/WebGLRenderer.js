import { Renderer } from '../core_logic/Renderer.js';

export class WebGLRenderer extends Renderer {
  constructor() {
    super('webgl'); // Указываем тип контекста
  }

  initialize(canvasElement) {
    super.initialize(canvasElement);
    // Дополнительная инициализация WebGL, если необходимо
    // Например, установка шейдеров, буферов и т.д.
  }

  clear() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
  }

  render(scene) {
    // Реализация рендеринга для WebGL
  }

  drawEntity(entity) {
    // Отрисовка сущности с использованием WebGL
  }
}
