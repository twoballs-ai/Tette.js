import {Context} from './Context.js';

import { Square } from '../figures/square.js';
import { Circle } from '../figures/Circle.js';
import { Ellipse } from '../figures/Ellipse.js';
import { Image } from '../figures/Image.js';
import { Text } from '../figures/Text.js';
import { Line } from '../figures/Line.js';
const context = new Context().getContext()
const canvas = new Context().getCanvas()


class Scene {

  constructor(width,height) {
    this.width = width;
    this.height = height;
  }
drawScene(){
  canvas.width = this.width
  canvas.height = this.height 
}
add(layer){
  console.log(layer)
}
}


class Layer {
  constructor() {
    // this.width = width;
    // this.height = height;
  }
  drawLayer(){
console.log('dsvd')
  }
  
}






//   Использование:
//   let user = new User("Иван");
//   user.sayHi();


function draw() {
  console.log('Initialize success')
  
}





export { draw, Square, Circle, Scene, Layer, Ellipse, Image, Text, Line }