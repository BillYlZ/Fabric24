'use strict'

const Fabrix = require("./src/Fabrix.js");
const Canvax = require("./src/Canvax.js");
const Globals = require("./src/Globals.js");

U24Maker.TYPE_PRODUCT = Globals.TYPE_PRODUCT;
U24Maker.TYPE_MOTIV = Globals.TYPE_MOTIV;
U24Maker.TYPE_TEXT = Globals.TYPE_TEXT;
U24Maker.fabrix = new Fabrix();
U24Maker.canvax = new Canvax();

function U24Maker(opts) {

  this.fabrix = new Fabrix();
  this.canvax = new Canvax();

  this.setFabrix(opts);
  this.setCanvax();
}


U24Maker.prototype = {}


U24Maker.prototype.setUI = async function (state = null) {
  //await this.fabrix.setUI(state);
  //this.renderAll();
}



U24Maker.prototype.setFabrix = function (opts) {
  this.fabrix = new Fabrix();
  this.fabrix.init(opts).then((values) => {
    this.setCanvax();
  });
}

U24Maker.prototype.setCanvax = function () {
  this.canvax.setFabrix(this.fabrix).then((values) => {
    console.log('setFabrix ENDE');
  });
}
U24Maker.prototype.renderAll = function () {
  this.canvax.renderAll();
}

U24Maker.prototype.getFabrix = function () {
  //return this.fabrix;
}

module.exports = U24Maker
