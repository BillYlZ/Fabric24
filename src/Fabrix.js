'use strict'

const Globals = require("./Globals.js");

const Position = require("./Position.js");
const Placer = require("./Placer.js");
const Helper = require("./Helper.js");

function Fabrix() {}
Fabrix.prototype = {}

Fabrix.prototype.init = function (opts) {
  this.opts = opts;

  //IDs für element 
  this.opts.elements.forEach((element, i) => {
    element.ID = i;
    element.FABRIX = {};
  });

  return new Promise((resolve, reject) => {
    this.refresh().then((values) => {
      resolve('init');
    });
  });

}


Fabrix.prototype.refresh = function () {

  let promises = [];

  this.opts.elements.forEach((item, i) => {

    let element = this.getElementByID(item.ID);
    if (element.type == Globals.TYPE_PRODUCT) {
      promises.push(this.readImagePromise(element));
    } else if (element.type == Globals.TYPE_MOTIV) {
      promises.push(this.readImagePromise(element));
    } else if (element.type == Globals.TYPE_TEXT) {
      //TODO
      promises.push('text');
    }
  });

  
  return Promise.all(promises).then((values) => {
    console.log(values);
  });

}

Fabrix.prototype.readImagePromise = function (element) {
  let _this = this;

  console.log('readImagePromise');
  return new Promise((resolve, reject) => {
    _this.readImage(element).then((result) => {
      console.log('readImagePromise-resolve');
      resolve(element.ID);
    });
  });
}


Fabrix.prototype.readImage = async function (element) {
  let _this = this;
  await this.getBase64FromUrl(element.url).then((imageBlob) => {
    element.FABRIX.imageBlob = imageBlob;
  });
}



Fabrix.prototype.getBase64FromUrl = async function (url) {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}


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
