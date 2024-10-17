import { GraphicalContext } from './GraphicalContext.js';
import { GameTypeFactory } from './GameTypeFactory.js';
import { ColorMixin } from './ColorMixin.js'; // Импортируем миксин для цветов

export class Core {
  constructor({ canvasId, renderType = '2d', backgroundColor = 'black', sceneManager, gameType = null }) {
    // Преобразуем цвет фона в зависимости от типа рендера (2D или WebGL)
    const normalizedBackgroundColor = ColorMixin(backgroundColor, renderType);

    this.graphicalContext = new GraphicalContext(canvasId, renderType, normalizedBackgroundColor); 
    this.renderer = this.graphicalContext.getRenderer();
    this.sceneManager = sceneManager;
    this.lastTime = 0;
    this.loop = this.loop.bind(this);

    // Создаём экземпляр GameTypeFactory и передаём ему текущий экземпляр Core
    this.gameTypeFactory = new GameTypeFactory(this);

    // Если указан тип игры, загружаем его через фабрику
    if (gameType) {
      this.gameTypeInstance = this.gameTypeFactory.loadGameType(gameType);
    }
  }

  start() {
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
