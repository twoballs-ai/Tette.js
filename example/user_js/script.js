// import { draw, Message } from '../core/core.js';
import * as te from '../../core/core.js'

let width = window.innerWidth
let height = window.innerHeight
// te.draw()

let newscene = new te.Scene(width, height)
newscene.drawScene()

let square = new te.Square({
    x:100,
    y:200,
    width:300,
    height:500,
    color:'red',
    borderColor:'#7CFC00',
    borderWidth:5,
    // round: 10,
    shadow:['blue',5]//color, blur

}
    );

square.squareAdd()

let square3 = new te.Square({
    x:600,
    y:700,
    width:130,
    height:150,
    color:'green',
    round: [10,20,0,40],
    // shadowBlur:10,
    // shadowColor: 'blue'
}
    );

square3.squareAdd()

let square2 = new te.Square({
    x:150,
    y:250,
    width:550,
    height:200,
    color:'blue',
    borderColor:'pink',
    borderWidth:10,
    round: [10,50],
    // shadowBlur:10,
    // shadowColor: 'blue'
}
    );

square2.squareAdd()
let circle = new te.Circle(
    {
        x:95,
        y:50,
        r:40,
        start:0,
        end:2,
        fill:'blue',
        
    }
        );
circle.circleAdd()

// let firstLayer = new te.Layer()
// firstLayer.drawLayer(square)

// firstLayer.drawLayer(circle)



// newscene.add(firstLayer)