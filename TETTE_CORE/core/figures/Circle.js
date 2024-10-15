import {Context} from '../Context.js'
const context = new Context().getContext()
class Circle {

    constructor(obj) {
      this.x = obj.x 
      this.y = obj.y 
      this.r = obj.r;
      this.start = obj.start;
      this.end = obj.end;
      this.fillColor = obj.fill   
    }
  
    circleAdd() {
      let circle =  context
      circle.beginPath();
      circle.arc(this.x, this.y, this.r, this.start, this.end * Math.PI);
      circle.fillStyle = this.fillColor
      circle.fill();
      return circle
    }

    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  }

  
export {Circle}