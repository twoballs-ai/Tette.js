export class SceneManager {
  constructor() {
      this.scenes = {}; // Dictionary to hold scenes by name
      this.currentScene = null;
  }

  createScene(name) {
      this.scenes[name] = { gameObjects: [] };
      console.log(`Scene "${name}" created.`);
  }

  changeScene(name) {
      if (this.scenes[name]) {
          this.currentScene = this.scenes[name];
          console.log(`Switched to scene "${name}".`);
      } else {
          console.error(`Scene "${name}" does not exist.`);
      }
  }

  addGameObjectToScene(sceneName, gameObject) {
      if (this.scenes[sceneName]) {
          this.scenes[sceneName].gameObjects.push(gameObject);
      } else {
          console.error(`Cannot add object to nonexistent scene: "${sceneName}".`);
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
}
