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

  let cd = state.canvasData;
  let dp = state.canvasData.druck_papier;
  let dg = state.canvasData.druck_map_motivgruppe;
  let dm = state.canvasData.druck_map_motiv;

  let _canvasData = {
    motiv: {
      left: (dg.xDelta + dm.xM),
      top: (dg.yDelta + dm.yM)+0,
      ratio: (dg.rDelta * dm.rM),
      placer: {
        left: dp.xMotiv,
        top: dp.yMotiv,
        width: dp.widthMotiv,
        height: dp.heightMotiv,
      }
    },
    text: {
      placer: {
        left: dp.xText,
        top: dp.yText,
        width: dp.widthText,
        height: dp.heightText,
      }
    }
  }; 
 this.canvax.setCanvasData(_canvasData);
}



U24Maker.prototype.setCanvax = function () {
  this.canvax.setFabrix(this.fabrix).then((values) => {
    this.renderAll();
  });
}

U24Maker.prototype.setFactor = function (f = 1) {
  this.canvax.setFactor(f);
  this.renderAll();
}


U24Maker.prototype.setVisible = function (actionKey, value) {

  console.log(actionKey, value);


  if (actionKey == 'product') {
    this.canvax.setFabrixVisible(Globals.TYPE_PRODUCT, '', value);
  } else if (actionKey == 'productPlacer') {
    this.canvax.setFabrixVisible(Globals.TYPE_PRODUCT, Globals.TYPE_PLACER, value);
  } else if (actionKey == 'productHelper') {
    this.canvax.setFabrixVisible(Globals.TYPE_PRODUCT, Globals.TYPE_HELPER, value);
  }

  if (actionKey == 'motiv') {
    this.canvax.setFabrixVisible(Globals.TYPE_MOTIV, '', value);
  } else if (actionKey == 'motivPlacer') {
    this.canvax.setFabrixVisible(Globals.TYPE_MOTIV, Globals.TYPE_PLACER, value);
  } else if (actionKey == 'motivHelper') {
    this.canvax.setFabrixVisible(Globals.TYPE_MOTIV, Globals.TYPE_HELPER, value);
  } else if (actionKey == 'motivMask') {
    this.canvax.setFabrixVisible(Globals.TYPE_MOTIV, 'mask', value);
  }


  if (actionKey == 'text') {
    this.canvax.setFabrixVisible(Globals.TYPE_TEXT, '', value);
  } else if (actionKey == 'textPlacer') {
    this.canvax.setFabrixVisible(Globals.TYPE_TEXT, Globals.TYPE_PLACER, value);
  } else if (actionKey == 'textHelper') {
    this.canvax.setFabrixVisible(Globals.TYPE_TEXT, Globals.TYPE_HELPER, value);
  }
  this.canvax.renderAll();

}


U24Maker.prototype.renderAll = function () {
  //this.canvax.setFactor(this.state.actionData.factor);

  this.canvax.renderAll();
}

U24Maker.prototype.getFabrix = function () {
  //return this.fabrix;
}

module.exports = U24Maker
