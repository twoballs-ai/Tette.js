import { GameObject } from '../gameObject.js';

export class Rectangle extends GameObject {
  constructor(x, y, width, height, color, borderColor = null, borderWidth = 0, round = 0) {
    super(x, y, width, height, color);
    console.log(x, y, width, height)
    // Определяем вершины
    this.vertices = [
      x, y,                // Верхний левый угол
      x + width, y,         // Верхний правый угол
      x + width, y + height,// Нижний правый угол
      x, y + height         // Нижний левый угол
    ];

    // Устанавливаем цвет для каждой вершины (цвет уже обработан в ColorMixin)
    this.colors = [
      ...color, 1.0,  // Цвет вершины 1
      ...color, 1.0,  // Цвет вершины 2
      ...color, 1.0,  // Цвет вершины 3
      ...color, 1.0   // Цвет вершины 4
    ];

    // Буферы для вершин и цветов
    this.vertexBuffer = null;
    this.colorBuffer = null;
  }

  // Метод для инициализации буферов
initBuffers(gl) {
  const canvasWidth = gl.canvas.width;
  const canvasHeight = gl.canvas.height;

  // Преобразование координат из пикселей в NDC
  const ndcVertices = [];
  for (let i = 0; i < this.vertices.length; i += 2) {
    const x_ndc = (this.vertices[i] / canvasWidth) * 2 - 1;
    const y_ndc = 1 - (this.vertices[i + 1] / canvasHeight) * 2;
    ndcVertices.push(x_ndc, y_ndc);
  }

  // Создание и заполнение буфера вершин
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ndcVertices), gl.STATIC_DRAW);

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
    if (vertexPosition === -1) {
      console.error('Attribute aVertexPosition not found in shader program.');
    }
    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
  
    // Привязываем буфер цветов
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    const vertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor');
    if (vertexColor === -1) {
      console.error('Attribute aVertexColor not found in shader program.');
    }
    gl.enableVertexAttribArray(vertexColor);
    gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);
  
    // Рисуем прямоугольник
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }

  // Переопределяем метод render для совместимости, если вызов через Canvas
  render(context) {
    console.warn('render() is not implemented for WebGL Rectangle.');
  }
}
