// TETTE_CORE/core/core_logic/Renderer.js

export class Renderer {
    constructor(type = '2d') {
      if (new.target === Renderer) {
        throw new TypeError('Cannot instantiate abstract class Renderer');
      }
      this.canvas = null;
      this.context = null;
      this.type = type;
    }
  
    initialize(canvasElement) {
      this.canvas = canvasElement;
  
      // Обработка разных типов контекстов
      if (this.type === '2d') {
        this.context = this.canvas.getContext('2d');
        if (!this.context) {
          throw new Error('Не удалось получить 2D контекст из canvas.');
        }
      } else if (this.type === 'webgl') {
        this.context =
          this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        if (!this.context) {
          throw new Error('Не удалось получить WebGL контекст из canvas.');
        }
      } else if (this.type === 'webgpu') {
        // WebGPU все еще экспериментальный, поэтому проверяем его доступность
        if (navigator.gpu) {
          // Инициализация WebGPU будет происходить в подклассе из-за асинхронности
          // Здесь можно установить флаг или вызвать метод инициализации
        } else {
          console.error('WebGPU не поддерживается в этом браузере');
        }
      } else {
        console.error('Неподдерживаемый тип контекста: ' + this.type);
      }
    }
  
    clear() {
      throw new Error('Метод "clear()" должен быть реализован в подклассе.');
    }
  
    render(scene) {
      throw new Error('Метод "render(scene)" должен быть реализован в подклассе.');
    }
  }
  