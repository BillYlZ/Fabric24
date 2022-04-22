'use strict'

const Position = require("./Position.js");
const Helper = require("./Helper.js");

Placer.prototype = {}
Placer.visible = true;  
Placer.color = 'red';
Placer.opacity = 0.15;
Placer.position = new Position();
Placer.helper = new Helper();

function Placer(opts) {
  if (opts) {
    if (opts.hasOwnProperty('visible')) {
      this.setVisible(opts.visible);
    }
    if (opts.hasOwnProperty('color')) {
      this.setColor(opts.color);
    }
  }
}

Placer.prototype.setVisible = function (visible) {
  this.visible = visible;
}

Placer.prototype.setHelperVisible = function (visible) {
  this.helper.visible(visible);
}

Placer.prototype.setColor = function (color) {
  this.color = color;
}

Placer.prototype.setPosition = function (pos) {
  this.position.setPosition(pos);
}

module.exports = Placer