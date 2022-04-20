module.exports = class eMask {
 
  productName = null;
  motivGruppeId = null;
  motivName = null;
  canvasData = null;


  visible = false;
  type = null;

  constructor(opts) {
    if (opts) {
      if (opts.hasOwnProperty('productName')) {
        this.productName = opts.productName;
      }
      if (opts.hasOwnProperty('motivGruppeId')) {
        this.motivGruppeId = opts.motivGruppeId;
      }
      if (opts.hasOwnProperty('motivName')) {
        this.motivName = opts.motivName;
      }
      if (opts.hasOwnProperty('canvasData')) {
        this.canvasData = opts.canvasData;
      }
      this.type = 'ellipse';
    }
  }

  setVisible(visible) {
    this.visible = visible;
  }
};
