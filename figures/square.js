import {Context} from '../core/Context.js'
const context = new Context().getContext()
class Square {

    constructor(obj) {
      this.x = obj.x 
      this.y = obj.y 
      this.width = obj.width 
      this.height = obj.height 
      this.type = obj.type 
      this.fillStyle = obj.color
      this.obj =obj
      this.borderColor=obj.borderColor
      this.borderWidth = obj.borderWidth
      this.round = obj.round
      this.shadow= obj.shadow
      this.shadowOffset = obj.shadowOffset
 
      // this.y = y;
      // this.width = width;
    }
  
    
    squareAdd() {
      let square =  context
      square.beginPath()

   if(this.borderColor===undefined && this.round ===undefined){
    
      square.fillStyle = this.fillStyle
      square.rect(this.x,this.y,this.width,this.height)
      square.fill()
   }else if (this.borderColor!==undefined && this.round ===undefined){
   
        square.fillStyle = this.fillStyle
        square.rect(this.x,this.y,this.width,this.height)
        square.strokeStyle = this.borderColor
        square.lineWidth = this.borderWidth
        square.fill()
        square.stroke()
      }else if(this.borderColor!==undefined && this.round !==undefined){
        console.log(this.borderColor,this.round )
        square.fillStyle = this.fillStyle
        square.strokeStyle = this.borderColor
        square.lineWidth = this.borderWidth
        square.roundRect(this.x,this.y,this.width,this.height, this.round)
        square.fill()
        square.stroke()
      }else if(this.borderColor===undefined && this.round !==undefined){
      
        square.shadowColor = "rgba(255, 0, 0, .8)";
        square.shadowBlur = 8;
        square.shadowOffsetX = 30;
        square.shadowOffsetY = 20;
        console.log(this.round !==undefined)
        square.fillStyle = this.fillStyle
        square.roundRect(this.x,this.y,this.width,this.height, this.round)
        square.fill()

      }
      return square
    }
  

  }

  
export {Square}