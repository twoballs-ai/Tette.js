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

    // Инициализация шейдеров
    this.initShaders();

    // Создание матрицы проекции
    this.createProjectionMatrix();
  }
  initializeWebGL() {
    const [r, g, b] = this.backgroundColor;
    this.context.clearColor(r, g, b, 1.0);
    this.context.enable(this.context.DEPTH_TEST);
    this.context.depthFunc(this.context.LEQUAL);

    // Устанавливаем вьюпорт
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  // Конвертация HEX-цвета в нормализованные RGB

  initShaders() {
    // Исходный код вершинного шейдера
    const vertexShaderSource = `
      attribute vec2 aVertexPosition;
      attribute vec4 aVertexColor;
      uniform mat4 uTransform;
      uniform mat4 uProjection;
      varying lowp vec4 vColor;

      void main(void) {
        vec4 position = vec4(aVertexPosition, 0.0, 1.0);
        gl_Position = uProjection * uTransform * position;
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

  createProjectionMatrix() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    this.projectionMatrix = [
      2 / canvasWidth, 0, 0, 0,
      0, -2 / canvasHeight, 0, 0,
      0, 0, 1, 0,
      -1, 1, 0, 1
    ];

    // Передаем матрицу проекции в шейдер
    const uProjection = this.context.getUniformLocation(this.shaderProgram, 'uProjection');
    this.context.uniformMatrix4fv(uProjection, false, new Float32Array(this.projectionMatrix));
  }

loadShader(type, source) {
  const shader = this.context.createShader(type);
  this.context.shaderSource(shader, source);
  this.context.compileShader(shader);

  if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
    console.error('Ошибка при компиляции шейдера:', this.context.getShaderInfoLog(shader));
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
