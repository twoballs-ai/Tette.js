import {Context} from '../core/Context.js'
const context = new Context().getContext()
class Image {

    constructor(obj) {
        this.img = obj.img
      this.dx = obj.dx 
      this.dy = obj.dy 
    }
  
    imageAdd() {
      let image =  context
      image.drawImage(this.img, this.dx, this.dy);
      return image
    }
  
  }

  
export {Image}