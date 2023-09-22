import { Context } from '../Context.js'

const context = new Context()
class Events {
    constructor(el) {
        this.name = "Something Good";
        this.el= el
        console.log(this.el, el)
    }


    register() {
        const that = this;

        context.getContext().addEventListener("mousedown", (e) => {
          that.someMethod(e);
        });
      }
    
      someMethod(e) {
        console.log(this.name);
        // switch (e.keyCode) {
        //   case 5:
        //     // some code here…
        //     break;
        //   case 6:
        //     // some code here…
        //     break;
        // }
      }
}

export {Events}