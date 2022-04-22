'use strict'

Position.prototype = {}
Position.left = 0;
Position.top = 0;
Position.width = 0;
Position.height = 0;
Position.centerX = 0;
Position.centerY = 0;

function Position(opts) {
  if (opts) {
    if (opts.hasOwnProperty('left')) {
      this.left = opts.left;
    }
    if (opts.hasOwnProperty('top')) {
      this.top = opts.top;
    }
    if (opts.hasOwnProperty('width')) {
      this.width = opts.width;
    }
    if (opts.hasOwnProperty('height')) {
      this.height = opts.height;
    }
  }
  this.calcCenter();
}

Position.prototype.calcCenter = function () {
  this.centerX = this.left + (this.width / 2);
  this.centerY = this.top + (this.height / 2);
}

Position.prototype.getPosition = function (f = 1) {
  this.calcCenter();
  return {
    left: this.left * f,
    top: this.top * f,
    width: this.width * f,
    height: this.height * f,
    centerX: this.centerX * f,
    centerY: this.centerY * f,
  };
}

Position.prototype.setPosition = function (pos) {
  this.left = pos.left;
  this.top = pos.top;
  this.width = pos.width;
  this.height = pos.height;
  this.calcCenter();
}
 

module.exports = Position