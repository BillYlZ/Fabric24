const uHelper = require("./uHelper.js");
const ePosition = require("./ePosition.js");
const eHelper = require("./eHelper.js");
const eCanvas = require("./eCanvas.js");


module.exports = class uPlacer {
  uCanvas = null;
  fCanvas = null;

  uHelper = null;
  eObject = null;
  fPlacer = null;
  uPlacerEllipse = null;

  //data
  position = {};
  helper = {};
  color = 'black';
  opacity = 0.15;
  visible = true;

  constructor(fCanvas, eObject) {
    this.fCanvas = fCanvas;
    this.eObject = eObject;

    this.color = eObject.color;

    this.fPlacer = new fabric.Rect({});
    this.fCanvas.add(this.fPlacer);

    this.uHelper = new uHelper(this.fCanvas, {
      position: new ePosition(),
      stroke: eObject.color,
    });

    if (eObject.elementType == eCanvas.TYPE_MOTIV_PLACER) {
      this.uHelper.setMask(eObject);
    }

  }

  refresh(eObject) {
    this.uHelper.setPosition(eObject.position);
  }

  setVisible(visible, visibleHelper = false, clipImage = false) { 
    this.eObject.visible = visible;
    this.eObject.helper.setVisible(visibleHelper);
    this.eObject.helper.setClipImage(clipImage);
  }

  draw(factor) {
    this.factor = factor;
    let f = this.factor;
    let pos = this.eObject.position.getPosition(f);

    //Border

    this.fPlacer.set({
      left: pos.left,
      top: pos.top,
      width: pos.width,
      height: pos.height,
      opacity: this.opacity,
      fill: this.color,
      stroke: null,
      strokeWidth: 0,
      visible: this.eObject.visible,
    });


    if (this.uHelper) {
      this.drawHelper(f);
    }

  }

  drawHelper(f = 1) {

    let visible = this.eObject.helper.visible;
    
    this.uHelper.setVisible(visible);


    if (this.uHelper.uMask && this.eObject.helper) {       
      this.uHelper.uMask.setVisible(visible);
      this.uHelper.uMask.setClipImage(this.eObject.helper.clipImage);
    }

    this.uHelper.draw(f);
  }

}
