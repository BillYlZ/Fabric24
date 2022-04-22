'use strict'
const Position = require("./../Position.js");
const cPlacer = require("./cPlacer.js");

function cImage(fCanvas, element) {
  this.fCanvas = fCanvas;
  this.element = element; 
}
cImage.prototype = {}
cImage.fCanvas = null;
cImage.element = null;
cImage.fImage = null;
cImage.imageBlob = null;
cImage.widthOriginal = null;

cImage.PLACER = null;
cImage.HELPER = null;

cImage.prototype.init = function () {
  let coolStuff = 'still boring';

  return new Promise((resolve, reject) => {
    let _this = this;
    
    this.readImagePromise(this.element).then((result) => {
      let url = _this.imageBlob; 
      fabric.Image.fromURL(url, function (img) {
        _this.fImage = img;
        _this.fCanvas.add(img);
        _this.widthOriginal = img.width;
        _this.initSubElements();      
        _this.setVisible(true);
        resolve(_this.element.ID);
      });
    });
 

  });
}

cImage.prototype.initPlacer = function () {
 
  if(!this.element.placer) {
    return 0;
  }

  let pos = this.element.placer;

  return new Promise((resolve, reject) => {    
    this.PLACER = new cPlacer(this.fCanvas, pos);    
    resolve('ok');
  });
}


cImage.prototype.initSubElements = function () {
}

cImage.prototype.draw = function (f) {
  if (!this.fImage) {
    return null;
  }
 

  if (this.PLACER) {
    this.PLACER.draw(f);
  }
  //let pos = this.element.position;
   
}


cImage.prototype.setVisible = function (visible) {
  this.fImage.visible = visible;
}

/**
 * 
 */
cImage.prototype.readImagePromise = function (element) {
  let _this = this;
  return new Promise((resolve, reject) => {
    _this.readImage(element).then((result) => {      
      resolve(element.ID);
    });
  });
}

cImage.prototype.readImage = async function (element) {
  let _this = this;
  await this.getBase64FromUrl(element.url).then((imageBlob) => {
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
