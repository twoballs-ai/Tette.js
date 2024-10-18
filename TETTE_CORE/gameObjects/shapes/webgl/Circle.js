import { GameObject } from '../gameObject.js';

export class Circle extends GameObject {
  constructor(x, y, radius, startAngle = 0, endAngle = 2 * Math.PI, color = '#000000', borderColor = null, borderWidth = 0) {
    super(x, y, radius * 2, radius * 2, color);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;

    // Определяем массив вершин круга
    this.vertices = this.calculateCircleVertices();

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

  // Метод для вычисления вершин круга
  calculateCircleVertices() {
    const vertices = [];
    const steps = 100;  // Количество точек для аппроксимации круга

    // Центральная точка круга
    vertices.push(this.x + this.radius, this.y + this.radius);

    // Вычисляем вершины по окружности
    for (let t = this.startAngle; t <= this.endAngle; t += (this.endAngle - this.startAngle) / steps) {
      const x = this.x + this.radius + this.radius * Math.cos(t);
      const y = this.y + this.radius + this.radius * Math.sin(t);
      vertices.push(x, y);
    }

    return vertices;
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

    // Рисуем круг, используя TRIANGLE_FAN
    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length / 2);
  }

  // Переопределяем метод render для совместимости, если вызов через Canvas
  render(context) {
    console.warn('render() is not implemented for WebGL Circle.');
  }
}
