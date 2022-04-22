'use strict'

Element.prototype = {}
Element.OBJ = false;  
Element.color = 'pink';

function Element(opts) {
  if (opts) {
    if (opts.hasOwnProperty('visible')) {
      this.setVisible(opts.visible);
    }    
    if (opts.hasOwnProperty('color')) {
      this.setColor(opts.color);
    }
  }
}

Element.prototype.setVisible = function (visible) {
  this.visible = visible;
}

Element.prototype.setColor = function (color) {
  this.color = color;
}

module.exports = Element