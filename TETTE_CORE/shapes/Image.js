import { Context } from '../Context.js'
const context = new Context()
import { Events } from '../functions/Events.js'

class Image {

  constructor(obj, x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.img = obj.img
    this.dx = obj.dx
    this.dy = obj.dy
  }

  imageAdd() {
    
    let image = context.getContext()
    // console.log(image)
    image.drawImage(this.img, this.dx, this.dy);
    console.log(this)
    // const events = new Events(image)
    // events.register()
    context.getCanvas().addEventListener("mousedown", (e) => {
      console.log(e)
    });
    return image
  }



}

export { Image }