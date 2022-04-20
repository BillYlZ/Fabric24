const ePosition = require("./ePosition.js");
const uMask = require("./uMask.js");

module.exports = class uHelper {
  uCanvas = null;
  fCanvas = null;


  position = {};


  strokeWidth = 1.6;
  stroke = "pink";
  visible = false;
  uMask = null;

  constructor(fCanvas, opts) {
    this.fCanvas = fCanvas;
    this.position = opts.position;

    if (opts.hasOwnProperty('stroke')) {
      this.stroke = opts.stroke;
    }

    //add
    this.Border = new fabric.Rect({});
    this.fCanvas.add(this.Border);
    this.LineX = new fabric.Line();
    this.fCanvas.add(this.LineX);
    this.LineY = new fabric.Line();
    this.fCanvas.add(this.LineY);
  }

  setPosition(position) {
    this.position = position;
  }

  setVisible(visible) {
    this.visible = visible; 
  }

  setMask(eObject) {
    this.uMask = new uMask(this.fCanvas, eObject);
    
  }

  draw(factor) {
    this.factor = factor;

    let f = this.factor;

    let strokeWidth = this.strokeWidth;
    let stroke = this.stroke;
    let pos = this.position.getPosition(f);


    let left = pos.left;
    let top = pos.top;
    let width = pos.width;
    let height = pos.height;
    let centerX = pos.centerX;
    let centerY = pos.centerY;


    //Border
    this.Border.left = (left - strokeWidth);
    this.Border.top = top - strokeWidth;
    this.Border.width = width + strokeWidth;
    this.Border.height = height + strokeWidth;
    this.Border.fill = null;
    this.Border.stroke = stroke;
    this.Border.strokeWidth = strokeWidth;


    let x = 0;
    let y = 0;

    //LineX
    x = left;
    y = centerY - (strokeWidth / 2);

    this.LineX.set({
      'x1': x,
      'y1': y,
      'x2': x + width,
      'y2': y,
    });

    //LineY
    x = centerX - (strokeWidth / 2);
    y = top;

    this.LineY.set({
      'x1': x,
      'y1': y,
      'x2': x,
      'y2': y + height,
    });

    this.LineX.stroke = this.LineY.stroke = stroke;
    this.LineX.strokeWidth = this.LineY.strokeWidth = strokeWidth;

     
    //visible
    this.Border.visible = this.visible;
    this.LineY.visible = this.LineX.visible = this.visible;

    this.Border.strokeDashArray = [10, 10];


    if (this.uMask) {      
      this.uMask.draw(f);
    }


  }

}
