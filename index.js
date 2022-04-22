'use strict'

const Fabrix = require("./src/Fabrix.js");
const Canvax = require("./src/Canvax.js");
const Globals = require("./src/Globals.js");

U24Maker.TYPE_PRODUCT = Globals.TYPE_PRODUCT;
U24Maker.TYPE_MOTIV = Globals.TYPE_MOTIV;
U24Maker.TYPE_TEXT = Globals.TYPE_TEXT;
U24Maker.fabrix = new Fabrix(null);
U24Maker.canvax = new Canvax(null);

function U24Maker(opts) {   
  this.fabrix = new Fabrix(opts);
  this.canvax = new Canvax();
  this.setCanvax();
}

U24Maker.prototype = {}

U24Maker.prototype.setUI = async function (state = null) {
  console.log('setUI',state);
  //await this.canvax.setUI(state);
  //this.renderAll();
}



U24Maker.prototype.setCanvax = function () {
  this.canvax.setFabrix(this.fabrix).then((values) => {

    console.log('canvax',this.canvax);
    this.renderAll();
  });
}

U24Maker.prototype.setFactor = function (f = 1) {
  this.canvax.setFactor(f);
  this.renderAll();
}

U24Maker.prototype.setVisible = function (actionKey, value) {
  console.log(actionKey);
  if (actionKey == 'product') {
    this.canvax.setFabrixVisible( Globals.TYPE_PRODUCT, 'own', value);  
  } else if (actionKey == 'productPlacer') {
    this.canvax.setFabrixVisible( Globals.TYPE_PRODUCT, 'placer', value);  
  } else if (actionKey == 'productHelper') {
    this.canvax.setFabrixVisible( Globals.TYPE_PRODUCT, 'helper', value);  
  }

  if (actionKey == 'motiv') {
    this.canvax.setFabrixVisible( Globals.TYPE_MOTIV, 'own', value);  
  } else if (actionKey == 'motivPlacer') {
    this.canvax.setFabrixVisible( Globals.TYPE_MOTIV, 'placer', value);  
  } else if (actionKey == 'motivHelper') {
    this.canvax.setFabrixVisible( Globals.TYPE_MOTIV, 'helper', value);  
  } else if (actionKey == 'motivMask') {
    this.canvax.setFabrixVisible( Globals.TYPE_MOTIV, 'mask', value);  
  }
  
}


U24Maker.prototype.renderAll = function () {
  this.canvax.renderAll();
}

U24Maker.prototype.getFabrix = function () {
  //return this.fabrix;
}

module.exports = U24Maker
