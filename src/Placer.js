const position = require("./Position.js");
const helper = require("./Helper.js");

module.exports = class Placer {
  type = "placer";
  name = null;
  position = null;
  opacity = 0.15;
  color = 'red';
  visible = true;
  selectable = false;

 
    
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
