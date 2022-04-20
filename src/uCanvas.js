const uEdit = require("./uEdit.js");
const uImage = require("./uImage.js");
const uPlacer = require("./uPlacer.js");
const eCanvas = require("./eCanvas.js");
const cJsPDF = require("jspdf");

module.exports = class uCanvas {

  uElements = [];
  eIDs = [];
  fCanvas = null;
  eCanvas = null;

  constructor(eCanvas) {
    this.setECanvas(eCanvas);

    this.fCanvas = new fabric.Canvas(this.eCanvas.id, {
      width: 10,
      height: 10,
      backgroundColor: "#fff",
      selection: false,
    }).on("mouse:up", (object) => {
      // clickObject(object);
    });
  }


  async setElements() {
    let eIDMotivPlacer = null;
    let eIDMotiv = null;
 
    for (const eObject of this.eCanvas.elements) {

      if (eObject.elementType == eCanvas.TYPE_PRODUCT || eObject.elementType == eCanvas.TYPE_MOTIV) {
        let _uImage = new uImage(this.fCanvas, eObject);
        await _uImage.initfabricImage();
        this.uElements[eObject.eID] = _uImage;
      } else if (eObject.elementType == eCanvas.TYPE_PRODUCT_PLACER || eObject.elementType == eCanvas.TYPE_MOTIV_PLACER || eObject.elementType == eCanvas.TYPE_TEXT_PLACER) {
        this.uElements[eObject.eID] = new uPlacer(this.fCanvas, eObject);
      } else if (eObject.elementType == eCanvas.TYPE_EDIT) {    
        let _uEdit = new uEdit(this.fCanvas, eObject);
        await _uEdit.init();
        this.uElements[eObject.eID] = _uEdit;
        
      }

      if (eObject.elementType == eCanvas.TYPE_MOTIV_PLACER) {
        eIDMotivPlacer = eObject.eID;
      }
      if (eObject.elementType == eCanvas.TYPE_MOTIV) {
        eIDMotiv = eObject.eID;
      }


      
    };

    if (eIDMotivPlacer !== null && eIDMotiv !== null) {
      this.uElements[eIDMotiv].setMask(this.uElements[eIDMotivPlacer].uHelper.uMask);
    }
  }

  setECanvas(eCanvas) {
    this.eCanvas = eCanvas;
  }

  updateElements() {

    this.eCanvas.elements.forEach(eElement => {
      let uElement = this.uElements[eElement.eID];
      if (uElement) {
        uElement.refresh(eElement);
      }
    });
  }

  draw() {

    let f = this.eCanvas.actionData.factor / eCanvas.ZOOM_RATIO;
    let vs = this.eCanvas.actionData.visibleSwitch;


    this.fCanvas.setWidth(this.eCanvas.width * f);
    this.fCanvas.setHeight(this.eCanvas.height * f);
    this.fCanvas.calcOffset();
    this.uElements.forEach(item => {
      console.log(item);
      if (item.eObject.elementType == eCanvas.TYPE_PRODUCT) {
        item.setVisible(vs.product, vs.productHelper);
      } else if (item.eObject.elementType == eCanvas.TYPE_MOTIV) {
        item.setVisible(vs.motiv, vs.motivHelper, vs.motivMask);
      } else if (item.eObject.elementType == eCanvas.TYPE_PRODUCT_PLACER) {
        item.setVisible(vs.productPlacer, vs.productPlacerHelper);
      } else if (item.eObject.elementType == eCanvas.TYPE_MOTIV_PLACER) {
        item.setVisible(vs.motivPlacer, vs.motivPlacerHelper, vs.motivMask);
      } else if (item.eObject.elementType == eCanvas.TYPE_TEXT_PLACER) {
        item.setVisible(vs.textPlacer, vs.textPlacerHelper);
      } else if (item.eObject.elementType == eCanvas.TYPE_TEXT) {
        item.setVisible(vs.text);
      }
      item.draw(f);
    });
  }

  renderAll() {
    this.fCanvas.renderAll();
  }


  getPrintPdf() {

    let image = this.fCanvas.toDataURL({
      multiplier: 1,
      format: "png",
    });

    let doc = new cJsPDF.jsPDF();
    doc.addImage(image, "PNG", 0, 0, 210, 297);
    doc.autoPrint();

    let bloburl = doc.output("bloburl");
    return bloburl;
  }
}
