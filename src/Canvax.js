'use strict'
const Globals = require("./Globals.js");
const cImage = require("../src/Canvax/cImage.js");
const cText = require("../src/Canvax/cText.js");

Canvax.visible = false;
Canvax.color = 'pink';
Canvax.fabrix = null;
Canvax.fCanvas = null;
Canvax.f = 1; // factor


function Canvax() {}
Canvax.prototype = {}

Canvax.prototype.setFabrix = function (fabrix) {
  this.fabrix = fabrix;
  this.initFabricCanvas();


  return new Promise((resolve, reject) => {
    this.initElements().then((values) => {
      let opts = this.fabrix.opts;      
      resolve('------------init---------------');

    });
  });
}
Canvax.prototype.setCanvasData = function (cData) {
  let opts = this.fabrix.opts;
  opts.elements.forEach(element => {
    if (element.type == Globals.TYPE_MOTIV) {
      element.FABRIX.cObj.update(cData.motiv);
    } else if (element.type == Globals.TYPE_TEXT) {
      element.FABRIX.cObj.update(cData.text);
    }
  });
}

Canvax.prototype.setFabrixVisible = function (objType, subObjType, visible) {
  let element = this.fabrix.getElementByType(objType);
  console.log(objType, subObjType, visible);

  if (!element || !objType) {
    return null;
  }

  if (subObjType == Globals.TYPE_PLACER && element.FABRIX.cObj.PLACER) {
    element.FABRIX.cObj.PLACER.setVisible(visible);
  } else if (subObjType == Globals.TYPE_HELPER && element.FABRIX.cObj.HELPER) {
    element.FABRIX.cObj.HELPER.setVisible(visible);
  } else {
    if (!subObjType) {
      element.FABRIX.cObj.setVisible(visible);
    }
  }

}



Canvax.prototype.setColor = function (color) {
  this.color = color;
}

Canvax.prototype.setFactor = function (f) {
  this.f = f;
}

Canvax.prototype.setVisible = function (actionKey, value) {}


Canvax.prototype.initFabricCanvas = function () {
  let _opts = this.fabrix.opts;
  this.fCanvas = new fabric.Canvas(_opts.canvasId, {
    width: _opts.width,
    height: _opts.height,
    backgroundColor: _opts.backgroundColor ? _opts.backgroundColor : "#fff",
    selection: false,
  });
}

Canvax.prototype.initElements = function () {
  let promises = [];
  let opts = this.fabrix.opts;
  opts.elements.forEach(element => {
    console.log("init.", element.type);
    if (element.type == Globals.TYPE_PRODUCT) {

      let cObj = new cImage(this.fCanvas, element);
      promises.push(cObj.init());
      element.FABRIX.cObj = cObj;

    } else if (element.type == Globals.TYPE_MOTIV) {

      let cObj = new cImage(this.fCanvas, element);
      promises.push(cObj.init());
      element.FABRIX.cObj = cObj;

    } else if (element.type == Globals.TYPE_TEXT) {

      let cObj = new cText(this.fCanvas, element);
       promises.push(cObj.init());
      element.FABRIX.cObj = cObj;
    }

  });

  return Promise.all(promises).then((values) => {});
}


Canvax.prototype.renderAll = function () {
  let opts = this.fabrix.opts;
  let f = this.f / Globals.ZOOM_RATIO;

  this.fCanvas.setWidth(opts.width * f);
  this.fCanvas.setHeight(opts.height * f);
  this.fCanvas.calcOffset();

  let i = 0;
  opts.elements.forEach(element => {
    i = i + 100;
    if (element.FABRIX && element.FABRIX.cObj) {
      element.FABRIX.cObj.draw(f);
      element.FABRIX.cObj.setZIndex(i);
    }

  });
}

module.exports = Canvax
