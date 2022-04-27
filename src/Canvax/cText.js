'use strict'
const Globals = require("./../Globals.js");
const Position = require("./../Position.js");
const cPlacer = require("./cPlacer.js");
const cHelper = require("./cHelper.js");

function cText(fCanvas, element) {
  this.fCanvas = fCanvas;
  this.element = element;
  this.zIndex = 1;
  this.visible = true;
  this.fText = [];
  this.PLACER = null;
  this.HELPER = null;
}
cText.prototype = {}

cText.prototype.init = function () {
  let promises = [];

  this.element.iTexts.forEach(iTextData => {
    promises.push(this.initPromise(iTextData));
  });

  promises.push(this.initPlacer());
  // promises.push(this.initHelper());
  return Promise.all(promises).then((values) => {});
}

cText.prototype.initPromise = function (iTextData) {
  let _this = this;
  return new Promise((resolve, reject) => {
    let iText = new fabric.IText("aa", iTextData);
    iText.orj = iTextData;
    _this.fText.push(iText);
    _this.fCanvas.add(iText);
    resolve(_this.element.ID);

  });
}

cText.prototype.update = function (cData) {
  if (this.PLACER) {
    this.PLACER.position = new Position(cData.placer);
  }
}


cText.prototype.setVisible = function (visible) {
  this.visible = visible;

  this.fText.forEach((iText, i) => {
    iText.set({
      visible: this.visible
    });
  });

}

cText.prototype.setVisiblePlacer = function (visible) {
  if (this.PLACER) {
    this.PLACER.fText.visible = visible;
  }
}


cText.prototype.setZIndex = function (zIndex = 1) {
  this.zIndex = zIndex;

  if (this.fText) {

    this.fText.forEach((iText, i) => {
      iText.moveTo(zIndex + i);
    });

  }

  if (this.PLACER) {
    this.PLACER.setZIndex(zIndex);
  }

  if (this.HELPER) {
    this.HELPER.setZIndex(zIndex);
  }
}

cText.prototype.initPlacer = function () {
  return new Promise((resolve, reject) => {
    let _position = new Position(this.element.placer);
    this.PLACER = new cPlacer(this.fCanvas, this.element.ID, this.element.type);
    this.PLACER.setPosition(_position);
    resolve('ok-PLACER');
  });
}

cText.prototype.initHelper = function () {
  return new Promise((resolve, reject) => {
    let _position = new Position();
    this.HELPER = new cHelper(this.fCanvas, this.element.ID, this.element.type);
    this.HELPER.setPosition(_position);
    resolve('ok-HELPER');
  });
}


cText.prototype.draw = function (f = 1) {

  if (!this.fText) {
    return;
  }

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


  this.fText.forEach(iText => {
    iText.left = (pLeft + iText.orj.left) * f;
    iText.top = (pTop + iText.orj.top) * f;
  
    if (iText.styles) {
      // iText.styles.forEach(styleG => {
      //   console.log(styleG);

      //   styleG.forEach(item => {
      //     if (item.fontSize) {
      //       item.fontSize = item.fontSize * 1.1;
      //     }
      //   });
      // });
    }
  });


  this.setVisible(this.visible);

  this.setZIndex(this.zIndex);


  //draw HELPER
  if (this.HELPER) {
    // let _position = new Position({
    //   left: this.fText.left,
    //   top: this.fText.top,
    //   width: this.fText.width * this.fText.scaleX,
    //   height: this.fText.height * this.fText.scaleY,
    // });

    // this.HELPER.setPosition(_position);
    // this.HELPER.draw(1); // f=1 display image size
  }

  //draw PLACER
  if (this.PLACER) {
    this.PLACER.draw(f);
  }

}


module.exports = cText;
