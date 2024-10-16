export class SceneManager {
  constructor() {
      this.scenes = {}; // Словарь для хранения сцен по имени
      this.currentScene = null; // Текущая сцена
  }

  createScene(...names) {
    names.forEach(name => {
        if (!this.scenes[name]) {
            this.scenes[name] = { gameObjects: [] };
            console.log(`Сцена "${name}" создана.`);
        } else {
            console.warn(`Сцена "${name}" уже существует.`);
        }
    });
}

  changeScene(name) {
      if (this.scenes[name]) {
          this.currentScene = this.scenes[name];
          console.log(`Переключено на сцену "${name}".`);
      } else {
          console.error(`Сцена "${name}" не существует.`);
      }
  }

  addGameObjectToScene(sceneName, ...gameObjects) {
      if (this.scenes[sceneName]) {
          this.scenes[sceneName].gameObjects.push(...gameObjects);
      } else {
          console.error(`Невозможно добавить объект в несуществующую сцену: "${sceneName}".`);
      }
  }

  update(deltaTime) {
      if (this.currentScene) {
          this.currentScene.gameObjects.forEach((object) => object.update(deltaTime));
      }
  }

  render(context) {
      if (this.currentScene) {
          this.currentScene.gameObjects.forEach((object) => object.render(context));
      }
  }

  // Добавляем метод для получения текущей сцены
  getCurrentScene() {
      return this.currentScene;
  }
}
