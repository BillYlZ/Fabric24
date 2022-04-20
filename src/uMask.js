const eCanvas = require("./eCanvas.js");

module.exports = class uMask {
  uCanvas = null;
  fCanvas = null;


  position = {};


  strokeWidth = 1.6;
  stroke = "black";
  visible = false;
  clipImage = false;


  constructor(fCanvas, eObject) {
    this.fCanvas = fCanvas;
    this.eObject = eObject;
    this.init();
  }

  init() {

    this.setPosition(this.eObject.position);

    this.clipPath = new fabric.Rect({
      rx: 1,
      ry: 2,
      left: 3,
      top: 4,
      originX: 'center',
      originY: 'center',
      visible: true,
      
      absolutePositioned: true
    });

    this.fCanvas.add(this.clipPath);

  }
  setPosition(position) {
    this.position = position;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  setClipImage(clipImage) {
    this.clipImage = clipImage;
  }
  
  setImageClipPath(fImage, f) {
    let pos = this.position;

    let rx = pos.width / 2;
    let ry = pos.height / 2;
    let left = pos.left + rx;
    let top = pos.top + ry;

    let clipPath = new fabric.Rect({
      rx: rx * f,
      ry: ry * f,
      left: left * f,
      top: top * f,
      width: pos.width* f,
      height: pos.height* f,
      originX: 'center',
      originY: 'center',
      
      absolutePositioned: true
    });
    
    if (this.clipImage) {
      fImage.clipPath = clipPath;
    } else {
      fImage.clipPath = null;
    } 
  }

  draw(f) {

    let pos = this.position;

    let rx = pos.width / 2;
    let ry = pos.height / 2;
    let left = pos.left + rx;
    let top = pos.top + ry;

    
    this.clipPath.set({
      stroke: this.eObject.color,
      fill: '',
      strokeWidth: 1, 

      rx: rx * f,
      ry: ry * f,
      left: left * f,
      top: top * f,
      width: pos.width* f,
      height: pos.height* f,
      visible: this.visible,
    });
  }

}
