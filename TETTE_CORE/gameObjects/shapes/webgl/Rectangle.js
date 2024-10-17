import { GameObject } from '../../../core/core_logic/gameObject.js';

export class Rectangle extends GameObject {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);

    // Определяем цвет и вершины
    this.vertices = [
      x, y,                // Верхний левый угол
      x + width, y,         // Верхний правый угол
      x + width, y + height,// Нижний правый угол
      x, y + height         // Нижний левый угол
    ];

    // Устанавливаем цвет для каждой вершины
    const [r, g, b] = this.hexToRgb(color);
    this.colors = [
      r, g, b, 1.0,  // Цвет вершины 1
      r, g, b, 1.0,  // Цвет вершины 2
      r, g, b, 1.0,  // Цвет вершины 3
      r, g, b, 1.0   // Цвет вершины 4
    ];

    // Буферы для вершин и цветов
    this.vertexBuffer = null;
    this.colorBuffer = null;
  }

  // Конвертация HEX-цвета в нормализованный RGB (0-1)
  hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b];
  }

  // Метод для инициализации буферов
  initBuffers(gl) {
    // Создание и заполнение буфера вершин
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    // Создание и заполнение буфера цветов
    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
  }

  // Метод для рендеринга через WebGL
  renderWebGL(gl, shaderProgram) {
    if (!this.vertexBuffer || !this.colorBuffer) {
      this.initBuffers(gl);
    }

    // Привязываем буфер вершин
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    // Привязываем буфер цветов
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    const vertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor');
    gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexColor);

    // Рисуем прямоугольник
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }

  // Переопределяем метод render для совместимости, если вызов через Canvas
  render(context) {
    console.warn('render() is not implemented for WebGL Rectangle.');
  }
}
