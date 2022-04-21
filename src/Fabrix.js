const Position = require("./Position.js");
const Placer = require("./Placer.js");
const Helper = require("./Helper.js");

class FabrixVars {
  static WIDTH_MOTIV = 100; // Urkunde/Scanner width = 100mm 
  static WIDTH_PAPIER = 210; // Urkunde/Scanner width = 210mm 
  static ZOOM_RATIO = 10; // 1-5 <> 1-100
  static ZOOM_START = 30;

  static TYPE_PRODUCT = 'product';
  static TYPE_MOTIV = 'motiv'; // fix motiv
  static TYPE_TEXT = 'text';
  static TYPE_IMAGE = 'image'; // bilder, logo, motiv...

  static TYPE_PRODUCT_PLACER = 'product_placer';
  static TYPE_MOTIV_PLACER = 'motiv_placer';
  static TYPE_MOTIV_MASK = 'motiv_mask';
  static TYPE_EDIT = 'text_group';
  static TYPE_TEXT_PLACER = 'text_placer';

  COLOR_PRODUCT = 'gray';
  COLOR_MOTIV = 'blue';
  COLOR_TEXT = 'green';

  COLOR_MOTIV_HELPER = 'black';
  COLOR_PRODUCT_HELPER = 'orange';
}

class Fabrix {

  constructor(opts) {
    this.opts = opts;

    //IDs für element 
    this.opts.elements.forEach((element, i) => {
      element.ID = i;
      element.FABRIX = {}; 
    });

    this.refresh();
    console.log(this.opts.elements);
  }

  refresh() {
    this.opts.elements.forEach((element, i) => {
      this.refreshElement(element.ID);
    });
  }


  refreshElement(ID) {
    let element = this.getElementByID(ID);

    if (element.type == FabrixVars.TYPE_PRODUCT) {
      this.readImagePromise(element);    
    } else if (element.type == FabrixVars.TYPE_MOTIV) {
      this.readImagePromise(element);
    } else if (element.type == FabrixVars.TYPE_TEXT) {
      //TODO
    }

    element.FABRIX.helper = new Helper();

    if (element.position) { 
      let _placer = new Placer({
        position: new Position(element.position)
      });
      element.FABRIX.placer = _placer;
    }
  }

  readImagePromise(element) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.readImage(element).then((result) => {
        resolve();
      });
    });
  }

  async readImage(element) {
    let _this = this;
    await this.getBase64FromUrl(element.url).then((imageBlob) => {
      _this.setImageBlob(element.ID, imageBlob);
    });
  }

  setImageBlob(ID, imageBlob) {
    this.opts.elements.forEach(element => {
      if (element.ID == ID) {
        //                                            element.FABRIX.imageBlob =  imageBlob;
      }
    });
  }

  async getBase64FromUrl(url) {
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

  getElementByType(_type) {
    let rElement = null;

    this.opts.elements.forEach(element => {
      if (element.type == _type) {
        rElement = element;
      }
    });
    return rElement;
  }

  getElementByID(_ID) {
    let rElement = null;

    this.opts.elements.forEach(element => {
      if (element.ID == _ID) {
        rElement = element;
      }
    });
    return rElement;
  }

}


module.exports = {
  Fabrix,
  FabrixVars
}
