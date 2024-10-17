export function ColorMixin(color, renderType) {
    // Если это Canvas, возвращаем цвет в формате строки
    if (renderType === '2d') {
      if (typeof color === 'string') {
        if (color in colorNames) {
          return colorNames[color];
        }
        return color; // Возвращаем строку цвета без изменений
      }
      throw new Error('Unsupported color format for Canvas: ' + color);
    }
  
    // Для WebGL — возвращаем нормализованные значения RGB
    // Если это формат RGB (например, 'rgb(51, 51, 51)')
    if (typeof color === 'string' && color.startsWith('rgb(')) {
      return parseRgbString(color);
    }
  
    // Если это строка цвета (название или HEX)
    if (typeof color === 'string') {
      if (color in colorNames) {
        color = colorNames[color];
      }
  
      // Если это HEX формат (#333 или #333333)
      if (color[0] === '#') {
        return hexToRgb(color);
      }
    }
  
    // Если это формат RGB в виде массива [r, g, b]
    if (Array.isArray(color)) {
      return color.map(c => c / 255);
    }
  
    throw new Error('Unsupported color format for WebGL: ' + color);
  }
  
  // Конвертация строки 'rgb(51, 51, 51)' в массив нормализованных RGB (0-1)
  function parseRgbString(rgbString) {
    const rgbValues = rgbString.match(/\d+/g).map(Number);
    return rgbValues.map(value => value / 255); // Нормализуем значения
  }
  
  // Конвертация HEX-цвета в нормализованный RGB (0-1)
  function hexToRgb(hex) {
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
  
    const bigint = parseInt(hex.slice(1), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b];
  }
  
  // Словесные названия цветов
  const colorNames = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    gray: '#808080',
    // Добавьте другие цвета по необходимости
  };
  