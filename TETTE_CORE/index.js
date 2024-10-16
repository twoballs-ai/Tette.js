// TETTE_CORE/index.js

// Экспортируем основные компоненты ядра
export { Core } from './core/core_logic/core.js';
export { SceneManager } from './core/core_logic/SceneManager.js';
export { GameObject } from './core/core_logic/gameObject.js';
export { Context } from './core/core_logic/Сontext.js';

// Экспортируем фигуры
export { Square } from './core/figures/square.js';
// export { Circle } from './core/figures/Circle.js';
// export { Line } from './core/figures/Line.js';
// export { Ellipse } from './core/figures/Ellipse.js';
export { shape2d } from './core/figures/shape2d.js';

// Экспортируем контролы
export { KeyboardControl } from './core/controls/keyboardControl.js';
export { MouseControl } from './core/controls/mouseControl.js';
export { TouchControl } from './core/controls/touchControl.js';
