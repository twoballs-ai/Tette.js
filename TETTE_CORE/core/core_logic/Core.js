import { GraphicalContext } from './GraphicalContext.js';

export class Core {
  constructor({ canvasId, renderType = '2d', backgroundColor = 'black', sceneManager }) {
    this.graphicalContext = new GraphicalContext(canvasId, renderType, backgroundColor); // Передаем цвет фона
    this.renderer = this.graphicalContext.getRenderer();
    this.sceneManager = sceneManager;
    this.lastTime = 0;
    this.loop = this.loop.bind(this);
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.sceneManager.update(deltaTime);
    this.renderer.render(this.sceneManager.getCurrentScene());

    requestAnimationFrame(this.loop);
  }
}
