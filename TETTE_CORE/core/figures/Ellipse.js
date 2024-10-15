import {Context} from '../Context.js'
const context = new Context().getContext()
class Ellipse {

    constructor(obj) {
      this.x = obj.x 
      this.y = obj.y 
      this.rX = obj.rX
      this.rY = obj.rY
      this.rot = obj.rot
      this.start = obj.start
      this.end = obj.end
      this.fillColor = obj.fill   
    }
  
    ellipseAdd() {
      let ellipsys =  context
      ellipsys.beginPath();
      ellipsys.ellipse(this.x, this.y, this.rX,this.rY, this.rot, this.start, this.end * Math.PI);
      ellipsys.fillStyle = this.fillColor
      ellipsys.fill();
      return ellipsys
    }
  
  }

  
export {Ellipse}