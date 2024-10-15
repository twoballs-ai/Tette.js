export class KeyboardControl {
    constructor() {
        this.keys = {};
        this.setupKeyboardControls();
    }

    setupKeyboardControls() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.code] = true; // Отмечаем, что клавиша нажата
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.code] = false; // Отмечаем, что клавиша отпущена
        });
    }

    // Проверяем, нажата ли клавиша
    isKeyPressed(key) {
        return !!this.keys[key];
    }

    update() {
        // Логика для обновления состояния клавиатуры
    }
}
