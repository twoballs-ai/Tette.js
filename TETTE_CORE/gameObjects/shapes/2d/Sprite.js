import { GameObject } from '../gameObject.js';

export class Sprite extends GameObject {
    constructor(image, x, y, width, height, preserveAspectRatio = false, repeatX = false, repeatY = false, repeatCountX = 1, repeatCountY = 1) {
        super(x, y, width, height);
        this.image = image;
        this.preserveAspectRatio = preserveAspectRatio;
        this.repeatX = repeatX; // Повторение по горизонтали
        this.repeatY = repeatY; // Повторение по вертикали
        this.repeatCountX = repeatCountX; // Количество повторений по горизонтали
        this.repeatCountY = repeatCountY; // Количество повторений по вертикали
    }

    // Метод для рендеринга спрайта
    render(context) {
        if (this.image.complete) { // Проверяем, загружено ли изображение
            let renderWidth = this.width;
            let renderHeight = this.height;

            // Если включено сохранение пропорций, корректируем размеры
            if (this.preserveAspectRatio) {
                const aspectRatio = this.image.width / this.image.height;
                if (this.width / this.height > aspectRatio) {
                    renderWidth = this.height * aspectRatio;
                } else {
                    renderHeight = this.width / aspectRatio;
                }
            }

            // Если требуется повторение изображения
            if (this.repeatX || this.repeatY) {
                const pattern = context.createPattern(this.image, this.repeatX && this.repeatY ? 'repeat' : this.repeatX ? 'repeat-x' : 'repeat-y');
                context.fillStyle = pattern;

                // Вычисляем область для повторения
                const patternWidth = renderWidth * this.repeatCountX;
                const patternHeight = renderHeight * this.repeatCountY;

                // Заполняем область с паттерном
                context.fillRect(this.x, this.y, patternWidth, patternHeight);
            } else {
                // Обычное рисование изображения без повторения
                context.drawImage(this.image, this.x, this.y, renderWidth, renderHeight);
            }
        }
    }
}
