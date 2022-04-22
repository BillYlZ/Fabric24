'use strict'

//const uHelper = require("./uHelper.js");
const Position = require("./../Position.js");


function cPlacer(fCanvas, pos) {
  this.fCanvas = fCanvas;
  this.position = new Position(pos);
  this.color = 'black';
  this.opacity = 0.15;
  this.visible = true;
  new Promise((resolve, reject) => {
    this.fPlacer = new fabric.Rect({});
    this.fCanvas.add(this.fPlacer);
    resolve();
  });

}
cPlacer.prototype = {}

cPlacer.prototype.setVisible = function (visible) {
  this.fPlacer.visible = visible;  
}

cPlacer.prototype.draw = function (f) {
  if (!this.fPlacer) {
    return null;
  }

  let pos = this.position.getPosition(f);

  let opts = {
    left: pos.left,
    top: pos.top,
    width: pos.width,
    height: pos.height,
    opacity: this.opacity,
    fill: this.color,
    stroke: null,
    strokeWidth: 0,
  };

  console.log(opts);
  this.fPlacer.set(opts);

  console.log('cPlacer -> DRAW', this);
}


module.exports = cPlacer
