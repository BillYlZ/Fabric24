'use strict'
const Globals = require("./Globals.js");
const cImage = require("../src/Canvax/cImage.js");

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
      opts.elements.forEach(element => {

        let vs = {
          own: 0,
          placer: 0,
          helper: 0,
          mask: 0,
        };

        if (element.FABRIX && element.FABRIX.cObj) {
          vs.own = 1;
          if (element.FABRIX.cObj.PLACER) {
            vs.placer = 1;
          }
          if (element.FABRIX.cObj.HELPER) {
            vs.helper = 1;
          }
          if (element.FABRIX.cObj.MASK) {
            vs.mask = 1;
          }
        }

        element.FABRIX.visibleSwitch = vs;
      });
      resolve('------------init---------------');

    });
  });
}

Canvax.prototype.setVisible = function (visible) {
  this.visible = visible;
}
Canvax.prototype.setFabrixVisible = function (type, param, visible) {
  let element = this.fabrix.getElementByType(type);

  if (param == 'placer') {
    console.log('aaa', type, param, visible, element.FABRIX.cObj.PLACER);
    element.FABRIX.cObj.PLACER.setVisible(visible);
  } else {
    element.FABRIX.cObj.setVisible(visible);
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
  }).on("mouse:up", (object) => {
    // clickObject(object);
  });
}

Canvax.prototype.initElements = function () {
  let promises = [];
  let opts = this.fabrix.opts;
  opts.elements.forEach(element => {
    if (element.type == Globals.TYPE_PRODUCT) {
      let cObj = new cImage(this.fCanvas, element);

      promises.push(cObj.init());
      element.FABRIX.cObj = cObj;
    } else if (element.type == Globals.TYPE_MOTIV) {
      let cObj = new cImage(this.fCanvas, element);


      promises.push(cObj.init());
      promises.push(cObj.initPlacer());
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

  opts.elements.forEach(element => {
    if (element.FABRIX && element.FABRIX.cObj) {
      element.FABRIX.cObj.draw(f);
      //console.log('draw', element.FABRIX.cObj);
    }

  });
}

module.exports = Canvax
