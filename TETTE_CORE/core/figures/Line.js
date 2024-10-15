import {Context} from '../Context.js'
const context = new Context().getContext()
class Line {

    constructor(obj) {
      this.x1 = obj.x1
      this.y1 = obj.y1 
      this.x2 = obj.x2
      this.y2 = obj.y2  
      this.color  = obj.color   
      this.widthline = obj.widthline  
      this.lineRounded = obj.lineRounded

    }
  
    lineAdd() {
      let line =  context
      line.beginPath();
      line.moveTo(this.x1,this.y1);
      // End point (180,47)
      line.lineTo(this.x2,this.y2);
      line.strokeStyle =this.color
      line.lineWidth= this.widthline
      context.lineCap = this.lineRounded;
      // Make the line visible
      line.stroke();
      return line
    }
  
  }

  
export {Line}