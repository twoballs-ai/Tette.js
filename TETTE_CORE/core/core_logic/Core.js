// Core.js
import { GraphicalContext } from './GraphicalContext.js';
import { GameTypeFactory } from './GameTypeFactory.js';
import { ColorMixin } from './ColorMixin.js';

export class Core {
  constructor({ canvasId, renderType = '2d', backgroundColor = 'black', sceneManager, width = 900, height = 600 }) {
    const normalizedBackgroundColor = ColorMixin(backgroundColor, renderType);

    this.graphicalContext = new GraphicalContext(canvasId, renderType, normalizedBackgroundColor, width, height);
    this.renderer = this.graphicalContext.getRenderer();
    this.sceneManager = sceneManager;
    this.lastTime = 0;
    this.loop = this.loop.bind(this);
    this.gameTypeInstance = null;
  }

  setGameType(gameType) {
    if (gameType) {
      console.log(`Установка типа игры: ${gameType}`);
      this.gameTypeInstance = new GameTypeFactory(this).loadGameType(gameType);
      if (!this.gameTypeInstance) {
        console.error(`Ошибка: тип игры ${gameType} не загружен.`);
      }
    }
  }

  async start() {
    // Инициализация рендерера, если требуется
    if (typeof this.renderer.init === 'function') {
      await this.renderer.init();
    }

    // Если gameTypeInstance определен, вызываем его start (если есть)
    if (this.gameTypeInstance && typeof this.gameTypeInstance.start === 'function') {
      this.gameTypeInstance.start();
    }

    requestAnimationFrame(this.loop);
  }

  loop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Обновляем тип игры, если он есть
    if (this.gameTypeInstance && this.gameTypeInstance.update) {
      this.gameTypeInstance.update(deltaTime);
    }

    // Обновляем менеджер сцен
    this.sceneManager.update(deltaTime);

    // Рендерим текущую сцену
    this.renderer.render(this.sceneManager.getCurrentScene());

    requestAnimationFrame(this.loop);
  }
}
