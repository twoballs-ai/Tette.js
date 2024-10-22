import { GameObject } from '../gameObject.js';

export class Sprite extends GameObject {
    constructor(image, x, y, width, height, preserveAspectRatio = false) {
        super(x, y, width, height);
        this.image = image;
        this.preserveAspectRatio = preserveAspectRatio;
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

            // Рисуем изображение спрайта
            context.drawImage(this.image, this.x, this.y, renderWidth, renderHeight);
        }
    }
}
