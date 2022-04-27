'use strict'

const Globals = require("../Globals.js");
const Position = require("./../Position.js");


function cHelper(fCanvas, parenId, parentType) {
  this.fCanvas = fCanvas;
  this.parenId = parenId;
  this.parentType = parentType;
  this.position = new Position();

  this.opacity = 1;
  this.strokeWidth = 2;
  this.strokeDashArray = [5, 5];
  this.visible = true;

  this.elements = [];

  let _color = 'green';
  if (this.parentType == Globals.TYPE_PRODUCT) {
    _color = Globals.COLOR_PLACER_PRODUCT;
  } else if (this.parentType == Globals.TYPE_MOTIV) {
    _color = Globals.COLOR_PLACER_MOTIV;
  } else if (this.parentType == Globals.TYPE_TEXT) {
    _color = Globals.COLOR_PLACER_TEXT;
  }

 

  this.stroke = _color;
  this.fill = _color;

  new Promise((resolve, reject) => {
    this.initSubElements();
    resolve();
  });

}
cHelper.prototype = {}

cHelper.prototype.setPosition = function (position) {
  this.position = position;
}

cHelper.prototype.initSubElements = function () {

  let rect = new fabric.Rect({
    ID: 'HelperBorder',
    stroke: this.stroke,
    fill: '',
    strokeWidth: this.strokeWidth,
    strokeDashArray: this.strokeDashArray,
    opacity: this.opacity,
    selectable: false
  });

  let line1 = new fabric.Line([0, 0, 1, 1], {
    ID: 'HelperLine1',
    stroke: this.stroke,
    strokeWidth: this.strokeWidth,    
    fill: '',
    opacity: this.opacity,
    selectable: false
  });

  let line2 = fabric.util.object.clone(line1);
  line2.set({    
    ID: 'HelperLine2',
    strokeWidth:'',
  })



  if (this.parentType == Globals.TYPE_PRODUCT) {
    this.elements.push(rect);
    this.elements.push(line1);
    this.elements.push(line2);
  } else if (this.parentType == Globals.TYPE_MOTIV) {
    this.elements.push(rect);
    this.elements.push(line1);
    this.elements.push(line2);
  }

  this.elements.forEach(fObj => {
    this.fCanvas.add(fObj);
  });
  return;
}

cHelper.prototype.setVisible = function (visible) {
  this.visible = visible;
  this.elements.forEach(fObj => {
    fObj.set({
      visible: this.visible,
    });
  });
}

cHelper.prototype.setZIndex = function (zIndex = 1) {
  let i = 0;
  this.elements.forEach(fObj => {
    i++;
    fObj.moveTo(zIndex + i);
  });
}

cHelper.prototype.draw = function (f) {
  if (!this.fHelper) {
    //  return null;
  }

  let _opts = {};
  let pos = this.position.getPosition(f);

  let d = pos.width*.1;
  this.elements.forEach(fObj => {
    _opts = {};
    if (fObj.ID == 'HelperBorder') {
      _opts = {
        left: pos.left - this.strokeWidth,
        top: pos.top - this.strokeWidth,
        width: pos.width + 2 * this.strokeWidth,
        height: pos.height + 2 * this.strokeWidth,
        visible: this.visible,
      };
    } else if (fObj.ID == 'HelperLine1') {
      _opts = {
        x1: pos.centerX-d,
        y1: pos.centerY-d,
        x2: pos.centerX+d,
        y2: pos.centerY+d,
        visible: this.visible,
      };
    } else if (fObj.ID == 'HelperLine2') {
      _opts = {
        x1: pos.centerX+d,
        y1: pos.centerY-d,
        x2: pos.centerX-d,
        y2: pos.centerY+d,
        visible: this.visible,
      };
    }
    fObj.set(_opts);
  });
}
module.exports = cHelper
