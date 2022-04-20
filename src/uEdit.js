const eCanvas = require("./eCanvas.js");
const uText = require("./uText.js");

module.exports = class uEdit {
  uCanvas = null;
  fCanvas = null;

  uElements = [];

  position = {};


  strokeWidth = 1.6;
  stroke = "black";
  visible = false;
  clipImage = false;


  constructor(fCanvas, eObject) {

    this.fCanvas = fCanvas;
    this.eObject = eObject; 
  }

  init() {

    return new Promise((resolve, reject) => {

      try {
        for (const element of this.eObject.elements) {

          if (element.elementType == eCanvas.TYPE_TEXT) {
            let obj = new uText(this.fCanvas, element);
            this.uElements.push(obj);
          }
        }

        resolve();


      } catch (hata) {
        reject(hata);
      }
    });

  }

 

  setVisible(visible) {
    this.visible = visible;
    for (const item of this.uElements) {
      item.setVisible(this.visible);
    }
  }

  refresh() {


  }
  draw(f) {
    for (const item of this.uElements) {

      if (item.eObject.elementType == eCanvas.TYPE_TEXT) {
        item.draw(f, this.eObject);
      }
    }
  }

};
