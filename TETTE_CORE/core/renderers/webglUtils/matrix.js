// matrix.js
export function createIdentityMatrix() {
    return [
        1, 0, 0, 0, // Столбец 0
        0, 1, 0, 0, // Столбец 1
        0, 0, 1, 0, // Столбец 2
        0, 0, 0, 1  // Столбец 3
      ];
  }
  
  export function createOrthographicMatrix(left, right, bottom, top, near, far) {
    const rl = right - left;
    const tb = top - bottom;
    const fn = far - near;
  
    console.log('rl:', rl, 'tb:', tb, 'fn:', fn);
  
    const tx = -(right + left) / rl;
    const ty = -(top + bottom) / tb;
    const tz = -(far + near) / fn;
  
    const matrix = [
      2 / rl, 0,      0,     0,
      0,      2 / tb, 0,     0,
      0,      0,     -2 / fn, 0,
      tx,     ty,     tz,     1
    ];
  
    console.log('Orthographic Matrix:', matrix);
  
    return matrix;
  }
  
  export function multiplyMatrices(a, b) {
    const result = new Array(16);
  
    for (let row = 0; row < 4; ++row) {
      for (let col = 0; col < 4; ++col) {
        result[col * 4 + row] =
          a[0 * 4 + row] * b[col * 4 + 0] +
          a[1 * 4 + row] * b[col * 4 + 1] +
          a[2 * 4 + row] * b[col * 4 + 2] +
          a[3 * 4 + row] * b[col * 4 + 3];
      }
    }
  
    return result;
  }
  
  export function createTranslationMatrix(x, y, z = 0) {
    return [
      1, 0, 0, 0, // Столбец 0
      0, 1, 0, 0, // Столбец 1
      0, 0, 1, 0, // Столбец 2
      x, y, z, 1  // Столбец 3 (элементы отвечают за трансляцию)
    ];
  }
  