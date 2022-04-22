'use strict'
const Globals = require("./Globals.js");
const Image = require("./Canvax/Image.js");

Canvax.prototype = {}
Canvax.visible = false;
Canvax.color = 'pink';
Canvax.fabrix = null;
Canvax.fCanvas = null;

function Canvax() {}
Canvax.prototype = {}

Canvax.prototype.setFabrix = function (fabrix) {
  this.fabrix = fabrix;
  this.initFabricCanvas();

  return new Promise((resolve, reject) => {
    this.initElements().then((values) => {
      resolve('init');
    });
  });
}

Canvax.prototype.setVisible = function (visible) {
  this.visible = visible;
}

Canvax.prototype.setColor = function (color) {
  this.color = color;
}

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
  let _elements = this.fabrix.opts.elements;
  _elements.forEach(element => {
    if (element.type == Globals.TYPE_PRODUCT) {
      let obj = new Image(this.fCanvas, element);
      promises.push(obj.init());
    } else if (element.type == Globals.TYPE_MOTIV) {
      let obj = new Image(this.fCanvas, element);
      promises.push(obj.init());
    }
  });

  return Promise.all(promises).then((values) => {
    console.log(values);
  });
}

Canvax.prototype.renderAll = function () {}

module.exports = Canvax
