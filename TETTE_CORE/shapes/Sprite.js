import { Context } from '../Context.js'
const context = new Context().getContext()

class Sprite {
    constructor(options) {
        this.image = obj.image;
        this.width = obj.width;
        this.height = obj.height;
    }

    spriteAdd() {
        let image =  context
        image.drawImage(this.img, this.dx, this.dy);
        return image
      }
}

export { Sprite }