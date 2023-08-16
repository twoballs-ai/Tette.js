class Context {
    constructor(canvasId = 'canvas', dimension = '2d') {
      this.canvas = document.querySelector(canvasId);
      this.context = this.canvas.getContext(dimension);
    }
  getContext(){
    
    let ctx = this.context
    return ctx
  }
  getCanvas(){
    let canvas = this.canvas
    return canvas
  }
  }

  export {Context}