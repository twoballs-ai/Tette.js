export class SceneManager {
    constructor() {
      this.scenes = {}; // Словарь для хранения сцен по имени
      this.currentScene = null; // Текущая сцена
    }
  
    createScene(...names) {
        console.log(...names)
      names.forEach((name) => {
        if (!this.scenes[name]) {
          this.scenes[name] = { name, gameObjects: [] };
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
        console.log(sceneName)
      const scene = this.scenes[sceneName];
      if (scene) {
        gameObjects.forEach((obj) => {
          if (!scene.gameObjects.includes(obj)) {
            scene.gameObjects.push(obj);
          } else {
            console.warn(`Объект уже добавлен в сцену "${sceneName}".`);
          }
        });
      } else {
        console.error(`Невозможно добавить объект в несуществующую сцену: "${sceneName}".`);
      }
    }
  
    update(deltaTime) {
      if (this.currentScene) {
        this.currentScene.gameObjects.forEach((object) => {
          if (typeof object.update === "function") {
            object.update(deltaTime);
          }
        });
      }
    }
  
    render(context) {
      if (this.currentScene) {
        this.currentScene.gameObjects.forEach((object) => {
          if (typeof object.render === "function") {
            object.render(context);
          }
        });
      }
    }
  
    // Метод для получения текущей сцены
    getCurrentScene() {
      return this.currentScene;
    }
  
    // Метод для удаления объекта из сцены
    removeGameObjectFromScene(sceneName, gameObject) {
      const scene = this.scenes[sceneName];
      if (scene) {
        const index = scene.gameObjects.indexOf(gameObject);
        if (index !== -1) {
          scene.gameObjects.splice(index, 1);
          console.log(`Объект удален из сцены "${sceneName}".`);
        } else {
          console.warn(`Объект не найден в сцене "${sceneName}".`);
        }
      } else {
        console.error(`Сцена "${sceneName}" не существует.`);
      }
    }
  
    // Метод для получения всех объектов текущей сцены
    getGameObjectsFromCurrentScene() {
      return this.currentScene ? this.currentScene.gameObjects : [];
    }
  
    // Метод для получения объектов по типу
    getGameObjectsByType(type) {
      if (!this.currentScene) {
        console.error("Текущая сцена не установлена.");
        return [];
      }
      return this.currentScene.gameObjects.filter((obj) => obj instanceof type);
    }
  
    // Метод для поиска объекта по идентификатору (предполагая, что у объектов есть свойство id)
    getGameObjectById(id) {
      if (!this.currentScene) {
        console.error("Текущая сцена не установлена.");
        return null;
      }
      return this.currentScene.gameObjects.find((obj) => obj.id === id) || null;
    }
  
    // Метод для очистки сцены от всех объектов
    clearScene(sceneName) {
      if (this.scenes[sceneName]) {
        this.scenes[sceneName].gameObjects = [];
        console.log(`Сцена "${sceneName}" очищена.`);
      } else {
        console.error(`Сцена "${sceneName}" не существует.`);
      }
    }
  
    // Метод для переключения на следующую сцену (если сцены имеют порядок следования)
    changeToNextScene() {
      const sceneNames = Object.keys(this.scenes);
      const currentIndex = sceneNames.indexOf(this.currentScene?.name);
      if (currentIndex !== -1 && currentIndex < sceneNames.length - 1) {
        this.changeScene(sceneNames[currentIndex + 1]);
      } else {
        console.warn("Следующая сцена не найдена или вы находитесь в последней сцене.");
      }
    }
  }
  