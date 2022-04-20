const uMask = require("./uMask.js");
const uHelper = require("./uHelper.js");
const ePosition = require("./ePosition.js");
const eHelper = require("./eHelper.js");
const ePlacer = require("./ePlacer.js");
const eCanvas = require("./eCanvas.js");

module.exports = class uImage {
  uCanvas = null;
  fCanvas = null;

  uHelper = null;
  uMask = null;
  eObject = null;


  factor = 1;
  scale = 1;
  scaleX = 1;
  scaleY = 1;
  diffX = 0;
  diffY = 0;

  fImage = null;

  position = {};

  constructor(fCanvas, eObject) {
    this.fCanvas = fCanvas;
    this.eObject = eObject;

    this.uHelper = new uHelper(this.fCanvas, {
      position: new ePosition(),
      stroke: eObject.helper.color,
    });
  }

  initfabricImage() {

    return new Promise((resolve, reject) => {
      let _this = this;
      let url = this.eObject.imageBlob;

      try {
        fabric.Image.fromURL(url, function (img) {
          _this.fImage = img;
          _this.fCanvas.add(img);
          _this.fImage.visible = false;
          _this.fImage.visibleHelper = false;
          _this.fImage.selectable = false;
          _this.widthOriginal = img.width;
          
          resolve();
        });

      } catch (hata) {
        reject(hata);
      }
    });

  }

  refresh(opts) {

  }
  setVisible(me, visibleHelper = false, visibleMask = false) { 
    this.eObject.visible = me;
    this.eObject.helper.setVisible(visibleHelper, visibleMask);
  }

  setMask(uMask) {    
    this.uMask = uMask;
  }

  draw(factor) {
    this.factor = factor;

    let f = this.factor;

    if (!this.fImage) {
      return null;
    }
    this.fImage.visible = this.eObject.visible;
    this.fImage.selectable = this.eObject.selectable;

    let pos = this.eObject.position;
    let r = this.eObject.imageScale * f;
    this.fImage.scaleToWidth(r , false);

    this.fImage.left = (pos.left + this.eObject.imageDX) * f;
    this.fImage.top = (pos.top + this.eObject.imageDY) * f;

    this.scaleX = this.fImage.scaleX;
    this.scaleY = this.fImage.scaleY;

    if (this.eObject.elementType == eCanvas.TYPE_MOTIV) {

      this.diffX = ((this.fImage.width * this.fImage.scaleX) - (this.eObject.placerWidth * f)) / 2;
      this.fImage.left -= this.diffX;

      this.diffY = ((this.fImage.height * this.fImage.scaleY) - (this.eObject.placerHeight * f)) / 2;
      this.fImage.top -= this.diffY;
    }



    if (this.uHelper) {
      this.drawHelper(this.factor);
    }

    if (this.uMask) {
      this.uMask.setImageClipPath(this.fImage, this.factor);
    }
  }


  drawHelper(f = 1) {

    f = 1 // fImage Border faktor=1

    let _pos = this.uHelper.position;
    _pos.left = this.fImage.left;
    _pos.top = this.fImage.top;
    _pos.width = this.fImage.width * this.scaleX;
    _pos.height = this.fImage.height * this.scaleY;


    this.uHelper.setPosition(_pos);

  //  this.uHelper.setVisible(this.eObject.helper.visibleBorder, this.eObject.helper.visibleAxes);

    this.uHelper.draw(1);

  }


}
