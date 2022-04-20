const ePosition = require("./ePosition.js");
const eHelper = require("./eHelper.js");
const eText = require("./eText.js");

module.exports = class eEdit {
  elements = [];
  lagerTextNummer = 0;
  position = null;

  constructor(opts) {

    if (opts) {
      if (opts.hasOwnProperty('lagerTextNummer')) {
        this.lagerTextNummer = opts.lagerTextNummer;
      }
      if (opts.hasOwnProperty('elementType')) {
        this.elementType = opts.elementType;
      }
      if (opts.hasOwnProperty('eID')) {
        this.eID = opts.eID;
      }
      if (opts.hasOwnProperty('position')) {
        this.position = opts.position;
      } else {
        this.position = new ePosition();
      }
    }

    this.init(this.lagerTextNummer);
  }

  init(lagerTextNummer) {
    this.lagertext();
  }

  setVisible(visible, visibleHelper = false, clip = false) {
    this.visible = visible;
  }

  setPosition(pos) {
    this.position.setPosition(pos);
  }

  addTextElement(iTextText, iTextOpts) {

    let opts = {
      tID: this.elements.length,
      parent_eID: this.eID,
      elementType: 'text',
      iText: {
        text: iTextText,
        opts: iTextOpts
      }
    }; 

    let _eText = new eText(opts);
    this.elements.push(_eText);

  }

  lagertext() {
    this.addTextElement('Als Dank und Anerkennung\nfür langjährige\nverdienstvolle Mitgliedschaft\nernennen wir', {
      top: 0,
      left: 0,
      fontSize: 12,
      styles: {
        font: [],
        fontweight: [
          ["bold", 0, 10],
          ["bold", 97, 110],
        ],
        size: [
          ["12", 20, 40]
        ],
        color: []
      },
    });

    this.addTextElement('Ehrenmitglied', {
      top: 30,
      left: 0,
      fontSize: 20,
      styles: {
        font: [],
        fontweight: [
          ["bold", 0, 13],
        ],
        size: [
          ["20", 0, 13]
        ],
        color: []
      },
    });
  }
};
