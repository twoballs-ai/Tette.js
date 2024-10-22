import { Sprite } from '../shapes/2d/Sprite.js';

export class SpriteGrid {
    constructor(image, x, y, width, height, repeatX = 1, repeatY = 1, spacingX = 0, spacingY = 0, preserveAspectRatio = false) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.repeatX = repeatX; // Количество повторений по горизонтали
        this.repeatY = repeatY; // Количество повторений по вертикали
        this.spacingX = spacingX; // Расстояние между спрайтами по X
        this.spacingY = spacingY; // Расстояние между спрайтами по Y
        this.preserveAspectRatio = preserveAspectRatio;
        this.sprites = []; // Массив для хранения всех созданных спрайтов
    }

    // Метод для создания сетки спрайтов
    createGrid() {
        for (let i = 0; i < this.repeatX; i++) {
            for (let j = 0; j < this.repeatY; j++) {
                const sprite = new Sprite(
                    this.image,
                    this.x + (this.width + this.spacingX) * i,
                    this.y + (this.height + this.spacingY) * j,
                    this.width,
                    this.height,
                    this.preserveAspectRatio
                );
                this.sprites.push(sprite); // Добавляем спрайт в массив
            }
        }   
    }

    // Метод для рендеринга всех спрайтов
    render(context) {
        this.sprites.forEach(sprite => {
            sprite.render(context);
        });
    }
}
