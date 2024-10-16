import { Context } from '../Context.js'
const context = new Context().getContext()
class Text {

    constructor(obj) {
        this.text = obj.text
        this.x = obj.x
        this.y = obj.y
        this.fontsize =obj.fontsize
        this.color = obj.color
    }

    textAdd() {
        let text =  context
        text.beginPath();
        text.font = `${this.fontsize}px Arial`;
        text.fillStyle = this.color;
        text.fillText(this.text,this.x,this.y);
        return text
    }

}


export { Text }