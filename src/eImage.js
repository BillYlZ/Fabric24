const ePosition = require("./ePosition.js");
const eHelper = require("./eHelper.js");
const eMask = require("./eMask.js");

module.exports = class eImage {
  type = "image";
  name = null;

  selectable = false;
  imageUrl = null;
  imageBlob = null;
  imageScale = 1;
  visible = true;
  //
  scaleX = 1;
  scaley = 1;

  position = null;
  helper = null;
  mask = null;

  placerWidth = 0;
  placerHeight = 0;
  imageDX = 0;
  imageDY = 0;

  elementType = ''; // URKUNDE, MOTIV

  constructor(opts) {
    this.position = new ePosition(opts.position);
    this.helper = new eHelper(opts.helper);
    this.mask = new eMask(opts.mask);

    if (opts) {
      if (opts.hasOwnProperty('name')) {
        this.name = opts.name;
      }
      if (opts.hasOwnProperty('imageUrl')) {
        this.imageUrl = opts.imageUrl;
      }
      if (opts.hasOwnProperty('imageBlob')) {
        this.imageBlob = opts.imageBlob;
      }
      if (opts.hasOwnProperty('imageScale')) {
        this.imageScale = opts.imageScale;
      }
      if (opts.hasOwnProperty('selectable')) {
        this.selectable = opts.selectable;
      }
      if (opts.hasOwnProperty('visible')) {
        this.visible = opts.visible;
      }

      if (opts.hasOwnProperty('placerWidth')) {
        this.placerWidth = opts.placerWidth;
      }
      if (opts.hasOwnProperty('placerHeight')) {
        this.placerHeight = opts.placerHeight;
      }

      if (opts.hasOwnProperty('imageDX')) {
        this.imageDX = opts.imageDX;
      }
      if (opts.hasOwnProperty('imageDY')) {
        this.imageDY = opts.imageDY;
      }

      if (opts.hasOwnProperty('elementType')) {
        this.elementType = opts.elementType;
      }

    }

  }

  setData(opts) {
    if (opts.hasOwnProperty('imageScale')) {
      this.imageScale = opts.imageScale;
    }
    if (opts.hasOwnProperty('imageDX')) {
      this.imageDX = opts.imageDX;
    }
    if (opts.hasOwnProperty('imageDY')) {
      this.imageDY = opts.imageDY;
    }
    if (opts.hasOwnProperty('placerWidth')) {
      this.placerWidth = opts.placerWidth;
    }
    if (opts.hasOwnProperty('placerHeight')) {
      this.placerHeight = opts.placerHeight;
    }
  }

  setVisible(me, visibleHelper = false, visibleMask = false) {
    this.visible = me;
    this.helper.setVisible(visibleHelper, visibleMask);  
  }

  setPosition(pos) {
    this.position.setPosition(pos);
  }

};
