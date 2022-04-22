'use strict'

const Globals = require("./Globals.js");

const Position = require("./Position.js");
const Placer = require("./Placer.js");
const Helper = require("./Helper.js");

function Fabrix(opts = null)  {
  if (!opts) {
    return null;
  }
  this.opts = opts;
  
  //IDs für element 
  this.opts.elements.forEach((element, i) => {
    element.ID = i;
    element.FABRIX = {};

  });
}

Fabrix.prototype = {}
 
Fabrix.prototype.getElementByType = function (_type) {
  let rElement = null;

  this.opts.elements.forEach(element => {
    if (element.type == _type) {
      rElement = element;
    }
  });
  return rElement;
}

Fabrix.prototype.getElementByID = function (_ID) {
  let rElement = null;

  this.opts.elements.forEach(element => {
    if (element.ID == _ID) {
      rElement = element;
    }
  });
  return rElement;
}


Fabrix.prototype.setUI = function (opts) {}

Fabrix.prototype.renderAll = function (opts) {}


module.exports = Fabrix
