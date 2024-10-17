import { GameObject } from '../../../core/core_logic/gameObject.js';

export class BezierCurve extends GameObject {
  constructor(startX, startY, controlX1, controlY1, controlX2, controlY2, endX, endY, color = '#000000', widthline = 1) {
    super(startX, startY, 0, 0, color);
    this.startX = startX;
    this.startY = startY;
    this.controlX1 = controlX1;
    this.controlY1 = controlY1;
    this.controlX2 = controlX2;
    this.controlY2 = controlY2;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.widthline = widthline;

    // Определяем массив вершин
    this.vertices = this.calculateBezierVertices();

    // Определяем цвет для каждой вершины
    const [r, g, b] = this.hexToRgb(color);
    this.colors = [];
    for (let i = 0; i < this.vertices.length / 2; i++) {
      this.colors.push(r, g, b, 1.0);
    }

    // Буферы для вершин и цветов
    this.vertexBuffer = null;
    this.colorBuffer = null;
  }

  // Метод для вычисления вершин кривой Безье с помощью итераций
  calculateBezierVertices() {
    const vertices = [];
    const steps = 100;  // Количество точек на кривой

    for (let t = 0; t <= 1; t += 1 / steps) {
      const x = this.bezierPoint(t, this.startX, this.controlX1, this.controlX2, this.endX);
      const y = this.bezierPoint(t, this.startY, this.controlY1, this.controlY2, this.endY);
      vertices.push(x, y);
    }

    return vertices;
  }

  // Вычисляем точку на кривой Безье с использованием формулы
  bezierPoint(t, p0, p1, p2, p3) {
    const invT = 1 - t;
    return invT * invT * invT * p0 +
           3 * invT * invT * t * p1 +
           3 * invT * t * t * p2 +
           t * t * t * p3;
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

    // Рисуем кривую, используя линии
    gl.drawArrays(gl.LINE_STRIP, 0, this.vertices.length / 2);
  }

  // Переопределяем метод render для совместимости, если вызов через Canvas
  render(context) {
    console.warn('render() is not implemented for WebGL BezierCurve.');
  }
}
