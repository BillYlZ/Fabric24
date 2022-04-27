'use strict'
const Globals = require("./../Globals.js");
const Position = require("./../Position.js");
const cPlacer = require("./cPlacer.js");
const cHelper = require("./cHelper.js");

function cImage(fCanvas, element) {
  this.fCanvas = fCanvas;
  this.element = element;
  this.visible = true;
  this.fImage = null;
  this.imageBlob = null;
  this.widthOriginal = null;
  this.imageScale = Globals.WIDTH_PAPIER;
  this.visible = true;
  this.zIndex = 1;

  this.PLACER = null;
  this.HELPER = null;
}
cImage.prototype = {}

cImage.prototype.init = function () {
  let promises = [];
  promises.push(this.initPromise());
  promises.push(this.initPlacer());
  promises.push(this.initHelper());
  return Promise.all(promises).then((values) => {});
}

cImage.prototype.initPromise = function () {

  if (this.element.type == Globals.TYPE_PRODUCT) {
    this.imageScale = Globals.WIDTH_PAPIER;
  } else if (this.element.type == Globals.TYPE_MOTIV) {
    this.imageScale = Globals.WIDTH_MOTIV;
  }

  return new Promise((resolve, reject) => {
    let _this = this;
    this.readImagePromise(this.element.url).then((result) => {
      let blob = _this.imageBlob;
      fabric.Image.fromURL(blob, function (img) {
        _this.fImage = img;
        _this.fCanvas.add(img);
        _this.widthOriginal = img.width;
        _this.fImage.visible = false;
        resolve(_this.element.ID);
      });
    });
  });
}

cImage.prototype.update = function (cData) {
  console.log(cData);
  this.element.left = cData.left;
  this.element.right = cData.right;
  this.element.ratio = cData.ratio;

  if (this.PLACER) {
    this.PLACER.position = new Position(cData.placer);
  }
}


cImage.prototype.setVisible = function (visible) {
  this.visible = visible;
  if (this.fImage) {
    this.fImage.visible = visible;
  }
}

cImage.prototype.setVisiblePlacer = function (visible) {
  if (this.PLACER) {
    this.PLACER.fImage.visible = visible;
  }
}


cImage.prototype.setZIndex = function (zIndex = 1) {
  this.zIndex = zIndex;

  if (this.fImage) {
    this.fImage.moveTo(zIndex);
  }

  if (this.PLACER) {
    this.PLACER.setZIndex(zIndex);
  }

  if (this.HELPER) {
    this.HELPER.setZIndex(zIndex);
  }
}

cImage.prototype.initPlacer = function () {
  return new Promise((resolve, reject) => {
    let _position = new Position(this.element.placer);
    this.PLACER = new cPlacer(this.fCanvas, this.element.ID, this.element.type);
    this.PLACER.setPosition(_position);
    resolve('ok-PLACER');
  });
}

cImage.prototype.initHelper = function () {
  return new Promise((resolve, reject) => {
    let _position = new Position();
    this.HELPER = new cHelper(this.fCanvas, this.element.ID, this.element.type);
    this.HELPER.setPosition(_position);
    resolve('ok-HELPER');
  });
}


cImage.prototype.draw = function (f = 1) {

  if (!this.fImage) {
    return;
  }

  //scaleToWidth
  let ratio = 1;
  if (this.element.ratio != null) {
    ratio = this.element.ratio;
  }
  this.fImage.scaleToWidth(this.imageScale * ratio * f, false);



  //position
  let pLeft = 0;
  let pTop = 0;
  let pWidth = 0;
  let pHeight = 0;

  if (this.PLACER) {
    let pos = this.PLACER.position;
    pLeft = pos.left;
    pTop = pos.top;
    pWidth = pos.width;
    pHeight = pos.height;
  }


  let eLeft = 0;
  if (this.element.left != null) {
    eLeft = this.element.left;
  }

  let eTop = 0;
  if (this.element.top != null) {
    eTop = this.element.top;
  }

  this.fImage.left = (pLeft + eLeft) * f;
  this.fImage.top = (pTop + eTop) * f;


  //fit center
  this.fImage.left -= ((this.fImage.width * this.fImage.scaleX) - (pWidth * f)) / 2;
  this.fImage.top -= ((this.fImage.height * this.fImage.scaleY) - (pHeight * f)) / 2;

  this.setVisible(this.visible);
  this.setZIndex(this.zIndex);

  if (this.element.type == Globals.TYPE_PRODUCT) {
    this.fImage.set({
      selectable: false
    });
  }

  //draw HELPER
  if (this.HELPER) {
    let _position = new Position({
      left: this.fImage.left,
      top: this.fImage.top,
      width: this.fImage.width * this.fImage.scaleX,
      height: this.fImage.height * this.fImage.scaleY,
    });

    this.HELPER.setPosition(_position);
    this.HELPER.draw(1); // f=1 display image size
  }

  //draw PLACER
  if (this.PLACER) {
    this.PLACER.draw(f);
  }

}


/**
 * 
 */
cImage.prototype.readImagePromise = function (url) {
  let _this = this;
  return new Promise((resolve, reject) => {
    _this.readImage(url).then((result) => {
      resolve('ok url');
    });
  });
}

cImage.prototype.readImage = async function (url) {
  let _this = this;
  await this.getBase64FromUrl(url).then((imageBlob) => {
    _this.imageBlob = imageBlob;
  });
}

cImage.prototype.getBase64FromUrl = async function (url) {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}

module.exports = cImage;
