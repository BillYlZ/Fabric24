const eCanvas = require("./eCanvas.js");

module.exports = class uText {
  uCanvas = null;
  fCanvas = null;


  position = {};
  params = {};

  strokeWidth = 1.6;
  stroke = "black";

  visible = true;


  constructor(fCanvas, eObject) {
    this.fCanvas = fCanvas;
    this.eObject = eObject;
    this.init();
  }

  init() {

    this.setPosition(this.eObject.position);

    let opts = this.eObject.iText.opts;

    this.iText = new fabric.IText(this.eObject.iText.text, opts);
    this.iText.set({
      eID: this.eObject.eID,
      cornerSize: 10,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      hasRotatingPoint: false,
      transparentCorners: false,
    });

    this.params = {
      left: opts.left,
      top: opts.top,
      fontFamily: 'Caladea',
      fontSize: opts.fontSize,
      fill: 'black',
      stroke: 'black',
      lineHeight: 1,
      textAlign: 'center',
    };
    this.iText.set(this.params);

    this.fCanvas.add(this.iText);

  }
  setPosition(position) {
    this.position = position;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  refresh() {


  }
  draw(f, pObject) {

    console.log(pObject);
    let pLeft = pObject.position.left;
    let pTop = pObject.position.top;

    let _fontSize = this.iText.fontSize;
    let left = this.iText.left;
    let top = this.iText.top;


    this.iText.set({
      fontSize: this.params.fontSize * f / 2,
      align: 'mid', //added
      originX: 'center', //added
      originY: 'top', //added
      centeredScaling: true,
    });


    let dx = pObject.position.width / 2;


    this.iText.set({
      left: (this.params.left + pLeft + dx) * f,
      top: (this.params.top + pTop) * f,
    });


    console.log(this.iText);



  }

};
