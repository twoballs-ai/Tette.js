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
                // Создаем паттерн
                const pattern = context.createPattern(this.image, this.repeatX && this.repeatY ? 'repeat' : this.repeatX ? 'repeat-x' : 'repeat-y');
                context.fillStyle = pattern;

                // Вычисляем фактический размер для повторения
                const patternWidth = this.image.width * this.repeatCountX; // Используем исходную ширину изображения для повторений
                const patternHeight = this.image.height * this.repeatCountY; // Используем исходную высоту изображения для повторений

                // Если включено сохранение пропорций, то нужно масштабировать на основе renderWidth и renderHeight
                if (this.preserveAspectRatio) {
                    context.scale(renderWidth / this.image.width, renderHeight / this.image.height);
                }

                // Заполняем область с паттерном
                context.fillRect(this.x, this.y, patternWidth, patternHeight);

                // Если было включено масштабирование, возвращаем контекст в исходное состояние
                if (this.preserveAspectRatio) {
                    context.setTransform(1, 0, 0, 1, 0, 0); // Сбрасываем трансформацию
                }
            } else {
                // Обычное рисование изображения без повторения
                context.drawImage(this.image, this.x, this.y, renderWidth, renderHeight);
            }
        }
    }
}
