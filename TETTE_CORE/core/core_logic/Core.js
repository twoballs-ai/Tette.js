import { GraphicalContext } from './GraphicalContext.js';
import { CanvasRenderer } from '../renderers/CanvasRenderer.js';
export class Core {
  constructor({ canvasId, renderType = '2d', backgroundColor = 'black', sceneManager }) {
    // Создаем графический контекст
    this.graphicalContext = new GraphicalContext(canvasId, renderType);
    
    // Передаем графический контекст в рендерер
    this.renderer = new CanvasRenderer(this.graphicalContext);
    
    this.backgroundColor = backgroundColor;
    this.sceneManager = sceneManager;
    this.lastTime = 0;
    this.loop = this.loop.bind(this); // Привязываем метод цикла
  }

  start() {
    requestAnimationFrame(this.loop); // Запуск игрового цикла
  }

  loop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Обновляем сцену
    this.sceneManager.update(deltaTime);

    // Рендерим текущую сцену
    this.renderer.render(this.sceneManager.getCurrentScene());

    requestAnimationFrame(this.loop);
  }
}