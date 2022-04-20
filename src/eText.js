const position = require("./ePosition.js");
const helper = require("./eHelper.js");
module.exports = class eText {

  tID = 0;
  parent_eID = 0;
  elementType = null;
  iText = null;
  visible = true;
  position = null;
  helper = null;


  constructor(opts) {
    if (opts) {



      if (opts.hasOwnProperty('tID')) {
        this.tID = opts.tID;
      }
      if (opts.hasOwnProperty('parent_eID')) {
        this.parent_eID = opts.parent_eID;
      }
      if (opts.hasOwnProperty('elementType')) {
        this.elementType = opts.elementType;
      }
      if (opts.hasOwnProperty('iText')) {
        this.iText = opts.iText;
      }


      if (opts.hasOwnProperty('position')) {
        this.position = new position(opts.position);
      } else {
        this.position = new position();
      }

      this.helper = new helper({
        visible: false,
        stroke: this.color,
        strokeWidth: 0.5
      });

      if (opts.hasOwnProperty('iText')) {
        this.iText = opts.iText;
      }
    }

  }

  setVisible(visible, visibleHelper = false, clip = false) {
    this.visible = visible;
    //  this.helper.setVisible(visibleHelper); 
    // this.helper.setClip(clip); 
  }

  setPosition(pos) {
    this.position.setPosition(pos);
  }

}
