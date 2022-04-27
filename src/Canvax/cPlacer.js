'use strict'

const Globals = require("../Globals.js");
const Position = require("./../Position.js");


function cPlacer(fCanvas, parenId, parentType) {
  this.fCanvas = fCanvas;
  this.parenId = parenId;
  this.parentType = parentType;
  this.position = new Position();
 
  this.opacity = 0.20;
  this.strokeWidth = 0.5;
  this.visible = true;
  this.elements = [];

  let _color = 'green';
  if (this.parentType  == Globals.TYPE_PRODUCT) {      
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
cPlacer.prototype = {}

cPlacer.prototype.setPosition = function (position) {
  this.position = position;
}

cPlacer.prototype.initSubElements = function () {

  let ellipse = new fabric.Ellipse({
    ID: 'PlacerEllipse',
    stroke: this.stroke,
    strokeWidth: this.strokeWidth,
    fill: '',
    opacity: this.opacity + 0.8,
    selectable: false
  });

  let line1 = new fabric.Line([0, 0, 1, 1], {
    ID: 'PlacerLineX',
    stroke: this.stroke,
    strokeWidth: this.strokeWidth,
    fill: '',
    opacity: this.opacity + 0.8,
    selectable: false
  });

  let line2 = fabric.util.object.clone(line1);
  line2.set({
    ID: 'PlacerLineY',
  })

  let rect = new fabric.Rect({
    ID: 'PlacerBackgroud',
    stroke: '',
    fill: this.fill,
    strokeWidth: this.strokeWidth,
    opacity: this.opacity,
    selectable: false
  });

  //init 

  if (this.parentType == Globals.TYPE_PRODUCT) {
    this.elements.push(line1);
    this.elements.push(line2);
  }
  if (this.parentType == Globals.TYPE_TEXT) {
    this.elements.push(line1);
    this.elements.push(line2);
    this.elements.push(rect);
  }

  if (this.parentType == Globals.TYPE_MOTIV) {
    this.elements.push(line1);
    this.elements.push(line2);
    this.elements.push(rect);
    this.elements.push(ellipse);
  }

  this.elements.forEach(fObj => {
    this.fCanvas.add(fObj);
  });

  return;
}

cPlacer.prototype.setVisible = function (visible) {
  this.visible = visible;
  this.elements.forEach(fObj => {
    fObj.set({
      visible: this.visible,
    });
  });
}

cPlacer.prototype.setZIndex = function (zIndex = 1) {
  let i = 0;
  this.elements.forEach(fObj => {
    i++;
    fObj.moveTo(zIndex + i);
  });
}

cPlacer.prototype.draw = function (f) {
  if (!this.fPlacer) {
    //  return null;
  }

  let _opts = {};
  let pos = this.position.getPosition(f);

  this.elements.forEach(fObj => {
    _opts = {};
    if (fObj.ID == 'PlacerBackgroud') {
      _opts = {
        left: pos.left,
        top: pos.top,
        width: pos.width,
        height: pos.height,
        visible: this.visible,
      };
    } else if (fObj.ID == 'PlacerLineX') {
      _opts = {
        x1: pos.left,
        y1: pos.centerY,
        x2: pos.left + pos.width,
        y2: pos.centerY,
        visible: this.visible,
      };
    } else if (fObj.ID == 'PlacerLineY') {
      _opts = {
        x1: pos.centerX,
        y1: pos.top,
        x2: pos.centerX,
        y2: pos.top + pos.height,
        visible: this.visible,
      };
    } else if (fObj.ID == 'PlacerEllipse') {
      _opts = {
        left: pos.left,
        top: pos.top,
        rx: pos.width / 2,
        ry: pos.height / 2,
        visible: this.visible,
      };
    }
    fObj.set(_opts);
  });
}
module.exports = cPlacer
