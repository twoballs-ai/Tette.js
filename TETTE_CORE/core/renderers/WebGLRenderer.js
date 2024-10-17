import { Renderer } from '../core_logic/Renderer.js';

export class WebGLRenderer extends Renderer {
  constructor(graphicalContext, backgroundColor) {
    super(graphicalContext);
    this.backgroundColor = backgroundColor;
    if (!this.backgroundColor) {
      throw new Error('Background color is required for WebGLRenderer.');
    }

    // Инициализация WebGL
    this.initializeWebGL();
    this.initShaders();
  }

  initializeWebGL() {
    // Устанавливаем цвет очистки экрана
    const [r, g, b] = this.hexToRgb(this.backgroundColor);
    this.context.clearColor(r, g, b, 1.0);
    this.context.enable(this.context.DEPTH_TEST);
    this.context.depthFunc(this.context.LEQUAL);
  }

  // Конвертация HEX-цвета в нормализованные RGB
  hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b];
  }

  initShaders() {
    // Исходный код вершинного шейдера
    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;
      varying lowp vec4 vColor;

      void main(void) {
        gl_Position = aVertexPosition;
        vColor = aVertexColor;
      }
    `;

    // Исходный код фрагментного шейдера
    const fragmentShaderSource = `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;

    const vertexShader = this.loadShader(this.context.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.loadShader(this.context.FRAGMENT_SHADER, fragmentShaderSource);

    // Создаем и связываем шейдерную программу
    this.shaderProgram = this.context.createProgram();
    this.context.attachShader(this.shaderProgram, vertexShader);
    this.context.attachShader(this.shaderProgram, fragmentShader);
    this.context.linkProgram(this.shaderProgram);

    // Проверяем успешность создания программы
    if (!this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS)) {
      console.error('Не удалось инициализировать шейдерную программу: ' + this.context.getProgramInfoLog(this.shaderProgram));
      return null;
    }

    this.context.useProgram(this.shaderProgram);

    // Получаем расположение атрибутов
    this.vertexPositionAttribute = this.context.getAttribLocation(this.shaderProgram, 'aVertexPosition');
    this.context.enableVertexAttribArray(this.vertexPositionAttribute);

    this.vertexColorAttribute = this.context.getAttribLocation(this.shaderProgram, 'aVertexColor');
    this.context.enableVertexAttribArray(this.vertexColorAttribute);
  }

  loadShader(type, source) {
    const shader = this.context.createShader(type);

    // Привязываем исходный код к шейдеру
    this.context.shaderSource(shader, source);

    // Компилируем шейдер
    this.context.compileShader(shader);

    // Проверяем успешность компиляции
    if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
      console.error('Ошибка при компиляции шейдера: ' + this.context.getShaderInfoLog(shader));
      this.context.deleteShader(shader);
      return null;
    }

    return shader;
  }

  clear() {
    // Очищаем буферы цвета и глубины
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
  }

  render(scene) {
    this.clear();

    if (scene && scene.gameObjects) {
      scene.gameObjects.forEach(entity => {
        this.drawEntity(entity);
      });
    } else {
      console.error('No game objects found in the scene!');
    }
  }

  drawEntity(entity) {
    // Если объект имеет метод renderWebGL, вызываем его
    if (entity && typeof entity.renderWebGL === 'function') {
      entity.renderWebGL(this.context, this.shaderProgram);
    } else {
      console.error('Object does not have a renderWebGL method!');
    }
  }
}
