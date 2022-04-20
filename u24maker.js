const uCanvas = require("./src/uCanvas.js");
const ePosition = require("./src/ePosition.js");
const eHelper = require("./src/eHelper.js");
const eCanvas = require("./src/eCanvas.js");
const URL = require("~/repositories/repository.js");

module.exports = class U24Maker {
  eCanvas = null;
  uCanvas = null;
 

  constructor(opts) {
    let _this = this;
    this.eCanvas = new eCanvas(opts);

    this.eCanvas.init().then((result) => {
      _this.initFabricCanvas().then(
        (result2) => {
          _this.setUI(opts.state);
        });
    });
  }

  async initFabricCanvas() {
    this.uCanvas = new uCanvas(this.eCanvas);
    await this.uCanvas.setElements();
  }


  setUI(state) {
    this.eCanvas.setUI(state);
    this.uCanvas.setECanvas(this.eCanvas);
    this.uCanvas.updateElements();
    this.uCanvas.draw();
  }

  renderAll() {
    this.uCanvas.renderAll();
  }

}
