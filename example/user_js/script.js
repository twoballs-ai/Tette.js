// import { draw, Message } from '../core/core.js';
import * as te from '../../core/core.js'

let width = window.innerWidth
let height = window.innerHeight
// te.draw()

let newscene = new te.Scene(width, height)
newscene.drawScene()

let square = new te.Square({
    x: 100,
    y: 200,
    width: 300,
    height: 500,
    color: 'red',
    borderColor: '#7CFC00',
    borderWidth: 5,
    // round: 10,
    // shadow:['blue',5]//color, blur

}
);
square.squareAdd()

let square3 = new te.Square({
    x: 600,
    y: 700,
    width: 130,
    height: 150,
    color: 'green',
    round: [10, 20, 0, 40],
    // shadowBlur:10,
    // shadowColor: 'blue'
}
);
square3.squareAdd()

let square2 = new te.Square({
    x: 150,
    y: 250,
    width: 550,
    height: 200,
    color: 'blue',
    borderColor: 'pink',
    borderWidth: 10,
    round: [10, 50],
    // shadowBlur:10,
    // shadowColor: 'blue'
}
);
square2.squareAdd()

let circle = new te.Circle(
    {
        x: 95,
        y: 50,
        r: 40,
        start: 0,
        end: 2,
        fill: 'blue',

    }
);
circle.circleAdd()


let circle2 = new te.Circle(
    {
        x: 400,
        y: 500,
        r: 100,
        start: 0,
        end: 2,
        fill: 'purple',

    }
);
circle2.circleAdd()

let ellipse = new te.Ellipse(
    {
        x: 800,
        y: 600,
        rX: 100,
        rY: 50,
        rot: 0,
        start: 0,
        end: 2,
        fill: 'yellow',

    }
);
ellipse.ellipseAdd()

let img = new Image();
img.onload = function() {
	let image = new te.Image(
        {   img:img,
            dx: 400,
            dy: 500,
        }
    );
    image.imageAdd()
};
img.src = "user_js/img/pic_the_scream.jpg";


let text = new te.Text(
    {
        x: 200,
        y: 200,
        text: "я сюда напишу что хочу",
        fontsize: 400,
        color: "green"
    }
);
text.textAdd()

let line = new te.Line(
    {
        x1: 200,
        y1: 150,
        x2: 400,
        y2: 500,
        lineRounded: "round",
        widthline:90,
        color: "grey",
    }
);
line.lineAdd()

// let firstLayer = new te.Layer()
// firstLayer.drawLayer(square)

// firstLayer.drawLayer(circle)



// newscene.add(firstLayer)