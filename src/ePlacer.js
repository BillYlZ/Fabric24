const position = require("./ePosition.js");
const helper = require("./eHelper.js");

module.exports = class ePlacer {
  type = "placer";
  name = null;
  position = null;
  opacity = 0.15;
  color = 'red';
  visible = true;
  selectable = false;

  productName = null;
  motivGruppeId = null;
  motivName = null;
    
  constructor(opts) {
    if (opts) {
      if (opts.hasOwnProperty('name')) {
        this.name = opts.name;
      }

      if (opts.hasOwnProperty('position')) {
        this.position = new position(opts.position);
      } else {
        this.position = new position();
      }

      if (opts.hasOwnProperty('color')) {
        this.color = opts.color;
      }

      if (opts.hasOwnProperty('visible')) {
        this.visible = opts.visible;
      }
      
      if (opts.hasOwnProperty('elementType')) {
        this.elementType = opts.elementType;
      }

      if (opts.hasOwnProperty('productName')) {
        this.productName = opts.productName;
      }
      if (opts.hasOwnProperty('motivGruppeId')) {
        this.motivGruppeId = opts.motivGruppeId;
      }
      if (opts.hasOwnProperty('elementType')) {
        this.motivName = opts.motivName;
      }
 

      this.helper = new helper({
        visible: false,
        stroke: this.color,
        strokeWidth: 0.5
      });
    }
  }
 

  setVisible(visible, visibleHelper=false, clipImage=false) {
    this.visible = visible;
    this.helper.setVisible(visibleHelper); 
    this.helper.setClipImage(clipImage); 
  }

  setPosition(pos) {
    this.position.setPosition(pos);
  }


};
